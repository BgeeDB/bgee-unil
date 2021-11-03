import PATHS from '../../routes/paths';

const topAnat = [
  {
    type: 'title',
    content: 'TopAnat documentation',
  },
  {
    type: 'text',
    classNames: 'mb-2',
    content:
      'TopAnat is a tool to identify and visualize enriched anatomical terms, from the expression patterns of a list of genes.',
  },
  {
    type: 'break_line',
  },
  {
    type: 'text',
    classNames: 'mb-2',
    content:
      'It allows to discover where genes from a set are preferentially expressed, as compared to a background, represented by default by all expression data in Bgee for the requested species. It is is similar to a Gene Ontology enrichment test, except that it analyzes the anatomical structures where genes are expressed, rather than their GO functional annotations.',
  },
  {
    type: 'break_line',
  },
  {
    type: 'rich_text',
    classNames: 'mb-2',
    content: [
      {
        type: 'text',
        content: 'See also our ',
      },
      {
        type: 'link_external',
        path: 'https://bgeedb.wordpress.com/category/topanat/',
        text: 'blog post',
      },
      {
        type: 'text',
        content: ' about TopAnat for more information.',
      },
    ],
  },
  {
    type: 'rich_text',
    content: [
      {
        type: 'bold',
        content: 'Please note that the results can be slow to compute',
      },
      {
        type: 'text',
        content:
          ', typically from 5 to 30 minutes, depending on the amount of data to process.',
      },
    ],
  },
  {
    type: 'section',
    title: 'Quick start',
    children: [
      {
        type: 'bold',
        content: 'How to use',
      },
      {
        type: 'unordered_list',
        children: [
          {
            type: 'text',
            content:
              'Enter a list of gene identifiers into the first form field,',
          },
          {
            type: 'text',
            content: 'Optionally, enter a list of background genes,',
          },
          {
            type: 'text',
            content:
              'Optionally, change the program parameters with the dropdown menu.',
          },
          {
            type: 'text',
            content: "Click the 'Submit your job' button.",
          },
        ],
      },
      {
        type: 'bold',
        content: 'Examples',
      },
      {
        type: 'unordered_list',
        children: [
          {
            type: 'link_internal',
            path: PATHS.ANALYSIS.TOP_ANAT_RESULT.replace(
              ':id',
              '00fecfca04bf1b2cf88ced9b0a937d68f0eea6cb'
            ),
            text: 'Mouse genes mapped to the GO term "spermatogenesis".',
          },
          {
            type: 'link_internal',
            path: PATHS.ANALYSIS.TOP_ANAT_RESULT.replace(
              ':id',
              '8fce889da7b4519c5792573ed3933032c8122819'
            ),
            text: 'Human genes involved in autism and epilepsy, with decorrelation.',
          },
          {
            type: 'link_internal',
            path: PATHS.ANALYSIS.TOP_ANAT_RESULT.replace(
              ':id',
              '84856e72021dfc1f6823951e5bace0b34fdc9382'
            ),
            text: 'Mouse genes mapped to the GO term "neurological system process", with decorrelation and high quality data only.',
          },
          {
            type: 'link_internal',
            path: PATHS.ANALYSIS.TOP_ANAT_RESULT.replace(
              ':id',
              '7e8c74c073be03be4c40810c16c6be06c0bef1be'
            ),
            text: "Cow genes with the keyword 'muscle' in their UniProtKB/Swiss-Prot description.",
          },
          {
            type: 'link_internal',
            path: PATHS.ANALYSIS.TOP_ANAT_RESULT.replace(
              ':id',
              '5fc8ff1fcfed7cfba0f82f82a67b418ce8a709b6'
            ),
            text: 'Platypus genes located on X chromosome.',
          },
        ],
      },
    ],
  },
  {
    type: 'section',
    title: 'Note of caution',
    children: [
      {
        type: 'text',
        content:
          "In your analyses, you should be extremely careful about the definition of your universe (i.e., your background genes). The cases where it is correct to use the default background (i.e., all genes with data in Bgee for the selected species) should be actually rare. For instance, if you are studying a list of genes assigned to a specific GO category, then your universe should be 'all genes with a GO annotation', and not 'all genes with data in Bgee'. Of course, it is still useful to use the default background, for preliminary analyses, or when the biological signal extracted from your gene list is very strong. But it should often be more rigorously defined for data used in publications.",
      },
    ],
  },
  {
    type: 'section',
    title: 'More information',
    children: [
      {
        type: 'rich_text',
        content: [
          {
            type: 'text',
            content: 'TopAnat is based on ',
          },
          {
            type: 'link_external',
            path: 'https://bioconductor.org/packages/topGO/',
            text: 'topGO',
          },
          {
            type: 'text',
            content: '. Adaptation of topGO courtesy of Adrian Alexa.',
          },
        ],
      },
    ],
  },
];

export default topAnat;
