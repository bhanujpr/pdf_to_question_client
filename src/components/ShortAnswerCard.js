import React, { useState } from 'react';

const ShortAnswerCard = ({ question }) => {
  const [showAnswer, setShowAnswer] = useState(true);

  if (!question || !question.answer || !question.question) {
    return <div style={{ color: 'red' }}>⚠️ Invalid short answer question data</div>;
  }

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <strong>Short Answer</strong>
      </div>
      <div style={styles.body}>
        <p style={styles.questionText}>{question.question}</p>
        <button style={styles.toggleButton} onClick={() => setShowAnswer(!showAnswer)}>
          {showAnswer ? 'Hide Answer' : 'Show Answer'}
        </button>
        {showAnswer && (
          <div style={styles.answerBox}>
            <span style={styles.answerLabel}>Answer:</span> {question.answer}
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  card: {
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    marginBottom: '1.5rem',
    border: '1px solid #ddd',
    fontFamily: 'Segoe UI, sans-serif',
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#4e73df',
    color: 'white',
    padding: '0.75rem 1rem',
    fontSize: '1rem',
  },
  body: {
    padding: '1rem',
  },
  questionText: {
    fontSize: '1.1rem',
    fontWeight: 500,
    marginBottom: '0.75rem',
  },
  toggleButton: {
    padding: '0.4rem 0.8rem',
    fontSize: '0.85rem',
    border: 'none',
    backgroundColor: '#f6c23e',
    color: '#000',
    borderRadius: '4px',
    cursor: 'pointer',
    marginBottom: '0.5rem',
  },
  answerBox: {
    backgroundColor: '#f8f9fc',
    borderLeft: '4px solid #1cc88a',
    padding: '0.75rem 1rem',
    borderRadius: '4px',
    fontSize: '1rem',
    color: '#2e2e2e',
  },
  answerLabel: {
    fontWeight: 600,
    color: '#1cc88a',
    marginRight: 5,
  },
};

export default ShortAnswerCard;
