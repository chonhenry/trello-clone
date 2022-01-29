import React from "react";
import dayjs from "dayjs";

export interface Board {
  title: string;
  createdAt: string;
  updatedAt: string;
  _id: string;
}

export interface Boards {
  boards: Board[];
}

const BoardTable: React.FC<Boards> = ({ boards }) => {
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

  return (
    <table className="w-full rounded-md ">
      <thead className="bg-green text-white rounded-md ">
        <tr className="">
          <th className="text-left p-2">Board Ttile</th>
          <th className="text-left p-2">Created Date</th>
          <th className="text-left p-2">Last Modified</th>
          <th></th>
        </tr>
      </thead>
      <tbody className="bg-white">{renderTableRow()}</tbody>
    </table>
  );
};

export default BoardTable;
