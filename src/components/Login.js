import { Alert, Button, TextField } from "@mui/material";
import axios from "axios";
import React, { Component, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import logo from '../components/ssbsoft.png'

const Login = (props) => {
    const navigate = useNavigate()
    const [post, setPost] = useState({

    });

    const changeHandler = (e) => {
        setPost(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }
    const handleLogin = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8080/employee/login', post).then((response) => {
            console.log(response);
            console.log(response, "response");
            localStorage.setItem("token", response.data)
            navigate("/home")
            toast.success("Login Successful", { position: toast.POSITION.TOP_RIGHT, autoClose: 1000 })

        }).catch(err => {
            console.log(err);
        })
    }
    const handleRegister = () => {
        navigate("/register")
    }
    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column',paddingLeft:'5rem' }}>
                    <img src={logo} width='70%' height='250px'></img>
                    <h2>SAPIENT SOLUTIONS TO BUSINESS</h2>
                </div>
                <div style={{display:'flex',flexDirection:'column',width:'100%',alignItems:'center'}} >
                    <h1 style={{ color: "red",fontSize:'3rem' }}>Login Form</h1>
                    <div className="log" >

                        <form onSubmit={(e) => handleLogin(e)}>
                            <div className="log-text">
                                <input id="outlined-basic" label="Email" variant="outlined" type="email" name="email" placeholder="something@gmail.com" required onChange={(e) => changeHandler(e)} />
                                <input className="login-textfield" id="outlined-basic" label="Password" variant="outlined" type="password" name="password" placeholder="password..." required onChange={(e) => changeHandler(e)} />
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <Button className="primary" variant="contained" type="submit">Login</Button>
                                    <Button className="primary" variant="contained" onClick={() => handleRegister()}>Register</Button>
                                </div>
                            </div>
                            {/* <Link to={'/back'} ><button id="b">Back</button></Link> */}
                        </form>
                    </div>
                </div>
            </div >
        </>
    )

}

export default Login;
