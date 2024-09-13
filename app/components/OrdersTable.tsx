import { OrderStatus } from "@prisma/client";
import React from "react";
import { useTable, Column } from "react-table";

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
    <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
    <thead>
      {headerGroups.map((headerGroup) => (
        <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
          {headerGroup.headers.map((column) => (
            <th {...column.getHeaderProps()} key={column.id}>
              {column.render('Header')}
            </th>
          ))}
        </tr>
      ))}
    </thead>
    <tbody {...getTableBodyProps()}>
      {rows.map((row) => {
        prepareRow(row);
        return (
          <tr {...row.getRowProps()} key={row.id}>
            {row.cells.map((cell) => (
              <td {...cell.getCellProps()} key={cell.column.id}>
                {cell.render('Cell')}
              </td>
            ))}
          </tr>
        );
      })}
    </tbody>
  </table>
  );
};

export default OrdersTable;
