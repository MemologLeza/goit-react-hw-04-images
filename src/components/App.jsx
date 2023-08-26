import { useState, useEffect } from 'react';
import { getImgBySearch } from 'SearchAPI/SearchAPI';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import ButtonLoadMore from './ButtonLoadMore/ButtonLoadMore';
import React from 'react';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [imgs, setImgs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedImg, setSelectedImg] = useState(null);
  const [error, setError] = useState('');
  useEffect(() => {
    const handleSearchImg = async () => {
      try {
        setIsLoading(true);
        const data = await getImgBySearch(searchQuery, page);

        const newData = data.hits.map(item => ({
          id: item.id,
          largeImageURL: item.largeImageURL,
          webformatURL: item.webformatURL,
        }));
        setImgs(prev => [...prev, ...newData]);
        setIsLoading(false);
        setTotal(data.total);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
        console.log(error);
      }
    };
    searchQuery && handleSearchImg();
  }, [page, searchQuery]);
  useEffect(() => {
    if (showModal) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  }, [showModal]);

  const handleSearch = query => {
    setSearchQuery(query);
    setImgs([]);
    setPage(1);
  };

  const handleClickLoadMore = () => {
    setPage(prev => prev + 1);
  };
  const openModal = image => {
    setShowModal(true);
    setSelectedImg(image);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedImg(null);
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridGap: '16px',
        paddingBottom: '24px',
        color: '#010101',
        overflow: showModal ? 'hidden' : 'auto',
      }}
    >
      <Searchbar handleSearch={handleSearch} />
      {error && <h2>{error}</h2>}
      <ImageGallery imgs={imgs} openModal={openModal} />
      {searchQuery && !isLoading && imgs?.length === 0 && (
        <h2>Images not found((</h2>
      )}
      <Loader isLoading={isLoading} />
      {imgs.length !== 0 && imgs.length < total && !isLoading && (
        <ButtonLoadMore handleClickLoadMore={handleClickLoadMore} />
      )}
      {showModal && <Modal img={selectedImg} onClose={closeModal} />}
    </div>
  );
};

export default App;
