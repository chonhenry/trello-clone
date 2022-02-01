import React, { useState } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export interface Board {
  title: string;
  createdAt: string;
  updatedAt: string;
  _id: string;
}

export interface Boards {
  boards: Board[];
  sortBoards: (sortBy: SortBy, sortOrder: SortOrder) => void;
}

export enum SortBy {
  Created_Date = "Created_Date",
  Modified_Date = "Modified_Date",
}

export enum SortOrder {
  Ascending = "Ascending",
  Descending = "Descending",
}

const BoardTable: React.FC<Boards> = ({ boards, sortBoards }) => {
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.Modified_Date);
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.Descending);

  const renderTableRow = () => {
    const formatDate = (d: string) => {
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      const date = new Date(d);
      const month = months[date.getMonth()];
      const day = date.getDate();
      const year = date.getFullYear();
      const hour =
        date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
      const minute = date.getMinutes();
      const am = date.getHours() > 11 ? false : true;

      return `${month} ${day}, ${year} at ${hour}:${minute} ${
        am ? "AM" : "PM"
      }`;
    };

    return boards.map((board) => (
      <tr key={board._id} className="cursor-pointer">
        <td className="text-left p-2 w-6/12">{board.title}</td>
        <td className="text-left p-2 w-3/12">{formatDate(board.createdAt)}</td>
        <td className="text-left p-2 w-3/12">{formatDate(board.updatedAt)}</td>
      </tr>
    ));
  };

  const sortArrow = (sortColumn: SortBy) => {
    if (sortColumn === sortBy) {
      if (sortOrder === SortOrder.Descending) return <KeyboardArrowDownIcon />;
      return <KeyboardArrowUpIcon />;
    }

    return;
  };

  const handleSort = (column: SortBy) => {
    const order =
      sortOrder === SortOrder.Descending
        ? SortOrder.Ascending
        : SortOrder.Descending;

    sortBoards(column, order);
    setSortBy(column);
    setSortOrder(order);
  };

  return (
    <table className="w-full rounded-md ">
      <thead className="bg-green text-white rounded-md ">
        <tr className="">
          <th className="text-left p-2">Board Ttile</th>
          <th
            className="text-left p-2 cursor-pointer"
            onClick={() => handleSort(SortBy.Created_Date)}
          >
            Created Date
            {sortArrow(SortBy.Created_Date)}
          </th>
          <th
            className="text-left p-2 cursor-pointer"
            onClick={() => handleSort(SortBy.Modified_Date)}
          >
            Last Modified
            {sortArrow(SortBy.Modified_Date)}
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody className="bg-white">{renderTableRow()}</tbody>
    </table>
  );
};

export default BoardTable;
