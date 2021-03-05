import socketIOClient from 'socket.io-client';
import config from "../../config/config.json";

const APP_URL = config.SERVER_BASE_URL;

var socket;
const chatSocket = {
    connect: () => {
        socket = socketIOClient(APP_URL);
        return socket;
    },
    disconnect: () => {
        if (socket)
            socket.disconnect();
    }
}

export default chatSocket;