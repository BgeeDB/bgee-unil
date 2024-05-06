import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import Bulma from '../../../components/Bulma';

import { Heatmap } from './components/Heatmap/Heatmap';
import config from '../../../config.json';
import PATHS from '../../../routes/paths';
import { getChildValueFromAttribute } from '../../../helpers/selects';
import obolibraryLinkFromID from '../../../helpers/obolibraryLinkFromID';
import { DATA_TYPES, PROC_EXPR_VALUES, RAW_DATA_ANNOTS } from './useLogic';

const APP_VERSION = config.version;
const URL_VERSION = APP_VERSION.replaceAll('.', '-');
const URL_ROOT = `${config.archive ? `/${URL_VERSION}` : ''}`;
const LINK_TO_RAW_DATA_ANNOTS = 'LINK_TO_RAW_DATA_ANNOTS';
const LINK_TO_PROC_EXPR_VALUES = 'LINK_TO_PROC_EXPR_VALUES';
const LINK_CALL_TO_PROC_EXPR_VALUES = 'LINK_CALL_TO_PROC_EXPR_VALUES';

const replaceNAOrUndefined = (txt) => {
  if (!txt || txt?.toLowerCase() === 'na') {
    return '';
  }
  return txt;
};

const GeneExpressionMatrixResults = ({
  results = [],
  columnDescriptions = [], // for TSV download
  pageType,
  searchParams,
  triggerSearch,
  anatomicalTerms
}) => {
  const loc = useLocation();

  const mappedResults = useMemo(
    () =>
      results.map((result) => {
        const row = columnDescriptions.map((col) => {
          const attribute0 = col?.attributes?.[0];
          const valueFromFirstAttribute = getChildValueFromAttribute(
            result,
            attribute0
          );
          switch (col.columnType) {
            case 'STRING': {
              return {
                type: col.columnType,
                content: col.attributes
                  .map((att) => getChildValueFromAttribute(result, att))
                  .join(' '),
              };
            }
            case 'INTERNAL_LINK': {
              let path = `${URL_ROOT}/${col.linkTarget}/${valueFromFirstAttribute}`;
              if (col?.linkTarget === 'gene') {
                const geneMappedToSameGeneIdCount = getChildValueFromAttribute(
                  result,
                  col?.geneMappedToSameGeneIdCountResultAttribute
                );

                if (geneMappedToSameGeneIdCount > 1) {
                  const specieId = getChildValueFromAttribute(
                    result,
                    col?.geneSpeciesIdResultAttribute
                  );

                  path += `/${specieId}`;
                }
              }
              return {
                type: col.columnType,
                content: valueFromFirstAttribute,
                to: path,
              };
            }
            case 'ANAT_ENTITY':
            case 'DEV_STAGE': {
              const id = replaceNAOrUndefined(valueFromFirstAttribute);
              const path = obolibraryLinkFromID(id || '');
              return {
                type: col.columnType,
                content: id,
                path,
              };
            }
            case 'NUMERIC': {
              return {
                type: col.columnType,
                content: valueFromFirstAttribute,
              };
            }
            case 'DATA_TYPE_SOURCE': {
              let source = '';
              Object.entries(valueFromFirstAttribute).forEach(
                ([key, value]) => {
                  if (value) {
                    source += `${key} - `;
                  }
                }
              );
              return {
                type: col.columnType,
                content: source.slice(0, -2),
                sourceObject: valueFromFirstAttribute,
              };
            }
            case LINK_TO_RAW_DATA_ANNOTS:
            case LINK_TO_PROC_EXPR_VALUES:
            case LINK_CALL_TO_PROC_EXPR_VALUES: {
              const nextPageType =
                col.columnType === LINK_TO_RAW_DATA_ANNOTS
                  ? RAW_DATA_ANNOTS
                  : PROC_EXPR_VALUES;
              const currentSP = new URLSearchParams(loc.search);
              col?.filterTargets?.forEach((filter) => {
                const filterValue = getChildValueFromAttribute(
                  result,
                  filter?.valueAttributeName
                );
                if (filterValue) {
                  currentSP.append(filter?.urlParameterName, filterValue);
                }
              });
              currentSP.delete('pageType');
              currentSP.append('pageType', nextPageType);

              currentSP.append('filters_for_all', '1');

              currentSP.delete('data_type');
              currentSP.append(
                'data_type',
                DATA_TYPES[0].id
              );

              currentSP.delete('cell_type_descendant');
              currentSP.append('cell_type_descendant', searchParams().hasCellTypeSubStructure ?? false);
              currentSP.delete('stage_descendant');
              currentSP.append('stage_descendant', searchParams().hasDevStageSubStructure ?? false);
              currentSP.delete('anat_entity_descendant');
              currentSP.delete('pageNumber');
              currentSP.append('anat_entity_descendant', searchParams().hasTissueSubStructure ?? false);
              return {
                type: col.columnType,
                content: 'Browse results',
                to: `${
                  PATHS.SEARCH.RAW_DATA_ANNOTATIONS
                }?${currentSP.toString()}`,
              };
            }
            default:
              return {};
          }
        });
        return row;
      }),
    [results, columnDescriptions]
  );

  const buildTSVhref = useMemo(() => {
    const base = `data:text/tab-separated-values;charset=utf-8,`;
    const colHeaders = [];

    // We create column headers by filtering the export = false
    columnDescriptions
      .filter((col) => col.export)
      .forEach((column) => {
        colHeaders.push(column.title);
      });
    let tsv = colHeaders.join('%09');
    tsv += '%0D%0A'; // carriage return

    const columnsToExport = columnDescriptions
      .map((c, i) => ({ ...c, indexForExport: i })) // We are adding indexes to know where to get our value in result
      .filter((col) => col.export); // filtering export = false

    mappedResults.forEach((row) => {
      const rowTxt = columnsToExport
        .map((col) => encodeURIComponent(row[col.indexForExport].content)) // We get the result only from the column we need to export
        .join('%09');
      tsv += `${rowTxt}%0D%0A`; // carriage return
    });

    return `${base}${tsv}`;
  }, [mappedResults]);

  const heatmapData = results.map((result) => {
    const row =  {
      x: `${result.gene.geneId} - ${result.gene.name}`,
      y: `${result.condition.anatEntity.name}`,
      value: result.expressionScore.expressionScore,
      isExpressed: result.expressionState === 'expressed',
      ylvl: 0
    };
    return row;
  });

  return (
    <>
      {results?.length > 0 && (
      <div className="my-2 is-flex is-justify-content-flex-end">
          <Bulma.Button
            className="download-btn is-small"
            href={buildTSVhref}
            renderAs="a"
            download={`Bgee-${pageType}.tsv`}
            target="_blank"
            rel="noreferrer"
          >
            Export current page in TSV
            <span className="icon is-small ml-1">
              <ion-icon name="download-outline" />
            </span>
          </Bulma.Button>
        </div>
      )}

      <Heatmap
        data = {heatmapData}
        getChildData = {triggerSearch}
        yTerms = {anatomicalTerms}
        width = {800}
        height = {500}
        backgroundColor = 'white'
      />

    </>
  );
};

export default GeneExpressionMatrixResults;