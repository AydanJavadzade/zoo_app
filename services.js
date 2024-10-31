import { v4 } from "uuid"
import { animals } from "./helpers.js"
import { writeFileSync } from "fs"

export const getAllAnimals = (req, res) => {
    res.status(200).send(animals)
}


export const getAnimalById = (req, res) => {
    const id = req.params.id
    const foundAnimal = animals.find((a) => a.id == id)
    if (!foundAnimal) {
        res.status(404).send({ message: "tapilmadi" })
    } else {
        res.status(200).send(foundAnimal)
    }
}


export const addNewAnimal = (req, res) => {
    req.body.id = v4()
    if (req.body.name && req.body.species) {
        const foundAnimal = animals.find((a) => a.name === req.body.name && a.species === req.body.species)
        if (foundAnimal) {
            res.status(400).send({ message: "bu heyvan daxil edilib" })
        } else {
            animals.unshift(req.body)
            writeFileSync("./db.json", JSON.stringify(animals, null, 2))
            res.status(201).send({ message: "elave olundu" })
        }
    } else {
        res.status(400).send({ message: "meumatlari duzgun daxil edin" })
    }
}


export const deleteAnimal = (req, res) => {
    const id = req.params.id
    const filteredAnimal = animals.filter((a) => a.id !== id)
    writeFileSync("./db.json", JSON.stringify(filteredAnimal, null, 2))
    res.status(200).send({ message: 'silindi' })
}


export const editAnimal = (req, res) => {
    const id = req.params.id
    const currentAnimalIndex = animals.findIndex((a) => a.id === id)
    if (currentAnimalIndex === -1) {
        return res.status(404).send({ message: "bele heyvan yoxdur" })
    } else {
        animals[currentAnimalIndex] = { id, ...req.body }
        writeFileSync("./db.json", JSON.stringify(animals, null, 2))
        res.status(200).send({ message: "heyvanin melumatlari deyisildi" })
    }
}

export const modifyAnimal = (req, res) => {
    const id = req.params.id

    const findIndexAnimal = animals.findIndex((a) => a.id === id)
    if (findIndexAnimal === -1) {
        res.status(404).send("bele heyvan yoxdu")
    } else {
        animals[findIndexAnimal] = { ...animals[findIndexAnimal], ...req.body }

        writeFileSync("./db.json", JSON.stringify(animals, null, 2))
        res.status(200).send({ message: "heyvanin verilen melumatlari deyisildi" })
    }
}