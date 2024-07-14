import { useState } from "react";
import { useTodo } from "../contexts";

function TodoItem({ todo }) {
  const { updateTodo, deleteTodo, toggleComplete } = useTodo();
  const [isTodoEditAble, setisTodoEditAble] = useState(false);
  const [todoMessage, setTodoMessage] = useState(todo.todo);

  const editTodo = () => {
    updateTodo(todo.id, { ...todo, todo: todoMessage });
    setisTodoEditAble(false);
  };

  const toggleCompleted = () => {
    toggleComplete(todo.id);
  };

  return (
    <div
      className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${
        todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
      }`}
    >
      <input
        type="checkbox"
        className="cursor-pointer"
        checked={todo.completed}
        onChange={toggleCompleted}
      />
      <input
        type="text"
        className={`border outline-none w-full bg-transparent rounded-lg ${
            isTodoEditAble ? "border-black/10 px-2" : "border-transparent"
        } ${todo.completed ? "line-through" : ""}`}
        value={todoMessage}
        onChange={(e) => setTodoMessage(e.target.value)}
        readOnly={!isTodoEditAble}
      />
      {/* Edit, Save Button */}
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
        onClick={() => {
          if (todo.completed) return;

          if (isTodoEditAble) {
            editTodo();
          } else setisTodoEditAble((prev) => !prev);
        }}
        disabled={todo.completed}
      >
        {isTodoEditAble ? "📁" : "✏️"}
      </button>
      {/* Delete Todo Button */}
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
        onClick={() => deleteTodo(todo.id)}
      >
        ❌
      </button>
    </div>
  );
}

export default TodoItem;
