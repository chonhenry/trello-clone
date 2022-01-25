import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import isLoggedIn from "../../utils/isLoggedIn";
import Button from "@mui/material/Button";

const Dashboard: React.FC = () => {
  const [isCreate, setIsCreate] = useState(false);
  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn()) navigate("/");
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("handleSubmit");
    if (title.length === 0) return;
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    console.log("handleChange");
    setTitle(e.target.value);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    console.log("handleSearchChange");
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
          />
          <button
            type="submit"
            className="text-white bg-green ml-3 py-2 px-4 rounded-md"
          >
            Create
          </button>
        </form>
      )}

      <div className="bg-green rounded-md mt-4 p-3">
        <input
          type="text"
          className="w-full rounded-md focus:ring-0 focus:border-green"
          placeholder="Search by board name"
          value={search}
          onChange={handleSearchChange}
        />
      </div>
    </div>
  );
};

export default Dashboard;
