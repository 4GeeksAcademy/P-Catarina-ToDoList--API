import React from "react";

function Card(props) {

    //props
    const list = props.list;
    const user = props.user;
    const fetchUserList = props.fetch;

  //functions
  function removeTask(index){
    const updatedList = list.filter((task, i) => i !== index);

    fetch(`https://playground.4geeks.com/apis/fake/todos/user/${user}`, {
            method: 'PUT',
            body: JSON.stringify(updatedList),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => {
            if(response.ok) return response.json()
            throw Error(response.status + "! Something Went Wrong")
        }).then(() => {
            fetchUserList();
        }).catch(err => {
            console.log('Error', err);
        })
  }

  function toggleImportantTask(index) {
    const updateImportant = !list[index].done;

    const updateList = list.map((task, i) =>
    i === index ? { ...task, done: updateImportant } : task);

    fetch(`https://playground.4geeks.com/apis/fake/todos/user/${user}`, {
            method: 'PUT',
            body: JSON.stringify(updateList),
            headers: {
              "Content-Type": "application/json"
            }
            }).then(response => {
                if(response.ok) return response.json()
                throw Error(response.status + "! Something Went Wrong")
            }).then(() => {
                fetchUserList();
            }).catch(err => {
                console.log('Error', err);
            })            
  }

  //card
  return (
    <>
      {list.map((element, index) => (
        index === 0
        ? null
        :
        <div key={index} className="card m-3 col-lg-2">
          <div className="card-body">
            {/*important! icon*/}
            <h3 className="float-end ms-3"
              onClick={() => toggleImportantTask(index)}>
              {element.done === true
                ? <i className="fas fa-star"></i>
                : <i className="far fa-star"></i>}
            </h3>
            {/*task*/}
            <h5 className="card-text col-10">
              {element.label}
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
