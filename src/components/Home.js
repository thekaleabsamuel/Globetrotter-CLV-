import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import logo from '../assets/GT-Logo.png';
import '../App.css';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const DonationForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // ... (keep the existing payment logic)
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="number" id="donationAmount" placeholder="Donation amount" required />
      <CardElement />
      <div className="button-container">
        <button type="button" onClick={downloadTrack}>Download For Free</button>
        <button type="submit" disabled={!stripe}>Donate and Download</button>
      </div>
    </form>
  );
};

function downloadTrack() {
  const trackUrl = 'https://mega.nz/folder/BmlSBLaS#cg9OmeYAcGWsFfL_LdEXkg/file/hyVBzBKQ';
  const link = document.createElement('a');
  link.href = trackUrl;
  link.download = 'CestLaVie.mp3';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function Home() {
  return (
    <div className="home-container">
      <img 
        src={logo} 
        alt="Globetrotters Logo" 
        className="logo"
      />
      <h1>01. C'est La Vie</h1>
      <p><strong>Produced By</strong> Paris Williams & Kaleab Samuel</p>
      <p><strong>Mixed and Mastered By</strong> Luke Petet & Paris Williams</p>
      
      <div className="video-container">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/BcUqJpzW3qs"
          title="C'est La Vie"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      <p>This One's For The DJs</p>

      <Elements stripe={stripePromise}>
        <DonationForm />
      </Elements>
    </div>
  );
}

export default Home;