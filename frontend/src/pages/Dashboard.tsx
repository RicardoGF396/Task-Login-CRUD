import { Link, Outlet, useNavigate } from "react-router-dom"
import 'bootstrap-icons/font/bootstrap-icons.css'
import { useEffect } from "react"
import axios from "axios"

function Dashboard() {
	/* Declaramos la variable de entorno que se encuentra en .env */
	const API_URL = import.meta.env.VITE_API_SERVICE_URL;

	const navigate = useNavigate();
	axios.defaults.withCredentials = true;
	useEffect(() => {
		axios.get(`${API_URL}/users/dashboard`)
		.then(res => {
			if(res.data < 0){
				navigate('/login')
			}
		})
		.catch(err => console.log(err))
	}, [])

	const handleLogout = () => {
		axios.get(`${API_URL}/users/logout`)
		.then(res => {
			navigate("/login")
		})
		.catch(err => console.log(err))
	}

  return (
    <div className="container-fluid">
			<div className="row flex-nowrap">
				<div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
					<div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
						<a href="/" className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none">
							<span className="fs-5 fw-bolder d-none d-sm-inline">Admin Dashboard</span>
						</a>
						<ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
							<li>
								<Link to="/" data-bs-toggle="collapse" className="nav-link text-white px-0 align-middle">
									<span className="ms-1 d-none d-sm-inline">Dashboard</span> </Link>
							</li>
							<li>
								<Link to="/employee" className="nav-link px-0 align-middle text-white">
									<span className="ms-1 d-none d-sm-inline">Manage Employees</span> </Link>
							</li>
							<li>
								<Link to="/profile" className="nav-link px-0 align-middle text-white">
									<span className="ms-1 d-none d-sm-inline">Profile</span></Link>
							</li>
							<li onClick={handleLogout}>
								<p style={{cursor: "pointer"}} className="nav-link px-0 align-middle text-white pointer">
									<span className="ms-1 d-none d-sm-inline">Logout</span></p>
							</li>
						</ul>
					</div>
				</div>
				<div className="col p-0 m-0">
					<div className='p-2 d-flex justify-content-center shadow'>
						<h4>Employee Management System</h4>						
					</div>
					{/* Es parte de react-router-dom y permite rendizar componentes hijos */}
					<Outlet />
				</div>
			</div>
		</div>
  )
}

export default Dashboard