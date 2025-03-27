import { DateTime } from 'luxon';
import { useState, useEffect } from 'react';

export interface Todo {
  id: string;
  title: string;
  description: string;
  done: boolean;
  createdAt: DateTime;
  completedAt?: DateTime;
}

export const useTodos = () => {
  const STORAGE_KEY = 'todos';

  // Load todos from localStorage
  const [todos, setTodos] = useState<Todo[]>(() => {
    const storedTodos = localStorage.getItem(STORAGE_KEY);
    return storedTodos ? JSON.parse(storedTodos) : [];
  });

  // Save todos to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  // Add new todo
  const saveTodo = (updatedTodo: Todo) => {
    setTodos((prev) => {
      // Verifica se o todo já existe
      const todoIndex = prev.findIndex((todo) => todo.id === updatedTodo.id);
      if (todoIndex > -1) {
        // Atualiza a tarefa existente
        const updatedTodos = [...prev];
        updatedTodos[todoIndex] = updatedTodo;
        return updatedTodos;
      } else {
        // Adiciona uma nova tarefa
        return [...prev, updatedTodo];
      }
    });
  };

  // Toggle done status by id
  const toggleDone = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              done: !todo.done,
              completedAt: !todo.done ? DateTime.now() : undefined,
            }
          : todo
      )
    );
  };

  // Remove todo by id
  const removeTodo = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return { todos, saveTodo, toggleDone, removeTodo };
};
