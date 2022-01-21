import React, { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  DropResult,
  DragStart,
} from "react-beautiful-dnd";
import Auth from "./components/Auth";
import HomepageBoard from "./components/HomepageBoard";
import Home from "./components/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";

const App: React.FC = () => {
  const profile = localStorage.getItem("trello_clone_profile");
  let user;

  if (profile) {
    user = JSON.parse(profile);
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<div>dashboard</div>} />
      </Routes>
    </Router>
  );
};

export default App;

// const [state, setState] = useState(data);

// const onDragEnd = (result: DropResult) => {
//   // the only one that is required
//   const { destination, source, draggableId, type } = result;

//   if (!destination) return;

//   if (
//     destination.droppableId === source.droppableId &&
//     destination.index === source.index
//   )
//     return;

//   if (type === "column") {
//     const newColumnOrder = Array.from(state.columnOrder);
//     newColumnOrder.splice(source.index, 1);
//     newColumnOrder.splice(destination.index, 0, draggableId);

//     const newState = {
//       ...state,
//       columnOrder: newColumnOrder,
//     };

//     setState(newState);
//     return;
//   }

//   const start = state.columns[source.droppableId];
//   const finish = state.columns[destination.droppableId];

//   if (start === finish) {
//     const newTaskIds = Array.from(start.taskIds);

//     newTaskIds.splice(source.index, 1);
//     newTaskIds.splice(destination.index, 0, draggableId);

//     const newColumn = {
//       ...start,
//       taskIds: newTaskIds,
//     };

//     const newState = {
//       ...state,
//       columns: {
//         ...state.columns,
//         [newColumn.id]: newColumn,
//       },
//     };

//     setState(newState);
//     return;
//   }

//   // moving from one list to another
//   const startTaskIds = Array.from(start.taskIds);
//   startTaskIds.splice(source.index, 1);
//   const newStart = {
//     ...start,
//     taskIds: startTaskIds,
//   };

//   const finishTasksIds = Array.from(finish.taskIds);
//   finishTasksIds.splice(destination.index, 0, draggableId);

//   const newFinish = {
//     ...finish,
//     taskIds: finishTasksIds,
//   };

//   const newState = {
//     ...state,
//     columns: {
//       ...state.columns,
//       [newStart.id]: newStart,
//       [newFinish.id]: newFinish,
//     },
//   };

//   setState(newState);
// };

// const onDragStart = (start: DragStart) => {
//   const homeIndex = state.columnOrder.indexOf(start.source.droppableId);
// };

// const onDragUpdate = () => {};

// return (
//   <div className="App">
//     <DragDropContext
//       onDragEnd={onDragEnd}
//       onDragStart={onDragStart}
//       onDragUpdate={onDragUpdate}
//     >
//       <Droppable
//         droppableId="all-columns"
//         direction="horizontal"
//         type="column"
//       >
//         {(provided) => (
//           <div
//             className="flex m-3 border-solid border border-gray-400 rounded"
//             {...provided.droppableProps}
//             ref={provided.innerRef}
//           >
//             {state.columnOrder.map((columnId, index) => {
//               const column = state.columns[columnId];
//               const tasks = column.taskIds.map(
//                 (taskId) => state.tasks[taskId]
//               );

//               return (
//                 <Column
//                   key={columnId}
//                   column={column}
//                   tasks={tasks}
//                   index={index}
//                 />
//               );
//             })}
//             {provided.placeholder}
//           </div>
//         )}
//       </Droppable>
//     </DragDropContext>
//   </div>
// );
