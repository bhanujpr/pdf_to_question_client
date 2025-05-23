import React, { useState } from 'react';

const QuestionCard = ({ question }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!question || !question.options || !question.answer) {
    return <div style={{ color: 'red' }}>⚠️ Invalid question data</div>;
  }

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: 6 }}>
      <p><strong>{question.question}</strong></p>
      {question.options.map((option, index) => (
        <div key={index}>
          <label>
            <input
              type="radio"
              value={option}
              checked={selectedOption === option}
              onChange={handleOptionChange}
              disabled={isSubmitted}
            />
            {option}
          </label>
        </div>
      ))}
      <br />
      {!isSubmitted ? (
        <button onClick={handleSubmit}>Submit Answer</button>
      ) : (
        <div>
          {selectedOption === question.answer ? (
            <p style={{ color: 'green' }}>✅ Correct!</p>
          ) : (
            <p style={{ color: 'red' }}>
              ❌ Incorrect. Correct answer: <strong>{question.answer}</strong>
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
