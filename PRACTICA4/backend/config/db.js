import mysql from "mysql2";
const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "hospital"
}).promise();

export default pool;