// Create prisma client
import { prisma } from '../config/prisma.js'
import { withTimeout } from '../utility/backpressure.js'
import { E_ALREADY_LOCKED, Semaphore, tryAcquire } from 'async-mutex' // Use to apply implicit backpressure, by denying the request upfront

const dbSemaphore = new Semaphore(2)
const nonBlockingSemaphore = tryAcquire(dbSemaphore)
async function createNote(note: string) {

    try {
        await nonBlockingSemaphore.runExclusive(async () => {
            const createdNote = await withTimeout(prisma.note.create({
                data: {
                    note: note,
                },
                select: {
                    note: true,
                    // author: true
                }
            }), 800
            )
            return createdNote
        })


    } catch (error) {
        if (error instanceof Error && error.message === "DB_ACQUIRE_TIMEOUT") {
            throw new Error("DB TIMEOUT")
        } else if (error === E_ALREADY_LOCKED) {
            throw new Error("CONCURRENCY LIMIT HIT, APPLYING BACKPRESSURE")
        }
        throw new Error("Unexpected Error occured")
    }
}

export { createNote }