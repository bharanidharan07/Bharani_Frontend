import axios from "axios";
import React, { useEffect, useState } from "react";
import _ from 'lodash';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CreateProject } from "./Utils/Modal";
import { FaEdit, FaTrash } from "react-icons/fa";
import { MdLibraryAdd } from 'react-icons/md';
import { header } from "./Utils/Token";

const ProjectDetails = () => {
    const [post, setPost] = useState([])
    const [searchApiData, setSearchApiData] = useState()
    const [searchsprint, setSearchsprint] = useState([])
    const [filterValue, setfilterValue] = useState([])
    const [findById, setFindById] = useState([])
    const [sprints, setSprints] = useState([])
    // const [showFind, setShowFind] = useState(false)
    const projectId = window.location.pathname.replace('/projectdetails/', '')

    useEffect(() => {
        getProjectDetails()
        getSprintDetails()
    }, [])

    const getSprintDetails = () => {
        axios.get(`http://localhost:8080/sprint`, { headers: header() })
            .then(response => {
                setSprints(response.data)
            })
    }

    const getCount = (id) => {
        return _.size(
            _.filter(sprints, r =>
                r.projectDetails.id === id
            )
        )
    }


    const getProjectDetails = () => {
        axios.get(`http://localhost:8080/Project`, { headers: header() })
            .then(response => {
                setPost(response.data)
                setFindById(_.filter(response.data, (r) => r.id === projectId));
                setSearchsprint(response.data)
            })
    }

    const deleteProjectHandler = (id) => {
        axios.delete(`http://localhost:8080/Project/${id}`)
            .then(() => {
                getProjectDetails()
            }).catch(error => {
                console.log(error);
            })
    }
    // UpdateProjectHandler(id, e) {
    //     axios.put(`http://localhost:8080/Project/update/${id}`)
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
            const filterResult = searchApiData.filter(p => p.name.toLowerCase().includes(e.target.value.toLowerCase())
                || p.status.toLowerCase().includes(e.target.value.toLowerCase()))
            setPost(filterResult)
        }
        setfilterValue(e.target.value)
    }


    // create project
    const location = useLocation();
    const navigate = useNavigate()
    const [ProDetails, setProDetails] = useState({
        name: '',
        details: '',
        status: '',
    })
    const [sprint, setSprint] = useState([]);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setProDetails({})
        setOpen(false);
    }
    useEffect(() => {
        if (location.state) {
            setProDetails(location.state.ProDetails)
        }

    }, [location])

    // useEffect(() => {
    //     axios.get('http://localhost:8080/sprint')
    //         .then(response => {
    //             setSprint(response.data)
    //             console.log(response.data)
    //         })
    // }, [])

    const changeHandler = (e) => {
        setProDetails(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }





    const submitHandler = e => {
        e.preventDefault()
        // if (ProDetails.SelectSprint) {
        //     const sprintDetails = {
        //         sprintId: ProDetails.SelectSprint
        //     }
        //     ProDetails.sprintDetails = sprintDetails;
        // }
        axios.post('http://localhost:8080/Project', ProDetails, { headers: header() }).then((res) => {
            console.log(res.data);
            handleClose()
            getProjectDetails()

        });
    }


    return (
        <>
            <div className="tab">
                <header>
                    <Link id="head" to={"/home"}>Back to Home</Link>
                    <Link id="add" onClick={handleOpen} ><MdLibraryAdd className="logo" title="CreateProject" /></Link>
                    <h1>ProjectDetails</h1>
                    <input type="search" placeholder="search" value={filterValue} onInput={(e) => handleFilter(e)} id="search"></input><hr color="black" />
                </header>
                <div className="content" >
                    {_.map(projectId === '/home' ? post : findById, (p, index) =>
                    (<div key={index} >

                        <div className="card">
                            <Link state={{ ProDetails: p }}><i type="submit" onClick={handleOpen} title="Update"><FaEdit className="icon" /></i></Link>
                            <Link><i type="submit" value="Delete" onClick={() => deleteProjectHandler(p.id)} title="Delete" ><FaTrash className="icon" /></i></Link>
                            <p><label>Name</label>    :{p.name}</p>
                            <p><label>Details</label> :{p.details}</p>
                            <p><label>Status</label> :{p.status}</p>
                            <p><label>Owner</label> :{p.owner}</p>
                            <p><label>Sprint count</label>: {getCount(p.id)}</p>
                        </div>
                    </div>)
                    )}
                </div>

            </div>


            <CreateProject open={open} handleClose={handleClose} submitHandler={submitHandler}
                ProDetails={ProDetails} changeHandler={changeHandler} sprint={sprint} location={location} />

        </>
    )
}

export default ProjectDetails;
