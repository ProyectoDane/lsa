export const weather = uri => ({
  name_es: 'CLIMA',
  icon: require('../res/icon/clima.png'),
  videos: [
    {
      name_es: 'PRIMAVERA',
      search_name_es: 'PRIMAVERA',
      image: require('../res/image/primavera.png'),
      video: `${uri}/primavera.mp4`,
      downloaded: false,
    },
    {
      name_es: 'VERANO',
      search_name_es: 'VERANO',
      image: require('../res/image/verano.png'),
      video: `${uri}/verano.mp4`,
      downloaded: false,
    },
    {
      name_es: 'OTOÑO',
      search_name_es: 'OTOÑO',
      image: require('../res/image/otono.png'),
      video: `${uri}/otono.mp4`,
      downloaded: false,
    },
    {
      name_es: 'INVIERNO',
      search_name_es: 'INVIERNO',
      image: require('../res/image/invierno.png'),
      video: `${uri}/invierno.mp4`,
      downloaded: false,
    },
    {
      name_es: 'FRÍO',
      search_name_es: 'FRIO',
      image: require('../res/image/frio.png'),
      video: `${uri}/frio.mp4`,
      downloaded: false,
    },
    {
      name_es: 'CALOR',
      search_name_es: 'CALOR',
      image: require('../res/image/calor.png'),
      video: `${uri}/calor.mp4`,
      downloaded: false,
    },
    {
      name_es: 'NUBLADO',
      search_name_es: 'NUBLADO',
      image: require('../res/image/nublado.png'),
      video: `${uri}/nublado.mp4`,
      downloaded: false,
    },
    {
      name_es: 'VIENTO',
      search_name_es: 'VIENTO',
      image: require('../res/image/viento.png'),
      video: `${uri}/viento.mp4`,
      downloaded: false,
    },
    {
      name_es: 'LLUVIA',
      search_name_es: 'LLUVIA',
      image: require('../res/image/lluvia.png'),
      video: `${uri}/lluvia.mp4`,
      downloaded: false,
    },
    {
      name_es: 'NIEVE',
      search_name_es: 'NIEVE',
      image: require('../res/image/nieve.png'),
      video: `${uri}/nieve.mp4`,
      downloaded: false,
    },
  ],
});
