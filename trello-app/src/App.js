import './App.css';
import React, { useState, useEffect } from "react";
import closeIcon from "./assets/close-icon.png"
import Button from '@material-ui/core/Button';
import AddListButton from './components/AddListButton/add-list-button';
import ComponentSeperatorLine from './components/ComponentSeperatorLine/component-seperator-line';
import AddListDialog from './components/AddListDialog/add-list-dialog';
import addCardIcon from "./assets/add-card-icon.png";
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog';
import AddCardDialog from './components/AddCardDialog/add-card-dialog';



function App() {

	const DeleteLocalStorage = () => {
		localStorage.setItem("notesDataLocal", "");
	}
	
	const [open, setOpen] = React.useState(false);
	const [addCardOpen, addCardSetOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	}

	const handleAddCardOpen = () => {
		addCardSetOpen(true);
	}

	const handleAddCardClose = () => {
		addCardSetOpen(false);
	}

	const deleteNote = (idToDelete) => {
		// const idToDelete = e.path;
		// console.log(e.nativeEvent);
		const filteredNotes = notes.filter((note) => note.id !== idToDelete);
		setNotes(filteredNotes);
	};


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


	useEffect(() => {
		const listNames = localStorage.getItem("notesDataLocal");
		// const savedNotes = JSON.parse(listNames);
		if (listNames !== null && listNames.length !== 0) {
			const savedListNames = JSON.parse(listNames);
			setNotes(savedListNames);
			console.log('saved notes loaded');
		}
	}, []);


	useEffect(() => {
		window.onbeforeunload = () => {
			localStorage.setItem("notesDataLocal", JSON.stringify(notes));
			console.log('notes updated before closing');
		}
	})


	const [cards, setCards] = useState([]);

	const addCard = (e) => {
		e.preventDefault();
		const newCard = {
			cardHeader: e.target.cardHeader.value,
			cardDescription: e.target.cardDescription.value,
			cardId: Math.random().toString(36).substr(2, 9),
		};
		setCards([...cards, newCard]);
		e.target.cardHeader.value = "";
		e.target.cardDescription.value = "";
	};


	useEffect(() => {
		const listCards = localStorage.getItem("listCardsDataLocal");
		// const savedNotes = JSON.parse(listNames);
		if (listCards !== null && listCards.length !== 0) {
			const savedListCards = JSON.parse(listCards);
			setCards(savedListCards);
			console.log('saved list cards loaded');
		}
	}, []);


	useEffect(() => {
		window.onbeforeunload = () => {
			localStorage.setItem("listCardsDataLocal", JSON.stringify(cards));
			console.log('list cards updated before closing');
		}
	})

	return (
		<div className="body">
			<div className="headerContainer">
				Trello Board
			</div>
			
			<AddListButton handleClickOpen={handleClickOpen} />

			<AddListDialog open={open} onClose={handleClose} addNote={addNote}  />
			<AddCardDialog open = {addCardOpen} onClose = {handleAddCardClose}/>


			<form onSubmit={(e) => addCard(e)}>
					<input type="text" name="cardHeader" />
					<input type="text" name="cardDescription" />
					<input type="Submit" />
			</form>


			<div className="cardContainer">
				{
					notes !== undefined && notes.length > 0 &&
					notes.map((note) =>
						<div className = "listStyle" key={note.id} >
							<div className="titleHeader">
								<div>
									{note.text}
								</div>
								<div className="deleteListIconContainer">
									<img value={note.id} onClick={() => deleteNote(note.id)} src={closeIcon} alt="closeIcon" className="deleteListIcon" />
								</div>
							</div>
							<ComponentSeperatorLine/>

							{
							cards !== undefined && cards.length > 0 &&
							cards.map((card) =>
								<div className = "listCardContainer">
									<div className="titleHeader">
										<div>
											{card.cardHeader}
										</div>
										<div>
										<img src={closeIcon} alt="closeIcon" className="deleteListIcon" />
										</div>
									</div>
									<div className = "cardDescription">
									Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
									</div>
								</div>
							)}

							<div className = "containerColumn">
							<img onClick = {handleAddCardOpen} src = {addCardIcon} alt = "addCardIcon" className = "addCardIconStyle"/>
							</div>
						</div>
					)}
			</div>
		</div>



	);
}


export default App;