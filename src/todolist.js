import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import env from "./settings";
import { useHistory } from "react-router";
function Todolist() {
  const [todolist, setTodolist] = useState([]);
  const [tasks, setTask] = useState("");
  const history = useHistory();
  useEffect(async () => {
    fetchtask();
  }, []);

  let fetchtask = async () => {
    try {
      let todolist = await axios.get(`${env.api}/todolist`, {
        headers: { Authorization: window.localStorage.getItem("app_token") },
      });

      console.log(todolist);
      setTodolist([...todolist.data]);
    } catch (error) {
      console.log(error);
    }
  };

  let handleCreateTask = async () => {
    try {
      let postData = await axios.post(
        `${env.api}/create-task`,
        { tasks },
        {
          headers: { Authorization: window.localStorage.getItem("app_token") },
        }
      );
      fetchtask();
      setTask("");
    } catch (error) {
      alert(error);
    }
  };

  let handleChange = async (e, id) => {
    try {
      let putData = await axios.put(
        `${env.api}/update-task/${id}`,
        {
          status: e.target.checked,
        },
        {
          headers: { Authorization: window.localStorage.getItem("app_token") },
        }
      );
      fetchtask();
    } catch (error) {
      console.log(error);
    }
    console.log(id);
  };

  let handleDelete = async (id) => {
    try {
      await axios.delete(`${env.api}/delete-task/${id}`, {
        headers: { Authorization: window.localStorage.getItem("app_token") },
      });
      fetchtask();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container">
      <button
        class="btn-danger"
        onClick={() => {
          window.localStorage.removeItem("app_token");
          history.push("/login");
        }}
      >
        Logout
      </button>
      <div className="row">
        <div className="col-lg-12">
          <h4>To do Lists</h4>

          <div className="col-lg-12">
            <div class="input-group mb-3">
              <input
                type="text"
                class="form-control"
                value={tasks}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Add tasks"
                aria-label=""
                aria-describedby="button-addon2"
              />
              <button
                onClick={handleCreateTask}
                class="btn btn-primary"
                type="button"
                id="button-addon2"
              >
                Add
              </button>
            </div>
          </div>
          <ul class="list-group">
            {todolist.map((item) => {
              return (
                <li class="list-group-item">
                  <input
                    class="form-check-input me-1"
                    type="checkbox"
                    value=""
                    aria-label="..."
                    onChange={(e) => handleChange(e, item._id)}
                    checked={item.status}
                  />
                  <span
                    style={{
                      textDecoration: item.status ? "line-through" : "",
                    }}
                  >
                    {item.tasks}
                  </span>
                  <button
                    type="button"
                    class="btn btn-danger"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Todolist;
