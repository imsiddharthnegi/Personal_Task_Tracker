import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import TaskForm from './components/TaskForm';
import TaskFilter from './components/TaskFilter';
import TaskList from './components/TaskList';
import { getTasks, saveTasks, getUsername, clearUserData } from './utils/localStorage';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [tasks, setTasks] = useState([]);
  const [currentFilter, setCurrentFilter] = useState('all');
  const [editingTask, setEditingTask] = useState(null);

  // Load user data on component mount
  useEffect(() => {
    const savedUsername = getUsername();
    if (savedUsername) {
      setUsername(savedUsername);
      setIsLoggedIn(true);
      const savedTasks = getTasks();
      setTasks(savedTasks);
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    if (isLoggedIn) {
      saveTasks(tasks);
    }
  }, [tasks, isLoggedIn]);

  const handleLogin = (username) => {
    setUsername(username);
    setIsLoggedIn(true);
    const savedTasks = getTasks();
    setTasks(savedTasks);
  };

  const handleLogout = () => {
    clearUserData();
    setIsLoggedIn(false);
    setUsername('');
    setTasks([]);
    setCurrentFilter('all');
    setEditingTask(null);
  };

  const generateId = () => {
    return Date.now() + Math.random().toString(36).substr(2, 9);
  };

  const handleAddTask = (taskData) => {
    const newTask = {
      id: generateId(),
      title: taskData.title,
      description: taskData.description,
      completed: false,
      createdAt: new Date().toISOString()
    };
    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  const handleUpdateTask = (taskId, taskData) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId
          ? { ...task, title: taskData.title, description: taskData.description }
          : task
      )
    );
    setEditingTask(null);
  };

  const handleToggleComplete = (taskId) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  const handleDeleteTask = (taskId) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    if (editingTask && editingTask.id === taskId) {
      setEditingTask(null);
    }
  };

  const getFilteredTasks = () => {
    switch (currentFilter) {
      case 'completed':
        return tasks.filter(task => task.completed);
      case 'pending':
        return tasks.filter(task => !task.completed);
      default:
        return tasks;
    }
  };

  const getTaskCounts = () => {
    return {
      all: tasks.length,
      completed: tasks.filter(task => task.completed).length,
      pending: tasks.filter(task => !task.completed).length
    };
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  const filteredTasks = getFilteredTasks();
  const taskCounts = getTaskCounts();

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div className="header-left">
            <h1>📋 Personal Task Tracker</h1>
            <p>Welcome back, <strong>{username}</strong>!</p>
          </div>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      </header>

      <main className="app-main">
        <div className="container">
          <TaskForm
            onAddTask={handleAddTask}
            editingTask={editingTask}
            onUpdateTask={handleUpdateTask}
            onCancelEdit={handleCancelEdit}
          />

          <TaskFilter
            currentFilter={currentFilter}
            onFilterChange={setCurrentFilter}
            taskCounts={taskCounts}
          />

          <TaskList
            tasks={filteredTasks}
            onToggleComplete={handleToggleComplete}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
            currentFilter={currentFilter}
          />
        </div>
      </main>

      <footer className="app-footer">
        <div className="container">
          <p>&copy; 2025 Personal Task Tracker. Built with React.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;

