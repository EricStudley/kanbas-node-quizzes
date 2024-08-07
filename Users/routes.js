import * as dao from "./dao.js";

export default function QuizRoutes(app) {
  app.get("/api/quizzes", async (req, res) => {
    try {
      const quizzes = await dao.findAllQuizzes();
      res.json(quizzes);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch quizzes" });
    }
  });

  app.get("/api/quizzes/:qid", async (req, res) => {
    const { qid } = req.params;
    try {
      const quiz = await dao.findQuizByID(qid);
      if (quiz) {
        res.json(quiz);
      } else {
        res.status(404).json({ error: "Quiz not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch quiz" });
    }
  });

  app.get("/api/courses/:cid/quizzes", async (req, res) => {
    const { cid } = req.params;
    try {
      const quizzes = await dao.findQuizByCourse(cid);
      res.json(quizzes);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch quizzes" });
    }
  });

  app.post("/api/courses/:cid/quizzes", async (req, res) => {
    const { cid } = req.params;
    const newQuiz = {
      ...req.body,
      course: cid,
    };
    try {
      const createdQuiz = await dao.addQuiz(newQuiz);
      res.status(201).json(createdQuiz);
    } catch (error) {
      res.status(400).json({ error: "Failed to create quiz" });
    }
  });

  app.put("/api/quizzes/:qid", async (req, res) => {
    const { qid } = req.params;
    try {
      const updatedQuiz = await dao.editQuiz(qid, req.body);
      if (updatedQuiz.nModified > 0) {
        res.json(updatedQuiz);
      } else {
        res.status(404).json({ error: "Quiz not found or no changes made" });
      }
    } catch (error) {
      res.status(400).json({ error: "Failed to update quiz" });
    }
  });

  app.delete("/api/quizzes/:qid", async (req, res) => {
    const { qid } = req.params;
    try {
      await dao.deleteQuiz(qid);
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ error: "Failed to delete quiz" });
    }
  });

  // New endpoints for managing quiz questions
  app.post("/api/quizzes/:qid/questions", async (req, res) => {
    const { qid } = req.params;
    const question = req.body;
    try {
      const updatedQuiz = await dao.addQuestionToQuiz(qid, question);
      if (updatedQuiz.nModified > 0) {
        res.status(201).json(updatedQuiz);
      } else {
        res.status(404).json({ error: "Quiz not found" });
      }
    } catch (error) {
      res.status(400).json({ error: "Failed to add question" });
    }
  });

  app.put("/api/quizzes/:qid/questions/:questionID", async (req, res) => {
    const { qid, questionID } = req.params;
    const question = req.body;
    try {
      const updatedQuiz = await dao.updateQuestionInQuiz(qid, questionID, question);
      if (updatedQuiz.nModified > 0) {
        res.json(updatedQuiz);
      } else {
        res.status(404).json({ error: "Quiz or question not found" });
      }
    } catch (error) {
      res.status(400).json({ error: "Failed to update question" });
    }
  });

  app.delete("/api/quizzes/:qid/questions/:questionID", async (req, res) => {
    const { qid, questionID } = req.params;
    try {
      const updatedQuiz = await dao.deleteQuestionFromQuiz(qid, questionID);
      if (updatedQuiz.nModified > 0) {
        res.sendStatus(204);
      } else {
        res.status(404).json({ error: "Quiz or question not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to delete question" });
    }
  });
}
