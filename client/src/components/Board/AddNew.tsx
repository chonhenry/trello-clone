import React, { useState } from "react";

interface Props {
  handleAddColumn?: (title: string) => void;
  handleAddCard?: (title: string, columnId: string) => void;
  cancelAdd: () => void;
  columnId?: string;
}

const AddNew: React.FC<Props> = ({
  handleAddColumn,
  handleAddCard,
  cancelAdd,
  columnId,
}) => {
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (title.length === 0) return;

    if (handleAddColumn) {
      handleAddColumn(title);
      return;
    }

    if (handleAddCard && columnId) {
      handleAddCard(title, columnId);
      cancelAdd();
      return;
    }
  };

  return (
    <form
      className={`bg-col_background rounded w-full pt-2 ${
        handleAddCard && "absolut bottom-0 left-0"
      }`}
      onSubmit={handleSubmit}
    >
      <input
        className="w-full p-1 rounded border border-solid border-gray-100 focus:ring-0 focus:border-green"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        autoFocus
      />
      <div className="mt-2">
        <button type="submit" className="bg-green text-white rounded py-1 px-4">
          Add
        </button>
        <button
          className="ml-2 text-xl font-medium text-green"
          onClick={cancelAdd}
        >
          X
        </button>
      </div>
    </form>
  );
};

export default AddNew;
