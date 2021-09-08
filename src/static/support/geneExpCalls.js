import PATHS from '../../routes/paths';
import LINK_ANCHOR from '../../routes/linkAnchor';

const singleExprSimple = [
  {
    type: 'text',
    classNames: 'has-text-weight-semibold is-size-6 has-text-primary',
    content: 'Simple file',
    id: LINK_ANCHOR.GENE_EXPRESSION_CALLS.SINGLE_EXPR_SIMPLE_ID,
  },
  {
    type: 'text',
    content:
      'In simple files, propagated presence/absence expression calls are provided, but only calls in conditions of anatomical entity/developmental stage actually used in experimental data are displayed (no calls generated from propagation only).\n',
  },
  {
    type: 'table',
    title: 'Format description for single species simple expression file',
    classNames: 'is-narrow',
    columns: ['Column', 'Content', 'Example'],
    data: [
      [
        1,
        [
          {
            type: 'rich_text',
            content: [
              {
                type: 'link_anchor',
                selector: `single_expr_simple_col1`,
                text: 'Gene ID',
              },
            ],
          },
        ],
        'FBgn0005427',
      ],
      [
        2,
        [
          {
            type: 'rich_text',
            content: [
              {
                type: 'link_anchor',
                selector: `single_expr_simple_col2`,
                text: 'Gene name',
              },
            ],
          },
        ],
        'ewg',
      ],
      [
        3,
        [
          {
            type: 'rich_text',
            content: [
              {
                type: 'link_anchor',
                selector: `single_expr_simple_col3`,
                text: 'Anatomical entity ID',
              },
            ],
          },
        ],
        'FBbt:00003404',
      ],
      [
        4,
        [
          {
            type: 'rich_text',
            content: [
              {
                type: 'link_anchor',
                selector: `single_expr_simple_col4`,
                text: 'Anatomical entity name',
              },
            ],
          },
        ],
        'mesothoracic extracoxal depressor muscle 66 (Drosophila)',
      ],
      [
        5,
        [
          {
            type: 'rich_text',
            content: [
              {
                type: 'link_anchor',
                selector: `single_expr_simple_col5`,
                text: 'Developmental stage ID',
              },
              { type: 'text', content: ' *' },
            ],
          },
        ],
        'FBdv:00005348',
      ],
      [
        6,
        [
          {
            type: 'rich_text',
            content: [
              {
                type: 'link_anchor',
                selector: `single_expr_simple_col6`,
                text: 'Developmental stage name',
              },
              { type: 'text', content: ' *' },
            ],
          },
        ],
        'prepupal stage P4(ii) (Drosophila)',
      ],
      [
        7,
        [
          {
            type: 'rich_text',
            content: [
              {
                type: 'link_anchor',
                selector: `single_expr_simple_col7`,
                text: 'Expression',
              },
            ],
          },
        ],
        'present',
      ],
      [
        8,
        [
          {
            type: 'rich_text',
            content: [
              {
                type: 'link_anchor',
                selector: `single_expr_simple_col8`,
                text: 'Call quality',
              },
            ],
          },
        ],
        'silver quality',
      ],
      [
        9,
        [
          {
            type: 'rich_text',
            content: [
              {
                type: 'link_anchor',
                selector: `single_expr_simple_col9`,
                text: 'Expression rank',
              },
            ],
          },
        ],
        '1.24e4',
      ],
    ],
  },
  {
    type: 'text',
    content:
      "* only present if 'developmental stage' is selected as a condition parameter.",
  },
  {
    type: 'table',
    title: 'Example lines for single species simple expression file',
    classNames: 'small-font',
    scrollable: true,
    columns: [
      'Gene ID',
      'Gene Name',
      'Anatomical entity ID',
      'Anatomical entity name ',
      'Developmental stage ID',
      'Developmental stage name',
      'Expression',
      'Call quality',
      'Expression rank',
    ],
    data: [
      [
        'FBgn0005533',
        'RpS17',
        'UBERON:0000473',
        'testis',
        'UBERON:0000066',
        'fully formed stage',
        'present',
        'silver quality',
        '539',
      ],
      [
        'FBgn0005536',
        'Mbs',
        'UBERON:0000033',
        'head',
        'FBdv:00007085',
        'day 10 of adulthood (Drosophila)',
        'present',
        'gold quality',
        '1.57e3',
      ],
      [
        'FBgn0005558',
        'ey',
        'FBbt:00001684',
        'embryonic/larval hemocyte (Drosophila)',
        'FBdv:00005339',
        'third instar larval stage (Drosophila)',
        'absent',
        'silver quality',
        '2.35e4',
      ],
    ],
  },

  {
    type: 'bold',
    id: 'single_expr_simple_col1',
    content: 'Gene ID (column 1)',
  },
  { type: 'text', content: 'Unique identifier of gene from Ensembl.' },
  {
    type: 'rich_text',
    content: [
      { type: 'text', content: 'Please note that for ' },
      { type: 'italic', content: 'P. paniscus' },
      { type: 'text', content: ' (bonobo) we use ' },
      { type: 'italic', content: 'P. troglodytes' },
      { type: 'text', content: ' genome (chimpanzee), and that for ' },
      { type: 'italic', content: 'P. pygmaeus' },
      { type: 'text', content: ' (Bornean orangutan) we use ' },
      { type: 'italic', content: 'P. abelii' },
      {
        type: 'text',
        content:
          " genome (Sumatran orangutan). Only for those species (bonobo and Bornean orangutan), we modify the Ensembl gene IDs, to ensure that we provide unique gene identifiers over all species. It is therefore necessary, to obtain correct Ensembl gene IDs for those species, to replace gene ID prefix 'PPAG' with 'ENSPTRG', and 'PPYG' prefix with 'ENSPPYG'.",
      },
    ],
  },

  {
    type: 'bold',
    id: 'single_expr_simple_col2',
    classNames: 'mt-2',
    content: 'Gene name (column 2)',
  },
  {
    type: 'rich_text',
    content: [
      { type: 'text', content: 'Name of the gene defined by ' },
      { type: 'code', content: 'Gene ID' },
      { type: 'text', content: ' (column 1)' },
    ],
  },

  {
    type: 'bold',
    id: 'single_expr_simple_col3',
    classNames: 'mt-2',
    content: 'Anatomical entity ID (column 3)',
  },
  {
    type: 'text',
    content:
      'Unique identifier of the anatomical entity, from the Uberon ontology.',
  },

  {
    type: 'bold',
    id: 'single_expr_simple_col4',
    classNames: 'mt-2',
    content: 'Anatomical entity name (column 4)',
  },
  {
    type: 'rich_text',
    content: [
      { type: 'text', content: 'Name of the anatomical entity defined by ' },
      { type: 'code', content: 'Anatomical entity ID' },
      { type: 'text', content: ' (column 3)' },
    ],
  },

  {
    type: 'bold',
    id: 'single_expr_simple_col5',
    classNames: 'mt-2',
    content: 'Developmental stage ID (column 5)',
  },
  {
    type: 'text',
    content:
      'Unique identifier of the developmental stage, from the Uberon ontology.',
  },

  {
    type: 'bold',
    id: 'single_expr_simple_col6',
    classNames: 'mt-2',
    content: 'Developmental stage name (column 6)',
  },
  {
    type: 'rich_text',
    content: [
      { type: 'text', content: 'Name of the developmental stage defined by ' },
      { type: 'code', content: 'Developmental stage ID' },
      { type: 'text', content: ' (column 5)' },
    ],
  },

  {
    type: 'bold',
    id: 'single_expr_simple_col7',
    classNames: 'mt-2',
    content: 'Expression (column 7)',
  },
  {
    type: 'rich_text',
    content: [
      {
        type: 'text',
        content: 'Call generated from all data types for ',
      },
      { type: 'code', content: 'Gene ID' },
      { type: 'text', content: ' (column 1), in ' },
      { type: 'code', content: 'Anatomical entity ID' },
      { type: 'text', content: ' (column 3), at ' },
      { type: 'code', content: 'Developmental stage ID' },
      { type: 'text', content: ' (column 5). Permitted values:' },
    ],
  },
  {
    type: 'unordered_list',
    children: [
      {
        type: 'rich_text',
        content: [
          {
            type: 'underline',
            content: 'present:',
          },
          {
            type: 'text',
            content:
              ' report of presence of expression, from Bgee statistical tests and/or from ',
          },
          {
            type: 'italic',
            content: 'in situ',
          },
          {
            type: 'text',
            content: ' data sources.',
          },
        ],
      },
      {
        type: 'rich_text',
        content: [
          {
            type: 'underline',
            content: 'past:',
          },
          {
            type: 'text',
            content:
              ' report of presence of expression, from Bgee statistical tests and/or from ',
          },
          {
            type: 'italic',
            content: 'in situ',
          },
          {
            type: 'text',
            content: ' data sources.',
          },
        ],
      },
    ],
  },
  {
    type: 'text',
    content:
      'In Bgee, calls of absence of expression are always discarded if there exists a contradicting call of expression, for the same gene, in the same anatomical entity and developmental stage, or in a child entity or child developmental stage.',
  },

  {
    type: 'bold',
    id: 'single_expr_simple_col8',
    classNames: 'mt-2',
    content: 'Call quality (column 8)',
  },
  {
    type: 'text',
    content: 'Quality associated to the call. Permitted values:',
  },
  {
    type: 'unordered_list',
    children: [
      {
        type: 'rich_text',
        content: [
          {
            type: 'underline',
            content: 'high quality:',
          },
          {
            type: 'text',
            content:
              ': presence or absence of expression reported as high quality from Bgee statistical tests and/or from i',
          },
          {
            type: 'italic',
            content: 'in situ',
          },
          {
            type: 'text',
            content: ' data sources.',
          },
        ],
      },
      {
        type: 'rich_text',
        content: [
          {
            type: 'underline',
            content: 'low quality:',
          },
          {
            type: 'text',
            content:
              ': presence or absence of expression reported as high quality from Bgee statistical tests and/or from i',
          },
          {
            type: 'italic',
            content: 'in situ',
          },
          {
            type: 'text',
            content: ' data sources.',
          },
        ],
      },
    ],
  },
  {
    type: 'rich_text',
    content: [
      { type: 'text', content: 'From this quality a ' },
      { type: 'code', content: 'summary quality' },
      {
        type: 'text',
        content:
          ' is calculated using all calls corresponding to the same gene and condition parameters coming from different experiments and/or data types.',
      },
    ],
  },
  {
    type: 'rich_text',
    content: [
      {
        type: 'text',
        content: 'Quality associated to the call in column ',
      },
      { type: 'code', content: 'Expression' },
      { type: 'text', content: ' (column 7) is this ' },
      { type: 'code', content: 'summary quality' },
      { type: 'text', content: ' and is calculated using following rules:' },
    ],
  },
  {
    type: 'unordered_list',
    children: [
      {
        type: 'rich_text',
        content: [
          {
            type: 'underline',
            content: 'gold quality:',
          },
          {
            type: 'text',
            content: ' 2 or more high quality calls.',
          },
        ],
      },
      {
        type: 'rich_text',
        content: [
          {
            type: 'underline',
            content: 'silver quality:',
          },
          {
            type: 'text',
            content: ' 1 high quality call or 2 low quality calls',
          },
        ],
      },
      {
        type: 'rich_text',
        content: [
          {
            type: 'underline',
            content: 'bronze quality:',
          },
          {
            type: 'text',
            content:
              ' 1 low quality call (for internal use only. Not present in this file).',
          },
        ],
      },
    ],
  },

  {
    type: 'bold',
    id: 'single_expr_simple_col9',
    classNames: 'mt-2',
    content: 'Expression rank (column 9)',
  },
  {
    type: 'text',
    content:
      'Rank score associated to the call. Rank scores of expression calls are normalized across genes, conditions and species.',
  },
  {
    type: 'text',
    content:
      'A low score means that the gene is highly expressed in the condition.',
  },
];
const singleExprAdvanced = [
  {
    type: 'text',
    classNames: 'has-text-weight-semibold is-size-6 has-text-primary',
    content: 'Advanced file',
    id: LINK_ANCHOR.GENE_EXPRESSION_CALLS.SINGLE_EXPR_ADVANCED_ID,
  },
  {
    type: 'text',
    content:
      'Simple and advanced files contain the same expression calls (same number of lines) but advanced files contain more information on each call (more columns).',
  },
  {
    type: 'text',
    content: 'Advanced file information:',
  },
  {
    type: 'unordered_list',
    children: [
      {
        type: 'text',
        content:
          'details of expression status generated from each data type are provided (present, absent, no data).',
      },
      {
        type: 'text',
        content:
          'details of number of present high quality and present low quality calls from each data type.',
      },
      {
        type: 'rich_text',
        content: [
          {
            type: 'text',
            content:
              'details of number of absent high quality and absent low quality calls from ',
          },
          {
            type: 'italic',
            content: 'in situ',
          },
          {
            type: 'text',
            content: ', Affymetrix, and RNA-Seq.',
          },
        ],
      },
      {
        type: 'text',
        content:
          'details of data type for which calls are observed. Each call is observed in at least one data type',
      },
    ],
  },
  {
    type: 'table',
    title: 'Format description for single species advanced expression file',
    classNames: 'is-narrow',
    columns: ['Column', 'Content', 'Example'],
    data: [
      [
        1,
        [
          {
            type: 'rich_text',
            content: [
              {
                type: 'link_anchor',
                selector: 'single_expr_advanced_col2',
                text: 'Gene ID',
              },
            ],
          },
        ],
        'ENSDARG00000070769',
      ],
      [
        2,
        [
          {
            type: 'rich_text',
            content: [
              {
                type: 'link_anchor',
                selector: 'single_expr_advanced_col2',
                text: 'Gene name',
              },
            ],
          },
        ],
        'foxg1a',
      ],
      [
        3,
        [
          {
            type: 'rich_text',
            content: [
              {
                type: 'link_anchor',
                selector: 'single_expr_advanced_col2',
                text: 'Anatomical entity ID',
              },
            ],
          },
        ],
        'UBERON:0000955',
      ],
      [
        4,
        [
          {
            type: 'rich_text',
            content: [
              {
                type: 'link_anchor',
                selector: 'single_expr_advanced_col2',
                text: 'Anatomical entity name',
              },
            ],
          },
        ],
        'brain',
      ],
      [
        5,
        [
          {
            type: 'rich_text',
            content: [
              {
                type: 'link_anchor',
                selector: 'single_expr_advanced_col2',
                text: 'Developmental stage ID *',
              },
            ],
          },
        ],
        'UBERON:0000113',
      ],
      [
        6,
        [
          {
            type: 'rich_text',
            content: [
              {
                type: 'link_anchor',
                selector: 'single_expr_advanced_col2',
                text: 'Developmental stage name *',
              },
            ],
          },
        ],
        'post-juvenile adult stage',
      ],
      [
        7,
        [
          {
            type: 'rich_text',
            content: [
              {
                type: 'link_anchor',
                selector: 'single_expr_advanced_col2',
                text: 'Expression',
              },
            ],
          },
        ],
        'present',
      ],
      [
        8,
        [
          {
            type: 'rich_text',
            content: [
              {
                type: 'link_anchor',
                selector: 'single_expr_advanced_col2',
                text: 'Call quality',
              },
            ],
          },
        ],
        'silver quality',
      ],
      [
        9,
        [
          {
            type: 'rich_text',
            content: [
              {
                type: 'link_anchor',
                selector: 'single_expr_advanced_col2',
                text: 'See Including observed data column description">Expression rank',
              },
            ],
          },
        ],
        '1.23e4',
      ],
      [
        10,
        [
          {
            type: 'rich_text',
            content: [
              {
                type: 'link_anchor',
                selector: 'single_expr_advanced_col2',
                text: 'Including observed data',
              },
            ],
          },
        ],
        'yes',
      ],
      [
        11,
        [
          {
            type: 'rich_text',
            content: [
              {
                type: 'link_anchor',
                selector: 'single_expr_advanced_col2',
                text: 'Affymetrix data',
              },
            ],
          },
        ],
        'present',
      ],
      [
        12,
        [
          {
            type: 'rich_text',
            content: [
              {
                type: 'link_anchor',
                selector: 'single_expr_advanced_col2',
                text: 'Affymetrix experiment count showing expression of this gene in this condition or in sub-conditions with a high quality',
              },
            ],
          },
        ],
        '1',
      ],
      [
        13,
        [
          {
            type: 'rich_text',
            content: [
              {
                type: 'link_anchor',
                selector: 'single_expr_advanced_col2',
                text: 'Affymetrix experiment count showing expression of this gene in this condition or in sub-conditions with a low quality',
              },
            ],
          },
        ],
        '0',
      ],
      [
        14,
        [
          {
            type: 'rich_text',
            content: [
              {
                type: 'link_anchor',
                selector: 'single_expr_advanced_col2',
                text: 'Affymetrix experiment count showing absence of expression of this gene in this condition or valid parent conditions with a high quality',
              },
            ],
          },
        ],
        '0',
      ],
      [
        15,
        [
          {
            type: 'rich_text',
            content: [
              {
                type: 'link_anchor',
                selector: 'single_expr_advanced_col2',
                text: 'Affymetrix experiment count showing absence of expression of this gene in this condition or valid parent conditions with a low quality',
              },
            ],
          },
        ],
        '0',
      ],
      [
        16,
        [
          {
            type: 'rich_text',
            content: [
              {
                type: 'link_anchor',
                selector: 'single_expr_advanced_col2',
                text: 'Including Affymetrix observed data',
              },
            ],
          },
        ],
        'yes',
      ],
      [
        17,
        [
          {
            type: 'rich_text',
            content: [
              {
                type: 'link_anchor',
                selector: 'single_expr_advanced_col2',
                text: 'EST data',
              },
            ],
          },
        ],
        'present',
      ],
      [
        18,
        [
          {
            type: 'rich_text',
            content: [
              {
                type: 'link_anchor',
                selector: 'single_expr_advanced_col2',
                text: 'EST experiment count showing expression of this gene in this condition or in sub-conditions with a high quality',
              },
            ],
          },
        ],
        '0',
      ],
      [
        19,
        [
          {
            type: 'rich_text',
            content: [
              {
                type: 'link_anchor',
                selector: 'single_expr_advanced_col2',
                text: 'EST experiment count showing expression of this gene in this condition or in sub-conditions with a low quality',
              },
            ],
          },
        ],
        '0',
      ],
      [
        20,
        [
          {
            type: 'rich_text',
            content: [
              {
                type: 'link_anchor',
                selector: 'single_expr_advanced_col2',
                text: 'Including EST observed data',
              },
            ],
          },
        ],
        'no',
      ],
      [
        21,
        [
          {
            type: 'rich_text',
            content: [
              {
                type: 'link_anchor',
                selector: 'single_expr_advanced_col2',
                text: 'In situ data',
              },
            ],
          },
        ],
        'present',
      ],
      [
        22,
        [
          {
            type: 'rich_text',
            content: [
              {
                type: 'link_anchor',
                selector: 'single_expr_advanced_col2',
                text: 'In situ hybridization experiment count showing expression of this gene in this condition or in sub-conditions with a high quality',
              },
            ],
          },
        ],
        '1',
      ],
      [
        23,
        [
          {
            type: 'rich_text',
            content: [
              {
                type: 'link_anchor',
                selector: 'single_expr_advanced_col2',
                text: 'In situ hybridization experiment count showing expression of this gene in this condition or in sub-conditions with a low quality',
              },
            ],
          },
        ],
        '0',
      ],
      [
        24,
        [
          {
            type: 'rich_text',
            content: [
              {
                type: 'link_anchor',
                selector: 'single_expr_advanced_col2',
                text: 'In situ hybridization experiment count showing absence of expression of this gene in this condition or valid parent conditions with a high quality',
              },
            ],
          },
        ],
        '0',
      ],
      [
        25,
        [
          {
            type: 'rich_text',
            content: [
              {
                type: 'link_anchor',
                selector: 'single_expr_advanced_col2',
                text: 'In situ hybridization experiment count showing absence of expression of this gene in this condition or valid parent conditions with a low quality',
              },
            ],
          },
        ],
        '0',
      ],
      [
        26,
        [
          {
            type: 'rich_text',
            content: [
              {
                type: 'link_anchor',
                selector: 'single_expr_advanced_col2',
                text: 'Including in situ observed data',
              },
            ],
          },
        ],
        'yes',
      ],
      [
        27,
        [
          {
            type: 'rich_text',
            content: [
              {
                type: 'link_anchor',
                selector: 'single_expr_advanced_col2',
                text: 'RNA-Seq data',
              },
            ],
          },
        ],
        'present',
      ],
      [
        28,
        [
          {
            type: 'rich_text',
            content: [
              {
                type: 'link_anchor',
                selector: 'single_expr_advanced_col2',
                text: 'RNA-Seq experiment count showing expression of this gene in this condition or in sub-conditions with a high quality',
              },
            ],
          },
        ],
        '1',
      ],
      [
        29,
        [
          {
            type: 'rich_text',
            content: [
              {
                type: 'link_anchor',
                selector: 'single_expr_advanced_col2',
                text: 'RNA-Seq experiment count showing expression of this gene in this condition or in sub-conditions with a low quality',
              },
            ],
          },
        ],
        '0',
      ],
      [
        30,
        [
          {
            type: 'rich_text',
            content: [
              {
                type: 'link_anchor',
                selector: 'single_expr_advanced_col2',
                text: 'RNA-Seq experiment count showing absence of expression of this gene in this condition or valid parent conditions with a high quality',
              },
            ],
          },
        ],
        '0',
      ],
      [
        31,
        [
          {
            type: 'rich_text',
            content: [
              {
                type: 'link_anchor',
                selector: 'single_expr_advanced_col2',
                text: 'RNA-Seq experiment count showing absence of expression of this gene in this condition or valid parent conditions with a low quality',
              },
            ],
          },
        ],
        '0',
      ],
      [
        32,
        [
          {
            type: 'rich_text',
            content: [
              {
                type: 'link_anchor',
                selector: 'single_expr_advanced_col2',
                text: 'Including RNA-Seq observed data',
              },
            ],
          },
        ],
        'yes',
      ],
    ],
  },
  {
    type: 'text',
    content:
      "* only present if 'developmental stage' is selected as a condition parameter.",
  },
  {
    type: 'table',
    title: 'Example lines for single species advanced expression file',
    classNames: 'small-font',
    scrollable: true,
    columns: [
      'Gene ID',
      'Gene name',
      'Anatomical entity ID',
      'Anatomical entity name',
      'Developmental stage ID',
      'Developmental stage name',
      'Expression',
      'Call quality',
      'Expression rank',
      'Including observed data',
      'Affymetrix data',
      'Affymetrix experiment count showing expression of this gene in this condition or in sub-conditions with a high quality',
      'Affymetrix experiment count showing expression of this gene in this condition or in sub-conditions with a low quality',
      'Affymetrix experiment count showing absence of expression of this gene in this condition or valid parent conditions with a high quality',
      'Affymetrix experiment count showing absence of expression of this gene in this condition or valid parent conditions with a low quality',
      'Including Affymetrix observed data',
      'EST data',
      'EST experiment count showing expression of this gene in this condition or in sub-conditions with a high quality',
      'EST experiment count showing expression of this gene in this condition or in sub-conditions with a low quality',
      'Including EST observed data',
      'In situ data',
      'In situ hybridization experiment count showing expression of this gene in this condition or in sub-conditions with a high quality',
      'In situ hybridization experiment count showing expression of this gene in this condition or in sub-conditions with a low quality',
      'In situ hybridization experiment count showing absence of expression of this gene in this condition or valid parent conditions with a high quality',
      'In situ hybridization experiment count showing absence of expression of this gene in this condition or valid parent conditions with a low quality',
      'Including in situ observed data',
      'RNA-Seq data',
      'RNA-Seq experiment count showing expression of this gene in this condition or in sub-conditions with a high quality',
      'RNA-Seq experiment count showing expression of this gene in this condition or in sub-conditions with a low quality',
      'RNA-Seq experiment count showing absence of expression of this gene in this condition or valid parent conditions with a high quality',
      'RNA-Seq experiment count showing absence of expression of this gene in this condition or valid parent conditions with a low quality',
      'Including RNA-Seq observed data',
    ],
    data: [
      [
        'ENSDARG00000000002',
        'ccdc80',
        'UBERON:0000965',
        'lens of camera-type eye',
        'ZFS:0000033',
        'Hatching:Long-pec (Danio)',
        'present',
        'gold quality',
        '385',
        'yes',
        'no data',
        '0',
        '0',
        '0',
        '0',
        'no',
        'no data',
        '0',
        '0',
        'no',
        'no data',
        '0',
        '0',
        '0',
        '0',
        'no',
        'present',
        '2',
        '1',
        '0',
        '0',
        'yes',
      ],
      [
        'ENSDARG00000000175',
        'hoxb2a',
        'UBERON:0004734',
        'gastrula',
        'ZFS:0000017',
        'Gastrula:50%-epiboly (Danio)',
        'absent',
        'silver quality',
        '3.6e4',
        'yes',
        'no data',
        '0',
        '0',
        '0',
        '0',
        'no',
        'no data',
        '0',
        '0',
        'no',
        'absent',
        '0',
        '0',
        '0',
        '1',
        'no',
        'absent',
        '0',
        '0',
        '1',
        '0',
        'yes',
      ],
      [
        'ENSDARG00000000241',
        'slc40a1',
        'UBERON:0000922',
        'embryo',
        'ZFS:0000019',
        'Gastrula:Shield (Danio)',
        'present',
        'silver quality',
        '8.2e3',
        'yes',
        'present',
        '0',
        '1',
        '0',
        '0',
        'yes',
        'no data',
        '0',
        '0',
        'no',
        'no data',
        '0',
        '0',
        '0',
        '0',
        'no',
        'present',
        '0',
        '1',
        '0',
        '0',
        'yes',
      ],
    ],
  },

  {
    type: 'bold',
    id: 'single_expr_advanced_col1',
    content: 'Gene ID (column 1)',
  },
  { type: 'text', content: 'Unique identifier of gene from Ensembl.' },
  {
    type: 'rich_text',
    content: [
      { type: 'text', content: 'Please note that for ' },
      { type: 'italic', content: 'P. paniscus' },
      { type: 'text', content: ' (bonobo) we use ' },
      { type: 'italic', content: 'P. troglodytes' },
      { type: 'text', content: ' genome (chimpanzee), and that for ' },
      { type: 'italic', content: 'P. pygmaeus' },
      { type: 'text', content: ' (Bornean orangutan) we use ' },
      { type: 'italic', content: 'P. abelii' },
      {
        type: 'text',
        content:
          " genome (Sumatran orangutan). Only for those species (bonobo and Bornean orangutan), we modify the Ensembl gene IDs, to ensure that we provide unique gene identifiers over all species. It is therefore necessary, to obtain correct Ensembl gene IDs for those species, to replace gene ID prefix 'PPAG' with 'ENSPTRG', and 'PPYG' prefix with 'ENSPPYG'.",
      },
    ],
  },

  {
    type: 'bold',
    id: 'single_expr_advanced_col2',
    classNames: 'mt-2',
    content: 'Gene name (column 2)',
  },
  {
    type: 'rich_text',
    content: [
      { type: 'text', content: 'Name of the gene defined by ' },
      { type: 'code', content: 'Gene ID' },
      { type: 'text', content: ' (column 1)' },
    ],
  },

  {
    type: 'bold',
    id: 'single_expr_advanced_col3',
    classNames: 'mt-2',
    content: 'Anatomical entity ID (column 3)',
  },
  {
    type: 'text',
    content:
      'Unique identifier of the anatomical entity, from the Uberon ontology.',
  },

  {
    type: 'bold',
    id: 'single_expr_advanced_col4',
    classNames: 'mt-2',
    content: 'Anatomical entity name (column 4)',
  },
  {
    type: 'rich_text',
    content: [
      { type: 'text', content: 'Name of the anatomical entity defined by ' },
      { type: 'code', content: 'Anatomical entity ID' },
      { type: 'text', content: ' (column 3)' },
    ],
  },

  {
    type: 'bold',
    id: 'single_expr_advanced_col5',
    classNames: 'mt-2',
    content: 'Developmental stage ID (column 5)',
  },
  {
    type: 'text',
    content:
      'Unique identifier of the developmental stage, from the Uberon ontology.',
  },

  {
    type: 'bold',
    id: 'single_expr_advanced_col6',
    classNames: 'mt-2',
    content: 'Developmental stage name (column 6)',
  },
  {
    type: 'rich_text',
    content: [
      { type: 'text', content: 'Name of the developmental stage defined by ' },
      { type: 'code', content: 'Developmental stage ID' },
      { type: 'text', content: ' (column 5)' },
    ],
  },

  {
    type: 'bold',
    id: 'single_expr_advanced_col7',
    classNames: 'mt-2',
    content: 'Expression (column 7)',
  },
  {
    type: 'rich_text',
    content: [
      {
        type: 'text',
        content: 'Call generated from all data types for ',
      },
      { type: 'code', content: 'Gene ID' },
      { type: 'text', content: ' (column 1), in ' },
      { type: 'code', content: 'Anatomical entity ID' },
      { type: 'text', content: ' (column 3), at ' },
      { type: 'code', content: 'Developmental stage ID' },
      { type: 'text', content: ' (column 5).' },
    ],
  },
  { type: 'text', content: 'Permitted values:' },
  {
    type: 'unordered_list',
    children: [
      {
        type: 'rich_text',
        content: [
          {
            type: 'underline',
            content: 'present:',
          },
          {
            type: 'text',
            content:
              ' report of presence of expression, from Bgee statistical tests and/or from ',
          },
          {
            type: 'italic',
            content: 'in situ',
          },
          {
            type: 'text',
            content: ' data sources.',
          },
        ],
      },
      {
        type: 'rich_text',
        content: [
          {
            type: 'underline',
            content: 'past:',
          },
          {
            type: 'text',
            content:
              ' report of presence of expression, from Bgee statistical tests and/or from ',
          },
          {
            type: 'italic',
            content: 'in situ',
          },
          {
            type: 'text',
            content: ' data sources.',
          },
        ],
      },
    ],
  },
  {
    type: 'text',
    content:
      'In Bgee, calls of absence of expression are always discarded if there exists a contradicting call of expression, for the same gene, in the same anatomical entity and developmental stage, or in a child entity or child developmental stage.',
  },

  {
    type: 'bold',
    id: 'single_expr_advanced_col8',
    classNames: 'mt-2',
    content: 'Call quality (column 8)',
  },
  {
    type: 'text',
    content: 'Quality associated to the call. Permitted values:',
  },
  {
    type: 'unordered_list',
    children: [
      {
        type: 'rich_text',
        content: [
          {
            type: 'underline',
            content: 'high quality:',
          },
          {
            type: 'text',
            content:
              ': presence or absence of expression reported as high quality from Bgee statistical tests and/or from i',
          },
          {
            type: 'italic',
            content: 'in situ',
          },
          {
            type: 'text',
            content: ' data sources.',
          },
        ],
      },
      {
        type: 'rich_text',
        content: [
          {
            type: 'underline',
            content: 'low quality:',
          },
          {
            type: 'text',
            content:
              ': presence or absence of expression reported as high quality from Bgee statistical tests and/or from i',
          },
          {
            type: 'italic',
            content: 'in situ',
          },
          {
            type: 'text',
            content: ' data sources.',
          },
        ],
      },
    ],
  },
  {
    type: 'rich_text',
    content: [
      { type: 'text', content: 'From this quality a ' },
      { type: 'code', content: 'summary quality' },
      {
        type: 'text',
        content:
          ' is calculated using all calls corresponding to the same gene and condition parameters coming from different experiments and/or data types.',
      },
    ],
  },
  {
    type: 'rich_text',
    content: [
      {
        type: 'text',
        content: 'Quality associated to the call in column ',
      },
      { type: 'code', content: 'Expression' },
      { type: 'text', content: ' (column 7) is this ' },
      { type: 'code', content: 'summary quality' },
      { type: 'text', content: ' and is calculated using following rules:' },
    ],
  },
  {
    type: 'unordered_list',
    children: [
      {
        type: 'rich_text',
        content: [
          {
            type: 'underline',
            content: 'gold quality:',
          },
          {
            type: 'text',
            content: ' 2 or more high quality calls.',
          },
        ],
      },
      {
        type: 'rich_text',
        content: [
          {
            type: 'underline',
            content: 'silver quality:',
          },
          {
            type: 'text',
            content: ' 1 high quality call or 2 low quality calls',
          },
        ],
      },
      {
        type: 'rich_text',
        content: [
          {
            type: 'underline',
            content: 'bronze quality:',
          },
          {
            type: 'text',
            content:
              ' 1 low quality call (for internal use only. Not present in this file).',
          },
        ],
      },
    ],
  },

  {
    type: 'bold',
    id: 'single_expr_advanced_col9',
    classNames: 'mt-2',
    content: 'Expression rank (column 9)',
  },
  {
    type: 'text',
    content:
      'Rank score associated to the call. Rank scores of expression calls are normalized across genes, conditions and species.',
  },
  {
    type: 'text',
    content:
      'A low score means that the gene is highly expressed in the condition.',
  },

  {
    type: 'bold',
    id: 'single_expr_advanced_col10',
    classNames: 'mt-2',
    content: 'Including observed data (column 10)',
  },
  {
    type: 'rich_text',
    content: [
      { type: 'text', content: 'Permitted value: ' },
      { type: 'code', content: 'yes' },
    ],
  },
  {
    type: 'text',
    content:
      'Only calls which were actually seen in experimental data, at least once, are in this file.',
  },

  {
    type: 'bold',
    id: 'single_expr_advanced_col11',
    classNames: 'mt-2',
    content: 'Affymetrix data (column 11)',
  },
  {
    type: 'rich_text',
    content: [
      { type: 'text', content: 'Call generated by Affymetrix data for ' },
      { type: 'code', content: 'Gene ID' },
      { type: 'text', content: ' (column 1), in ' },
      { type: 'code', content: 'Anatomical entity ID' },
      { type: 'text', content: ' (column 3), at ' },
      { type: 'code', content: 'Developmental stage ID' },
      { type: 'text', content: ' (column 5)' },
    ],
  },
  { type: 'text', content: 'Permitted values:' },
  {
    type: 'unordered_list',
    children: [
      {
        type: 'rich_text',
        content: [
          { type: 'underline', content: 'present:' },
          {
            type: 'text',
            content:
              ' report of presence of expression from Bgee statistical tests. See ',
          },
          { type: 'code', content: 'Affymetrix call quality' },
          {
            type: 'text',
            content: ' (column 11) for associated quality level.',
          },
        ],
      },
      {
        type: 'rich_text',
        content: [
          { type: 'underline', content: 'absent: ' },
          {
            type: 'text',
            content:
              'report of absence of expression from Bgee statistical tests, with no contradicting call of presence of expression generated by other Affymetrix probesets or chips for the same gene, in the same anatomical entity and developmental stage, or in a child entity or child developmental stage.',
          },
        ],
      },
      {
        type: 'rich_text',
        content: [
          { type: 'underline', content: 'no data:' },
          {
            type: 'text',
            content:
              ' no Affymetrix data available for this gene/anatomical entity/developmental stage (data either not available, or discarded by Bgee quality controls).',
          },
        ],
      },
    ],
  },

  {
    type: 'bold',
    id: 'single_expr_advanced_col12',
    classNames: 'mt-2',
    content:
      'Affymetrix experiment count showing expression of this gene in this condition or in sub-conditions with a high quality (column 12)',
  },
  {
    type: 'bold',
    id: 'single_expr_advanced_col13',
    classNames: 'mt-2',
    content:
      'Affymetrix experiment count showing expression of this gene in this condition or in sub-conditions with a low quality (column 13)',
  },
  {
    type: 'bold',
    id: 'single_expr_advanced_col14',
    classNames: 'mt-2',
    content:
      'Affymetrix experiment count showing absence of expression of this gene in this condition or valid parent conditions with a high quality (column 14)',
  },
  {
    type: 'bold',
    id: 'single_expr_advanced_col15',
    classNames: 'mt-2',
    content:
      'Affymetrix experiment count showing absence of expression of this gene in this condition or valid parent conditions with a low quality (column 15)',
  },

  {
    type: 'bold',
    id: 'single_expr_advanced_col16',
    classNames: 'mt-2',
    content: 'Including Affymetrix observed data (column 16)',
  },
  {
    type: 'rich_text',
    content: [
      { type: 'text', content: 'Permitted values: ' },
      { type: 'code', content: 'yes' },
      { type: 'text', content: ' and ' },
      { type: 'code', content: 'no' },
      { type: 'text', content: '.' },
    ],
  },
  {
    type: 'text',
    content:
      'Defines whether this call was generated from propagation only, or whether this call was actually seen in experimental data in this anatomical entity/developmental stage condition.',
  },
  {
    type: 'text',
    content:
      'In this column, the information is provided by solely considering Affymetrix data.',
  },

  {
    type: 'bold',
    id: 'single_expr_advanced_col17',
    classNames: 'mt-2',
    content: 'EST data (column 17)',
  },
  {
    type: 'rich_text',
    content: [
      { type: 'text', content: 'Call generated by EST data for ' },
      { type: 'code', content: 'Gene ID' },
      { type: 'text', content: ' (column 1), in ' },
      { type: 'code', content: 'Anatomical entity ID' },
      { type: 'text', content: ' (column 3), at ' },
      { type: 'code', content: 'Developmental stage ID' },
      {
        type: 'text',
        content:
          '(column 5). Note that EST data are not used to produce calls of absence of expression.',
      },
    ],
  },
  { type: 'text', content: 'Permitted values:' },
  {
    type: 'unordered_list',
    children: [
      {
        type: 'rich_text',
        content: [
          { type: 'underline', content: 'present: ' },
          {
            type: 'text',
            content: 'expression reported from Bgee statistical tests.',
          },
        ],
      },
      {
        type: 'rich_text',
        content: [
          { type: 'underline', content: 'no data: ' },
          {
            type: 'text',
            content:
              'no EST data available for this gene/anatomical entity/developmental stage (data either not available, or discarded by Bgee quality controls).',
          },
        ],
      },
    ],
  },

  {
    type: 'bold',
    id: 'single_expr_advanced_col18',
    classNames: 'mt-2',
    content:
      'EST experiment count showing expression of this gene in this condition or in sub-conditions with a high quality (column 18)',
  },
  {
    type: 'bold',
    id: 'single_expr_advanced_col19',
    classNames: 'mt-2',
    content:
      'EST experiment count showing expression of this gene in this condition or in sub-conditions with a low quality (column 19)',
  },

  {
    type: 'bold',
    id: 'single_expr_advanced_col20',
    classNames: 'mt-2',
    content: 'Including EST observed data (column 20)',
  },
  {
    type: 'rich_text',
    content: [
      { type: 'text', content: 'Permitted values: ' },
      { type: 'code', content: 'yes' },
      { type: 'text', content: ' and ' },
      { type: 'code', content: 'no' },
      { type: 'text', content: '.' },
    ],
  },
  {
    type: 'text',
    content:
      'Defines whether this call was generated from propagation only, or whether this call was actually seen in experimental data in this anatomical entity/developmental stage condition.',
  },
  {
    type: 'text',
    content:
      'In this column, the information is provided by solely considering EST data.',
  },

  {
    type: 'bold',
    id: 'single_expr_advanced_col21',
    classNames: 'mt-2',
    content: 'In situ data (column 21)',
  },
  {
    type: 'rich_text',
    content: [
      { type: 'text', content: 'Call generated by ' },
      { type: 'italic', content: 'in situ' },
      { type: 'text', content: ' data for ' },
      { type: 'code', content: 'Gene ID' },
      { type: 'text', content: ' (column 1), in ' },
      { type: 'code', content: 'Anatomical entity ID' },
      { type: 'text', content: ' (column 3), at ' },
      { type: 'code', content: 'Developmental stage ID' },
      {
        type: 'text',
        content: '(column 5).',
      },
    ],
  },
  { type: 'text', content: 'Permitted values:' },
  {
    type: 'unordered_list',
    children: [
      {
        type: 'rich_text',
        content: [
          { type: 'underline', content: 'present: ' },
          {
            type: 'text',
            content: ' report of presence of expression from ',
          },
          {
            type: 'italic',
            content: 'in situ.',
          },
          {
            type: 'text',
            content: ' data sources.',
          },
        ],
      },
      {
        type: 'rich_text',
        content: [
          { type: 'underline', content: 'absent: ' },
          {
            type: 'text',
            content: ' report of absence of expression from ',
          },
          {
            type: 'italic',
            content: 'in situ.',
          },
          {
            type: 'text',
            content:
              ' data sources, with no contradicting call of presence of expression generated by other ',
          },
          {
            type: 'italic',
            content: 'in situ.',
          },
          {
            type: 'text',
            content:
              ' hybridization evidence lines for the same gene, in the same anatomical entity and developmental stage, or in a child entity or child developmental stage.',
          },
        ],
      },
      {
        type: 'rich_text',
        content: [
          { type: 'underline', content: 'no data:' },
          {
            type: 'text',
            content: ' no ',
          },
          {
            type: 'italic',
            content: 'in situ.',
          },
          {
            type: 'text',
            content:
              ' data available for this gene/anatomical entity/developmental stage (data either not available, or discarded by Bgee quality controls).',
          },
        ],
      },
    ],
  },

  {
    type: 'bold',
    id: 'single_expr_advanced_col22',
    classNames: 'mt-2',
    content:
      'In situ hybridization experiment count showing expression of this gene in this condition or in sub-conditions with a high quality (column 22)',
  },
  {
    type: 'bold',
    id: 'single_expr_advanced_col23',
    classNames: 'mt-2',
    content:
      'In situ hybridization experiment count showing expression of this gene in this condition or in sub-conditions with a low quality (column 23)',
  },
  {
    type: 'bold',
    id: 'single_expr_advanced_col24',
    classNames: 'mt-2',
    content:
      'In situ hybridization experiment count showing absence of expression of this gene in this condition or valid parent conditions with a high quality (column 24)',
  },
  {
    type: 'bold',
    id: 'single_expr_advanced_col25',
    classNames: 'mt-2',
    content:
      'In situ hybridization experiment count showing absence of expression of this gene in this condition or valid parent conditions with a low quality (column 25)',
  },

  {
    type: 'bold',
    id: 'single_expr_advanced_col26',
    classNames: 'mt-2',
    content: 'Including in situ observed data (column 26)',
  },
  {
    type: 'rich_text',
    content: [
      { type: 'text', content: 'Permitted values: ' },
      { type: 'code', content: 'yes' },
      { type: 'text', content: ' and ' },
      { type: 'code', content: 'no' },
      { type: 'text', content: '.' },
    ],
  },
  {
    type: 'text',
    content:
      'Defines whether this call was generated from propagation only, or whether this call was actually seen in experimental data in this anatomical entity/developmental stage condition.',
  },
  {
    type: 'rich_text',
    content: [
      {
        type: 'text',
        content:
          'In this column, the information is provided by solely considering ',
      },
      { type: 'italic', content: 'in situ' },
      { type: 'text', content: ' data.' },
    ],
  },

  {
    type: 'bold',
    id: 'single_expr_advanced_col27',
    classNames: 'mt-2',
    content: 'RNA-Seq data (column 27)',
  },
  {
    type: 'rich_text',
    content: [
      { type: 'text', content: 'Call generated by RNA-Seq data for ' },
      { type: 'code', content: 'Gene ID' },
      { type: 'text', content: ' (column 1), in ' },
      { type: 'code', content: 'Anatomical entity ID' },
      { type: 'text', content: ' (column 3), at ' },
      { type: 'code', content: 'Developmental stage ID' },
      { type: 'text', content: ' (column 5).' },
    ],
  },
  { type: 'text', content: 'Permitted values:' },
  {
    type: 'unordered_list',
    children: [
      {
        type: 'rich_text',
        content: [
          { type: 'underline', content: 'present:' },
          {
            type: 'text',
            content:
              ' report of presence of expression from Bgee statistical tests. See ',
          },
          { type: 'code', content: 'RNA-Seq call quality' },
          {
            type: 'text',
            content: ' (column 20) for associated quality level.',
          },
        ],
      },
      {
        type: 'rich_text',
        content: [
          { type: 'underline', content: 'absent:' },
          {
            type: 'text',
            content:
              ' report of absence of expression from Bgee statistical tests, with no contradicting call of presence of expression generated by other RNA-Seq libraries for the same gene, in the same anatomical entity and developmental stage, or in a child entity or child developmental stage.',
          },
          {
            type: 'text',
            content:
              ' report of absence of expression from Bgee statistical tests, with no contradicting call of presence of expression generated by other RNA-Seq libraries for the same gene, in the same anatomical entity and developmental stage, or in a child entity or child developmental stage.',
          },
        ],
      },
      {
        type: 'rich_text',
        content: [
          { type: 'underline', content: 'no data:' },
          {
            type: 'text',
            content:
              ' no RNA-Seq data available for this gene/anatomical entity/developmental stage (data either not available, or discarded by Bgee quality controls).',
          },
        ],
      },
    ],
  },

  {
    type: 'bold',
    id: 'single_expr_advanced_col28',
    classNames: 'mt-2',
    content:
      'RNA-Seq experiment count showing expression of this gene in this condition or in sub-conditions with a high quality (column 28)',
  },
  {
    type: 'bold',
    id: 'single_expr_advanced_col29',
    classNames: 'mt-2',
    content:
      'RNA-Seq experiment count showing expression of this gene in this condition or in sub-conditions with a low quality (column 29)',
  },
  {
    type: 'bold',
    id: 'single_expr_advanced_col30',
    classNames: 'mt-2',
    content:
      'RNA-Seq experiment count showing absence of expression of this gene in this condition or valid parent conditions with a high quality (column 30)',
  },
  {
    type: 'bold',
    id: 'single_expr_advanced_col31',
    classNames: 'mt-2',
    content:
      'RNA-Seq experiment count showing absence of expression of this gene in this condition or valid parent conditions with a low quality (column 31)',
  },

  {
    type: 'bold',
    id: 'single_expr_advanced_col32',
    classNames: 'mt-2',
    content: 'Including RNA-Seq observed data (column 32)',
  },
  {
    type: 'rich_text',
    content: [
      { type: 'text', content: 'Permitted values: ' },
      { type: 'code', content: 'yes' },
      { type: 'text', content: ' and ' },
      { type: 'code', content: 'no' },
      { type: 'text', content: '.' },
    ],
  },
  {
    type: 'text',
    content:
      'Defines whether this call was generated from propagation only, or whether this call was actually seen in experimental data in this anatomical entity/developmental stage condition.',
  },
  {
    type: 'text',
    content:
      'In this column, the information is provided by solely considering RNA-Seq data.',
  },
];
const singleExpr = [
  {
    type: 'sub_title',
    classNames: 'mb-2 mt-5',
    content: 'Presence/absence of expression',
    id: LINK_ANCHOR.GENE_EXPRESSION_CALLS.SINGLE_EXPR_ID,
  },
  {
    type: 'rich_text',
    content: [
      {
        type: 'text',
        content:
          'Bgee provides calls of presence/absence of expression. Each call corresponds to a unique combination of a gene, an anatomical entity, and a life stage, with reported presence or absence of expression. Life stages describe development and aging. Only "normal" expression is considered in Bgee (i.e., no treatment, no disease, no gene knock-out, etc.). Bgee collects data from different types, from different studies, in different organisms, and provides a summary from all these data as unique calls ',
      },
      {
        type: 'code',
        content: 'gene - anatomical entity - developmental stage',
      },
      {
        type: 'text',
        content:
          ', with confidence information, notably taking into account potential conflicts.',
      },
    ],
  },
  {
    type: 'rich_text',
    content: [
      {
        type: 'text',
        content:
          'Calls of presence/absence of expression are very similar to the data that can be reported using ',
      },
      { type: 'italic', content: 'in situ' },
      {
        type: 'text',
        content:
          ' hybridization methods; Bgee applies dedicated statistical analyses to generate such calls from EST, Affymetrix, and RNA-Seq data, with confidence information, and also collects ',
      },
      { type: 'italic', content: 'in situ' },
      {
        type: 'text',
        content:
          ' hybridization calls from model organism databases. This offers the possibility to aggregate and compare these calls of presence/absence of expression between different experiments, different data types, and different species, and to benefit from both the high anatomy coverage provided by low-throughput methods, and the high genomic coverage provided by high-throughput methods.',
      },
    ],
  },
  {
    type: 'text',
    content:
      'After presence/absence calls are generated from the raw data, they are propagated using anatomical and life stage ontologies:',
  },
  {
    type: 'unordered_list',
    children: [
      {
        type: 'rich_text',
        content: [
          { type: 'underline', content: 'calls of expression' },
          {
            type: 'text',
            content:
              ' are propagated to parent anatomical entities and parent developmental stages. For instance, if gene A is expressed in midbrain at young adult stage, it will also be considered as expressed in brain at adult stage.',
          },
        ],
      },
      {
        type: 'rich_text',
        content: [
          { type: 'underline', content: 'calls of absence of expression' },
          {
            type: 'text',
            content:
              ' are propagated to child anatomical entities (and not to child developmental stages). For instance, if gene A is reported as not expressed in the brain at young adult stage, it will also be considered as not expressed in the midbrain at young adult stage. This is only permitted when it does not generate any contradiction with expression calls from the same data type (for instance, no contradiction permitted of reported absence of expression by RNA-Seq, with report of expression by RNA-Seq for the same gene, in the same anatomical entity and developmental stage, or any child anatomical entity or child developmental stage).',
          },
        ],
      },
    ],
  },
  {
    type: 'text',
    content:
      'Call propagation allows a complete integration of the data, even if provided at different anatomical or developmental levels. For instance: if gene A is reported to be expressed in the midbrain dura mater at young adult stage; gene B is reported to be expressed in the midbrain pia mater at late adult stage; and gene C has an absence of expression reported in the brain at adult stage; it is then possible to retrieve that, in the midbrain at adult stage, gene A and B are both expressed, while gene C is not, thanks to call propagation.',
  },
  {
    type: 'rich_text',
    content: [
      {
        type: 'text',
        content: 'It is possible to select two different combinations of ',
      },
      { type: 'code', content: 'condition parameters' },
      { type: 'text', content: ':' },
    ],
  },
  {
    type: 'unordered_list',
    children: [
      {
        type: 'rich_text',
        content: [
          {
            type: 'underline',
            content: 'anatomical entities only (by default)',
          },
          {
            type: 'text',
            content:
              ' files contain one expression call for each unique pair of gene and anatomical entity.If more than one developmental stage map this unique pair, the resulting expression call correspond to summarized information coming from all developmental stages.',
          },
        ],
      },
      {
        type: 'rich_text',
        content: [
          {
            type: 'underline',
            content: 'anatomical entities and developmental stages',
          },
          {
            type: 'text',
            content:
              ' files contain one expression call for each unique gene, anatomical entity and developmental stage.',
          },
        ],
      },
    ],
  },
  {
    type: 'rich_text',
    content: [
      {
        type: 'text',
        content:
          'Presence/absence calls are then filtered and presented differently depending on whether a ',
      },
      { type: 'code', content: 'simple file' },
      { type: 'text', content: ', or an ' },
      { type: 'code', content: 'advanced file' },
      { type: 'text', content: ' is used. Notably: ' },
      { type: 'code', content: 'simple files' },
      {
        type: 'text',
        content:
          ' aim at providing summarized information over all data types, and only in anatomical entities and developmental stages actually used in experimental data;',
      },
      { type: 'code', content: 'advanced files' },
      {
        type: 'text',
        content:
          ' aim at reporting all information, allowing for instance to retrieve the contribution of each data type to a call, in all possible anatomical entities and developmental stages.',
      },
    ],
  },
  {
    type: 'text',
    content: 'Jump to format description for:',
  },
  {
    type: 'unordered_list',
    children: [
      {
        type: 'link_anchor',
        selector: LINK_ANCHOR.GENE_EXPRESSION_CALLS.SINGLE_EXPR_SIMPLE_ID,
        text: 'simple file',
      },
      {
        type: 'link_anchor',
        selector: LINK_ANCHOR.GENE_EXPRESSION_CALLS.SINGLE_EXPR_ADVANCED_ID,
        text: 'advanced file',
      },
    ],
  },
  ...singleExprSimple,
  ...singleExprAdvanced,
  {
    type: 'link_anchor',
    id: LINK_ANCHOR.GENE_EXPRESSION_CALLS.SINGLE_EXPR_ID,
    text: 'Back to presence/absence of expression menu',
  },
  {
    type: 'text',
    content:
      'This corresponds to the same expression state summary column as in simple files (column 7 of presence/absence simple file).',
  },
];

