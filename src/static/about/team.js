import config from '../../config.json';
import imagePath from '../../helpers/imagePath';

const team = [
  {
    type: 'title',
    content: 'Bgee team',
  },
  {
    type: 'text',
    content:
      'This page provides information about the present and past Bgee team',
  },
  {
    type: 'section',
    title: 'Bio-SODA',
    children: [
      {
        type: 'link_image',
        src: imagePath('/biosoda_logo.png'),
        path: 'https://www.zhaw.ch/no_cache/en/research/research-database/project-detailview/projektid/1493/',
        alt: 'Bio-SODA',
      },
      {
        type: 'rich_text',
        content: [
          {
            type: 'link_external',
            path: 'https://www.zhaw.ch/no_cache/en/research/research-database/project-detailview/projektid/1493/',
            text: 'BioSODA project',
          },
          {
            type: 'text',
            content:
              ' aims at enabling sophisticated semantic queries across large, decentralized and heterogeneous databases via an intuitive interface. The system will enable scientists, without prior training, to perform powerful joint queries across resources in ways that cannot be anticipated and therefore goes far and above the query functionality of specialized knowledge bases. It is supported by ',
          },
          {
            type: 'link_external',
            path: 'http://www.nfp75.ch/en',
            text: "NFP75 'Big Data'",
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
              "For this project, we created a sub-database of Bgee called 'EasyBgee'. The MySQL dump is available on ",
          },
          {
            type: 'link_external',
            path: `${config.ftpDomain}/easybgee_dump.tar.gz`,
            text: 'Bgee FTP',
          },
          {
            type: 'text',
            content: ". You can see the description of 'EasyBgee' in ",
          },
          {
            type: 'link_external',
            path: 'https://github.com/BgeeDB/bgee_pipeline/tree/master/pipeline/easybgee_creation#information-about-the-easy-bgee-database',
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
  {
    type: 'section',
    title: 'OncoMX',
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
