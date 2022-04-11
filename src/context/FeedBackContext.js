import { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
	const [feedback, setFeedback] = useState([
		{
			id: 1,
			text: "This is test item 1",
			rating: 10,
		},
		{
			id: 2,
			text: "This is test item 1",
			rating: 5,
		},
		{
			id: 3,
			text: "This is test item 1",
			rating: 1,
		},
	]);

	const [feedbackEdit, setFeedbackEdit] = useState({
		item: {},
		edit: false,
	});

	// Delete feedback
	function deleteFeedback(id) {
		if (window.confirm("Are you sure you want to delete this feedback?"))
			setFeedback(feedback.filter((item) => item.id !== id));
	}

	// Add feedback
	function addFeedback(newFeedback) {
		newFeedback.id = uuidv4();
		const newFeedbackList = [newFeedback, ...feedback];
		setFeedback(newFeedbackList);
	}

	// Set item do be updated
	const editFeedback = (item) => {
		setFeedbackEdit({ item, edit: true });
	};

	return (
		<FeedbackContext.Provider
			value={{
				feedback,
				deleteFeedback,
				addFeedback,
				editFeedback,
				feedbackEdit,
			}}
		>
			{children}
		</FeedbackContext.Provider>
	);
};

export default FeedbackContext;
