// src/components/Board.tsx

import React, { useState } from "react";
import Column from "./Column";
import { assignees, initialData, PersonT } from "./data";

interface Task {
  id: string;
  content: string;
  assignedTo?: PersonT;
}

export interface ColumnData {
  id: string;
  title: string;
  tasks: Task[];
}


const Board: React.FC = () => {
  const [columns, setColumns] = useState<ColumnData[]>(initialData);
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);

  const handleDragStart = (task: Task) => {
    setDraggedTask(task);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (columnId: string) => {
    if (draggedTask) {
      setColumns((prevColumns) =>
        prevColumns.map((column) => {
          if (column.id === columnId) {
            return {
              ...column,
              tasks: column.tasks
                .filter((task) => task.id !== draggedTask.id)
                .concat(draggedTask),
            };
          } else if (column.tasks.find((task) => task.id === draggedTask.id)) {
            return {
              ...column,
              tasks: column.tasks.filter((task) => task.id !== draggedTask.id),
            };
          }
          return column;
        })
      );
      setDraggedTask(null);
    }
  };

  const handleNewTask = (
    columnId: string,
    content: string,
    assignedTo: PersonT
  ) => {
    setColumns((prevColumns) =>
      prevColumns.map((column) => {
        if (column.id === columnId) {
          return {
            ...column,
            tasks: [
              ...column.tasks,
              { id: crypto.randomUUID(), content, assignedTo },
            ],
          };
        }
        return column;
      })
    );
  };

  const handleUpdateTask = (
    columnId: string,
    taskId: string,
    content: string,
    assignedTo: PersonT
  ) => {
    setColumns((prevColumns) =>
      prevColumns.map((column) => {
        if (column.id === columnId) {
          return {
            ...column,
            tasks: column.tasks.map((task) =>
              task.id === taskId ? { ...task, content, assignedTo } : task
            ),
          };
        }
        return column;
      })
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-violet-200 to-pink-200 p-8">
      <div className="flex space-x-4">
        {columns.map((column) => (
          <Column
            key={column.id}
            column={column}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(column.id)}
            onDragStart={handleDragStart}
            onNewTask={(content, assignedTo) =>
              handleNewTask(column.id, content, assignedTo)
            }
            onUpdateTask={(taskId, content, assignedTo) =>
              handleUpdateTask(column.id, taskId, content, assignedTo)
            }
            assignees={assignees}
            setColumns={setColumns}
          />
        ))}
      </div>
    </div>
  );
};

export default Board;
