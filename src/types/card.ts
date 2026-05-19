export type Card = {
    id: string;
    title: string;
    previewImg: string;
    previewImgWebp: string;
    level: 'hard' | 'medium' | 'easy';
    type: 'adventures' | 'horror' | 'mystic' | 'detective' | 'sci-fi';
    peopleMinMax: [number, number];
  };
