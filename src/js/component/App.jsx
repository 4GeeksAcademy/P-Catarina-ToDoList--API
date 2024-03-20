import React from "react";
import ToDoList from "./ToDoList";

function App() {
  return (
    <div className="container-fluid text-center p-3">
      <h1 className="display-2 my-4">Check it like it's hot🔥</h1>
      <p className="display-6">Your everyday list app</p>

      <ToDoList />
    </div>
  );
}

export default App;
