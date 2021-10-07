let RUN_JOB_INCREMENTAL = -1;
const topAnat = {
  autoCompleteForegroundGenes: () =>
    new Promise((res) =>
      res({
        code: 200,
        status: 'SUCCESS',
        message: '5 IDs provided: 3 unique genes found in human',
        data: {
          fg_list: {
            geneCount: {
              9606: 3,
              10090: 1,
              '-1': 1,
            },
            detectedSpecies: {
              9606: {
                genus: 'Homo',
                speciesName: 'sapiens',
                genomeVersion: 'GRCh38.p5',
                genomeSource: {
                  xRefUrl:
                    'http://mar2016.archive.ensembl.org/[species_ensembl_link]/Gene/Summary?g=[gene_id]',
                  experimentUrl: '',
                  evidenceUrl: '',
                  baseUrl: 'http://www.ensembl.org/',
                  releaseDate: 'Mar 17, 2016',
                  releaseVersion: '84',
                  toDisplay: true,
                  category: 'GENOMICS',
                  displayOrder: 1,
                  name: 'Ensembl',
                  description:
                    'Source for gene annotations, mappings to the Gene Ontology, mappings to Affymetrix probeset IDs, and cross-references to other databases',
                  id: 2,
                },
                parentTaxonId: 9605,
                genomeSpeciesId: 9606,
                preferredDisplayOrder: 1,
                name: 'human',
                id: 9606,
              },
              10090: {
                genus: 'Mus',
                speciesName: 'musculus',
                genomeVersion: 'GRCm38.p4',
                genomeSource: {
                  xRefUrl:
                    'http://mar2016.archive.ensembl.org/[species_ensembl_link]/Gene/Summary?g=[gene_id]',
                  experimentUrl: '',
                  evidenceUrl: '',
                  baseUrl: 'http://www.ensembl.org/',
                  releaseDate: 'Mar 17, 2016',
                  releaseVersion: '84',
                  toDisplay: true,
                  category: 'GENOMICS',
                  displayOrder: 1,
                  name: 'Ensembl',
                  description:
                    'Source for gene annotations, mappings to the Gene Ontology, mappings to Affymetrix probeset IDs, and cross-references to other databases',
                  id: 2,
                },
                parentTaxonId: 862507,
                genomeSpeciesId: 10090,
                preferredDisplayOrder: 2,
                name: 'mouse',
                id: 10090,
              },
            },
            selectedSpecies: 9606,
            stages: [
              {
                tooGranular: false,
                groupingStage: true,
                leftBound: 80,
                rightBound: 639,
                level: 2,
                name: 'embryo stage',
                description:
                  'A life cycle stage that starts with fertilization and ends with the fully formed embryo.',
                id: 'UBERON:0000068',
              },
              {
                tooGranular: false,
                groupingStage: true,
                leftBound: 640,
                rightBound: 1881,
                level: 2,
                name: 'post-embryonic stage',
                description:
                  'stage succeeding embryo, including mature structure',
                id: 'UBERON:0000092',
              },
            ],
            notInSelectedSpeciesGeneIds: ['ENSMUSG00000023010'],
            undeterminedGeneIds: ['FAKE_GENE_ID'],
          },
        },
      })
    ),
  runJob: () => {
    RUN_JOB_INCREMENTAL += 1;
    return new Promise((res) => {
      if (RUN_JOB_INCREMENTAL % 2 === 0)
        res({
          code: 200,
          status: 'SUCCESS',
          message: 'The results already exist.',
          data: {
            jobResponse: {
              jobId: 0,
              jobStatus: 'UNDEFINED',
              data: '69cebbbb32eb17d27f03da87ef0ebf825f681b4e',
            },
          },
        });
      res({
        code: 200,
        status: 'SUCCESS',
        message: 'Job is RUNNING',
        data: {
          jobResponse: {
            jobId: 1700952,
            jobStatus: 'RUNNING',
            data: '69cebbbb32eb17d27f03da87ef0ebf825f681b4e',
          },
        },
      });
    });
  },
};
export default topAnat;
