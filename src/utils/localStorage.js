// localStorage utility functions for task management

export const saveToLocalStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const getFromLocalStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return defaultValue;
  }
};

export const removeFromLocalStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing from localStorage:', error);
  }
};

// Task-specific localStorage functions
export const saveTasks = (tasks) => {
  saveToLocalStorage('tasks', tasks);
};

export const getTasks = () => {
  return getFromLocalStorage('tasks', []);
};

export const saveUsername = (username) => {
  saveToLocalStorage('username', username);
};

export const getUsername = () => {
  return getFromLocalStorage('username', '');
};

export const clearUserData = () => {
  removeFromLocalStorage('username');
  removeFromLocalStorage('tasks');
};

