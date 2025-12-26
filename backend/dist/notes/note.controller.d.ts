import type { Request, Response } from 'express';
declare const createNote: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const getNotes: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
declare const getNote: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
declare const updateNote: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
declare const deleteNote: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export { createNote, getNote, getNotes, updateNote, deleteNote };
//# sourceMappingURL=note.controller.d.ts.map