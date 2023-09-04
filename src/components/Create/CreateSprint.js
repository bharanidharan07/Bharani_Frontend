// import React from "react";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import _ from "lodash";

// const CreateSprint = () => {

//    const location = useLocation();
//    const navigate = useNavigate()
//    const [SprDetails, setSprDetails] = useState({
//    })
//    const [taskDetails, setTasDetails] = useState([]);

//    useEffect(() => {
//       console.log(location)
//       if (location.state) {
//          setSprDetails(location.state.SprDetails)
//       }
//    }, [location])
//    useEffect(() => {
//       axios.get('http://localhost:8080/Task')
//          .then(response => {
//             setTasDetails(response.data);
//          })
//    })

//    const changeHandler = (e) => {
//       console.log(e)
//       setSprDetails(prev => ({ ...prev, [e.target.name]: e.target.value }))
//    }



//    const submitHandler = (e) => {
//       e.preventDefault()
//       if (SprDetails.selectTask) {
//          const taskDetails = {
//             taskId: SprDetails.selectTask
//          }
//          SprDetails.taskDetails = taskDetails;
//       }
//       axios.post('http://localhost:8080/sprint', SprDetails).then((res) => {
//          console.log(res.data);
//          navigate("/sprintdetails")

//       });
//    }

//    return (
//       <>
//          <div className="create">
//             <from>
//                <header><h1>CreateSprint</h1></header>
//                <input type="text" placeholder="AssignedBy" name="assigendBy" value={SprDetails.assigendBy} onChange={changeHandler}></input>
//                <input type="text" placeholder="AssignedTo" name="assigendTo" value={SprDetails.assigendTo} onChange={changeHandler} required></input>
//                <input type="text" placeholder="DewDate(dd/MM/yyyy)" name="dewDate" value={SprDetails.dewDate} onChange={changeHandler} required></input>
//                <select name="selectTask" onChange={changeHandler} className="option">
//                   <option selected value={''}>Select Option</option>
//                   {_.map(taskDetails, s => (<option key={s.taskId} value={s.taskId} >{s.taskName}</option>))}
//                </select>
//                <Link><button onClick={submitHandler} id="crt">{location.state ? "Update" : "Create"}</button></Link>
//                <Link to={"/sprintdetails"}> <button id="crte">Back to Sprint</button></Link>
//             </from>
//          </div>
//       </>
//    )
// }
// export default CreateSprint;
