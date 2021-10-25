import PATHS from '../../routes/paths';
import config from '../../config.json';

const docs = [
  {
    type: 'title',
    content: `Bgee release ${config.version} documentation`,
  },
  {
    type: 'grid',
    content: [
      {
        children: [
          {
            type: 'card',
            title: 'TopAnat documentation',
            description: undefined,
            image: {
              src: '/static/img/bgee_access_logo.png',
            },
            link: PATHS.SUPPORT.TOP_ANAT,
            linkType: 'internal',
            classNames: '',
          },
        ],
      },
      {
        children: [
          {
            type: 'card',
            title: 'Download file documentation',
            description: undefined,
            image: {
              src: '/static/img/animals_logo.png',
            },
            link: PATHS.SUPPORT.GENE_EXPRESSION_CALLS,
            linkType: 'internal',
          },
        ],
      },
      {
        children: [
          {
            type: 'card',
            title: 'Bgee Blog',
            description: undefined,
            image: {
              src: '/static/img/bgee_access_logo.png',
            },
            link: 'https://bgeedb.wordpress.com/',
            linkType: 'external',
          },
        ],
      },
      {
        children: [
          {
            type: 'card',
            title: 'Bgee data sources',
            description: undefined,
            image: {
              src: '/static/img/bgee_access_logo.png',
            },
            imageClass: 'is-128x128',
            link: PATHS.ABOUT.SOURCES,
            linkType: 'internal',
          },
        ],
      },
    ],
    cols: 4,
  },
];

export default docs;
