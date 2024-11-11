// src/components/Column.tsx
import React, { useState } from "react";
import Task from "./Task";
import { ColumnData } from "./Board";
import { PersonT } from "./data";
 
interface ColumnProps {
  column: {
    id: string;
    title: string;
    tasks: Task[];
  };
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: () => void;
  onDragStart: (task: Task) => void;
  onNewTask: (content: string, assignedTo: PersonT) => void;
  onUpdateTask: (taskId: string, content: string, assignedTo: PersonT) => void;
  assignees: PersonT[];
  setColumns: React.Dispatch<React.SetStateAction<ColumnData[]>>; 
}
const Column: React.FC<ColumnProps> = ({
  column,
  onDragOver,
  onDrop,
  onDragStart,
  onNewTask,
  onUpdateTask,
  assignees,
  setColumns,
}) => {
  const [newTaskContent, setNewTaskContent] = useState("");
  const [newTaskAssignee, setNewTaskAssignee] = useState("");
  const handleNewTask = () => {
    if (newTaskContent.trim() !== "") {
      onNewTask(newTaskContent, newTaskAssignee);
      setNewTaskContent("");
      setNewTaskAssignee("");
    }
  };
  return (
    <div
      onDragOver={onDragOver}
      onDrop={onDrop}
      className="w-1/3 bg-white rounded-lg shadow-lg p-6 min-h-[500px]"
    >
      <h2 className="font-bold text-xl text-gray-800 mb-4">{column.title}</h2>
      <div className="grid grid-cols-5 mt-4 space-x-2 mb-2">
        <input
          type="text"
          value={newTaskContent}
          onChange={(e) => setNewTaskContent(e.target.value)}
          placeholder="Nueva tarea..."
          className="col-span-2 p-2 rounded border"
        />
        <select
          value={newTaskAssignee}
          onChange={(e) => setNewTaskAssignee(e.target.value)}
          className="col-span-2 p-2 rounded border"
        >
          <option value="">Asignar a...</option>
          {assignees.map((assignee) => (
            <option key={assignee} value={assignee}>
              {assignee}
            </option>
          ))}
        </select>
        <button
          onClick={handleNewTask}
          className="bg-blue-500 text-white p-2 rounded"
        >
          +
        </button>
      </div>
      <div className="space-y-3">
        {column.tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            onDragStart={onDragStart}
            onUpdateTask={onUpdateTask}
            assignees={assignees}
            setColumns={setColumns}
          />
        ))}
      </div>
    </div>
  );
};
export default Column;
