


import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signin, Signing } from './components/Signing';
import Home from './components/Home';
import './App.css';
import Login from './components/Login';
import EmployeeDetails from './components/EmployeeDetails';
import TaskDetails from './components/TaskDetails';
import SprintDetails from './components/SprintDetails';
import ClientDetails from './components/ClientDetails';
import Register from "./components/Register";
import ProjectDetails from "./components/projectDetails";
import { Comments } from "./components/Comments";
import Header from "./components/Header";
import { useEffect } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

function App() {

  useEffect(()=>{
    console.log(window.location.pathname);
  })
  return (
    <div>
        <Header></Header>
        <Routes>

          <Route path='/' element={<Signing />} ></Route>
          <Route path='/login' element={<Login />} ></Route>
          <Route path='/register' element={<Register />} ></Route>
          <Route path='/back' element={<Signing />} ></Route>
          <Route path='/home' element={<Home />} ></Route>
          <Route path='/employeeDetails/:employeeId' element={<EmployeeDetails />} ></Route>
          <Route path='/taskDetails' element={<TaskDetails />} ></Route>
          <Route path='/sprintDetails/:sprintId' element={<SprintDetails />} ></Route>
          <Route path='/sprintDetails' element={<SprintDetails />} ></Route>
          <Route path='/clientDetails' element={<ClientDetails />} ></Route>
          <Route path='/projectDetails/:projectId' element={<ProjectDetails />} ></Route>
          <Route path='/comments' element={<Comments />} ></Route>

        </Routes>
        <ToastContainer  />
      
    </div>
  );
}

export default App;
