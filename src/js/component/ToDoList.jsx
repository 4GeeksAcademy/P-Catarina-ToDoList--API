import React, { useState } from "react";
import Card from "./Card";
import Theme from "./Theme";

function ToDoList() {
  const [task, setTask] = useState("");
  const [list, setList] = useState([]);

  //functions
  function inputChange(event) {
    setTask(event.target.value);
  }

  function addTask(event) {
    //add task
    const newTask = {
      task: event.target.value,
      important: false,
      editMode: false,
    };

    if (event.key === "Enter") {
      task !== ""
        ? setList((l) => [newTask, ...l])
        : alert("you gotta write something 🤷");

      setTask("");
    }

    //restart writing
    if (event.key === "Escape") setTask("");
  }

  return (
    <>
      <Theme />
      <h1 className="display-2 my-4">Check it like it's hot🔥</h1>
      <p className="display-6">Your everyday list app</p>
      {/*insert task*/}
      <input
        className="display-6 m-5 px-4 border border-secondary-subtle"
        placeholder="tasks, groceries, haters?"
        type="text"
        value={task}
        onChange={inputChange}
        onKeyDown={addTask}
      />

      {/*task card list*/}
      <div className="d-lg-flex flex-wrap justify-content-center">
        <Card use={list} set={setList} />
      </div>
    </>
  );
}

export default ToDoList;
