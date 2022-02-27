import { Avatar } from '@material-ui/core'
import React, { forwardRef } from 'react'
import { useSelector } from 'react-redux';
import { selectidId } from './features/idSlice';
import { selectUser } from './features/userSlice';
import './Message.css'


const Message = forwardRef(({contents: {
    msg,
    time,
    sender_id,
}}, ref
) => {
    const user = useSelector(selectUser);
    const useridd = useSelector(selectidId);
    console.log(useridd)
    return (
        <div ref={ref} className={`message ${useridd === sender_id && "message_sender"}`}>
           <Avatar className="message_photo" />
           <p>{msg}</p> 
           <small>{time}</small>
        </div>
    )
})

export default Message
