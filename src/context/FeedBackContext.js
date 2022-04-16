import { createContext, useState, useEffect } from "react";

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
	const [feedback, setFeedback] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [feedbackEdit, setFeedbackEdit] = useState({
		item: {},
		edit: false,
	});

	useEffect(() => {
		fetchFeedback();
	}, []);

	const fetchFeedback = async () => {
		try {
			const response = await fetch(
				"/feedback?_sort=id&_order=desc" //in package.json there is added proxy "http://localhost:5000", so here just /feedback is enough
			);
			if (!response.ok) throw new Error("Error fetching data from json server");
			let data = await response.json();
			data = data.map((item) => ({ ...item, rating: +item.rating })); //convert ratings of all items from json file to be a number
			setFeedback(data);
			setIsLoading(false);
		} catch (err) {
			console.log("Error occurred:", err);
		}
	};

	// Delete feedback
	async function deleteFeedback(id) {
		if (window.confirm("Are you sure you want to delete this feedback?")) {
			try {
				const response = await fetch(`/feedback/${id}`, { method: "DELETE" });
				if (!response.ok)
					throw new Error("Error deleting data from json server");
				setFeedback(feedback.filter((item) => item.id !== id));
			} catch (err) {
				console.log("Error occurred:", err);
			}
		}
	}

	// Add feedback
	async function addFeedback(newFeedback) {
		try {
			const response = await fetch("/feedback", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newFeedback),
			});
			if (!response.ok)
				throw new Error("Error pushing new data to json server");

			// fetchFeedback(); //cant we do it this way? fetchFeedback every time feedback is added, edited or deleted?

			const data = await response.json();
			const newFeedbackList = [data, ...feedback];
			setFeedback(newFeedbackList);
		} catch (err) {
			console.log("Error occurred:", err);
		}
	}

	// Set item do be updated
	const editFeedback = (item) => {
		setFeedbackEdit({ item, edit: true });
	};

	// Update item
	const updateFeedback = async (id, newItem) => {
		try {
			const response = await fetch(`/feedback/${id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newItem),
			});

			if (!response.ok) throw new Error("Error updating data to json server");

			const data = await response.json();

			const newFeedbackList = feedback.map((item) =>
				item.id === id ? data : item
			);

			setFeedback(newFeedbackList);
			setFeedbackEdit({
				item: {},
				edit: false,
			});
		} catch (err) {
			console.log("Error occurred:", err);
		}
	};

	return (
		<FeedbackContext.Provider
			value={{
				feedback,
				feedbackEdit,
				isLoading,
				deleteFeedback,
				addFeedback,
				editFeedback,
				updateFeedback,
			}}
		>
			{children}
		</FeedbackContext.Provider>
	);
};

export default FeedbackContext;
