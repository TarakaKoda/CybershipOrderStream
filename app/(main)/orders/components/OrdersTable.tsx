"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { OrderStatus } from "@prisma/client";
import axios from "axios";
import { error } from "console";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Column, useTable } from "react-table";

interface Order {
  id: number;
  customerName: string;
  status: OrderStatus;
  createdAt: string;
}

const OrdersTable = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const searchParams = useSearchParams();
  useEffect(() => {
    // Fetch the orders from the backend
    const fetchOrders = async () => {
      try {
        const params = new URLSearchParams();
        const status = searchParams.get("status");
        if (status) {
          params.append("status", status);
        }
        console.log(params.toString());
        const response = await axios.get(`/api/orders?${params.toString()}`);

        const data = await response.data;
        setOrders(data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrders();
  }, [searchParams]);

  const columns: Column<Order>[] = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Customer Name",
        accessor: "customerName",
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Created At",
        accessor: "createdAt",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: orders,
    });

  return (
    <Table {...getTableProps()} className="w-full">
      <TableHeader className="bg-[#141417]">
        {headerGroups.map((headerGroup, index) => (
          <TableRow {...headerGroup.getHeaderGroupProps()} key={index}>
            {headerGroup.headers.map((column) => (
              <TableHead
                {...column.getHeaderProps()}
                key={column.id}
                className="p-2 text-left text-[#B5B5BB]">
                {column.render("Header")}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>

      {/* Table Body */}
      <TableBody className="text-white border-0" {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <TableRow
              className="border-white"
              {...row.getRowProps()}
              key={row.id}>
              {row.cells.map((cell) => (
                <TableCell {...cell.getCellProps()} key={cell.column.id}>
                  {cell.render("Cell")}
                </TableCell>
              ))}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default OrdersTable;
