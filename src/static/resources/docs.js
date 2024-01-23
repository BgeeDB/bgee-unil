import PATHS from '../../routes/paths';
import config from '../../config.json';
import imagePath from '../../helpers/imagePath';

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
              src: imagePath('/logo/bgee_access_logo.png'),
              alt: 'Bgee TopAnat logo',
            },
            link: PATHS.SUPPORT.TUTORIAL_TOPANAT,
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
              src: imagePath('/logo/download-logo.png'),
              alt: 'Bgee Download logo',
            },
            link: PATHS.SUPPORT.TUTORIAL_GENE_EXPR,
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
              src: imagePath('/logo/bgee_access_logo.png'),
              alt: 'Bgee Blog logo',
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
              src: imagePath('/logo/bgee_access_logo.png'),
              alt: 'Bgee data logo',
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
