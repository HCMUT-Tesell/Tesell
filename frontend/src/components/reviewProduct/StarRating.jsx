const StarRating = ({ rating, maxStars = 5, onRatingChange }) => {
  const handleClick = (starIndex) => {
    if (onRatingChange) {
      onRatingChange(starIndex + 1);
    }
  };

  return (
    <div className="flex">
      {Array.from({ length: maxStars }, (_, index) => (
        <svg
          key={index}
          onClick={() => handleClick(index)}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={index < rating ? "gold" : "gray"}
          className="w-6 h-6 cursor-pointer hover:scale-110 transition-transform"
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </div>
  );
};

export default StarRating;
