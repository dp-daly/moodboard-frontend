import '../../styles/BoardCard.css'

function BoardCard({ artobject, onDelete }) {
    return (
        <li key={artobject.id}>
            <h4>{artobject.title}</h4>
            <p>Artist: {artobject.artist}</p>
            <div 
                id="img-placeholder" 
                style={{ 
                    backgroundImage: `url(https://www.artic.edu/iiif/2/${artobject.img}/full/843,/0/default.jpg)`,
                }}
            ></div>
            <button onClick={() => onDelete(artobject.id)}>Delete</button>
        </li>
    );
}

export default BoardCard;
