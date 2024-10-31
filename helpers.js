import {readFileSync} from "fs"

const data = readFileSync("./db.json").toString()

export const animals=JSON.parse(data)