import { Server, Socket } from 'socket.io';
import Message from '../models/Message';

export const configureChatSockets = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    console.log('User connected:', socket.id);

    socket.on('join', (userId: string) => {
      socket.join(userId);
      console.log(`User ${userId} joined room ${userId}`);
    });

    socket.on('send_message', async (data: { senderId: string; receiverId: string; content: string }) => {
      try {
        const { senderId, receiverId, content } = data;

        // Save to DB
        const newMessage = new Message({
          senderId,
          receiverId,
          content,
          timestamp: new Date(),
        });
        await newMessage.save();

        // Emit to receiver's room
        io.to(receiverId).emit('receive_message', newMessage);
        
        // Also emit back to sender (optional, can be optimistic UI)
        io.to(senderId).emit('message_sent', newMessage);

      } catch (error) {
        console.error('Error sending message:', error);
      }
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
};
