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
        alt: 'The current Bgee team',
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
            type: 'text',
            content: 'Tzivanopoulou, Marianna (Biocurator assistant: single-cell RNA-Seq data annotator and cleaner)',
          },
          {
            type: 'text',
            content: 'Mendes de Farias, Tarcisio (Computational biologist: RDF/SPARQL guru, Bgee data disseminator)',
          },
          {
            type: 'text',
            content: 'Fonseca Costa, Sara (Bio-Statistician: single-cell RNA-Seq pipeline creator, p-value activist)',
          },
          {
            type: 'text',
            content: 'Niknejad, Anne (Lead biocurator: provide "normal", healthy wild-type, expression data: the Bgee core)',
          },
          {
            type: 'text',
            content: 'Wollbrett, Julien (Software Developer: Bgee R packages maintainer, pipeline and Java developer)',
          },
          {
            type: 'text',
            content: 'Moretti, Sébastien (Software Developer: pipeline and container developer, system administrator)',
          },
          {
            type: 'text',
            content: 'Dind, Sagane (Bioinformatician: pre-filter data before curation, molecular protocol master)',
          },
          {
            type: 'text',
            content: 'Bastian, Frédéric (Associate Director: grant writer, MySQL and Java developer, Bgee howto)',
          },
          {
            type: 'text',
            content: 'Robinson-Rechavi, Marc (Associate Director: roadmap, idea agitator and provider, Bgee initiator)',
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
