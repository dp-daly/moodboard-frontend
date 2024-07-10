import '../../styles/App.css';
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import BoardCard from './BoardCard';

function Moodboard() {

    const navigate = useNavigate()
    const [moodboard, setMoodboard] = useState(null);
    const { boardId } = useParams()

    useEffect(() => {
        fetchMoodboard();
    }, [boardId]);

async function fetchMoodboard() {
    try {
        const response = await axios.get(`http://localhost:8000/api/boards/${boardId}/`);
        setMoodboard(response.data);
    } catch (error) {
        console.log('Error fetching moodboard:', error.message);
    }
}

async function handleBoardDelete() {
    try {
        const token = localStorage.getItem("token")
        await axios.delete(`http://localhost:8000/api/boards/${boardId}/`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        navigate('/')
    } catch (err) {
        console.log(err)
    }
}

async function handleItemDelete(objectId) {
    try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:8000/api/boards/${boardId}/${objectId}/`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        fetchMoodboard();
    } catch (err) {
        console.log(err);
    }
}

    return (
        <div className="container">
            {moodboard && (
                <div>
                    <h2>{moodboard.title}</h2>
                    <p>{moodboard.description}</p>

                    <Link to={`${location.pathname}/edit`} className="button" id="edit">Edit Board</Link>
                    <Link to="/" className="button" id="delete" onClick={handleBoardDelete}>Delete board</Link>
                    <h3>Art Objects:</h3>
                    <ul>
                        {moodboard.artobjects && moodboard.artobjects.map((artobject) => (
                            <BoardCard
                                key={artobject.id}
                                artobject={artobject}
                                onDelete={handleItemDelete}
                            />
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default Moodboard;
