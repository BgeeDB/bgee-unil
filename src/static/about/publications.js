import config from '../../config.json';

const publications = [
  {
    type: 'title',
    content: 'Publications',
  },
  {
    type: 'section',
    title: 'How to cite Bgee?',
    children: [
      {
        type: 'text',
        content: 'If you find Bgee useful please consider citing:',
      },
      {
        type: 'unordered_list',
        children: [
          {
            type: 'rich_text',
            content: [
              {
                type: 'text',
                content:
                  'Bastian FB, Roux J, Niknejad A, Comte A, Fonseca Costa SS, Mendes de Farias T, Moretti S, Parmentier G, Rech de Laval V, Rosikiewicz M, Wollbrett J, Echchiki A, Escoriza A, Gharib W, Gonzales-Porta M, Jarosz Y, Laurenczy B, Moret P, Person E, Roelli P, Sanjeev K, Seppey M, Robinson-Rechavi M. ',
              },
              {
                type: 'break_line',
              },
              {
                type: 'link_external',
                text: 'The Bgee suite: integrated curated expression atlas and comparative transcriptomics in animals',
                path: 'https://doi.org/10.1093/nar/gkaa793',
              },
              {
                type: 'break_line',
              },
              {
                type: 'italic',
                content: ' in ',
              },
              {
                type: 'text',
                content:
                  ' Nucleic Acids Research, Volume 49, Issue D1, 8 January 2021, Pages D831–D847.',
              },
              {
                type: 'link_external',
                text: 'RIS',
                path: `${config.ftpDomain}/general/citation_bgee_suite.ris`,
              },
            ],
          },
        ],
      },
      {
        type: 'text',
        content:
          'or choose the publication that best covers the Bgee aspects or components you used in your work from the list of publications below.',
      },
    ],
  },
  {
    type: 'section',
    title: 'How to cite specific components of Bgee?',
    children: [
      {
        type: 'unordered_list',
        children: [
          {
            type: 'rich_text',
            content: [
              {
                type: 'text',
                content: 'For the BgeeDB R package:',
              },
              {
                type: 'break_line',
              },
              {
                type: 'text',
                content:
                  'Komljenovic A, Roux J, Wollbrett J, Robinson-Rechavi M, Bastian F.',
              },
              {
                type: 'link_external',
                text: 'BgeeDB, an R package for retrieval of curated expression datasets and for gene list enrichment tests',
                path: 'https://f1000research.com/articles/5-2748/v2',
              },
              {
                type: 'break_line',
              },
              {
                type: 'italic',
                content: ' in ',
              },
              {
                type: 'text',
                content: 'F1000Research. 2018, 5:2748. ',
              },
              {
                type: 'link_external',
                text: 'RIS',
                path: `${config.ftpDomain}/general/citation05.ris`,
              },
            ],
          },
          {
            type: 'rich_text',
            content: [
              {
                type: 'text',
                content: 'For UBERON:',
              },
              {
                type: 'break_line',
              },
              {
                type: 'text',
                content:
                  'Haendel MA, Balhoff JP, Bastian FB, Blackburn DC, Blake JA, Bradford Y, Comte A, Dahdul WM, Dececchi TA, Druzinsky RE, Hayamizu TF, Ibrahim N, Lewis SE, Mabee PM, Niknejad A, Robinson-Rechavi M, Sereno PC, Mungall CJ.',
              },
              {
                type: 'break_line',
              },
              {
                type: 'link_external',
                text: 'Unification of multi-species vertebrate anatomy ontologies for comparative biology in Uberon',
                path: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4089931/',
              },
              {
                type: 'break_line',
              },
              {
                type: 'italic',
                content: ' in ',
              },
              {
                type: 'text',
                content: 'J Biomed Semantics. (2014): 5:21',
              },
              {
                type: 'link_external',
                text: 'RIS',
                path: `${config.ftpDomain}/general/citation04.ris`,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    type: 'section',
    title: 'Other publications',
    children: [
      {
        type: 'unordered_list',
        children: [
          {
            type: 'rich_text',
            content: [
              {
                type: 'text',
                content:
                  'Dingerdissen HM, Bastian FB, Vijay-Shanker K, Robinson-Rechavi M, Bell A, Gogate N, Gupta S, Holmes E, Kahsay R, Keeney J, Kincaid H, King CH, Liu D, Crichton DJ, Mazumder R.',
              },
              {
                type: 'break_line',
              },
              {
                type: 'link_external',
                text: 'OncoMX: A Knowledgebase for Exploring Cancer Biomarkers in the Context of Related Cancer and Healthy Data.',
                path: 'https://doi.org/10.1200/CCI.19.00117',
              },
              {
                type: 'break_line',
              },
              {
                type: 'italic',
                content: 'in ',
              },
              {
                type: 'text',
                content: 'JCO Clinical Cancer Informatics. 4. 210-220.',
              },
            ],
          },
          {
            type: 'rich_text',
            content: [
              {
                type: 'text',
                content:
                  'Chen Q, Britto R, Erill I, Jeffery CJ, Liberzon A, Magrane M, Onami J, Robinson-Rechavi M, Sponarova J, Zobel J, Karin Verspoor.',
              },
              {
                type: 'break_line',
              },
              {
                type: 'link_external',
                text: 'Quality Matters: Biocuration Experts on the Impact of Duplication and Other Data Quality.',
                path: 'https://doi.org/10.1016/j.gpb.2018.11.006',
              },
              {
                type: 'break_line',
              },
              {
                type: 'italic',
                content: 'in ',
              },
              {
                type: 'text',
                content: 'Genomics, Proteomics & Bioinformatics. 2020',
              },
            ],
          },
          {
            type: 'rich_text',
            content: [
              {
                type: 'text',
                content:
                  'Robinson-Rechavi M, Rech de Laval V, Bastian FB, Wollbrett J, Bgee Team.',
              },
              {
                type: 'break_line',
              },
              {
                type: 'link_external',
                text: 'The Expression Comparison Tool in Bgee.',
                path: 'https://hal.archives-ouvertes.fr/hal-02535720',
              },
              {
                type: 'break_line',
              },
              {
                type: 'italic',
                content: 'in ',
              },
              {
                type: 'text',
                content:
                  'Scornavacca, Celine; Delsuc, Frédéric; Galtier, Nicolas. Phylogenetics in the Genomic Era. No commercial publisher | Authors open access book, pp.4.3:1--4.3:4, 2020.',
              },
            ],
          },
          {
            type: 'rich_text',
            content: [
              {
                type: 'text',
                content:
                  'Sima AC, Mendes de Farias T, Zbinden E, Anisimova M, Gil M, Stockinger H, Stockinger K, Robinson-Rechavi M, Dessimoz C.',
              },
              {
                type: 'break_line',
              },
              {
                type: 'link_external',
                text: 'Enabling semantic queries across federated bioinformatics databases.',
                path: 'https://doi.org/10.1093/database/baz106',
              },
              {
                type: 'break_line',
              },
              {
                type: 'italic',
                content: 'in ',
              },
              {
                type: 'text',
                content: 'Database. Volume 2019, 2019, baz106.',
              },
            ],
          },
          {
            type: 'rich_text',
            content: [
              {
                type: 'text',
                content: 'Mendes de Farias T, Stockinger H, Dessimoz C.',
              },
              {
                type: 'break_line',
              },
              {
                type: 'link_external',
                text: 'VoIDext: Vocabulary and Patterns for Enhancing Interoperable Datasets with Virtual Links.',
                path: 'https://doi.org/10.1007/978-3-030-33246-4_38',
              },
              {
                type: 'break_line',
              },
              {
                type: 'italic',
                content: 'in ',
              },
              {
                type: 'text',
                content:
                  'On the Move to Meaningful Internet Systems: OTM 2019 Conferences. Lecture Notes in Computer Science. vol 11877.',
              },
            ],
          },
          {
            type: 'rich_text',
            content: [
              {
                type: 'text',
                content: 'SIB Swiss Institute of Bioinformatics Members.',
              },
              {
                type: 'break_line',
              },
              {
                type: 'link_external',
                text: 'The SIB Swiss Institute of Bioinformatics’ resources: focus on curated databases.',
                path: 'https://doi.org/10.1093/nar/gkv1310',
              },
              {
                type: 'break_line',
              },
              {
                type: 'italic',
                content: 'in ',
              },
              {
                type: 'text',
                content:
                  'Nucleic Acids Research.Volume 44, Issue D1, 4 January 2016, Pages D27–D37.',
              },
            ],
          },
          {
            type: 'rich_text',
            content: [
              {
                type: 'text',
                content:
                  'Bastian FB, Chibucos MC, Gaudet P, Giglio M, Holliday GL, Huang H, Lewis SE, Niknejad A, Orchard S, Poux S, Skunca N, Robinson-Rechavi M.',
              },
              {
                type: 'break_line',
              },
              {
                type: 'link_external',
                text: 'The Confidence Information Ontology: a step towards a standard for asserting confidence in annotations.',
                path: 'https://doi.org/10.1093/database/bav043',
              },
              {
                type: 'break_line',
              },
              {
                type: 'italic',
                content: 'in ',
              },
              {
                type: 'text',
                content: 'Database.Volume 2015, 2015.',
              },
            ],
          },
          {
            type: 'rich_text',
            content: [
              {
                type: 'text',
                content: 'Rosikiewicz M, Robinson-Rechavi M.',
              },
              {
                type: 'break_line',
              },
              {
                type: 'link_external',
                text: 'IQRray, a new method for Affymetrix microarray quality control, and the homologous organ conservation score, a new benchmark method for quality control metrics.',
                path: 'https://doi.org/10.1093/bioinformatics/btu027',
              },
              {
                type: 'break_line',
              },
              {
                type: 'italic',
                content: 'in ',
              },
              {
                type: 'text',
                content:
                  'Bioinformatics. Volume 30, Issue 10, 15 May 2014, Pages 1392–1399.',
              },
            ],
          },
          {
            type: 'rich_text',
            content: [
              {
                type: 'text',
                content:
                  'Niknejad A, Comte A, Parmentier G, Roux J, Bastian FB, Robinson-Rechavi M.',
              },
              {
                type: 'break_line',
              },
              {
                type: 'link_external',
                text: 'vHOG, a multispecies vertebrate ontology of homologous organs groups.',
                path: 'https://doi.org/10.1093/bioinformatics/bts048',
              },
              {
                type: 'break_line',
              },
              {
                type: 'italic',
                content: 'in ',
              },
              {
                type: 'text',
                content:
                  'Bioinformatics.Volume 28, Issue 7, 1 April 2012, Pages 1017–1020.',
              },
            ],
          },
          {
            type: 'rich_text',
            content: [
              {
                type: 'text',
                content: 'Roux J, Robinson-Rechavi M.',
              },
              {
                type: 'break_line',
              },
              {
                type: 'link_external',
                text: 'An ontology to clarify homology-related concepts.',
                path: 'https://doi.org/10.1016/j.tig.2009.12.012',
              },
              {
                type: 'break_line',
              },
              {
                type: 'italic',
                content: 'in ',
              },
              {
                type: 'text',
                content: 'Trends Genet. 2010;26(3):99-102.',
              },
            ],
          },
          {
            type: 'rich_text',
            content: [
              {
                type: 'text',
                content: 'Bastian F, Parmentier G, Robinson-Rechavi M.',
              },
              {
                type: 'break_line',
              },
              {
                type: 'link_external',
                text: 'Generating Homology Relationships by Alignment of Anatomical Ontologies.',
                path: 'https://www.nature.com/articles/npre.2009.3546.1',
              },
              {
                type: 'break_line',
              },
              {
                type: 'italic',
                content: 'in ',
              },
              {
                type: 'text',
                content: 'Nat Prec (2009).',
              },
            ],
          },
          {
            type: 'rich_text',
            content: [
              {
                type: 'text',
                content:
                  'Bastian FB, Parmentier G, Roux J, Moretti S, Laudet V, Robinson-Rechavi M.',
              },
              {
                type: 'break_line',
              },
              {
                type: 'link_external',
                text: 'Bgee: Integrating and Comparing Heterogeneous Transcriptome Data Among Species.',
                path: 'https://link.springer.com/chapter/10.1007/978-3-540-69828-9_12',
              },
              {
                type: 'break_line',
              },
              {
                type: 'italic',
                content: ' in ',
              },
              {
                type: 'text',
                content:
                  'DILS: Data Integration in Life Sciences. Lecture Notes in Computer Science. 5109:124-131.',
              },
              {
                type: 'link_external',
                text: 'RIS',
                path: `${config.ftpDomain}/general/citation01.ris`,
              },
            ],
          },
        ],
      },
    ],
  },
];

export default publications;
