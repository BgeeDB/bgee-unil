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
        src: imagePath('/team/Bgee-team-062022.png'),
        path: '/about/team',
        alt: 'The current Bgee team',
        classNames: 'team-picture',
      },
      {
        type: 'rich_text',
        content: [
          {
            type: 'text',
            content:
              'The Bgee team is currently composed of (from left to right):',
          },
        ],
      },
      {
        type: 'unordered_list',
        children: [
          {
            type: 'rich_text',
            content: [
              {
                type: 'bold',
                content: 'Tzivanopoulou, Marianna',
              },
              {
                type: 'text',
                content: ' (Biocurator assistant: single-cell RNA-Seq data annotator and cleaner)',
              },
            ],
          },
          {
            type: 'rich_text',
            content: [
              {
                type: 'bold',
                content: 'Mendes de Farias, Tarcisio',
              },
              {
                type: 'text',
                content: ' (Computational biologist: RDF/SPARQL guru, Bgee data disseminator)',
              },
            ],
          },
          {
            type: 'rich_text',
            content: [
              {
                type: 'bold',
                content: 'Fonseca Costa, Sara',
              },
              {
                type: 'text',
                content: ' (Bio-Statistician: single-cell RNA-Seq pipeline creator, p-value activist)',
              },
            ],
          },
          {
            type: 'rich_text',
            content: [
              {
                type: 'bold',
                content: 'Niknejad, Anne',
              },
              {
                type: 'text',
                content: ' (Lead biocurator: provide "normal", healthy wild-type, expression data: the Bgee core)',
              },
            ],
          },
          {
            type: 'rich_text',
            content: [
              {
                type: 'bold',
                content: 'Wollbrett, Julien',
              },
              {
                type: 'text',
                content: ' (Software Developer: Bgee R packages maintainer, pipeline and Java developer)',
              },
            ],
          },
          {
            type: 'rich_text',
            content: [
              {
                type: 'bold',
                content: 'Moretti, Sébastien',
              },
              {
                type: 'text',
                content: ' (Software Developer: pipeline and container developer, system administrator)',
              },
            ],
          },
          {
            type: 'rich_text',
            content: [
              {
                type: 'bold',
                content: 'Dind, Sagane',
              },
              {
                type: 'text',
                content: ' (Bioinformatician: pre-filter data before curation, molecular protocol master)',
              },
            ],
          },
          {
            type: 'rich_text',
            content: [
              {
                type: 'bold',
                content: 'Bastian, Frédéric',
              },
              {
                type: 'text',
                content: ' (Associate Director: grant writer, MySQL and Java developer, Bgee howto)',
              },
            ],
          },
          {
            type: 'rich_text',
            content: [
              {
                type: 'bold',
                content: 'Robinson-Rechavi, Marc',
              },
              {
                type: 'text',
                content: ' (Associate Director: roadmap, idea agitator and provider, Bgee initiator)',
              },
            ],
          },
        ],
      },
      {
        type: 'break_line',
      },
    ],
  },
  {
    type: 'section',
    title: 'Former Bgee Team members',
    children: [
      {
        type: 'rich_text',
        content: [
          {
            type: 'text',
            content:
              'Alphabetically ordered list of former Bgee team members:',
          },
        ],
      },
      {
        type: 'unordered_list',
        children: [
          {
            type: 'text',
            content: 'Comte, Aurélie',
          },
          {
            type: 'text',
            content: 'Echchiki, Amina',
          },
          {
            type: 'text',
            content: 'Escoriza, Angelique',
          },
          {
            type: 'text',
            content: 'Gharib, Walid',
          },
          {
            type: 'text',
            content: 'Gonzales-Porta, Mar',
          },
          {
            type: 'text',
            content: 'Jarosz, Yohan',
          },
          {
            type: 'text',
            content: 'Laurenczy, Balazs',
          },
          {
            type: 'text',
            content: 'Moret, Philippe',
          },
          {
            type: 'text',
            content: 'Parmentier, Gilles',
          },
          {
            type: 'text',
            content: 'Person, Emilie',
          },
          {
            type: 'text',
            content: 'Rech De Laval, Valentine',
          },
          {
            type: 'text',
            content: 'Roelli, Patrick',
          },
          {
            type: 'text',
            content: 'Rosikiewicz, Marta',
          },
          {
            type: 'text',
            content: 'Roux, Julien',
          },
          {
            type: 'text',
            content: 'Sanjeev, Komal',
          },
          {
            type: 'text',
            content: 'Seppey, Mathieu',
          },
        ],
      },
      {
        type: 'break_line',
      },
    ],
  },
];

export default team;
