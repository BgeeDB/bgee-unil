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
    title: 'Bgee YouTube channel',
    children: [
      {
        type: 'link_image',
        src: imagePath('/videos/Bgee-YouTube-Channel.png'),
        path: 'https://www.youtube.com/@bgeedatabase',
        alt: 'Bgee YouTube channel',
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
            path: 'https://www.youtube.com/playlist?list=PLbJBK0jNmCGLGR9-h8gmD7mCvN2RRHmZV',
            text: 'All About Bgee',
          },
        ],
      },
      {
        type: 'link_image',
        path: 'https://www.youtube.com/playlist?list=PLbJBK0jNmCGLGR9-h8gmD7mCvN2RRHmZV',
        src: imagePath('/videos/All-about-Bgee.png'),
        alt: 'All About Bgee',
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
            path: 'https://www.youtube.com/watch?v=vjrTq0fGCTk&list=PLbJBK0jNmCGKFCDZUnNoQra3T0E-VDhVu',
            text: 'Bgee Course 2023: Gene Expression Made Useful Easily: Tools and Database of Bgee',
          },
        ],
      },
      {
        type: 'link_image',
        path: 'https://www.youtube.com/watch?v=vjrTq0fGCTk&list=PLbJBK0jNmCGKFCDZUnNoQra3T0E-VDhVu',
        src: imagePath('/videos/Bgee-Course-2023.png'),
        alt: 'Bgee Course 2023: Gene Expression Made Useful Easily: Tools and Database of Bgee',
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
            path: 'https://www.youtube.com/watch?v=Tmu2x-PH0G4&list=PLbJBK0jNmCGLLVvMbPokgKlCzGU5D4jZQ',
            text: 'Bgee Course 2022: Gene Expression Made Useful Easily: Tools and Database of Bgee',
          },
        ],
      },
      {
        type: 'link_image',
        path: 'https://www.youtube.com/watch?v=Tmu2x-PH0G4&list=PLbJBK0jNmCGLLVvMbPokgKlCzGU5D4jZQ',
        src: imagePath('/videos/Bgee-Course-2022.png'),
        alt: 'Bgee Course 2022: Gene Expression Made Useful Easily: Tools and Database of Bgee',
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
            path: 'https://www.youtube.com/watch?v=hbpEJO2IzxA&list=PLbJBK0jNmCGL_MZehmKl4_Z1Wiz_mA_jq',
            text: 'Bgee Course 2020: Gene Expression Made Useful Easily: Tools and Database of Bgee',
          },
        ],
      },
      {
        type: 'link_image',
        path: 'https://www.youtube.com/watch?v=hbpEJO2IzxA&list=PLbJBK0jNmCGL_MZehmKl4_Z1Wiz_mA_jq',
        src: imagePath('/videos/Bgee-Course-2020.png'),
        alt: 'Bgee Course 2020: Gene Expression Made Useful Easily: Tools and Database of Bgee',
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
            path: 'https://www.youtube.com/watch?v=EHNTlOy14t4&list=PLbJBK0jNmCGIS7lYN9qed8r8bceT8fF87&index=3',
            text: 'Bgee Comparative Genomics',
          },
        ],
      },
      {
        type: 'link_image',
        path: 'https://www.youtube.com/watch?v=EHNTlOy14t4&list=PLbJBK0jNmCGIS7lYN9qed8r8bceT8fF87&index=3',
        src: imagePath('/videos/Bgee-Comparative-Genomics.png'),
        alt: 'Bgee Comparative Genomics',
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
            path: 'https://www.youtube.com/playlist?list=PLbJBK0jNmCGIKZuCsZ6daNEwbV0nCS6C0',
            text: 'Accessing Bgee with Semantic Queries',
          },
        ],
      },
      {
        type: 'link_image',
        path: 'https://www.youtube.com/playlist?list=PLbJBK0jNmCGIKZuCsZ6daNEwbV0nCS6C0',
        src: imagePath('/videos/Accessing-Bgee-with-Semantic-Queries.png'),
        alt: 'Accessing Bgee with Semantic Queries',
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
            path: 'https://www.youtube.com/watch?v=9q2q7_DJHRw&list=PLbJBK0jNmCGLGRt7FBSkNcVaJFKyu1G75',
            text: 'Bgee and scFAIR',
          },
        ],
      },
      {
        type: 'link_image',
        path: 'https://www.youtube.com/watch?v=9q2q7_DJHRw&list=PLbJBK0jNmCGLGRt7FBSkNcVaJFKyu1G75',
        src: imagePath('/videos/Bgee-scFAIR.png'),
        alt: 'Bgee and scFAIR',
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
            path: 'https://www.youtube.com/watch?v=ZQyK7IVHbFA&list=PLbJBK0jNmCGJth12mY77thJaJo2xLkbZq',
            text: 'Bgee at ISMB',
          },
        ],
      },
      {
        type: 'link_image',
        path: 'https://www.youtube.com/watch?v=ZQyK7IVHbFA&list=PLbJBK0jNmCGJth12mY77thJaJo2xLkbZq',
        src: imagePath('/videos/Bgee-at-ISMB.png'),
        alt: 'Bgee at ISMB',
        classNames: 'youtube-preview-image',
      },
    ],
  },
];

export default videos;
