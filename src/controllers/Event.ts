import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Event from '../models/Event';

const createEvent = (req: Request, res: Response, next: NextFunction) => {
    const { author, title, bookTitle, date, location } = req.body; //crea les tres i les amplena amb el body de la resposta, el nom dels paràmetres ha de coincidir

    const event = new Event({
        _id: new mongoose.Types.ObjectId(),
        author,
        title,
        bookTitle,
        date,
        location
    });

    return event
        .save()
        .then((event) => res.status(201).json({ event }))
        .catch((error) => res.status(500).json({ error }));
};

const readEvent = (req: Request, res: Response, next: NextFunction) => {
    const eventId = req.params.eventId;

    return Event.findById(eventId)
        .then((event) => (event ? res.status(200).json({ event }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
    return Event.find()
        .then((event) => res.status(200).json({ event }))
        .catch((error) => res.status(500).json({ error }));
};
// Devuelve la lista de libros con solo id, location y autor
const readAllA = (req: Request, res: Response, next: NextFunction) => {
    let query = {}; // category: 'action' };
    let projection = {
        _id: 1,
        location: 1
    };
    return Event.find(query, projection)
        .then((event) => res.status(200).json({ event }))
        .catch((error) => res.status(500).json({ error }));
};

const updateEvent = (req: Request, res: Response, next: NextFunction) => {
    const eventId = req.params.eventId;

    return Event.findById(eventId)
        .then((event) => {
            if (event) {
                event.set(req.body);

                return event
                    .save()
                    .then((event) => res.status(201).json({ event }))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                return res.status(404).json({ message: 'not found' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

const deleteEvent = (req: Request, res: Response, next: NextFunction) => {
    const eventId = req.params.eventId;

    return Event.findByIdAndDelete(eventId)
        .then((event) => (event ? res.status(201).json({ event, message: 'Deleted' }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
};

export default { createEvent, readEvent, readAll, readAllA, updateEvent, deleteEvent };
