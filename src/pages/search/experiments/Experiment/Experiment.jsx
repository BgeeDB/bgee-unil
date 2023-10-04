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
        <title>{data.experiment.name}</title>
        <meta name="description" content={data.experiment.description} />
        <meta
          name="keywords"
          content={`experiment,${data.experiment.id}, ${data.experiment.name}`}
        />
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
                Experiment&nbsp;description:
              </span>
              <span className="my-1 is-flex-grow-1 ml-2">
                {data?.experiment?.description}
              </span>
            </div>

            <div className="is-flex is-flex-direction-row mr-2">
              <span className="has-text-weight-semibold my-1 labelsLeft">
                Source: {data?.experiment?.xRef?.source?.name}
              </span>
              <span className="my-1 is-flex-grow-1">
              {data?.experiment?.xRef?.xRefURL?.length > 0 && (
                <a
                  href={data?.experiment?.xRef?.xRefURL}
                  className="external-link"
                  target="_blank"
                  rel="noreferrer"
                >
                  {data.experiment.id}
                </a>
              )}
              </span>
            </div>
            {data?.experiment?.downloadUrl?.length > 0 && (
              <div className="is-flex is-justify-content-flex-end">
                <Bulma.Button
                  className="download-btn is-small mt-2"
                  href={data?.experiment?.downloadUrl}
                  renderAs="a"
                  target="_blank"
                  rel="noreferrer"
                >
                  Download all assays
                  <span className="icon is-small ml-1">
                    <ion-icon name="download-outline" />
                  </span>
                </Bulma.Button>
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
