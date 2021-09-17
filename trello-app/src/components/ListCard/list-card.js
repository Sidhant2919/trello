import closeIcon from "../../assets/close-icon.png"

export default function ListCard(props) {

    const {deleteListCard, card} = props;
    
    return (
        <div className="listCardContainer">
            <div className="titleHeader">
                <div>
                    {props.card.cardHeader}
                </div>
                <div>
                    <img src={closeIcon} onClick={() => deleteListCard(card.cardId)} alt="closeIcon" className="deleteListIcon" />
                </div>
            </div>
            <div className="cardDescription">
                {props.card.cardDescription}
            </div>
        </div>
    )
}