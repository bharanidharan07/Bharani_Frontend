import { Modal } from "@mui/material";
import Button from '@mui/material/Button';
import _ from "lodash";
import React from "react";
// import profile from '../components/profile.png'


export default function CreateEmployee(props) {
    console.log(props, "props")
    return (
        <div>

            <Modal
                open={props.open}
                onClose={props.handleClose}
            >
                <form onSubmit={props.submitHandler} className="reg" style={{ marginTop: '15rem' }}>
                    <h1>Registration Form</h1>
                    <div>
                        <div className="row">
                            <div className="col">
                                <input placeholder="name" type="text" required name="empName" value={props.empDetails?.empName} onChange={props.changeHandler} />
                            </div>
                            <div className="col">
                                <input placeholder="Email" type="email" name="email" value={props.empDetails?.email} onChange={props.changeHandler} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <input placeholder="Password" type="password" required name="password" value={props.empDetails?.password} onChange={props.changeHandler} />
                            </div>
                            <div className="col">
                                <input placeholder="Number" type="text" name="phNo" value={props.empDetails?.phNo} onChange={props.changeHandler} required />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <input placeholder="Address" type="text" name="add" value={props.empDetails?.add} onChange={props.changeHandler} required />
                            </div>
                            <div className="col">
                                <input placeholder="Role" type="text" name="role" value={props.empDetails?.role} onChange={props.changeHandler} required />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <input placeholder="Salary" type="text" name="salary" value={props.empDetails?.salary} onChange={props.changeHandler} required />
                            </div>
                            <div className="col">
                                <input type="date" name="date" value={props.empDetails?.DOB} onChange={props.changeHandler} required />
                            </div>
                            {/* <div className='inner-preview'>
                                
                                <img src={productImage ? URL.createObjectURL(productImage) : profile} alt={profile} className='image-upload' />
                                <Button className='image-button' variant="contained" component="label">
                                    Image
                                    <input hidden accept="image/*" multiple type="file" onChange={(e) => setProductImage(e.target.files[0])} />
                                </Button>
                            </div> */}
                            <div>
                                <Button className="primary" variant="contained" type="Submit" >Register</Button>
                            </div>
                        </div>
                    </div>
                    {/* <Link to={'/back'}><button>Back</button></Link> */}
                </form>
            </Modal>
        </div>
    )
}

