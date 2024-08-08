import {
  games,
  education,
  alphabet,
  sexualEducation,
  calendar,
  cpcd,
  body,
  hospital,
  house,
  school,
  family,
  clothes,
  technology,
  opposites,
  professions,
  food,
  animals,
  colors,
  numbers,
  feelings,
  street,
  communicating,
  argentina,
  time,
  sports,
  measurements,
  associations,
  geography,
  weather,
  actions,
  freeTime,
} from './categories';

const uri = 'https://lsa-argentina-videos.s3-sa-east-1.amazonaws.com';
export default {
  categories: [
    alphabet(uri),
    sexualEducation(uri),
    calendar(uri),
    body(uri),
    cpcd(uri),
    hospital(uri),
    house(uri),
    school(uri),
    family(uri),
    clothes(uri),
    technology(uri),
    opposites(uri),
    professions(uri),
    food(uri),
    animals(uri),
    colors(uri),
    numbers(uri),
    feelings(uri),
    street(uri),
    communicating(uri),
    argentina(uri),
    time(uri),
    sports(uri),
    education(uri),
    games(uri),
    measurements(uri),
    associations(uri),
    geography(uri),
    weather(uri),
    actions(uri),
    freeTime(uri),
  ],
};
