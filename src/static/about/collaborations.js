import config from '../../config.json';
import imagePath from '../../helpers/imagePath';

const collaborations = [
  {
    type: 'title',
    content: 'Bgee collaborations',
  },
  {
    type: 'text',
    content:
      'This page provides current collaborations of the Bgee project (in alphabetical order).',
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
            path: `${config.ftpDomain}/easybgee_dump.sql.gz`,
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
      {
        type: 'rich_text',
        content: [
          {
            type: 'text',
            content:
              "BioSODA uses the 'EasyBgee' relational database to expose a Bgee SPARQL endpoint reachable through the following URL: ",
          },
          {
            type: 'code',
            content: 'https://bgee.org/sparql/',
          },
          {
            type: 'text',
            content: '. In the context of this project, the ',
          },
          {
            type: 'link_external',
            path: 'https://biosoda.expasy.org/',
            text: 'BioQuery web application',
          },
          {
            type: 'text',
            content:
              " provides a user-friendly interface to query 'EasyBgee' database based on the SPARQL query language.",
          },
        ],
      },
      {
        type: 'text',
        content:
          "The SPARQL endpoint and 'EasyBgee' are available and free to use for other projects or applications.",
      },
    ],
  },
  {
    type: 'section',
    title: 'INODE',
    children: [
      {
        type: 'link_image',
        src: imagePath('/INODE_Logo--white.png'),
        path: 'https://www.inode-project.eu/',
        alt: 'INODE',
        style: {
          backgroundColor: 'black',
        },
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
            path: 'https://www.inode-project.eu/',
            text: 'INODE (Intelligent Open Data Exploration) project',
          },
          {
            type: 'text',
            content:
              ' aims at simplifying access to data, by allowing a more dialectic and intuitive interaction with data, similar to a dialog with a human. The goal of INODE is to offer a suite of agile, fit-for-purpose and sustainable services for exploration of open data sets. It is funded by Horizon 2020 (',
          },
          {
            type: 'link_external',
            path: 'https://cordis.europa.eu/project/id/863410/fr',
            text: 'project 863410',
          },
          {
            type: 'text',
            content: ').',
          },
        ],
      },
      {
        type: 'text',
        content:
          'The Bgee team is one of the three use-case providers which the system will be initially developed and evaluated with. Bgee provides its expression data, and the cancer biomarker data from OncoMX (see below). The Bgee team collaborates on specifying the requirements of the system, adapting the data structure and format, and testing and evaluating the system.',
      },
    ],
  },
  {
    type: 'section',
    title: 'OMA',
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
            path: `${config.genericDomain}/ftp/bgee_v14_1/collaboration/branch_length_expression_divergence/`,
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
            path: `${config.genericDomain}/ftp/bgee_v14_2/collaboration/oncoMX/`,
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

export default collaborations;
