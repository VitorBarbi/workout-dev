import mongoose from 'mongoose';

/**
 * Schema for an exercise.
 */
const exerciseSchema = new mongoose.Schema({
    exerciseNumber: {
        type: Number,
        required: true,
        description: 'Sequence number of the exercise within its group.'
    },
    name: {
        type: String,
        required: true,
        description: 'Exercise name.'
    },
    sets: {
        type: Number,
        required: true,
        description: 'Number of sets for the exercise.'
    },
    reps: {
        type: Number,
        required: true,
        description: 'Number of repetitions per set for the exercise.'
    },
});

/**
 * Schema for a group of exercises.
 */
const groupSchema = new mongoose.Schema({
    groupNumber: {
        type: Number,
        required: true,
        description: 'Sequence number of the group within the program.'
    },
    key: {
        type: String,
        required: true,
        description: 'Group identifier.'
    },
    targetMuscles: {
        type: String,
        required: true,
        description: 'Muscles targeted by the exercises in the group.'
    },
    exercises: [exerciseSchema], 
});

/**
 * Schema for a workout program.
 */
const programSchema = new mongoose.Schema({
    startDate: {
        type: Date,
        required: true,
        description: 'The start date of the workout program.'
    },
    groups: [groupSchema],
});

// Create the Program model from the program schema
const Program = mongoose.model('Program', programSchema);

export default Program;