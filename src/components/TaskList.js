import React from 'react';
import TaskItem from './TaskItem';
import './TaskList.css';

const TaskList = ({ tasks, onToggleComplete, onEditTask, onDeleteTask, currentFilter }) => {
  if (tasks.length === 0) {
    return (
      <div className="task-list-empty">
        <div className="empty-state">
          <div className="empty-icon">📝</div>
          <h3>No tasks found</h3>
          <p>
            {currentFilter === 'all' 
              ? "You haven't created any tasks yet. Add your first task above!"
              : currentFilter === 'completed'
              ? "No completed tasks yet. Mark some tasks as complete to see them here."
              : "No pending tasks. Great job staying on top of your work!"
            }
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="task-list">
      <div className="task-list-header">
        <h3>
          {currentFilter === 'all' && 'All Tasks'}
          {currentFilter === 'completed' && 'Completed Tasks'}
          {currentFilter === 'pending' && 'Pending Tasks'}
        </h3>
        <span className="task-count">
          {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
        </span>
      </div>
      
      <div className="task-items">
        {tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onToggleComplete={onToggleComplete}
            onEditTask={onEditTask}
            onDeleteTask={onDeleteTask}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;

