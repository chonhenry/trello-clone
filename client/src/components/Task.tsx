import React from "react";
import { Draggable } from "react-beautiful-dnd";

const Task: React.FC<any> = ({ task, index }) => {
  const isDragDisabled = task.id === "task-1";

  return (
    <Draggable
      draggableId={task.id}
      index={index}
      isDragDisabled={isDragDisabled}
    >
      {(provided, snapshot) => (
        <div
          className={`border-solid border border-gray-400 p-2 mb-2 rounded ${
            isDragDisabled
              ? "bg-gray-300"
              : snapshot.isDragging
              ? "bg-green-300"
              : "bg-white"
          }`}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {task.content}
        </div>
      )}
    </Draggable>
  );
};

export default Task;
