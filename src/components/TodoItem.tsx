import { IoTrashOutline } from 'react-icons/io5';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import { Todo } from '../hooks/useTodos';

function TodoItem({
  todo,
  onEdit,
  onToggle,
  onRemove,
}: {
  todo: Todo;
  onEdit: (todo: Todo) => void;
  onToggle: () => void;
  onRemove: (id: string) => void;
}) {
  return (
    <div className={`todo-item ${todo.done && 'done'}`}>
      <div className='info'>
        {todo.done ? (
          <IoIosCheckmarkCircleOutline
            className='icon-check'
            onClick={() => onToggle()}
          />
        ) : (
          <span className='undone' onClick={() => onToggle()}></span>
        )}

        <h2>{todo.title}</h2>
      </div>

      <div className='actions'>
        <button
          className='edit'
          onClick={(e) => {
            e.stopPropagation();
            onEdit(todo);
          }}
        >
          <MdOutlineModeEditOutline />
        </button>
        <button
          className='delete'
          onClick={(e) => {
            e.stopPropagation();
            onRemove(todo.id);
          }}
        >
          <IoTrashOutline />
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