const singleDiffSimple = [
  {
    type: 'text',
    classNames: 'has-text-weight-semibold is-size-6 has-text-primary',
    content: 'Simple file',
    id: LINK_ANCHOR.GENE_EXPRESSION_CALLS.SINGLE_DIFF_SIMPLE_ID,
  },
  {
    type: 'text',
    content:
      'In simple files, only calls of over-expression and under-expression are provided, summarizing the contribution of each data type to the call.',
  },
  {
    type: 'table',
    title:
      'Format description for single species simple differential expression file',
    classNames: 'is-narrow',
    columns: ['Column', 'Content', 'Example'],
    data: [
      [
        '1',
        [
          {
            type: 'rich_text',
            content: [
              {
                type: 'link_anchor',
                selector: 'single_diff_simple_col1',
                text: 'Gene ID',
              },
            ],
          },
        ],
        'ENSG00000000419',
      ],
      [
        '2',
        [
          {
            type: 'rich_text',
            content: [
              {
                type: 'link_anchor',
                selector: 'single_diff_simple_col2',
                text: 'Gene name',
              },
            ],
          },
        ],
        'DPM1',
      ],
      [
        '3',
        [
          {
            type: 'rich_text',
            content: [
              {
                type: 'link_anchor',
                selector: 'single_diff_simple_col3',
                text: 'Anatomical entity ID',
              },
            ],
          },
        ],
        'UBERON:0009834',
      ],
      [
        '4',
        [
          {
            type: 'rich_text',
            content: [
              {
                type: 'link_anchor',
                selector: 'single_diff_simple_col4',
                text: 'Anatomical entity name',
              },
            ],
          },
        ],
        'dorsolateral prefrontal cortex',
      ],
      [
        '5',
        [
          {
            type: 'rich_text',
            content: [
              {
                type: 'link_anchor',
                selector: 'single_diff_simple_col5',
                text: 'Developmental stage ID',
              },
            ],
          },
        ],
        'HsapDv:0000083',
      ],
      [
        '6',
        [
          {
            type: 'rich_text',
            content: [
              {
                type: 'link_anchor',
                selector: 'single_diff_simple_col6',
                text: 'Developmental stage name',
              },
            ],
          },
        ],
        'infant stage (human)',
      ],
      [
        '7',
        [
          {
            type: 'rich_text',
            content: [
              {
                type: 'link_anchor',
                selector: 'single_diff_simple_col7',
                text: 'Differential expression',
              },
            ],
          },
        ],
        'under-expression',
      ],
      [
        '8',
        [
          {
            type: 'rich_text',
            content: [
              {
                type: 'link_anchor',
                selector: 'single_diff_simple_col8',
                text: 'Call quality',
              },
            ],
          },
        ],
        'high quality',
      ],
    ],
  },
  {
    type: 'table',
    title:
      'Example lines for single species simple differential expression file',
    classNames: 'small-font is-striped',
    scrollable: true,
    columns: [
      'Gene ID',
      'Gene name',
      'Anatomical entity ID',
      'Anatomical entity name',
      'Developmental stage ID',
      'Developmental stage name',
      'Differential expression',
      'Call quality',
    ],
    data: [
      [
        'ENSG00000000003',
        'TSPAN6',
        'UBERON:0000922',
        'embryo',
        'HsapDv:0000017',
        'Carnegie stage 10 (human)',
        'over-expression',
        'low quality',
      ],
      [
        'ENSG00000000419',
        'DPM1',
        'UBERON:0000922',
        'embryo',
        'HsapDv:0000020',
        'Carnegie stage 13 (human)',
        'under-expression',
        'low quality',
      ],
      [
        'ENSG00000000457',
        'SCYL3',
        'UBERON:0000178',
        'blood',
        'HsapDv:0000094',
        '65-79 year-old human stage (human)',
        'over-expression',
        'low quality',
      ],
    ],
  },

  {
    type: 'bold',
    id: `${LINK_ANCHOR.GENE_EXPRESSION_CALLS.SINGLE_DIFF_SIMPLE_ID}_col1`,
    classNames: 'mt-2',
    content: 'Gene ID (column 1)',
  },
  {
    type: 'text',
    content: 'Unique identifier of gene from Ensembl.',
  },
  {
    type: 'rich_text',
    content: [
      {
        type: 'text',
        content: 'Please note that for ',
      },
      {
        type: 'italic',
        content: 'P. paniscus',
      },
      {
        type: 'text',
        content: ' (bonobo) we use ',
      },
      {
        type: 'italic',
        content: 'P. troglodytes',
      },
      {
        type: 'text',
        content: ' genome (chimpanzee), and that for ',
      },
      {
        type: 'italic',
        content: 'P. pygmaeus',
      },
      {
        type: 'text',
        content: ' (Bornean orangutan) we use ',
      },
      {
        type: 'italic',
        content: 'P. abelii',
      },
      {
        type: 'text',
        content:
          " genome (Sumatran orangutan). Only for those species (bonobo and Bornean orangutan), we modify the Ensembl gene IDs, to ensure that we provide unique gene identifiers over all species. It is therefore necessary, to obtain correct Ensembl gene IDs for those species, to replace gene ID prefix 'PPAG' with 'ENSPTRG', and 'PPYG' prefix with 'ENSPPYG'.",
      },
    ],
  },

  {
    type: 'bold',
    id: `${LINK_ANCHOR.GENE_EXPRESSION_CALLS.SINGLE_DIFF_SIMPLE_ID}_col2`,
    classNames: 'mt-2',
    content: 'Gene name (column 2)',
  },
  {
    type: 'rich_text',
    content: [
      {
        type: 'text',
        content: 'Name of the gene defined by ',
      },

      {
        type: 'code',
        content: 'Gene ID',
      },

      {
        type: 'text',
        content: ' (column 1)',
      },
    ],
  },

  {
    type: 'bold',
    id: `${LINK_ANCHOR.GENE_EXPRESSION_CALLS.SINGLE_DIFF_SIMPLE_ID}_col3`,
    classNames: 'mt-2',
    content: 'Anatomical entity ID (column 3)',
  },
  {
    type: 'text',
    content:
      'Unique identifier of the anatomical entity, from the Uberon ontology.',
  },

  {
    type: 'bold',
    id: `${LINK_ANCHOR.GENE_EXPRESSION_CALLS.SINGLE_DIFF_SIMPLE_ID}_col4`,
    classNames: 'mt-2',
    content: 'Anatomical entity name (column 4)',
  },
  {
    type: 'rich_text',
    content: [
      {
        type: 'text',
        content: 'Name of the anatomical entity defined by ',
      },

      {
        type: 'code',
        content: 'Anatomical entity ID',
      },

      {
        type: 'text',
        content: ' (column 4)',
      },
    ],
  },

  {
    type: 'bold',
    id: `${LINK_ANCHOR.GENE_EXPRESSION_CALLS.SINGLE_DIFF_SIMPLE_ID}_col5`,
    classNames: 'mt-2',
    content: 'Developmental stage ID (column 5)',
  },
  {
    type: 'text',
    content:
      'Unique identifier of the developmental stage, from the Uberon ontology.',
  },

  {
    type: 'bold',
    id: `${LINK_ANCHOR.GENE_EXPRESSION_CALLS.SINGLE_DIFF_SIMPLE_ID}_col6`,
    classNames: 'mt-2',
    content: 'Developmental stage name (column 6)',
  },
  {
    type: 'rich_text',
    content: [
      {
        type: 'text',
        content: 'Name of the developmental stage defined by ',
      },

      {
        type: 'code',
        content: 'Developmental stage ID',
      },

      {
        type: 'text',
        content: ' (column 5)',
      },
    ],
  },

  {
    type: 'bold',
    id: `${LINK_ANCHOR.GENE_EXPRESSION_CALLS.SINGLE_DIFF_SIMPLE_ID}_col7`,
    classNames: 'mt-2',
    content: 'Differential expression (column 7)',
  },
  {
    type: 'rich_text',
    content: [
      {
        type: 'text',
        content: 'Call generated from all data types for ',
      },
      {
        type: 'italic',
        content: 'Gene ID',
      },
      {
        type: 'text',
        content: ' (column 1), in ',
      },
      {
        type: 'italic',
        content: 'Anatomical entity ID',
      },
      {
        type: 'text',
        content: ' (column 3), at ',
      },
      {
        type: 'italic',
        content: 'Developmental stage ID',
      },
      {
        type: 'text',
        content: ' (column 5)',
      },
    ],
  },
  {
    type: 'text',
    content: 'Permitted values:',
  },
  {
    type: 'unordered_list',
    children: [
      {
        type: 'rich_text',
        content: [
          {
            type: 'underline',
            content: 'over-expression',
          },
          {
            type: 'text',
            content:
              ': the gene was shown in one or more analyses to have a significant over-expression in this condition, as compared to the expression levels in other conditions of the analyses.',
          },
        ],
      },
      {
        type: 'rich_text',
        content: [
          {
            type: 'underline',
            content: 'under-expressio',
          },
          {
            type: 'text',
            content:
              ': the gene was shown in one or more analyses to have a significant under-expression in this condition, as compared to the expression levels in other conditions of the analyses.',
          },
        ],
      },
      {
        type: 'rich_text',
        content: [
          {
            type: 'underline',
            content: 'weak ambiguity',
          },
          {
            type: 'text',
            content:
              ': there exists a call of over-expression or under-expression generated from a data type, but another data type showed no significant variation of the level of expression of this gene in the same condition; or, a gene was shown to be never expressed in a condition by some analyses of a given data type, but other analyses of different data types produced a call of over-expression or of absence of differential expression for the same gene, in the same condition (note that conflicts where a data type produced an under-expression call in a condition, while another data type showed the same gene to be never expressed in that condition, do not produce a ',
          },
          {
            type: 'code',
            content: 'weak ambiguity',
          },
          {
            type: 'text',
            content: ' call, but a call of ',
          },
          {
            type: 'code',
            content: 'under-expression low quality',
          },
          {
            type: 'text',
            content: ').',
          },
        ],
      },
      {
        type: 'rich_text',
        content: [
          {
            type: 'underline',
            content: 'strong ambiguity',
          },
          {
            type: 'text',
            content:
              ': there exists a call of over-expression or under-expression generated from a data type, but there exists a call in the opposite direction generated from another data type for the same gene, anatomical entity and developmental stage. For instance, gene A is reported to be over-expressed in the midbrain at young adult stage from Affymetrix data, but is reported to be under-expressed in the midbrain at young adult stage from RNA-Seq data.',
          },
        ],
      },
    ],
  },

  {
    type: 'bold',
    id: `${LINK_ANCHOR.GENE_EXPRESSION_CALLS.SINGLE_DIFF_SIMPLE_ID}_col8`,
    classNames: 'mt-2',
    content: 'Call quality (column 8)',
  },
  {
    type: 'rich_text',
    content: [
      {
        type: 'text',
        content: 'Confidence in the differential expression call provided in ',
      },

      {
        type: 'italic',
        content: 'Differential expression',
      },

      {
        type: 'text',
        content: ' (column 7).',
      },
    ],
  },
  {
    type: 'text',
    content: 'Permitted values:',
  },
  {
    type: 'unordered_list',
    children: [
      {
        type: 'rich_text',
        content: [
          {
            type: 'underline',
            content: 'high quality',
          },
          {
            type: 'text',
            content:
              ': differential expression reported as high quality, with no contradicting call from same type of analysis (across anatomy/across life stages), for same gene, in same anatomical entity and developmental stage, (call generated either from multiple congruent analyses, or from a single analysis).',
          },
        ],
      },
      {
        type: 'rich_text',
        content: [
          {
            type: 'underline',
            content: 'poor quality',
          },
          {
            type: 'text',
            content:
              ': differential expression reported as low quality, or there exists a conflict for the same gene, anatomical entity and developmental stage, from different analyses of a same data type (conflicts between different data types are treated differently). For instance, an analysis showed a gene to be over-expressed in a condition, while another analysis showed the same gene to be under-expressed or not differentially expressed in the same condition. Such conflicts are resolved by a voting system based on the number of conditions compared, weighted by p-value. Note that in one case, this quality level is used to reconcile conflicting calls from different data types: when a data type produced an under-expression call, while a different data type has shown that the same gene was never seen as expressed in the same condition. In that case, the overall summary is ',
          },
          {
            type: 'code',
            content: 'under-expression low quality',
          },
          {
            type: 'underline',
            content: '.',
          },
        ],
      },
      {
        type: 'rich_text',
        content: [
          {
            type: 'underline',
            content: 'NA',
          },
          {
            type: 'text',
            content: ': no quality applicable when ambiguity state in ',
          },
          {
            type: 'code',
            content: 'Differential expression',
          },
          {
            type: 'text',
            content: ' (column 7).',
          },
        ],
      },
    ],
  },

  {
    type: 'link_anchor',
    selector: LINK_ANCHOR.GENE_EXPRESSION_CALLS.SINGLE_DIFF_ID,
    text: 'Back to over-/under-expression menu',
  },
];
const singleDiffComplete = [
  {
    type: 'text',
    classNames: 'has-text-weight-semibold is-size-6 has-text-primary',
    content: 'Complete file',
    id: LINK_ANCHOR.GENE_EXPRESSION_CALLS.SINGLE_DIFF_COMPLETE_ID,
  },
  {
    type: 'text',
    content:
      'The differences between simple and complete files are that, in complete files:',
  },
  {
    type: 'unordered_list',
    children: [
      {
        type: 'text',
        content:
          'details of the contribution of each data type to the final calls are provided, notably with information about best p-values, or number of supporting/conflicting analyses.',
      },
      {
        type: 'text',
        content:
          'calls representing absence of differential expression are provided, allowing to determine all genes and conditions tested for differential expression.',
      },
    ],
  },

  {
    type: 'table',
    title:
      'Format description for single species complete differential expression file',
    classNames: 'is-narrow',
    columns: ['Column', 'Content', 'Example'],
    data: [
      [
        '1',
        [
          {
            type: 'rich_text',
            content: [
              {
                type: 'link_anchor',
                selector: `${LINK_ANCHOR.GENE_EXPRESSION_CALLS.SINGLE_DIFF_COMPLETE_ID}_col1`,
                text: 'Gene ID',
              },
            ],
          },
        ],
        'ENSMUSG00000093930',
      ],
      [
        '2',
        [
          {
            type: 'rich_text',
            content: [
              {
                type: 'link_anchor',
                selector: `${LINK_ANCHOR.GENE_EXPRESSION_CALLS.SINGLE_DIFF_COMPLETE_ID}_col2`,
                text: 'Gene name',
              },
            ],
          },
        ],
        'Hmgcs1',
      ],
      [
        '3',
        [
          {
            type: 'rich_text',
            content: [
              {
                type: 'link_anchor',
                selector: `${LINK_ANCHOR.GENE_EXPRESSION_CALLS.SINGLE_DIFF_COMPLETE_ID}_col3`,
                text: 'Anatomical entity ID',
              },
            ],
          },
        ],
        'UBERON:0002107',
      ],
      [
        '4',
        [
          {
            type: 'rich_text',
            content: [
              {
                type: 'link_anchor',
                selector: `${LINK_ANCHOR.GENE_EXPRESSION_CALLS.SINGLE_DIFF_COMPLETE_ID}_col4`,
                text: 'Anatomical entity name',
              },
            ],
          },
        ],
        'liver',
      ],
      [
        '5',
        [
          {
            type: 'rich_text',
            content: [
              {
                type: 'link_anchor',
                selector: `${LINK_ANCHOR.GENE_EXPRESSION_CALLS.SINGLE_DIFF_COMPLETE_ID}_col5`,
                text: 'Developmental stage ID',
              },
            ],
          },
        ],
        'UBERON:0000113',
      ],
      [
        '6',
        [
          {
            type: 'rich_text',
            content: [
              {
                type: 'link_anchor',
                selector: `${LINK_ANCHOR.GENE_EXPRESSION_CALLS.SINGLE_DIFF_COMPLETE_ID}_col6`,
                text: 'Developmental stage name',
              },
            ],
          },
        ],
        'post-juvenile adult stage',
      ],
      [
        '7',
        [
          {
            type: 'rich_text',
            content: [
              {
                type: 'link_anchor',
                selector: `${LINK_ANCHOR.GENE_EXPRESSION_CALLS.SINGLE_DIFF_COMPLETE_ID}_col7`,
                text: 'Differential expression',
              },
            ],
          },
        ],
        'over-expression',
      ],
      [
        '8',
        [
          {
            type: 'rich_text',
            content: [
              {
                type: 'link_anchor',
                selector: `${LINK_ANCHOR.GENE_EXPRESSION_CALLS.SINGLE_DIFF_COMPLETE_ID}_col8`,
                text: 'Call quality',
              },
            ],
          },
        ],
        'high quality',
      ],
      [
        '9',
        [
          {
            type: 'rich_text',
            content: [
              {
                type: 'link_anchor',
                selector: `${LINK_ANCHOR.GENE_EXPRESSION_CALLS.SINGLE_DIFF_COMPLETE_ID}_col9`,
                text: 'Affymetrix data',
              },
            ],
          },
        ],
        'over-expression',
      ],
      [
        '10',
        [
          {
            type: 'rich_text',
            content: [
              {
                type: 'link_anchor',
                selector: `${LINK_ANCHOR.GENE_EXPRESSION_CALLS.SINGLE_DIFF_COMPLETE_ID}_col10`,
                text: 'Affymetrix call quality',
              },
            ],
          },
        ],
        'poor quality',
      ],
      [
        '11',
        [
          {
            type: 'rich_text',
            content: [
              {
                type: 'link_anchor',
                selector: `${LINK_ANCHOR.GENE_EXPRESSION_CALLS.SINGLE_DIFF_COMPLETE_ID}_col11`,
                text: 'Affymetrix best supporting p-value',
              },
            ],
          },
        ],
        '0.0035659347',
      ],
      [
        '12',
        [
          {
            type: 'rich_text',
            content: [
              {
                type: 'link_anchor',
                selector: `${LINK_ANCHOR.GENE_EXPRESSION_CALLS.SINGLE_DIFF_COMPLETE_ID}_col12`,
                text: 'Affymetrix analysis count supporting Affymetrix call',
              },
            ],
          },
        ],
        '1',
      ],
      [
        '13',
        [
          {
            type: 'rich_text',
            content: [
              {
                type: 'link_anchor',
                selector: `${LINK_ANCHOR.GENE_EXPRESSION_CALLS.SINGLE_DIFF_COMPLETE_ID}_col13`,
                text: 'Affymetrix analysis count in conflict with Affymetrix call',
              },
            ],
          },
        ],
        '1',
      ],
      [
        '14',
        [
          {
            type: 'rich_text',
            content: [
              {
                type: 'link_anchor',
                selector: `${LINK_ANCHOR.GENE_EXPRESSION_CALLS.SINGLE_DIFF_COMPLETE_ID}_col14`,
                text: 'RNA-Seq data',
              },
            ],
          },
        ],
        'over-expression',
      ],
      [
        '15',
        [
          {
            type: 'rich_text',
            content: [
              {
                type: 'link_anchor',
                selector: `${LINK_ANCHOR.GENE_EXPRESSION_CALLS.SINGLE_DIFF_COMPLETE_ID}_col15`,
                text: 'RNA-Seq call quality',
              },
            ],
          },
        ],
        'high quality',
      ],
      [
        '16',
        [
          {
            type: 'rich_text',
            content: [
              {
                type: 'link_anchor',
                selector: `${LINK_ANCHOR.GENE_EXPRESSION_CALLS.SINGLE_DIFF_COMPLETE_ID}_col16`,
                text: 'RNA-Seq best supporting p-value',
              },
            ],
          },
        ],
        '2.96E-8',
      ],
      [
        '17',
        [
          {
            type: 'rich_text',
            content: [
              {
                type: 'link_anchor',
                selector: `${LINK_ANCHOR.GENE_EXPRESSION_CALLS.SINGLE_DIFF_COMPLETE_ID}_col17`,
                text: 'RNA-Seq analysis count supporting RNA-Seq call',
              },
            ],
          },
        ],
        '2',
      ],
      [
        '18',
        [
          {
            type: 'rich_text',
            content: [
              {
                type: 'link_anchor',
                selector: `${LINK_ANCHOR.GENE_EXPRESSION_CALLS.SINGLE_DIFF_COMPLETE_ID}_col18`,
                text: 'RNA-Seq analysis count in conflict with RNA-Seq call',
              },
            ],
          },
        ],
        '0',
      ],
    ],
  },
  {
    type: 'table',
    title:
      'Example lines for single species complete differential expression file',
    classNames: 'small-font is-striped',
    scrollable: true,
    columns: [
      'Gene ID',
      'Gene name',
      'Anatomical entity ID',
      'Anatomical entity name',
      'Developmental stage ID',
      'Developmental stage name',
      'Differential expression',
      'Call quality',
      'Affymetrix data',
      'Affymetrix call quality',
      'Affymetrix best supporting p-value',
      'Affymetrix analysis count supporting Affymetrix call',
      'Affymetrix analysis count in conflict with Affymetrix call',
      'RNA-Seq data',
      'RNA-Seq call quality',
      'RNA-Seq best supporting p-value',
      'RNA-Seq analysis count supporting RNA-Seq call',
      'RNA-Seq analysis count in conflict with RNA-Seq call',
    ],
    data: [
      [
        'ENSMUSG00000000001',
        'Gnai3',
        'UBERON:0000081',
        'metanephros',
        'MmusDv:0000027',
        'Theiler stage 20 (mouse)',
        'no diff expression',
        'high quality',
        'no diff expression',
        'high quality',
        '0.22166589',
        '1',
        '0',
        'no data',
        'no data',
        '1.0',
        '0',
        '0',
      ],
      [
        'ENSMUSG00000000028',
        'Cdc45',
        'UBERON:0000992',
        'female gonad',
        'MmusDv:0000035',
        'Theiler stage 26 (mouse)',
        'under-expression',
        'poor quality',
        'under-expression',
        'poor quality',
        '6.386149E-4',
        '1',
        '1',
        'no data',
        'no data',
        '1.0',
        '0',
        '0',
      ],
      [
        'ENSMUSG00000000031',
        'H19',
        'UBERON:0002037',
        'cerebellum',
        'MmusDv:0000036',
        'Theiler stage 27 (mouse)',
        'over-expression',
        'high quality',
        'over-expression',
        'high quality',
        '1.2336E-6',
        '2',
        '0',
        'no data',
        'no data',
        '1.0',
        '0',
        '0',
      ],
    ],
  },

  {
    type: 'bold',
    id: `${LINK_ANCHOR.GENE_EXPRESSION_CALLS.SINGLE_DIFF_COMPLETE_ID}_col1`,
    classNames: 'mt-2',
    content: 'Gene ID (column 1)',
  },
  {
    type: 'text',
    content: 'Unique identifier of gene from Ensembl.',
  },
  {
    type: 'rich_text',
    content: [
      {
        type: 'text',
        content: 'Please note that for ',
      },
      {
        type: 'italic',
        content: 'P. paniscus',
      },
      {
        type: 'text',
        content: ' (bonobo) we use ',
      },
      {
        type: 'italic',
        content: 'P. troglodytes',
      },
      {
        type: 'text',
        content: ' genome (chimpanzee), and that for ',
      },
      {
        type: 'italic',
        content: 'P. pygmaeus',
      },
      {
        type: 'text',
        content: ' (Bornean orangutan) we use ',
      },
      {
        type: 'italic',
        content: 'P. abelii',
      },
      {
        type: 'text',
        content:
          " genome (Sumatran orangutan). Only for those species (bonobo and Bornean orangutan), we modify the Ensembl gene IDs, to ensure that we provide unique gene identifiers over all species. It is therefore necessary, to obtain correct Ensembl gene IDs for those species, to replace gene ID prefix 'PPAG' with 'ENSPTRG', and 'PPYG' prefix with 'ENSPPYG'.",
      },
    ],
  },

  {
    type: 'bold',
    id: `${LINK_ANCHOR.GENE_EXPRESSION_CALLS.SINGLE_DIFF_COMPLETE_ID}_col2`,
    classNames: 'mt-2',
    content: 'Gene name (column 2)',
  },
  {
    type: 'rich_text',
    content: [
      {
        type: 'text',
        content: 'Name of the gene defined by ',
      },

      {
        type: 'code',
        content: 'Gene ID',
      },

      {
        type: 'text',
        content: ' (column 1)',
      },
    ],
  },

  {
    type: 'bold',
    id: `${LINK_ANCHOR.GENE_EXPRESSION_CALLS.SINGLE_DIFF_COMPLETE_ID}_col3`,
    classNames: 'mt-2',
    content: 'Anatomical entity ID (column 3)',
  },
  {
    type: 'text',
    content:
      'Unique identifier of the anatomical entity, from the Uberon ontology.',
  },

  {
    type: 'bold',
    id: `${LINK_ANCHOR.GENE_EXPRESSION_CALLS.SINGLE_DIFF_COMPLETE_ID}_col4`,
    classNames: 'mt-2',
    content: 'Anatomical entity name (column 4)',
  },
  {
    type: 'rich_text',
    content: [
      {
        type: 'text',
        content: 'Name of the anatomical entity defined by ',
      },

      {
        type: 'code',
        content: 'Anatomical entity ID',
      },

      {
        type: 'text',
        content: ' (column 4)',
      },
    ],
  },

  {
    type: 'bold',
    id: `${LINK_ANCHOR.GENE_EXPRESSION_CALLS.SINGLE_DIFF_COMPLETE_ID}_col5`,
    classNames: 'mt-2',
    content: 'Developmental stage ID (column 5)',
  },
  {
    type: 'text',
    content:
      'Unique identifier of the developmental stage, from the Uberon ontology.',
  },

  {
    type: 'bold',
    id: `${LINK_ANCHOR.GENE_EXPRESSION_CALLS.SINGLE_DIFF_COMPLETE_ID}_col6`,
    classNames: 'mt-2',
    content: 'Developmental stage name (column 6)',
  },
  {
    type: 'rich_text',
    content: [
      {
        type: 'text',
        content: 'Name of the developmental stage defined by ',
      },

      {
        type: 'code',
        content: 'Developmental stage ID',
      },

      {
        type: 'text',
        content: ' (column 5)',
      },
    ],
  },

  {
    type: 'bold',
    id: `${LINK_ANCHOR.GENE_EXPRESSION_CALLS.SINGLE_DIFF_COMPLETE_ID}_col7`,
    classNames: 'mt-2',
    content: 'Differential expression (column 7)',
  },
  {
    type: 'rich_text',
    content: [
      {
        type: 'text',
        content: 'Call generated from all data types for ',
      },
      {
        type: 'italic',
        content: 'Gene ID',
      },
      {
        type: 'text',
        content: ' (column 1), in ',
      },
      {
        type: 'italic',
        content: 'Anatomical entity ID',
      },
      {
        type: 'text',
        content: ' (column 3), at ',
      },
      {
        type: 'italic',
        content: 'Developmental stage ID',
      },
      {
        type: 'text',
        content: ' (column 5)',
      },
    ],
  },
  {
    type: 'text',
    content: 'Permitted values:',
  },
  {
    type: 'unordered_list',
    children: [
      {
        type: 'rich_text',
        content: [
          {
            type: 'underline',
            content: 'over-expression',
          },
          {
            type: 'text',
            content:
              ': the gene was shown in one or more analyses to have a significant over-expression in this condition, as compared to the expression levels in other conditions of the analyses.',
          },
        ],
      },
      {
        type: 'rich_text',
        content: [
          {
            type: 'underline',
            content: 'under-expressio',
          },
          {
            type: 'text',
            content:
              ': the gene was shown in one or more analyses to have a significant under-expression in this condition, as compared to the expression levels in other conditions of the analyses.',
          },
        ],
      },
      {
        type: 'rich_text',
        content: [
          {
            type: 'underline',
            content: 'weak ambiguity',
          },
          {
            type: 'text',
            content:
              ': there exists a call of over-expression or under-expression generated from a data type, but another data type showed no significant variation of the level of expression of this gene in the same condition; or, a gene was shown to be never expressed in a condition by some analyses of a given data type, but other analyses of different data types produced a call of over-expression or of absence of differential expression for the same gene, in the same condition (note that conflicts where a data type produced an under-expression call in a condition, while another data type showed the same gene to be never expressed in that condition, do not produce a ',
          },
          {
            type: 'code',
            content: 'weak ambiguity',
          },
          {
            type: 'text',
            content: ' call, but a call of ',
          },
          {
            type: 'code',
            content: 'under-expression low quality',
          },
          {
            type: 'text',
            content: ').',
          },
        ],
      },
      {
        type: 'rich_text',
        content: [
          {
            type: 'underline',
            content: 'strong ambiguity',
          },
          {
            type: 'text',
            content:
              ': there exists a call of over-expression or under-expression generated from a data type, but there exists a call in the opposite direction generated from another data type for the same gene, anatomical entity and developmental stage. For instance, gene A is reported to be over-expressed in the midbrain at young adult stage from Affymetrix data, but is reported to be under-expressed in the midbrain at young adult stage from RNA-Seq data.',
          },
        ],
      },
    ],
  },

  {
    type: 'bold',
    id: `${LINK_ANCHOR.GENE_EXPRESSION_CALLS.SINGLE_DIFF_COMPLETE_ID}_col8`,
    classNames: 'mt-2',
    content: 'Call quality (column 8)',
  },
  {
    type: 'rich_text',
    content: [
      {
        type: 'text',
        content: 'Confidence in the differential expression call provided in ',
      },

      {
        type: 'italic',
        content: 'Differential expression',
      },

      {
        type: 'text',
        content: ' (column 7).',
      },
    ],
  },
  {
    type: 'text',
    content: 'Permitted values:',
  },
  {
    type: 'unordered_list',
    children: [
      {
        type: 'rich_text',
        content: [
          {
            type: 'underline',
            content: 'high quality',
          },
          {
            type: 'text',
            content:
              ': differential expression reported as high quality, with no contradicting call from same type of analysis (across anatomy/across life stages), for same gene, in same anatomical entity and developmental stage, (call generated either from multiple congruent analyses, or from a single analysis).',
          },
        ],
      },
      {
        type: 'rich_text',
        content: [
          {
            type: 'underline',
            content: 'poor quality',
          },
          {
            type: 'text',
            content:
              ': differential expression reported as low quality, or there exists a conflict for the same gene, anatomical entity and developmental stage, from different analyses of a same data type (conflicts between different data types are treated differently). For instance, an analysis showed a gene to be over-expressed in a condition, while another analysis showed the same gene to be under-expressed or not differentially expressed in the same condition. Such conflicts are resolved by a voting system based on the number of conditions compared, weighted by p-value. Note that in one case, this quality level is used to reconcile conflicting calls from different data types: when a data type produced an under-expression call, while a different data type has shown that the same gene was never seen as expressed in the same condition. In that case, the overall summary is ',
          },
          {
            type: 'code',
            content: 'under-expression low quality',
          },
          {
            type: 'underline',
            content: '.',
          },
        ],
      },
      {
        type: 'rich_text',
        content: [
          {
            type: 'underline',
            content: 'NA',
          },
          {
            type: 'text',
            content: ': no quality applicable when ambiguity state in ',
          },
          {
            type: 'code',
            content: 'Differential expression',
          },
          {
            type: 'text',
            content: ' (column 7).',
          },
        ],
      },
    ],
  },

  {
    type: 'bold',
    id: `${LINK_ANCHOR.GENE_EXPRESSION_CALLS.SINGLE_DIFF_COMPLETE_ID}_col9`,
    classNames: 'mt-2',
    content: 'Affymetrix data (column 9)',
  },
  {
    type: 'rich_text',
    content: [
      {
        type: 'text',
        content: 'Call generated from Affymetrix data for ',
      },
      {
        type: 'code',
        content: 'Gene ID',
      },
      {
        type: 'text',
        content: ' (column 1), in ',
      },
      {
        type: 'code',
        content: 'Anatomical entity ID',
      },
      {
        type: 'text',
        content: ' (column 5), at ',
      },
      {
        type: 'code',
        content: 'Developmental stage ID',
      },
      {
        type: 'text',
        content: ' (column 3).',
      },
    ],
  },
  {
    type: 'text',
    content: 'Permitted values:',
  },
  {
    type: 'unordered_list',
    children: [
      {
        type: 'rich_text',
        content: [
          {
            type: 'underline',
            content: 'over-expression',
          },
          {
            type: 'text',
            content:
              ': the gene was shown in one or more analyses to have a significant over-expression in this condition, as compared to the expression levels in other conditions of the analyses.',
          },
        ],
      },
      {
        type: 'rich_text',
        content: [
          {
            type: 'underline',
            content: 'under-expression',
          },
          {
            type: 'text',
            content:
              ': the gene was shown in one or more analyses to have a significant under-expression in this condition, as compared to the expression levels in other conditions of the analyses.',
          },
        ],
      },
      {
        type: 'rich_text',
        content: [
          {
            type: 'underline',
            content: 'no diff expression',
          },
          {
            type: 'text',
            content:
              ': the gene was tested for differential expression in this condition, but was never shown to have a significant variation of expression as compared to the other conditions of the analyses.',
          },
        ],
      },
      {
        type: 'rich_text',
        content: [
          {
            type: 'underline',
            content: 'no data',
          },
          {
            type: 'text',
            content:
              ': no analyses of this data type compared expression level of this gene in this condition.',
          },
        ],
      },
    ],
  },

  {
    type: 'bold',
    id: `${LINK_ANCHOR.GENE_EXPRESSION_CALLS.SINGLE_DIFF_COMPLETE_ID}_col10`,
    classNames: 'mt-2',
    content: 'Affymetrix call quality (column 10)',
  },
  {
    type: 'rich_text',
    content: [
      {
        type: 'text',
        content: 'Confidence in the differential expression call provided in ',
      },
      {
        type: 'code',
        content: 'Affymetrix data',
      },
      {
        type: 'text',
        content: ' (column 9).',
      },
    ],
  },
  {
    type: 'text',
    content: 'Permitted values:',
  },
  {
    type: 'unordered_list',
    children: [
      {
        type: 'rich_text',
        content: [
          {
            type: 'underline',
            content: 'high quality',
          },
          {
            type: 'text',
            content:
              ': differential expression reported as high quality, with no contradicting call from same type of analysis (across anatomy/across life stages), for same gene, in same anatomical entity and developmental stage, (call generated either from multiple congruent analyses, or from a single analysis).',
          },
        ],
      },
      {
        type: 'rich_text',
        content: [
          {
            type: 'underline',
            content: 'poor quality',
          },
          {
            type: 'text',
            content:
              ': differential expression reported as low quality, or there exists a conflict for the same gene, anatomical entity and developmental stage, from different analyses of a same data type (conflicts between different data types are treated differently). For instance, an analysis showed a gene to be over-expressed in a condition, while another analysis showed the same gene to be under-expressed or not differentially expressed in the same condition. Such conflicts are resolved by a voting system based on the number of conditions compared, weighted by p-value. Note that in one case, this quality level is used to reconcile conflicting calls from different data types: when a data type produced an under-expression call, while a different data type has shown that the same gene was never seen as expressed in the same condition. In that case, the overall summary is ',
          },
          {
            type: 'code',
            content: 'under-expression low quality',
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
            type: 'underline',
            content: 'no data',
          },
          {
            type: 'text',
            content: ': no data associated with ',
          },
          {
            type: 'code',
            content: 'Affymetrix data',
          },
          {
            type: 'text',
            content: ' (column 9).',
          },
        ],
      },
    ],
  },

  {
    type: 'bold',
    id: `${LINK_ANCHOR.GENE_EXPRESSION_CALLS.SINGLE_DIFF_COMPLETE_ID}_col11`,
    classNames: 'mt-2',
    content: 'Affymetrix best supporting p-value (column 11)',
  },
  {
    type: 'rich_text',
    content: [
      {
        type: 'text',
        content:
          'Best p-value from the Affymetrix analyses supporting the Affymetrix call provided in ',
      },
      {
        type: 'code',
        content: 'Affymetrix data',
      },
      {
        type: 'text',
        content: ' (column 9). Set to 1.0 if no data available by Affymetrix.',
      },
    ],
  },

  {
    type: 'bold',
    id: `${LINK_ANCHOR.GENE_EXPRESSION_CALLS.SINGLE_DIFF_COMPLETE_ID}_col12`,
    classNames: 'mt-2',
    content: 'Affymetrix analysis count supporting Affymetrix call (column 12)',
  },
  {
    type: 'rich_text',
    content: [
      {
        type: 'text',
        content:
          'Number of Affymetrix analyses supporting the Affymetrix call provided in ',
      },
      {
        type: 'code',
        content: 'Affymetrix data',
      },
      {
        type: 'text',
        content: ' (column 9). Set to 0 if no data available by Affymetrix.',
      },
    ],
  },

  {
    type: 'bold',
    id: `${LINK_ANCHOR.GENE_EXPRESSION_CALLS.SINGLE_DIFF_COMPLETE_ID}_col13`,
    classNames: 'mt-2',
    content:
      'Affymetrix analysis count in conflict with Affymetrix call (column 13)',
  },
  {
    type: 'rich_text',
    content: [
      {
        type: 'text',
        content:
          'Number of Affymetrix analyses in conflict, generating a call different from the call provided in ',
      },
      {
        type: 'code',
        content: 'Affymetrix data',
      },
      {
        type: 'text',
        content: ' (column 9). Set to 0 if no data available by Affymetrix.',
      },
    ],
  },

  {
    type: 'bold',
    id: `${LINK_ANCHOR.GENE_EXPRESSION_CALLS.SINGLE_DIFF_COMPLETE_ID}_col14`,
    classNames: 'mt-2',
    content: 'RNA-Seq data (column 14)',
  },
  {
    type: 'rich_text',
    content: [
      {
        type: 'text',
        content: 'Call generated from RNA-Seq data for ',
      },
      {
        type: 'code',
        content: 'Gene ID',
      },
      {
        type: 'text',
        content: ' (column 1), in ',
      },
      {
        type: 'code',
        content: 'Anatomical entity ID',
      },
      {
        type: 'text',
        content: ' (column 5), at ',
      },
      {
        type: 'code',
        content: 'Developmental stage ID',
      },
      {
        type: 'text',
        content: ' (column 3).',
      },
    ],
  },
  {
    type: 'text',
    content: 'Permitted values:',
  },
  {
    type: 'unordered_list',
    children: [
      {
        type: 'rich_text',
        content: [
          {
            type: 'underline',
            content: 'over-expression',
          },
          {
            type: 'text',
            content:
              ': the gene was shown in one or more analyses to have a significant over-expression in this condition, as compared to the expression levels in other conditions of the analyses.',
          },
        ],
      },
      {
        type: 'rich_text',
        content: [
          {
            type: 'underline',
            content: 'under-expression',
          },
          {
            type: 'text',
            content:
              ': the gene was shown in one or more analyses to have a significant under-expression in this condition, as compared to the expression levels in other conditions of the analyses.',
          },
        ],
      },
      {
        type: 'rich_text',
        content: [
          {
            type: 'underline',
            content: 'no diff expression',
          },
          {
            type: 'text',
            content:
              ': the gene was tested for differential expression in this condition, but was never shown to have a significant variation of expression as compared to the other conditions of the analyses.',
          },
        ],
      },
      {
        type: 'rich_text',
        content: [
          {
            type: 'underline',
            content: 'no data',
          },
          {
            type: 'text',
            content:
              ': no analyses of this data type compared expression level of this gene in this condition.',
          },
        ],
      },
    ],
  },

  {
    type: 'bold',
    id: `${LINK_ANCHOR.GENE_EXPRESSION_CALLS.SINGLE_DIFF_COMPLETE_ID}_col15`,
    classNames: 'mt-2',
    content: 'RNA-Seq call quality (column 15)',
  },
  {
    type: 'rich_text',
    content: [
      {
        type: 'text',
        content: 'Confidence in the differential expression call provided in ',
      },
      {
        type: 'code',
        content: 'RNA-Seq data',
      },
      {
        type: 'text',
        content: ' (column 14).',
      },
    ],
  },
  {
    type: 'text',
    content: 'Permitted values:',
  },
  {
    type: 'unordered_list',
    children: [
      {
        type: 'rich_text',
        content: [
          {
            type: 'underline',
            content: 'high quality',
          },
          {
            type: 'text',
            content:
              ': differential expression reported as high quality, with no contradicting call from same type of analysis (across anatomy/across life stages), for same gene, in same anatomical entity and developmental stage, (call generated either from multiple congruent analyses, or from a single analysis).',
          },
        ],
      },
      {
        type: 'rich_text',
        content: [
          {
            type: 'underline',
            content: 'poor quality',
          },
          {
            type: 'text',
            content:
              ': differential expression reported as low quality, or there exists a conflict for the same gene, anatomical entity and developmental stage, from different analyses of a same data type (conflicts between different data types are treated differently). For instance, an analysis showed a gene to be over-expressed in a condition, while another analysis showed the same gene to be under-expressed or not differentially expressed in the same condition. Such conflicts are resolved by a voting system based on the number of conditions compared, weighted by p-value. Note that in one case, this quality level is used to reconcile conflicting calls from different data types: when a data type produced an under-expression call, while a different data type has shown that the same gene was never seen as expressed in the same condition. In that case, the overall summary is ',
          },
          {
            type: 'code',
            content: 'under-expression low quality',
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
            type: 'underline',
            content: 'no data',
          },
          {
            type: 'text',
            content: ': no data associated with ',
          },
          {
            type: 'code',
            content: 'RNA-Seq data',
          },
          {
            type: 'text',
            content: ' (column 14).',
          },
        ],
      },
    ],
  },

  {
    type: 'bold',
    id: `${LINK_ANCHOR.GENE_EXPRESSION_CALLS.SINGLE_DIFF_COMPLETE_ID}_col16`,
    classNames: 'mt-2',
    content: 'RNA-Seq best supporting p-value (column 16)',
  },
  {
    type: 'rich_text',
    content: [
      {
        type: 'text',
        content:
          'Best p-value from the RNA-Seq analyses supporting the RNA-Seq call provided in ',
      },
      {
        type: 'code',
        content: 'RNA-Seq data',
      },
      {
        type: 'text',
        content: ' (column 14). Set to 1.0 if no data available by RNA-Seq.',
      },
    ],
  },

  {
    type: 'bold',
    id: `${LINK_ANCHOR.GENE_EXPRESSION_CALLS.SINGLE_DIFF_COMPLETE_ID}_col17`,
    classNames: 'mt-2',
    content: 'RNA-Seq analysis count supporting RNA-Seq call (column 17)',
  },
  {
    type: 'rich_text',
    content: [
      {
        type: 'text',
        content:
          'Number of RNA-Seq analyses supporting the RNA-Seq call provided in ',
      },
      {
        type: 'code',
        content: 'RNA-Seq data',
      },
      {
        type: 'text',
        content: ' (column 14). Set to 0 if no data available by RNA-Seq.',
      },
    ],
  },

  {
    type: 'bold',
    id: `${LINK_ANCHOR.GENE_EXPRESSION_CALLS.SINGLE_DIFF_COMPLETE_ID}_col18`,
    classNames: 'mt-2',
    content: 'RNA-Seq analysis count in conflict with RNA-Seq call (column 18)',
  },
  {
    type: 'rich_text',
    content: [
      {
        type: 'text',
        content:
          'Number of RNA-Seq analyses in conflict, generating a call different from the call provided in ',
      },
      {
        type: 'code',
        content: 'RNA-Seq data',
      },
      {
        type: 'text',
        content: ' (column 14). Set to 0 if no data available by RNA-Seq.',
      },
    ],
  },

  {
    type: 'link_anchor',
    selector: LINK_ANCHOR.GENE_EXPRESSION_CALLS.SINGLE_DIFF_ID,
    text: 'Back to over-/under-expression menu',
  },
];
const singleDiff = [
  {
    type: 'text',
    classNames: 'has-text-weight-semibold is-size-6',
    content: 'Over-/under-expression across anatomy or life stages',
    id: LINK_ANCHOR.GENE_EXPRESSION_CALLS.SINGLE_DIFF_ID,
  },
  {
    type: 'text',
    content:
      'Bgee provides calls of over-/under-expression. A call corresponds to a gene, with significant variation of its level of expression, in an anatomical entity during a developmental stage, as compared to, either: i) other anatomical entities at the same (broadly defined) developmental stage (over-/under-expression across anatomy); ii) the same anatomical entity at different (precise) developmental stages (over-/under-expression across life stages). These analyses of differential expression are performed using Affymetrix and RNA-Seq experiments with at least 3 suitable conditions (anatomical entity/developmental stage), and at least 2 replicates for each; as for all data in Bgee, only "normal" expression is considered (i.e., no treatment, no disease, no gene knock-out, etc.).',
  },
  {
    type: 'rich_text',
    content: [
      {
        type: 'text',
        content:
          'Bgee runs all possible differential expression analyses for each experiment independently, then collects all results and provides a summary as unique calls  ',
      },
      {
        type: 'code',
        content: 'gene - anatomical entity - developmental stage',
      },
      {
        type: 'text',
        content:
          ', with confidence information, and conflicts within each data type resolved using a voting system weighted by p-values (conflicts between different data types are treated differently). This offers the possibility to aggregate and compare these calls between different experiments, different data types, and different species.',
      },
    ],
  },
  {
    type: 'text',
    content:
      'Note that, as opposed to calls of presence/absence of expression, no propagation of differential expression calls is performed using anatomical and life stage ontologies.',
  },

  {
    type: 'rich_text',
    content: [
      {
        type: 'text',
        content:
          'Over-/under-expression calls are then filtered and presented differently depending on whether a ',
      },
      { type: 'code', content: 'simple file' },
      { type: 'text', content: ' or a ' },
      { type: 'code', content: 'complete file' },
      { type: 'text', content: ' is used. Notably: ' },
      { type: 'code', content: 'simple files' },
      {
        type: 'text',
        content:
          ' aim at providing summarized information over all data types; ',
      },
      { type: 'code', content: 'complete files' },
      {
        type: 'text',
        content:
          ' aim at reporting all information, allowing for instance to retrieve the contribution of each data type to a call, or to retrieve all genes and conditions tested, including genes having no differential expression in these conditions.',
      },
    ],
  },

  {
    type: 'text',
    content: 'Jump to format description for:',
  },
  {
    type: 'unordered_list',
    children: [
      {
        type: 'link_anchor',
        selector: LINK_ANCHOR.GENE_EXPRESSION_CALLS.SINGLE_DIFF_SIMPLE_ID,
        text: 'simple file',
      },
      {
        type: 'link_anchor',
        selector: LINK_ANCHOR.GENE_EXPRESSION_CALLS.SINGLE_DIFF_COMPLETE_ID,
        text: 'complete file',
      },
    ],
  },

  ...singleDiffSimple,
  ...singleDiffComplete,
];

