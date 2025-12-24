import { createNote } from './note.repo.js';
class noteService {
    async createNote(note) {
        return await createNote(note);
    }
}
export default function createNoteService() {
    return new noteService();
}
//# sourceMappingURL=note.service.js.map