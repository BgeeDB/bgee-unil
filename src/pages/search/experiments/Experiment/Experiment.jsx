import React, { useCallback } from 'react';
import { Helmet } from 'react-helmet';
import Bulma from '../../../../components/Bulma';
import Table from '../../../../components/Table';
import useLogic from './useLogic';
import './ExperimentStyles.scss';
import {
  AFFYMETRIX,
  EST,
  ID_FULL_LENGTH,
  IN_SITU,
  RNA_SEQ,
} from '../../rawdata/useLogic';
import { FULL_LENGTH_LABEL } from '../../../../api/prod/constant';
import PATHS from "../../../../routes/paths";
import config from "../../../../config.json";

const getUserFriendlyDataType = (dataType) => {
  switch (dataType) {
    case RNA_SEQ:
      return 'RNA-Seq';
    case ID_FULL_LENGTH:
      return FULL_LENGTH_LABEL;
    case IN_SITU:
      return 'In situ';
    case AFFYMETRIX:
      return 'Affymetrix';
    case EST:
      return 'Est';
    default:
      return '-';
  }
};

const Experiment = () => {
  const { data, columns, onRenderCell, onFilter } = useLogic();

  const customHeader = useCallback(
    (searchElement, pageSizeElement) => (
      <Bulma.Columns vCentered className="mt-5">
        <Bulma.C size={6}>
          <div className="field has-addons">{searchElement}</div>
        </Bulma.C>
        <Bulma.C size={6}>
          <div>{pageSizeElement}</div>
        </Bulma.C>
      </Bulma.Columns>
    ),
    []
  );

  if (!data) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>{`${data.experiment.name ? data.experiment.name : `${getUserFriendlyDataType(data?.dataType)} for ${data.experiment.id}`}`}</title>
        <meta name="description" content={`${data.experiment.description ? data.experiment.description : `${getUserFriendlyDataType(data?.dataType)} for ${data.experiment.id}`}`} />
        <meta
          name="keywords"
          content={`experiment,${data.experiment.id}${data.experiment.name ? `,${data.experiment.name}`: ''}`}
        />
        <link rel="canonical" href={`${config.genericDomain}${PATHS.SEARCH.EXPERIMENT
            .replace(':id', data?.experiment?.id)}`} />
      </Helmet>

      <div className="experimentPage">
        <div>
          <Bulma.Title className="has-text-centered">
            {data.experiment.name}
          </Bulma.Title>
        </div>

        <div className="is-flex is-justify-content-center">
          <div className="mt-6 mb-5 near-columns is-flex-direction-column is-flex encartTop">
            <div className="is-flex is-flex-direction-row mr-2">
              <span className="has-text-weight-semibold my-1 labelsLeft">
                Experiment&nbsp;ID:
              </span>
              <span className="my-1 is-flex-grow-1">
                {data?.experiment?.id}
              </span>
            </div>

            <div className="is-flex is-flex-direction-row mr-2">
              <span className="has-text-weight-semibold my-1 labelsLeft">
                Technology:
              </span>
              <span className="my-1 is-flex-grow-1">
                {getUserFriendlyDataType(data?.dataType)}
              </span>
            </div>

            <div className="is-flex is-flex-direction-row mr-2">
              <span className="has-text-weight-semibold my-1 labelsLeft">
                Description:
              </span>
              <span className="my-1 is-flex-grow-1 ml-2">
                {data?.experiment?.description}
              </span>
            </div>

            {data?.experiment?.dOI?.length > 0 && (
              <div className="is-flex is-flex-direction-row mr-2">
                <span className="has-text-weight-semibold my-1 labelsLeft">
                  DOI:
                </span>
                <span className="my-1 is-flex-grow-1">
                  <a
                    href={`https://doi.org/${data?.experiment?.dOI}`}
                    className="external-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {data?.experiment?.dOI}
                  </a>
                </span>
              </div>
            )}

            <div className="is-flex is-flex-direction-row mr-2">
              <span className="has-text-weight-semibold my-1 labelsLeft">
                Source:
              </span>
              <span className="my-1 is-flex-grow-1">
              {data?.experiment?.xRef?.xRefURL?.length > 0 && (
                <a
                  href={data?.experiment?.xRef?.xRefURL}
                  className="external-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {data.experiment.id}
                </a>
              )}
              &nbsp;{data?.experiment?.xRef?.source?.name}
              </span>
            </div>

            {data?.downloadUrls?.length > 0 && (
              <div className="is-justify-content-flex-end">
                <div className="has-text-weight-semibold my-1 labelsLeft">
                  Download:
                </div>
                {data?.downloadUrls.map(url =>
                  <Bulma.Button
                    className="download-btn is-small mt-2"
                    href={url.href}
                    title={url.title}
                    renderAs="a"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {url.text}
                    <span className="icon is-small ml-1">
                      <ion-icon name="download-outline" />
                    </span>
                  </Bulma.Button>
                )}
              </div>
            )}
          </div>
        </div>
        <h2 className="gradient-underline title is-size-5 has-text-primary">
          List of assays
        </h2>
        <Table
          pagination
          columns={columns}
          data={data.assays}
          onRenderCell={onRenderCell}
          onFilter={onFilter}
          customHeader={customHeader}
          fullwidth={false}
          minThWidth="10rem"
          classNamesTable="is-striped"
          hasPaginationTop
          hasScrollTop
        />
      </div>
    </>
  );
};

export default Experiment;
