import React, { useState } from 'react';

const LongAnswerCard = ({ question }) => {
  const [expanded, setExpanded] = useState(false);

  if (!question || !question.answer || !question.question) {
    return <div style={{ color: 'red' }}>⚠️ Invalid long answer question data</div>;
  }

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <strong>Long Answer</strong>
      </div>
      <div style={styles.body}>
        <p style={styles.questionText}>{question.question}</p>
        <button style={styles.toggleButton} onClick={() => setExpanded(!expanded)}>
          {expanded ? 'Hide Answer' : 'Show Answer'}
        </button>
        {expanded && (
          <div style={styles.answerBox}>
            <span style={styles.answerLabel}>Answer:</span>
            <p style={styles.longText}>{question.answer}</p>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  card: {
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.12)',
    overflow: 'hidden',
    marginBottom: '1.5rem',
    border: '1px solid #ddd',
    fontFamily: 'Segoe UI, sans-serif',
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#36b9cc',
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
    backgroundColor: '#fd7e14',
    color: '#fff',
    borderRadius: '4px',
    cursor: 'pointer',
    marginBottom: '0.5rem',
  },
  answerBox: {
    backgroundColor: '#f1f1f1',
    borderLeft: '4px solid #36b9cc',
    padding: '0.75rem 1rem',
    borderRadius: '4px',
    fontSize: '1rem',
    color: '#2e2e2e',
  },
  answerLabel: {
    fontWeight: 600,
    color: '#36b9cc',
    marginRight: 5,
  },
  longText: {
    marginTop: 5,
    lineHeight: 1.6,
  },
};

export default LongAnswerCard;
