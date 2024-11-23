import Lottie from 'react-lottie';
import animationData from '/animal-animation.json';

const AnimalDonationPage = () => {
  return (
    <div className="animal-donation-page">
      <div className="intro-section">
        <Lottie options={{ animationData }} height={400} width={400} />
      </div>
      <div className="donation-section">
        <h2>Help Save These Animals</h2>
        <button className="donate-button">Donate Now</button>
      </div>
    </div>
  );
};
