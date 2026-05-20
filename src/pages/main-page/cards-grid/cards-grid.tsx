import QuestCard from './quest-card';
import { Card } from '../../../types/card';

type CardsGridProps = {
  cards: Card[];
}

function CardsGrid({cards}: CardsGridProps): JSX.Element {
  return (
    <div className="cards-grid">
      {cards.map((card) => (
        <QuestCard key={card.id} card={card}/>
      ))}
    </div>
  );
}

export default CardsGrid;
