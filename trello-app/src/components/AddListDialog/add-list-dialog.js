import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button';


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
						<input type="text" name="note" />
						<br/>
						<input type="Submit" />
					</form>

				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
