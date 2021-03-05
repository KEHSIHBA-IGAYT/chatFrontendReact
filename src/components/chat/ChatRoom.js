import React, { useState, useEffect, useRef } from 'react';
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import ChatBox from './ChatBox';
import Messages from './Messages';

import chatSocket from '../../services/chat/_chatSocket';
import chatAPI from '../../services/chat/_chatAPI';
import userAPI from '../../services/user/_userAPI';


const useStyles = makeStyles((theme) => ({
    root: {
        // background: 'linear-gradient(45deg, #000000 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        width: 800,
        display: 'flex',
        margin: '20px auto',
        maxHeight: 400,
        overflow: 'auto'
    },
    card: {
        margin: 'auto',
        justifyContent: 'center'
    },
    avatars: {
        margin: 'auto',
        width: theme.spacing(15),
        height: theme.spacing(15),
        padding: '10px',
        justifyContent: 'center'
    }
}));


const ChatRoom = () => {

    const classes = useStyles();

    let { id } = useParams();
    const history = useHistory();

    const [chat, setChat] = useState([]);
    const [user, setUser] = useState({});

    var socketRef = useRef();

    //Setting-up the socket connection
    useEffect(() => {

        //Fetch the chat messages initially
        (async () => {
            const { messages } = await chatAPI();
            setChat(messages);
        })();

        //Fetch the loggedIn user
        (async () => {
            const { data } = await userAPI.getUser();
            if (data.length) {
                console.log(data.length);
                setUser(data[0]);
            } else {
                history.push(`/`);
            }
        })();

        //connect to the web socket
        socketRef.current = chatSocket.connect();

        //Recieve message
        socketRef.current.on("message-added", (data => {
            setChat(chat => [...chat, data])
        }))

        // Clean up - disconnect
        return () => {
            chatSocket.disconnect();
        }

    }, [])



    // Clear the user on tab closing
    useEffect(() => {
        window.addEventListener('beforeunload', alertUser)
        window.addEventListener('unload', handleTabClosing)
        return () => {
            window.removeEventListener('beforeunload', alertUser)
            window.removeEventListener('unload', handleTabClosing)
        }
    })

    const handleTabClosing = () => {
        //clear the loggedIn user
        (async () => {
            await userAPI.clearUser();
        })();
    }

    const alertUser = (event) => {
        event.preventDefault()
        event.returnValue = ''
    }

    //Sending the message
    const sendMessage = (message) => {
        socketRef.current.emit('new-message',
            {
                userId: user.loggedIn,
                userName: user.userName,
                message: message,
                createdAt: new Date().toLocaleString()
            })
    }

    return (
        <div style={{ "width": "100%" }}>
            <Box className={classes.root}>
                {chat.length ?
                    <Messages chat={chat} /> :
                    <div style={{ "height": "600px", "box-shadow": "5px 10px #888888" }}></div>
                }
            </Box>
            <Box className={classes.root}>
                {
                    ((typeof id !== 'undefined') &&
                        (typeof user !== 'undefined') &&
                        (typeof user.loggedIn !== 'undefined') &&
                        id === user.loggedIn &&
                        <ChatBox sendMessage={message => {
                            sendMessage(message);
                        }}
                        />)
                }
            </Box>

        </div>
    )
}

export default ChatRoom;