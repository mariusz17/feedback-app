import { useContext } from "react";
import FeedbackContext from "../context/FeedBackContext";

function FeedbackStats() {
	const { feedback } = useContext(FeedbackContext);

	const averageRating = (
		feedback.reduce((acc, cur) => {
			return acc + cur.rating;
		}, 0) / feedback.length
	).toFixed(1);

	// console.log(feedback.reduce((prev, cur) => prev.rating + cur.rating));
	// console.log(feedback.length);
	return (
		<div className="feedback-stats">
			<h4>{feedback.length} Reviews</h4>
			<h4>Average rating: {isNaN(averageRating) ? "" : averageRating}</h4>
		</div>
	);
}

export default FeedbackStats;
