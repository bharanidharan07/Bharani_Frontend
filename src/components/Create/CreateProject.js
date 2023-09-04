// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import _ from "lodash";
// const CreateProject = () => {

//    const location = useLocation();
//    const navigate = useNavigate();
//    const [ProjectDetails, setProjectDetails] = useState({});
//    const [sprint, setSprint] = useState([]);

//    useEffect(() => {
//       console.log(location)
//       if (location.state) {
//          setProjectDetails(location.state.ProDetails)
//       }

//    }, [location])

//    useEffect(() => {
//       axios.get('http://localhost:8080/sprint')
//          .then(response => {
//             setSprint(response.data)
//             console.log(response)
//          })
//    }, [])

//    const changeHandler = (e) => {
//       setProjectDetails(prev => ({ ...prev, [e.target.name]: e.target.value }))
//    }





//    const submitHandler = e => {
//       e.preventDefault()
//       if (ProjectDetails.SelectSprint) {
//          const sprintDetails = {
//             sprintId: ProjectDetails.SelectSprint
//          }
//          ProjectDetails.sprintDetails = sprintDetails;
//       }
//       axios.post('http://localhost:8080/Project', ProjectDetails).then((res) => {
//          console.log(res.data);
//          navigate("/projectdetails")

//       });

//    }
//    return (
//       <>
//          <div className="create">
//             <form onSubmit={submitHandler}>
//                <header><h1>CreateProject</h1></header>
//                <input type="text" placeholder="Name" name="name" value={ProjectDetails.name} onChange={changeHandler} required></input>
//                <input type="text" placeholder="Details" name="details" value={ProjectDetails.details} onChange={changeHandler}></input><br></br>
//                <input type="text" placeholder="Status" name="status" value={ProjectDetails.status} onChange={changeHandler}></input><br></br>
//                <select name="SelectSprint" onChange={changeHandler} className="option">
//                   <option selected value={''}>Select Option</option>
//                   {_.map(sprint, (s) => (<option key={s.sprintId} value={s.sprintId} >{s.name}</option>))}
//                </select>
//                <button type="submit" id="crt" onChange={changeHandler}>{location.state ? "Update" : "Create"}</button>
//                <Link to={"/Projectdetails"}><button id="crte">Back to Project</button></Link>
//             </form>
//          </div>
//       </>
//    )
// }
// export default CreateProject;
