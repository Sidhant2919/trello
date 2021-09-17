import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button';
import './add-list-dialog.style.css'

export default function AddListDialog(props) {
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
						<input required type="text" name="note" />
						<br/>
						<input className ="submitButton" onClick = {handleClose} type="Submit" />
						<Button className ="cancelButton" onClick={handleClose}>Cancel</Button>
					</form>
				</DialogContent>

			</Dialog>
		</div>
	);
}
