import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditEmployee() {
  const API_URL = import.meta.env.VITE_API_SERVICE_URL;

  const [data, setData] = useState({
    name: "",
    email: "",
    address: "",
    salary: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_URL}/employees/get_employee/${id} `)
      .then((res) => {
        console.log(res);
        setData({
          ...data,
          name: res.data[0].name,
          email: res.data[0].email,
          address: res.data[0].address,
          salary: res.data[0].salary,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const handleData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(data)
    axios
      .put(`${API_URL}/employees/update_employee/${id}`, data)
      .then((res) => navigate('/employee'))
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex flex-column align-items-center pt-4">
      <h2>Update Employee</h2>
      <form className="row g-3 w-50" onSubmit={handleSubmit}>
        <div className="col-12">
          <label htmlFor="inputName" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="inputName"
            placeholder="Enter Name"
            autoComplete="off"
            name="name"
            onChange={handleData}
            value={data.name}
          />
        </div>
        <div className="col-12">
          <label htmlFor="inputEmail4" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="inputEmail4"
            placeholder="Enter Email"
            autoComplete="off"
            name="email"
            onChange={handleData}
            value={data.email}
          />
        </div>
        <div className="col-12">
          <label htmlFor="inputSalary" className="form-label">
            Salary
          </label>
          <input
            type="text"
            className="form-control"
            id="inputSalary"
            placeholder="Enter Salary"
            autoComplete="off"
            name="salary"
            onChange={handleData}
            value={data.salary}
          />
        </div>
        <div className="col-12">
          <label htmlFor="inputAddress" className="form-label">
            Address
          </label>
          <input
            type="text"
            className="form-control"
            id="inputAddress"
            placeholder="1234 Main St"
            autoComplete="off"
            name="address"
            onChange={handleData}
            value={data.address}
          />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditEmployee;
