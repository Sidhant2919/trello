import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button';


export default function AddListDialog(props) {
	const { addCardOpen, addCardOnClose } = props;


	const addCardHandleClose = () => {
		addCardOnClose();
	};



	return (
		<div>
			<Dialog open={props.addCardOpen} onClose={addCardHandleClose}>
				<DialogTitle>Add Card</DialogTitle>
			
			</Dialog>
		</div>
	);
}
