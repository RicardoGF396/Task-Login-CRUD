import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  /* Declaramos la variable de entorno que se encuentra en .env */
  const API_URL = import.meta.env.VITE_API_SERVICE_URL;
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const [error, setError] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios
      .post(`${API_URL}/users/login`, values)
      .then((res) => {
        //console.log(res)
        if (res.data.error) {
          setError("Username or password are incorrect");
          setTimeout(() => {
            setError("");
          }, 3000);
        } else {
          navigate('/');
        }
      })
      .catch((err) => {
        console.log(err)
      });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
      <div className="p-3 rounded w-25 loginForm">
        <div className="text-danger">{error && error}</div>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              name="email"
              onChange={handleChange}
              className="form-control rounded-0"
              autoComplete="off"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              onChange={handleChange}
              className="form-control rounded-0"
            />
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">
            {" "}
            Log in
          </button>
          <p>You are agree to our terms and policies</p>
        </form>
      </div>
    </div>
  );
}

export default Login;
