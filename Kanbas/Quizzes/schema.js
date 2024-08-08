import mongoose from "mongoose";
import moment from "moment";

const questionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    points: { type: Number, required: true, default: 1 },
    questionType: {
      type: String,
      enum: ["TRUE_FALSE", "MULTIPLE_CHOICE", "FILL_IN"],
      default: "MULTIPLE_CHOICE",
      required: true
    },
    question: String,
    mutlipleChoiceQuestionAnswers: [{
      answer: String,
      correct: Boolean
    }],
    trueFalseAnswer: Boolean,
    fillInBlankAnswers: [String]
  },
  { _id: false }
);

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
    dueDate: { type: Date, default: moment().startOf('day') },
    availableDate: { type: Date, default: moment().add(-1, 'days').startOf('day') },
    untilDate: { type: Date, default: moment().add(1, 'days').startOf('day') },
    questions: [questionSchema]
  },
  { collection: "quizzes" }
);

export default quizSchema;
