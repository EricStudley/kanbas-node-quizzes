import mongoose from "mongoose";
const quizSchema = new mongoose.Schema(
    {
        name: { type: String, default: "New Quiz" },
        course: { type: String, required: true },
        description: { type: String, default: "" },
        quizType: { type: String, default: "Graded Quiz" },
        published: { type: Boolean, default: false },
        points: { type: Number, default: 0 },
        assignmentGroup: { type: String, default: "Quizzes" },
        shuffleAnswers: { type: Boolean, default: true },
        timeLimit: { type: Number, default: 20 },
        multipleAttempts: { type: Boolean, default: false },
        attempts: { type: Number, default: 1 },
        viewResponses: { type: String, default: "Always" },
        showCorrectAnswers: { type: Boolean, default: false },
        accessCode: { type: String, default: "" },
        oneQuestionAtATime: { type: Boolean, default: true },
        requireLockDownBrowser: { type: Boolean, default: false },
        requiredToViewResults: { type: Boolean, default: false },
        webcamRequired: { type: Boolean, default: false },
        lockQuestions: { type: Boolean, default: false },
        dueDate: { type: Date, default: null },
        availableDate: { type: Date, default: null },
        untilDate: { type: Date, default: null },
        questions: [
            {
                title: { type: String, default: "New Question" },
                type: {
                    type: String,
                    enum: [
                        "Multiple Choice",
                        "True/False",
                        "Fill in the Blank",
                    ],
                    default: "Multiple Choice",
                },
                points: { type: Number, default: 0 },
                question: { type: String, default: "" },
                multipleChoices: [
                    {
                        text: { type: String, default: "" },
                        correct: { type: Boolean, default: false },
                    }
                ],
                trueFalseCorrect: { type: Boolean, default: false },
                fillInTheBlankCorrect: { type: String, default: "" },
            },
        ],
    },
    { collection: "quizzes" }
);

export default quizSchema;
