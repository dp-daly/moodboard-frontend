import '../../styles/AddToBoard.css';

function AddToBoard({ selectedArtwork, moodboards, selectedBoard, setSelectedBoard, handleAddToMoodboard, closeSidebar }) {

  const isDisabled = !selectedBoard || !selectedArtwork;
  const buttonClass = isDisabled ? 'add-to-moodboard disabled' : 'add-to-moodboard active';

  return (
    <div className="sidebar expanded">
      <div className="sidebar-contents">
        {/* Planning notes: Toggles state of 'sidebarVisible' to false */}
      <div className="top-panel">
      <button className="close-sidebar" onClick={closeSidebar}>
          X
        </button>
        </div>
        <div id="message">
        <h3>Would you like to the add {selectedArtwork.title} to a board?</h3>
        </div>
        <img src={`https://www.artic.edu/iiif/2/${selectedArtwork.image}/full/843,/0/default.jpg`} alt={selectedArtwork.title} />
        <div className="board-buttons">
        <select id="selector" value={selectedBoard} onChange={(e) => setSelectedBoard(e.target.value)}>
          <option value="">Select a board</option>
          {moodboards.map((board) => (
            <option key={board.id} value={board.id}>
              {board.title}
            </option>
          ))}
        </select>
        <button
          className={buttonClass}
          disabled={!selectedBoard || !selectedArtwork}
          onClick={handleAddToMoodboard}
        >
          Add to Moodboard
        </button>
        </div>
      </div>
    </div>
  );
}

export default AddToBoard;
