import { FormEvent, useState } from 'react';
import './App.css';

interface Card {
  id: string;
  name: string;
  images: {
    small: string;
    large: string;
  };
}

function App() {
  const [query, setQuery] = useState('');
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  function openModal(card: Card) {
    setSelectedCard(card);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsClosing(true); // Déclenche l'animation de fermeture
    setTimeout(() => {
      setSelectedCard(null); // Supprime la carte après l'animation
      setIsModalOpen(false); // Ferme la modale
      setIsClosing(false); // Réinitialise l'état
    }, 300); // La durée doit correspondre à celle de `fadeOut`
  }

  async function search(e: FormEvent) {
    e.preventDefault();
    console.log('Recherche en cours... avec ', query);
    const data = await fetch(
      `https://api.pokemontcg.io/v2/cards?q=name:${query}&pageSize=10`
    );
    const json = await data.json();
    setCards(json.data);
  }

  return (
    <>
      <div className="mt-20">
        <h1 className="text-slate-900 font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-center dark:text-white">
          Cartes Pokémon
        </h1>
        <p className="mt-6 text-lg text-slate-600 text-center max-w-3xl mx-auto dark:text-slate-400">
          Ceci est une phrase.
        </p>
      </div>

      <form
        className="mt-6 sm:mt-10 flex justify-center space-x-6 text-sm"
        onSubmit={search}
      >
        <input
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          className="hidden sm:flex items-center w-72 text-left space-x-3 px-4 h-12 bg-white ring-1 ring-slate-900/10 hover:ring-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-sm rounded-lg text-slate-400 dark:bg-slate-800 dark:ring-0 dark:text-slate-300 dark:highlight-white/5 dark:hover:bg-slate-700"
          placeholder="Chercher une carte..."
        />
        <button className="bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center sm:w-auto dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400">
          Rechercher
        </button>
      </form>

      <div className="mt-8 flex flex-wrap justify-around">
        {cards.map((card) => (
          <div key={card.id} className="mt-8">
            <div className="card-container" onClick={() => openModal(card)}>
              <div className="card">
                <div className="card-front">
                  <img
                    className="w90"
                    src={card.images.small}
                    alt={card.name}
                  />
                </div>
                <div className="card-back">
                  <div className="card-back-content"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && selectedCard && (
        <div className="modal-overlay" onClick={closeModal}>
          <div
            className={`modal-content ${isClosing ? 'fade-out' : ''}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* <button className="modal-close" onClick={closeModal}>
              &times;
            </button> */}

            <div className="flex">
              <img
                className="img-card"
                src={selectedCard.images.large}
                alt={selectedCard.name}
              />
              {/* <div className="mt-4 ml-4">
                <h2 className="text-slate-900 font-extrabold text-xs sm:text-5xl lg:text-2xl tracking-tight text-center dark:text-black">{selectedCard.name}</h2>
              </div> */}
            </div>

            {/* Ajoutez d'autres caractéristiques ici si nécessaire */}
          </div>
        </div>
      )}
    </>
  );
}

export default App;
