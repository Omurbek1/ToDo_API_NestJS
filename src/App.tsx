import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";

type Todo = {
  id: number;
  title: string;
  status: boolean;
};

function App() {
  const [getToDo, setToDo] = useState([]);

  useEffect(() => {
    fetchToDo();
  }, []);
  const fetchToDo = async () => {
    try {
      const response = await axios.get("http://localhost:3000/todos");
      console.log(response?.data, "response");
      setToDo(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addToDo = async () => {
    try {
      const response = await axios.post("http://localhost:3000/todos", {
        title: "hello s",
        status: "how are you",
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div>
        <div>
          {getToDo.map((item) => {
            return (
              <>
                <div>
                  <h6>
                    {item.title}
                    <p>{item.status}</p>
                  </h6>
                </div>
              </>
            );
          })}
          <button onClick={addToDo}></button>
        </div>
      </div>
    </>
  );
}

export default App;
