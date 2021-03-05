import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import { useHistory } from "react-router-dom";

import userAPI from "../../services/user/_userAPI"

const useStyles = makeStyles((theme) => ({
    root: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        width: 800,
        padding: '40px',
        display: 'flex',
        margin: '100px auto',
        justifyContent: 'center'
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

const users = [
    {
        "name": "Aang",
        "userID": "1"
    },
    {
        "name": "Katara",
        "userID": "2"
    },
    {
        "name": "Sokka",
        "userID": "3"
    },
    {
        "name": "Toph",
        "userID": "4"
    },
    {
        "name": "Zuko",
        "userID": "5"
    }
]


const Home = () => {

    const classes = useStyles();

    const history = useHistory();

    const enterChatRoom = async (user) => {
        const { data } = await userAPI.setUser({ userID: user.userID, userName: user.name });
        if (data) {
            history.push(`/chatRoom/${data.loggedIn}`);
        }
    }

    useEffect(() => {
        //Fetch the loggedIn user
        (async () => {
            const { data } = await userAPI.getUser();
            if (data.length) {
                history.push(`/chatRoom`);
            }
        })();

    })

    return (
        <div style={{ width: '100%' }}>
            <Box className={classes.root}>
                {users.map((user, index) => {
                    return (
                        <div className={classes.card} key={user.userID}>
                            <Avatar
                                alt="Aang"
                                src={`/images/${user.userID}.png`}
                                className={classes.avatars}
                                onClick={() => {
                                    enterChatRoom(user);
                                }}
                            />
                            <h3 style={{ "text-align": "center" }}>{user.name}</h3>
                        </div>
                    )
                })}
            </Box>
        </div>
    );
}


export default Home;