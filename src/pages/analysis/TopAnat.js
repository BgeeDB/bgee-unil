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
import Tooltip from '../../components/Tooltip';
import api from '../../api';
import InfoIcon from '../../components/InfoIcon';
import HelpIcon from '../../components/HelpIcon';
import useToggle from '../../hooks/useToggle';
import array from '../../helpers/array';
import Notifications from '../../components/Notifications';

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

let timeout;
const TIMEOUT_NOTIF = 3000;

const TopAnat = () => {
  const [notif, setNotif] = React.useState([]);
  const closeNotif = React.useCallback(
    (id) => () => {
      setNotif((prev) => {
        const current = [...prev];
        if (Array.isArray(current)) {
          const pos = current.findIndex((o) => o.id === id);
          if (pos > -1) current.splice(pos, 1);
        }
        return current;
      });
    },
    []
  );
  const [searchMode, { toTrue: setSearchTrue, toFalse: setSearchFalse }] =
    useToggle(true);
  const [canSearch, { toTrue: canSearchTrue, toFalse: canSearchFalse }] =
    useToggle(true);
  const [searchIds, setSearchIds] = React.useState();
  const [expandOpts, setExpandOpts] = React.useState(false);
  const [fgData, setFgData] = React.useState();
  const [bgData, setBgData] = React.useState();
  const [speciesBg, { toTrue: setSpeciesBgTrue, toFalse: setSpeciesBgFalse }] =
    useToggle(true);
  const onSubmit = React.useCallback((data) => {
    const formattedData = data; // to format for api
    api.topAnat.runJob(formattedData).then((res) => {
      if (res.data.jobResponse.jobId !== 0) {
        setSearchIds({
          jobId: res.data.jobResponse.jobId,
          searchId: res.data.jobResponse.data,
        });
      } else {
        setSearchIds(res.data.jobResponse.data);
      }
    });
  }, []);
  const { data, handleChange, handleSubmit, errors } = useForm({
    initialValue: {
      genes: '',
      genesBg: '',
      email: '',
      jobDescription: '',
      stages: 'all',
      dataQuality: 'all',
      decorrelationType: 'classic',
      nodeSize: '20',
      nbNode: '20',
      fdrThreshold: '0.2',
      pValueThreshold: '1',
      rnaSeq: true,
      affymetrix: true,
      inSitu: true,
      est: true,
    },
    validations: {
      genes: {
        required: {
          value: true,
          message: 'The job needs to run with some genes.',
        },
      },
      email: {
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
    },
    onSubmit,
  });
  const foregroundHandler = React.useCallback(
    (e) => {
      handleChange('genes')(e);
      if (timeout) clearTimeout(timeout);
      if (e.target.value !== '')
        timeout = setTimeout(() => {
          api.topAnat
            .autoCompleteForegroundGenes(e.target.value, 'fg')
            .then((r) => {
              setSpeciesBgTrue();
              handleChange('genesBg', () => '')();
              handleChange('rnaSeq', () => true)();
              handleChange('affymetrix', () => true)();
              handleChange('inSitu', () => true)();
              handleChange('est', () => true)();
              setFgData({ fg_list: r.data.fg_list, message: r.message });
            });
        }, 1000);
      else setFgData(undefined);
    },
    [data]
  );
  const backgroundHandler = React.useCallback(
    (e) => {
      handleChange('genesBg')(e);
      const bg = e.target.value.split('\n');
      const fg = data.genes.split('\n');
      if (timeout) clearTimeout(timeout);

      const uuid = Math.random().toString(10);
      if (!array.equals(fg, bg)) {
        canSearchFalse();
        const message =
          'Gene list contains genes not found in background genes.';
        const status = 'danger';
        setNotif((prev) => {
          const curr = [...prev];
          curr.push({
            id: uuid,
            children: <p>{message}</p>,
            className: `is-${status}`,
          });
          return curr;
        });
        setTimeout(() => {
          closeNotif(uuid)();
        }, TIMEOUT_NOTIF);
      } else {
        canSearchTrue();
      }

      if (e.target.value !== '' && array.equals(fg, bg)) {
        timeout = setTimeout(() => {
          api.topAnat
            .autoCompleteForegroundGenes(e.target.value, 'bg')
            .then((r) => {
              if (
                r.data.fg_list.selectedSpecies !==
                fgData.fg_list.selectedSpecies
              ) {
                setNotif((prev) => {
                  const curr = [...prev];
                  curr.push({
                    id: uuid,
                    children: (
                      <p>
                        Foreground and background species differ. You can either
                        change your background or the default one will be used.
                      </p>
                    ),
                    className: `is-danger`,
                  });
                  return curr;
                });
                setTimeout(() => {
                  closeNotif(uuid)();
                }, TIMEOUT_NOTIF);
              }
              setBgData({ bg_list: r.data.fg_list, message: r.message });
            });
        }, 1000);
      }
    },
    [data, fgData]
  );
  const checkBoxHandler = React.useCallback(
    (key) => (e) => handleChange(key, (event) => event.target.checked)(e),
    []
  );
  React.useEffect(
    () => () => {
      if (timeout) clearTimeout(timeout);
    },
    []
  );
  React.useEffect(() => {
    let timeoutPointer;
    if (bgData) {
      const uuid = Math.random().toString(10);
      const message =
        fgData.fg_list.selectedSpecies === bgData.bg_list.selectedSpecies
          ? 'Foreground/background species are identical.'
          : 'Foreground and background species differ. You can either change your background or the default one will be used.';
      const status =
        fgData.fg_list.selectedSpecies === bgData.bg_list.selectedSpecies
          ? 'success'
          : 'danger';
      setNotif((prev) => {
        const curr = [...prev];
        curr.push({
          id: uuid,
          children: <p>{message}</p>,
          className: `is-${status}`,
        });
        return curr;
      });
      timeoutPointer = setTimeout(() => {
        closeNotif(uuid)();
      }, TIMEOUT_NOTIF);
    }
    return () => {
      if (timeoutPointer) clearTimeout(timeoutPointer);
    };
  }, [fgData, bgData]);

  return (
    <div>
      <Bulma.Section className="py-0">
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
        <Bulma.Columns>
          <Bulma.C size={4}>
            <article className="message is-small">
              <div className="message-header">
                <p className="is-size-6">
                  {i18n.t('analysis.top-anat.gene-list')}
                </p>
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
                        <p>
                          By default, the gene universe considered for the
                          enrichment analysis is all genes with data in Bgee for
                          the selected species. It is possible to provide a
                          custom gene universe, as a list of Ensembl gene IDs.
                          All gene IDs present in the foreground must be present
                          in the background.
                        </p>
                      }
                    />
                  </div>
                  <div
                    className="message-body is-flex is-align-items-end is-justify-content-end"
                    style={{ height: 70 }}
                  >
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
                        disabled={!searchMode}
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
                        disabled={!searchMode}
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
                        disabled={!searchMode}
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
                        disabled={!searchMode}
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
              disabled={!canSearch}
            >
              {i18n.t('analysis.top-anat.submit-job')}
            </button>
          </p>
        </div>
        {searchIds && typeof searchIds === 'object' && (
          <Bulma.Notification color="warning" className="mt-5">
            <progress
              className="progress is-small"
              max="100"
              style={{ animationDuration: '3s', marginBottom: 12 }}
            >
              80%
            </progress>

            <p>
              After bookmarking this page, it is safe to close this window. Your
              analysis is being run on our server, and the results will appear
              as soon as available. Please note that the results can be slow to
              compute, typically from 5 to 30 minutes, depending on the amount
              of data to process. It is not necessary to refresh this page, it
              will be automatically updated.
            </p>
            <p className="mt-2">Job is running - Job ID: {searchIds.jobId}</p>
          </Bulma.Notification>
        )}
      </Bulma.Section>{' '}
      <Notifications content={notif} closeElement={closeNotif} />
    </div>
  );
};

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
export default TopAnat;
