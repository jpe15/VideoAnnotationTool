import React, {useEffect} from "react";
import Modal from "react-modal/lib/components/Modal";
import "../styles/Modals.css";

const customStyles = {
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
		borderLeft: "0.5em solid #0f62fe",
		zIndex: "9",
		padding: "0",
		margin: "0",
		width: "50vw",
		height: "50vh",
		boxShadow: "1px 1px 6px 0px #0008",
		backgroundColor: "#f2f4f8"
	},
};

Modal.setAppElement("#root");

const StartUpModal = ({ isOpen }) => {
	
	return (
		<Modal style={customStyles} contentLabel="Start Modal" isOpen={isOpen}>
			<div className="modal__title">
				Create a New Project or Open an Existing One
			</div>
			<div className="modal__body">
				<button>Click me</button>
			</div>
		</Modal>
	);
};

export default StartUpModal;
