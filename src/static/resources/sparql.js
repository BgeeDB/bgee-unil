import PATHS from '../../routes/paths';
import { APP_VERSION_URL } from '../../helpers/constants';

const sparql = [
  {
    type: 'title',
    content: 'Bgee SPARQL endpoint',
  },
  {
    type: 'rich_text',
    content: [
      {
        type: 'text',
        content:
          'Bgee has a SPARQL endpoint which is based on the EasyBgee database (',
      },
      {
        type: 'link_external',
        path: 'https://github.com/BgeeDB/bgee_pipeline/tree/master/pipeline/easybgee_creation',
        text: 'see documentation on Bgee pipeline github',
      },
      {
        type: 'text',
        content:
          '). EasyBgee is a view of the Bgee database, that contains most useful, and explicit information.',
      },
    ],
  },
  {
    type: 'section',
    title: 'Web interface to query the Bgee SPARQL endpoint',
    children: [
      {
        type: 'rich_text',
        content: [
          {
            type: 'text',
            content: 'Bgee SPARQL queries can be run using the web interface ',
          },
          {
            type: 'link_external',
            path: 'http://biosoda.expasy.org/',
            text: 'Bio-Query',
          },
          {
            type: 'text',
            content: ' search created for the ',
          },
          {
            type: 'link_internal',
            path: PATHS.ABOUT.COLLABORATIONS,
            text: 'BioSODA project',
          },
          {
            type: 'text',
            content: '. Bgee specific queries are present under the category ',
          },
          {
            type: 'code',
            content: 'Bgee database queries',
          },
          {
            type: 'text',
            content:
              '. It is possible to see the SPARQL queries and edit them by clicking on the ',
          },
          {
            type: 'code',
            classNames: 'bio-query',
            content: ' Show SPARQL Query Editor',
          },
          {
            type: 'text',
            content:
              ' button. Moreover, Bio-Query allows for writing federated queries among UniProt, OMA and Bgee SPARQL endpoints.',
          },
        ],
      },
    ],
  },
  {
    type: 'section',
    title:
      'Programmatic access to the latest version of the Bgee SPARQL endpoint',
    children: [
      {
        type: 'rich_text',
        classNames: 'has-text-centered has-text-weight-bold',
        content: [
          {
            type: 'text',
            content: 'The latest version of the Bgee SPARQL endpoint is currently under maintainance.',
          },
          {
            type: 'break_line',
          },
          {
            type: 'text',
            content: 'We expect it to be back in a couple hours.',
          },
          {
            type: 'break_line',
          },
          {
            type: 'text',
            content: 'Until it is back please use the stable programmatic access to this version of the Bgee SPARQL endpoint as described in the next section.',
          },
        ],
      },
    ],
  },
  {
    type: 'section',
    title:
      'Stable programmatic access to this version of the Bgee SPARQL endpoint',
    children: [
      {
        type: 'text',
        content:
          'This version of the Bgee SPARQL endpoint is accessible in a stable manner by using your prefered programming language through the stable URL address below:',
      },
      {
        type: 'rich_text',
        classNames: 'has-text-centered has-text-weight-semibold',
        content: [
          {
            type: 'link_external',
            path: `https://bgee.org/sparql${APP_VERSION_URL}/`,
            text: `https://bgee.org/sparql${APP_VERSION_URL}/`,
          },
        ],
      },
      {
        type: 'text',
        content: `In the SELECT section of your query, it is essential to specify the URL of the graph you want to query (https://bgee.org/rdf_v${APP_VERSION_URL}), otherwise you won't be using the data for this version. For example, to retrieve all anatomic entities in Rattus norvegicus where the APOC1 gene is expressed, the query is:`,
      },
      {
        type: 'pre_code',
        content: `PREFIX orth: <http://purl.org/net/orth#>
PREFIX genex: <http://purl.org/genex#>
PREFIX obo: <http://purl.obolibrary.org/obo/>
SELECT DISTINCT ?anatEntity ?anatName FROM <https://bgee.org/rdf_v${APP_VERSION_URL}>{
    ?seq a orth:Gene;
         orth:organism ?organism ;
         rdfs:label ?geneName .
    ?organism obo:RO_0002162 <http://purl.uniprot.org/taxonomy/10116> . #in_taxon
    ?seq genex:isExpressedIn ?anatEntity.
    ?anatEntity a genex:AnatomicalEntity .
    ?anatEntity rdfs:label ?anatName .
    FILTER (LCASE(?geneName) = LCASE('APOC1'))
}`,
      },
      {
        type: 'rich_text',
        content: [
          {
            type: 'text',
            content: 'Again, ',
          },
          {
            type: 'bold',
            content:
              'it is essential to specify the name of the graph of the version to target',
          },
          {
            type: 'text',
            content: ` (in the example above, https://bgee.org/rdf_v${APP_VERSION_URL}); otherwise, results will be incorrect.`,
          },
        ],
      },
    ],
  },
  {
    type: 'section',
    title: 'RDF serialisation and semantic models',
    children: [
      {
        type: 'rich_text',
        content: [
          {
            type: 'text',
            content:
              "The Bgee RDF data were created using an Ontology Based Data Access (OBDA) approach so-called Ontop. The RDF serialisation of the 'EasyBgee' database is based on the ",
          },
          {
            type: 'link_external',
            path: 'https://biosoda.github.io/genex/',
            text: 'GenEx semantic model specification',
          },
          {
            type: 'text',
            content: ' and the OBDA mappings defined in ',
          },
          {
            type: 'link_external',
            path: 'https://github.com/biosoda/bioquery/tree/master/Bgee_OBDA_mappings',
            text: 'OBDA mappings',
          },
          {
            type: 'text',
            content: '. The mappings are defined using the ',
          },
          {
            type: 'link_external',
            path: 'https://github.com/ontop/ontop/wiki/ontopOBDAModel',
            text: 'Ontop mapping language',
          },
          {
            type: 'text',
            content: '. We also inferred all implicit information based on ',
          },
          {
            type: 'link_external',
            path: 'https://www.w3.org/TR/owl2-profiles/#OWL_2_QL',
            text: 'OWL 2 Web Ontology Language Profile QL',
          },
          {
            type: 'text',
            content: ' reasoning over GenEx.',
          },
        ],
      },
      {
        type: 'rich_text',
        content: [
          {
            type: 'text',
            content:
              'To cross-reference other resources, this SPARQL endpoint contains annotation property assertions defined by a first draft of the life-sciences cross-reference (LSCR) ontology that is available to download at the ',
          },
          {
            type: 'link_external',
            path: 'https://github.com/qfo/OrthologyOntology',
            text: 'Quest for Orthologs GitHub',
          },
          {
            type: 'text',
            content: ' repository ',
          },
          {
            type: 'link_external',
            path: 'https://github.com/qfo/OrthologyOntology/blob/master/lscr.ttl',
            text: 'here',
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

export default sparql;
