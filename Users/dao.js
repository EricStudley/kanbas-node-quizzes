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
  delete quiz._id;
  return model.create(quiz);
};

export const editQuiz = (quizID, quiz) => {
  return model.updateOne({ _id: quizID }, { $set: quiz });
};

export const deleteQuiz = (quizID) => {
  return model.deleteOne({ _id: quizID });
};

export const addQuestionToQuiz = (quizID, question) => {
  return model.updateOne({ _id: quizID }, { $push: { questions: question } });
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
