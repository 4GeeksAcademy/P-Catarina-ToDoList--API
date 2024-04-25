import React, { useState } from "react";

function Card(props) {

    //props
    const list = props.list
    const fetchUserList = props.fetch

  //functions
  function removeTask(id){
    fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => {
            if(response.ok) fetchUserList()
        }).catch(err => {
            console.log('Error', err)
        })
  }

  function toggleImportantTask(id, task) {    
    task.is_done = !task.is_done

    fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
            method: 'PUT',
            body: JSON.stringify(task),
            headers: {
              "Content-Type": "application/json"
            }
            }).then(response => {
                if(response.ok) return response.json()
                throw Error(response.status + "! Something Went Wrong")
            }).then(() => {
                fetchUserList()
            }).catch(err => {
                console.log('Error', err);
            })            
  }

  //card
  return (
    <>
      {list.map((task, index) => (
        <div key={task.id} className="card m-3 col-lg-2">
          <div className="card-body">
            {/*important! icon*/}
            <h3 className="float-end ms-3"
              onClick={() => toggleImportantTask(task.id, task)}>
              {task.is_done === true
                ? <i className="fas fa-star"></i>
                : <i className="far fa-star"></i>}
            </h3>
            {/*task*/}
            <h5 className="card-text col-10">
              {task.label}
            </h5>
          </div>

          {/*card footer - check task*/}
          <div
            className="card-footer bg-warning text-light"
            onClick={() => removeTask(task.id)}
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
