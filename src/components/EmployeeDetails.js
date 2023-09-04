import axios from "axios";
import React, { Component, useEffect, useState } from "react";
import _, { toLower } from 'lodash';
import { Link, useLocation, useNavigate } from "react-router-dom";
import CreateEmployee from "./Utils/Modal";
import { FaEdit, FaTrash } from "react-icons/fa";
import { IoIosPersonAdd } from "react-icons/io";
import { header } from "./Utils/Token";
import { toast } from "react-toastify";
import logo from '../components/profile.png'

const EmployeeDetails = () => {

    const [post, setPost] = useState([])
    const [searchApiData, setsearchApiData] = useState([])
    const [filterValue, setfilterValue] = useState([])
    const employeeId = window.location.pathname.replace('/employeedetails/', '')
    const [findById, setFindById] = useState([]);
    const [selectEmployee, setSelectEmployee] = useState([]);
    const [empDetails, setEmpDetails] = useState({
        empName: '',
        email: '',
        add: '',
        phNo: '',
        role: '',
        salary: ''

    })

    useEffect(() => {
        getemployeeDetails(employeeId)
    }, [])
    const getemployeeDetails = () => {
        axios.get('http://localhost:8080/employee/all', { headers: header() })
            .then(response => {
                console.log(response)
                setPost(response.data)
                setFindById(_.filter(response.data, (r) => r.empId === employeeId));
                setsearchApiData(response.data)

            })
            .catch(error => {
                console.log(error)
                setPost({ errormsg: 'error retreing data' })
            })
    }

    const deleteEmployeeHandler = (id) => {
        axios.delete(`http://localhost:8080/employee/${id}`)
            .then(() => {
                getemployeeDetails()
            }).catch(error => {
                console.log(error);
            })

    }
    // UpdateEmployeeHandler(id, e) {
    //     axios.put(`http://localhost:8080/employee/update/${id}`)
    //         .then(response => {
    //             console.log(response)
    //             this.setState({ posts: response.data })
    //         })
    //         .catch(error => {
    //             console.log(error)
    //             this.setState({ errormsg: 'error retreing data' })
    //         })

    // }
    const handleFilter = (e) => {
        if (e.target.value === '') {
            setPost(searchApiData)
        } else {
            const filterResult = searchApiData.filter(p => p.email.toLowerCase().includes(e.target.value.toLowerCase())
                || p.empName.toLowerCase().includes(e.target.value.toLowerCase()))
            setPost(filterResult)
        }
        setfilterValue(e.target.value)
    }


    //for add employee in home page like popup
    const location = useLocation();
    const navigate = useNavigate()

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setEmpDetails({})
        setOpen(false);
        setOpen.createTask(true);
    }

    useEffect(() => {
        console.log(location)
        if (location.state) {
            setEmpDetails(location.state.empDetails)
        }
    }, [location])

    const changeHandler = (e) => {
        setEmpDetails(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }
    const submitHandler = e => {
        e.preventDefault()
        empDetails.employeeDetails = _.filter(post, r =>
            selectEmployee.includes(r.empId)
        )
        console.log(empDetails);
        axios.post('http://localhost:8080/employee', empDetails).then((res) => {
            console.log(res.data);
            setOpen(false)
            getemployeeDetails()
            setSelectEmployee([])
        }).catch(error => {
            toast.error("error", { position: toast.POSITION.TOP_RIGHT, autoClose: 1000 })
            console.log(error, "empDetails error");
        })
    }


    const handleDepartmentChange = (event, isClearAll) => {
        if (isClearAll) {
            setSelectEmployee([])
            return;
        }
        const value = event.target.value;
        setSelectEmployee(value);
    }


    return (
        <>
            <div className="tab">
                <header>
                    {/* <Link id="head" to={"/home"}>Back to Home</Link> */}
                    <Link id="add" onClick={handleOpen}>{location.state ? "Register" : <IoIosPersonAdd title="AddEmployee" className="logo" />}</Link>
                    <input type="search" placeholder="search" value={filterValue} onInput={(e) => handleFilter(e)} id="search"></input><hr color="black" />
                </header>
                <div className="content" >
                    {_.map(employeeId === '/home' ? post : findById, (p, idx) =>

                    (<div key={idx} id="cnt">

                        <div class="card">
                            
                            <Link state={{ empDetails: p }} ><i type="submit" value="Update" title="Update" onClick={handleOpen}><FaEdit className="icon" /></i></Link>
                            <Link><i type="submit" value="Delete" title="delete" onClick={() => deleteEmployeeHandler(p.empId)} ><FaTrash className="icon" /></i></Link>
                            <img src={logo} style={{ width: '80%', margin: 'auto', marginBottom: '2rem' }}></img>
                            <p><label>Name</label>:{p.empName}</p>
                            <p><label>Email </label>       :{p.email}</p>
                            <p><label>Address </label>     :{p.add}</p>
                            <p><label>PhoneNumber</label>  :{p.phNo}</p>
                            <p><label>Role   </label>      :{p.role}</p>
                            <p><label>Salary</label>       :{p.salary}</p>
                        </div>
                    </div>)
                    )}


                </div>
            </div >

            <CreateEmployee
                open={open} handleClose={handleClose} submitHandler={submitHandler} empDetails={empDetails} location={location}
                changeHandler={changeHandler} handleDepartmentChange={handleDepartmentChange} selectEmployee={selectEmployee} employeeDetails={post} />



        </>
    )
}

export default EmployeeDetails;