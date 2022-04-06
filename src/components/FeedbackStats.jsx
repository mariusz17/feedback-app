import PropTypes from "prop-types";

function FeedbackStats({ feedback }) {
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

FeedbackStats.propTypes = {
	feedback: PropTypes.array.isRequired,
};

export default FeedbackStats;
