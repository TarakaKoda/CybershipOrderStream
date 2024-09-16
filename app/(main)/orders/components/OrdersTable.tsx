"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDateString } from "@/lib/utils";
import { OrderStatus } from "@prisma/client";
import axios from "axios";
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
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const params = new URLSearchParams();
        const status = searchParams.get("status");
        if (status) {
          params.append("status", status);
        }
        params.append("page", currentPage.toString());
        params.append("pageSize", pageSize.toString());

        const response = await axios.get(`/api/orders?${params.toString()}`);
        const data = await response.data;

        setOrders(data.data);
        setTotalPages(data.pagination.totalPages);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrders();
  }, [searchParams, currentPage, pageSize]);

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
        accessor: (row) => formatDateString(row.createdAt)
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: orders,
    });

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="w-full min-h-[38vw] flex justify-between flex-col gap-5">
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
      <div className="w-full flex justify-center gap-3 items-center">
        <Button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="text-white bg-[#0F0F10] border border-[#333337] hover:bg-white hover:text-black px-4 py-2">
          &lt; Previous
        </Button>
        <span className="w-10 h-8 text-xs flex items-center justify-center bg-white font-bold text-black rounded-lg">
          {currentPage}
        </span>
        <Button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="text-white bg-[#0F0F10] border border-[#333337] hover:bg-white hover:text-black px-4 py-2">
          Next &gt;
        </Button>
      </div>
    </div>
  );
};

export default OrdersTable;
