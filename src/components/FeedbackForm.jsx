import { useState, useContext, useEffect } from "react";
import Card from "./shared/Card";
import Button from "./shared/Button";
import RatingSelect from "./RatingSelect";
import FeedbackContext from "../context/FeedBackContext";

function FeedbackForm() {
	const [text, setText] = useState("");
	const [btnDisabled, setBtnDisabled] = useState(true);
	const [message, setMessage] = useState(null);
	const [rating, setRating] = useState(10);

	const { addFeedback, feedbackEdit, updateFeedback } =
		useContext(FeedbackContext);

	useEffect(() => {
		if (feedbackEdit.edit) {
			setBtnDisabled(false);
			setText(feedbackEdit.item.text);
			setRating(feedbackEdit.item.rating);
		}
	}, [feedbackEdit]);

	function select(rating) {
		setRating(rating);
	}

	function handleTextChange(e) {
		const newText = e.target.value;
		setText(newText);
		if (newText === "") {
			setMessage(null);
			setBtnDisabled(true);
		} else if (newText !== "" && newText.trim().length < 10) {
			setMessage("The review has to be at least 10 characters long.");
			setBtnDisabled(true);
		} else {
			setMessage(null);
			setBtnDisabled(false);
		}
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		if (text.trim().length >= 10) {
			const newFeedback = { text, rating };
			feedbackEdit.edit
				? updateFeedback(feedbackEdit.item.id, newFeedback)
				: addFeedback(newFeedback);
		}
		setBtnDisabled(true);
		setRating(10);
		setText("");
	};

	return (
		<Card>
			<form onSubmit={handleSubmit}>
				<h2>How would you rate your service with us?</h2>
				<RatingSelect select={select} selected={rating} />
				<div className="input-group">
					<input
						onChange={handleTextChange}
						type="text"
						placeholder="Write a review"
						value={text}
					/>
					<Button type="submit" isDisabled={btnDisabled}>
						Send
					</Button>
				</div>
				{message && <div className="message">{message}</div>}
			</form>
		</Card>
	);
}

export default FeedbackForm;
