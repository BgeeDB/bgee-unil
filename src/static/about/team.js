import config from '../../config.json';
import imagePath from '../../helpers/imagePath';

const team = [
  {
    type: 'title',
    content: 'The Bgee Team',
  },
  {
    type: 'text',
    content:
      'This page provides information about the present and past Bgee team',
  },
  {
    type: 'section',
    title: 'Current Bgee Team members',
    children: [
      {
        type: 'link_image',
        src: imagePath('/oma_logo.png'),
        path: 'https://omabrowser.org/',
        alt: 'OMA',
      },
      {
        type: 'rich_text',
        content: [
          {
            type: 'text',
            content: 'The ',
          },
          {
            type: 'link_external',
            path: 'https://omabrowser.org/oma/home/',
            text: 'OMA (Orthologous MAtrix) project',
          },
          {
            type: 'text',
            content:
              ' is a method and database for the inference of orthologs among complete genomes.',
          },
        ],
      },
      {
        type: 'rich_text',
        content: [
          {
            type: 'text',
            content:
              'As part of a scientific collaboration with OMA, we generated files containing gene expression in homologous anatomical entities. These files are available on ',
          },
          {
            type: 'link_external',
            path: `${config.ftpDomain}/collaboration/branch_length_expression_divergence/`,
            text: 'Bgee FTP',
          },
          {
            type: 'text',
            content: '. ',
          },
        ],
      },
      {
        type: 'text',
        content:
          'The homologous expression files are also available and free to use for other projects or applications.',
      },
    ],
  },
  {
    type: 'section',
    title: 'Former Bgee Team members',
    children: [
      {
        type: 'link_image',
        src: imagePath('/ONCOMX_logo-thin.png'),
        path: 'https://www.oncomx.org/',
        alt: 'OncoMX',
      },
      {
        type: 'rich_text',
        content: [
          {
            type: 'link_external',
            path: 'https://www.oncomx.org/',
            text: 'OncoMX',
          },
          {
            type: 'text',
            content:
              ' is a knowledgebase of unified cancer genomics data from integrated mutation, expression, literature, and biomarker databases, accessible through web portal. It is supported by ',
          },
          {
            type: 'link_external',
            path: 'https://www.cancer.gov/',
            text: 'NIH NCI',
          },
          {
            type: 'text',
            content: '.',
          },
        ],
      },
      {
        type: 'rich_text',
        content: [
          {
            type: 'text',
            content:
              'For this project, we generated files containing a subset of calls of presence/absence of expression with expression level categories specific to OncoMX. Files are available on ',
          },
          {
            type: 'link_external',
            path: `${config.ftpDomain}//collaboration/oncoMX/`,
            text: 'Bgee FTP',
          },
          {
            type: 'text',
            content: '. You can see the description of these files in ',
          },
          {
            type: 'link_external',
            path: 'https://github.com/BgeeDB/bgee_pipeline/tree/master/pipeline/collaboration/oncoMX#information-about-the-files-generated-for-oncomx',
            text: 'Bgee pipeline documentation',
          },
          {
            type: 'text',
            content: '.',
          },
        ],
      },
    ],
  },
];

export default team;
