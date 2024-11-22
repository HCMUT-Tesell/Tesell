import { useState } from "react";
import StarRating from "./StarRating";

const ProductReview = () => {
  const [rating, setRating] = useState(0);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    console.log("Đánh giá mới:", newRating);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Đánh giá sản phẩm</h2>
      <StarRating rating={rating} onRatingChange={handleRatingChange} />
      <p className="mt-4">Đánh giá hiện tại: {rating} / 5</p>
    </div>
  );
};

export default ProductReview;
