import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBoard, getBoards } from "../../api";
import BoardTable from "./BoardTable";
import isLoggedIn from "../../utils/isLoggedIn";
import Button from "@mui/material/Button";
import { Board, SortBy, SortOrder } from "./BoardTable";

const Dashboard: React.FC = () => {
  const [isCreate, setIsCreate] = useState(false);
  const [boards, setBoards] = useState<Board[]>([]);
  const [boardsLoading, setBoardsLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn()) navigate("/");
  }, [navigate]);

  useEffect(() => {
    const loadBoards = async () => {
      try {
        const boards = await getBoards();
        setBoards(boards.data);
        setBoardsLoading(false);
      } catch (error) {}
    };

    loadBoards();
  }, []);

  const sortBoards = (sortBy: SortBy, sortOrder: SortOrder) => {
    let sortedBoards: Board[] = [];

    const column = sortBy === SortBy.Created_Date ? "createdAt" : "updatedAt";

    if (sortOrder === SortOrder.Ascending) {
      sortedBoards = [...boards].sort((a, b) => {
        return new Date(a[column]).valueOf() - new Date(b[column]).valueOf();
      });
    } else {
      sortedBoards = [...boards].sort((a, b) => {
        return new Date(b[column]).valueOf() - new Date(a[column]).valueOf();
      });
    }

    setBoards(sortedBoards);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title.length === 0) return;

    try {
      await createBoard(title);
      setTitle("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setTitle(e.target.value);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setSearch(e.target.value);
  };

  return (
    <div className="m-auto max-w-4xl p-3">
      <Button
        variant="contained"
        style={{ backgroundColor: "rgb(58, 175, 169)" }}
        onClick={() => setIsCreate((prev) => !prev)}
      >
        Create a board
      </Button>

      {isCreate && (
        <form className="mt-4" onSubmit={handleSubmit}>
          <input
            type="text"
            className="rounded-md focus:ring-0 focus:border-green"
            onChange={handleTitleChange}
            value={title}
            placeholder="Board title"
          />
          <button
            type="submit"
            className="text-white bg-green ml-3 py-2 px-4 rounded-md"
          >
            Create
          </button>
        </form>
      )}

      <div className="bg-green rounded-md mt-4 mb-4 p-3">
        <input
          type="text"
          className="w-full rounded-md focus:ring-0 focus:border-green"
          placeholder="Search by board name"
          value={search}
          onChange={handleSearchChange}
        />
      </div>

      {boardsLoading ? (
        <div className="text-center text-peacock_green">
          Loading your boards...
        </div>
      ) : boards.length > 0 ? (
        <BoardTable boards={boards} sortBoards={sortBoards} />
      ) : (
        <div className="text-center text-3xl bg-green text-light_green p-3 rounded-md">
          You don't have any boards.
        </div>
      )}
    </div>
  );
};

export default Dashboard;
