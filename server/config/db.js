import mysql from "mysql2/promise";

const pool = mysql.createPool({
    host: "localhost",
    port: 3400,
    user: "root",
    password: "0000",
    database: "myapp",

})

export default pool;