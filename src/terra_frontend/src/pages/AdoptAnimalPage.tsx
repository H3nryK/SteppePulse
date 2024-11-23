import { useParams } from 'react-router-dom';

function AdoptAnimalPage() {
  const { animal } = useParams();  // This will give you the value of the animal (e.g., tiger, koala)

  return (
    <div>
      <h1>Adopt a {animal}</h1>
      {/* You can display more information about the animal here */}
    </div>
  );
}

export default AdoptAnimalPage;
