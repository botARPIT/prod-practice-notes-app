import { createNote } from './note.repo.js'
class noteService {
    async createNote(note: string){
        return await createNote(note)
    }
}

export default function createNoteService(){
    return new noteService()
}