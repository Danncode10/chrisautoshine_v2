import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Packages from './components/Packages';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Modal from './components/Modal';
import './App.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState('');

  const openModal = (imageSrc) => {
    setModalImage(imageSrc);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <Packages />
      <About />
      <Contact />
      <Footer />
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        imageSrc={modalImage}
        altText="Preview image"
      />
    </>
  );
}

export default App;
