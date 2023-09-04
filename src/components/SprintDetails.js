import axios from "axios";
import moment from "moment";
import React, { Component, useEffect, useState } from "react";
import _ from 'lodash';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Modal } from "@mui/material";
import { CreateSprint } from "./Utils/Modal";
import { FaEdit, FaTrash } from "react-icons/fa";
import { MdLibraryAdd } from 'react-icons/md'
import { header } from "./Utils/Token";

const SprintDetails = () => {
    const [posts, setPost] = useState([])
    const [searchApiData, setSearchApiData] = useState([])
    const [filterValue, setfilterValue] = useState([])
    const [findById, setFindById] = useState([])
    const [tasks, setTasks] = useState([])
    const sprintid = window.location.pathname.replace('/sprintdetails/', '')
    useEffect(() => {
        getSprintDetails()
    }, [])

    const getSprintDetails = () => {
        console.log("jk");
        axios.get(`http://localhost:8080/sprint`,{headers:header()})
            .then(response => {
                console.log(response);
                setPost(response.data)
                setFindById(_.filter(response.data, (r) => r.sprintId === sprintid));
                setSearchApiData(response.data)
            })
    }
    const getCount = (taskId) => {
        return _.size(
            _.filter(posts, r =>
                r.taskDetails.taskId === taskId
            )
        )
    }

    // const getTaskDetails=()=>{

    //         axios.get('http://localhost:8080/Task')
    //             .then(response => {
    //                 setTasks(response.data)
    //                 console.log(response.data+"logs");
    //             })
    //         }
    //     const getCount = (sprintId) => {
    //         return _.size(
    //             _.filter(tasks, r =>
    //                 r.SprintDetails?.sprintId === sprintId

    //             )
    //         )
    //     }

    const deleteSprintHandler = (id) => {
        console.log(id);
        axios.delete(`http://localhost:8080/sprint/${id}`)
            .then(() => {
                getSprintDetails();
            }).catch(error => {
                console.log(error);
            })
    }
    const handleFilter = (e) => {
        if (e.target.value === '') {
            setPost(searchApiData)
        } else {
            const filterResult = searchApiData.filter(p => p.dewDate.toLowerCase().includes(e.target.value.toLowerCase())
                || p.assigendBy.toLowerCase().includes(e.target.value.toLowerCase()))
            setPost(filterResult)
        }
        setfilterValue(e.target.value)
    }



    // creating sprint page like popup
    const location = useLocation();
    const navigate = useNavigate()
    const [SprDetails, setSprDetails] = useState({
    })
    const [projectDetails, setProjectDetails] = useState([]);
    const [taskDetails, setTaskDetails] = useState([]);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setSprDetails({})
        setOpen(false);
    }

    useEffect(() => {
        console.log(location)
        if (location.state) {
            setSprDetails(location.state.SprDetails)
        }
    }, [location])
    useEffect(() => {
        axios.get('http://localhost:8080/Project')
            .then(response => {
                setProjectDetails(response.data);
            })
    }, [])

    useEffect(() => {
        axios.get('http://localhost:8080/Task')
            .then(response => {
                setTaskDetails(response.data);
            })
    }, [])
    const changeHandler = (e) => {
        console.log(e)
        setSprDetails(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }




    const submitHandler = (e) => {
        e.preventDefault()
        if (SprDetails.selectProject) {
            const projectDetails = {
                id: SprDetails.selectProject
            }
            SprDetails.projectDetails = projectDetails;
        }
        if (SprDetails.SelectTask) {
            const taskDetails = {
                taskId: SprDetails.SelectTask
            }
            SprDetails.taskDetails = taskDetails;
        }
        axios.post('http://localhost:8080/sprint', SprDetails).then((res) => {
            console.log(res.data);
            handleClose();
            getSprintDetails()

        });
    }


    return (
        <>
            <div className="tab">
                <header>
                    <Link id="head" to={"/home"}>Back to Home</Link>
                    <Link id="add" onClick={handleOpen} ><MdLibraryAdd className="logo" title="CreateSprint" /></Link>
                    <h1>SprintDetails</h1>
                    <input type="search" placeholder="search" value={filterValue} onInput={(e) => handleFilter(e)} id="search"></input><hr color="black" />
                </header>
                <div className="content">
                    {_.map(sprintid === '/home' ? posts : findById, (p,idx) =>
                    (<div key={idx} id="cnt">
                        <Link state={{ SprDetails: p }}><i type="submit" id="crt" onClick={handleOpen} title="Update"><FaEdit className="icon" /></i></Link><br></br>
                        <i type="submit" value="Delete" id="crte" onClick={() => deleteSprintHandler(p.sprintId)} title="Delete"><FaTrash className="icon" /></i>
                        <p><label>Name</label> :{p.name}</p>
                        <p><label>AssignedBy</label> :{p.assigendBy}</p>
                        <p><label>AssignedTo</label> :{p.assigendTo}</p>
                        <p><label>DewDate</label> :{p.dewDate}</p>
                        <p><label>Task count</label> : {getCount(p.taskDetails?.taskId)}</p>
                        {/* <p>TaskName :{p?.taskDetails?.taskName}</p> */}
                        <p><Link to={`/taskdetails`}>TaskName</Link> :{p?.taskDetails?.taskName}</p>
                        <p><Link to={`/projectdetails/${p.projectDetails?.id}`}>ProjectName</Link> :{p.projectDetails?.name}</p>



                    </div>)
                    )}

                </div>

            </div>
            <CreateSprint open={open} handleClose={handleClose} submitHandler={submitHandler}
                changeHandler={changeHandler} location={location} projectDetails={projectDetails} SprDetails={SprDetails} taskDetails={taskDetails} />
        </>
    )
}

export default SprintDetails;