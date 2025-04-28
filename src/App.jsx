import { useState } from 'react';
import './App.css';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { text: newTodo, completed: false }]);
      setNewTodo('');
    }
  };

  const handleToggleTodo = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const handleDeleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  return (
    <div className="min-h-screen flex flex-col justify-start items-center w-96 mx-auto">
      <h1 className='font-bold'>Todo List</h1>
      <span>Aplicación para agregar tareas</span>
      <div className="flex gap-2 my-4 w-full">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAddTodo()} 
          placeholder="Add a new todo"
          className='p-2 border rounded-md w-full'
        />
        <button onClick={handleAddTodo} className='text-nowrap !bg-green-800'>Add Todo</button>
      </div>
      {todos.length > 0 && <>
      <span className='w-full text-lg text-center pb-0 mb-0'>Tareas pendientes</span>
      <span className='text-xs w-full text-center pb-2'>Click para completarlas y luego borrarla</span>

      </>
      }
      <ul className="w-96 flex flex-col gap-2">
        {todos.map((todo, index) => (
          <li key={index} className={`relative flex justify-between items-center px-2 w-full border rounded-md bg-neutral-700 hover:bg-neutral-800 duration-200`}>
          {todo.completed && <span className='absolute my-auto left-2 -rotate-12 bg-blue-600 px-2 py-1 rounded-md pointer-events-none'>Completada</span>}
            <span className='w-full text-start p-4 cursor-pointer' onClick={() => handleToggleTodo(index)}>{todo.text}</span>
            {todo.completed && <button onClick={() => handleDeleteTodo(index)} disabled={!todo.completed} className='!bg-red-700'>Delete</button>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
