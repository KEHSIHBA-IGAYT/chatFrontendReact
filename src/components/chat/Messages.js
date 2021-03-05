import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

//format the date
const formatDate = (dateString) => {
    return dateString.getDate() + "/"
        + (dateString.getMonth() + 1) + "/"
        + dateString.getFullYear() + " @ "
        + dateString.getHours() + ":"
        + dateString.getMinutes() + ":"
        + dateString.getSeconds();
}

const Messages = ({ chat }) => {
    return (
        <div style={{ width: '100%' }}>
            <List>
                {chat.length && chat.map((message, index) => {
                    return (
                        <>
                            <ListItem alignItems="flex-start" key={index}>
                                <ListItemAvatar>
                                    <Avatar
                                        alt="Aang"
                                        src={`/images/${message.userId}.png`}
                                    />
                                </ListItemAvatar>
                                <div style={{ "display": "block" }}>
                                    <ListItemText style={{ "color": "blue", "font-size": "small" }} primary={formatDate(new Date(message.createdAt))} />
                                    <ListItemText primary={`${message.userName} : ${message.message}`} />
                                </div>
                            </ListItem>
                            <Divider variant="inset" key={"Divider-" + index} component="li" />
                        </>)
                })}

            </List>
        </div >
    )
}

export default Messages;