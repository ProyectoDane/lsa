export const geography = uri => ({
  name_es: 'GEOGRAFIA',
  icon: require('../res/icon/geografia.png'),
  subcategories: [
    {
      name_es: 'CONTINENTES',
      videos: [
        {
          name_es: 'AFRICA',
          search_name_es: 'AFRICA',
          image: require('../res/image/africa.png'),
          video: `${uri}/africa.mp4`,
          downloaded: false,
        },
        {
          name_es: 'AMÉRICA',
          search_name_es: 'AMERICA',
          image: require('../res/image/america.png'),
          video: `${uri}/america.mp4`,
          downloaded: false,
        },
        {
          name_es: 'AMÉRICA DEL NORTE',
          search_name_es: 'AMERICA DEL NORTE',
          image: require('../res/image/america-norte.png'),
          video: `${uri}/america-norte.mp4`,
          downloaded: false,
        },
        {
          name_es: 'AMÉRICA CENTRAL',
          search_name_es: 'AMERICA CENTRAL',
          image: require('../res/image/america-central.png'),
          video: `${uri}/america-central.mp4`,
          downloaded: false,
        },
        {
          name_es: 'AMÉRICA LATINA',
          search_name_es: 'AMERICA LATINA',
          image: require('../res/image/latinoamerica.png'),
          video: `${uri}/latinoamerica.mp4`,
          downloaded: false,
        },
        {
          name_es: 'ASIA',
          search_name_es: 'ASIA',
          image: require('../res/image/asia.png'),
          video: `${uri}/asia.mp4`,
          downloaded: false,
        },
        {
          name_es: 'EUROPA',
          search_name_es: 'EUROPA',
          image: require('../res/image/europa.png'),
          video: `${uri}/europa.mp4`,
          downloaded: false,
        },
        {
          name_es: 'OCEANIA',
          search_name_es: 'OCEANIA',
          image: require('../res/image/oceania.png'),
          video: `${uri}/oceania.mp4`,
          downloaded: false,
        },
      ],
    },
    {
      name_es: 'PAÍSES DE EUROPA',
      videos: [],
    },
    {
      name_es: 'PAÍSES DE AMÉRICA',
      videos: [
        {
          name_es: 'BOLIVIA',
          search_name_es: 'BOLIVIA',
          image: require('../res/image/bolivia.png'),
          video: `${uri}/bolivia.mp4`,
          downloaded: false,
        },
        {
          name_es: 'BRASIL',
          search_name_es: 'BRASIL',
          image: require('../res/image/brasil.png'),
          video: `${uri}/brasil.mp4`,
          downloaded: false,
        },
        {
          name_es: 'CHILE',
          search_name_es: 'CHILE',
          image: require('../res/image/chile.png'),
          video: `${uri}/chile.mp4`,
          downloaded: false,
        },
        {
          name_es: 'PARAGUAY',
          search_name_es: 'PARAGUAY',
          image: require('../res/image/paraguay.png'),
          video: `${uri}/paraguay.mp4`,
          downloaded: false,
        },
        {
          name_es: 'URUGUAY',
          search_name_es: 'URUGUAY',
          image: require('../res/image/uruguay.png'),
          video: `${uri}/uruguay.mp4`,
          downloaded: false,
        },
      ],
    },
    {
      name_es: 'PAÍSES DE ASIA',
      videos: [],
    },
    {
      name_es: 'PAÍSES DE OCEANIA',
      videos: [],
    },
  ],
});
