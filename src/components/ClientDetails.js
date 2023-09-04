import axios from "axios";
import React, { Component, useEffect, useState } from "react";
import _ from 'lodash';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Modal } from "@mui/material";
import { ClientDetails } from "./Utils/Modal";
import { FaEdit, FaTrash } from "react-icons/fa";
import { MdLibraryAdd } from 'react-icons/md'

const TaskDetails = () => {
    const [posts, setPost] = useState([])
    const [searchApiData, setSearchApiData] = useState([])
    const [filterValue, setfilterValue] = useState([])
    useEffect(() => {
        getClientDetails()
    }, [])
    const getClientDetails = () => {
        axios.get('http://localhost:8080/Client')
            .then(response => {
                console.log(response)
                setPost(response.data)
                setSearchApiData(response.data)
            })
    }
    const getCount = (id) => {
        return _.size(
            _.filter(posts, r =>
                r.projectDetails.id === id
            )
        )
    }
    const deleteClientHandler = (id) => {
        axios.delete(`http://localhost:8080/Client/${id}`)
            .then(() => {
                getClientDetails()
            }).catch(error => {
                console.log(error);
            })
    }
    const handleFilter = (e) => {
        if (e.target.value === '') {
            setPost(searchApiData)
        } else {
            const filterResult = searchApiData.filter(p => p.name.toLowerCase().includes(e.target.value.toLowerCase())
                || p.type.toLowerCase().includes(e.target.value.toLowerCase()))
            setPost(filterResult)
        }
        setfilterValue(e.target.value)
    }
    // const UpdateClientHandler=(id)=> {
    //     axios.put(`http://localhost:8080/Client/update/${id}`)
    //         .then(response => {
    //             console.log(response)
    //             setPost({ posts: response.data })
    //         })
    //         .catch(error => {
    //             console.log(error)
    //             setPost({ errormsg: 'error retreing data' })
    //         })

    // }


    // creating client detail page like popup

    const location = useLocation();
    const navigate = useNavigate()
    const [cliDetails, setCliDetails] = useState({})
    const [projectDetails, setProjectDetails] = useState([])
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setCliDetails({})
        setOpen(false);

    }

    useEffect(() => {
        //   console.log(location.state.cliDetails, "location")
        console.log(cliDetails, "cliDetails")
        if (location.state) {
            setCliDetails(location.state.cliDetails)
        }
    }, [location])

    useEffect(() => {
        axios.get('http://localhost:8080/Project')
            .then(response => {
                setProjectDetails(response.data)
            })
    }, [])

    const changeHandler = (e) => {
        setCliDetails(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }




    const submitHandler = () => {

        if (cliDetails.selectProject) {
            const projectDetails = {
                id: cliDetails.selectProject
            }
            cliDetails.projectDetails = projectDetails;
        }
        axios.post('http://localhost:8080/Client', cliDetails).then((res) => {
            console.log(res.data);
            handleClose()
            getClientDetails()
        });
    }

    return (
        <>
            <div className="tab">
                <Link id="head" to={"/home"}>Back to Home</Link>
                <Link onClick={handleOpen} id="add"  ><MdLibraryAdd className="logo" title="CreateClient" /></Link>
                <header><h1>ClientDetails</h1>
                    <input type="search" placeholder="search" value={filterValue} onInput={(e) => handleFilter(e)} id="search"></input><hr color="black" />

                </header>
                <div className="content">
                    {_.map(posts, (p) =>
                    (<div id="cnt" >
                        <Link state={{ cliDetails: p }}><i type="submit" onClick={handleOpen} title="Update"><FaEdit className="icon" /></i></Link><br />
                        <i type="submit" value="Delete" id="crte" onClick={() => deleteClientHandler(p.id)} title="Delete"><FaTrash className="icon" /></i>
                        <p><label>Name</label> :{p.name}</p>
                        <p><label>Type</label> :{p.type}</p>
                        <p><label>ProjectName</label> :{p?.projectDetails?.name}</p>
                        <p><label>Project Count</label> : {getCount(p.projectDetails?.id)}</p>

                    </div>)
                    )}

                </div>

            </div>
            <ClientDetails open={open} handleClose={handleClose} submitHandler={() => submitHandler()}
                changeHandler={changeHandler} location={location} projectDetails={projectDetails} cliDetails={cliDetails} />
        </>
    )
}

export default TaskDetails;