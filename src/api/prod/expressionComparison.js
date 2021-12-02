import axios from 'axios';
import React from 'react';
import axiosInstance, { getAxiosAddNotif } from './constant';
import errorHandler from '../errorHandler';
import random from '../../helpers/random';

export const EXPRESSION_COMPARISON_API = {
  getResults: null,
};

const DEFAULT_PARAMETERS = (page = 'expression_comparison') => {
  const params = new URLSearchParams();
  params.append('page', page);

  return params;
};

/* Promise.resolve(resMultiSpeMock), */

const resSingleSpeMock = {
  code: 200,
  status: 'SUCCESS',
  data: {
    comparisonResults: [
      {
        condition: {
          anatEntity: {
            id: 'UBERON:0002107',
            name: 'liver',
          },
        },
        conservationScore: '1.00',
        maxExpressionScore: '87.54',
        genesExpressionPresent: [
          {
            geneId: 'ENSPPAG00000028134',
            name: 'SRRM4',
            species: {
              id: 9597,
              name: 'bonobo',
              genus: 'Pan',
              speciesName: 'paniscus',
              preferredDisplayOrder: 25,
            },
            geneMappedToSameGeneIdCount: 1,
          },
          {
            geneId: 'ENSPPAG00000028135',
            name: 'NBPF3',
            species: {
              id: 9597,
              name: 'bonobo',
              genus: 'Pan',
              speciesName: 'paniscus',
              preferredDisplayOrder: 25,
            },
            geneMappedToSameGeneIdCount: 1,
          },
        ],
        genesExpressionAbsent: [],
        genesNoData: [],
      },
      {
        condition: {
          anatEntity: {
            id: 'UBERON:0000473',
            name: 'testis',
          },
        },
        conservationScore: '1.00',
        maxExpressionScore: '94.84',
        genesExpressionPresent: [
          {
            geneId: 'ENSPPAG00000028134',
            name: 'SRRM4',
            species: {
              id: 9597,
              name: 'bonobo',
              genus: 'Pan',
              speciesName: 'paniscus',
              preferredDisplayOrder: 25,
            },
            geneMappedToSameGeneIdCount: 1,
          },
          {
            geneId: 'ENSPPAG00000028135',
            name: 'NBPF3',
            species: {
              id: 9597,
              name: 'bonobo',
              genus: 'Pan',
              speciesName: 'paniscus',
              preferredDisplayOrder: 25,
            },
            geneMappedToSameGeneIdCount: 1,
          },
        ],
        genesExpressionAbsent: [],
        genesNoData: [],
      },
      {
        condition: {
          anatEntity: {
            id: 'UBERON:0000082',
            name: 'adult mammalian kidney',
          },
        },
        conservationScore: '1.00',
        maxExpressionScore: '91.14',
        genesExpressionPresent: [
          {
            geneId: 'ENSPPAG00000028135',
            name: 'NBPF3',
            species: {
              id: 9597,
              name: 'bonobo',
              genus: 'Pan',
              speciesName: 'paniscus',
              preferredDisplayOrder: 25,
            },
            geneMappedToSameGeneIdCount: 1,
          },
        ],
        genesExpressionAbsent: [],
        genesNoData: [
          {
            geneId: 'ENSPPAG00000028134',
            name: 'SRRM4',
            species: {
              id: 9597,
              name: 'bonobo',
              genus: 'Pan',
              speciesName: 'paniscus',
              preferredDisplayOrder: 25,
            },
            geneMappedToSameGeneIdCount: 1,
          },
        ],
      },
      {
        condition: {
          anatEntity: {
            id: 'UBERON:0000451',
            name: 'prefrontal cortex',
          },
        },
        conservationScore: '1.00',
        maxExpressionScore: '85.60',
        genesExpressionPresent: [
          {
            geneId: 'ENSPPAG00000028134',
            name: 'SRRM4',
            species: {
              id: 9597,
              name: 'bonobo',
              genus: 'Pan',
              speciesName: 'paniscus',
              preferredDisplayOrder: 25,
            },
            geneMappedToSameGeneIdCount: 1,
          },
          {
            geneId: 'ENSPPAG00000028135',
            name: 'NBPF3',
            species: {
              id: 9597,
              name: 'bonobo',
              genus: 'Pan',
              speciesName: 'paniscus',
              preferredDisplayOrder: 25,
            },
            geneMappedToSameGeneIdCount: 1,
          },
        ],
        genesExpressionAbsent: [],
        genesNoData: [],
      },
      {
        condition: {
          anatEntity: {
            id: 'UBERON:0002037',
            name: 'cerebellum',
          },
        },
        conservationScore: '1.00',
        maxExpressionScore: '94.80',
        genesExpressionPresent: [
          {
            geneId: 'ENSPPAG00000028134',
            name: 'SRRM4',
            species: {
              id: 9597,
              name: 'bonobo',
              genus: 'Pan',
              speciesName: 'paniscus',
              preferredDisplayOrder: 25,
            },
            geneMappedToSameGeneIdCount: 1,
          },
          {
            geneId: 'ENSPPAG00000028135',
            name: 'NBPF3',
            species: {
              id: 9597,
              name: 'bonobo',
              genus: 'Pan',
              speciesName: 'paniscus',
              preferredDisplayOrder: 25,
            },
            geneMappedToSameGeneIdCount: 1,
          },
        ],
        genesExpressionAbsent: [],
        genesNoData: [],
      },
      {
        condition: {
          anatEntity: {
            id: 'UBERON:0000948',
            name: 'heart',
          },
        },
        conservationScore: '1.00',
        maxExpressionScore: '87.67',
        genesExpressionPresent: [
          {
            geneId: 'ENSPPAG00000028134',
            name: 'SRRM4',
            species: {
              id: 9597,
              name: 'bonobo',
              genus: 'Pan',
              speciesName: 'paniscus',
              preferredDisplayOrder: 25,
            },
            geneMappedToSameGeneIdCount: 1,
          },
          {
            geneId: 'ENSPPAG00000028135',
            name: 'NBPF3',
            species: {
              id: 9597,
              name: 'bonobo',
              genus: 'Pan',
              speciesName: 'paniscus',
              preferredDisplayOrder: 25,
            },
            geneMappedToSameGeneIdCount: 1,
          },
        ],
        genesExpressionAbsent: [],
        genesNoData: [],
      },
      {
        condition: {
          anatEntity: {
            id: 'UBERON:0001987',
            name: 'placenta',
          },
        },
        conservationScore: '1.00',
        maxExpressionScore: '80.04',
        genesExpressionPresent: [
          {
            geneId: 'ENSPPAG00000028135',
            name: 'NBPF3',
            species: {
              id: 9597,
              name: 'bonobo',
              genus: 'Pan',
              speciesName: 'paniscus',
              preferredDisplayOrder: 25,
            },
            geneMappedToSameGeneIdCount: 1,
          },
        ],
        genesExpressionAbsent: [],
        genesNoData: [
          {
            geneId: 'ENSPPAG00000028134',
            name: 'SRRM4',
            species: {
              id: 9597,
              name: 'bonobo',
              genus: 'Pan',
              speciesName: 'paniscus',
              preferredDisplayOrder: 25,
            },
            geneMappedToSameGeneIdCount: 1,
          },
        ],
      },
    ],
  },
};

