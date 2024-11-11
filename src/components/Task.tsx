// src/components/Task.tsx
import React, { useState } from "react";
interface Task {
  id: string;
  content: string;
  assignedTo?: string;
}
interface TaskProps {
  task: Task;
  onDragStart: (task: Task) => void;
  onUpdateTask: (taskId: string, content: string, assignedTo: string) => void;
  assignees: string[];
  setColumns: React.Dispatch<React.SetStateAction<any>>; // Tipo para actualizar columnas
}
const Task: React.FC<TaskProps> = ({
  task,
  onDragStart,
  onUpdateTask,
  assignees,
  setColumns,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(task.content);
  const [assignedTo, setAssignedTo] = useState(task.assignedTo || "");
  const handleEdit = () => {
    setIsEditing(true);
  };
  const handleSave = () => {
    setIsEditing(false);
    onUpdateTask(task.id, content, assignedTo);
  };
  return (
    <div
      draggable
      onDragStart={() => onDragStart(task)}
      className="bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-white p-4 rounded-lg shadow-md"
    >
      {isEditing ? (
        <div className="space-y-2">
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 rounded border text-gray-800"
          />
          <select
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            className="w-full p-2 rounded border text-gray-800"
          >
            <option value="">Asignar a...</option>
            {assignees.map((assignee) => (
              <option key={assignee} value={assignee}>
                {assignee}
              </option>
            ))}
          </select>
          <button
            onClick={handleSave}
            className="w-full bg-blue-500 text-white p-2 rounded mt-2"
          >
            Guardar
          </button>
        </div>
      ) : (
        <div>
          <p className="text-xl font-semibold">{task.content}</p>
          {task.assignedTo && (
            <p className="text-sm">
              Asignado a: <span className={` text-lg font-bold ${task.assignedTo === "Luis Miguel" ? "text-yellow-500":"text-green-500"}`}>{task.assignedTo}</span>
            </p>
          )}
          <button onClick={handleEdit} className="mt-2 underline text-sm">
            Editar
          </button>
        </div>
      )}
    </div>
  );
};
export default Task;
