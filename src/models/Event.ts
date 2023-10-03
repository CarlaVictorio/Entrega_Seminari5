import mongoose, { Document, Schema } from 'mongoose';

export interface IEvent {
    title: string;
    author: string;
    bookTitle: string;
    date: string;
    location: string;
}

export interface IEventModel extends IEvent, Document {}

const EventSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        author: { type: String, required: true },
        bookTitle: { type: String, required: true },
        date: { type: String, required: true },
        location: { type: String, required: true }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default mongoose.model<IEventModel>('Event', EventSchema);
