import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import logo from '../components/ssbsoft.png'
import Login from './Login';
import Register from './Register';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useLocation, useNavigate } from 'react-router-dom';
import { Token } from '@mui/icons-material';
import EmployeeDetails from './EmployeeDetails';
import ProjectDetails from './projectDetails';
import TaskDetails from './TaskDetails';
import { ClientDetails } from './Utils/Modal';
import SprintDetails from './SprintDetails';

function Header() {
    const path = window.location.pathname;
    const [showLogin, setShowLogin] = useState(true);
    const [showRegister, setShowRegister] = useState(false);
    const [auth, setAuth] = React.useState(true);
    const [token, setToken] = useState();
    const [showIcons, setShowIcons] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [showEmployee, setShowEmployee] = useState(false);
    const [showProject, setShowProject] = useState(false);
    const [showTask, setShowTask] = useState(false);
    const [showSprint, setShowSprint] = useState(false);
    const [showClient, setShowClient] = useState(false);
    const [showMapping, setShowMapping] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    const pathname = location.pathname
    useEffect(() => {
        getToken();
    }, [])

    const menuItems = {
        showEmployee: 'Employee Details',
        showProject: 'Project Details',
        showTask: 'Task Details',
        showSprint: 'Sprint Details',
        showClient: 'Client Details',
    }

    const handleChange = (event) => {
        setAuth(event.target.checked);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLogout = () => {
        localStorage.clear();
        navigate("/")
    }
    const handleShow = (e) => {
        if (e === "showLogin") {
            setShowLogin(true)
            setShowRegister(false)
        }
        else if (e === "showRegister") {
            setShowLogin(false)
            setShowRegister(true)
        }
    }
    const getToken = () => {
        setToken(localStorage.getItem("token"))
    }
    const handleShowIcon = () => {
        setShowIcons((prev => !prev))
    }

    const getButtons = () => {
        const entries = Object.entries(menuItems);
        return (
            <div>
                {entries.map(([key, value]) => (
                    <button key={key} onClick={() => handleGet(key)} style={{
                        background: 'silver',  alignItems: 'center'
                    }}>{value}</button>
                ))}
            </div>
        )
    }
    const handleGet = (e) => {
        console.log(e);
        if (e === "showEmployee") {
            setShowEmployee((prev => !prev))
            setShowProject(false)
            setShowTask(false)
            setShowClient(false)
            setShowSprint(false)
            setShowMapping((prev => !prev))
        }
        else if (e == "showProject") {
            setShowEmployee(false)
            setShowProject((prev => !prev))
            setShowTask(false)
            setShowClient(false)
            setShowSprint(false)
            setShowMapping((prev => !prev))
        }
        else if (e == "showTask") {
            setShowEmployee(false)
            setShowProject(false)
            setShowTask((prev => !prev))
            setShowClient(false)
            setShowSprint(false)
            setShowMapping((prev => !prev))
        }
        else if (e == "showClient") {
            setShowEmployee(false)
            setShowProject(false)
            setShowTask(false)
            setShowClient((prev => !prev))
            setShowSprint(false)
            setShowMapping((prev => !prev))
        }
        else if (e == "showSprint") {
            setShowEmployee(false)
            setShowProject(false)
            setShowTask(false)
            setShowClient(false)
            setShowSprint((prev => !prev))
            setShowMapping((prev => !prev))
        }
    }
    // } else if (e === "showProject") {
    //     this.setState({
    //         showProject: !showProject,
    //         showEmployee: false, showTask: false, showClient: false, showSprint: false, showMapping: !showMapping
    //     })
    // } else if (e === "showTask") {
    //     this.setState({
    //         showTask: !showTask,
    //         showEmployee: false, showProject: false, showClient: false, showSprint: false, showMapping: !showMapping
    //     })
    // } else if (e === "showClient") {
    //     this.setState({
    //         showClient: !showClient,
    //         showEmployee: false, showProject: false, showTask: false, showSprint: false, showMapping: !showMapping
    //     })
    // } else if (e === "showSprint") {
    //     this.setState({
    //         showSprint: !showSprint,
    //         showEmployee: false, showProject: false, showClient: false, showTask: false, showMapping: !showMapping
    //     })

    // }


    return (
        <>
            {pathname === "/" || pathname === "/register" ? null :

                <AppBar position="static">
                    <Toolbar>
                        <Button variant="text" endIcon={<MenuIcon />} onClick={() => handleShowIcon()} title="show Icons" style={{ width: "2rem", color: 'white' }} />

                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                                <img src={logo} width='200px' height='100px' style={{marginRight:'12rem'}}></img>
                            </div>
                        </Typography>
                        <div style={{display:'flex',alignItems:'center'}}>
                            <h4 style={{marginRight:'20rem'}}>SAPIENT SOLUTIONS TO BUSINESS</h4>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={(e) => handleMenu(e)}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'bottom',
                                }}
                                open={anchorEl}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={() => handleLogout()}>LOGOUT</MenuItem>

                            </Menu>
                        </div>


                    </Toolbar>
                </AppBar>
            }
            {showIcons ? getButtons() : ''}
            {showEmployee ? <EmployeeDetails></EmployeeDetails> : null}
            {showProject ? <ProjectDetails></ProjectDetails> : null}
            {showTask ? <TaskDetails></TaskDetails> : null}
            {showClient ? <ClientDetails></ClientDetails> : null}
            {showSprint ? <SprintDetails></SprintDetails> : null}

        </>
    )
}

export default Header;