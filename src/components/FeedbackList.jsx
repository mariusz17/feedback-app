import { motion, AnimatePresence } from "framer-motion";
import FeedbackItem from "./FeedbackItem";
import PropTypes from "prop-types";

function FeedbackList({ feedback, handleDelete }) {
	console.log(feedback);
	if (!feedback || feedback.length === 0) {
		return <p>No feedback yet</p>;
	}

	return (
		<div className="feedback-list">
			<AnimatePresence>
				{feedback.map((item) => {
					return (
						<motion.div
							key={item.id}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
						>
							<FeedbackItem
								key={item.id}
								item={item}
								handleDelete={handleDelete}
							/>
						</motion.div>
					);
				})}
			</AnimatePresence>
		</div>

		// return (
		// 	<div className="feedback-list">
		// 		{feedback.map((item) => {
		// 			return (
		// 				<FeedbackItem key={item.id} item={item} handleDelete={handleDelete} />
		// 			);
		// 		})}
		// 	</div>
	);
}

FeedbackList.propTypes = {
	feedback: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			text: PropTypes.string.isRequired,
			rating: PropTypes.number.isRequired,
		})
	),
	handleDelete: PropTypes.func.isRequired,
};

export default FeedbackList;
