const { query } = require('../config/db');

const saveMessage = async (message) => {
  await query(
    `INSERT INTO messages (id, name, message, reply_to, likes, dislikes, liked_by, disliked_by)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
    [message.id, message.name, message.message,
    message.replyTo ? message.replyTo.id : null,
    message.likes, message.dislikes,
    message.likedBy, message.dislikedBy]
  );
};

const updateMessage = async (updatedMsg) => {
  await query(
    `UPDATE messages SET message = $1 WHERE id = $2`,
    [updatedMsg.message, updatedMsg.id]
  );
};

const deleteMessage = async (message) => {
  await query(
    `UPDATE messages SET message = $1 WHERE id = $2`,
    ['Mensaje eliminado', message.id]
  );
};

const updateLikes = async (updatedMsg) => {
  await query(
    `UPDATE messages SET likes = $1, dislikes = $2, liked_by = $3, disliked_by = $4 WHERE id = $5`,
    [updatedMsg.likes, updatedMsg.dislikes, updatedMsg.likedBy, updatedMsg.dislikedBy, updatedMsg.id]
  );
};

module.exports = {
  saveMessage,
  updateMessage,
  deleteMessage,
  updateLikes,
};
