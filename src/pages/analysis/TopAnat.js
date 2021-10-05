/* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions,jsx-a11y/label-has-associated-control */
import React from 'react';
import { Link } from 'react-router-dom';
import staticBuilder from '../../helpers/staticBuilder';
import i18n from '../../i18n';
import PATHS from '../../routes/paths';
import useForm from '../../hooks/useForm';
import TextArea from '../../components/Form/TextArea';
import Input from '../../components/Form/Input';
import Toggle from '../../components/Form/Toggle';
import Bulma from '../../components/Bulma';

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

const TopAnat = () => {
  const [expandOpts, setExpandOpts] = React.useState(false);
  const { data, handleChange, handleSubmit, errors } = useForm({
    initialValue: {
      genes: '',
      email: '',
      jobDescription: '',
      stages: 'all',
      dataQuality: 'all',
      decorrelationType: 'no',
      nodeSize: '20',
      nbNode: '20',
      fdrThreshold: '0.2',
      pValueThreshold: '1',
    },
    validations: {
      genes: {
        required: {
          value: true,
          message: 'The job needs to run with some genes.',
        },
      },
      email: {
        required: { value: true, message: 'Please enter your email' },
      },
      jobDescription: {
        required: { value: true, message: 'Enter a job description' },
      },
      stages: { required: { value: true, message: 'xxxxxxxxxxx' } },
      dataQuality: { required: { value: true, message: 'xxxxxxxxxxx' } },
      decorrelationType: {
        required: { value: true, message: 'xxxxxxxxxxx' },
      },
      nodeSize: {
        required: {
          value: true,
          message: 'Please choose a node size (ex: 20)',
        },
      },
      nbNode: {
        required: {
          value: true,
          message: 'Please choose a number of nodes (ex: 20)',
        },
      },
      fdrThreshold: {
        required: {
          value: true,
          message: 'Please choose a FDR threshold (ex: 0.2)',
        },
      },
      pValueThreshold: {
        required: {
          value: true,
          message: 'Please choose a p-value threshold (ex: 1)',
        },
      },
    },
  });

  return (
    <div>
      <Bulma.Section className="pt-5">
        {staticBuilder(staticContent)}
        <div className="my-4 is-flex">
          <div>
            <div className="buttons has-addons">
              <button className="button is-bgee-link is-outlined" type="button">
                <Bulma.IonIcon name="list-outline" />
                <span>{i18n.t('analysis.top-anat.recent-jobs')}</span>
              </button>
              <Link
                to={PATHS.SUPPORT.TOP_ANAT}
                className="button is-bgee-link is-outlined"
              >
                <Bulma.IonIcon name="newspaper-outline" />
                <span>{i18n.t('analysis.top-anat.documentation')}</span>
              </Link>
            </div>
          </div>
          <div className="is-align-items-center is-flex">
            <span className="icon-text">
              <Bulma.IonIcon name="bookmarks-sharp" />
              <span>{i18n.t('analysis.top-anat.examples')}</span>
            </span>
            <div className="ml-1 buttons has-addons">
              {EXAMPLES.map((ex, key) => (
                <Link
                  to={PATHS.ANALYSIS.TOP_ANAT_RESULT.replace(':id', ex.id)}
                  className="button is-bgee-link is-outlined"
                >
                  <span>{key + 1}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <Bulma.Columns>
          <Bulma.C size={4}>
            <article className="message  is-small">
              <div className="message-header">
                <p className="is-size-5">
                  {i18n.t('analysis.top-anat.gene-list')}
                </p>
              </div>
            </article>
            <div className="field">
              <TextArea
                rows={10}
                placeholder={i18n.t(
                  'analysis.top-anat.textarea-placeholder-gene-list'
                )}
                onChange={handleChange('genes')}
                error={errors.genes}
                value={data.genes}
              />
            </div>
          </Bulma.C>
          <Bulma.C size={8}>
            <a onClick={() => setExpandOpts(!expandOpts)}>
              <article className="message  is-small">
                <div className="message-header">
                  <p className="is-size-5">Advanced Options</p>
                  <span
                    className={`icon is-medium ${expandOpts ? 'open' : ''}`}
                  >
                    <ion-icon name="chevron-up-outline" size="large" />
                  </span>
                </div>
              </article>
            </a>
            <div
              className="mt-5"
              style={{ display: expandOpts ? 'block' : 'none' }}
            >
              <Bulma.Columns>
                <Bulma.C size={6}>
                  <div className="field">
                    <label className="label" htmlFor="stages">
                      Stages
                    </label>
                    <div className="field-body">
                      <div className="field">
                        <div className="control">
                          <Toggle
                            elements={[
                              { value: 'all', text: 'All stages' },
                              { value: 'custom', text: 'Custom stages' },
                            ]}
                            value={data.stages}
                            onChange={handleChange('stages', (v) => v)}
                            error={errors.stages}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </Bulma.C>
                <Bulma.C size={6}>
                  <div className="field">
                    <label className="label" htmlFor="dataQuality">
                      dataQuality
                    </label>
                    <div className="field-body">
                      <div className="field">
                        <div className="control">
                          <Toggle
                            elements={[
                              { value: 'all', text: 'All' },
                              { value: 'gold', text: 'Gold confidence' },
                            ]}
                            value={data.dataQuality}
                            onChange={handleChange('dataQuality', (v) => v)}
                            error={errors.dataQuality}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </Bulma.C>
              </Bulma.Columns>
              <Bulma.Columns>
                <Bulma.C size={12}>
                  <div className="field">
                    <label className="label" htmlFor="decorrelationType">
                      decorrelationType
                    </label>
                    <div className="field-body">
                      <div className="field">
                        <Toggle
                          elements={[
                            { value: 'no', text: 'No decorrelation' },
                            { value: 'elim', text: 'Elim' },
                            { value: 'weight', text: 'Weight' },
                            { value: 'parent-child', text: 'Parent-child' },
                          ]}
                          value={data.decorrelationType}
                          onChange={handleChange('decorrelationType', (v) => v)}
                          error={errors.decorrelationType}
                        />
                      </div>
                    </div>
                  </div>
                </Bulma.C>
              </Bulma.Columns>
              <Bulma.Columns>
                <Bulma.C size={6}>
                  <div className="field">
                    <label className="label" htmlFor="nodeSize">
                      nodeSize
                    </label>
                    <div className="field-body">
                      <div className="field">
                        <div className="control">
                          <Input
                            value={data.nodeSize}
                            onChange={handleChange('nodeSize')}
                            error={errors.nodeSize}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </Bulma.C>
                <Bulma.C size={6}>
                  <div className="field">
                    <label className="label" htmlFor="nbNode">
                      nbNode
                    </label>
                    <div className="field-body">
                      <div className="field">
                        <Input
                          value={data.nbNode}
                          onChange={handleChange('nbNode')}
                          error={errors.nbNode}
                        />
                      </div>
                    </div>
                  </div>
                </Bulma.C>
              </Bulma.Columns>
              <Bulma.Columns>
                <Bulma.C size={6}>
                  <div className="field">
                    <label className="label" htmlFor="fdrThreshold">
                      fdrThreshold
                    </label>
                    <div className="field-body">
                      <div className="field">
                        <Input
                          value={data.fdrThreshold}
                          onChange={handleChange('fdrThreshold')}
                          error={errors.fdrThreshold}
                        />
                      </div>
                    </div>
                  </div>
                </Bulma.C>
                <Bulma.C size={6}>
                  <div className="field">
                    <label className="label" htmlFor="pValueThreshold">
                      pValueThreshold
                    </label>
                    <div className="field-body">
                      <div className="field">
                        <Input
                          value={data.pValueThreshold}
                          onChange={handleChange('pValueThreshold')}
                          error={errors.pValueThreshold}
                        />
                      </div>
                    </div>
                  </div>
                </Bulma.C>
              </Bulma.Columns>
            </div>
          </Bulma.C>
        </Bulma.Columns>
        <div className="field is-grouped">
          <Input
            controlClassName="has-icons-left"
            type="email"
            value={data.email}
            onChange={handleChange('email')}
            placeholder={i18n.t('analysis.top-anat.email')}
            error={errors.email}
            icons={
              <span className="icon is-left">
                <ion-icon name="mail-outline" />
              </span>
            }
          />
          <Input
            controlClassName="has-icons-left"
            value={data.jobDescription}
            onChange={handleChange('jobDescription')}
            placeholder={i18n.t('analysis.top-anat.job-description')}
            error={errors.jobDescription}
            icons={
              <span className="icon is-left">
                <ion-icon name="document-outline" />
              </span>
            }
          />
        </div>
        <div className="field">
          <p className="control">
            <button
              type="button"
              className="button is-primary"
              onClick={handleSubmit}
            >
              {i18n.t('analysis.top-anat.submit-job')}
            </button>
          </p>
        </div>
      </Bulma.Section>
    </div>
  );
};

export default TopAnat;
