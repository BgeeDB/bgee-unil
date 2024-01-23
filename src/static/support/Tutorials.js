import imagePath from '../../helpers/imagePath';
import PATHS from '../../routes/paths';

const tutorialValues = [
  {
    type: 'title',
    content: 'Bgee documentation and tutorials',
  },
  {
    type: 'grid',
    content: [
      {
        children: [
          {
            type: 'card',
            title: 'Tutorial: Gene search and gene page',
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
                  'Description of how to use TopAnat and to do an anatomical enrichment analysis.',
              },
            ],
          },
        ],
      },
      {
        children: [
          {
            type: 'card',
            title: 'Tutorial: Expression call search',
            image: {
              src: imagePath('/document-text-outline.svg'),
              alt: 'Document logo',
            },
            link: PATHS.SUPPORT.TUTORIAL_EXPRESSION_CALLS,
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
                  'Description of how to search all gene expression present and absent calls in the Bgee database.',
              },
            ],
          },
        ],
      },
      {
        children: [
          {
            type: 'card',
            title: 'Tutorial: Data curation in Bgee',
            image: {
              src: imagePath('/document-text-outline.svg'),
              alt: 'Document logo',
            },
            link: PATHS.SUPPORT.TUTORIAL_CURATION,
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
                  'Description of how the curation is done in Bgee.',
              },
            ],
          },
        ],
      },
      {
        children: [
          {
            type: 'card',
            title: 'Tutorial: Querying the Bgee Knowledge Graph',
            image: {
              src: imagePath('/document-text-outline.svg'),
              alt: 'Document logo',
            },
            link: PATHS.SUPPORT.TUTORIAL_SPARQL,
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
                  'Description of how to query the Bgee Knowledge Graph with SPARQL.',
              },
            ],
          },
        ],
      },
      {
        children: [
          {
            type: 'card',
            title: 'Tutorial: Comparison of gene expression',
            image: {
              src: imagePath('/document-text-outline.svg'),
              alt: 'Document logo',
            },
            link: PATHS.SUPPORT.TUTORIAL_EXPRESSION_COMPARISON,
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
                  'Description of how to compare gene expression for a list of genes in anatomical entities.',
              },
            ],
          },
        ],
      },
      {
        children: [
          {
            type: 'card',
            title: 'Tutorial: Raw data interface',
            image: {
              src: imagePath('/document-text-outline.svg'),
              alt: 'Document logo',
            },
            link: PATHS.SUPPORT.TUTORIAL_RAW_DATA,
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
                  'Description of how to explore experiments, raw data annotations and processed expression values.',
              },
            ],
          },
        ],
      },
      {
        children: [
          {
            type: 'card',
            title: 'Tutorial: Anatomical homology',
            image: {
              src: imagePath('/document-text-outline.svg'),
              alt: 'Document logo',
            },
            link: PATHS.SUPPORT.TUTORIAL_ANAT_HOMOLOGY,
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
                  'Description of how to retrieve anatomical entities that are homologous among different species.',
              },
            ],
          },
        ],
      },
      {
        children: [
          {
            type: 'card',
            title: 'Tutorial: Expression call download file',
            image: {
              src: imagePath('/document-text-outline.svg'),
              alt: 'Document logo',
            },
            link: PATHS.SUPPORT.TUTORIAL_GENE_EXPR,
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
                  'Description of the format of expression call download files.',
              },
            ],
          },
        ],
      },
      {
        children: [
          {
            type: 'card',
            title: 'Tutorial: Processed expression values download file',
            image: {
              src: imagePath('/document-text-outline.svg'),
              alt: 'Document logo',
            },
            link: PATHS.SUPPORT.TUTORIAL_EXPR_VAL,
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
                  'Description of the format of processed expression values download files.',
              },
            ],
          },
        ],
      },
    ],
    cols: 3,
    fillRow: true,
  },
];

export default tutorialValues;
