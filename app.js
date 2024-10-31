import express from "express"
import dotenv from "dotenv"
import { addNewAnimal, deleteAnimal, editAnimal, getAllAnimals, getAnimalById } from "./services.js"
import bodyParser from "body-parser"

const app=express()
app.use(bodyParser.json())
dotenv.config()
const PORT=process.env.PORT

app.get("/animals",getAllAnimals)
app.get("/animals/:id",getAnimalById)
app.post("/animals",addNewAnimal)
app.delete("/animals/:id",deleteAnimal)
app.put("/animals/:id",editAnimal)


app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`)
})