import { OrderStatus } from "@prisma/client";
import React from "react";
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

interface OrderTableProps {
  data: Order[];
}

const OrdersTable: React.FC<OrderTableProps> = ({ data }) => {
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
      data,
    });

  return (
    <Table {...getTableProps()} className="w-full">
      {/* Table Caption (optional) */}
      <TableCaption>Your orders data overview</TableCaption>

      {/* Table Header */}
      <TableHeader className="bg-[#141417] header-top">
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
      <TableBody className="text-white" {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <TableRow
              className="border border-b border-white"
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
