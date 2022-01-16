import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import Task from "./Task";

const Column2: React.FC<any> = ({ column, tasks, index }) => {
  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided) => (
        <div
          className="m-2 w-56 border-solid border border-gray-400 flex flex-col bg-white"
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <h3 className="p-2" {...provided.dragHandleProps}>
            {column.title}
          </h3>
          <Droppable
            droppableId={column.id}
            type={"task"}
            // isDropDisabled={}
          >
            {(provided, snapshot) => (
              <div
                className={`p-2 grow min-h-min ${
                  snapshot.isDraggingOver ? "bg-blue-300" : "white"
                }`}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {tasks.map((task: any, index: any) => (
                  <Task key={task.id} task={task} index={index} />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default Column2;
