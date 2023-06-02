import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";

type Todo = {
  id: number;
  title: string;
  status: "done" | "in progress" | "to do";
};

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    fetchToDo();
  }, []);
  const fetchToDo = async () => {
    try {
      const response = await axios.get("http://localhost:3000/todos");
      console.log(response?.data, "response");
      setTodos(response?.data);
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

  const addTodo = async () => {
    if (newTodo.trim() !== "") {
      const todo: Todo = {
        title: newTodo,
        status: "to do",
      };
      try {
        await axios.post("http://localhost:3000/todos", todo);
        setTodos([...todos, todo]);
        setNewTodo("");
      } catch (error) {
        console.error("Ошибка:", error);
      }
    }
  };
  const toggleTodoStatus = async (id: number) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        if (todo.status === "done") {
          return { ...todo, status: "in progress" };
        } else if (todo.status === "in progress") {
          return { ...todo, status: "to do" };
        } else {
          return { ...todo, status: "done" };
        }
      }
      return todo;
    });
    try {
      await axios.put(`http://localhost:3000/todos/${id}`, {
        status: updatedTodos.find((todo) => todo.id === id)?.status,
      });
      setTodos(updatedTodos);
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/todos/${id}`);
      const updatedTodos = todos.filter((todo) => todo.id !== id);
      setTodos(updatedTodos);
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };
  return (
    <>
      <div>
        <h1>Todo List</h1>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Введите новое задание"
        />
        <button onClick={addTodo}>Добавить</button>
        <div>
          <ul>
            {todos.map((todo) => (
              <li key={todo.id}>
                <input
                  type="checkbox"
                  checked={todo.status === "done"}
                  onChange={() => toggleTodoStatus(todo.id)}
                />
                <span
                  style={{
                    textDecoration:
                      todo.status === "done" ? "line-through" : "none",
                  }}
                >
                  {todo.title}
                </span>
                <button onClick={() => deleteTodo(todo.id)}>Удалить</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
