// import React, { useEffect, useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// import _ from "lodash";

// const CreateTask = () => {

//    const location = useLocation();
//    const navigate = useNavigate()
//    const [TasDetails, setTasDetails] = useState({})
//    const [employeeDetails, setEmployeeDetails] = useState([]);

//    useEffect(() => {
//       console.log(location)
//       if (location.state) {
//          setTasDetails(location.state.TasDetails)
//       }
//    }, [location])

//    useEffect(() => {
//       axios.get('http://localhost:8080/employee/all')
//           .then(response => {
//             setEmployeeDetails(response.data)
              
//           })
//   }, [])


//    const changeHandler = (e) => {
//       setTasDetails(prev => ({ ...prev, [e.target.name]: e.target.value }))
//    }



//    const submitHandler = e => {
//       e.preventDefault()
//       if (TasDetails.selectEmployee) {
//          const employeeDetails = {
//              empId: TasDetails.selectEmployee
//          }
//          TasDetails.employeeDetails = employeeDetails;
//      }

//       axios.post('http://localhost:8080/Task', TasDetails).then((res) => {
//          console.log(res.data);
//          navigate("/taskDetails")

//       });
//    }
//    return (
//       <>
//          <div className="create">
//             <form onSubmit={submitHandler}>
//                <header><h1>CreateTask</h1></header>
//                <input type="text" placeholder="TaskName" name="taskName" value={TasDetails.taskName} onChange={changeHandler} required></input>
//                <input type="text" placeholder="TaskStatus" name="taskStatus" value={TasDetails.taskStatus} onChange={changeHandler} required></input>
//                <input type="text" placeholder="ReportTo" name="reportTo" value={TasDetails.reportTo} onChange={changeHandler}></input>
//                <select name="selectEmployee" onChange={changeHandler} className="option">
//                   <option selected value={''}>Select Option</option>
//                   {_.map(employeeDetails, s => (<option key={s.empId} value={s.empId} >{s.empName}</option>))}
//                </select>
//                <button type="submit" placeholder="Create" id="crt">{location.state ? "Update" : "Create"}</button>
//                <Link to={"/taskDetails"}> <button id="crte">Back to Task</button></Link>
//             </form>
//          </div>
//       </>
//    )
// }

// export default CreateTask;
