import '../../styles/BoardCard.css'

function BoardCard({ artobject, onDelete }) {
    return (
        <div className="board-card">
            <h4>{artobject.title}</h4>
            <p>Artist: {artobject.artist}</p>
            <div 
                id="img-placeholder" 
                style={{ 
                    backgroundImage: `url(https://www.artic.edu/iiif/2/${artobject.img}/full/843,/0/default.jpg)`,
                }}
            ></div>
            <div className="card-footer">
                <button onClick={() => onDelete(artobject.id)}>Delete</button>
            </div>
        </div>
    );
}

export default BoardCard;