const MULTI_SPECIES_DL_FILES_ID = 'multi';
const OMA_HOG_ID = 'oma_hog';
const MULTI_DIFF_ID = 'multi_diff';
const MULTI_DIFF_SIMPLE_ID = 'multi_diff_simple';
const MULTI_DIFF_COMPLETE_ID = 'multi_diff_complete';

const omaHog = [
  {
    type: 'text',
    classNames: 'has-text-weight-semibold is-size-6 has-text-primary',
    content: 'OMA Hierarchical orthologous groups file',
    id: OMA_HOG_ID,
  },
  {
    type: 'notification',
    classNames: 'is-warning is-light',
    content: 'Please note, these data will be available in a future release.',
  },
  {
    type: 'text',
    content:
      'OMA Hierarchical orthologous groups files provide gene orthology relations, by grouping genes that have descended from a single common ancestral gene in the taxon of interest. The targeted taxon is provided in the file name. Orthologous genes are grouped by common OMA IDs, provided in the column OMA ID (column 1, see below).',
  },

  {
    type: 'table',
    title: 'Format description for OMA Hierarchical orthologous groups file',
    classNames: 'is-narrow',
    columns: ['Column', 'Content', 'Example'],
    data: [
      [
        1,
        [
          {
            type: 'rich_text',
            content: [
              {
                type: 'link_anchor',
                selector: `oma_hog_col1`,
                text: 'OMA ID',
              },
            ],
          },
        ],
        '10',
      ],
      [
        2,
        [
          {
            type: 'rich_text',
            content: [
              {
                type: 'link_anchor',
                selector: `oma_hog_col2`,
                text: 'Gene ID',
              },
            ],
          },
        ],
        'ENSG00000105298',
      ],
      [
        3,
        [
          {
            type: 'rich_text',
            content: [
              {
                type: 'link_anchor',
                selector: `oma_hog_col3`,
                text: 'Gene name',
              },
            ],
          },
        ],
        'CACTIN',
      ],
    ],
  },
  {
    type: 'table',
    title: 'Example lines for a OMA Hierarchical orthologous groups file',
    classNames: 'small-font',
    columns: ['OMA ID', 'Gene ID', 'Gene name'],
    data: [
      ['98828', 'ENSG00000158473', 'CD1D'],
      ['98828', 'ENSMUSG00000028076', 'Cd1d1'],
      ['98828', 'ENSMUSG00000041750', 'Cd1d2'],
    ],
  },

  { type: 'bold', id: 'oma_hog_col1', content: 'OMA ID (column 1)' },
  {
    type: 'rich_text',
    content: [
      {
        type: 'text',
        content:
          'Unique identifier of the OMA gene orthology group. Note that these identifiers are not stable between releases, and cannot be used to retrieve data from the ',
      },
      {
        type: 'link_external',
        path: 'https://omabrowser.org/oma/hogs/',
        text: 'OMA browser',
      },
      {
        type: 'text',
        content:
          '. They are provided solely to group data from orthologous genes belonging to a same orthology group. Genes member of a OMA gene orthology group can be retrieved through the associated ',
      },
      {
        type: 'link_anchor',
        selector: OMA_HOG_ID,
        text: 'hierarchical orthologous groups file',
      },
      { type: 'text', content: '.' },
    ],
  },

  { type: 'bold', id: 'oma_hog_col2', content: 'Gene ID (column 2)' },
  { type: 'text', content: 'Unique identifier of gene from Ensembl.' },
  {
    type: 'rich_text',
    content: [
      { type: 'text', content: 'Please note that for ' },
      { type: 'italic', content: 'P. paniscus' },
      { type: 'text', content: ' (bonobo) we use ' },
      { type: 'italic', content: 'P. troglodytes' },
      { type: 'text', content: ' genome (chimpanzee), and that for ' },
      { type: 'italic', content: 'P. pygmaeus' },
      { type: 'text', content: 'aaaaaaaaaaaaa' },
      { type: 'italic', content: 'P. abelii ' },
      {
        type: 'text',
        content:
          " genome (Sumatran orangutan). Only for those species (bonobo and Bornean orangutan), we modify the Ensembl gene IDs, to ensure that we provide unique gene identifiers over all species. It is therefore necessary, to obtain correct Ensembl gene IDs for those species, to replace gene ID prefix 'PPAG' with 'ENSPTRG', and 'PPYG' prefix with 'ENSPPYG'.",
      },
    ],
  },

  { type: 'bold', id: 'oma_hog_col3', content: 'Gene name (column 3)' },
  {
    type: 'rich_text',
    content: [
      { type: 'text', content: 'Name of the gene defined by ' },
      { type: 'code', content: 'Gene ID' },
      { type: 'text', content: ' (column 2)' },
    ],
  },

  {
    type: 'link_anchor',
    selector: MULTI_SPECIES_DL_FILES_ID,
    text: 'Back to multi-species download files menu',
  },
];

