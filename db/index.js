require('dotenv').config();
const { Client } = require('pg');

const client = new Client({
  // connectionString: process.env.DATABASE_URL,
  connectionString: "postgres://afidgblrwwfhgm:cf54a880867850795413f0c500531e7207a5ae31b9b2f2d2ed0f3da0e41bdadc@ec2-3-209-39-2.compute-1.amazonaws.com:5432/d4vabis2627eff",
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

// client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
//   if (err) throw err;
//   for (let row of res.rows) {
//     console.log(JSON.stringify(row));
//   }
//   client.end();
// });

module.exports = client;