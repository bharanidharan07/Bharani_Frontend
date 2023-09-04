import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { TreeItem, TreeView } from "@mui/lab";
import axios from "axios";
import _ from 'lodash';
import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { MdAddComment, MdLibraryAdd } from 'react-icons/md';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Comments } from "./Comments";
import { CreateTask } from "./Utils/Modal";
import { header } from "./Utils/Token";

const TaskDetails = () => {
    const [posts, setPost] = useState([])
    const [searchApiData, setSearchApiData] = useState([])
    const [filterValue, setfilterValue] = useState([])
    
    useEffect(() => {
        getTaskDetails()
    }, [])

    const getTaskDetails = () => {
        axios.get('http://localhost:8080/Task',{headers:header()})
            .then(response => {
                setPost(response.data)
                console.log(response.data, "gf");
                let ids = []
                _.map(response.data, r => {
                    ids.push(r.taskId)
                })
                setSearchApiData(response.data)
                getComments(ids)
            })
    }
    const getCount = (empId) => {
        return _.size(
            _.filter(posts, r =>
                r.employeeDetails.empId === empId
            )
        )
    }
    const deleteTaskHandler = (id) => {
        axios.delete(`http://localhost:8080/Task/${id}`)
            .then(() => {
                getTaskDetails()
            }).catch(error => {
                console.log(error);
            })
    }
    const handleFilter = (e) => {
        if (e.target.value === '') {
            setPost(searchApiData)
        } else {
            const filterResult = searchApiData.filter(p => p.taskName.toLowerCase().includes(e.target.value.toLowerCase())
                || p.taskStatus.toLowerCase().includes(e.target.value.toLowerCase())
                || p.projectDetails.name.toLowerCase().includes(e.target.value.toLowerCase())
                || p.sprintDetails.name.toLowerCase().includes(e.target.value.toLowerCase())
                || p.employeeDetails.empName.toLowerCase().includes(e.target.value.toLowerCase()))
            setPost(filterResult)
        }
        setfilterValue(e.target.value)
    }
    // UpdateTaskHandler(id, e) {
    //     axios.put(`http://localhost:8080/Task/update/${id}`)
    //         .then(response => {
    //             console.log(response)
    //             this.setState({ posts: response.data })
    //         })
    //         .catch(error => {
    //             console.log(error)
    //             this.setState({ errormsg: 'error retreing data' })
    //         })

    // }



    //task details
    const location = useLocation();
    const navigate = useNavigate()
    const [TasDetails, setTasDetails] = useState({})
    const [employeeDetails, setEmployeeDetails] = useState([]);
    const [projectDetails, setProjectDetails] = useState([]);
    const [sprintDetails, setSprintDetails] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [showComments, setShowcomments] = useState([]);
    const [comments, setComments] = useState()
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setTasDetails({})
        setOpen(false);
    }

    useEffect(() => {
        console.log(location)
        if (location.state) {
            setTasDetails(location.state.TasDetails)
        }
    }, [location])

    useEffect(() => {
        axios.get('http://localhost:8080/Project')
            .then(response => {
                setProjectDetails(response.data)

            })
    }, [])


    useEffect(() => {
        axios.get('http://localhost:8080/employee/all')
            .then(response => {
                setEmployeeDetails(response.data)

            })
    }, [])

    const getComments = (ids) => {
        axios.get(`http://localhost:8080/comments/getcomment?taskId=${ids}`)
            .then(response => {
                setComments(response.data)
                console.log(comments, 'c');
            })
    }

    const changeHandler = (e) => {
        setTasDetails(prev => ({ ...prev, [e.target.name]: e.target.value }))


    }
    // const HandleChange=(index,e)=>{
    //     let task = _.cloneDeep(posts)
    //     task[index].comment = e.target.value
    //     setTasDetails(task)
    // }

    const submitHandler = (e, p) => {
        e.preventDefault()
        if (TasDetails.selectEmployee) {
            const employeeDetails = {
                empId: TasDetails.selectEmployee
            }
            TasDetails.employeeDetails = employeeDetails;
        }
        if (TasDetails.selectProject) {
            const projectDetails = {
                id: TasDetails.selectProject
            }
            TasDetails.projectDetails = projectDetails;
        }

        axios.post('http://localhost:8080/Task', TasDetails).then((res) => {
            console.log(res.data);
            // setTasDetails(res.data)
            setOpen(false);
            getTaskDetails()

        });
    }
    const handleshow = (e) => {
        if (e === "showComments") {
            setShowcomments(!showComments)
        }
    }

    return (
        <>
            <div className="tab">
                <Link id="head" to={"/home"}>Back to Home</Link>
                <Link id="add" onClick={handleOpen}><MdLibraryAdd className="logo" title="CreateTask" /></Link>
                <header><h1>TaskDetails</h1>
                    <input type="search" placeholder="search" value={filterValue} onInput={(e) => handleFilter(e)} id="search"></input><hr color="black" />

                </header>
                <div className="content">
                    {_.map(posts, (p, index) =>
                    (<div key={index} id="cnt">
                        <Link state={{ TasDetails: p }}><i type="submit" id="crt" onClick={handleOpen} title="Update"><FaEdit className="icon" /></i></Link><br></br>
                        <i type="submit" value="Delete" id="crte" onClick={() => deleteTaskHandler(p.taskId)} title="Delete"><FaTrash className="icon" /></i>
                        <p><label>Name</label>     :{p.taskName}</p>
                        <p><label>Status</label>   :{p.taskStatus}</p>
                        <p><label>ReportTo</label> :{p.reportTo}</p>
                        <p><label>Discription</label> :{p.discription}</p>
                        <p><label>Employee count</label> :{getCount(p.employeeDetails?.empId)}</p>
                        <p><Link to={`/projectdetails/${p.projectDetails?.id}`}>ProjectName</Link> :{p.projectDetails?.name}</p>
                        <p><Link to={`/employeedetails/${p.employeeDetails?.empId}`}>EmployeeName</Link> :{p.employeeDetails?.empName}</p>

                        <TreeView className="tree"
                            aria-label="multi-select"
                            defaultCollapseIcon={<ExpandMoreIcon />}
                            defaultExpandIcon={<ChevronRightIcon />}
                        >

                            <TreeItem nodeId="0" label="comments">
                                {comments ? _.map(comments[p.taskId], (comment) => {
                                    return <TreeItem nodeId="1" label={comment?.comments} className="treeview" />
                                })
                                    : null}
                            </TreeItem>
                        </TreeView>

                        <i onClick={() => handleshow("showComments")}><MdAddComment title="Add comments" id="icon" /></i>

                        {showComments ? <Comments taskId={p.taskId}></Comments> : null}


                    </div>)

                    )}

                </div>
            </div>
            <CreateTask open={open} handleClose={handleClose} submitHandler={submitHandler}
                changeHandler={changeHandler} employeeDetails={employeeDetails} location={location} TasDetails={TasDetails}
                projectDetails={projectDetails} sprintDetails={sprintDetails} />
        </>
    )
}

export default TaskDetails;