import imagePath from '../../helpers/imagePath';
import PATHS from '../../routes/paths';

const tutorialValues = [
  {
    type: 'title',
    content: 'Bgee tutorials',
  },
  {
    type: 'grid',
    content: [
      {
        children: [
          {
            type: 'card',
            title: 'Tutorial: gene search and gene page',
            image: {
              src: imagePath('/document-text-outline.svg'),
              alt: 'Document logo',
            },
            link: PATHS.SUPPORT.TUTORIAL_GENE_PAGE,
            linkType: 'internal',
            classNames: 'mb-3',
          },
          {
            type: 'rich_text',
            classNames: 'has-text-centered',
            content: [
              {
                type: 'text',
                content:
                  'Description of how to search gene and what kind of information you can get from the Bgee gene page.',
              },
            ],
          },
        ],
      },
      {
        children: [
          {
            type: 'card',
            title: 'Tutorial: TopAnat, Uberon enrichment analysis',
            image: {
              src: imagePath('/document-text-outline.svg'),
              alt: 'Document logo',
            },
            link: PATHS.SUPPORT.TUTORIAL_TOPANAT,
            linkType: 'internal',
            classNames: 'mb-3',
          },
          {
            type: 'rich_text',
            classNames: 'has-text-centered',
            content: [
              {
                type: 'text',
                content:
                  'Description of how to use TopAnat and to do an anatomical enrichment analysis',
              },
            ],
          },
        ],
      },
    ],
    cols: 2,
    fillRow: true,
  },
];

export default tutorialValues;
