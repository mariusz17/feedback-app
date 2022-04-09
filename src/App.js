import Header from "./components/Header";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import FeedbackData from "./data/FeedbackData";
import FeedbackList from "./components/FeedbackList";
import FeedbackStats from "./components/FeedbackStats";
import FeedbackForm from "./components/FeedbackForm";

function App() {
	const [feedback, setFeedback] = useState(FeedbackData);

	function deleteFeedback(id) {
		if (window.confirm("Are you sure you want to delete this feedback?"))
			setFeedback(feedback.filter((item) => item.id !== id));
	}

	function addFeedback(newFeedback) {
		newFeedback.id = uuidv4();
		const newFeedbackList = [newFeedback, ...feedback];
		setFeedback(newFeedbackList);
	}

	return (
		<>
			<Header />
			<div className="container">
				<FeedbackForm handleAdd={addFeedback} />
				<FeedbackStats feedback={feedback} />
				<FeedbackList feedback={feedback} handleDelete={deleteFeedback} />
			</div>
		</>
	);
}

export default App;
