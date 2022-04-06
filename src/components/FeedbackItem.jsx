import Card from "./shared/Card";
import PropTypes from "prop-types";
import { FaTimes } from "react-icons/fa"; //from font-awesome library

function FeedbackItem({ item, handleDelete }) {
	return (
		<Card>
			<div className="num-display">{item.rating}</div>
			<button className="close">
				<FaTimes onClick={() => handleDelete(item.id)} color="purple" />
			</button>
			<div className="text-display">{item.text}</div>
		</Card>
	);
}

FeedbackItem.propTypes = {
	item: PropTypes.object.isRequired,
	handleDelete: PropTypes.func.isRequired,
};

export default FeedbackItem;
