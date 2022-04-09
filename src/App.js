import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import FeedbackData from "./data/FeedbackData";
import FeedbackList from "./components/FeedbackList";
import FeedbackStats from "./components/FeedbackStats";
import FeedbackForm from "./components/FeedbackForm";
import AboutPage from "./pages/AboutPage";
import AboutIconLink from "./components/AboutIconLink";

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
		<Router>
			<Header />
			<div className="container">
				<Routes>
					<Route
						path="/"
						element={
							<>
								<FeedbackForm handleAdd={addFeedback} />
								<FeedbackStats feedback={feedback} />
								<FeedbackList
									feedback={feedback}
									handleDelete={deleteFeedback}
								/>
							</>
						}
					/>
					<Route path="/about" element={<AboutPage />} />
				</Routes>
				<AboutIconLink />
			</div>
		</Router>
	);
}

export default App;
