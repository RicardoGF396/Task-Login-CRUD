import "./App.css";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Employee from "./components/Employee";
import Profile from "./components/Profile";
import Home from "./components/Home";
import AddEmployee from "./components/AddEmployee";
import EditEmployee from "./components/EditEmployee";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route path="" element={<Home />} />
          <Route path="/employee" element={<Employee />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create" element={<AddEmployee />} />
          <Route path="/employee_edit/:id" element={<EditEmployee />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
