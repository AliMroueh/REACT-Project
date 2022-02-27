import React, { useEffect, useRef, useState } from 'react'
import { IconButton } from "@material-ui/core"
import MicNoneIcon from "@material-ui/icons/MicNone"
import "./Chat.css"
import { useDispatch, useSelector } from 'react-redux';
import { login, selectUser } from './features/userSlice';
import Message from './Message';
import { selectChatId, selectChatName } from './features/chatSlice';
import axios from 'axios';
import { setid } from './features/idSlice';
import FlipMove from 'react-flip-move'

function Chat() {    
    
    const [input, setInput] = useState("");
    const chatName = useSelector(selectChatName);
    const chatId = useSelector(selectChatId);
    const [messages, setMessages] = useState([]);
    const user = useSelector(selectUser);
    const [uid, setUid] = useState("");
    const dispatch = useDispatch();
    const messageEl = useRef(null);
    
    useEffect(() => {
        if(chatId){
            // const interval = setInterval(() => {
                axios.get(`http://localhost/dashboard/imessagephp/getchats.php?id=${chatId}`)
                // {id:chatId})
            .then(res => {
                setMessages(res.data)
                console.log(res.data)
                
        })
            // }, 2000);
            //     return () => clearInterval(interval);
            // console.log(user.user.uid)
     }

     axios.post('http://localhost/dashboard/imessagephp/getuserid.php',{
            useremail: user.user.email
        })
        .then(res => {
            setUid(res.data);
            console.log(res.data)
        })
    }, [chatId])

    dispatch(
        setid({
            idId:uid})
            );

    
    const sendMessage = (e) => {
        e.preventDefault();
        
        axios.post('http://localhost/dashboard/imessagephp/setchat.php',{
            id:chatId,
            userid:uid,
            data:input,
        })
            .then(res => {
                // console.log(res.data)
        })

        setInput("");
    };
    // console.log(chatId)
    
    //   scroll to botton automatically
    useEffect(() => {
        if (messageEl) {
          messageEl.current.addEventListener('DOMNodeInserted', event => {
            const { currentTarget: target } = event;
            target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
          });
        }
      }, [])

    return (
        <div className="chat">
            <div className="chat__header">
                <h4>To: <span className="chat__name">{chatName}</span></h4>
                <strong>Details</strong>
            </div>
            {/* the ref is for scroll to bottom automatically */}
            <div className = "chat__messages" ref={messageEl}>
                <FlipMove>
                {messages.map((message,key) =>
                <Message key={key} contents={message} />
                  )}
                </FlipMove>
                
            </div>

            <div className="chat__input">
                <form>
                    <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="iMessage" type="text" />
                    <button onClick={sendMessage}>Send Message</button>
                </form>
                <IconButton>
                <MicNoneIcon className="chat__mic"/>
                </IconButton>
            </div>
        </div>
    )
}

export default Chat
