import Button from '@material-ui/core/Button';

export default function AddListButton(props){
    return(
        <div className="addListButtonContainer">
        <Button className="addListButtonStyle" style={{ float: "right", width: "150px", backgroundColor: "#21b6ae", marginBottom: "20px", color: "white", textTransform: "none"}} onClick={props.handleClickOpen}>
            Add List
        </Button>
    </div>
    );
}