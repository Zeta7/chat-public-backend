const { v4: uuidv4 } = require('uuid');
const { query } = require('../config/db');
const { saveMessage, updateMessage, deleteMessage, updateLikes } = require('../controllers/messageController');

module.exports = (io, socket) => {
  console.log('a user connected');

  socket.on('chat message', async (msg) => {
    const messageWithId = { ...msg, id: uuidv4() };
    await saveMessage(messageWithId);
    io.emit('chat message', messageWithId);
  });

  socket.on('edit message', async (updatedMsg) => {
    await updateMessage(updatedMsg);
    io.emit('edit message', updatedMsg);
  });

  socket.on('delete message', async (message) => {
    await deleteMessage(message);
    io.emit('delete message', { id: message.id, message: 'Mensaje eliminado' });
  });

  socket.on('update likes', async (updatedMsg) => {
    await updateLikes(updatedMsg);
    io.emit('update likes', updatedMsg);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  // Cargar mensajes previos de la base de datos al conectar
  (async () => {
    const messages = await query('SELECT * FROM messages ORDER BY created_at ASC');
    socket.emit('chat history', messages.rows);
  })();
};
