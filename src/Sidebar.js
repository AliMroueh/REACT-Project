import { Avatar, IconButton } from "@material-ui/core"
import SearchIcon from "@material-ui/icons/Search"
import RateReviewOutlinedIcon from "@material-ui/icons/RateReviewOutlined"
import React, { useEffect, useState } from 'react'
import './Sidebar.css'
import SidebarChat from "./SidebarChat"
import {useSelector} from "react-redux"
import { useDispatch } from "react-redux"
import { logout, selectUser } from "./features/userSlice"
import { changesignup } from "./features/signSlice"
import axios from "axios"

function Sidebar() {
    const user = useSelector(selectUser);
    const [chats, setChats] = useState([]);

    const dispatch = useDispatch();
    const out = () => {
        dispatch(logout())
        dispatch(changesignup(false))
    };

    useEffect(() => {
        // const interval = setInterval(() => {
            axios.get('http://localhost/dashboard/imessagephp/getchatName.php')
        .then(res => {
            setChats(res.data)
            // console.log(res.data)
    })
        //   }, 500);
        //   return () => clearInterval(interval);
       
    }, [])

    const addChat = () => {
      const chatName =  prompt("Please Enter A Chat Name");
      if(chatName){
          const obj ={
              chatName: chatName,
          }
          
        axios.post('http://localhost/dashboard/imessagephp/chatName.php',obj)
        .then(res => {
            // console.log(res.data);
        if(res.data == "success"){
           console.log('hello man')
        }
    })
      }
    }
    const propertyNames = Object.values(chats)
    // console.log(propertyNames)
    // console.log(chats)
    return (
        <div className="sidebar">

            <div className="sidebar__header">
                    <Avatar src={user.photo} className="sidebar__avatar" onClick= {out}/>
                    <div className="sidebar__input">
                        <SearchIcon />
                        <input placeholder="Search" />
                    </div>
                    <IconButton variant="outlined" className="sidebar__inputButton" onClick={addChat}>
                    <RateReviewOutlinedIcon/>
                    </IconButton>
                </div>

                <div className="sidebar__chats">
                    {chats.map((data) => 
                    <SidebarChat key={data.chatId} chatId={data.chatId} chatName={data.chatName}/>
                    )}
                    
                    
                </div>
        </div>
    )
}

export default Sidebar
