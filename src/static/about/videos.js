// import config from '../../config.json';
// import imagePath from '../../helpers/imagePath';

// TODO embed videos ???
const videos = [
  {
    type: 'title',
    content: 'The Bgee tutorial videos and online courses',
  },
  {
    type: 'text',
    content:
      '',
  },
  {
    type: 'section',
    title: 'Bgee videos playlist',
    children: [
      {
        type: 'rich_text',
        content: [
          {
            type: 'link_external',
            path: 'https://www.youtube.com/playlist?list=PLoCxWrRWjqB3h9HbVGId2aZgzOaRs6Xzw',
            text: 'Bgee videos playlist',
          },
        ],
      },
    ],
  },
  {
    type: 'section',
    title: 'Bgee tutorial videos and online courses',
    children: [
      {
        type: 'rich_text',
        content: [
          {
            type: 'link_external',
            path: 'https://youtu.be/PRj9f1gX_PM',
            text: 'Exploring gene expression with Bgee',
          },
          {
            type: 'text',
            content: ' (Jan 25, 2021)',
          },
        ],
      },
      {
        type: 'rich_text',
        content: [
          {
            type: 'link_external',
            path: 'https://youtu.be/hbpEJO2IzxA',
            text: 'Bgee - an overview',
          },
          {
            type: 'text',
            content: ' (Apr 21, 2020)',
          },
        ],
      },
      {
        type: 'rich_text',
        content: [
          {
            type: 'link_external',
            path: 'https://youtu.be/70OHZDnmULE',
            text: 'Bgee - Present/absent gene expression calls from transcriptomics data',
          },
          {
            type: 'text',
            content: ' (Apr 21, 2020)',
          },
        ],
      },
      {
        type: 'rich_text',
        content: [
          {
            type: 'link_external',
            path: 'https://youtu.be/xlLM8mtb5O0',
            text: 'Data integration in Bgee',
          },
          {
            type: 'text',
            content: ' (Apr 21, 2020)',
          },
        ],
      },
      {
        type: 'rich_text',
        content: [
          {
            type: 'link_external',
            path: 'https://youtu.be/bJV8B5zGI0g',
            text: 'Bgee tools and data access',
          },
          {
            type: 'text',
            content: ' (Apr 21, 2020)',
          },
        ],
      },
      {
        type: 'rich_text',
        content: [
          {
            type: 'link_external',
            path: 'https://youtu.be/RkbsNzMFUs0',
            text: 'Answering your biological questions right away',
          },
          {
            type: 'text',
            content: ' (Jun 03, 2020)',
          },
        ],
      },
      {
        type: 'rich_text',
        content: [
          {
            type: 'link_external',
            path: 'https://youtu.be/EHNTlOy14t4',
            text: 'Duplication of genes and genomes, expression (Comparative Genomics 3/3)',
          },
          {
            type: 'text',
            content: ' (Sep 16-18, 2020)',
          },
        ],
      },
    ],
  },
];

export default videos;
