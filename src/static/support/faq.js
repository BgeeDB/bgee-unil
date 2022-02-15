import PATHS from '../../routes/paths';
import config from '../../config.json';

const faq = [
  {
    type: 'title',
    content: 'Frequently asked questions (FAQ)',
  },
  {
    type: 'rich_text',
    classNames: 'mb-3',
    content: [
      {
        type: 'text',
        content:
          "Got questions? We’ve got answers! Here, you can find Bgee team answers in response to the most frequently asked questions. If you don't find answers here, please do not hesitate to contact us, using ",
      },
      {
        type: 'link_mail',
        email: config.contactEmail,
        text: 'Bgee e-mail',
      },
      {
        type: 'text',
        content:
          '. And maybe a new collaboration will take place as it has already been (see the ',
      },
      {
        type: 'link_internal',
        path: PATHS.ABOUT.COLLABORATIONS,
        text: 'collaboration page',
      },
      {
        type: 'text',
        content: ').',
      },
    ],
  },
  {
    type: 'accordion',
    children: [
      {
        title:
          'Are all tissues tested in every species, e.g. in both mouse and rat?',
        body: [
          {
            type: 'rich_text',
            classNames: 'mb-3',
            content: [
              {
                type: 'text',
                content:
                  'We integrate publicly available data, and different species are studied in more or less details. Only tissues with detected active expression are displayed in the gene page on our website. If you use the files available for download (from here ',
              },
              {
                type: 'link_internal',
                path: PATHS.DOWNLOAD.GENE_EXPRESSION_CALLS,
                text: 'Genes expression calls',
              },
              {
                type: 'text',
                content:
                  '), you can see report of tissues with absence of expression. This will give you a definitive answer about which, e.g., mouse/rat tissues were studied.',
              },
            ],
          },
        ],
      },
      {
        title: 'Why do you use chimpanzee gene IDs for bonobo data?',
        body: "When generating data for Bgee release 14, the bonobo genome was not yet available in Ensembl. So, bonobo RNA-Seq libraries are mapped to the chimpanzee genome, and 'ENSPTRG' chimpanzee gene IDs are reported. Since the bonobo genome has been made available December 2017 in Ensembl, Bgee release 15 will use the actual bonobo genome as reference. In the meantime, you can use Ensembl tools to retrieve a mapping from chimpanzee genes to bonobo orthologs. We are sorry for the inconvenience.",
      },
      {
        title:
          'Why are there differences between interface results and downloadable files?',
        body: [
          {
            type: 'text',
            content:
              'This depends on the way the query is submitted. If you are only interested in gene expression in anatomical entities, ignoring developmental stages, you will see some differences between the gene Web page and the download files: for a given anatomical entity the gene Web page shows the lowest rank of all pairs of anatomical entity-developmental stages (you can click on the ' +
              ' button to see the ranks for all stages of a given anatomical entity). For the moment, the download files do not contain the minimum expression value. We are probably going to modify our download files to be coherent with the approach.',
          },
          {
            type: 'text',
            content:
              'Furthermore, in the Web application some anatomical entities are filtered. If one gene is expressed in one anatomical entity (brain) but is more expressed in a subpart of this anatomical entity (cerebellum), then we remove the anatomical entity itself (brain) from the gene web page and only keep the gene expression value of the subpart (cerebellum).',
          },
        ],
      },
      {
        title: 'Why don’t you use standard names for developmental stages?',
        body: [
          {
            type: 'rich_text',
            classNames: 'mb-3',
            content: [
              {
                type: 'text',
                content:
                  'We use as input one specific developmental stage ontology for each species, and we then merge all these species-specific developmental ontologies into one single multi-species ontology. To do that, we use broad developmental stages described in the ',
              },
              {
                type: 'link_external',
                path: 'https://github.com/obophenotype/developmental-stage-ontologies/tree/master/src',
                text: 'Uberon ontology',
              },
              {
                type: 'text',
                content:
                  ': either we map some of the species-specific stages to these Uberon broad developmental stages (i.e., equivalent classes), or we attach some of the species-specific stages as children of these Uberon developmental stages (i.e., subclasses).',
              },
            ],
          },
          {
            type: 'rich_text',
            classNames: 'mb-3',
            content: [
              {
                type: 'text',
                content:
                  "You can find all 'source' species-specific ontologies we develop ",
              },
              {
                type: 'link_external',
                path: 'https://github.com/obophenotype/developmental-stage-ontologies/tree/master/src',
                text: 'here',
              },
              {
                type: 'text',
                content: '. For ',
              },
              { type: 'italic', content: 'C. elegans' },
              {
                type: 'text',
                content: ', we rely on the ',
              },
              {
                type: 'link_external',
                path: 'http://www.obofoundry.org/ontology/wbls.html',
                text: 'WBIs ontology',
              },
              {
                type: 'text',
                content:
                  ' developed by WormBase (we also rely on external ontologies for fly, zebrafish, and xenopus).',
              },
            ],
          },
          {
            type: 'rich_text',
            classNames: 'mb-3',
            content: [
              {
                type: 'text',
                content:
                  'You can find the ontology merging all these species-specific ontologies with Uberon ',
              },
              {
                type: 'link_external',
                path: 'https://github.com/obophenotype/developmental-stage-ontologies/blob/master/external/bgee/dev_stage_ontology.obo',
                text: 'here',
              },
              {
                type: 'text',
                content:
                  '. You can find an overview of the resulting merge for ',
              },
              { type: 'italic', content: 'C. elegans ' },
              {
                type: 'link_external',
                path: 'https://github.com/obophenotype/developmental-stage-ontologies/blob/master/external/bgee/report.md#caenorhabditis-elegans',
                text: 'here',
              },
              { type: 'text', content: '.' },
            ],
          },
          {
            type: 'text',
            classNames: 'mb-3',
            content:
              "In the ontology, developmental stages are ordered thanks to the use of the relations 'preceded_by' and 'immediately_preceded_by'.",
          },
          {
            type: 'rich_text',
            classNames: 'mb-3',
            content: [
              {
                type: 'text',
                content:
                  'An example of apparent non-standard nomenclature arises for ',
              },
              { type: 'italic', content: 'C. elegans' },
              { type: 'text', content: ' a specific ' },
              { type: 'italic', content: 'C. elegans' },
              {
                type: 'text',
                content:
                  " developmental stage is mapped to a broad Uberon stage. For instance, several WBls stages are mapped to the same Uberon term 'UBERON:0000092' (post-embryonic stage): 'WBls:0000022' (postembryonic Ce), 'WBls:0000093' (Brugia postembryonic stage), 'WBls:0000103' (postembryonic nematode); these mappings are cross-references in the ontology file.",
              },
            ],
          },
          {
            type: 'rich_text',
            content: [
              {
                type: 'text',
                content:
                  "Similarly, some Uberon terms have no equivalent in WBls, as for instance 'UBERON:0007220' (late embryonic stage). In that case, we mapped the terms 'WBls:0000015' (elongating embryo Ce) and 'WBls:0000021' (fully-elongated embryo Ce) as children of 'UBERON:0007220'. As a result, the non-standard term (late embryonic stage) will show up in the nomenclature for ",
              },
              { type: 'italic', content: 'C. elegans.' },
            ],
          },
        ],
      },
      {
        title: 'Can I find information on strain and/or sex?',
        body: [
          {
            type: 'rich_text',
            content: [
              {
                type: 'text',
                content:
                  'Bgee contains only manually curated healthy expression data (e.g., no gene knock-out, no treatment, no disease). Currently (Bgee release 14), information on strain or sex is not available in files that provide calls of baseline presence/absence of expression (see ',
              },
              {
                type: 'link_internal',
                path: PATHS.DOWNLOAD.GENE_EXPRESSION_CALLS,
                text: 'Gene expression calls',
              },
              {
                type: 'text',
                content:
                  '). However, information is available in files that provide annotations and experiment information or processed expression values (see ',
              },
              {
                type: 'link_internal',
                path: PATHS.DOWNLOAD.PROCESSED_EXPRESSION_VALUES,
                text: 'Processed expression values',
              },
              {
                type: 'text',
                content:
                  '). It is also possible to download these data directly into R using ',
              },
              {
                type: 'link_external',
                path: 'https://bioconductor.org/packages/BgeeDB/',
                text: 'our R package',
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
        title:
          'Are there multi-species comparison available in gene expression calls?',
        body: 'These files are not currently available.',
      },
      {
        title: 'What can I do with my genes of interest?',
        body: [
          {
            type: 'rich_text',
            content: [
              {
                type: 'text',
                content: 'Each gene can be visualized one by one via ',
              },
              {
                type: 'link_internal',
                path: PATHS.SEARCH.GENE,
                text: 'our gene search',
              },
              {
                type: 'text',
                content:
                  '. You can also visualize enrichment of expression of your list relative to a random background using ',
              },
              {
                type: 'link_internal',
                path: PATHS.ANALYSIS.TOP_ANAT,
                text: 'TopAnat',
              },
              {
                type: 'text',
                content: '. All associated data can be downloaded using our ',
              },
              {
                type: 'link_external',
                path: 'https://bioconductor.org/packages/BgeeDB/',
                text: 'R package',
              },
              {
                type: 'text',
                content:
                  '. Note that there is at present no way to visualize a list of genes.',
              },
            ],
          },
        ],
      },
      {
        title: 'Do you have protein expression?',
        body: [
          {
            type: 'rich_text',
            content: [
              {
                type: 'text',
                content: 'No, Bgee only includes RNA level expression data. ',
              },
              {
                type: 'italic',
                content: 'In situ',
              },
              {
                type: 'text',
                content: ' means ',
              },
              {
                type: 'italic',
                content: 'in situ',
              },
              {
                type: 'text',
                content: ' hybridization of RNA only.',
              },
            ],
          },
        ],
      },
    ],
  },
];

export default faq;
