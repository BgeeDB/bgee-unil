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
import { TOP_ANAT_STATUS } from '../../helpers/constants/topAnat';
import isPlural from '../../helpers/isPlural';

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
                    {`: ${data.geneCount[key]} ${isPlural(
                      'gene',
                      data.geneCount[key]
                    )} identified`}
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
  form: { handleChange, data: formData, errors },
  requestParameters: rp,
  handlers: {
    foregroundHandler,
    backgroundHandler,
    setRP,
    onSelectCustomStage,
    checkBoxHandler,
  },
  status,
}) => {
  const formDisabled = React.useMemo(
    () => status !== TOP_ANAT_STATUS.NEW_SEARCH,
    [status]
  );
  const [expandOpts, setExpandOpts] = React.useState(false);
  return (
    <>
      <Bulma.Columns>
        <Bulma.C size={4}>
          <article className="message is-small">
            <div className="message-header">
              <p className="is-size-6">
                {i18n.t('analysis.top-anat.gene-list')}
              </p>
            </div>
            {rp.fg && (
              <div className="message-body" style={{ position: 'relative' }}>
                <div
                  className="is-flex is-align-items-center"
                  style={{ marginRight: 50 }}
                >
                  <p className="mr-1">{rp.fg.message}</p>
                  <InfoIcon
                    title="Gene detection details"
                    content={<ForegroundModal data={rp.fg.list} />}
                  />
                </div>
                <Bulma.Image
                  className="no-responsive"
                  style={{
                    height: 60,
                    width: 70,
                    position: 'absolute',
                    top: 0,
                    right: 0,
                  }}
                  src={`https://bgee.org/img/species/${rp.fg.list.selectedSpecies}_light.jpg`}
                  alt="species image"
                  height={60}
                  width={70}
                />
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
              value={formData.genes}
              disabled={formDisabled}
            />
          </div>
        </Bulma.C>
        {rp.fg && (
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
                        enrichment analysis is all genes with data in Bgee for
                        the selected species. It is possible to provide a custom
                        gene universe, as a list of Ensembl gene IDs. All gene
                        IDs present in the foreground must be present in the
                        background.
                      </>
                    }
                  />
                </div>
                <div
                  className="message-body is-flex is-flex-direction-column"
                  style={{ minHeight: 70 }}
                >
                  {rp.bg && (
                    <div className="is-flex is-align-items-center">
                      <p className="mr-1">{rp.bg?.message}</p>
                      <InfoIcon
                        title="Gene detection details"
                        content={<ForegroundModal data={rp.bg?.list} />}
                      />
                    </div>
                  )}
                  <div className="is-flex is-align-items-end is-justify-content-end">
                    <div className="field has-addons">
                      <p className="control">
                        <Bulma.Button
                          size="small"
                          className="toggle-button"
                          color={!rp.customBg && 'danger'}
                          onClick={() =>
                            setRP((prev) => ({ ...prev, customBg: false }))
                          }
                          disabled={
                            formDisabled || (!formDisabled && !rp.customBg)
                          }
                        >{`Bgee data for ${
                          rp.fg.list.detectedSpecies[rp.fg.list.selectedSpecies]
                            .name
                        }`}</Bulma.Button>
                      </p>
                      <p className="control">
                        <Bulma.Button
                          size="small"
                          className="toggle-button"
                          color={rp.customBg && 'danger'}
                          onClick={() =>
                            setRP((prev) => ({ ...prev, customBg: true }))
                          }
                          disabled={
                            formDisabled || (!formDisabled && rp.customBg)
                          }
                        >
                          Custom data
                        </Bulma.Button>
                      </p>
                    </div>
                  </div>
                </div>
              </article>
              {rp.customBg && (
                <div className="field">
                  <TextArea
                    rows={10}
                    placeholder={`Ensembl identifiers from ${
                      rp.fg.list.detectedSpecies[rp.fg.list.selectedSpecies]
                        .name
                    } genome, one ID per line (no quotes, no comma).`}
                    onChange={backgroundHandler}
                    error={errors.genes}
                    value={formData.genesBg}
                    disabled={formDisabled}
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
                      disabled={formDisabled}
                      onChange={checkBoxHandler('rnaSeq')}
                      checked={formData.rnaSeq}
                    />
                    RNA-Seq
                  </label>
                </div>
                <div className="control">
                  <label className="checkbox">
                    <input
                      type="checkbox"
                      className="mr-2"
                      disabled={formDisabled}
                      onChange={checkBoxHandler('affymetrix')}
                      checked={formData.affymetrix}
                    />
                    Affymetrix data
                  </label>
                </div>
                <div className="control">
                  <label className="checkbox">
                    <input
                      type="checkbox"
                      className="mr-2"
                      disabled={formDisabled}
                      onChange={checkBoxHandler('inSitu')}
                      checked={formData.inSitu}
                    />
                    In situ hybridization
                  </label>
                </div>
                <div className="control">
                  <label className="checkbox">
                    <input
                      type="checkbox"
                      className="mr-2"
                      disabled={formDisabled}
                      onChange={checkBoxHandler('est')}
                      checked={formData.est}
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
                    className={labelClassNames('stages', formData.stages)}
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
                          to provide a custom selection of developmental and
                          life stages, selecting one or several developmental
                          and life stages.
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
                          value={formData.stages === 'all' ? 'all' : 'custom'}
                          onChange={onSelectCustomStage()}
                          error={errors.stages}
                          disabled={formDisabled}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {Array.isArray(formData.stages) && (
                  <div className="field">
                    <div className="control">
                      {rp.fg.list.stages.map((s) => (
                        <div className="control" key={s.id}>
                          <label className="checkbox">
                            <input
                              type="checkbox"
                              className="mr-2"
                              disabled={formDisabled}
                              onChange={onSelectCustomStage(s.id)}
                              checked={
                                formData.stages.findIndex((a) => a === s.id) >=
                                0
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
                    className={labelClassNames(
                      'dataQuality',
                      formData.dataQuality
                    )}
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
                          expression, and of over-/under-expression, and to
                          assign a level of confidence to the data: silver or
                          gold. This field allows to specify whether the
                          analysis should be based on data of any quality level,
                          or on data of high quality level only.
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
                          value={formData.dataQuality}
                          onChange={handleChange('dataQuality', (v) => v)}
                          error={errors.dataQuality}
                          disabled={formDisabled}
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
                      formData.decorrelationType
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
                          Algorithm used to take into account the topology of
                          the anatomical ontology, to decrease the number of
                          false positives and highly general terms in the
                          results, owing to the inheritance problem. A precise
                          description of these algorithms can be found in the
                          topGO documentation. Please note that using these
                          decorrelation methods slow the analyses a lot.
                        </>
                      }
                    />
                  </label>
                  <div className="field-body">
                    <div className="field">
                      <Toggle
                        disabled={formDisabled}
                        elements={[
                          {
                            value: 'classic',
                            text: 'No decorrelation',
                          },
                          { value: 'elim', text: 'Elim' },
                          { value: 'weight', text: 'Weight' },
                          { value: 'parent-child', text: 'Parent-child' },
                        ]}
                        value={formData.decorrelationType}
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
                    className={labelClassNames('nodeSize', formData.nodeSize)}
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
                          Parameter allowing to prune the anatomical ontology
                          from the terms which have a number of genes with data
                          lower than this cutoff.
                        </>
                      }
                    />
                  </label>
                  <div className="field-body">
                    <div className="field">
                      <div className="control">
                        <Input
                          disabled={formDisabled}
                          value={formData.nodeSize}
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
                    className={labelClassNames('nbNode', formData.nbNode)}
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
                          generated graph of results (visualization purpose
                          only, no impact on the results of the analysis).
                        </>
                      }
                    />
                  </label>
                  <div className="field-body">
                    <div className="field">
                      <Input
                        disabled={formDisabled}
                        value={formData.nbNode}
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
                    className={labelClassNames(
                      'fdrThreshold',
                      formData.fdrThreshold
                    )}
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
                        disabled={formDisabled}
                        value={formData.fdrThreshold}
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
                      formData.pValueThreshold
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
                        disabled={formDisabled}
                        value={formData.pValueThreshold}
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
          disabled={formDisabled}
          value={formData.email}
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
          value={formData.jobDescription}
          onChange={handleChange('jobDescription')}
          placeholder={i18n.t('analysis.top-anat.job-description')}
          error={errors.jobDescription}
          disabled={formDisabled}
          icons={
            <span className="icon is-left">
              <ion-icon name="document-outline" />
            </span>
          }
        />
      </div>
    </>
  );
};

export default TopAnatForm;
