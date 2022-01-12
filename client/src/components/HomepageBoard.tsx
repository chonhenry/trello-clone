import React, { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DragStart,
} from "react-beautiful-dnd";

interface ItemProps {
  id: string;
  index: number;
}

const Item: React.FC<ItemProps> = ({ id, index }) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {id + " item"}
        </div>
      )}
    </Draggable>
  );
};

const HomepageBoard: React.FC = () => {
  const onDragEnd = () => {
    console.log("onDragEnd");
  };

  return (
    <div
      className="mb-12 xl:mr-24 xl:mb-0 bg-yellow_ochre"
      style={{ height: "537px" }}
    >
      <div>Try it</div>
      <div className="flex" style={{ width: "700px" }}>
        <DragDropContext onDragEnd={onDragEnd}>
          {[
            <div key="column_1">
              <Droppable key="column_1" droppableId={"column_1"}>
                {(provided) => (
                  <div
                    className="droppable bg-blue-300"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <div>column 1</div>
                    {["1", "2", "3"].map((id, index) => (
                      <Item key={id} id={id} index={index} />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>,
            <div key="column_2">
              <Droppable key="column_2" droppableId={"column_2"}>
                {(provided) => (
                  <div
                    className="droppable bg-red-300"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <div>column 1</div>
                    {["4", "5", "6", "7"].map((id, index) => (
                      <Item key={id} id={id} index={index} />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>,
          ]}
        </DragDropContext>
      </div>
    </div>
  );
};

export default HomepageBoard;
