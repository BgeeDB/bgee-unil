import imagePath from '../../helpers/imagePath';

const source = [
  {
    type: 'title',
    content: 'Source code',
  },
  {
    type: 'grid',
    content: [
      {
        children: [
          {
            type: 'card',
            title: 'Bgee pipeline',
            image: {
              src: imagePath('/logo/github_logo.png'),
            },
            link: 'https://github.com/BgeeDB/bgee_pipeline/tree/master',
            alt: 'Github logo',
            linkType: 'external',
            classNames: 'mb-3',
          },
          {
            type: 'text',
            classNames: 'has-text-centered',
            content:
              'Well documented source code of the Bgee pipeline used to generate databases and download files.',
          },
        ],
      },
      {
        children: [
          {
            type: 'card',
            title: 'BgeeDB R package',
            image: {
              src: imagePath('/logo/github_logo.png'),
            },
            link: 'https://github.com/BgeeDB/BgeeDB_R',
            alt: 'Github logo',
            linkType: 'external',
            classNames: 'mb-3',
          },
          {
            type: 'text',
            classNames: 'has-text-centered',
            content:
              'Retrieve annotations, quantitative data and expression calls produced by the Bgee pipeline. Run GO-like enrichment analyses based on anatomical terms, where genes are mapped to anatomical terms by expression patterns.',
          },
        ],
      },
      {
        children: [
          {
            type: 'card',
            title: 'BgeeCall R package',
            image: {
              src: imagePath('/logo/github_logo.png'),
            },
            link: 'https://github.com/BgeeDB/BgeeCall',
            alt: 'Github logo',
            linkType: 'external',
            classNames: 'mb-3',
          },
          {
            type: 'text',
            classNames: 'has-text-centered',
            content:
              'Generate present/absent gene expression calls for your own RNA-Seq libraries as long as the species are present in Bgee. BgeeCall uses reference intergenic regions to define a threshold of presence of expression specific to your RNA-Seq library.',
          },
        ],
      },
      {
        children: [
          {
            type: 'card',
            title: 'IQRay',
            image: {
              src: imagePath('/logo/github_logo.png'),
            },
            link: 'https://github.com/BgeeDB/IQRray',
            alt: 'Github logo',
            linkType: 'external',
            classNames: 'mb-3',
          },
          {
            type: 'text',
            classNames: 'has-text-centered',
            content:
              'A method for Affymetrix microarray quality control which outperforms other methods in identification of poor quality arrays in datasets composed of arrays from many independent experiments.',
          },
        ],
      },
    ],
    cols: 4,
    fillRow: true,
  },
];

export default source;
