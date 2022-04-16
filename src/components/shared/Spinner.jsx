import spinner from "../assets/spinner.gif";

function Spinner() {
	return (
		<img
			src={spinner}
			alt="Loading..."
			style={{ display: "block", margin: "auto", width: "100px" }}
		/>
	);
}

export default Spinner;