export function CreateProject(props) {
    return (
        <>
            <div>
                <Modal
                    open={props.open}
                    onClose={props.handleClose}

                >
                    <div className="create">
                        <form onSubmit={props.submitHandler}>
                            <header><h1>CreateProject</h1></header>
                            <label>Name</label>
                            <input type="text" placeholder="Name" name="name" value={props.ProDetails?.name} onChange={props?.changeHandler} required></input><br></br>
                            <label>Details</label>
                            <input type="text" placeholder="Details" name="details" value={props.ProDetails?.details} onChange={props?.changeHandler}></input><br></br>
                            <label>Status</label>
                            <input type="text" placeholder="Status" name="status" value={props.ProDetails?.status} onChange={props?.changeHandler}></input><br></br>
                            <label>Owner</label>
                            <input type="text" placeholder="Owner" name="owner" value={props.ProDetails?.owner} onChange={props?.changeHandler}></input><br></br>
                            {/* <select name="SelectSprint" onChange={props.props.changeHandler} className="option">
                                <option selected value={''}>Select Option</option>
                                {_.map(props.sprint, s => (<option key={s.sprintId} value={s.sprintId} >{s.name}</option>))}
                            </select> */}
                            <button type='submit' id="crt" onClick={props.handleOpen}>{props?.location.state ? "Update" : "Create"}</button>

                        </form>
                    </div>
                </Modal>
            </div>
        </>
    )
}
export function CreateTask(props) {

    return (
        <div>
            <Modal
                open={props?.open}
                onClose={props?.handleClose}
            >
                <div className="create">
                    <form onSubmit={props?.submitHandler}>

                        <header><h1>CreateTask</h1></header>
                        <label>TaskName</label>
                        <input type="text" placeholder="TaskName" name="taskName" value={props?.TasDetails?.taskName} onChange={props?.changeHandler} required></input><br></br>
                        <label>Discription</label>
                        <input type="text" placeholder="Discription" name="discription" value={props?.TasDetails?.discription} onChange={props?.changeHandler}></input><br></br>
                        <label>TaskStatus</label>
                        <input type="text" placeholder="TaskStatus" name="taskStatus" value={props?.TasDetails?.taskStatus} onChange={props?.changeHandler} required></input><br></br>
                        <label>ReportTo</label>
                        <input type="text" placeholder="ReportTo" name="reportTo" value={props?.TasDetails?.reportTo} onChange={props?.changeHandler}></input><br></br>
                        <label>Comment</label>
                        <input type="text" placeholder="Comment" name="comment" value={props?.TasDetails?.Comment} onChange={props?.changeHandler}></input><br></br>
                        <select name="selectProject" onChange={props?.changeHandler} className="option">
                            <option selected value={''}>Select Project</option>
                            {_.map(props?.projectDetails, s => (<option key={s.id} value={s.id} >{s.name}</option>))}
                        </select>
                        {/* <select name="selectEmployee" onChange={props.props.changeHandler} className="option">
                                <option selected value={''}>Select Employee</option>
                                {_.map(props.employeeDetails, s => (<option key={s.empId} value={s.empId} >{s.empName}</option>))}
                            </select> */}
                        {/* <MultiSelectDropDown
                                value={props?.selectEmployee}
                                list={props?.employeeDetails}
                                handleChange={(event, clear) => props?.handleDepartmentChange(event, clear)}
                                isObject={true}
                                keyValue={'empId'}
                                disabled={props.employeeDetails.length === 0}
                                displayValue={'empName'}
                                placeholder={'selectEmployee'}
                            /> */}

                        <br></br>
                        <button type="submit" placeholder="Create" id="crt">{props?.location.state ? "Update" : "Create"}</button>


                    </form>
                </div>
            </Modal>
        </div>
    )
}
export function ClientDetails(props) {
    return (
        <>
            <div>
                <Modal
                    open={props.open}
                    onClose={props.handleClose}

                >
                    <div className="create">

                        <form onSubmit={props.submitHandler}>
                            <header><h1>CreateClient</h1></header>
                            <label>Name</label>
                            <input type="text" placeholder="Name" name="name" value={props.cliDetails?.name} onChange={props?.changeHandler} required></input><br></br>
                            <label>Type</label>
                            <input type="text" placeholder="Type" name="type" value={props.cliDetails?.type} onChange={props?.changeHandler}></input><br></br>
                            <select name="selectProject" onChange={props?.changeHandler} className="option" >
                                <option selected value={''}>Select Project</option>
                                {_.map(props.projectDetails, s => (<option key={s?.id} value={s?.id} >{s?.name}</option>))}
                            </select><br></br>
                            <button id="crt">{props?.loc?.state ? "Update" : "Create"}</button><br></br>
                        </form>
                    </div>
                </Modal>
            </div>
        </>
    )
}
export function CreateSprint(props) {

    return (
        <>
            <div>
                <Modal
                    open={props.open}
                    onClose={props.handleClose}
                >
                    <div className="create">
                        <form onSubmit={props.submitHandler}>
                            <header><h1>CreateSprint</h1></header>
                            <label> Name </label>
                            <input type="text" placeholder="name" name="name" value={props.SprDetails?.name} onChange={props?.changeHandler}></input><br></br>
                            <label>AssignedBy</label>
                            <input type="text" placeholder="AssignedBy" name="assigendBy" value={props.SprDetails?.assigendBy} onChange={props?.changeHandler}></input><br></br>
                            <label>AssignedTo</label>
                            <input type="text" placeholder="AssignedTo" name="assigendTo" value={props.SprDetails?.assigendTo} onChange={props?.changeHandler} required></input><br></br>
                            <label>DewDate </label>
                            <input type="text" placeholder="DewDate(dd/MM/yyyy" name="dewDate" value={props.SprDetails?.dewDate} onChange={props?.changeHandler} required></input><br></br>
                            <select name="selectProject" onChange={props?.changeHandler} className="option">
                                <option selected value={''}>Select Project</option>
                                {_.map(props.projectDetails, s => (<option key={s.id} value={s.id} >{s.name}</option>))}
                            </select><br></br>
                            <select name="SelectTask" onChange={props?.changeHandler} className="option">
                                <option selected value={''}>Select Task</option>
                                {_.map(props.taskDetails, s => (<option key={s.taskId} value={s.taskId} >{s.taskName}</option>))}
                            </select><br></br>
                            <button type="submit" id="crt">{props?.location.state ? "Update" : "Create"}</button>
                            {/* <Link  to="/"><button>Back</button></Link> */}
                        </form>
                    </div>
                </Modal>
            </div>

        </>
    )
}