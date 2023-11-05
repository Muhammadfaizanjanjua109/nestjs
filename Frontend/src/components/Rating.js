import React, { useState } from 'react';
// import './RatingComponent.css'; // Import a CSS file for styling

function RatingComponent({ onRatingChange }) {
  const [rating, setRating] = useState(0);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    onRatingChange(newRating);
  };

  return (
    <div>
      <p>Rate this item:</p>
      <div className="rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={star <= rating ? 'star selected' : 'star'}
            onClick={() => handleRatingChange(star)}
          >
            ★
          </span>
        ))}
      </div>
    </div>
  );
}

export default RatingComponent;