const resMultiSpeMock = {
  code: 200,
  status: 'SUCCESS',
  data: {
    comparisonResults: [
      {
        multiSpeciesCondition: {
          anatEntities: [
            {
              id: 'UBERON:0002129',
              name: 'cerebellar cortex',
            },
          ],
          cellTypes: [],
        },
        conservationScore: '1.00',
        maxExpressionScore: '71.43',
        genesExpressionPresent: [
          {
            geneId: 'ENSPTRG00000005517',
            name: 'SRRM4',
            species: {
              id: 9598,
              name: 'chimpanzee',
              genus: 'Pan',
              speciesName: 'troglodytes',
              preferredDisplayOrder: 26,
            },
            geneMappedToSameGeneIdCount: 1,
          },
        ],
        genesExpressionAbsent: [],
        genesNoData: [
          {
            geneId: 'ENSPPAG00000028134',
            name: 'SRRM4',
            species: {
              id: 9597,
              name: 'bonobo',
              genus: 'Pan',
              speciesName: 'paniscus',
              preferredDisplayOrder: 25,
            },
            geneMappedToSameGeneIdCount: 1,
          },
        ],
      },
      {
        multiSpeciesCondition: {
          anatEntities: [
            {
              id: 'UBERON:0002107',
              name: 'liver',
            },
          ],
          cellTypes: [],
        },
        conservationScore: '1.00',
        maxExpressionScore: '16.03',
        genesExpressionPresent: [
          {
            geneId: 'ENSPPAG00000028134',
            name: 'SRRM4',
            species: {
              id: 9597,
              name: 'bonobo',
              genus: 'Pan',
              speciesName: 'paniscus',
              preferredDisplayOrder: 25,
            },
            geneMappedToSameGeneIdCount: 1,
          },
        ],
        genesExpressionAbsent: [],
        genesNoData: [
          {
            geneId: 'ENSPTRG00000005517',
            name: 'SRRM4',
            species: {
              id: 9598,
              name: 'chimpanzee',
              genus: 'Pan',
              speciesName: 'troglodytes',
              preferredDisplayOrder: 26,
            },
            geneMappedToSameGeneIdCount: 1,
          },
        ],
      },
      {
        multiSpeciesCondition: {
          anatEntities: [
            {
              id: 'UBERON:0000990',
              name: 'reproductive system',
            },
          ],
          cellTypes: [],
        },
        conservationScore: '1.00',
        maxExpressionScore: '12.50',
        genesExpressionPresent: [
          {
            geneId: 'ENSPPAG00000028134',
            name: 'SRRM4',
            species: {
              id: 9597,
              name: 'bonobo',
              genus: 'Pan',
              speciesName: 'paniscus',
              preferredDisplayOrder: 25,
            },
            geneMappedToSameGeneIdCount: 1,
          },
        ],
        genesExpressionAbsent: [],
        genesNoData: [
          {
            geneId: 'ENSPTRG00000005517',
            name: 'SRRM4',
            species: {
              id: 9598,
              name: 'chimpanzee',
              genus: 'Pan',
              speciesName: 'troglodytes',
              preferredDisplayOrder: 26,
            },
            geneMappedToSameGeneIdCount: 1,
          },
        ],
      },
      {
        multiSpeciesCondition: {
          anatEntities: [
            {
              id: 'UBERON:0000468',
              name: 'multicellular organism',
            },
          ],
          cellTypes: [],
        },
        conservationScore: '1.00',
        maxExpressionScore: '52.83',
        genesExpressionPresent: [
          {
            geneId: 'ENSPPAG00000028134',
            name: 'SRRM4',
            species: {
              id: 9597,
              name: 'bonobo',
              genus: 'Pan',
              speciesName: 'paniscus',
              preferredDisplayOrder: 25,
            },
            geneMappedToSameGeneIdCount: 1,
          },
          {
            geneId: 'ENSPTRG00000005517',
            name: 'SRRM4',
            species: {
              id: 9598,
              name: 'chimpanzee',
              genus: 'Pan',
              speciesName: 'troglodytes',
              preferredDisplayOrder: 26,
            },
            geneMappedToSameGeneIdCount: 1,
          },
        ],
        genesExpressionAbsent: [],
        genesNoData: [],
      },
      {
        multiSpeciesCondition: {
          anatEntities: [
            {
              id: 'UBERON:0000473',
              name: 'testis',
            },
          ],
          cellTypes: [],
        },
        conservationScore: '1.00',
        maxExpressionScore: '17.63',
        genesExpressionPresent: [
          {
            geneId: 'ENSPPAG00000028134',
            name: 'SRRM4',
            species: {
              id: 9597,
              name: 'bonobo',
              genus: 'Pan',
              speciesName: 'paniscus',
              preferredDisplayOrder: 25,
            },
            geneMappedToSameGeneIdCount: 1,
          },
        ],
        genesExpressionAbsent: [],
        genesNoData: [
          {
            geneId: 'ENSPTRG00000005517',
            name: 'SRRM4',
            species: {
              id: 9598,
              name: 'chimpanzee',
              genus: 'Pan',
              speciesName: 'troglodytes',
              preferredDisplayOrder: 26,
            },
            geneMappedToSameGeneIdCount: 1,
          },
        ],
      },
      {
        multiSpeciesCondition: {
          anatEntities: [
            {
              id: 'UBERON:0001950',
              name: 'neocortex',
            },
          ],
          cellTypes: [],
        },
        conservationScore: '1.00',
        maxExpressionScore: '64.82',
        genesExpressionPresent: [
          {
            geneId: 'ENSPPAG00000028134',
            name: 'SRRM4',
            species: {
              id: 9597,
              name: 'bonobo',
              genus: 'Pan',
              speciesName: 'paniscus',
              preferredDisplayOrder: 25,
            },
            geneMappedToSameGeneIdCount: 1,
          },
          {
            geneId: 'ENSPTRG00000005517',
            name: 'SRRM4',
            species: {
              id: 9598,
              name: 'chimpanzee',
              genus: 'Pan',
              speciesName: 'troglodytes',
              preferredDisplayOrder: 26,
            },
            geneMappedToSameGeneIdCount: 1,
          },
        ],
        genesExpressionAbsent: [],
        genesNoData: [],
      },
      {
        multiSpeciesCondition: {
          anatEntities: [
            {
              id: 'UBERON:0002436',
              name: 'primary visual cortex',
            },
          ],
          cellTypes: [],
        },
        conservationScore: '1.00',
        maxExpressionScore: '66.87',
        genesExpressionPresent: [
          {
            geneId: 'ENSPTRG00000005517',
            name: 'SRRM4',
            species: {
              id: 9598,
              name: 'chimpanzee',
              genus: 'Pan',
              speciesName: 'troglodytes',
              preferredDisplayOrder: 26,
            },
            geneMappedToSameGeneIdCount: 1,
          },
        ],
        genesExpressionAbsent: [],
        genesNoData: [
          {
            geneId: 'ENSPPAG00000028134',
            name: 'SRRM4',
            species: {
              id: 9597,
              name: 'bonobo',
              genus: 'Pan',
              speciesName: 'paniscus',
              preferredDisplayOrder: 25,
            },
            geneMappedToSameGeneIdCount: 1,
          },
        ],
      },
      {
        multiSpeciesCondition: {
          anatEntities: [
            {
              id: 'UBERON:0002423',
              name: 'hepatobiliary system',
            },
          ],
          cellTypes: [],
        },
        conservationScore: '1.00',
        maxExpressionScore: '16.03',
        genesExpressionPresent: [
          {
            geneId: 'ENSPPAG00000028134',
            name: 'SRRM4',
            species: {
              id: 9597,
              name: 'bonobo',
              genus: 'Pan',
              speciesName: 'paniscus',
              preferredDisplayOrder: 25,
            },
            geneMappedToSameGeneIdCount: 1,
          },
        ],
        genesExpressionAbsent: [],
        genesNoData: [
          {
            geneId: 'ENSPTRG00000005517',
            name: 'SRRM4',
            species: {
              id: 9598,
              name: 'chimpanzee',
              genus: 'Pan',
              speciesName: 'troglodytes',
              preferredDisplayOrder: 26,
            },
            geneMappedToSameGeneIdCount: 1,
          },
        ],
      },
      {
        multiSpeciesCondition: {
          anatEntities: [
            {
              id: 'UBERON:0000203',
              name: 'pallium',
            },
          ],
          cellTypes: [],
        },
        conservationScore: '1.00',
        maxExpressionScore: '64.93',
        genesExpressionPresent: [
          {
            geneId: 'ENSPPAG00000028134',
            name: 'SRRM4',
            species: {
              id: 9597,
              name: 'bonobo',
              genus: 'Pan',
              speciesName: 'paniscus',
              preferredDisplayOrder: 25,
            },
            geneMappedToSameGeneIdCount: 1,
          },
          {
            geneId: 'ENSPTRG00000005517',
            name: 'SRRM4',
            species: {
              id: 9598,
              name: 'chimpanzee',
              genus: 'Pan',
              speciesName: 'troglodytes',
              preferredDisplayOrder: 26,
            },
            geneMappedToSameGeneIdCount: 1,
          },
        ],
        genesExpressionAbsent: [],
        genesNoData: [],
      },
      {
        multiSpeciesCondition: {
          anatEntities: [
            {
              id: 'UBERON:0001869',
              name: 'cerebral hemisphere',
            },
          ],
          cellTypes: [],
        },
        conservationScore: '1.00',
        maxExpressionScore: '64.96',
        genesExpressionPresent: [
          {
            geneId: 'ENSPPAG00000028134',
            name: 'SRRM4',
            species: {
              id: 9597,
              name: 'bonobo',
              genus: 'Pan',
              speciesName: 'paniscus',
              preferredDisplayOrder: 25,
            },
            geneMappedToSameGeneIdCount: 1,
          },
          {
            geneId: 'ENSPTRG00000005517',
            name: 'SRRM4',
            species: {
              id: 9598,
              name: 'chimpanzee',
              genus: 'Pan',
              speciesName: 'troglodytes',
              preferredDisplayOrder: 26,
            },
            geneMappedToSameGeneIdCount: 1,
          },
        ],
        genesExpressionAbsent: [],
        genesNoData: [],
      },
      {
        multiSpeciesCondition: {
          anatEntities: [
            {
              id: 'UBERON:0001895',
              name: 'metencephalon',
            },
          ],
          cellTypes: [],
        },
        conservationScore: '1.00',
        maxExpressionScore: '80.34',
        genesExpressionPresent: [
          {
            geneId: 'ENSPPAG00000028134',
            name: 'SRRM4',
            species: {
              id: 9597,
              name: 'bonobo',
              genus: 'Pan',
              speciesName: 'paniscus',
              preferredDisplayOrder: 25,
            },
            geneMappedToSameGeneIdCount: 1,
          },
          {
            geneId: 'ENSPTRG00000005517',
            name: 'SRRM4',
            species: {
              id: 9598,
              name: 'chimpanzee',
              genus: 'Pan',
              speciesName: 'troglodytes',
              preferredDisplayOrder: 26,
            },
            geneMappedToSameGeneIdCount: 1,
          },
        ],
        genesExpressionAbsent: [],
        genesNoData: [],
      },
      {
        multiSpeciesCondition: {
          anatEntities: [
            {
              id: 'UBERON:0004535',
              name: 'cardiovascular system',
            },
          ],
          cellTypes: [],
        },
        conservationScore: '1.00',
        maxExpressionScore: '25.97',
        genesExpressionPresent: [
          {
            geneId: 'ENSPPAG00000028134',
            name: 'SRRM4',
            species: {
              id: 9597,
              name: 'bonobo',
              genus: 'Pan',
              speciesName: 'paniscus',
              preferredDisplayOrder: 25,
            },
            geneMappedToSameGeneIdCount: 1,
          },
        ],
        genesExpressionAbsent: [],
        genesNoData: [
          {
            geneId: 'ENSPTRG00000005517',
            name: 'SRRM4',
            species: {
              id: 9598,
              name: 'chimpanzee',
              genus: 'Pan',
              speciesName: 'troglodytes',
              preferredDisplayOrder: 26,
            },
            geneMappedToSameGeneIdCount: 1,
          },
        ],
      },
      {
        multiSpeciesCondition: {
          anatEntities: [
            {
              id: 'UBERON:0001017',
              name: 'central nervous system',
            },
          ],
          cellTypes: [],
        },
        conservationScore: '1.00',
        maxExpressionScore: '65.19',
        genesExpressionPresent: [
          {
            geneId: 'ENSPPAG00000028134',
            name: 'SRRM4',
            species: {
              id: 9597,
              name: 'bonobo',
              genus: 'Pan',
              speciesName: 'paniscus',
              preferredDisplayOrder: 25,
            },
            geneMappedToSameGeneIdCount: 1,
          },
          {
            geneId: 'ENSPTRG00000005517',
            name: 'SRRM4',
            species: {
              id: 9598,
              name: 'chimpanzee',
              genus: 'Pan',
              speciesName: 'troglodytes',
              preferredDisplayOrder: 26,
            },
            geneMappedToSameGeneIdCount: 1,
          },
        ],
        genesExpressionAbsent: [],
        genesNoData: [],
      },
      {
        multiSpeciesCondition: {
          anatEntities: [
            {
              id: 'UBERON:0000955',
              name: 'brain',
            },
          ],
          cellTypes: [],
        },
        conservationScore: '1.00',
        maxExpressionScore: '65.19',
        genesExpressionPresent: [
          {
            geneId: 'ENSPPAG00000028134',
            name: 'SRRM4',
            species: {
              id: 9597,
              name: 'bonobo',
              genus: 'Pan',
              speciesName: 'paniscus',
              preferredDisplayOrder: 25,
            },
            geneMappedToSameGeneIdCount: 1,
          },
          {
            geneId: 'ENSPTRG00000005517',
            name: 'SRRM4',
            species: {
              id: 9598,
              name: 'chimpanzee',
              genus: 'Pan',
              speciesName: 'troglodytes',
              preferredDisplayOrder: 26,
            },
            geneMappedToSameGeneIdCount: 1,
          },
        ],
        genesExpressionAbsent: [],
        genesNoData: [],
      },
      {
        multiSpeciesCondition: {
          anatEntities: [
            {
              id: 'UBERON:0005401',
              name: 'cerebral hemisphere gray matter',
            },
          ],
          cellTypes: [],
        },
        conservationScore: '1.00',
        maxExpressionScore: '64.93',
        genesExpressionPresent: [
          {
            geneId: 'ENSPPAG00000028134',
            name: 'SRRM4',
            species: {
              id: 9597,
              name: 'bonobo',
              genus: 'Pan',
              speciesName: 'paniscus',
              preferredDisplayOrder: 25,
            },
            geneMappedToSameGeneIdCount: 1,
          },
          {
            geneId: 'ENSPTRG00000005517',
            name: 'SRRM4',
            species: {
              id: 9598,
              name: 'chimpanzee',
              genus: 'Pan',
              speciesName: 'troglodytes',
              preferredDisplayOrder: 26,
            },
            geneMappedToSameGeneIdCount: 1,
          },
        ],
        genesExpressionAbsent: [],
        genesNoData: [],
      },
      {
        multiSpeciesCondition: {
          anatEntities: [
            {
              id: 'UBERON:0002037',
              name: 'cerebellum',
            },
          ],
          cellTypes: [],
        },
        conservationScore: '1.00',
        maxExpressionScore: '80.34',
        genesExpressionPresent: [
          {
            geneId: 'ENSPPAG00000028134',
            name: 'SRRM4',
            species: {
              id: 9597,
              name: 'bonobo',
              genus: 'Pan',
              speciesName: 'paniscus',
              preferredDisplayOrder: 25,
            },
            geneMappedToSameGeneIdCount: 1,
          },
          {
            geneId: 'ENSPTRG00000005517',
            name: 'SRRM4',
            species: {
              id: 9598,
              name: 'chimpanzee',
              genus: 'Pan',
              speciesName: 'troglodytes',
              preferredDisplayOrder: 26,
            },
            geneMappedToSameGeneIdCount: 1,
          },
        ],
        genesExpressionAbsent: [],
        genesNoData: [],
      },
      {
        multiSpeciesCondition: {
          anatEntities: [
            {
              id: 'UBERON:0001890',
              name: 'forebrain',
            },
          ],
          cellTypes: [],
        },
        conservationScore: '1.00',
        maxExpressionScore: '64.64',
        genesExpressionPresent: [
          {
            geneId: 'ENSPPAG00000028134',
            name: 'SRRM4',
            species: {
              id: 9597,
              name: 'bonobo',
              genus: 'Pan',
              speciesName: 'paniscus',
              preferredDisplayOrder: 25,
            },
            geneMappedToSameGeneIdCount: 1,
          },
          {
            geneId: 'ENSPTRG00000005517',
            name: 'SRRM4',
            species: {
              id: 9598,
              name: 'chimpanzee',
              genus: 'Pan',
              speciesName: 'troglodytes',
              preferredDisplayOrder: 26,
            },
            geneMappedToSameGeneIdCount: 1,
          },
        ],
        genesExpressionAbsent: [],
        genesNoData: [],
      },
      {
        multiSpeciesCondition: {
          anatEntities: [
            {
              id: 'UBERON:0002020',
              name: 'gray matter',
            },
          ],
          cellTypes: [],
        },
        conservationScore: '1.00',
        maxExpressionScore: '65.33',
        genesExpressionPresent: [
          {
            geneId: 'ENSPPAG00000028134',
            name: 'SRRM4',
            species: {
              id: 9597,
              name: 'bonobo',
              genus: 'Pan',
              speciesName: 'paniscus',
              preferredDisplayOrder: 25,
            },
            geneMappedToSameGeneIdCount: 1,
          },
          {
            geneId: 'ENSPTRG00000005517',
            name: 'SRRM4',
            species: {
              id: 9598,
              name: 'chimpanzee',
              genus: 'Pan',
              speciesName: 'troglodytes',
              preferredDisplayOrder: 26,
            },
            geneMappedToSameGeneIdCount: 1,
          },
        ],
        genesExpressionAbsent: [],
        genesNoData: [],
      },
      {
        multiSpeciesCondition: {
          anatEntities: [
            {
              id: 'UBERON:0000991',
              name: 'gonad',
            },
          ],
          cellTypes: [],
        },
        conservationScore: '1.00',
        maxExpressionScore: '17.63',
        genesExpressionPresent: [
          {
            geneId: 'ENSPPAG00000028134',
            name: 'SRRM4',
            species: {
              id: 9597,
              name: 'bonobo',
              genus: 'Pan',
              speciesName: 'paniscus',
              preferredDisplayOrder: 25,
            },
            geneMappedToSameGeneIdCount: 1,
          },
        ],
        genesExpressionAbsent: [],
        genesNoData: [
          {
            geneId: 'ENSPTRG00000005517',
            name: 'SRRM4',
            species: {
              id: 9598,
              name: 'chimpanzee',
              genus: 'Pan',
              speciesName: 'troglodytes',
              preferredDisplayOrder: 26,
            },
            geneMappedToSameGeneIdCount: 1,
          },
        ],
      },
      {
        multiSpeciesCondition: {
          anatEntities: [
            {
              id: 'UBERON:0001893',
              name: 'telencephalon',
            },
          ],
          cellTypes: [],
        },
        conservationScore: '1.00',
        maxExpressionScore: '64.96',
        genesExpressionPresent: [
          {
            geneId: 'ENSPPAG00000028134',
            name: 'SRRM4',
            species: {
              id: 9597,
              name: 'bonobo',
              genus: 'Pan',
              speciesName: 'paniscus',
              preferredDisplayOrder: 25,
            },
            geneMappedToSameGeneIdCount: 1,
          },
          {
            geneId: 'ENSPTRG00000005517',
            name: 'SRRM4',
            species: {
              id: 9598,
              name: 'chimpanzee',
              genus: 'Pan',
              speciesName: 'troglodytes',
              preferredDisplayOrder: 26,
            },
            geneMappedToSameGeneIdCount: 1,
          },
        ],
        genesExpressionAbsent: [],
        genesNoData: [],
      },
      {
        multiSpeciesCondition: {
          anatEntities: [
            {
              id: 'UBERON:0001016',
              name: 'nervous system',
            },
          ],
          cellTypes: [],
        },
        conservationScore: '1.00',
        maxExpressionScore: '65.19',
        genesExpressionPresent: [
          {
            geneId: 'ENSPPAG00000028134',
            name: 'SRRM4',
            species: {
              id: 9597,
              name: 'bonobo',
              genus: 'Pan',
              speciesName: 'paniscus',
              preferredDisplayOrder: 25,
            },
            geneMappedToSameGeneIdCount: 1,
          },
          {
            geneId: 'ENSPTRG00000005517',
            name: 'SRRM4',
            species: {
              id: 9598,
              name: 'chimpanzee',
              genus: 'Pan',
              speciesName: 'troglodytes',
              preferredDisplayOrder: 26,
            },
            geneMappedToSameGeneIdCount: 1,
          },
        ],
        genesExpressionAbsent: [],
        genesNoData: [],
      },
      {
        multiSpeciesCondition: {
          anatEntities: [
            {
              id: 'UBERON:0003528',
              name: 'brain gray matter',
            },
          ],
          cellTypes: [],
        },
        conservationScore: '1.00',
        maxExpressionScore: '65.33',
        genesExpressionPresent: [
          {
            geneId: 'ENSPPAG00000028134',
            name: 'SRRM4',
            species: {
              id: 9597,
              name: 'bonobo',
              genus: 'Pan',
              speciesName: 'paniscus',
              preferredDisplayOrder: 25,
            },
            geneMappedToSameGeneIdCount: 1,
          },
          {
            geneId: 'ENSPTRG00000005517',
            name: 'SRRM4',
            species: {
              id: 9598,
              name: 'chimpanzee',
              genus: 'Pan',
              speciesName: 'troglodytes',
              preferredDisplayOrder: 26,
            },
            geneMappedToSameGeneIdCount: 1,
          },
        ],
        genesExpressionAbsent: [],
        genesNoData: [],
      },
      {
        multiSpeciesCondition: {
          anatEntities: [
            {
              id: 'UBERON:0000948',
              name: 'heart',
            },
          ],
          cellTypes: [],
        },
        conservationScore: '0.00',
        maxExpressionScore: '25.97',
        genesExpressionPresent: [
          {
            geneId: 'ENSPPAG00000028134',
            name: 'SRRM4',
            species: {
              id: 9597,
              name: 'bonobo',
              genus: 'Pan',
              speciesName: 'paniscus',
              preferredDisplayOrder: 25,
            },
            geneMappedToSameGeneIdCount: 1,
          },
        ],
        genesExpressionAbsent: [
          {
            geneId: 'ENSPTRG00000005517',
            name: 'SRRM4',
            species: {
              id: 9598,
              name: 'chimpanzee',
              genus: 'Pan',
              speciesName: 'troglodytes',
              preferredDisplayOrder: 26,
            },
            geneMappedToSameGeneIdCount: 1,
          },
        ],
        genesNoData: [],
      },
      {
        multiSpeciesCondition: {
          anatEntities: [
            {
              id: 'UBERON:0002028',
              name: 'hindbrain',
            },
          ],
          cellTypes: [],
        },
        conservationScore: '1.00',
        maxExpressionScore: '80.34',
        genesExpressionPresent: [
          {
            geneId: 'ENSPPAG00000028134',
            name: 'SRRM4',
            species: {
              id: 9597,
              name: 'bonobo',
              genus: 'Pan',
              speciesName: 'paniscus',
              preferredDisplayOrder: 25,
            },
            geneMappedToSameGeneIdCount: 1,
          },
          {
            geneId: 'ENSPTRG00000005517',
            name: 'SRRM4',
            species: {
              id: 9598,
              name: 'chimpanzee',
              genus: 'Pan',
              speciesName: 'troglodytes',
              preferredDisplayOrder: 26,
            },
            geneMappedToSameGeneIdCount: 1,
          },
        ],
        genesExpressionAbsent: [],
        genesNoData: [],
      },
      {
        multiSpeciesCondition: {
          anatEntities: [
            {
              id: 'UBERON:0000949',
              name: 'endocrine system',
            },
          ],
          cellTypes: [],
        },
        conservationScore: '1.00',
        maxExpressionScore: '16.03',
        genesExpressionPresent: [
          {
            geneId: 'ENSPPAG00000028134',
            name: 'SRRM4',
            species: {
              id: 9597,
              name: 'bonobo',
              genus: 'Pan',
              speciesName: 'paniscus',
              preferredDisplayOrder: 25,
            },
            geneMappedToSameGeneIdCount: 1,
          },
        ],
        genesExpressionAbsent: [],
        genesNoData: [
          {
            geneId: 'ENSPTRG00000005517',
            name: 'SRRM4',
            species: {
              id: 9598,
              name: 'chimpanzee',
              genus: 'Pan',
              speciesName: 'troglodytes',
              preferredDisplayOrder: 26,
            },
            geneMappedToSameGeneIdCount: 1,
          },
        ],
      },
      {
        multiSpeciesCondition: {
          anatEntities: [
            {
              id: 'UBERON:0000956',
              name: 'cerebral cortex',
            },
          ],
          cellTypes: [],
        },
        conservationScore: '1.00',
        maxExpressionScore: '64.93',
        genesExpressionPresent: [
          {
            geneId: 'ENSPPAG00000028134',
            name: 'SRRM4',
            species: {
              id: 9597,
              name: 'bonobo',
              genus: 'Pan',
              speciesName: 'paniscus',
              preferredDisplayOrder: 25,
            },
            geneMappedToSameGeneIdCount: 1,
          },
          {
            geneId: 'ENSPTRG00000005517',
            name: 'SRRM4',
            species: {
              id: 9598,
              name: 'chimpanzee',
              genus: 'Pan',
              speciesName: 'troglodytes',
              preferredDisplayOrder: 26,
            },
            geneMappedToSameGeneIdCount: 1,
          },
        ],
        genesExpressionAbsent: [],
        genesNoData: [],
      },
      {
        multiSpeciesCondition: {
          anatEntities: [
            {
              id: 'UBERON:0000079',
              name: 'male reproductive system',
            },
          ],
          cellTypes: [],
        },
        conservationScore: '1.00',
        maxExpressionScore: '17.63',
        genesExpressionPresent: [
          {
            geneId: 'ENSPPAG00000028134',
            name: 'SRRM4',
            species: {
              id: 9597,
              name: 'bonobo',
              genus: 'Pan',
              speciesName: 'paniscus',
              preferredDisplayOrder: 25,
            },
            geneMappedToSameGeneIdCount: 1,
          },
        ],
        genesExpressionAbsent: [],
        genesNoData: [
          {
            geneId: 'ENSPTRG00000005517',
            name: 'SRRM4',
            species: {
              id: 9598,
              name: 'chimpanzee',
              genus: 'Pan',
              speciesName: 'troglodytes',
              preferredDisplayOrder: 26,
            },
            geneMappedToSameGeneIdCount: 1,
          },
        ],
      },
      {
        multiSpeciesCondition: {
          anatEntities: [
            {
              id: 'UBERON:0001007',
              name: 'digestive system',
            },
          ],
          cellTypes: [],
        },
        conservationScore: '1.00',
        maxExpressionScore: '16.03',
        genesExpressionPresent: [
          {
            geneId: 'ENSPPAG00000028134',
            name: 'SRRM4',
            species: {
              id: 9597,
              name: 'bonobo',
              genus: 'Pan',
              speciesName: 'paniscus',
              preferredDisplayOrder: 25,
            },
            geneMappedToSameGeneIdCount: 1,
          },
        ],
        genesExpressionAbsent: [],
        genesNoData: [
          {
            geneId: 'ENSPTRG00000005517',
            name: 'SRRM4',
            species: {
              id: 9598,
              name: 'chimpanzee',
              genus: 'Pan',
              speciesName: 'troglodytes',
              preferredDisplayOrder: 26,
            },
            geneMappedToSameGeneIdCount: 1,
          },
        ],
      },
    ],
  },
};

const expressionComparison = {
  getResults: (geneList) => Promise.resolve(resMultiSpeMock),
  /*     new Promise((resolve, reject) => {
      const params = DEFAULT_PARAMETERS();
      params.append('gene_list', geneList);
      params.append('display_type', 'json');
      axiosInstance
        .get(`/?${params.toString()}`, {
          cancelToken: new axios.CancelToken((c) => {
            EXPRESSION_COMPARISON_API.getResults = c;
          }),
        })
        .then(({ data }) => resolve(data))
        .catch((error) => {
          if (
            error?.response?.data?.code === 400 &&
            error?.response?.data?.data?.exceptionType ===
              'JobResultNotFoundException'
          ) {
            getAxiosAddNotif()({
              id: random.toString(),
              children: (
                <p>
                  Results were not present on our server, resubmitting the
                  analysis
                </p>
              ),
              className: `is-warning`,
            });
          } else {
            errorHandler(error);
          }
          reject(error?.response);
        });
    }), */
};

export default expressionComparison;
