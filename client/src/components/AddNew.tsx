import React, { useState } from "react";

interface Props {
  handleAdd: (title: string) => void;
  cancelAdd: () => void;
}

const AddNew: React.FC<Props> = ({ handleAdd, cancelAdd }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (title.length === 0) return;
    handleAdd(title);
  };

  return (
    <form
      className="bg-col_background rounded w-44 p-1"
      onSubmit={handleSubmit}
    >
      <input
        className="w-full p-1"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        autoFocus
      />
      <div className="">
        <button
          type="submit"
          className="bg-cool_gray text-yellow_ochre rounded mt-1 py-1 px-4"
        >
          Add
        </button>
        <button className="ml-2 text-xl font-medium" onClick={cancelAdd}>
          X
        </button>
      </div>
    </form>
  );
};

export default AddNew;
