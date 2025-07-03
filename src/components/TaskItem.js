import React, { useState } from 'react';
import './TaskItem.css';

const TaskItem = ({ task, onToggleComplete, onEditTask, onDeleteTask }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = () => {
    onDeleteTask(task.id);
    setShowDeleteConfirm(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-content">
        <div className="task-header">
          <div className="task-checkbox">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggleComplete(task.id)}
              id={`task-${task.id}`}
            />
            <label htmlFor={`task-${task.id}`} className="checkbox-label">
              <span className="checkmark">✓</span>
            </label>
          </div>
          
          <div className="task-info">
            <h4 className="task-title">{task.title}</h4>
            {task.description && (
              <p className="task-description">{task.description}</p>
            )}
            <div className="task-meta">
              <span className="task-date">
                Created: {formatDate(task.createdAt)}
              </span>
              <span className={`task-status ${task.completed ? 'completed' : 'pending'}`}>
                {task.completed ? '✅ Completed' : '⏳ Pending'}
              </span>
            </div>
          </div>
        </div>
        
        <div className="task-actions">
          <button
            onClick={() => onEditTask(task)}
            className="edit-button"
            title="Edit task"
          >
            ✏️
          </button>
          <button
            onClick={handleDeleteClick}
            className="delete-button"
            title="Delete task"
          >
            🗑️
          </button>
        </div>
      </div>
      
      {showDeleteConfirm && (
        <div className="delete-confirm">
          <p>Are you sure you want to delete this task?</p>
          <div className="confirm-actions">
            <button onClick={handleConfirmDelete} className="confirm-delete">
              Yes, Delete
            </button>
            <button onClick={handleCancelDelete} className="cancel-delete">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskItem;

