import '../../styles/App.css'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

function Moodboard() {
    const { boardId } = useParams();
    const [artObjects, setArtObjects] = useState([]);
    //Just creating form for testing purposes
    const [newArtObject, setNewArtObject] = useState({
        title: '',
        artist: '',
        api_object: '',
        user_text: ''
    });

    //! the board will need a fetch function for its own particular art objects

    // useEffect(() => {
    //     fetchArtObjects();
    // }, []);

    // async function fetchArtObjects() {
    //     try {
    //         const token = localStorage.getItem('token');
    //         const response = await axios.get('http://localhost:8000/api/artobjects/', {
    //             headers: {
    //                 Authorization: `Bearer ${token}`
    //             }
    //         });
    //         setArtObjects(response.data);
    //     } catch (error) {
    //         console.error('Error fetching art objects:', error);
    //     }
    // }

    return 
    
}

export default Moodboard;