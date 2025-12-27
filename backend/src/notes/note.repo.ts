// Create prisma client
import { prisma } from '../config/prisma.js'
import { withTimeout } from '../utility/backpressure.js'
import { E_ALREADY_LOCKED, Semaphore, tryAcquire } from 'async-mutex' // Use to apply implicit backpressure, by denying the request upfront
import { ConcurrencyLimiter } from '../utility/concurrencyLimitter.js'
const dbLimitter = new ConcurrencyLimiter(5)
const dbSemaphore = new Semaphore(5)
async function createNote(note: string) {

    // Used to immediately reject the request if semaphore is unavailable
    // await tryAcquire(dbSemaphore).runExclusive(async () => {
    //     const createdNote = await withTimeout(prisma.note.create({
    //         data: {
    //             note: note,
    //         },
    //         select: {
    //             note: true,
    //             // author: true
    //         }
    //     }), 800
    //     )
    //     return createdNote
    // })
    const value = dbSemaphore.getValue()
    if (value === 0) {
        throw new Error("RATE LIMIT EXCEEDED")

    }
    await dbSemaphore.acquire()

    try {

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
    } catch (error) {
        if (error === E_ALREADY_LOCKED) {
            throw new Error("CONCURRENCY LIMIT HIT, APPLYING BACKPRESSURE")
        } else if (error instanceof Error && error.message === "DB_ACQUIRE_TIMEOUT") {
            throw new Error("DB TIMEOUT")
        }

        throw new Error("Unexpected Error occured")
    } finally {
        dbSemaphore.release()
    }
}

export { createNote }