const multiDiffSimple = [
  {
    type: 'text',
    classNames: 'has-text-weight-semibold is-size-6 has-text-primary',
    content: 'Simple file',
    id: MULTI_DIFF_SIMPLE_ID,
  },
  {
    type: 'text',
    content:
      'In simple files, each line provides information for a gene orthology group, in a condition (homologous anatomical entity/comparable developmental stage); columns then provide, for each species, the number of genes over-expressed, under-expressed, not differentially expressed or with inconclusive results, and with no data. This means that the number of columns is variable depending on the number of species compared.',
  },
  {
    type: 'text',
    content:
      'In simple files, only lines with data in at least two species, and at least one over-expression or under-expression call in a species, are provided, and only for anatomical entities with a homology relation defined with a good level of confidence.',
  },
  {
    type: 'rich_text',
    content: [
      {
        type: 'text',
        content:
          'Relations of orthology between genes member of a same orthology gene group are provided through the associated ',
      },
      {
        type: 'link_anchor',
        selector: OMA_HOG_ID,
        text: 'hierarchical orthologous groups file',
      },
      { type: 'text', content: '.' },
    ],
  },
  {
    type: 'table',
    title:
      'Format description for multi-species simple differential expression file',
    classNames: 'is-narrow is-striped',
    columns: ['Column', 'Content', 'Cardinality', 'Example'],
    data: [
      [
        1,
        [
          {
            type: 'rich_text',
            content: [
              {
                type: 'link_anchor',
                selector: `${MULTI_DIFF_SIMPLE_ID}_col1`,
                text: 'OMA ID',
              },
            ],
          },
        ],
        1,
        80,
      ],
      [
        2,
        [
          {
            type: 'rich_text',
            content: [
              {
                type: 'link_anchor',
                selector: `${MULTI_DIFF_SIMPLE_ID}_col2`,
                text: 'Anatomical entity IDs',
              },
            ],
          },
        ],
        '1 or greater',
        'UBERON:0001898',
      ],
      [
        3,
        [
          {
            type: 'rich_text',
            content: [
              {
                type: 'link_anchor',
                selector: `${MULTI_DIFF_SIMPLE_ID}_col3`,
                text: 'Anatomical entity names',
              },
            ],
          },
        ],
        '1 or greater',
        'hypothalamus',
      ],
      [
        4,
        [
          {
            type: 'rich_text',
            content: [
              {
                type: 'link_anchor',
                selector: `${MULTI_DIFF_SIMPLE_ID}_col4`,
                text: 'Developmental stage ID',
              },
            ],
          },
        ],
        1,
        'UBERON:0000113',
      ],
      [
        5,
        [
          {
            type: 'rich_text',
            content: [
              {
                type: 'link_anchor',
                selector: `${MULTI_DIFF_SIMPLE_ID}_col5`,
                text: 'Developmental stage name',
              },
            ],
          },
        ],
        1,
        'post-juvenile adult stage',
      ],

      [
        10,
        [
          {
            type: 'rich_text',
            content: [
              {
                type: 'link_anchor',
                selector: `${MULTI_DIFF_SIMPLE_ID}_col6`,
                text: 'Over-expressed gene count for species1',
              },
              {
                type: 'text',
                content: ' (e.g., ',
              },
              {
                type: 'code',
                content: 'Over-expressed gene count for Homo sapiens',
              },
              {
                type: 'text',
                content: ')',
              },
            ],
          },
        ],
        1,
        1,
      ],
      [
        11,
        [
          {
            type: 'rich_text',
            content: [
              {
                type: 'link_anchor',
                selector: `${MULTI_DIFF_SIMPLE_ID}_col7`,
                text: 'Under-expressed gene count for species1',
              },
              {
                type: 'text',
                content: ' (e.g., ',
              },
              {
                type: 'code',
                content: 'Under-expressed gene count for Homo sapiens',
              },
              {
                type: 'text',
                content: ')',
              },
            ],
          },
        ],
        1,
        0,
      ],
      [
        12,
        [
          {
            type: 'rich_text',
            content: [
              {
                type: 'link_anchor',
                selector: `${MULTI_DIFF_SIMPLE_ID}_col9`,
                text: 'Not diff. expressed gene count for species1',
              },
              {
                type: 'text',
                content: ' (e.g., ',
              },
              {
                type: 'code',
                content: 'Not diff. expressed gene count for Homo sapiens',
              },
              {
                type: 'text',
                content: ')',
              },
            ],
          },
        ],
        1,
        0,
      ],
      [
        13,
        [
          {
            type: 'rich_text',
            content: [
              {
                type: 'link_anchor',
                selector: `${MULTI_DIFF_SIMPLE_ID}_col9`,
                text: 'NA gene count for species1',
              },
              {
                type: 'text',
                content: ' (e.g., ',
              },
              {
                type: 'code',
                content: 'NA gene count for Homo sapiens',
              },
              {
                type: 'text',
                content: ')',
              },
            ],
          },
        ],
        1,
        '...',
      ],
      [
        10,
        [
          {
            type: 'rich_text',
            content: [
              {
                type: 'link_anchor',
                selector: `${MULTI_DIFF_SIMPLE_ID}_col6`,
                text: 'Over-expressed gene count for species2',
              },
              {
                type: 'text',
                content: ' (e.g., ',
              },
              {
                type: 'code',
                content: 'Over-expressed gene count for Mus musculus',
              },
              {
                type: 'text',
                content: ')',
              },
            ],
          },
        ],
        1,
        1,
      ],
      [
        11,
        [
          {
            type: 'rich_text',
            content: [
              {
                type: 'link_anchor',
                selector: `${MULTI_DIFF_SIMPLE_ID}_col7`,
                text: 'Under-expressed gene count for species2',
              },
              {
                type: 'text',
                content: ' (e.g., ',
              },
              {
                type: 'code',
                content: 'Under-expressed gene count for Mus musculus',
              },
              {
                type: 'text',
                content: ')',
              },
            ],
          },
        ],
        1,
        0,
      ],
      [
        12,
        [
          {
            type: 'rich_text',
            content: [
              {
                type: 'link_anchor',
                selector: `${MULTI_DIFF_SIMPLE_ID}_col9`,
                text: 'Not diff. expressed gene count for species2',
              },
              {
                type: 'text',
                content: ' (e.g., ',
              },
              {
                type: 'code',
                content: 'Not diff. expressed gene count for Mus musculus',
              },
              {
                type: 'text',
                content: ')',
              },
            ],
          },
        ],
        1,
        0,
      ],
      [
        13,
        [
          {
            type: 'rich_text',
            content: [
              {
                type: 'link_anchor',
                selector: `${MULTI_DIFF_SIMPLE_ID}_col9`,
                text: 'NA gene count for species2',
              },
              {
                type: 'text',
                content: ' (e.g., ',
              },
              {
                type: 'code',
                content: 'NA gene count for Mus musculus',
              },
              {
                type: 'text',
                content: ')',
              },
            ],
          },
        ],
        1,
        '...',
      ],

      [
        '...',
        [
          {
            type: 'text',
            content: 'Over-expressed gene count for speciesXX',
          },
        ],
        '',
        '',
      ],
      [
        '...',
        [
          {
            type: 'text',
            content: '...',
          },
        ],
        '',
        '',
      ],
      [
        '(species*4 + 6)',
        [
          {
            type: 'rich_text',
            content: [
              {
                type: 'link_anchor',
                selector: `${MULTI_DIFF_SIMPLE_ID}_col_gene_ids`,
                text: 'Gene IDs',
              },
            ],
          },
        ],
        '2 or greater',
        'ENSG00000169057|ENSMUSG00000031393',
      ],
      [
        '(species*4 + 7)',
        [
          {
            type: 'rich_text',
            content: [
              {
                type: 'link_anchor',
                selector: `${MULTI_DIFF_SIMPLE_ID}_col_gene_names`,
                text: 'Gene names',
              },
            ],
          },
        ],
        '2 or greater',
        'MECP2|Mecp2',
      ],
    ],
  },
  {
    type: 'table',
    title:
      'Example lines for multi-species simple differential expression file',
    classNames: 'small-font is-striped',
    scrollable: true,
    columns: [
      'OMA ID',
      'Anatomical entity IDs',
      'Anatomical entity names',
      'Developmental stage ID',
      'Developmental stage name',
      'Over-expressed gene count for Homo sapiens',
      'Under-expressed gene count for Homo sapiens',
      'Not diff. expressed gene count for Homo sapiens',
      'NA gene count for Homo sapiens',
      'Over-expressed gene count for Mus musculus',
      'Under-expressed gene count for Mus musculus',
      'Not diff. expressed gene count for Mus musculus',
      'NA gene count for Mus musculus',
      'Gene IDs',
      'Gene names',
    ],
    data: [
      [
        '93',
        'UBERON:0000473',
        'testis',
        'UBERON:0000113',
        'post-juvenile adult stage',
        '0',
        '1',
        '0',
        '0',
        '0',
        '1',
        '0',
        '0',
        'ENSG00000162512|ENSMUSG00000025743',
        'SDC3|Sdc3',
      ],
      [
        '93',
        'UBERON:0000955',
        'brain',
        'UBERON:0000113',
        'post-juvenile adult stage',
        '1',
        '0',
        '0',
        '0',
        '1',
        '0',
        '0',
        '0',
        'ENSG00000162512|ENSMUSG00000025743',
        'SDC3|Sdc3',
      ],
      [
        '93',
        'UBERON:0001134',
        'skeletal muscle tissue',
        'UBERON:0000113',
        'post-juvenile adult stage',
        '0',
        '1',
        '0',
        '0',
        '0',
        '1',
        '0',
        '0',
        'ENSG00000162512|ENSMUSG00000025743',
        'SDC3|Sdc3',
      ],
    ],
  },
];
const multiDiffComplete = [
  {
    type: 'text',
    classNames: 'has-text-weight-semibold is-size-6 has-text-primary',
    content: 'Complete file',
    id: MULTI_DIFF_COMPLETE_ID,
  },
  {
    type: 'text',
    content:
      'In complete files, information for all genes are provided, in all conditions tested, for anatomical entities homologous between all species compared, and comparable broad developmental stages. As opposed to simple multi-species files, all homology relations available for the anatomical entities are considered, even from homology hypotheses with low support; a column allows to retrieve the level of confidence in the homology hypothesis used. Also, the number of columns in complete files is not variable, whatever the number of species compared is.',
  },
  {
    type: 'rich_text',
    content: [
      {
        type: 'text',
        content:
          'Relations of orthology between genes can be retrieved through the use of the ',
      },
      {
        type: 'link_anchor',
        selector: OMA_HOG_ID,
        text: 'hierarchical orthologous groups file',
      },
      {
        type: 'text',
        content:
          '. This allows notably to detect genes with no data for a condition: if a gene is listed as a member of an orthology group, but there is no call for this gene in a given condition, it means that there is no data available for this gene in this condition.',
      },
    ],
  },
  {
    type: 'table',
    title:
      'Format description for multi-species complete differential expression file',
    classNames: 'is-narrow is-striped',
    columns: ['Column', 'Content', 'Cardinality', 'Example'],
    data: [
      [
        '1',
        [
          {
            type: 'rich_text',
            content: [
              {
                type: 'link_anchor',
                selector: 'multi_diff_complete_col1',
                text: 'OMA ID',
              },
            ],
          },
        ],
        '1',
        '42865',
      ],
      [
        '2',
        [
          {
            type: 'rich_text',
            content: [
              {
                type: 'link_anchor',
                selector: 'multi_diff_complete_col2',
                text: 'Gene ID',
              },
            ],
          },
        ],
        '1',
        'ENSMMUG00000012094',
      ],
      [
        '3',
        [
          {
            type: 'rich_text',
            content: [
              {
                type: 'link_anchor',
                selector: 'multi_diff_complete_col3',
                text: 'Gene name',
              },
            ],
          },
        ],
        '1',
        'RAB17',
      ],
      [
        '4',
        [
          {
            type: 'rich_text',
            content: [
              {
                type: 'link_anchor',
                selector: 'multi_diff_complete_col4',
                text: 'Anatomical entity IDs',
              },
            ],
          },
        ],
        '1 or greater',
        'UBERON:0002037',
      ],
      [
        '5',
        [
          {
            type: 'rich_text',
            content: [
              {
                type: 'link_anchor',
                selector: 'multi_diff_complete_col5',
                text: 'Anatomical entity names',
              },
            ],
          },
        ],
        '1 or greater',
        'cerebellum',
      ],
      [
        '6',
        [
          {
            type: 'rich_text',
            content: [
              {
                type: 'link_anchor',
                selector: 'multi_diff_complete_col6',
                text: 'Developmental stage ID',
              },
            ],
          },
        ],
        '1',
        'UBERON:0018241',
      ],
      [
        '7',
        [
          {
            type: 'rich_text',
            content: [
              {
                type: 'link_anchor',
                selector: 'multi_diff_complete_col7',
                text: 'Developmental stage name',
              },
            ],
          },
        ],
        '1',
        'prime adult stage',
      ],
      [
        '8',
        [
          {
            type: 'rich_text',
            content: [
              {
                type: 'link_anchor',
                selector: 'multi_diff_complete_col8',
                text: 'Latin species name',
              },
            ],
          },
        ],
        '1',
        'Macaca_mulatta',
      ],
      [
        '9',
        [
          {
            type: 'rich_text',
            content: [
              {
                type: 'link_anchor',
                selector: 'multi_diff_complete_col9',
                text: 'Differential expression',
              },
            ],
          },
        ],
        '1',
        'under-expression',
      ],
      [
        '10',
        [
          {
            type: 'rich_text',
            content: [
              {
                type: 'link_anchor',
                selector: 'multi_diff_complete_col10',
                text: 'Call quality',
              },
            ],
          },
        ],
        '1',
        'high quality',
      ],
      [
        '11',
        [
          {
            type: 'rich_text',
            content: [
              {
                type: 'link_anchor',
                selector: 'multi_diff_complete_col11',
                text: 'Affymetrix data',
              },
            ],
          },
        ],
        '1',
        'no data',
      ],
      [
        '12',
        [
          {
            type: 'rich_text',
            content: [
              {
                type: 'link_anchor',
                selector: 'multi_diff_complete_col12',
                text: 'Affymetrix call quality',
              },
            ],
          },
        ],
        '1',
        'no data',
      ],
      [
        '13',
        [
          {
            type: 'rich_text',
            content: [
              {
                type: 'link_anchor',
                selector: 'multi_diff_complete_col13',
                text: 'Affymetrix best supporting p-value',
              },
            ],
          },
        ],
        '1',
        '1.0',
      ],
      [
        '14',
        [
          {
            type: 'rich_text',
            content: [
              {
                type: 'link_anchor',
                selector: 'multi_diff_complete_col14',
                text: 'Affymetrix analysis count supporting Affymetrix call',
              },
            ],
          },
        ],
        '1',
        '0',
      ],
      [
        '15',
        [
          {
            type: 'rich_text',
            content: [
              {
                type: 'link_anchor',
                selector: 'multi_diff_complete_col15',
                text: 'Affymetrix analysis count in conflict with Affymetrix call',
              },
            ],
          },
        ],
        '1',
        '0',
      ],
      [
        '16',
        [
          {
            type: 'rich_text',
            content: [
              {
                type: 'link_anchor',
                selector: 'multi_diff_complete_col16',
                text: 'RNA-Seq data',
              },
            ],
          },
        ],
        '1',
        'under-expression',
      ],
      [
        '17',
        [
          {
            type: 'rich_text',
            content: [
              {
                type: 'link_anchor',
                selector: 'multi_diff_complete_col17',
                text: 'RNA-Seq call quality',
              },
            ],
          },
        ],
        '1',
        'high quality',
      ],
      [
        '18',
        [
          {
            type: 'rich_text',
            content: [
              {
                type: 'link_anchor',
                selector: 'multi_diff_complete_col18',
                text: 'RNA-Seq best supporting p-value',
              },
            ],
          },
        ],
        '1',
        '8.82E-7',
      ],
      [
        '19',
        [
          {
            type: 'rich_text',
            content: [
              {
                type: 'link_anchor',
                selector: 'multi_diff_complete_col19',
                text: 'RNA-Seq analysis count supporting RNA-Seq call',
              },
            ],
          },
        ],
        '1',
        '1',
      ],
      [
        '20',
        [
          {
            type: 'rich_text',
            content: [
              {
                type: 'link_anchor',
                selector: 'multi_diff_complete_col20',
                text: 'RNA-Seq analysis count in conflict with RNA-Seq call',
              },
            ],
          },
        ],
        '1',
        '0',
      ],
      [
        '21',
        [
          {
            type: 'rich_text',
            content: [
              {
                type: 'link_anchor',
                selector: 'multi_diff_complete_col21',
                text: 'Anatomy homology CIO ID',
              },
            ],
          },
        ],
        '1',
        'CIO:0000003',
      ],
      [
        '22',
        [
          {
            type: 'rich_text',
            content: [
              {
                type: 'link_anchor',
                selector: 'multi_diff_complete_col22',
                text: 'Anatomy homology CIO name',
              },
            ],
          },
        ],
        '1',
        'high confidence from single evidence',
      ],
    ],
  },
  {
    type: 'table',
    title:
      'Example lines for multi-species complete differential expression file',
    classNames: 'small-font is-striped',
    scrollable: true,
    columns: [
      'OMA ID',
      'Gene ID',
      'Gene name',
      'Anatomical entity IDs',
      'Anatomical entity names',
      'Developmental stage ID',
      'Developmental stage name',
      'Latin species name',
      'Differential expression',
      'Call quality',
      'Affymetrix data',
      'Affymetrix call quality',
      'Affymetrix best supporting p-value',
      'Affymetrix analysis count supporting Affymetrix call',
      'Affymetrix analysis count in conflict with Affymetrix call',
      'RNA-Seq data',
      'RNA-Seq call quality',
      'RNA-Seq best supporting p-value',
      'RNA-Seq analysis count supporting RNA-Seq call',
      'RNA-Seq analysis count in conflict with RNA-Seq call',
      'Anatomy homology CIO ID',
      'Anatomy homology CIO name',
    ],
    data: [
      [
        '59',
        'ENSMUSG00000030516',
        'Tjp1',
        'UBERON:0000948',
        'heart',
        'UBERON:0018241',
        'prime adult stage',
        'Mus_musculus',
        'over-expression',
        'high quality',
        'over-expression',
        'high quality',
        '0.0',
        '5',
        '0',
        'no data',
        'no data',
        '1.0',
        '0',
        '0',
        'CIO:0000004',
        'medium confidence from single evidence',
      ],
      [
        '59',
        'ENSMMUG00000017878',
        'Tjp1',
        'UBERON:0000948',
        'heart',
        'UBERON:0018241',
        'prime adult stage',
        'Macaca_mulatta',
        'no diff expression',
        'high quality',
        'no data',
        'no data',
        '1.0',
        '0',
        '0',
        'no diff expression',
        'high quality',
        '0.6239275',
        '2',
        '0',
        'CIO:0000004',
        'medium confidence from single evidence',
      ],
      [
        '59',
        'ENSBTAG00000015398',
        'ZO1',
        'UBERON:0000948',
        'heart',
        'UBERON:0018241',
        'prime adult stage',
        'Bos_taurus',
        'over-expression',
        'high quality',
        'no data',
        'no data',
        '1.0',
        '0',
        '0',
        'over-expression',
        'high quality',
        '8.741838E-4',
        '1',
        '0',
        'CIO:0000004',
        'medium confidence from single evidence',
      ],
    ],
  },
];
const multiDiff = [
  {
    type: 'text',
    classNames: 'has-text-weight-semibold is-size-6',
    content:
      'Over-/under-expression across anatomy or life stages in multiple species',
    id: MULTI_DIFF_ID,
  },
  {
    type: 'notification',
    classNames: 'is-warning is-light',
    content: 'Please note, these data will be available in a future release.',
  },
  {
    type: 'text',
    content:
      'Bgee provides calls of over-/under-expression. A call corresponds to a gene, with significant variation of its level of expression, in an anatomical entity during a developmental stage, as compared to, either: i) other anatomical entities at the same (broadly defined) developmental stage (over-/under-expression across anatomy); ii) the same anatomical entity at different (precise) developmental stages (over-/under-expression across life stages). These analyses of differential expression are performed using Affymetrix and RNA-Seq experiments with at least 3 suitable conditions (anatomical entity/developmental stage), and at least 2 replicates for each; as for all data in Bgee, only "normal" expression is considered (i.e., no treatment, no disease, no gene knock-out, etc.).',
  },
  {
    type: 'rich_text',
    content: [
      {
        type: 'text',
        content:
          'Bgee runs all possible differential expression analyses for each experiment independently, then collects all results and provides a summary as unique calls ',
      },
      {
        type: 'code',
        content: 'gene - anatomical entity - developmental stage',
      },
      {
        type: 'text',
        content:
          ', with confidence information, and conflicts within each data type resolved using a voting system weighted by p-values (conflicts between different data types are treated differently). This offers the possibility to aggregate and compare these calls between different experiments, different data types, and different species.',
      },
    ],
  },
  {
    type: 'rich_text',
    content: [
      {
        type: 'text',
        content:
          'In multi-species files, results are made comparable between orthologous genes, in homologous anatomical entities and comparable developmental stages: only genes sharing a common ancestral gene in the least common ancestor of the species compared are studied, and only in anatomical entities sharing a homology relation between all species compared, with data mapped to broad developmental stages shared across animal kingdom (see ',
      },
      {
        type: 'link_anchor',
        path: MULTI_SPECIES_DL_FILES_ID,
        text: 'use of homology in multi-species files',
      },
      { type: 'text', content: ').' },
    ],
  },
  {
    type: 'text',
    content:
      'Note that, as opposed to calls of presence/absence of expression, no propagation of differential expression calls is performed using anatomical and life stage ontologies.',
  },
  {
    type: 'rich_text',
    content: [
      {
        type: 'text',
        content:
          'Over-/under-expression calls are then filtered and presented differently depending on whether a ',
      },
      { type: 'code', content: 'simple file' },
      { type: 'text', content: ', or a ' },
      { type: 'code', content: 'complete file' },
      { type: 'text', content: ' is used. Notably: ' },
      { type: 'code', content: 'simple files' },
      {
        type: 'text',
        content:
          ' aim at providing one line per gene orthology group and homologous anatomical entities/developmental stage, and only for anatomical entities with a homology relation defined with good level of confidence. ',
      },
      { type: 'code', content: 'complete files' },
      {
        type: 'text',
        content:
          ' aim at reporting all information, for each gene of the orthology groups, using all available homology relations between anatomical entities, and allowing for instance to retrieve the contribution of each data type to a call, or to retrieve all genes and conditions tested, including genes having no differential expression in these conditions.',
      },
    ],
  },
  { type: 'text', content: 'Jump to format description for:' },
  {
    type: 'unordered_list',
    children: [
      { type: 'link_anchor', path: MULTI_DIFF_SIMPLE_ID, text: 'simple file' },
      {
        type: 'link_anchor',
        path: MULTI_DIFF_COMPLETE_ID,
        text: 'complete file',
      },
    ],
  },
  ...multiDiffSimple,
  ...multiDiffComplete,
];

