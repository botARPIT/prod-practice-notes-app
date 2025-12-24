import type {Request, Response} from 'express';
import createNoteService from './note.service.js'

const service = createNoteService()
const createNote = async (
    req: Request,
    res: Response
) => {
    const { note } = req.body;
    const createdNote = await service.createNote(note);
    return res.status(201).json({
        success: true,
        message: "Note created successfully",
        createdNote: createdNote
    })
}
const getNotes = async (
    req: Request,
    res: Response
) => {
    return res.send("Get notes")
}
const getNote = async (
    req: Request,
    res: Response
) => {
    return res.send("Get notes")
}
const updateNote = async (
    req: Request,
    res: Response
) => {
    return res.send("Get notes")
}
const deleteNote = async (
    req: Request,
    res: Response
) => {
    return res.send("Get notes")
}

export {createNote, getNote, getNotes, updateNote, deleteNote}