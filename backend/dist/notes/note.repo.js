// Create prisma client
import { prisma } from '../config/prisma.js';
import { withTimeout } from '../utility/backpressure.js';
async function createNote(note) {
    try {
        return await withTimeout(prisma.note.create({
            data: {
                note: note,
            },
            select: {
                note: true,
                // author: true
            }
        }), 800);
    }
    catch (error) {
        if (error instanceof Error && error.message === "DB_ACQUIRE_TIMEOUT") {
            throw new Error("DB_BACKPRESSURE");
        }
        throw error;
    }
}
export { createNote };
//# sourceMappingURL=note.repo.js.map