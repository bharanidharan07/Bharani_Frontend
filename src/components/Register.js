import React, { Component, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import { input } from "@mui/material";
import { toast } from "react-toastify";
import logo from '../components/ssbsoft.png'
import profile from '../components/profile.png'




const Register = () => {


  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [productImage, setProductImage] = useState();
  const [empDetails, setEmpDetails] = useState({
    empName: '',
    email: '',
    password: '',
    phNo: '',
    add: '',
    salary: '',
    role: '',

  })

  useEffect(() => {
    console.log(location)
    if (location.state) {
      setEmpDetails(location.state.empDetails)
    }

  }, [location])

  const changeHandler = (e) => {
    setEmpDetails(prev => (
      { ...prev, [e.target.name]: e.target.value }));
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('empDetails', JSON.stringify(empDetails))
    formData.append('Img', productImage)
    try {
      const response = await axios.post('http://localhost:8080/employee', formData, {headers : {'Content-Type' : "multipart/form-data"}});
      setOpen(true);
      setEmpDetails({});
      toast.success("Register Successful", { position: toast.POSITION.TOP_RIGHT, autoClose: 1000 });
    } catch (error) {
      console.error(error);
    }
  };

  const showLogin = () => {
    navigate('/')
  }
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingLeft: '5rem', }}>
        <div>
          <img src={logo} width='50%' height='250px'></img>
          <h2>SAPIENT SOLUTIONS TO BUSINESS</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', padding: '5rem' }}>
          <h1 style={{ color: 'red', fontSize: '3rem' }}>Registration Form</h1>
          <form onSubmit={(e) => submitHandler(e)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: '3rem', width: "100%" }} className="reg" >
            <div>
              <div className="row">
                <div className="col">
                  <input placeholder="Name" type="text" required name="empName" value={empDetails?.empName || ''} onChange={changeHandler} />
                </div>
                <div className="col">
                  <input placeholder="Email" type="email" name="email" value={empDetails?.email || ''} onChange={changeHandler} />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <input placeholder="Password" type="text" required name="password" value={empDetails?.password || ''} onChange={changeHandler} />
                </div>
                <div className="col">
                  <input placeholder="Number" type="text" name="phNo" value={empDetails?.phNo || ''} onChange={changeHandler} required />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <input placeholder="Address" type="text" name="add" value={empDetails?.add || ''} onChange={changeHandler} required />
                </div>
                <div className="col">
                  <input placeholder="Role" type="text" name="role" value={empDetails?.role || ''} onChange={changeHandler} required />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <input placeholder="Salary" type="text" name="salary" value={empDetails?.salary || ''} onChange={changeHandler} required />
                </div>
                <div className="col">
                  <input type="date" name="date" value={empDetails?.DOB} onChange={changeHandler} required />
                </div>

                {/* <div>
                  <img  alt=''  style={{marginTop:'2rem',display:'flex',marginLeft:'4rem',width:'25%',height:'100px',border:'2px solid black',backgroundColor:'white'}}/>
                    <input type='file' />
                  </div> */}
                <div className='inner-preview'>
                  {/* <div className='image-preview'></div> */}
                  <img src={productImage ? URL.createObjectURL(productImage) : profile} alt={profile} className='image-upload' />
                  <Button className='image-button' variant="contained" component="label">
                    Image
                    <input hidden accept=".jpg , .jpeg, .png" type="file" onChange={(e) => setProductImage(e.target.files[0])} />
                  </Button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Button className="primary" variant="contained" type="Submit" >Register</Button>
                  <Button className="primary" variant="contained" onClick={() => showLogin()}>Login</Button>
                </div>
              </div>
            </div>

            {/* <button><Link to='/back'>Back</Link></button> */}
          </form>
        </div>
      </div>
    </>


  )
}

export default Register;
