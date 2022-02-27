import { Avatar } from '@material-ui/core'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { setChat } from "./features/chatSlice"
import "./SidebarChat.css"

function SidebarChat(props) {
    const dispatch = useDispatch();
    const [chatinfo, setChatinfo] = useState([]);

    useEffect(() => {
        // const interval = setInterval(() => {
            axios.get(`http://localhost/dashboard/imessagephp/getchats.php?id=${props.chatId}`
            //   {id:props.chatId}
              )
        .then(res => {
            setChatinfo(res.data)
            console.log(res.data)
            // console.log(res.data)
            
    })
        // }, 2000);
            // return () => clearInterval(interval);
    }, [props.chatId])
console.log(chatinfo.length)
    return (
        <div
        onClick={() =>
        dispatch(
            setChat({
                chatId: props.chatId,
                chatName: props.chatName
            })
        )
        }
        className="SidebarChat">
            <Avatar />
            <div className="sidebarChat__info">
                <h3>{props.chatName}</h3>
                <p>{chatinfo[chatinfo.length-1]?.msg}</p>
                <small>{chatinfo[chatinfo.length-1]?.time}</small>
            </div>
        </div>
    )
}

export default SidebarChat
