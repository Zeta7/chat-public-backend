const { Pool } = require('pg');

const pool = new Pool({
  user: 'message_lpr0_user',
  host: 'dpg-cqvsbmtumphs73fu73ig-a.oregon-postgres.render.com',
  database: 'message_lpr0',
  password: 'VG2bk2LyIZqSbPRfcG2TTpt9xwE77lch',
  port: 5432,
});

const query = (text, params) => pool.query(text, params);

module.exports = {
  query,
};
