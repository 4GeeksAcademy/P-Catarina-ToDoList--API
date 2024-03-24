import React, { useState } from "react";
import Card from "./Card";
import Theme from "./Theme";


function ToDoList() {
  const [task, setTask] = useState("");
  const [list, setList] = useState([]);
  const [user, setUser] = useState("");
  const [login, setLogin] = useState(false);

  //task functions
  function taskInputChange(event) {
    setTask(event.target.value);
  }

  function addTask() {
    const newTask = [...list, { done: false, label: task}];

    if(task !== '') {
        fetch(`https://playground.4geeks.com/apis/fake/todos/user/${user}`, {
            method: 'PUT',
            body: JSON.stringify(newTask),
            headers: {
              "Content-Type": "application/json"
            }
            }).then(response => {
                if(response.ok) return response.json()
                throw Error(response.status + "! Something Went Wrong")
            }).then(() => {
                fetchUserList();
                setTask("")
            }).catch(err => {
                console.log('Error', err);
            })
            
    } else alert("you gotta write something 🤷")
  }

  //user functions
  function userInputChange(event) {
    setUser(event.target.value);
  }

  function fetchUserList() {
    if(user !== "") {
        fetch(`https://playground.4geeks.com/apis/fake/todos/user/${user}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => {
            if(response.ok) {
                return response.json()
            }
            if(response.status === 404) createUser();
            throw Error(response.status)
        }).then((userList) => {
            setList(userList);
            setLogin(true)
        }).catch(err => {
            console.log(err);
        })

    } else alert("Surely you have a name 😅")
  }

  function createUser() {
      fetch(`https://playground.4geeks.com/apis/fake/todos/user/${user}`, {
          method: 'POST',
          body: JSON.stringify([]),
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

  function removeUser() {
          fetch(`https://playground.4geeks.com/apis/fake/todos/user/${user}`, {
              method: 'DELETE',
              headers: {
                  "Content-Type": "application/json"
              }
          }).then(response => {
              if(response.ok) return response.json()
              throw Error(response.status)
          }).then(() => {
              setUser("")
              setList([])
              setTask("")
              setLogin(false)
              alert("We hate to see you leave 😢")
          }).catch(err => {
              console.log(err);
          })
  }

  return (
    <>
      <div className="d-flex justify-content-between m-3">
        {/*user*/}
        <div className="card col-lg-2 d-flex">
          <div className="card-header bg-warning text-light">
            { user === ""
              ? <h3><i className="fas fa-user"></i></h3>
              : <h3 onClick={removeUser}><i className="fas fa-user-slash"></i></h3>
            }
          </div>
          <input
            type="text"
            value={user}
            onChange={userInputChange}
            onKeyDown={event => {if(event.key === "Enter") fetchUserList()
                                 if(event.key === "Escape") setUser("")
                              }}
          />
        </div>
        {/*light/dark mode*/}
        <Theme />
      </div>

      {/*header*/}
      <h1 className="display-2">Check it like it's hot🔥</h1>
      <p className="display-6">Your everyday list app</p>
      {/*insert task*/}
      { login === false
        ? null
        : <input
            className="display-6 m-5 px-4 border border-secondary-subtle"
            placeholder="tasks, groceries, haters?"
            type="text"
            value={task}
            onChange={taskInputChange}
            onKeyDown={event => {if(event.key === "Enter") addTask()
                                 if(event.key === "Escape") setTask("")
                              }}
          />
      }
      {/*task card list*/}
      <div className="d-lg-flex flex-wrap justify-content-center">
        <Card list={list} user={user} fetch={fetchUserList} />
      </div>
    </>
  );
}

export default ToDoList;
