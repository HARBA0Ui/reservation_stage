import express from "express"
import authRoute from "./routes/auth.route.js"
import reservationRoute from "./routes/reservation.route.js"
import emailRoute from "./routes/email.route.js"
import cors from "cors"


import cookieParser from "cookie-parser"

const app= express()

app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: "http://localhost:4200", 
    credentials: true
}))



app.use("/api/auth", authRoute);
app.use("/api/reservations", reservationRoute);
app.use("/api/email", emailRoute);

// const PORT = process.env.PORT || 80;

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`The server is running at ${PORT}!`)
})

app.use("/api/reservations", reservationRoute);