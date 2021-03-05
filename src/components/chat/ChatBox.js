import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';

const ChatBox = ({ sendMessage }) => {
    const [message, setMessage] = useState("");

    return (
        <div style={{ width: '100%' }}>
            <TextField
                fullWidth
                label="Message"
                margin="normal"
                multiline
                onChange={e => setMessage(e.target.value)}
                onKeyDown={e => {
                    if (e.key === "Enter" && e.shiftKey === false) {
                        e.preventDefault();
                        sendMessage(message);
                        setMessage("");
                    }
                }}
                value={message}
            />
        </div>
    )
}

export default ChatBox;
