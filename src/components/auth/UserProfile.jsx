import '../../styles/App.css'
import axios from 'axios'
import { getPayload } from '../../lib/auth.js'
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

function UserProfile() {

    const location = useLocation();

    const [moodboards, setMoodboards] = useState([]);

    useEffect(() => {
        fetchUserBoards()
    }, [])

    async function fetchUserBoards() {
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
                            <Link to={`${location.pathname}/${board.id}`}>
                            <h3>{board.title}</h3>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default UserProfile;