import FeedbackItem from "./FeedbackItem";
import PropTypes from "prop-types";

function FeedbackList({ feedback }) {
	console.log(feedback);
	if (!feedback || feedback.length === 0) {
		return <p>No feedback yet</p>;
	}

	return (
		<div className="feedback-list">
			{feedback.map((item) => {
				return (
					<FeedbackItem key={item.id} text={item.text} rating={item.rating} />
				);
			})}
		</div>
	);
}

FeedbackList.defaultProps = {
	feedback: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			text: PropTypes.string.isRequired,
			rating: PropTypes.number.isRequired,
		})
	),
};

export default FeedbackList;