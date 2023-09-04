// import React from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import _ from "lodash";

// const CreateClient = () => {

//    const location = useLocation();
//    const navigate = useNavigate()
//    const [cliDetails, setCliDetails] = useState({

//    })
//    const [projectDetails, setProjectDetails] = useState([])
//    useEffect(() => {
//       console.log(location)
//       if (location.state) {
//          setCliDetails(location.state.CliDetails)
//       }
//    }, [location])
//    useEffect(() => {
//       axios.get('http://localhost:8080/Project')
//          .then(response => {
//             setProjectDetails(response.data)
//          })
//    }, [])

//    const changeHandler = (e) => {
//       setCliDetails(prev => ({ ...prev, [e.target.name]: e.target.value }))
//    }




//    const submitHandler = () => {
//       if (cliDetails.selectProject) {
//          const projectDetails = {
//             id: cliDetails.selectProject
//          }
//          cliDetails.projectDetails = projectDetails;
//       }
//       axios.post('http://localhost:8080/Client', cliDetails).then((res) => {
//          console.log(res.data);
//          navigate("/clientdetails")

//       });
//    }
//    return (
//       <>

//          <div className="create">

//             <from>
//                <header><h1>CreateClient</h1></header>
//                <input type="text" placeholder="Name" name="name" value={cliDetails.name} onChange={changeHandler} required></input>
//                <input type="text" placeholder="Type" name="type" value={cliDetails.type} onChange={changeHandler}></input>
//                <select name="selectProject" onChange={changeHandler} className="option">
//                   <option selected value={''}>Select Option</option>
//                   {_.map(projectDetails, s => (<option key={s.id} value={s.id} >{s.name}</option>))}
//                </select>
//                <button onClick={submitHandler} id="crt">{location.state ? "Update" : "Create"}</button><br></br>
//                <Link to={"/clientdetails"}><button id="crte">Back to Client</button></Link>
//             </from>
//          </div>
//       </>
//    )
// }
// export default CreateClient;
