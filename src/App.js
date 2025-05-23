import React, { useState } from 'react';
import axios from 'axios';
import QuestionCard from './components/QuestionCard';
import ShortAnswerCard from './components/ShortAnswerCard';
import LongAnswerCard from './components/LongAnswerCard';

function App() {
  const [pdfFile, setPdfFile] = useState(null);
  const [questionType, setQuestionType] = useState('MCQ');
  const [difficulty, setDifficulty] = useState('Easy');
  const [customPrompt, setCustomPrompt] = useState('');
  const [numQuestions, setNumQuestions] = useState(3);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!pdfFile) return alert('Please upload a PDF.');

    const formData = new FormData();
    formData.append('pdf', pdfFile);
    formData.append('questionType', questionType);
    formData.append('difficulty', difficulty);
    formData.append('customPrompt', customPrompt);
    formData.append('numQuestions', numQuestions);

    setLoading(true);
    try {
      const response = await axios.post(
        'https://pdf-to-question-server.onrender.com/upload',
        formData
      );
      setQuestions(response.data.questions);
    } catch (err) {
      const errorData = err.response?.data;
      if (errorData?.rawOutput) {
        console.error('⚠️ Mistral raw output:\n', errorData.rawOutput);
        alert('Error parsing Mistral output. See console for raw response.');
      } else {
        console.error('❌ Error details:', errorData || err.message);
        alert('Error generating questions. See console for details.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif', maxWidth: 800, margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center' }}>📘 AI-Based PDF Question Generator</h2>
      <form onSubmit={handleSubmit} style={{ background: '#f4f4f4', padding: '1.5rem', borderRadius: 8 }}>
        <label><strong>Upload PDF:</strong></label>
        <input type="file" accept="application/pdf" onChange={(e) => setPdfFile(e.target.files[0])} />
        <br /><br />

        <label><strong>Number of Questions:</strong></label>
        <input
          type="number"
          min="1"
          max="20"
          value={numQuestions}
          onChange={(e) => setNumQuestions(e.target.value)}
          style={{ width: '60px', marginLeft: '10px' }}
        />
        <br /><br />

        <label><strong>Question Type:</strong></label>
        <select value={questionType} onChange={(e) => setQuestionType(e.target.value)}>
          <option value="MCQ">MCQ</option>
          <option value="Short Answer">Short Answer</option>
          <option value="Long Answer">Long Answer</option>
        </select>
        <br /><br />

        <label><strong>Difficulty:</strong></label>
        <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
        <br /><br />

        <label><strong>Custom Prompt (optional):</strong></label><br />
        <textarea
          rows="4"
          cols="60"
          placeholder="Write your custom prompt here..."
          value={customPrompt}
          onChange={(e) => setCustomPrompt(e.target.value)}
          style={{ resize: 'vertical' }}
        />
        <br /><br />

        <button
          type="submit"
          disabled={loading}
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {loading ? 'Generating...' : 'Generate Questions'}
        </button>
      </form>

      <hr style={{ margin: '2rem 0' }} />

      <h3>📝 Generated Questions:</h3>
      {questions.length === 0 && <p>No questions yet.</p>}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {questions.map((q, index) => {
          if (q.type === 'MCQ') {
            return <QuestionCard key={index} question={q} />;
          } else if (q.type === 'Short Answer') {
            return <ShortAnswerCard key={index} question={q} />;
          } else if (q.type === 'Long Answer') {
            return <LongAnswerCard key={index} question={q} />;
          } else {
            return <div key={index}>Unknown question type</div>;
          }
        })}
      </div>
    </div>
  );
}

export default App;
