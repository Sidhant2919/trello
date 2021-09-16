import './App.css';
import React, { useState, useEffect } from "react";
import closeIcon from "./assets/close-icon.png"
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle'
import PropTypes from "prop-types";



AddListDialog.propsTypes = {
	onClose: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired,
}


function AddListDialog(props) {
	const { open, onClose } = props;


	const handleClose = () => {
		onClose();
	};



	return (
		<div>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Add List</DialogTitle>
				<DialogContent>
					<form onSubmit={(e) => props.addNote(e)}>
						<input type="text" name="note" />
						<input type="Submit" />
					</form>

				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={handleClose}>Subscribe</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}


function App() {

	
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	}
	
	const [notes, setNotes] = useState([]);

	const addNote = (e) => {
		e.preventDefault();
		const newNote = {
			id: Math.random().toString(36).substr(2, 9),
			text: e.target.note.value,
		};
		setNotes([...notes, newNote]);
		e.target.note.value = "";
	};

	// useEffect(() => {
	// 	const json = JSON.stringify(notes);
	// 	localStorage.setItem("notes", json);
	// }, [notes]);


	useEffect(() => {
		const listNames = localStorage.getItem("notes");
		// const savedNotes = JSON.parse(listNames);
		if (listNames !== null && listNames.length === 0){
			const savedListNames = JSON.parse(listNames);
			setNotes(savedListNames);
		}
	}, []);

	return (
		<div>
			<div className="headerContainer">
				Trello
			</div>

			<Button variant="outlined" onClick={handleClickOpen}>
				Open form dialog
			</Button>


			<AddListDialog addNote = {addNote} open={open} onClose={handleClose} />

			{
				notes !== undefined &&
				notes.map((note) =>
					<div className="cardContainer">
						<div key={note.id}>
							{note.text}
						</div>
						<div className="closeButton">
							<img src={closeIcon} alt="closeIcon" className="closeIconStyle" />
						</div>

						<Button>Add Card</Button>
					</div>
				)
			}

		</div>



	);
}


export default App;