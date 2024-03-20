import React, { useState } from "react";

function Card(props) {
  const [task, setTask] = useState("");

  //props
  const list = props.use;
  const setList = props.set;

  //functions
  function inputChange(event) {
    setTask(event.target.value);
  };

  function removeTask(index) {
    const updateList = list.filter((task, i) => i !== index);
    setList(updateList)
  };

  function toggleImportantTask(index) {
    const updateImportant = !list[index].important;

    const updateList = list.map((task, i) =>
    i === index ? { ...task, important: updateImportant } : task);

    setList(updateList);
  };

  function activateEditMode(index){
    const updateEdit = !list[index].editMode;

    const updateList = list.map((task, i) =>
    i === index ? { ...task, editMode: updateEdit } : task);

    setList(updateList);
  };

  function editTask(event, index) {
    const updateTask = event.target.value;

    const updateList = list.map((task, i) =>
    i === index ? { ...task, task: updateTask } : task);

    if (event.key === "Enter" && updateTask !== "") setList(updateList);

  };

  //card
  return (
    <>
      {list.map((element, index) => (
        <div key={index} className="card m-3 col-lg-2">
          <div className="card-body">
            {/*important! icon*/}
            <h3 className="float-end ms-3"
              onClick={() => toggleImportantTask(index)}>
              {element.important === true
                ? <i className="fas fa-star"></i>
                : <i className="far fa-star"></i>}
            </h3>
            {/*task*/}
              {element.editMode === true
              ? <input type="text"
              value={task}
                onChange={event => inputChange(event)}
                placeholder={element.task}
                onKeyDown={event => editTask(event, index)} />

              : <h5 className="card-text col-10"
                onDoubleClick={()=> activateEditMode(index)}>
                  {element.task}
                </h5>}
          </div>

          {/*card footer - check task*/}
          <div
            className="card-footer bg-warning text-light"
            onClick={() => removeTask(index)}
          >
            <h3 className="float-end">
              <i className="fas fa-check"></i>
            </h3>
          </div>
        </div>
      ))}
    </>
  );
}

export default Card;
