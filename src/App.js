// import logo from "./logo.svg";
import { v4 as uuidv4 } from "uuid";
import React, { useState, useRef, useEffect } from "react";
import "./App.css";

const App = () => {
  //useref we gonna check for your initial first load of our page
  //
  const firstRender = useRef(true);

  const [inputValue, setInputValue] = useState("");
  const [toDos, setToDos] = useState([]);

  const addTodo = (e) => {
    e.preventDefault();

    // to not add empty string to not runturn to not let th next line run
    if (inputValue.trim() === "") return;

    setToDos([
      ...toDos,
      {
        text: inputValue,
        id: uuidv4(),
      },
    ]);
    setInputValue("");
  };

  // function to remove the Todos
  const removeTodo = (id) => {
    // it ill return all the elemnts in ou =r todo list EXCEPT THE ONE WE CLICK ON
    // NOT THE ID WE CLICK ON
    setToDos(toDos.filter((todo) => todo.id !== id));
  };

  useEffect(() => {
    if (firstRender.current) {
      // console.log("true ");
      firstRender.current = false;
    } else {
      // to set items in out local storage
      localStorage.setItem("Todo", JSON.stringify([...toDos]));
      // console.log("not first page load");
    }
  }, [toDos]);

  // to get the todoes list from our local storage

  useEffect(() => {
    if (localStorage.getItem("Todo") !== null) {
      const newToDos = localStorage.getItem("Todo");
      setToDos(JSON.parse([...toDos, newToDos]));
    }
  }, []);

  return (
    <div className="App">
      <div className="container">
        <form onSubmit={addTodo}>
          <input
            autoFocus
            type="text"
            placeholder="Add a task...."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit">Add</button>
        </form>
        {toDos.map((todo) => (
          <div key={todo.id} className="todo">
            <p>{todo.text}</p>
            <i onClick={() => removeTodo(todo.id)} className="fas fa-trash"></i>
          </div>
        ))}
      </div>
    </div>
  );
};

// const App = () => {
//   const [inputValue, setInputValue] = useState("");
//   const [todos, setTodos] = useState([]);

//   const addTodo = (e) => {
//     // console.log("test");
//     e.preventDefault();

//     // out put the todos,  we have and array and object and we have access to the text and id wi
//     setTodos([
//       ...todos,
//       {
//         text: inputValue,
//         id: uuidv4(),
//       },
//     ]);
//     // clear our inputValue
//     setInputValue("");
//   };

//   return (
//     <div className="App">
//       <div className="container">
//         <form onSubmit={addTodo}>
//           <input
//             type="text"
//             placeholder="Add a task..."
//             value={inputValue}
//             // whatever we writ is gonna get store in out input value state insted of empty string
//             onChange={(e) => setInputValue(e.target.value)}
//           />
//           <button type="submit">Add</button>
//         </form>
//         {todos.map((todo) => {
//           <div key={todo.id} className="todo">
//             <p>{todo.text}</p>
//           </div>;
//         })}
//       </div>
//     </div>
//   );
// };

export default App;
