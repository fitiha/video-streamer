import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

const POST_TITLES = [
  'Whiteboard Templates By Industry Leaders',
  'cybertruckTrailer',
  'teslaFansTagline',
  'whatIsDone',
  'freshPrince',
  'sixSocksStudio',
  'vincenzoShowcase',
  'videoTutorial',
  'serifFonts',
  'webClientEvolution',
  'katieGriffin',
  'americanDream',
  'illustrationSystem',
  'carZioApp',
  'jamstackTutorial',
  'tylkoOrganise',
  'rayoFestival',
  'burrillDiprose',
  'samuelDayMind',
  'portfolioReview',
  'akkersVanMargraten',
  'gradientTicket',
  'dysonMotorcycle',
  'svgAnimation',
];

const posts = [...Array(23)].map((_, index) => ({
  id: faker.datatype.uuid(),
  cover: `/assets/images/covers/cover_${index + 1}.jpg`,
  title: POST_TITLES[index + 1],
  createdAt: faker.date.past(),
  view: faker.datatype.number(),
  comment: faker.datatype.number(),
  share: faker.datatype.number(),
  favorite: faker.datatype.number(),
  author: {
    name: faker.name.fullName(),
    avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  },
}));

export default posts;
