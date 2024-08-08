import model from "./model.js";

export const findAllQuizzes = () => {
  return model.find();
};

export const findQuizByID = (quizID) => {
  return model.findOne({ _id: quizID });
};

export const findQuizByCourse = async (courseID) => {
  const quizzes = await model.find({ course: courseID });
  return quizzes;
};

export const addQuiz = (quiz) => {
  delete quiz._id; // Mongoose will automatically generate an ID if it's not provided
  return model.create(quiz);
};

export const editQuiz = (quizID, quiz) => {
  return model.updateOne({ _id: quizID }, { $set: quiz });
};

export const deleteQuiz = (quizID) => {
  return model.deleteOne({ _id: quizID });
};

export const addQuestionToQuiz = async (quizID, question) => {
  console.log(`Adding question to quiz: ${quizID}`);
  console.log(`Question: ${JSON.stringify(question)}`);
  try {
    const result = await model.updateOne({ _id: quizID }, { $push: { questions: question } });
    console.log(`Update result: ${JSON.stringify(result)}`);
    return result;
  } catch (error) {
    console.error(`Error adding question: ${error}`);
    throw error;
  }
};

export const updateQuestionInQuiz = (quizID, questionID, question) => {
  return model.updateOne(
    { _id: quizID, "questions._id": questionID },
    { $set: { "questions.$": question } }
  );
};

export const deleteQuestionFromQuiz = (quizID, questionID) => {
  return model.updateOne(
    { _id: quizID },
    { $pull: { questions: { _id: questionID } } }
  );
};
