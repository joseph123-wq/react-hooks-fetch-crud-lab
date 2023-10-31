import React from "react";

function QuestionList({ questions, deleteQuestion, updateCorrectAnswer }) {
  return (
    <section>
      <h1>Quiz Questions</h1>
      <div>
      <h2>Questions List</h2>
      <ul>
        {questions.map((question) => (
          <li key={question.id}>
            <p>{question.prompt}</p>
            <select
              value={question.correctIndex}
              onChange={(e) => updateCorrectAnswer(question.id, e.target.value)}
            >
              {question.answers.map((answer, index) => (
                <option key={index} value={index}>
                  {answer}
                </option>
              ))}
            </select>
            <button onClick={() => deleteQuestion(question.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div> 
    </section>
  );
}

export default QuestionList;
