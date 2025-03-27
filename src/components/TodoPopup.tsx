import { useId, useState } from 'react';
import { Todo } from '../hooks/useTodos';
import { DateTime } from 'luxon';

function TodoPopup({
  todo,
  closePopup,
  setTodos,
}: {
  todo: Todo | null;
  closePopup: () => void;
  setTodos: (todo: Todo) => void;
}) {
  const generatedId = useId();
  const [formData, setFormData] = useState<Todo>({
    id: todo ? todo.id : generatedId,
    title: todo ? todo.title : '',
    description: todo ? todo.description : '',
    done: todo ? todo.done : false,
    createdAt: todo
      ? DateTime.fromISO(todo.createdAt.toString())
      : DateTime.now(),
    completedAt: todo?.completedAt
      ? DateTime.fromISO(todo.completedAt.toString())
      : undefined,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTodos(formData);
    closePopup();
  };

  return (
    <div className='popup'>
      <h3>{todo ? 'Todo details' : 'Add todo'}</h3>


      <form onSubmit={handleSubmit}>
        <input
          type='text'
          id='title'
          name='title'
          placeholder='Title'
          value={formData.title}
          onChange={handleChange}
        />

        <textarea
          id='description'
          name='description'
          placeholder='Description'
          rows={8}
          value={formData.description}
          onChange={handleChange}
        />

        <div className='info'>
          <span>
            {todo &&
              `Created at: ${DateTime.fromISO(
                todo.createdAt.toString()
              ).toFormat('dd-MM-yyyy, HH:mm')}`}
          </span>
          <span>
            {todo?.completedAt &&
              `Completed at: ${DateTime.fromISO(
                todo.completedAt.toString()
              ).toFormat('dd-MM-yyyy, HH:mm')}`}
          </span>
        </div>

        <div className='actions'>
          <button type='button' onClick={closePopup}>
            Cancel
          </button>
          <button type='submit' className='primary'>
            {todo ? 'Update' : 'Add'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default TodoPopup;
