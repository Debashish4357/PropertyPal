import { Server } from "socket.io";

let onlineUsers = [];

const addUser = (userId, socketId) => {
    const userExists = onlineUsers.find(user => user.userId === userId);
    if (!userExists) {
        onlineUsers.push({ userId, socketId });
        console.log("Online users:", onlineUsers);
    }
};

const removeUser = (socketId) => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
    return onlineUsers.find((user) => user.userId == userId);
};

export const initializeSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: ["http://localhost:5174", "http://localhost:5173"],
            methods: ["GET", "POST"],
            credentials: true
        }
    });

    io.on("connection", (socket) => {
        console.log("User connected:", socket.id);

        socket.on("newUser", (userId) => {
            addUser(userId, socket.id);
        });

        socket.on("sendMessage", ({ receiverId, data }) => {
            console.log("Message data:", data);
            const receiver = getUser(receiverId);
            if (receiver) {
                console.log("Sending to receiver:", receiver.socketId);
                io.to(receiver.socketId).emit("getMessage", data);
            }
        });

        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
            removeUser(socket.id);
        });
    });

    return io;
}; 