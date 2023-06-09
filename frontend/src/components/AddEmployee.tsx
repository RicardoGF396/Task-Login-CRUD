import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EmployeeInterface } from "../interfaces/Employee";
import axios from "axios";

function AddEmployee() {

  /* Declaramos la variable de entorno que se encuentra en .env */
  const API_URL = import.meta.env.VITE_API_SERVICE_URL;

  const [data, setData] = useState<EmployeeInterface>({
    name: "",
    email: "",
    password: "",
    address: "",
    salary: "",
    image: "",
  });

  const navigate = useNavigate()

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formdata = new FormData();
		formdata.append("name", data.name);
		formdata.append("email", data.email);
		formdata.append("password", data.password);
		formdata.append("address", data.address);
		formdata.append("salary", data.salary);
		formdata.append("image", data.image);
    
    axios.post(`${API_URL}/employees/create`, formdata)
    .then(res => navigate("/employee"))
    .catch(err => console.log(err))
  };

  const handleData = (event: React.ChangeEvent<HTMLInputElement>) => {

    const {name, files} = event.target;

    if(name == "image" && files && files.length > 0){
      setData({
        ...data,
        [name]: files[0]
      })
    }else{
      setData({
        ...data,
        [event.target.name]: event.target.value
      })
    }
  }

  return (
    <div className="d-flex flex-column align-items-center pt-4">
      <h2>Add Employee</h2>
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
          />
        </div>
        <div className="col-12">
          <label htmlFor="inputPassword4" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="inputPassword4"
            name="password"
            placeholder="Enter Password"
            onChange={handleData}
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
          />
        </div>
        <div className="col-12 mb-3">
          <label className="form-label" htmlFor="inputGroupFile01">
            Select Image
          </label>
          <input
            type="file"
            className="form-control"
            id="inputGroupFile01"
            name="image"
            onChange={handleData}
          />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            Create
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddEmployee;
