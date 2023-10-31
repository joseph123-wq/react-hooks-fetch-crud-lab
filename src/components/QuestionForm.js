import React, { useState } from "react";

function QuestionForm({ addQuestion }) {
  const [formData, setFormData] = useState({
    prompt: "",
    answers: ["", "", ""],
    correctIndex: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addQuestion(formData);
  };

  return (
    <div>
      <h2>Create a New Question</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Prompt:</label>
          <input
            type="text"
            name="prompt"
            value={formData.prompt}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Answers:</label>
          {formData.answers.map((answer, index) => (
            <input
              key={index}
              type="text"
              name={`answers[${index}]`}
              value={answer}
              onChange={handleInputChange}
            />
          ))}
        </div>
        <div>
          <label>Correct Answer:</label>
          <select
            name="correctIndex"
            value={formData.correctIndex}
            onChange={handleInputChange}
          >
            {formData.answers.map((answer, index) => (
              <option key={index} value={index}>
                {answer}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default QuestionForm;

