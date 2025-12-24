declare class noteService {
    createNote(note: string): Promise<{
        note: string;
    }>;
}
export default function createNoteService(): noteService;
export {};
//# sourceMappingURL=note.service.d.ts.map