import React, { Component } from "react";
import { Link } from "react-router-dom";
import './Home.css'
import logo from '../components/ssbsoft.png'
import EmployeeDetails from "./EmployeeDetails";
import ProjectDetails from "./projectDetails";
import SprintDetails from "./SprintDetails";
import TaskDetails from "./TaskDetails";
import ClientDetails from "./ClientDetails";
import TreeItem from '@mui/lab/TreeItem';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { CreateTask } from "./Utils/Modal";
import SendIcon from '@mui/icons-material/Send';
import MenuIcon from '@mui/icons-material/Menu';
import _ from "lodash";
import axios from "axios";
// import { color } from "@mui/system";
// import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
// import Box from '@mui/material/Box';
import { MdCancel } from 'react-icons/md'
import { FaBars } from 'react-icons/fa'
import { SlLogout } from 'react-icons/sl'
import { header } from "./Utils/Token";
import { Button } from "@mui/material";
class Home extends Component {

  state = {
    showEmployee: false,
    showProject: false,
    showTask: false,
    showClient: false,
    showSprint: false,
    showMapping: true,
    projects: [],
    Tasks: [],
    Sprints: [],
    Employee: [],
    Client: [],
    showIcons: false
  }

  menuItems = {
    showEmployee: 'Employee Details',
    showProject: 'Project Details',
    showTask: 'Task Details',
    showSprint: 'Sprint Details',
    showClient: 'Client Details',
}

  componentDidMount() {
    this.getProjectDetails()
    this.getTaskDetails()
    this.getSprintDetails()
    this.getemployeeDetails()
    this.getClientDetails()
  }

  getProjectDetails = () => {
    axios.get(`http://localhost:8080/Project`, { headers: header() })
      .then(response => {
        this.setState({ projects: response.data })
      })
  }
  getTaskDetails = () => {
    axios.get('http://localhost:8080/Task', { headers: header() })
      .then(response => {
        this.setState({ Tasks: response.data })
      })
  }
  getSprintDetails = () => {
    axios.get(`http://localhost:8080/sprint`, { headers: header() })
      .then(response => {
        this.setState({ Sprints: response.data })
      })
  }
  getemployeeDetails = () => {
    axios.get('http://localhost:8080/employee/all', { headers: header() })
      .then(response => {
        this.setState({ Employee: response.data })

      })
  }
  getClientDetails = () => {
    axios.get('http://localhost:8080/Client', { headers: header() })
      .then(response => {
        this.setState({ Client: response.data })
      })
  }

  // handleShow = (e) => {
  //   if (e === "showEmployee") {
  //     this.setState({
  //       showEmployee: !this.state.showEmployee,
  //       showProject: false, showTask: false, showClient: false, showSprint: false, showMapping: !this.state.showMapping
  //     })
  //   } else if (e === "showProject") {
  //     this.setState({
  //       showProject: !this.state.showProject,
  //       showEmployee: false, showTask: false, showClient: false, showSprint: false, showMapping: !this.state.showMapping
  //     })
  //   } else if (e === "showTask") {
  //     this.setState({
  //       showTask: !this.state.showTask,
  //       showEmployee: false, showProject: false, showClient: false, showSprint: false, showMapping: !this.state.showMapping
  //     })
  //   } else if (e === "showClient") {
  //     this.setState({
  //       showClient: !this.state.showClient,
  //       showEmployee: false, showProject: false, showTask: false, showSprint: false, showMapping: !this.state.showMapping
  //     })
  //   } else if (e === "showSprint") {
  //     this.setState({
  //       showSprint: !this.state.showSprint,
  //       showEmployee: false, showProject: false, showClient: false, showTask: false, showMapping: !this.state.showMapping
  //     })

  //   }
  // }
  handleShowIcon = () =>{
    this.setState({ 
      showIcons:!this.state.showIcons
    })
  }

  getButtons = (menuItems) => {
    const entries = Object.entries(menuItems);
    return (
      <React.Fragment>
      {entries.map(([key, value]) => (
          <button style={{background: 'red'}}>{value}</button>
      ))}
      </React.Fragment>
    )
}


  render() {
    return (  
      <div className="home">
          {this.state.showIcons?<div className="menu">
          </div>:""}
        <body>
          <div className="tree">
            {this.state.showMapping ? <TreeView
              aria-label="file system navigator"
              defaultCollapseIcon={<ExpandMoreIcon />}
              defaultExpandIcon={<ChevronRightIcon />}
            >

              <TreeItem nodeId="0" label="Project Names" >
                {_.map(this.state.projects, (Project) => {
                  return <TreeItem nodeId={Project.id} label={Project.name} className="treeview" />
                })}

                <TreeItem nodeId="1" label="TaskName" className="treeitem">
                  {_.map(this.state.Tasks, (Task) => {
                    return <TreeItem nodeId={Task.taskId} label={Task.taskName} className="treeview" />
                  })}

                  <TreeItem nodeId="2" label="Sprint Name">
                    {_.map(this.state.Sprints, (Sprint) => {
                      return <TreeItem nodeId={Sprint.sprintId} label={Sprint.name} className="treeview" />
                    })}
                    <TreeItem nodeId="3" label="Employee Name">
                      {_.map(this.state.Employee, (Employee) => {
                        return <TreeItem nodeId={Employee.empId} label={Employee.empName} className="treeview" />
                      })}

                    </TreeItem>
                  </TreeItem>
                </TreeItem>
              </TreeItem><br></br>
              <TreeItem nodeId="4" label="Client Names">
                {_.map(this.state.Client, (Client, index) => {
                  return <TreeItem nodeId={Client?.id || index} label={Client?.name} className="treeview" />
                })}

              </TreeItem><br></br>
              <TreeItem nodeId="5" label="Mapped View(Project,Task,Sprint,Employee)">
                {_.map(this.state.Tasks, (tasks) => {
                  return (
                    <TreeItem nodeId={tasks.projectDetails?.id} label={tasks.projectDetails?.name}>
                      <TreeItem nodeId={tasks.taskId} label={tasks.taskName}>
                        <TreeItem nodeId={tasks.sprintDetails?.sprintId} label={tasks.sprintDetails?.name}>
                          <TreeItem nodeId={tasks.employeeDetails?.empId} label={tasks.employeeDetails?.empName} />
                        </TreeItem>
                      </TreeItem>
                    </TreeItem>)
                })}
              </TreeItem>

            </TreeView> : ""}
          </div>
        </body>
        <footer>
          <p>copyright@2015</p>
        </footer>

      </div>

    )
  }
}
export default Home;