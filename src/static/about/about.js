import PATHS from '../../routes/paths';
import imagePath from '../../helpers/imagePath';

const about = [
  {
    type: 'title',
    content: 'About',
  },
  {
    type: 'section',
    title: 'What is Bgee?',
    children: [
      {
        type: 'text',
        content: `Bgee is a database for retrieval and comparison of gene expression patterns across multiple animal species. It provides an intuitive answer to the question "where is a gene expressed?" and supports research in cancer and agriculture as well as evolutionary biology.`,
      },
      {
        type: 'unordered_list',
        children: [
          {
            type: 'text',
            content:
              'Bgee data are produced from multiple data types (RNA-Seq, Affymetrix, in situ hybridization, EST data), and multiple data sets, that are all integrated consistently to provide a single answer to the question: "where is this gene expressed?"',
          },
          {
            type: 'text',
            content:
              'Bgee is based exclusively on curated "normal", healthy wild-type expression data (e.g., no gene knock-out, no treatment, no disease), to provide a comparable reference of normal gene expression.',
          },
          {
            type: 'text',
            content:
              'Bgee produces calls of presence/absence of expression, and of differential over-/under-expression, integrated along with information of gene orthology, and of homology between organs. This allows comparisons of expression patterns between species.',
          },
        ],
      },
      {
        type: 'rich_text',
        content: [
          {
            content:
              'Bgee provides several tools on this website to study gene expression:',
            type: 'bold',
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
                content: 'a ',
                type: 'text',
              },
              {
                text: 'gene search',
                path: '/search/genes',
                type: 'link_internal',
              },
              {
                content:
                  ', to retrieve the preferred conditions of expression of any gene in Bgee',
                type: 'text',
              },
            ],
          },
          {
            type: 'rich_text',
            content: [
              {
                text: 'TopAnat expression enrichment analysis',
                path: '/analysis/top-anat',
                type: 'link_internal',
              },
              {
                content:
                  ', to discover the conditions with expression over-associated with a list of genes, as compared to the whole genome or a custom background',
                type: 'text',
              },
            ],
          },
          {
            type: 'rich_text',
            content: [
              {
                text: 'Expression comparison',
                path: '/analysis/expr-comparison',
                type: 'link_internal',
              },
              {
                content:
                  ', to compare expression between genes, within a given species or between multiple species',
                type: 'text',
              },
            ],
          },
        ],
      },
      {
        type: 'rich_text',
        content: [
          {
            content:
              'Bgee also provides two Bioconductor R packages for your analyses:',
            type: 'bold',
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
                text: 'BgeeDB',
                path: 'https://bioconductor.org/packages/BgeeDB/',
                type: 'link_external',
              },
              {
                content:
                  ', allowing to download the Affymetrix and RNA-Seq data and metadata used in Bgee, and to perform TopAnat analyses.',
                type: 'text',
              },
            ],
          },
          {
            type: 'rich_text',
            content: [
              {
                text: 'BgeeCall',
                path: 'https://bioconductor.org/packages/BgeeCall/',
                type: 'link_external',
              },
              {
                content:
                  ', to analyze your own RNA-Seq or scRNA-Seq data and produce calls of presence/absence of expression.',
                type: 'text',
              },
            ],
          },
        ],
      },
      {
        type: 'rich_text',
        content: [
          {
            content:
              'All Bgee data can also be directly downloaded from the relevant pages:',
            type: 'bold',
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
                text: 'gene expression calls',
                path: '/download/gene-expression-calls',
                type: 'link_internal',
              },
              {
                content:
                  ', providing the integrated summarized calls of presence/absence of expression produced by Bgee',
                type: 'text',
              },
            ],
          },
          {
            type: 'rich_text',
            content: [
              {
                text: 'processed expression values',
                path: '/download/processed-expression-values',
                type: 'link_internal',
              },
              {
                content:
                  ', allowing you to download the raw data used by Bgee along with their annotations',
                type: 'text',
              },
            ],
          },
          {
            type: 'rich_text',
            content: [
              {
                text: 'data dumps',
                path: '/download/data-dumps',
                type: 'link_internal',
              },
              {
                content:
                  ', for more advanced users, providing SQL and RDF dumps of the data found in Bgee.',
                type: 'text',
              },
            ],
          },
        ],
      },
      {
        type: 'rich_text',
        content: [
          {
            content: 'You might find these videos useful:',
            type: 'bold',
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
                text: 'Bgee, an overview',
                path: 'https://www.youtube.com/watch?v=hbpEJO2IzxA',
                type: 'link_external',
              },
              {
                content: ', the introduction of a course on Bgee',
                type: 'text',
              },
            ],
          },
          {
            type: 'rich_text',
            content: [
              {
                text: 'Bgee under the spotlight',
                path: 'https://www.sib.swiss/about-sib/news/10821-from-v1-to-v14-the-gene-expression-database-bgee-under-the-spotlight',
                type: 'link_external',
              },
              {
                content:
                  ', an interview of the group leaders of Bgee, retracing its evolutions',
                type: 'text',
              },
            ],
          },
        ],
      },
      {
        type: 'rich_text',
        content: [
          {
            content: 'More information is provided in the ',
            type: 'text',
          },
          {
            text: 'documentation',
            path: PATHS.RESOURCES.DOCS,
            type: 'link_internal',
          },
          {
            content: '.',
            type: 'text',
          },
        ],
      },
    ],
  },
  {
    type: 'section',
    title: 'Who are we?',
    children: [
      {
        type: 'rich_text',
        content: [
          {
            type: 'text',
            content: 'Bgee is developed by the ',
          },
          {
            type: 'link_external',
            text: 'Evolutionary Bioinformatics group',
            path: 'https://bioinfo.unil.ch/',
          },
          {
            type: 'text',
            content: ', part of the ',
          },
          {
            type: 'link_external',
            text: 'SIB Swiss Institute of Bioinformatics',
            path: 'https://www.sib.swiss/',
          },
          {
            type: 'text',
            content: ', at the ',
          },
          {
            type: 'link_external',
            text: 'University of Lausanne.',
            path: 'https://www.unil.ch/central/en/home.html',
          },
          {
            type: 'text',
            content: '.',
          },
        ],
      },
      {
        type: 'text',
        content:
          'Our main interest is in the evolution of animal genomes in the context of organismal function and development. We have special interests in the early evolution of chordates and fishes. We have the aim of producing a database useful to disciplines such as comparative genomics, Evo-Devo, or transcriptome studies, whilst providing an improved integration of homology and related concepts into bioinformatics through ontologies and ontology tools.',
      },
    ],
  },
  {
    type: 'section',
    title: 'How to cite us?',
    children: [
      {
        type: 'rich_text',
        content: [
          {
            type: 'text',
            content:
              'The list of all Bgee related publications including the most recent one to use to cite us are present in the dedicated ',
          },
          {
            type: 'link_internal',
            text: 'Bgee publications',
            path: '/about/publications',
          },
          {
            type: 'text',
            content: ' page.',
          },
        ],
      },
    ],
  },
  {
    type: 'section',
    title: 'Which license did we choose?',
    children: [
      {
        type: 'rich_text',
        content: [
          {
            type: 'text',
            content:
              'To the extent possible under law, Bgee team has waived all copyright and related or neighboring rights to Bgee project. This work is published under the ',
          },
          {
            type: 'link_external',
            text: 'Creative Commons Zero license (CC0)',
            path: 'https://creativecommons.org/publicdomain/zero/1.0/',
          },
          {
            type: 'text',
            content:
              ' from Switzerland. Although CC0 doesn\'t legally require users of the data to cite the source, if you intend to use data from Bgee, it would be nice to cite us.',
          },
        ],
      },
      {
        type: 'link_image',
        src: imagePath('/cc-zero-large.png'),
        path: 'https://creativecommons.org/publicdomain/zero/1.0/',
        alt: 'CC Zero',
        style: {
          marginTop: '.7rem',
        },
      },
      {
        type: 'text',
        content: `Any third party material on this site is the property of its original copyright holders; see notably "information about original images" at the bottom of our homepage for the animal photos copyright.`,
      },
    ],
  },
  {
    type: 'section',
    title: 'What is our privacy policy?',
    children: [
      {
        type: 'rich_text',
        content: [
          {
            type: 'text',
            content:
              'You can find all details about our privacy policy in the dedicated page ',
          },
          {
            type: 'link_internal',
            text: 'Bgee privacy notice',
            path: '/about/privacy-policy',
          },
          {
            type: 'text',
            content: '.',
          },
        ],
      },
    ],
  },
  {
    type: 'section',
    title: 'More',
    children: [
      {
        type: 'rich_text',
        content: [
          {
            type: 'text',
            content:
              'Our pipeline source code, as well as our curation and ontology resources can be browsed on ',
          },
          {
            type: 'link_external',
            text: 'our GitHub page',
            path: 'https://github.com/BgeeDB',
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
              'More information about data analyses and database content is available in the ',
          },
          {
            type: 'link_internal',
            text: 'documentation',
            path: PATHS.RESOURCES.DOCS,
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

export default about;
