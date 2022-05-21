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
            required: [true, 'Number of added tasks is required']
        },
        completedTasks:
        {
            type: Number,
            required: [true, 'Number of completed tasks is required']
        },
        updatedTasks:
        {
            type: Number,
            required: [true, 'Number of updated tasks is required']
        },
        deletedTasks:
        {
            type: Number,
            required: [true, 'Number of deleted tasks is required']
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model('Stat', statSchema);