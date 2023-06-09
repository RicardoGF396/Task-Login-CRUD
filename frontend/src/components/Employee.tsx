import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { EmployeeInterface } from "../interfaces/Employee";

function Employee() {
  /* Declaramos la variable de entorno que se encuentra en .env */
  const API_URL = import.meta.env.VITE_API_SERVICE_URL;
  const IMAGES_URL = import.meta.env.VITE_IMAGES_URL;

  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = () => {
    axios
      .get(`${API_URL}/employees/all`)
      .then((res) => {
        setEmployees(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (id:string) => {
    axios.delete(`${API_URL}/employees/delete_employee/${id}`)
    .then()
    .catch(err => console.log(err))
  }

  useEffect(() => {
    fetchEmployees()
  }, [employees])

  return (
    <div className="px-5 py-3">
      <div className="d-flex justify-content-center mt-2">
        <h3>Employee List</h3>
      </div>
      <Link to="/create" className="btn btn-success">
        Add Employee
      </Link>
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Salary</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee: EmployeeInterface, index) => (
              <tr key={index}>
                <td>
                  {" "}
                  {
                    <img
                      src={`${IMAGES_URL}/${employee.image}`}
                      alt={"" + index}
                      style={{ width: "40px", borderRadius: "50%" }}
                    />
                  }{" "}
                </td>
                <td> {employee.name} </td>
                <td> {employee.email} </td>
                <td> {employee.address} </td>
                <td> {employee.salary} </td>
                <td className="">
                  <Link to={`/employee_edit/${employee.id}`} className="btn btn-info me-2 btn-sm">Edit</Link>
                  <button onClick={() => {
                    employee.id != undefined ? handleDelete(employee.id.toString()) : null
                  }} className="btn btn-danger btn-sm">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Employee;
