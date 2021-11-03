const sources = [
  {
    type: 'title',
    content: 'Data sources',
  },
  {
    type: 'text',
    content:
      'This page provides information about the data sources used in Bgee 14.2.',
  },
  {
    type: 'section',
    title: 'Genomics databases',
    children: [
      {
        type: 'columns',
        classNames: 'mt-2',
        content: [
          {
            classNames: 'is-2',
            content: [
              {
                type: 'rich_text',
                content: [
                  {
                    type: 'link_external',
                    path: 'http://www.ensembl.org/',
                    text: 'Ensembl',
                  },
                ],
              },
            ],
          },
          {
            classNames: 'is-10',
            content: [
              {
                type: 'columns',
                classNames: 'mb-0',
                content: [
                  {
                    classNames: 'is-2',
                    content: [
                      {
                        type: 'text',
                        content: 'DESCRIPTION',
                      },
                    ],
                  },
                  {
                    classNames: 'is-10',
                    content: [
                      {
                        type: 'text',
                        content:
                          "Source for gene annotations, mappings to the Gene Ontology, mappings to Affymetrix probeset IDs, and cross-references to other databases'",
                      },
                    ],
                  },
                ],
              },
              {
                type: 'columns',
                content: [
                  {
                    classNames: 'is-2',
                    content: [
                      {
                        type: 'text',
                        content: 'LAST IMPORT',
                      },
                    ],
                  },
                  {
                    classNames: 'is-10',
                    content: [
                      {
                        type: 'text',
                        content: '2016-03-17 (release 84)',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      { type: 'separator' },
      {
        type: 'columns',
        content: [
          {
            classNames: 'is-2',
            content: [
              {
                type: 'rich_text',
                content: [
                  {
                    type: 'link_external',
                    path: 'http://www.mirbase.org/',
                    text: 'miRBase',
                  },
                ],
              },
            ],
          },
          {
            classNames: 'is-10',
            content: [
              {
                type: 'columns',
                classNames: 'mb-0',
                content: [
                  {
                    classNames: 'is-2',
                    content: [
                      {
                        type: 'text',
                        content: 'DESCRIPTION',
                      },
                    ],
                  },
                  {
                    classNames: 'is-10',
                    content: [
                      {
                        type: 'text',
                        content: 'Source for miRNA families',
                      },
                    ],
                  },
                ],
              },
              {
                type: 'columns',
                content: [
                  {
                    classNames: 'is-2',
                    content: [
                      {
                        type: 'text',
                        content: 'LAST IMPORT',
                      },
                    ],
                  },
                  {
                    classNames: 'is-10',
                    content: [
                      {
                        type: 'text',
                        content: '2014-06-22 (release 21)',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      { type: 'separator' },
      {
        type: 'columns',
        content: [
          {
            classNames: 'is-2',
            content: [
              {
                type: 'rich_text',
                content: [
                  {
                    type: 'link_external',
                    path: 'http://omabrowser.org/',
                    text: 'OMA',
                  },
                ],
              },
            ],
          },
          {
            classNames: 'is-10',
            content: [
              {
                type: 'columns',
                classNames: 'mb-0',
                content: [
                  {
                    classNames: 'is-2',
                    content: [
                      {
                        type: 'text',
                        content: 'DESCRIPTION',
                      },
                    ],
                  },
                  {
                    classNames: 'is-10',
                    content: [
                      {
                        type: 'text',
                        content: 'Source of gene orthology information',
                      },
                    ],
                  },
                ],
              },
              {
                type: 'columns',
                content: [
                  {
                    classNames: 'is-2',
                    content: [
                      {
                        type: 'text',
                        content: 'LAST IMPORT',
                      },
                    ],
                  },
                  {
                    classNames: 'is-10',
                    content: [
                      {
                        type: 'text',
                        content: '2017-08-20',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    type: 'section',
    title: 'RNA-Seq data sources',
    children: [
      {
        type: 'columns',
        classNames: 'mt-2',
        content: [
          {
            classNames: 'is-2 ',
            content: [
              {
                type: 'rich_text',
                content: [
                  {
                    type: 'link_external',
                    path: 'https://www.ebi.ac.uk/arrayexpress/',
                    text: 'ArrayExpress',
                  },
                ],
              },
            ],
          },
          {
            classNames: 'is-10',
            content: [
              {
                type: 'text',
                content: 'RNA-Seq data source for various species',
              },
            ],
          },
        ],
      },
      { type: 'separator' },
      {
        type: 'columns',
        content: [
          {
            classNames: 'is-2',
            content: [
              {
                type: 'rich_text',
                content: [
                  {
                    type: 'link_external',
                    path: 'http://www.ncbi.nlm.nih.gov/geo/',
                    text: 'GEO',
                  },
                ],
              },
            ],
          },
          {
            classNames: 'is-10',
            content: [
              {
                type: 'columns',
                classNames: 'mb-0',
                content: [
                  {
                    classNames: 'is-2',
                    content: [
                      {
                        type: 'text',
                        content: 'DESCRIPTION',
                      },
                    ],
                  },
                  {
                    classNames: 'is-10',
                    content: [
                      {
                        type: 'text',
                        content: 'RNA-Seq data source for various species',
                      },
                    ],
                  },
                ],
              },
              {
                type: 'columns',
                content: [
                  {
                    classNames: 'is-2',
                    content: [
                      {
                        type: 'text',
                        content: 'LAST IMPORT',
                      },
                    ],
                  },
                  {
                    classNames: 'is-10',
                    content: [
                      {
                        type: 'text',
                        content: '2018-08-06',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      { type: 'separator' },
      {
        type: 'columns',
        content: [
          {
            classNames: 'is-2',
            content: [
              {
                type: 'rich_text',
                content: [
                  {
                    type: 'link_external',
                    path: 'https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=phs000424',
                    text: 'GTEx - dbGAP',
                  },
                ],
              },
            ],
          },
          {
            classNames: 'is-10',
            content: [
              {
                type: 'columns',
                classNames: 'mb-0',
                content: [
                  {
                    classNames: 'is-2',
                    content: [
                      {
                        type: 'text',
                        content: 'DESCRIPTION',
                      },
                    ],
                  },
                  {
                    classNames: 'is-10',
                    content: [
                      {
                        type: 'text',
                        content: 'GTEx RNA-Seq data',
                      },
                    ],
                  },
                ],
              },
              {
                type: 'columns',
                content: [
                  {
                    classNames: 'is-2',
                    content: [
                      {
                        type: 'text',
                        content: 'LAST IMPORT',
                      },
                    ],
                  },
                  {
                    classNames: 'is-10',
                    content: [
                      {
                        type: 'text',
                        content: '2015-10-02 (release 6.p1)',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      { type: 'separator' },
      {
        type: 'columns',
        content: [
          {
            classNames: 'is-2',
            content: [
              {
                type: 'rich_text',
                content: [
                  {
                    type: 'link_external',
                    path: 'http://www.ncbi.nlm.nih.gov/sra',
                    text: 'SRA',
                  },
                ],
              },
            ],
          },
          {
            classNames: 'is-10',
            content: [
              {
                type: 'columns',
                classNames: 'mb-0',
                content: [
                  {
                    classNames: 'is-2',
                    content: [
                      {
                        type: 'text',
                        content: 'DESCRIPTION',
                      },
                    ],
                  },
                  {
                    classNames: 'is-10',
                    content: [
                      {
                        type: 'text',
                        content: 'RNA-Seq data source for various species',
                      },
                    ],
                  },
                ],
              },
              {
                type: 'columns',
                content: [
                  {
                    classNames: 'is-2',
                    content: [
                      {
                        type: 'text',
                        content: 'LAST IMPORT',
                      },
                    ],
                  },
                  {
                    classNames: 'is-10',
                    content: [
                      {
                        type: 'text',
                        content: '2020-10-20',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    type: 'section',
    title: 'Affymetrix data sources',
    children: [
      {
        type: 'columns',
        content: [
          {
            classNames: 'is-2',
            content: [
              {
                type: 'rich_text',
                content: [
                  {
                    type: 'link_external',
                    path: 'http://www.ebi.ac.uk/arrayexpress/',
                    text: 'ArrayExpress',
                  },
                ],
              },
            ],
          },
          {
            classNames: 'is-10',
            content: [
              {
                type: 'columns',
                classNames: 'mb-0',
                content: [
                  {
                    classNames: 'is-2',
                    content: [
                      {
                        type: 'text',
                        content: 'DESCRIPTION',
                      },
                    ],
                  },
                  {
                    classNames: 'is-10',
                    content: [
                      {
                        type: 'text',
                        content: 'Affymetrix data source for various species',
                      },
                    ],
                  },
                ],
              },
              {
                type: 'columns',
                content: [
                  {
                    classNames: 'is-2',
                    content: [
                      {
                        type: 'text',
                        content: 'LAST IMPORT',
                      },
                    ],
                  },
                  {
                    classNames: 'is-10',
                    content: [
                      {
                        type: 'text',
                        content: '2016-08-21',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      { type: 'separator' },
      {
        type: 'columns',
        content: [
          {
            classNames: 'is-2',
            content: [
              {
                type: 'rich_text',
                content: [
                  {
                    type: 'link_external',
                    path: 'http://www.ncbi.nlm.nih.gov/geo/',
                    text: 'GEO',
                  },
                ],
              },
            ],
          },
          {
            classNames: 'is-10',
            content: [
              {
                type: 'columns',
                classNames: 'mb-0',
                content: [
                  {
                    classNames: 'is-2',
                    content: [
                      {
                        type: 'text',
                        content: 'DESCRIPTION',
                      },
                    ],
                  },
                  {
                    classNames: 'is-10',
                    content: [
                      {
                        type: 'text',
                        content: 'Affymetrix data source for various species',
                      },
                    ],
                  },
                ],
              },
              {
                type: 'columns',
                content: [
                  {
                    classNames: 'is-2',
                    content: [
                      {
                        type: 'text',
                        content: 'LAST IMPORT',
                      },
                    ],
                  },
                  {
                    classNames: 'is-10',
                    content: [
                      {
                        type: 'text',
                        content: '2016-08-21',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    type: 'section',
    title: 'In situ data sources',
    children: [
      {
        type: 'columns',
        content: [
          {
            classNames: 'is-2',
            content: [
              {
                type: 'rich_text',
                content: [
                  {
                    type: 'link_external',
                    path: 'http://insitu.fruitfly.org/',
                    text: 'BDGP',
                  },
                ],
              },
            ],
          },
          {
            classNames: 'is-10',
            content: [
              {
                type: 'columns',
                classNames: 'mb-0',
                content: [
                  {
                    classNames: 'is-2',
                    content: [
                      {
                        type: 'text',
                        content: 'DESCRIPTION',
                      },
                    ],
                  },
                  {
                    classNames: 'is-10',
                    content: [
                      {
                        type: 'text',
                        content: 'Drosophila in situ data source',
                      },
                    ],
                  },
                ],
              },
              {
                type: 'columns',
                content: [
                  {
                    classNames: 'is-2',
                    content: [
                      {
                        type: 'text',
                        content: 'LAST IMPORT',
                      },
                    ],
                  },
                  {
                    classNames: 'is-10',
                    content: [
                      {
                        type: 'text',
                        content: '2016-12-03',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      { type: 'separator' },
      {
        type: 'columns',
        content: [
          {
            classNames: 'is-2',
            content: [
              {
                type: 'rich_text',
                content: [
                  {
                    type: 'link_external',
                    path: 'http://flybase.org/',
                    text: 'FlyBase',
                  },
                ],
              },
            ],
          },
          {
            classNames: 'is-10',
            content: [
              {
                type: 'columns',
                classNames: 'mb-0',
                content: [
                  {
                    classNames: 'is-2',
                    content: [
                      {
                        type: 'text',
                        content: 'DESCRIPTION',
                      },
                    ],
                  },
                  {
                    classNames: 'is-10',
                    content: [
                      {
                        type: 'text',
                        content: 'Drosophila in situ data source',
                      },
                    ],
                  },
                ],
              },
              {
                type: 'columns',
                content: [
                  {
                    classNames: 'is-2',
                    content: [
                      {
                        type: 'text',
                        content: 'LAST IMPORT',
                      },
                    ],
                  },
                  {
                    classNames: 'is-10',
                    content: [
                      {
                        type: 'text',
                        content: '2016-12-05',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      { type: 'separator' },
      {
        type: 'columns',
        content: [
          {
            classNames: 'is-2',
            content: [
              {
                type: 'rich_text',
                content: [
                  {
                    type: 'link_external',
                    path: 'http://www.informatics.jax.org/expression.shtml',
                    text: 'MGI',
                  },
                ],
              },
            ],
          },
          {
            classNames: 'is-10',
            content: [
              {
                type: 'columns',
                classNames: 'mb-0',
                content: [
                  {
                    classNames: 'is-2',
                    content: [
                      {
                        type: 'text',
                        content: 'DESCRIPTION',
                      },
                    ],
                  },
                  {
                    classNames: 'is-10',
                    content: [
                      {
                        type: 'text',
                        content: 'Mouse in situ data source',
                      },
                    ],
                  },
                ],
              },
              {
                type: 'columns',
                content: [
                  {
                    classNames: 'is-2',
                    content: [
                      {
                        type: 'text',
                        content: 'LAST IMPORT',
                      },
                    ],
                  },
                  {
                    classNames: 'is-10',
                    content: [
                      {
                        type: 'text',
                        content: '2016-12-04',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      { type: 'separator' },
      {
        type: 'columns',
        content: [
          {
            classNames: 'is-2',
            content: [
              {
                type: 'rich_text',
                content: [
                  {
                    type: 'link_external',
                    path: 'http://www.wormbase.org/',
                    text: 'WormBase',
                  },
                ],
              },
            ],
          },
          {
            classNames: 'is-10',
            content: [
              {
                type: 'columns',
                classNames: 'mb-0',
                content: [
                  {
                    classNames: 'is-2',
                    content: [
                      {
                        type: 'text',
                        content: 'DESCRIPTION',
                      },
                    ],
                  },
                  {
                    classNames: 'is-10',
                    content: [
                      {
                        type: 'text',
                        content: 'WormBase - Nematode Information Resource',
                      },
                    ],
                  },
                ],
              },
              {
                type: 'columns',
                content: [
                  {
                    classNames: 'is-2',
                    content: [
                      {
                        type: 'text',
                        content: 'LAST IMPORT',
                      },
                    ],
                  },
                  {
                    classNames: 'is-10',
                    content: [
                      {
                        type: 'text',
                        content: '2016-08-28',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      { type: 'separator' },
      {
        type: 'columns',
        content: [
          {
            classNames: 'is-2',
            content: [
              {
                type: 'rich_text',
                content: [
                  {
                    type: 'link_external',
                    path: 'http://www.xenbase.org/',
                    text: 'XenBase',
                  },
                ],
              },
            ],
          },
          {
            classNames: 'is-10',
            content: [
              {
                type: 'columns',
                classNames: 'mb-0',
                content: [
                  {
                    classNames: 'is-2',
                    content: [
                      {
                        type: 'text',
                        content: 'DESCRIPTION',
                      },
                    ],
                  },
                  {
                    classNames: 'is-10',
                    content: [
                      {
                        type: 'text',
                        content: 'Xenopus in situ data source',
                      },
                    ],
                  },
                ],
              },
              {
                type: 'columns',
                content: [
                  {
                    classNames: 'is-2',
                    content: [
                      {
                        type: 'text',
                        content: 'LAST IMPORT',
                      },
                    ],
                  },
                  {
                    classNames: 'is-10',
                    content: [
                      {
                        type: 'text',
                        content: '2016-11-14',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      { type: 'separator' },
      {
        type: 'columns',
        content: [
          {
            classNames: 'is-2',
            content: [
              {
                type: 'rich_text',
                content: [
                  {
                    type: 'link_external',
                    path: 'http://zfin.org/',
                    text: 'ZFIN',
                  },
                ],
              },
            ],
          },
          {
            classNames: 'is-10',
            content: [
              {
                type: 'columns',
                classNames: 'mb-0',
                content: [
                  {
                    classNames: 'is-2',
                    content: [
                      {
                        type: 'text',
                        content: 'DESCRIPTION',
                      },
                    ],
                  },
                  {
                    classNames: 'is-10',
                    content: [
                      {
                        type: 'text',
                        content: 'Zebrafish in situ data source',
                      },
                    ],
                  },
                ],
              },
              {
                type: 'columns',
                content: [
                  {
                    classNames: 'is-2',
                    content: [
                      {
                        type: 'text',
                        content: 'LAST IMPORT',
                      },
                    ],
                  },
                  {
                    classNames: 'is-10',
                    content: [
                      {
                        type: 'text',
                        content: '2017-03-26',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    type: 'section',
    title: 'EST data sources',
    children: [
      {
        type: 'columns',
        content: [
          {
            classNames: 'is-2',
            content: [
              {
                type: 'rich_text',
                content: [
                  {
                    type: 'link_external',
                    path: 'http://www.mirz.unibas.ch/cloningprofiles/',
                    text: 'smiRNAdb',
                  },
                ],
              },
            ],
          },
          {
            classNames: 'is-10',
            content: [
              {
                type: 'columns',
                classNames: 'mb-0',
                content: [
                  {
                    classNames: 'is-2',
                    content: [
                      {
                        type: 'text',
                        content: 'DESCRIPTION',
                      },
                    ],
                  },
                  {
                    classNames: 'is-10',
                    content: [
                      {
                        type: 'text',
                        content: 'EST data for miRNAs',
                      },
                    ],
                  },
                ],
              },
              {
                type: 'columns',
                content: [
                  {
                    classNames: 'is-2',
                    content: [
                      {
                        type: 'text',
                        content: 'LAST IMPORT',
                      },
                    ],
                  },
                  {
                    classNames: 'is-10',
                    content: [
                      {
                        type: 'text',
                        content: '2009-04-22 (release 2)',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      { type: 'separator' },
      {
        type: 'columns',
        content: [
          {
            classNames: 'is-2',
            content: [
              {
                type: 'rich_text',
                content: [
                  {
                    type: 'link_external',
                    path: 'https://ncbiinsights.ncbi.nlm.nih.gov/2019/07/30/the-unigene-web-pages-are-now-retired/',
                    text: 'UniGene',
                  },
                ],
              },
            ],
          },
          {
            classNames: 'is-10',
            content: [
              {
                type: 'columns',
                classNames: 'mb-0',
                content: [
                  {
                    classNames: 'is-2',
                    content: [
                      {
                        type: 'text',
                        content: 'DESCRIPTION',
                      },
                    ],
                  },
                  {
                    classNames: 'is-10',
                    content: [
                      {
                        type: 'text',
                        content: 'EST data source for various species',
                      },
                    ],
                  },
                ],
              },
              {
                type: 'columns',
                content: [
                  {
                    classNames: 'is-2',
                    content: [
                      {
                        type: 'text',
                        content: 'LAST IMPORT',
                      },
                    ],
                  },
                  {
                    classNames: 'is-10',
                    content: [
                      {
                        type: 'text',
                        content: '2016-12-04',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    type: 'section',
    title: 'Ontologies',
    children: [
      {
        type: 'columns',
        content: [
          {
            classNames: 'is-2',
            content: [
              {
                type: 'rich_text',
                content: [
                  {
                    type: 'link_external',
                    path: 'http://obofoundry.org/ontology/cio.html',
                    text: 'CIO',
                  },
                ],
              },
            ],
          },
          {
            classNames: 'is-10',
            content: [
              {
                type: 'columns',
                classNames: 'mb-0',
                content: [
                  {
                    classNames: 'is-2',
                    content: [
                      {
                        type: 'text',
                        content: 'DESCRIPTION',
                      },
                    ],
                  },
                  {
                    classNames: 'is-10',
                    content: [
                      {
                        type: 'text',
                        content: 'Confidence Information Ontology',
                      },
                    ],
                  },
                ],
              },
              {
                type: 'columns',
                content: [
                  {
                    classNames: 'is-2',
                    content: [
                      {
                        type: 'text',
                        content: 'LAST IMPORT',
                      },
                    ],
                  },
                  {
                    classNames: 'is-10',
                    content: [
                      {
                        type: 'text',
                        content: '2015-03-09',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      { type: 'separator' },
      {
        type: 'columns',
        content: [
          {
            classNames: 'is-2',
            content: [
              {
                type: 'rich_text',
                content: [
                  {
                    type: 'link_external',
                    path: 'https://github.com/obophenotype/developmental-stage-ontologies/',
                    text: 'Developmental stage ontologies',
                  },
                ],
              },
            ],
          },
          {
            classNames: 'is-10',
            content: [
              {
                type: 'columns',
                classNames: 'mb-0',
                content: [
                  {
                    classNames: 'is-2',
                    content: [
                      {
                        type: 'text',
                        content: 'DESCRIPTION',
                      },
                    ],
                  },
                  {
                    classNames: 'is-10',
                    content: [
                      {
                        type: 'text',
                        content:
                          'Collection of developmental and life stage ontologies in animals. Integrated into Uberon.',
                      },
                    ],
                  },
                ],
              },
              {
                type: 'columns',
                content: [
                  {
                    classNames: 'is-2',
                    content: [
                      {
                        type: 'text',
                        content: 'LAST IMPORT',
                      },
                    ],
                  },
                  {
                    classNames: 'is-10',
                    content: [
                      {
                        type: 'text',
                        content: '2016-12-07',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      { type: 'separator' },
      {
        type: 'columns',
        content: [
          {
            classNames: 'is-2',
            content: [
              {
                type: 'rich_text',
                content: [
                  {
                    type: 'link_external',
                    path: 'http://geneontology.org/GO.downloads.ontology.shtml',
                    text: 'GO',
                  },
                ],
              },
            ],
          },
          {
            classNames: 'is-10',
            content: [
              {
                type: 'columns',
                classNames: 'mb-0',
                content: [
                  {
                    classNames: 'is-2',
                    content: [
                      {
                        type: 'text',
                        content: 'DESCRIPTION',
                      },
                    ],
                  },
                  {
                    classNames: 'is-10',
                    content: [
                      {
                        type: 'text',
                        content: 'Filtered Gene Ontology',
                      },
                    ],
                  },
                ],
              },
              {
                type: 'columns',
                content: [
                  {
                    classNames: 'is-2',
                    content: [
                      {
                        type: 'text',
                        content: 'LAST IMPORT',
                      },
                    ],
                  },
                  {
                    classNames: 'is-10',
                    content: [
                      {
                        type: 'text',
                        content: '2016-04-29',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      { type: 'separator' },
      {
        type: 'columns',
        content: [
          {
            classNames: 'is-2',
            content: [
              {
                type: 'rich_text',
                content: [
                  {
                    type: 'link_external',
                    path: 'http://uberon.org/',
                    text: 'Uberon',
                  },
                ],
              },
            ],
          },
          {
            classNames: 'is-10',
            content: [
              {
                type: 'columns',
                classNames: 'mb-0',
                content: [
                  {
                    classNames: 'is-2',
                    content: [
                      {
                        type: 'text',
                        content: 'DESCRIPTION',
                      },
                    ],
                  },
                  {
                    classNames: 'is-10',
                    content: [
                      {
                        type: 'text',
                        content:
                          'Integrated cross-species ontology covering anatomical structures in animals. Use of the subset "composite-metazoan".',
                      },
                    ],
                  },
                ],
              },
              {
                type: 'columns',
                content: [
                  {
                    classNames: 'is-2',
                    content: [
                      {
                        type: 'text',
                        content: 'LAST IMPORT',
                      },
                    ],
                  },
                  {
                    classNames: 'is-10',
                    content: [
                      {
                        type: 'text',
                        content: '2016-07-13',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    type: 'section',
    title: 'Other sources',
    children: [
      {
        type: 'columns',
        content: [
          {
            classNames: 'is-2',
            content: [
              {
                type: 'rich_text',
                content: [
                  {
                    type: 'link_external',
                    path: 'https://github.com/BgeeDB/anatomical-similarity-annotations/',
                    text: 'Anatomical similarity annotations',
                  },
                ],
              },
            ],
          },
          {
            classNames: 'is-10',
            content: [
              {
                type: 'columns',
                classNames: 'mb-0',
                content: [
                  {
                    classNames: 'is-2',
                    content: [
                      {
                        type: 'text',
                        content: 'DESCRIPTION',
                      },
                    ],
                  },
                  {
                    classNames: 'is-10',
                    content: [
                      {
                        type: 'text',
                        content:
                          'Define evolutionary relations between anatomical entities described in the Uberon ontology',
                      },
                    ],
                  },
                ],
              },
              {
                type: 'columns',
                content: [
                  {
                    classNames: 'is-2',
                    content: [
                      {
                        type: 'text',
                        content: 'LAST IMPORT',
                      },
                    ],
                  },
                  {
                    classNames: 'is-10',
                    content: [
                      {
                        type: 'text',
                        content: '2016-07-13',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      { type: 'separator' },
      {
        type: 'columns',
        content: [
          {
            classNames: 'is-2',
            content: [
              {
                type: 'rich_text',
                content: [
                  {
                    type: 'link_external',
                    path: 'http://metazoa.ensembl.org/',
                    text: 'Ensembl Metazoa',
                  },
                ],
              },
            ],
          },
          {
            classNames: 'is-10',
            content: [
              {
                type: 'columns',
                classNames: 'mb-0',
                content: [
                  {
                    classNames: 'is-2',
                    content: [
                      {
                        type: 'text',
                        content: 'DESCRIPTION',
                      },
                    ],
                  },
                  {
                    classNames: 'is-10',
                    content: [
                      {
                        type: 'text',
                        content:
                          'Source for gene annotations, mappings to the Gene Ontology, mappings to Affymetrix probeset IDs, and cross-references to other databases',
                      },
                    ],
                  },
                ],
              },
              {
                type: 'columns',
                content: [
                  {
                    classNames: 'is-2',
                    content: [
                      {
                        type: 'text',
                        content: 'LAST IMPORT',
                      },
                    ],
                  },
                  {
                    classNames: 'is-10',
                    content: [
                      {
                        type: 'text',
                        content: '2016-03-17 (release 30)',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      { type: 'separator' },
      {
        type: 'columns',
        content: [
          {
            classNames: 'is-2',
            content: [
              {
                type: 'rich_text',
                content: [
                  {
                    type: 'link_external',
                    path: 'http://www.ncbi.nlm.nih.gov/taxonomy',
                    text: 'NCBI Taxonomy',
                  },
                ],
              },
            ],
          },
          {
            classNames: 'is-10',
            content: [
              {
                type: 'columns',
                classNames: 'mb-0',
                content: [
                  {
                    classNames: 'is-2',
                    content: [
                      {
                        type: 'text',
                        content: 'DESCRIPTION',
                      },
                    ],
                  },
                  {
                    classNames: 'is-10',
                    content: [
                      {
                        type: 'text',
                        content: 'Source taxonomy used in Bgee',
                      },
                    ],
                  },
                ],
              },
              {
                type: 'columns',
                content: [
                  {
                    classNames: 'is-2',
                    content: [
                      {
                        type: 'text',
                        content: 'LAST IMPORT',
                      },
                    ],
                  },
                  {
                    classNames: 'is-10',
                    content: [
                      {
                        type: 'text',
                        content: '2016-07-19',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

export default sources;
