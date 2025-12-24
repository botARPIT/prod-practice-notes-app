import express from 'express';
import { createNote, getNotes, getNote, updateNote, deleteNote } from './note.controller.js';
const noteRouter = express.Router();
noteRouter.post("/create", createNote);
noteRouter.get("/notes", getNotes);
noteRouter.get("/note", getNote);
noteRouter.patch("/update", updateNote);
noteRouter.delete("delete", deleteNote);
export default noteRouter;
//# sourceMappingURL=note.routes.js.map