const geneExpCalls = [
  { type: 'title', content: 'Expression call download file documentation' },
  {
    type: 'rich_text',
    classNames: 'mb-2',
    content: [
      {
        type: 'text',
        content:
          'Bgee provides calls of baseline presence/absence of expression, and of differential over-/under-expression, either for single species, or compared between species (orthologous genes in homologous organs). This documentation describes the format of these ',
      },
      {
        type: 'link_internal',
        path: PATHS.DOWNLOAD.GENE_EXPRESSION_CALLS,
        text: 'download files',
      },
      { type: 'text', content: '.' },
    ],
  },
  {
    type: 'link_anchor',
    selector: LINK_ANCHOR.GENE_EXPRESSION_CALLS.SINGLE_SPECIES_DL_FILES_ID,
    text: 'Single-species download files',
  },
  {
    type: 'link_anchor',
    classNames: 'ml-6',
    selector: LINK_ANCHOR.GENE_EXPRESSION_CALLS.SINGLE_EXPR_ID,
    text: 'Presence/absence of expression',
  },
  {
    type: 'link_anchor',
    classNames: 'ml-6',
    selector: LINK_ANCHOR.GENE_EXPRESSION_CALLS.SINGLE_DIFF_ID,
    text: 'Over-/under-expression across anatomy or life stages',
  },
  {
    type: 'link_anchor',
    selector: MULTI_SPECIES_DL_FILES_ID,
    text: 'Multi-species download files',
  },
  {
    type: 'link_anchor',
    classNames: 'ml-6',
    selector: OMA_HOG_ID,
    text: 'OMA Hierarchical orthologous groups',
  },
  {
    type: 'link_anchor',
    classNames: 'ml-6',
    selector: MULTI_DIFF_ID,
    text: 'Over-/under-expression across anatomy or life stages',
  },

  {
    type: 'section',
    title: 'Single-species download files',
    id: LINK_ANCHOR.GENE_EXPRESSION_CALLS.SINGLE_SPECIES_DL_FILES_ID,
    children: [
      {
        type: 'text',
        content: 'Jump to:',
      },
      {
        type: 'unordered_list',
        children: [
          {
            type: 'link_anchor',
            selector: LINK_ANCHOR.GENE_EXPRESSION_CALLS.SINGLE_EXPR_ID,
            text: 'Presence/absence of expression',
          },
          {
            type: 'link_anchor',
            selector: LINK_ANCHOR.GENE_EXPRESSION_CALLS.SINGLE_DIFF_ID,
            text: 'Over-/under-expression across anatomy or life stages',
          },
        ],
      },
      ...singleExpr,
      ...singleDiff,
    ],
  },
  {
    type: 'section',
    title: 'Multi-species download files',
    id: MULTI_SPECIES_DL_FILES_ID,
    children: [
      {
        type: 'text',
        content:
          'Bgee provides the ability to compare expression data between species, with great anatomical detail, using formal concepts of homology: orthology of genes, homology of anatomical entities. This allows to perform accurate comparisons between species, even for distant species for which the anatomy mapping might not be obvious.',
      },
      {
        type: 'unordered_list',
        children: [
          {
            type: 'rich_text',
            content: [
              {
                type: 'underline',
                content: 'homology of anatomical entities:',
              },
              {
                type: 'text',
                content:
                  ' When comparing multiple species, only anatomical entities homologous between all species compared are considered, meaning, only anatomical entities derived from an organ existing before the divergence of the species compared. This requires careful annotations of the homology history of animal anatomy. These annotations are described in a separate project maintained by the Bgee team, see ',
              },
              {
                type: 'link_external',
                path: 'https://github.com/BgeeDB/anatomical-similarity-annotations/',
                text: 'homology annotation project on GitHub',
              },
              { type: 'text', content: '.' },
              { type: 'break_line' },
              {
                type: 'text',
                content:
                  'In practice, when comparing expression data between several species, the anatomical entities used are those with a homology relation valid for their Least Common Ancestor (LCA), or any of its ancestral taxa. For instance, if comparing data between human and zebrafish, the LCA would be the taxon ',
              },
              { type: 'italic', content: 'Euteleostomi' },
              {
                type: 'text',
                content:
                  '; as a result, annotations to this taxon would be used, such as the relation of homology between "tetrapod parietal bone" (UBERON:0000210) and "actinopterygian frontal bone" (UBERON:0004866); but also, annotations to ancestral taxa, such as the annotation stating that "ophthalmic nerve" appeared in the ',
              },
              { type: 'italic', content: 'Vertebrata ' },
              {
                type: 'text',
                content:
                  ' common ancestor; annotations to more recent taxa than the LCA would be discarded, such as the annotation to the "forelimb" structure (UBERON:0002102), homologous in the ',
              },
              { type: 'italic', content: 'Tetrapoda ' },
              { type: 'text', content: ' lineage.' },
            ],
          },
          {
            type: 'rich_text',
            content: [
              { type: 'underline', content: 'orthology of genes:' },
              {
                type: 'text',
                content:
                  ' relations of orthology between genes are retrieved using ',
              },
              {
                type: 'link_external',
                path: 'https://omabrowser.org/oma/hogs/',
                text: 'OMA',
              },
              {
                type: 'text',
                content:
                  '; when comparing several species, Bgee identifies their Least Common Ancestor (LCA), and retrieve genes that have descended from a single common ancestral gene in that LCA. Relations of orthology between genes are provided in Bgee through ',
              },
              {
                type: 'link_anchor',
                selector: OMA_HOG_ID,
                text: 'hierarchical orthologous groups files',
              },
              { type: 'text', content: '.' },
            ],
          },
        ],
      },
      {
        type: 'text',
        content: 'Jump to:',
      },
      {
        type: 'unordered_list',
        children: [
          {
            type: 'link_anchor',
            selector: OMA_HOG_ID,
            text: 'OMA Hierarchical orthologous groups',
          },
          {
            type: 'link_anchor',
            selector: MULTI_DIFF_ID,
            text: 'Over-/under-expression across anatomy or life stages',
          },
        ],
      },
      ...omaHog,
      ...multiDiff,
    ],
  },
];

export default geneExpCalls;
