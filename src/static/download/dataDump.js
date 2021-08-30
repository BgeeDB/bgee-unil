const dataDump = [
  {
    type: 'title',
    content: 'Bgee data dumps',
  },
  {
    type: 'grid',
    content: [
      {
        children: [
          {
            type: 'card',
            title: 'EasyBgee dump',
            image: {
              src: '/static/img/mysql_logo.png',
            },
            link: 'ftp://ftp.bgee.org/current/easybgee_dump.tar.gz',
            linkType: 'external',
            classNames: 'mb-3',
          },
          {
            type: 'text',
            classNames: 'has-text-centered',
            content:
              'Download the dump of the MySQL EasyBgee database, that contains most useful, and explicit information. Does not contain raw data.',
          },
        ],
      },
      {
        children: [
          {
            type: 'card',
            title: 'Bgee RDF data dump',
            image: {
              src: '/static/img/rdf_logo.png',
            },
            link: 'ftp://ftp.bgee.org/current/rdf_easybgee.zip',
            linkType: 'external',
            classNames: 'mb-3',
          },
          {
            type: 'text',
            classNames: 'has-text-centered',
            content:
              'Download the Bgee RDF data dump that contains all data present in the EasyBgee database.',
          },
        ],
      },
    ],
    cols: 2,
  },
];

export default dataDump;
