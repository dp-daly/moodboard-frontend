import { useState, useEffect } from 'react';
import axios from 'axios';

function Moodboard() {
    const [moodboard, setMoodboard] = useState(null);
    // TODO: Add useparams logic
    const boardId = 2;

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

    return (
        <div>
            {moodboard && (
                <div>
                    <h2>{moodboard.title}</h2>
                    <p>{moodboard.description}</p>

                    <h3>Art Objects:</h3>
                    <ul>
                        {moodboard.artobjects && moodboard.artobjects.map((artobject) => (
                            <li key={artobject.id}>
                                <h4>{artobject.title}</h4>
                                <p>Artist: {artobject.artist}</p>
                                <img src={artobject.img} alt={artobject.title} style={{ maxWidth: '200px' }} />
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Moodboard;