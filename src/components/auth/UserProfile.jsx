import '../../styles/App.css';
import axios from 'axios';
import { getPayload } from '../../lib/auth.js'
import { useState, useEffect } from 'react'


function UserProfile() {

    const [moodboards, setMoodboards] = useState([]);

    useEffect(() => {
        getUserBoards()
    }, [])

    async function getUserBoards() {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8000/api/boards/', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setMoodboards(response.data);
        } catch (error) {
            console.error('Error fetching your boards:', error);
        }
    }

    return (
        <div className="container">
            <div>
                <h2>{getPayload().name}'s Moodboards:</h2>
                <ul>
                    {moodboards.map(board => (
                        <li key={board.id}>
                            <h3>{board.title}</h3>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default UserProfile;