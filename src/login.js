import axios from "axios";
import React, { useState } from "react";
import "./login.css";
import env from "./settings.js";
import { useHistory } from "react-router";
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let loginData = await axios.post(`${env.api}/login`, {
        username,
        password,
      });
      console.log(loginData);
      window.localStorage.setItem("app_token", loginData.data.token);
      // alert(loginData.data.message);
      history.push("/todolist");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="form-group">
            <main class="form-signin">
              <form
                onSubmit={(e) => {
                  handleSubmit(e);
                }}
              >
                <img
                  class="mb-4"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFGiJ_tIEbFuvt7J7d17ldDOetn-PZteEIDQ&usqp=CAU"
                  alt=""
                  width="90"
                  height="100"
                />
                <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

                <div class="form-floating">
                  <input
                    type="email"
                    class="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <label for="floatingInput">Email address</label>
                </div>
                <div class="form-floating">
                  <input
                    type="password"
                    class="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label for="floatingPassword">Password</label>
                </div>

                <div class="checkbox mb-3">
                  <label>
                    <input type="checkbox" value="remember-me" /> Remember me
                  </label>
                </div>
                <input
                  class="w-100 btn btn-lg btn-primary"
                  type="submit"
                  value=" Sign in"
                />
                <p class="mt-5 mb-3 text-muted">© 2017–2021</p>
              </form>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
