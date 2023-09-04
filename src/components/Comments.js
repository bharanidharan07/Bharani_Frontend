
import React, { useEffect, useState } from "react";
import axios from "axios";
import { TiUpload } from 'react-icons/ti'
import _ from "lodash";

export const Comments = (props) => {
    const [posts, setposts] = useState([])
    const[comment,setComment]=useState("")

    useEffect(() => {
        getTaskDetails()
    console.log(props, "props");
    }, [])

    const getTaskDetails = () => {
        axios.get('http://localhost:8080/Task')
            .then(response => {
                setposts(response.data)
            })
    }

    const changeHandler = (e) => {
        setposts(prev => ({ ...prev, comment: e.target.value }))


    }
    const SubmitHandler = async (e, key) => {
        e.preventDefault();
        // console.log(e, key, "keyValue");
        // const savePost = _.filter(posts, post => post.taskId === key)
        // console.log(savePost, "savePost");
        const save = {taskDetails : { taskId: key } , comments: e.target[0].value}
        await axios.post(`http://localhost:8080/comments`, save ).then((res) => {
            console.log(res.data);
            window.location.reload()  
        }).catch(error => {
            console.log(error);
        })
    }
    return (
        <>
            <form onSubmit={(e, key=props.taskId) => SubmitHandler(e, key)} className="comments" key={props?.taskId} >
                <textarea type="text" placeholder="Add comments" name="comment" value={posts?.comment} onChange={changeHandler}></textarea>
                <button type="submit" ><TiUpload id="i" title="upload" /></button>
            </form>

        </>
    )
}