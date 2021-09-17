import './App.css';
import React, { useState, useEffect } from "react";
import closeIcon from "./assets/close-icon.png"
import Button from '@material-ui/core/Button';
import AddListButton from './components/AddListButton/add-list-button';
import ComponentSeperatorLine from './components/ComponentSeperatorLine/component-seperator-line';
import AddListDialog from './components/AddListDialog/add-list-dialog';
import AddCardDialog from './components/AddCardDialog/add-card-dialog';
import PageHeader from './components/PageHeader/page-header.js';


function App() {

	const [open, setOpen] = React.useState(false);
	const [addCardOpen, addCardSetOpen] = React.useState(false);
	const [notes, setNotes] = useState([]);
	const [cards, setCards] = useState([]);

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

	// Function to delete list using filter function
	const deleteNote = (idToDelete) => {
		const filteredNotes = notes.filter((note) => note.id !== idToDelete);
		setNotes(filteredNotes);
	};


	// Function to delete cards using filter function
	const deleteListCard = (cardToDelete) => {
		const filteredCards = cards.filter((card) => card.cardId !== cardToDelete);
		setCards(filteredCards);
	};

	// function allowDrop(ev) {
	// 	ev.preventDefault();
	// }

	// function drag(ev) {
	// 	ev.dataTransfer.setData("text", ev.target.id);
	// }

	// function drop(ev) {
	// 	ev.preventDefault();
	// 	var data = ev.dataTransfer.getData("text");
	// 	ev.target.appendChild(document.getElementById(data));
	// }





	//Function to generate random id using math function and storing title attribute for list
	const addNote = (e) => {
		e.preventDefault();
		const newNote = {
			id: Math.random().toString(36).substr(2, 9),
			text: e.target.note.value,
		};
		// console.log(newNote.id);
		setNotes([...notes, newNote]);
		e.target.note.value = "";
	};

	
	useEffect(() => {
		const listCards = localStorage.getItem("listCardsDataLocal");
		// const savedNotes = JSON.parse(listNames);
		if (listCards !== null && listCards.length !== 0) {
			const savedListCards = JSON.parse(listCards);
			// console.log(savedListCards);
			setCards(savedListCards);
			// console.log('saved list cards loaded');
		}
		const listNames = localStorage.getItem("notesDataLocal");
		if (listNames !== null && listNames.length !== 0) {
			const savedListNames = JSON.parse(listNames);
			setNotes(savedListNames);
			// console.log('saved notes loaded');
		}
	},[]);

	
	useEffect(() => {
		window.onbeforeunload = () => {
			localStorage.setItem("listCardsDataLocal", JSON.stringify(cards));
			// console.log('list cards updated before closing');
			localStorage.setItem("notesDataLocal", JSON.stringify(notes));
			// console.log('notes updated before closing');
		}
	})

	//generating unique card id using Math function and storing card attributes for cards
	const addCard = (e, noteId) => {
		e.preventDefault();
		const newCard = {
			cardHeader: e.target.cardHeader.value,
			cardDescription: e.target.cardDescription.value,
			cardListId: e.target.cardListId.getAttribute("value"),
			cardId: Math.random().toString(36).substr(2, 9)
		};
		setCards([...cards, newCard]);
		console.log(cards);
		e.target.cardHeader.value = "";
		e.target.cardDescription.value = "";

	};

	const onDragStart = (e, cardId) => {
		console.log('drag started' + cardId);
		e.dataTransfer.setData("cardListId", cardId); // this is the card that is being dragged to another board
	}

	const onDragOver = (e, noteId) => {
		// console.log('onDragoVer fired');
		e.preventDefault();
	}

	// target id is the board to which the card is going
	const onDrop = (e, targetId) => {
		// console.log("onDrop : " + cardListId);
		// console.log(""+e.dataTransfer.getData('cardListId'));
		// console.log("recievingCardId  "+recievingCardId);
		// console.log("targetId" + targetId);
		const recievingCardId = e.dataTransfer.getData("cardListId");
		for(let i = 0; i < cards.length ; i++){
			const item = cards[i];
			if(item.cardId === recievingCardId){
				item.cardListId = targetId;
				console.log(item);
				cards[i] = item;
				setCards(cards);
			}
		}

		let updatedCards = cards.filter((item) => {
            if (item.cardId === recievingCardId) {
                item.cardListId = targetId;
            }
            return item;
        });

        setCards([...cards,updatedCards]);
	}

	return (
		<div className="body">

			<PageHeader title={"Trello Board"} />
			<AddListButton handleClickOpen={handleClickOpen} />
			<AddListDialog open={open} onClose={handleClose} addNote={addNote} />
			<AddCardDialog open={addCardOpen} onClose={handleAddCardClose} />


			<div className="cardContainer">
				{
					// Rendering the lists here using map function
					notes !== undefined && notes.length > 0 &&
					notes.map((note) =>
						<div className="listStyle" id ={note.id} key={note.id} 
							onDragOver = {e => onDragOver(e)}
							onDrop = {e => onDrop(e, note.id)}
						>
							<div className="titleHeader">
								<div>
									{note.text}
								</div>
								<div className="deleteListIconContainer">
									<img value={note.id} onClick={() => deleteNote(note.id)} src={closeIcon} alt="closeIcon" className="deleteListIcon" />
								</div>
							</div>
							<ComponentSeperatorLine />
							{
								//Mapping cards here using filter based on matching list id and card list id
								cards !== undefined && cards.length > 0 &&
								cards.map((card, index) => {
									if (note.id === card.cardListId) {
										return( 
											<div className="listCardContainer" id= {card.cardListId} key = {index} onDragStart = {(e) => onDragStart(e, card.cardId)} draggable>
												<div className="titleHeader">
													<div>
														<div className="dataHeading">Title</div>
														<div>{card.cardHeader}</div>
													</div>
													<div>
														<img src={closeIcon} onClick={() => deleteListCard(card.cardId)} alt="closeIcon" className="deleteListIcon" />
													</div>
												</div>
												<ComponentSeperatorLine />

												<div className="cardDescription">
													<div className="dataHeading">Description</div>
													<div>{card.cardHeader}</div>
												</div>
											</div>
										);
									}
									return null;
								}
								)}

							<div className="containerColumn">
								<form onSubmit={(e) => addCard(e)}>
									<input className="inputFieldStyle" required type="text" name="cardHeader" />
									<input className="inputFieldStyle" required type="text" name="cardDescription" />
									<input type="hidden" name="cardListId" value={note.id} />
									<input className="submitCardButton" type="Submit" value="Add a Card" />
								</form>

							</div>
						</div>
					)}
			</div>
		</div>



	);
}


export default App;