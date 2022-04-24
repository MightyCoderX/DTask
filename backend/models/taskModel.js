import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            required: [true, 'Please add a text value']
        },
        completed: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model('Task', taskSchema);