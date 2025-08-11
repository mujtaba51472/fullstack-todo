import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
// import userRoutes from './routes/userRoutes.js'
import userRoutes from "../backend/routes/userRoutes.js";
import todoRoutes from "../backend/routes/todoRoutes.js";
dotenv.config()
const PORT = process.env.PORT || 5000

const app = express()
// in Express
app.use(cors({
  origin: "http://localhost:3000", // your Next.js dev URL
  credentials: true
}));
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected to:', mongoose.connection.db.databaseName);
})    .catch(err => console.error('MongoDB connection error:', err))

// routes
app.use('/api/users', userRoutes)
app.use('/api/todos', todoRoutes)


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
