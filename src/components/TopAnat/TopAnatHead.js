import React from 'react';
import { Link } from 'react-router-dom';
import staticBuilder from '../../helpers/staticBuilder';
import TopAnatHistoryModal from './TopAnatHistoryModal';
import PATHS from '../../routes/paths';
import Bulma from '../Bulma';
import i18n from '../../i18n';
import Tooltip from '../Tooltip';

const staticContent = [
  {
    type: 'title',
    content: 'TopAnat - Gene Expression Enrichment',
  },
  {
    type: 'rich_text',
    content: [
      {
        type: 'text',
        content:
          'GO-like enrichment of anatomical terms, mapped to genes by expression patterns. It is possible to run TopAnat using our ',
      },
      {
        type: 'link_external',
        path: 'https://bioconductor.org/packages/BgeeDB/',
        text: 'BgeeDB R package',
      },
      {
        type: 'text',
        content:
          '. This is the same as this web-service, but with more flexibility in the choice of parameters and developmental stages, and is based on the ',
      },
      {
        type: 'link_external',
        path: 'https://bioconductor.org/packages/topGO/',
        text: 'topGO package',
      },
      {
        type: 'text',
        content: '.',
      },
    ],
  },
];
const EXAMPLES = [
  {
    id: '0e165086d430555eda6d6ee5693519ae6c437536',
    description:
      'Autism spectrum associated genes from Satterstrom et al. 2020 https://doi.org/10.1016/j.cell.2019.12.036',
  },
  {
    id: 'f3fede86b7cc61a7d8239c31bac012da77ab797b',
    description: 'Mouse genes mapped to the GO term "spermatogenesis".',
  },
  {
    id: 'b7d412c35f14b5574305c078b1053b026df315eb',
    description:
      'Zebrafish 3R ohnologs from Roux et al. 2017 https://doi.org/10.1093/molbev/msx199 showing nervous system expression of 3R duplicates.',
  },
  {
    id: '2d80cdb2fa09681389f935d71d67c327558a09a1',
    description: 'Pigmentation genes in rabbit.',
  },
  {
    id: '9bbddda9dea22c21edcada56ad552a35cb8e29a7',
    description: 'COVID-19 related human genes.',
  },
];

const TopAnatHead = () => (
  <>
    {staticBuilder(staticContent)}
    <div className="my-4 is-flex">
      <TopAnatHistoryModal />
      <Link
        to={PATHS.SUPPORT.TOP_ANAT}
        className="button is-bgee-link is-outlined mr-2"
      >
        <Bulma.IonIcon name="newspaper-outline" />
        <span>{i18n.t('analysis.top-anat.documentation')}</span>
      </Link>
      <div className="is-align-items-center is-flex">
        <span className="icon-text">
          <Bulma.IonIcon name="bookmarks-sharp" />
          <span>{i18n.t('analysis.top-anat.examples')}</span>
        </span>
        <div className="ml-1 buttons has-addons">
          {EXAMPLES.map((ex, key) => (
            <Tooltip
              key={ex.id}
              title={`Example ${key + 1}`}
              content={ex.description}
            >
              <Link
                to={PATHS.ANALYSIS.TOP_ANAT_RESULT.replace(':id', ex.id)}
                className="button is-bgee-link is-outlined"
              >
                <span>{key + 1}</span>
              </Link>
            </Tooltip>
          ))}
        </div>
      </div>
    </div>
  </>
);

export default TopAnatHead;
