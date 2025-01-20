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
  triggerHomologSearch,
  genes,
  anatomicalTerms,
  // setAnatomicalTerms,
  anatomicalTermsProps,
  // setAnatomicalTermsProps,
  maxExpScore,
  onToggleExpandCollapse,
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

  // console.log(`[GeneExpressionMatrixResults] maxExpScore:\n${JSON.stringify(maxExpScore, null, 2)}`);
  // console.log(`"ENSG00000254647" in maxExpScore ? ${"ENSG00000254647" in maxExpScore}`);
  // console.log(`"UBERON:0000949" in maxExpScore["ENSG00000254647"] ? ${"UBERON:0000949" in maxExpScore["ENSG00000254647"]}`);

  console.log(`[GeneExpressionMatrixResults] results:\n${JSON.stringify(results, null, 2)}`);
  // console.log(`[GeneExpressionMatrixResults] anatomicalTerms:\n${JSON.stringify(anatomicalTerms, null, 2)}`);
  console.log(`[GeneExpressionMatrixResults] anatomicalTerms:\n${JSON.stringify(anatomicalTerms)}`);
  const heatmapData = results.map((result) => {
    const { geneId, name: geneName } = result.gene;
    const speciesId = result.gene.species.id;
    const { id: anatEntityId, name: anatEntityName } = result.condition.anatEntity;
    const { id: cellTypeId, name: cellTypeName } = result.condition.cellType;
    const termId = `${anatEntityId}-${cellTypeId}`;
    const termName = cellTypeId !== 'GO:0005575' ? `${anatEntityName} : ${cellTypeName}` : anatEntityName;
    const expScore = result.expressionScore.expressionScore;
    const maxExp = (geneId in maxExpScore && termId in maxExpScore[geneId]) 
      ? maxExpScore[geneId][termId]
      : 50 + (10 * Math.random());
    const isExpressed = result.expressionState === 'expressed';
  
    const row =  {
      x: geneName,
      // y: termName,
      y: termId,
      termId,
      termName,
      geneId,
      geneName,
      speciesId,
      anatEntityId,
      anatEntityName,
      cellTypeId,
      cellTypeName,
      // termIsTopLevel: anatomicalTerms.filter(item => item.id === result.condition.anatEntity.id)?.isTopLevelTerm,
      value: expScore,
      // TODO: use actual number from API response
      maxExp,
      isExpressed,
      hasDataAffy: result.dataTypesWithData.AFFYMETRIX,
      hasDataEst: result.dataTypesWithData.EST,
      hasDataInSitu: result.dataTypesWithData.IN_SITU,
      hasDataRnaSeq: result.dataTypesWithData.RNA_SEQ,
      hasDataScRnaSeq: result.dataTypesWithData.SC_RNA_SEQ,
      ylvl: 0
    };
    return row;
  });

  return (
    <>
      {false && (results?.length > 0) && (
      <div className="my-2 is-flex is-justify-content-flex-end">
          <Bulma.Button
            className="download-btn is-small"
            href={buildTSVhref}
            renderAs="a"
            download={`Bgee-${pageType}.tsv`}
            target="_blank"
            rel="noreferrer"
          >
            Export data in TSV
            <span className="icon is-small ml-1">
              <ion-icon name="download-outline" />
            </span>
          </Bulma.Button>
        </div>
      )}

      {results?.length > 0 ? (
      <Heatmap
        data = {heatmapData}
        getChildData = {triggerSearch}
        getHomologsData = {triggerHomologSearch}
        xTerns = {genes}
        yTerms = {anatomicalTerms}
        // setYTerms = {setAnatomicalTerms}
        termProps = {anatomicalTermsProps}
        // setTermProps = {setAnatomicalTermsProps}
        onToggleExpandCollapse = {onToggleExpandCollapse}
        width = {800}
        height = {600}
        backgroundColor = 'white'
      />
      ) : (
        <div className="is-flex is-justify-content-center mt-3">
          Please select search criteria above to display results.
        </div>
      )}
      
    </>
  );
};

export default GeneExpressionMatrixResults;