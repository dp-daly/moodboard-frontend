import '../../styles/App.css'
import '../../styles/Index.css'
import { useState, useEffect } from 'react'
import Card from './Card.jsx'
import Page from './Page.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Index = () => {
  const [art, setArt] = useState([])
  const [selectedArtwork, setSelectedArtwork] = useState(null)
  const [moodboards, setMoodboards] = useState([])
  const [selectedBoard, setSelectedBoard] = useState('');
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [totals, setTotals] = useState({
    total: 0,
    page: 0
  })
  
  useEffect(() => {
    toast.dismiss()
    fetchArt();
    if (search === "") {
      return
    } else if (totals.total === 0) {
      toast(`There are no results for ${search}`)
    } else {
    toast(
      <>
        There are <b>{totals.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</b> results for <b>{search}</b>.
      </>
    )
    }
  }, [search])


  //Separated out to avoid toast from firing with each new page.
  useEffect(() => {
    fetchArt();
    fetchUserBoards();
  }, [page]);

  //! FETCHING AND PUSHING TO DJANGO
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

const handleAddToMoodboard = async () => {
  if (!selectedBoard || !selectedArtwork) {
    toast.error('Please select both artwork and a moodboard');
    return;
  }

  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      'http://localhost:8000/api/artobjects/',
      {
        title: selectedArtwork.title,
        artist: selectedArtwork.artist,
        img: selectedArtwork.image,
        moodboard: selectedBoard,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      }
    );
    toast.success('Artwork added to moodboard successfully');
  } catch (error) {
    console.error('Error adding artwork to moodboard:', error);
    toast.error('Failed to add artwork to moodboard');
  }
};

function handleSelectedArtwork(art) {
  setSelectedArtwork(art);
  console.log('SELECTED ARTWORK:', art);
};


  // ! PUBLIC API
  async function fetchArt() {
    const resp = await fetch(`https://api.artic.edu/api/v1/artworks/search?q=${search}&fields=artist_title,id,image_id,title&limit=8&page=${page}`)
    const artObjects = await resp.json()
    console.log(artObjects)
    const resultsArray = artObjects.data
    const totalResults = {
      total: artObjects.pagination.total,
      page: artObjects.pagination.total_pages
    }
    const resultsInfo = resultsArray.map((object) => {
      return {
        artist: object.artist_title,
        title: object.title,
        image: object.image_id,
        id: object.id
      }
    })
    setArt(resultsInfo)
    setTotals(totalResults)
  }

  function handleSearch(e) {
    setSearch(e.target.value)
    setPage(1)
  }

  function handlePage(action) {
    //note to self: because this is a function, react passes in the current value of "page"; 
    //if we were to enter a value, it would simply update the state
    setPage(currentPage => {
      if (action === 'previous') {
        return currentPage - 1;
      } else {
        return currentPage + 1;
      }
    });
  }

  //Defining props to be passed to the Page component here and using the spread operator to pass them through in both instances of its use below. This is to make the code more maintainable if props need to change when it is being used more than once. 
  const pageProps = {
    index: page,
    page: page,
    total: totals.page,
    updatePage: handlePage
  };


  return (
    <div className="container">
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        toastStyle={{ backgroundColor: 'goldenrod', color: 'black' }}
      />
      <h3>From the collection of the Art Institute of Chicago</h3>
      <ul>
        <li>Enter your chosen search term.</li>
        <li>Results include a thumbnail, the artist, and the artwork title.</li>
        <li>See up to 8 results from the collection per page. Click 'next' above or below the gallery to see the next 8 results.</li>
        <li>If you would like to return to the first page of your search, just click on "Art Search" at the top of the page.</li>
      </ul>
      <div>
        <input
          id="search"
          type="text"
          value={search}
          placeholder="Enter search term..."
          onChange={handleSearch}
        />
      </div>
      <div className="buffer">...</div>
      <Page {...pageProps} />
      <div id="container">
        {art.map((art) => (
          <Card
            key={art.id}
            artist={art.artist}
            title={art.title}
            image={art.image}
            handleSelectedArtwork={() => handleSelectedArtwork(art)}
          />
        ))}
      </div>
      <Page {...pageProps} />
      <div className="moodboard-container">
        <select value={selectedBoard} onChange={(e) => setSelectedBoard(e.target.value)}>
          <option value="">Select a moodboard</option>
          {moodboards.map((board) => (
            <option key={board.id} value={board.id}>
              {board.title}
            </option>
          ))}
        </select>
        <button
          className="add-to-moodboard-button"
          disabled={!selectedBoard || !selectedArtwork}
          onClick={handleAddToMoodboard}
        >
          Add to Moodboard
        </button>
      </div>
    </div>
  );
}

export default Index
