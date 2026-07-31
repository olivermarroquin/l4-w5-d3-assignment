import { useState, useEffect } from "react";
import { BASE_URL } from "./config";

function App() {
  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadQuestions() {
    try {
      const response = await fetch(BASE_URL + "/api/questions");
      if (!response.ok) {
        throw Error("Could not receive data from flask backend");
      }
      const data = await response.json();
      setQuestions(data);
    } catch (err) {
      setError(err.message || "Could not load questions");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadQuestions();
  }, []);

  async function addQuestion(e) {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(BASE_URL + "/api/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: question,
        }),
      });

      const createdQuestion = await res.json();

      if (!res.ok) {
        throw new Error(createdQuestion.error || "Could not add question.");
      }

      // Show the new record right away instead of waiting for a refresh.
      setQuestions((currentQuestions) => [...currentQuestions, createdQuestion]);
      setQuestion("");
    } catch (err) {
      setError(err.message || "Could not add question.");
    }
  }

  return (
    <>
      <h1>Interview Question Tracker</h1>
      <form onSubmit={addQuestion}>
        <label htmlFor="question">New Question</label>
        <input
          type="text"
          id="question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button disabled={!question.trim()}>Add Question</button>
      </form>
      {loading && <p>Questions are loading...</p>}
      {error && <p>{error}</p>}
      <ul>
        {questions.map((q) => (
          <li key={q.id}>{q.question}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
