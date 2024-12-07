import { useState } from 'react';
import Bulma from '../../../../components/Bulma';

const UserFeedback = () => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [email, setEmail] = useState('');
  const [sourceUrl] = useState(window.location.href);

  const handleSubmitFeedback = () => {
    // TODO: Implement feedback submission to backend
    console.log('Feedback submitted:', { 
      rating, 
      feedback, 
      email,
      sourceUrl
    });
    // Clear form
    setRating(0);
    setFeedback('');
    setEmail('');
  };

  return (
    <div className="feedback-section mt-5 p-4 box">
      <h4 className="title is-5 mb-3">Rate this page</h4>
      
      <div className="stars mb-3">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            type="button"
            key={star}
            className="button is-ghost p-1"
            onClick={() => setRating(star)}
          >
            <span className="icon">
              <ion-icon
                name={star <= rating ? 'star' : 'star-outline'}
                style={{ color: star <= rating ? '#ffd700' : '#666' }}
              />
            </span>
          </button>
        ))}
      </div>

      <div className="field">
        <label className="label">A penny for your thoughts:</label>
        <div className="control">
          <textarea
            className="textarea"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Your feedback helps us improve"
          />
        </div>
      </div>

      <div className="field">
        <label className="label">Email (optional)</label>
        <div className="control">
          <input
            type="email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email if you'd like us to follow up"
          />
        </div>
      </div>

      <Bulma.Button
        className="is-primary mt-2"
        onClick={handleSubmitFeedback}
        disabled={!rating}
      >
        Submit Feedback
      </Bulma.Button>
    </div>
  );
};

export default UserFeedback; 