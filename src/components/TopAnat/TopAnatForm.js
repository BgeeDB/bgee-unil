/* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions,jsx-a11y/label-has-associated-control */
import React from 'react';
import Bulma from '../Bulma';
import i18n from '../../i18n';
import InfoIcon from '../InfoIcon';
import TextArea from '../Form/TextArea';
import HelpIcon from '../HelpIcon';
import Toggle from '../Form/Toggle';
import Input from '../Form/Input';
import classnames from '../../helpers/classnames';

const ForegroundModal = ({ data }) => {
  const { selectedSpecies } = data;

  if (!data) return null;
  return (
    <div className="content">
      <p>
        {`Selected species: `}
        <i>{`${data.detectedSpecies[selectedSpecies].genus} ${data.detectedSpecies[selectedSpecies].speciesName}`}</i>
        {`, ${data.geneCount[selectedSpecies]} unique genes identified in Bgee`}
      </p>
      {Object.keys(data.detectedSpecies).length > 1 && (
        <>
          <p>Other species detected in ID list: </p>
          <ul className="unordered">
            {Object.entries(data.detectedSpecies).map(([key, value]) =>
              key === selectedSpecies.toString() ? null : (
                <li key={key}>
                  <p>
                    <i>{`${value.genus} ${value.speciesName}`}</i>
                    {`: ${data.geneCount[key]} gene${
                      data.geneCount[key] > 1 ? 's' : ''
                    } identified`}
                  </p>
                </li>
              )
            )}
          </ul>
        </>
      )}
      {data.undeterminedGeneIds.length > 0 && (
        <p>IDs not identified: {data.undeterminedGeneIds.length}</p>
      )}
      {data.notInSelectedSpeciesGeneIds.length > 0 && (
        <>
          <p>ID in other species: </p>

          <ul className="unordered">
            {data.notInSelectedSpeciesGeneIds.map((v) => (
              <li key={v}>
                <p>{v}</p>
              </li>
            ))}
          </ul>
        </>
      )}

      {data.undeterminedGeneIds.length > 0 && (
        <>
          <p>IDs not identified:</p>
          <ul className="unordered">
            {data.undeterminedGeneIds.map((v) => (
              <li key={v}>
                <p>{v}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

const DEFAULT_VALUES = {
  stages: 'all',
  dataQuality: 'all',
  decorrelationType: 'classic',
  nodeSize: '20',
  nbNode: '20',
  fdrThreshold: '0.2',
  pValueThreshold: '1',
};
const labelClassNames = (key, value) =>
  classnames('label', 'is-relative', {
    'not-default': DEFAULT_VALUES[key] !== value,
  });

const TopAnatForm = ({
  form: { handleChange, data, errors, isEditable },
  fgData,
  bgData,
  handlers: {
    foregroundHandler,
    backgroundHandler,
    setSpeciesBgTrue,
    setSpeciesBgFalse,
    onSelectCustomStage,
    checkBoxHandler,
    setExpandOpts,
  },
  speciesBg,
  expandOpts,
}) => (
  <>
    <Bulma.Columns>
      <Bulma.C size={4}>
        <article className="message is-small">
          <div className="message-header">
            <p className="is-size-6">{i18n.t('analysis.top-anat.gene-list')}</p>
          </div>
          {fgData && (
            <div className="message-body">
              <div className="is-flex is-align-items-center">
                <p className="mr-1">{fgData.message}</p>
                <InfoIcon
                  title="Gene detection details"
                  content={<ForegroundModal data={fgData.fg_list} />}
                />
              </div>
            </div>
          )}
        </article>
        <div className="field">
          <TextArea
            rows={10}
            placeholder={i18n.t(
              'analysis.top-anat.textarea-placeholder-gene-list'
            )}
            onChange={foregroundHandler}
            error={errors.genes}
            value={data.genes}
          />
        </div>
      </Bulma.C>
      {fgData && (
        <>
          <Bulma.C size={4}>
            <article className="message is-small">
              <div className="message-header">
                <p className="is-size-6">
                  {i18n.t('analysis.top-anat.background')}
                </p>
                <HelpIcon
                  title="Custom background"
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '7px',
                  }}
                  content={
                    <>
                      By default, the gene universe considered for the
                      enrichment analysis is all genes with data in Bgee for the
                      selected species. It is possible to provide a custom gene
                      universe, as a list of Ensembl gene IDs. All gene IDs
                      present in the foreground must be present in the
                      background.
                    </>
                  }
                />
              </div>
              <div
                className="message-body is-flex is-align-items-end is-justify-content-end"
                style={{ height: 70 }}
              >
                {/* todo display info bg data */}
                <div className="field has-addons">
                  <p className="control">
                    <Bulma.Button
                      size="small"
                      className="toggle-button"
                      color={speciesBg && 'danger'}
                      onClick={setSpeciesBgTrue}
                      disabled={speciesBg}
                    >{`Bgee data for ${
                      fgData.fg_list.detectedSpecies[
                        fgData.fg_list.selectedSpecies
                      ].name
                    }`}</Bulma.Button>
                  </p>
                  <p className="control">
                    <Bulma.Button
                      size="small"
                      className="toggle-button"
                      color={!speciesBg && 'danger'}
                      onClick={setSpeciesBgFalse}
                      disabled={!speciesBg}
                    >
                      Custom data
                    </Bulma.Button>
                  </p>
                </div>
              </div>
            </article>
            {!speciesBg && (
              <div className="field">
                <TextArea
                  rows={10}
                  placeholder={`Ensembl identifiers from ${
                    fgData.fg_list.detectedSpecies[
                      fgData.fg_list.selectedSpecies
                    ].name
                  } genome, one ID per line (no quotes, no comma).`}
                  onChange={backgroundHandler}
                  error={errors.genes}
                  value={data.genesBg}
                />
              </div>
            )}
          </Bulma.C>
          <Bulma.C size={4}>
            <article className="message is-small">
              <div className="message-header">
                <p className="is-size-6">
                  {i18n.t('analysis.top-anat.analysis-opts')}
                </p>
              </div>
            </article>
            <div>
              <p className="has-text-weight-semibold mb-2">
                {i18n.t('analysis.top-anat.expr-types')}
              </p>
              <p>Present</p>
              <p className="has-text-weight-semibold my-2">
                {i18n.t('analysis.top-anat.data-types')}
              </p>
              <div className="control">
                <label className="checkbox">
                  <input
                    type="checkbox"
                    className="mr-2"
                    disabled={!isEditable}
                    onChange={checkBoxHandler('rnaSeq')}
                    checked={data.rnaSeq}
                  />
                  RNA-Seq
                </label>
              </div>
              <div className="control">
                <label className="checkbox">
                  <input
                    type="checkbox"
                    className="mr-2"
                    disabled={!isEditable}
                    onChange={checkBoxHandler('affymetrix')}
                    checked={data.affymetrix}
                  />
                  Affymetrix data
                </label>
              </div>
              <div className="control">
                <label className="checkbox">
                  <input
                    type="checkbox"
                    className="mr-2"
                    disabled={!isEditable}
                    onChange={checkBoxHandler('inSitu')}
                    checked={data.inSitu}
                  />
                  In situ hybridization
                </label>
              </div>
              <div className="control">
                <label className="checkbox">
                  <input
                    type="checkbox"
                    className="mr-2"
                    disabled={!isEditable}
                    onChange={checkBoxHandler('est')}
                    checked={data.est}
                  />
                  EST
                </label>
              </div>
            </div>
          </Bulma.C>
        </>
      )}
    </Bulma.Columns>
    <Bulma.Columns>
      <Bulma.C size={12}>
        <a onClick={() => setExpandOpts(!expandOpts)}>
          <article className="message  is-small">
            <div className="message-header">
              <p className="is-size-5">Advanced Options</p>
              <span className={`icon is-medium ${expandOpts ? 'open' : ''}`}>
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
                <label
                  className={labelClassNames('stages', data.stages)}
                  htmlFor="stages"
                >
                  {i18n.t('analysis.top-anat.stages')}
                  <HelpIcon
                    title="Developmental and life stages"
                    style={{
                      position: 'absolute',
                    }}
                    content={
                      <>
                        By default, all developmental and life stages are
                        considered for the enrichment analysis. It is possible
                        to provide a custom selection of developmental and life
                        stages, selecting one or several developmental and life
                        stages.
                      </>
                    }
                  />
                </label>
                <div className="field-body">
                  <div className="field">
                    <div className="control">
                      <Toggle
                        elements={[
                          { value: 'all', text: 'All stages' },
                          { value: 'custom', text: 'Custom stages' },
                        ]}
                        value={data.stages === 'all' ? 'all' : 'custom'}
                        onChange={onSelectCustomStage()}
                        error={errors.stages}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {Array.isArray(data.stages) && (
                <div className="field">
                  <div className="control">
                    {fgData.fg_list.stages.map((s) => (
                      <div className="control" key={s.id}>
                        <label className="checkbox">
                          <input
                            type="checkbox"
                            className="mr-2"
                            disabled={!isEditable}
                            onChange={onSelectCustomStage(s.id)}
                            checked={
                              data.stages.findIndex((a) => a === s.id) >= 0
                            }
                          />
                          {s.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Bulma.C>
            <Bulma.C size={6}>
              <div className="field">
                <label
                  className={labelClassNames('dataQuality', data.dataQuality)}
                  htmlFor="dataQuality"
                >
                  {i18n.t('analysis.top-anat.data-quality')}
                  <HelpIcon
                    title="Data quality"
                    style={{
                      position: 'absolute',
                    }}
                    content={
                      <>
                        For each data type, Bgee applies dedicated analysis to
                        generate calls of baseline presence/absence of
                        expression, and of over-/under-expression, and to assign
                        a level of confidence to the data: silver or gold. This
                        field allows to specify whether the analysis should be
                        based on data of any quality level, or on data of high
                        quality level only.
                      </>
                    }
                  />
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
                <label
                  className={labelClassNames(
                    'decorrelationType',
                    data.decorrelationType
                  )}
                  htmlFor="decorrelationType"
                >
                  {i18n.t('analysis.top-anat.decorrelation-type')}
                  <HelpIcon
                    title="Decorrelation typey"
                    style={{
                      position: 'absolute',
                    }}
                    content={
                      <>
                        Algorithm used to take into account the topology of the
                        anatomical ontology, to decrease the number of false
                        positives and highly general terms in the results, owing
                        to the inheritance problem. A precise description of
                        these algorithms can be found in the topGO
                        documentation. Please note that using these
                        decorrelation methods slow the analyses a lot.
                      </>
                    }
                  />
                </label>
                <div className="field-body">
                  <div className="field">
                    <Toggle
                      elements={[
                        {
                          value: 'classic',
                          text: 'No decorrelation',
                        },
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
                <label
                  className={labelClassNames('nodeSize', data.nodeSize)}
                  htmlFor="nodeSize"
                >
                  {i18n.t('analysis.top-anat.node-size')}
                  <HelpIcon
                    title="Node size"
                    style={{
                      position: 'absolute',
                    }}
                    content={
                      <>
                        Parameter allowing to prune the anatomical ontology from
                        the terms which have a number of genes with data lower
                        than this cutoff.
                      </>
                    }
                  />
                </label>
                <div className="field-body">
                  <div className="field">
                    <div className="control">
                      <Input
                        value={data.nodeSize}
                        onChange={handleChange('nodeSize')}
                        error={errors.nodeSize}
                        type="number"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Bulma.C>
            <Bulma.C size={6}>
              <div className="field">
                <label
                  className={labelClassNames('nbNode', data.nbNode)}
                  htmlFor="nbNode"
                >
                  {i18n.t('analysis.top-anat.nb-node')}
                  <HelpIcon
                    title="Number of nodes"
                    style={{
                      position: 'absolute',
                    }}
                    content={
                      <>
                        Number of significant nodes to be displayed in the
                        generated graph of results (visualization purpose only,
                        no impact on the results of the analysis).
                      </>
                    }
                  />
                </label>
                <div className="field-body">
                  <div className="field">
                    <Input
                      value={data.nbNode}
                      onChange={handleChange('nbNode')}
                      error={errors.nbNode}
                      type="number"
                    />
                  </div>
                </div>
              </div>
            </Bulma.C>
          </Bulma.Columns>
          <Bulma.Columns>
            <Bulma.C size={6}>
              <div className="field">
                <label
                  className={labelClassNames('fdrThreshold', data.fdrThreshold)}
                  htmlFor="fdrThreshold"
                >
                  {i18n.t('analysis.top-anat.fdr-threshold')}
                  <HelpIcon
                    title="FDR threshold"
                    style={{
                      position: 'absolute',
                    }}
                    content={
                      <>
                        Anatomical terms with a FDR higher than this threshold
                        will not be considered as significant.
                      </>
                    }
                  />
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
                <label
                  className={labelClassNames(
                    'pValueThreshold',
                    data.pValueThreshold
                  )}
                  htmlFor="pValueThreshold"
                >
                  {i18n.t('analysis.top-anat.p-value-threshold')}
                  <HelpIcon
                    title="p‑value threshold"
                    style={{
                      position: 'absolute',
                    }}
                    content={
                      <>
                        Anatomical terms with a p-value higher than this
                        threshold will not be considered as significant.
                      </>
                    }
                  />
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
  </>
);

export default TopAnatForm;
