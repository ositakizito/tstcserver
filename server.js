import express from "express";
import mysql from "mysql"
import cors from "cors"

const app = express();
app.use(cors());
app.use(express.json())
const db = mysql.createConnection({
    host: "bqsntoka9w8mvuzkgdxp-mysql.services.clever-cloud.com",
    user: "uwvlxaoj72qmga79",
    password: "GlJ6rfXqMVkzgglQystC",
    database: "bqsntoka9w8mvuzkgdxp"
})

app.get('/', (req, res) => {
    const sql = "SELECT * FROM booking";
    db.query(sql, (err, result) => {
        if (err) return res.json({ Message: "Error inside server" });
        return res.json(result);
    })
})

app.post('/users', (req, res) => {
    const sql = "INSERT INTO users (`firstname`, `lastname`,`usermail`,`usernumber`,`password`,`cpassword`) VALUES (?)";
    console.log(req.body);
    const vlaues = [
        req.body.first,
        req.body.last,
        req.body.email,
        req.body.phone,
        req.body.password,
        req.body.password1

    ]
    db.query(sql, [vlaues], (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
    })
})
app.post('/users', (req, res) => {
    const sql = "SELECT * FROM users WHERE usermail = 'email' && password = 'password'";
    console.log(req.body);
    const vlaues = [
        req.body.email,
        req.body.password

    ]
    db.query(sql, [vlaues], (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
    })
})

app.post('/booking', (req, res) => {
    const sql = "INSERT INTO booking (`userfrom`,`userto`,`family`,`seatno`,`payment`) VALUES (?)";
    console.log(req.body);
    const value = [
        req.body.from,
        req.body.too,
        req.body.fphone,
        req.body.seat,
        req.body.pay

    ]
    db.query(sql, [value], (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
    })
})


app.get('/booking/:id', (req, res) => {
    const sql = "SELECT * FROM booking WHERE TicketID = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, result) => {
        if (err) return res.json({ Message: "Error inside server" });
        return res.json(result);
    })
})


app.listen(3306, () => {
    console.log("Listening")
})