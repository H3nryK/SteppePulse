import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

interface Animal {
  image: string;
  name: string;
}

const AnimalCard = ({ animal }: { animal: Animal }) => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="animal-card" data-aos="fade-up" data-aos-duration="1000">
      <img src={animal.image} alt={animal.name} />
      <h3>{animal.name}</h3>
    </div>
  );
};

export default AnimalCard;
