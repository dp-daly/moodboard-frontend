import '../../styles/App.css';
import '../../styles/Index.css';
import { useState, useEffect } from 'react';
import Card from './Card.jsx';
import Page from './Page.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import AddToBoard from './AddToBoard.jsx';

const Index = () => {
  //! STATES
  const [art, setArt] = useState([]);
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [moodboards, setMoodboards] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totals, setTotals] = useState({
    total: 0,
    page: 0,
  });

  useEffect(() => {
    toast.dismiss();
    fetchArt();
    if (search === '') {
      return;
    } else if (totals.total === 0) {
      toast(`There are no results for ${search}`);
    } else {
      toast(
        <>
          There are <b>{totals.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</b> results for <b>{search}</b>.
        </>
      );
    }
  }, [search]);

  useEffect(() => {
    fetchArt();
    fetchUserBoards();
  }, [page]);

  //! FETCHING AND PUSHING TO MY DJANGO API
  async function fetchUserBoards() {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8000/api/boards/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMoodboards(response.data);
    } catch (error) {
      console.error('Error fetching your boards:', error);
    }
  }

  async function handleAddToMoodboard() {
    if (!selectedBoard || !selectedArtwork) {
      toast.error('Please select both an artwork and a board');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:8000/api/artobjects/',
        { //DEFINING THE SPECIFIC OBJECT FORMAT I WANT TO PASS TO BACKEND TO MATCH MODEL
          title: selectedArtwork.title,
          artist: selectedArtwork.artist,
          img: selectedArtwork.image,
          moodboard: selectedBoard,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success('Successfully added to your board!');
    } catch (error) {
      console.error('Error adding to moodboard:', error);
      toast.error('Failed to add to moodboard');
    }
  }

  //POPULATES THE SELECTED ARTWORK STATE WITH RELEVANT CARD PROPERTIES
  function handleSelectedArtwork(art) {
    setSelectedArtwork(art);
    setSidebarVisible(true);
    console.log('SELECTED ARTWORK:', art);
  }

  //! PUBLIC API
  async function fetchArt() {
    const resp = await fetch(
      `https://api.artic.edu/api/v1/artworks/search?q=${search}&fields=artist_title,id,image_id,title&limit=8&page=${page}`
    );
    const artObjects = await resp.json();
    console.log(artObjects);
    const resultsArray = artObjects.data;
    const totalResults = {
      total: artObjects.pagination.total,
      page: artObjects.pagination.total_pages,
    };
    const resultsInfo = resultsArray.map((object) => {
      return {
        artist: object.artist_title,
        title: object.title,
        image: object.image_id,
        id: object.id,
      };
    });
    setArt(resultsInfo);
    setTotals(totalResults);
  }

  // ! SEARCH AND PAGINATION
  function handleSearch(e) {
    setSearch(e.target.value);
    setPage(1);
  }

  function handlePage(action) {
    setPage((currentPage) => {
      if (action === 'previous') {
        return currentPage - 1;
      } else {
        return currentPage + 1;
      }
    });
  }

  const pageProps = {
    index: page,
    page: page,
    total: totals.page,
    updatePage: handlePage,
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
      <div id="welcome">
        <h2>Welcome to ArtBoards</h2>
      </div>
      <div id="howto">
        <ul>
          <li>Sign in or register your account and create a board.</li>
          <li>Return to this page and enter your chosen search term.</li>
          <li>You'll see live results from the Art Institute of Chicago's online collection.</li>
          <li>See up to 8 results from the collection per page. Click 'next' above or below the gallery to see the next 8 results.</li>
          <li>Click the '+' button to select an item and choose which board you'd like to add it to.</li>
        </ul>
      </div>
      <div>
        <input
          id="search"
          type="text"
          value={search}
          placeholder="Enter search term..."
          onChange={handleSearch}
        />
      </div>
      <Page {...pageProps} />
      <div id="api-wrapper">
        <div id="api-results">
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
      </div>
      <div id="page-bottom">
        <Page {...pageProps} />
      </div>
      {sidebarVisible && (
        <AddToBoard
          selectedArtwork={selectedArtwork}
          moodboards={moodboards}
          selectedBoard={selectedBoard}
          setSelectedBoard={setSelectedBoard}
          handleAddToMoodboard={handleAddToMoodboard}
          closeSidebar={() => setSidebarVisible(false)}
        />
      )}
    </div>
  );
};

export default Index;
