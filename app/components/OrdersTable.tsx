"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { OrderStatus } from "@prisma/client";
import { Column, useTable } from "react-table";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; // Assuming this is the ShadCN table components

interface Order {
  id: number;
  customerName: string;
  status: OrderStatus;
  createdAt: string;
}

const OrdersTable: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  useEffect(() => {
    // Fetch the orders from the backend
    const fetchOrders = async () => {
      const response = await axios.get("/api/orders");
      const data = await response.data;
      setOrders(data.data); // Assuming 'data' is the structure returned by your API
    };

    fetchOrders();
  }, []);
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
      {/* Table Header */}
      <TableHeader className="bg-[#141417]">
        {headerGroups.map((headerGroup) => (
          <TableRow
            {...headerGroup.getHeaderGroupProps()}
            key={headerGroup.id}
            className="">
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
