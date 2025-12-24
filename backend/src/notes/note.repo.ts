// Create prisma client
import { prisma } from '../config/prisma.js'
async function createNote(note: string){
    try{
        const createdNote = await prisma.note.create({
            data : {
            note: note,
            }, 
            select : {
            note: true,
            // author: true
        }})
        return createdNote
    } catch(error) {
        console.log(error)
        process.exit(1)
    }
}

export { createNote }