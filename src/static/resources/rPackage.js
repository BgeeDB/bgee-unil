const docs = [
  {
    type: 'title',
    content: 'R packages',
  },
  {
    type: 'grid',
    content: [
      {
        children: [
          {
            type: 'card',
            title: 'BgeeDB R package',
            image: {
              src: '/static/img/r_logo_color.png',
            },
            link: 'https://bioconductor.org/packages/BgeeDB/',
            linkType: 'external',
            classNames: 'mb-3',
          },
          {
            type: 'text',
            classNames: 'has-text-centered',
            content:
              'Retrieve annotations, quantitative data and expression calls produced by the Bgee pipeline. Run GO-like enrichment analyses based on anatomical terms, where genes are mapped to anatomical terms by expression patterns.',
          },
        ],
      },
      {
        children: [
          {
            type: 'card',
            title: 'BgeeCall R package',
            image: {
              src: '/static/img/r_logo_color.png',
            },
            link: 'https://bioconductor.org/packages/BgeeCall/',
            linkType: 'external',
            classNames: 'mb-3',
          },
          {
            type: 'text',
            classNames: 'has-text-centered',
            content:
              'Generate present/absent gene expression calls for your own RNA-Seq libraries as long as the species are present in Bgee. BgeeCall uses reference intergenic regions to define a threshold of presence of expression specific to your RNA-Seq library.',
          },
        ],
      },
      {
        children: [
          {
            type: 'card',
            title: 'Container for BgeeCall and BgeeDB',
            image: {
              src: '/static/img/docker_logo.png',
            },
            link: 'https://hub.docker.com/r/bgeedb/bgee_r',
            linkType: 'external',
            classNames: 'mb-3',
          },
          {
            type: 'text',
            classNames: 'has-text-centered',
            content:
              'Docker container for BgeeCall and BgeeDB R Bioconductor packages. Contains everything needed to download Bgee data, run TopAnat or generate present/absent calls in R.',
          },
        ],
      },
    ],
    cols: 4,
  },
];

export default docs;
