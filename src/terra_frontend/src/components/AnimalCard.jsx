import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

interface Animal {
  image: string;
  name: string;
}

const AnimalCard: React.FC<{ animal: Animal }> = ({ animal }) => {
  useEffect(() => {
    AOS.init({ once: true }); // Ensures animation only happens once
  }, []);

  return (
    <div
      className="animal-card shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105"
      data-aos="fade-up"
      data-aos-duration="1000"
    >
      <img
        src={animal.image}
        alt={animal.name}
        className="w-full h-64 object-cover"
      />
      <div className="p-4 text-center">
        <h3 className="text-lg font-bold text-gray-800">{animal.name}</h3>
      </div>
    </div>
  );
};

export default AnimalCard;
