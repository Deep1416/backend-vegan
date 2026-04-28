import { Server } from "socket.io";
let io = null;
export function initSocketIo(server) {
    if (io)
        return io;
    io = new Server(server, {
        cors: { origin: true, credentials: true }
    });
    io.use((socket, next) => {
        const userId = (typeof socket.handshake.auth?.userId === "string" ? socket.handshake.auth.userId : null) ??
            (typeof socket.handshake.headers["x-user-id"] === "string" ? socket.handshake.headers["x-user-id"] : null);
        socket.data.userId = userId;
        return next();
    });
    io.on("connection", (socket) => {
        socket.join("feed");
        socket.on("feed:join", () => socket.join("feed"));
        socket.on("feed:leave", () => socket.leave("feed"));
        socket.on("post:join", (postId) => {
            if (typeof postId === "string" && postId.length)
                socket.join(`post:${postId}`);
        });
        socket.on("post:leave", (postId) => {
            if (typeof postId === "string" && postId.length)
                socket.leave(`post:${postId}`);
        });
        socket.on("dm:join", (conversationId) => {
            if (typeof conversationId === "string" && conversationId.length)
                socket.join(`dm:${conversationId}`);
        });
        socket.on("dm:leave", (conversationId) => {
            if (typeof conversationId === "string" && conversationId.length)
                socket.leave(`dm:${conversationId}`);
        });
        socket.on("dm:typing", (payload) => {
            const conversationId = typeof payload?.conversationId === "string" ? payload.conversationId : null;
            if (!conversationId)
                return;
            const userId = socket.data?.userId;
            socket.to(`dm:${conversationId}`).emit("dm:typing", { conversationId, userId, isTyping: Boolean(payload?.isTyping) });
        });
    });
    return io;
}
export function getIo() {
    if (!io)
        throw new Error("Socket.IO not initialized");
    return io;
}
