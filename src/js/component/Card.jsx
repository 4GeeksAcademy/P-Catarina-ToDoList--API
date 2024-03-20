import React from "react";

function Card(props) {

  //props
  const list = props.use;
  const setList = props.set;

  //functions
  function removeTask(index) {
    const updateList = list.filter((task, i) => i !== index);
    setList(updateList)
  }

  function toggleImportantTask(index) {
    const updateImportant = !list[index].important;

    const updateList = list.map((task, i) =>
    i === index ? { ...task, important: updateImportant } : task);

    setList(updateList);
  }

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
            <h5 className="card-text col-10">
              {element.task}
            </h5>
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
