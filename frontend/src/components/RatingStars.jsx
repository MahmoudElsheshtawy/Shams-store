import React from "react";

const RatingStars = ({ rating, setRating, interactive = true, size = "text-2xl" }) => {
  const handleClick = (star) => {
    if (interactive && setRating) {
      setRating(star);
    }
  };

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => handleClick(star)}
          className={`
            ${interactive ? 'cursor-pointer' : 'cursor-default'}
            ${size}
            transition-colors duration-200
            ${star <= rating ? "text-yellow-400" : "text-gray-300"}
            hover:${interactive ? 'text-yellow-300' : ''}
          `}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default RatingStars;
