import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import BoardCard from './BoardCard'
import '../../styles/App.css'
import '../../styles/Moodboard.css'
import { baseUrl } from '../../config.js'


function Moodboard() {
    const navigate = useNavigate();
    const [moodboard, setMoodboard] = useState('');
    const [backgroundImageUrl, setBackgroundImageUrl] = useState('');

    const { boardId } = useParams();

    useEffect(() => {
        fetchMoodboard();
        const storedBackgroundImageUrl = localStorage.getItem(`backgroundImageUrl_${boardId}`);

        if (storedBackgroundImageUrl) {
            setBackgroundImageUrl(storedBackgroundImageUrl);
        }
    }, [boardId]);

    async function fetchMoodboard() {
        try {
            const response = await axios.get(`${baseUrl}/api/boards/${boardId}/`);
            setMoodboard(response.data);
        } catch (error) {
            console.log('Error fetching moodboard:', error.message);
        }
    }

    async function handleBoardDelete() {
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`${baseUrl}/api/boards/${boardId}/`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            navigate('/');
        } catch (err) {
            console.log(err);
        }
    }

    async function handleItemDelete(objectId) {
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`${baseUrl}/api/boards/${boardId}/${objectId}/`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchMoodboard();
        } catch (err) {
            console.log(err);
        }
    }

    function handleBackgroundImageChange(e) {
        setBackgroundImageUrl(e.target.value);
    }

    function handleBackgroundImageSubmit(e) {
        e.preventDefault();
        localStorage.setItem(`backgroundImageUrl_${boardId}`, backgroundImageUrl);
    }

    return (
        <div className="container">
            <h2>{moodboard.title}</h2>
            <p>{moodboard.description}</p>

            <form onSubmit={handleBackgroundImageSubmit}>
                <input
                    type="text"
                    value={backgroundImageUrl}
                    onChange={handleBackgroundImageChange}
                    placeholder="Enter an image URL"
                />
                <button className="button" id="submit" type="submit">Save Background</button>
            </form>

            <ul className="board-container" style={{ backgroundImage: `url(${backgroundImageUrl})` }}>
                {moodboard.artobjects && moodboard.artobjects.map((artobject) => (
                    <BoardCard
                        key={artobject.id}
                        artobject={artobject}
                        onDelete={() => handleItemDelete(artobject.id)}
                    />
                ))}
            </ul>

            <div className="UD-buttons">
                <Link to={`${location.pathname}/edit`} className="button" id="edit">Edit Board</Link>
                <Link to="/" className="button" id="delete" onClick={handleBoardDelete}>Delete board</Link>
            </div>
        </div>
    );
}

export default Moodboard;
