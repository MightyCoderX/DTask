import mongoose from 'mongoose';

const statSchema = mongoose.Schema(
    {
        user:
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        addedTasks:
        {
            type: Number,
            default: 0,
            min: 0
        },
        completedTasks:
        {
            type: Number,
            default: 0,
            min: 0
        },
        editedTasks:
        {
            type: Number,
            default: 0,
            min: 0
        },
        deletedTasks:
        {
            type: Number,
            default: 0,
            min: 0
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model('Stat', statSchema);