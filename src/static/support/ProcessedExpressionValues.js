import { FULL_LENGTH_LABEL } from '../../api/prod/constant';
import imagePath from '../../helpers/imagePath';
import PATHS from '../../routes/paths';

const expressionValues = [
  {
    type: 'title',
    content: 'Documentation of processed expression values files',
  },
  {
    type: 'grid',
    content: [
      {
        children: [
          {
            type: 'card',
            title: 'RNA-Seq processed expression values',
            image: {
              src: imagePath('/document-text-outline.svg'),
              alt: 'Github logo',
            },
            link: PATHS.SUPPORT.RNASEQ_PROCESSED_EXPRESSION_VALUES,
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
                  'Description of the format of annotation download files (that include the library and experiment files) as well as the processed expression values download files for RNA-Seq data. The files can be found in the ',
              },
              {
                type: 'link_internal',
                path: PATHS.DOWNLOAD.PROCESSED_EXPRESSION_VALUES,
                text: 'download page',
              },
              {
                type: 'text',
                content: ' for each species.',
              },
            ],
          },
        ],
      },
      {
        children: [
          {
            type: 'card',
            title: `${FULL_LENGTH_LABEL} processed expression values`,
            image: {
              src: imagePath('/document-text-outline.svg'),
              alt: 'Github logo',
            },
            link: PATHS.SUPPORT.SCRNASEQ_FULLLENGTH_PROCESSED_EXPRESSION_VALUES,
            linkType: 'internal',
            classNames: 'mb-3',
          },
          {
            type: 'rich_text',
            classNames: 'has-text-centered',
            content: [
              {
                type: 'text',
                content: `Description of the format of annotation download files (that include the chips and experiment files) as well as the processed expression values download files for ${FULL_LENGTH_LABEL} data. The files can be found in the `,
              },
              {
                type: 'link_internal',
                path: PATHS.DOWNLOAD.PROCESSED_EXPRESSION_VALUES,
                text: 'download page',
              },
              {
                type: 'text',
                content: ' for each species.',
              },
            ],
          },
        ],
      },
      {
        children: [
          {
            type: 'card',
            title: 'Affymetrix processed expression values',
            image: {
              src: imagePath('/document-text-outline.svg'),
              alt: 'Github logo',
            },
            link: PATHS.SUPPORT.AFFYMETRIX_PROCESSED_EXPRESSION_VALUES,
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
                  'Description of the format of annotation download files (that include the chip and experiment files) as well as the processed expression values download files for Affymetrix data. The files can be found in the ',
              },
              {
                type: 'link_internal',
                path: PATHS.DOWNLOAD.PROCESSED_EXPRESSION_VALUES,
                text: 'download page',
              },
              {
                type: 'text',
                content: ' for each species.',
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

export default expressionValues;
