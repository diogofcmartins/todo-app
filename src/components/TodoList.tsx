import { useState } from 'react';
import TodoPopup from './TodoPopup';
import { IoIosAdd } from 'react-icons/io';
import TodoItem from './TodoItem';
import { Todo, useTodos } from '../hooks/useTodos';

function TodoList() {
  const { todos, saveTodo, toggleDone, removeTodo } = useTodos();
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

  const togglePopup = (todo: Todo | null = null) => {
    setSelectedTodo(todo);
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <>
      <button
        className='primary btn-icon add-btn'
        onClick={() => togglePopup()}
      >
        <IoIosAdd className='icon' style={{ fontSize: '2.2rem' }} />{' '}
        <span>Add Todo</span>
      </button>

      <div className='todo-list'>
        {todos.map((todo) => (
          <TodoItem
            todo={todo}
            key={todo.id}
            onEdit={() => togglePopup(todo)}
            onToggle={() => toggleDone(todo.id)}
            onRemove={() => removeTodo(todo.id)}
          />
        ))}
      </div>

      {todos.length === 0 && (
        <p className='empty-list'>
          The first step to productivity is starting. Add your first task!
        </p>
      )}

      {isPopupOpen && (
        <div className='overlay'>
          <TodoPopup
            todo={selectedTodo}
            closePopup={() => setIsPopupOpen(false)}
            setTodos={saveTodo}
          />
        </div>
      )}
    </>
  );
}

export default TodoList;
