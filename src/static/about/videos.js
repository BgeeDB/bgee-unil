// import config from '../../config.json';
import imagePath from '../../helpers/imagePath';

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
      {
        type: 'link_image',
        src: imagePath('/videos/playlist.png'),
        path: 'https://www.youtube.com/playlist?list=PLoCxWrRWjqB3h9HbVGId2aZgzOaRs6Xzw',
        alt: 'Bgee videos playlist',
        classNames: 'youtube-preview-image',
      },
      {
        type: 'break_line',
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
        type: 'link_image',
        path: 'https://youtu.be/PRj9f1gX_PM',
        src: imagePath('/videos/Exploring-gene-expression-with-Bgee.png'),
        alt: 'Exploring gene expression with Bgee',
        classNames: 'youtube-preview-image',
      },
{
    type: 'break_line',
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
        type: 'link_image',
        path: 'https://youtu.be/hbpEJO2IzxA',
        src: imagePath('/videos/Bgee--an-overview.png'),
        alt: 'Bgee - an overview',
        classNames: 'youtube-preview-image',
      },
{
    type: 'break_line',
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
        type: 'link_image',
        path: 'https://youtu.be/70OHZDnmULE',
        src: imagePath('/videos/Bgee--Present_absent-gene-expression-calls-from-transcriptomics-data.png'),
        alt: 'Bgee - Present/absent gene expression calls from transcriptomics data',
        classNames: 'youtube-preview-image',
      },
{
    type: 'break_line',
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
        type: 'link_image',
        path: 'https://youtu.be/xlLM8mtb5O0',
        src: imagePath('/videos/Data-integration-in-Bgee.png'),
        alt: 'Data integration in Bgee',
        classNames: 'youtube-preview-image',
      },
{
    type: 'break_line',
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
        type: 'link_image',
        path: 'https://youtu.be/bJV8B5zGI0g',
        src: imagePath('/videos/Bgee-tools-and-data-access.png'),
        alt: 'Bgee tools and data access',
        classNames: 'youtube-preview-image',
      },
{
    type: 'break_line',
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
        type: 'link_image',
        path: 'https://youtu.be/RkbsNzMFUs0',
        src: imagePath('/videos/Answering-your-biological-questions-right-away.png'),
        alt: 'Answering your biological questions right away',
        classNames: 'youtube-preview-image',
      },
{
    type: 'break_line',
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
      {
        type: 'link_image',
        path: 'https://youtu.be/EHNTlOy14t4',
        src: imagePath('/videos/Duplication-of-genes-and-genomes--expression.png'),
        alt: 'Duplication of genes and genomes, expression',
        classNames: 'youtube-preview-image',
      },
    ],
  },
];

export default videos;
