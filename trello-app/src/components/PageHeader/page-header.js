import './page-header.style.css';


export default function PageHeader(props){
    return(
        <div className="headerContainer">
            <div className = "pageTitle">{props.title}</div>
    </div>
    );
}