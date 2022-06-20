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
            content: 'Tzivanopoulou, Marianna ...',
          },
          {
            type: 'text',
            content: 'Mendes de Farias, Tarcisio ...',
          },
          {
            type: 'text',
            content: 'Fonseca Costa, Sara ...',
          },
          {
            type: 'text',
            content: 'Niknejad, Anne ...',
          },
          {
            type: 'text',
            content: 'Wollbrett, Julien ...',
          },
          {
            type: 'text',
            content: 'Moretti, Sébastien ...',
          },
          {
            type: 'text',
            content: 'Dind, Sagane ...',
          },
          {
            type: 'text',
            content: 'Bastian, Frédéric ...',
          },
          {
            type: 'text',
            content: 'Robinson-Rechavi, Marc ...',
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
              'Chronological list of former Bgee team members:',
          },
        ],
      },
      {
        type: 'unordered_list',
        children: [
          {
            type: 'text',
            content: 'Vallat, Bastien',
          },
          {
            type: 'text',
            content: 'Echchiki, Amina',
          },
          {
            type: 'text',
            content: 'Sanjeev, Komal',
          },
          {
            type: 'text',
            content: 'Escoriza, Angelique',
          },
          {
            type: 'text',
            content: 'Rech De Laval, Valentine',
          },
          {
            type: 'text',
            content: 'Seppey, Mathieu',
          },
          {
            type: 'text',
            content: 'Person, Emilie',
          },
          {
            type: 'text',
            content: 'Gonzales-Porta, Mar',
          },
          {
            type: 'text',
            content: 'Gharib, Walid',
          },
          {
            type: 'text',
            content: 'Comte, Aurélie',
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
            content: 'Parmentier, Gilles',
          },
        ],
      },
    ],
  },
];

export default team;
