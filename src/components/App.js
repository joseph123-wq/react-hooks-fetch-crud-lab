import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  // Function to fetch questions from the API
  const fetchQuestions = async () => {
    try {
      const response = await fetch("http://localhost:4000/questions");
      const data = await response.json();
      setQuestions(data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  useEffect(() => {
    // Fetch questions when the component mounts
    fetchQuestions();
  }, []);

  const addQuestion = (newQuestion) => {
    // Function to add a new question
    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newQuestion),
    })
      .then((response) => response.json())
      .then((data) => {
        // Update the state with the new question
        setQuestions([...questions, data]);
      })
      .catch((error) => {
        console.error("Error adding question:", error);
      });
  };

  const deleteQuestion = (id) => {
    // Function to delete a question by ID
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        // Update the state by removing the deleted question
        setQuestions(questions.filter((question) => question.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting question:", error);
      });
  };

  const updateCorrectAnswer = (id, correctIndex) => {
    // Function to update the correct answer of a question
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex }),
    })
      .then(() => {
        // Update the state to reflect the updated correct answer
        setQuestions((prevQuestions) =>
          prevQuestions.map((question) => {
            if (question.id === id) {
              return { ...question, correctIndex };
            }
            return question;
          })
        );
      })
      .catch((error) => {
        console.error("Error updating correct answer:", error);
      });
  };

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm addQuestion={addQuestion} />
      ) : (
        <QuestionList
          questions={questions}
          deleteQuestion={deleteQuestion}
          updateCorrectAnswer={updateCorrectAnswer}
        />
      )}
    </main>
  );
}

export default App;

