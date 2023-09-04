// import { Snackbar } from "@mui/material";
// import axios from "axios";
// import { useEffect, useState } from "react"
// import { useLocation, Link, useNavigate } from "react-router-dom"


// const CreateEmployee = () => {
//     const location = useLocation();
//     const [open, setOpen] = useState(false);
//     const navigate = useNavigate()
//     const [empDetails, setEmpDetails] = useState({
//         empName: '',
//         email: '',
//         password: '',
//         phNo: '',
//         add: '',
//         salary: '',
//         role: ''
//     })

//     useEffect(() => {
//         console.log(location)
//         if (location.state) {
//             setEmpDetails(location.state.empDetails)
//         }
//     }, [location])

//     const changeHandler = (e) => {
//         setEmpDetails(prev => ({ ...prev, [e.target.name]: e.target.value }))
//     }
//     const submitHandler = e => {
//         e.preventDefault()

//         axios.post('http://localhost:8080/employee', empDetails).then((res) => {
//             console.log(res.data);
//             navigate("/employeedetails")
//             setOpen(true)

//         });
//     }
//     const handleClose = (reason) => {
//         if (reason === 'clickaway') {
//             return;
//         }

//         setOpen(false);
//     };

//     return (

//         <div>
//             <div>

//                 <form onSubmit={submitHandler} className="reg">
//                     <h1>Registration Form</h1>
//                     <input type="text" placeholder="name" name="empName" value={empDetails.empName} onChange={changeHandler}></input><br />
//                     <input type="email" placeholder="email" required name="email" value={empDetails.email} onChange={changeHandler}></input><br />
//                     <input type="text" placeholder="password" required name="password" value={empDetails.password} onChange={changeHandler}></input><br />
//                     <input type="text" placeholder="PhoneNumber" name="phNo" value={empDetails.phNo} onChange={changeHandler}></input><br />
//                     <input type="text" placeholder="Add" name="add" value={empDetails.add} onChange={changeHandler}></input><br />
//                     <input type="text" placeholder="Role" name="role" value={empDetails.role} onChange={changeHandler}></input><br />
//                     <input type="text" placeholder="Salery" name="salary" value={empDetails.salary} onChange={changeHandler}></input><br />
//                     <button type="Submit" >{location.state ? "update" : "Create"}</button><br></br>
//                     <Link to={'/back'}><button>Back</button></Link>
//                 </form>
//             </div>

//             <Snackbar
//                 open={open}
//                 autoHideDuration={6000}
//                 onClose={handleClose}
//                 message="Register Successfull"

//             />
//         </div>
//     )
// }

// export default CreateEmployee;