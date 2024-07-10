function Card({ artist, title, image, handleSelectedArtwork}) {

    return (
    <div id="card">
        <div id="img-placeholder" style={{backgroundImage: `url(https://www.artic.edu/iiif/2/${image}/full/843,/0/default.jpg)`}}>
        <button className="add-button" onClick={handleSelectedArtwork}>+</button>
        </div>
        <div id="card-footer">
        <h3 id="artist-title">{artist}</h3>
        <h4 id="card-title"><i>{title}</i></h4>
        </div>
    </div>
    )
    }
    
    export default Card;
