/* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions,jsx-a11y/control-has-associated-label */
import React from 'react';
import { useHistory } from 'react-router-dom';
import classnames from '../../helpers/classnames';
import useQuery from '../../hooks/useQuery';
import GEC_TABS from '../../helpers/constants/GecTabs';

const GECSingleExpr = () => {
  const file = useQuery('file');
  const history = useHistory();

  const onClick = React.useCallback(
    (key) => () => {
      history.push(
        `?cat=${GEC_TABS.CAT.SINGLE}&section=${GEC_TABS.SINGLE.EXPR}&file=${key}`
      );
    },
    []
  );
  React.useEffect(() => {
    if (!file)
      history.push(
        `?cat=${GEC_TABS.CAT.SINGLE}&section=${GEC_TABS.SINGLE.EXPR}&file=${GEC_TABS.SINGLE.FILES.EXPR.SIMPLE}`
      );
  }, [file]);

  return (
    <div id="single_expr">
      <div className="static-section">
        <p>
          Bgee provides calls of presence/absence of expression. Each call
          corresponds to a unique combination of a gene, an anatomical entity,
          and a life stage, with reported presence or absence of expression.
          Life stages describe development and aging. Only &quot;normal&quot;
          expression is considered in Bgee (i.e., no treatment, no disease, no
          gene knock-out, etc.). Bgee collects data from different types, from
          different studies, in different organisms, and provides a summary from
          all these data as unique calls{' '}
          <code>gene - anatomical entity - developmental stage</code>, with
          confidence information, notably taking into account potential
          conflicts.
        </p>
        <p>
          Calls of presence/absence of expression are very similar to the data
          that can be reported using <i>in situ</i> hybridization methods; Bgee
          applies dedicated statistical analyses to generate such calls from
          EST, Affymetrix, and RNA-Seq data, with confidence information, and
          also collects <i>in situ</i> hybridization calls from model organism
          databases. This offers the possibility to aggregate and compare these
          calls of presence/absence of expression between different experiments,
          different data types, and different species, and to benefit from both
          the high anatomy coverage provided by low-throughput methods, and the
          high genomic coverage provided by high-throughput methods.
        </p>
        <p>
          After presence/absence calls are generated from the raw data, they are
          propagated using anatomical and life stage ontologies:
        </p>
        <ul className="unordered">
          <li>
            <p>
              <u>calls of expression</u> are propagated to parent anatomical
              entities and parent developmental stages. For instance, if gene A
              is expressed in midbrain at young adult stage, it will also be
              considered as expressed in brain at adult stage.
            </p>
          </li>
          <li>
            <p>
              <u>calls of absence of expression</u> are propagated to child
              anatomical entities (and not to child developmental stages). For
              instance, if gene A is reported as not expressed in the brain at
              young adult stage, it will also be considered as not expressed in
              the midbrain at young adult stage. This is only permitted when it
              does not generate any contradiction with expression calls from the
              same data type (for instance, no contradiction permitted of
              reported absence of expression by RNA-Seq, with report of
              expression by RNA-Seq for the same gene, in the same anatomical
              entity and developmental stage, or any child anatomical entity or
              child developmental stage).
            </p>
          </li>
        </ul>
        <p>
          Call propagation allows a complete integration of the data, even if
          provided at different anatomical or developmental levels. For
          instance: if gene A is reported to be expressed in the midbrain dura
          mater at young adult stage; gene B is reported to be expressed in the
          midbrain pia mater at late adult stage; and gene C has an absence of
          expression reported in the brain at adult stage; it is then possible
          to retrieve that, in the midbrain at adult stage, gene A and B are
          both expressed, while gene C is not, thanks to call propagation.
        </p>
        <p>
          It is possible to select two different combinations of{' '}
          <code>condition parameters</code>:
        </p>
        <ul className="unordered">
          <li>
            <p>
              <u>anatomical entities only (by default)</u> files contain one
              expression call for each unique pair of gene and anatomical
              entity.If more than one developmental stage map this unique pair,
              the resulting expression call correspond to summarized information
              coming from all developmental stages.
            </p>
          </li>
          <li>
            <p>
              <u>anatomical entities and developmental stages</u> files contain
              one expression call for each unique gene, anatomical entity and
              developmental stage.
            </p>
          </li>
        </ul>
        <p>
          Presence/absence calls are then filtered and presented differently
          depending on whether a <code>simple file</code>, or an{' '}
          <code>advanced file</code> is used. Notably: <code>simple files</code>{' '}
          aim at providing summarized information over all data types, and only
          in anatomical entities and developmental stages actually used in
          experimental data;
          <code>advanced files</code> aim at reporting all information, allowing
          for instance to retrieve the contribution of each data type to a call,
          in all possible anatomical entities and developmental stages.
        </p>
        <div className="tabs is-toggle is-toggle-rounded is-small">
          <ul>
            <li
              className={classnames({
                'is-active': file === GEC_TABS.SINGLE.FILES.EXPR.SIMPLE,
              })}
            >
              <a onClick={onClick(GEC_TABS.SINGLE.FILES.EXPR.SIMPLE)}>
                simple file
              </a>
            </li>
            <li
              className={classnames({
                'is-active': file === GEC_TABS.SINGLE.FILES.EXPR.ADVANCED,
              })}
            >
              <a onClick={onClick(GEC_TABS.SINGLE.FILES.EXPR.ADVANCED)}>
                advanced file
              </a>
            </li>
          </ul>
        </div>
      </div>
      {file === GEC_TABS.SINGLE.FILES.EXPR.SIMPLE && (
        <div className="static-section">
          <h1 className="gradient-underline title is-5 has-text-primary">
            Simple file
          </h1>
          <p>
            In simple files, propagated presence/absence expression calls are
            provided, but only calls in conditions of anatomical
            entity/developmental stage actually used in experimental data are
            displayed (no calls generated from propagation only).
          </p>
          <div>
            <p className="has-text-centered has-text-weight-semibold mb-1">
              Format description for single species simple expression file
            </p>
            <table className="table is-bordered is-striped is-fullwidth">
              <thead>
                <tr>
                  <th>Column</th>
                  <th>Content</th>
                  <th>Example</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <p>1</p>
                  </td>
                  <td>
                    <div>
                      <p>
                        <a
                          href="#single_expr_simple_col1"
                          className="internal-link"
                        >
                          Gene ID
                        </a>
                      </p>
                    </div>
                  </td>
                  <td>
                    <p>FBgn0005427</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>2</p>
                  </td>
                  <td>
                    <div>
                      <p>
                        <a
                          href="#single_expr_simple_col2"
                          className="internal-link"
                        >
                          Gene name
                        </a>
                      </p>
                    </div>
                  </td>
                  <td>
                    <p>ewg</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>3</p>
                  </td>
                  <td>
                    <div>
                      <p>
                        <a
                          href="#single_expr_simple_col3"
                          className="internal-link"
                        >
                          Anatomical entity ID
                        </a>
                      </p>
                    </div>
                  </td>
                  <td>
                    <p>FBbt:00003404</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>4</p>
                  </td>
                  <td>
                    <div>
                      <p>
                        <a
                          href="#single_expr_simple_col4"
                          className="internal-link"
                        >
                          Anatomical entity name
                        </a>
                      </p>
                    </div>
                  </td>
                  <td>
                    <p>
                      mesothoracic extracoxal depressor muscle 66 (Drosophila)
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>5</p>
                  </td>
                  <td>
                    <div>
                      <p>
                        <a
                          href="#single_expr_simple_col5"
                          className="internal-link"
                        >
                          Developmental stage ID
                        </a>{' '}
                        *
                      </p>
                    </div>
                  </td>
                  <td>
                    <p>FBdv:00005348</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>6</p>
                  </td>
                  <td>
                    <div>
                      <p>
                        <a
                          href="#single_expr_simple_col6"
                          className="internal-link"
                        >
                          Developmental stage name
                        </a>{' '}
                        *
                      </p>
                    </div>
                  </td>
                  <td>
                    <p>prepupal stage P4(ii) (Drosophila)</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>7</p>
                  </td>
                  <td>
                    <div>
                      <p>
                        <a
                          href="#single_expr_simple_col7"
                          className="internal-link"
                        >
                          Expression
                        </a>
                      </p>
                    </div>
                  </td>
                  <td>
                    <p>present</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>8</p>
                  </td>
                  <td>
                    <div>
                      <p>
                        <a
                          href="#single_expr_simple_col8"
                          className="internal-link"
                        >
                          Call quality
                        </a>
                      </p>
                    </div>
                  </td>
                  <td>
                    <p>silver quality</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>9</p>
                  </td>
                  <td>
                    <div>
                      <p>
                        <a
                          href="#single_expr_simple_col9"
                          className="internal-link"
                        >
                          Expression rank
                        </a>
                      </p>
                    </div>
                  </td>
                  <td>
                    <p>1.24e4</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            * only present if &apos;developmental stage&apos; is selected as a
            condition parameter.
          </p>
          <div>
            <p className="has-text-centered has-text-weight-semibold mb-1">
              Example lines for single species simple expression file
            </p>
            <div className="table-container">
              <table className="table is-bordered is-striped is-fullwidth">
                <thead>
                  <tr>
                    <th>Gene ID</th>
                    <th>Gene Name</th>
                    <th>Anatomical entity ID</th>
                    <th>Anatomical entity name</th>
                    <th>Developmental stage ID</th>
                    <th>Developmental stage name</th>
                    <th>Expression</th>
                    <th>Call quality</th>
                    <th>Expression rank</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <p>FBgn0005533</p>
                    </td>
                    <td>
                      <p>RpS17</p>
                    </td>
                    <td>
                      <p>UBERON:0000473</p>
                    </td>
                    <td>
                      <p>testis</p>
                    </td>
                    <td>
                      <p>UBERON:0000066</p>
                    </td>
                    <td>
                      <p>fully formed stage</p>
                    </td>
                    <td>
                      <p>present</p>
                    </td>
                    <td>
                      <p>silver quality</p>
                    </td>
                    <td>
                      <p>539</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>FBgn0005536</p>
                    </td>
                    <td>
                      <p>Mbs</p>
                    </td>
                    <td>
                      <p>UBERON:0000033</p>
                    </td>
                    <td>
                      <p>head</p>
                    </td>
                    <td>
                      <p>FBdv:00007085</p>
                    </td>
                    <td>
                      <p>day 10 of adulthood (Drosophila)</p>
                    </td>
                    <td>
                      <p>present</p>
                    </td>
                    <td>
                      <p>gold quality</p>
                    </td>
                    <td>
                      <p>1.57e3</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>FBgn0005558</p>
                    </td>
                    <td>
                      <p>ey</p>
                    </td>
                    <td>
                      <p>FBbt:00001684</p>
                    </td>
                    <td>
                      <p>embryonic/larval hemocyte (Drosophila)</p>
                    </td>
                    <td>
                      <p>FBdv:00005339</p>
                    </td>
                    <td>
                      <p>third instar larval stage (Drosophila)</p>
                    </td>
                    <td>
                      <p>absent</p>
                    </td>
                    <td>
                      <p>silver quality</p>
                    </td>
                    <td>
                      <p>2.35e4</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <p id="single_expr_simple_col1">
            <b>Gene ID (column 1)</b>
          </p>
          <p>Unique identifier of gene from Ensembl.</p>
          <p>
            Please note that for <i>P. paniscus</i> (bonobo) we use{' '}
            <i>P. troglodytes</i> genome (chimpanzee), and that for{' '}
            <i>P. pygmaeus</i> (Bornean orangutan) we use <i>P. abelii</i>{' '}
            genome (Sumatran orangutan). Only for those species (bonobo and
            Bornean orangutan), we modify the Ensembl gene IDs, to ensure that
            we provide unique gene identifiers over all species. It is therefore
            necessary, to obtain correct Ensembl gene IDs for those species, to
            replace gene ID prefix &apos;PPAG&apos; with &apos;ENSPTRG&apos;,
            and &apos;PPYG&apos; prefix with &apos;ENSPPYG&apos;.
          </p>
          <p id="single_expr_simple_col2" className="mt-2">
            <b>Gene name (column 2)</b>
          </p>
          <p>
            Name of the gene defined by <code>Gene ID</code> (column 1)
          </p>
          <p id="single_expr_simple_col3" className="mt-2">
            <b>Anatomical entity ID (column 3)</b>
          </p>
          <p>
            Unique identifier of the anatomical entity, from the Uberon
            ontology.
          </p>
          <p id="single_expr_simple_col4" className="mt-2">
            <b>Anatomical entity name (column 4)</b>
          </p>
          <p>
            Name of the anatomical entity defined by{' '}
            <code>Anatomical entity ID</code> (column 3)
          </p>
          <p id="single_expr_simple_col5" className="mt-2">
            <b>Developmental stage ID (column 5)</b>
          </p>
          <p>
            Unique identifier of the developmental stage, from the Uberon
            ontology.
          </p>
          <p id="single_expr_simple_col6" className="mt-2">
            <b>Developmental stage name (column 6)</b>
          </p>
          <p>
            Name of the developmental stage defined by{' '}
            <code>Developmental stage ID</code> (column 5)
          </p>
          <p id="single_expr_simple_col7" className="mt-2">
            <b>Expression (column 7)</b>
          </p>
          <p>
            Call generated from all data types for <code>Gene ID</code> (column
            1), in <code>Anatomical entity ID</code> (column 3), at{' '}
            <code>Developmental stage ID</code> (column 5). Permitted values:
          </p>
          <ul className="unordered">
            <li>
              <p>
                <u>present:</u> report of presence of expression, from Bgee
                statistical tests and/or from <i>in situ</i> data sources.
              </p>
            </li>
            <li>
              <p>
                <u>past:</u> report of presence of expression, from Bgee
                statistical tests and/or from <i>in situ</i> data sources.
              </p>
            </li>
          </ul>
          <p>
            In Bgee, calls of absence of expression are always discarded if
            there exists a contradicting call of expression, for the same gene,
            in the same anatomical entity and developmental stage, or in a child
            entity or child developmental stage.
          </p>
          <p id="single_expr_simple_col8" className="mt-2">
            <b>Call quality (column 8)</b>
          </p>
          <p>Quality associated to the call. Permitted values:</p>
          <ul className="unordered">
            <li>
              <p>
                <u>high quality:</u>: presence or absence of expression reported
                as high quality from Bgee statistical tests and/or from i
                <i>in situ</i> data sources.
              </p>
            </li>
            <li>
              <p>
                <u>low quality:</u>: presence or absence of expression reported
                as high quality from Bgee statistical tests and/or from i
                <i>in situ</i> data sources.
              </p>
            </li>
          </ul>
          <p>
            From this quality a <code>summary quality</code> is calculated using
            all calls corresponding to the same gene and condition parameters
            coming from different experiments and/or data types.
          </p>
          <p>
            Quality associated to the call in column <code>Expression</code>{' '}
            (column 7) is this <code>summary quality</code> and is calculated
            using following rules:
          </p>
          <ul className="unordered">
            <li>
              <p>
                <u>gold quality:</u> 2 or more high quality calls.
              </p>
            </li>
            <li>
              <p>
                <u>silver quality:</u> 1 high quality call or 2 low quality
                calls
              </p>
            </li>
            <li>
              <p>
                <u>bronze quality:</u> 1 low quality call (for internal use
                only. Not present in this file).
              </p>
            </li>
          </ul>
          <p id="single_expr_simple_col9" className="mt-2">
            <b>Expression rank (column 9)</b>
          </p>
          <p>
            Rank score associated to the call. Rank scores of expression calls
            are normalized across genes, conditions and species.
          </p>
          <p>
            A low score means that the gene is highly expressed in the
            condition.
          </p>
        </div>
      )}
      {file === GEC_TABS.SINGLE.FILES.EXPR.ADVANCED && (
        <div className="static-section">
          <h1 className="gradient-underline title is-5 has-text-primary">
            Advanced file
          </h1>
          <p>
            Simple and advanced files contain the same expression calls (same
            number of lines) but advanced files contain more information on each
            call (more columns).
          </p>
          <p>Advanced file information:</p>
          <ul className="unordered">
            <li>
              <p>
                details of expression status generated from each data type are
                provided (present, absent, no data).
              </p>
            </li>
            <li>
              <p>
                details of number of present high quality and present low
                quality calls from each data type.
              </p>
            </li>
            <li>
              <p>
                details of number of absent high quality and absent low quality
                calls from <i>in situ</i>, Affymetrix, and RNA-Seq.
              </p>
            </li>
            <li>
              <p>
                details of data type for which calls are observed. Each call is
                observed in at least one data type
              </p>
            </li>
          </ul>
          <div>
            <p className="has-text-centered has-text-weight-semibold mb-1">
              Format description for single species advanced expression file
            </p>
            <table className="table is-bordered is-striped is-fullwidth">
              <thead>
                <tr>
                  <th>Column</th>
                  <th>Content</th>
                  <th>Example</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <p>1</p>
                  </td>
                  <td>
                    <div>
                      <p>
                        <a
                          href="#single_expr_advanced_col2"
                          className="internal-link"
                        >
                          Gene ID
                        </a>
                      </p>
                    </div>
                  </td>
                  <td>
                    <p>ENSDARG00000070769</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>2</p>
                  </td>
                  <td>
                    <div>
                      <p>
                        <a
                          href="#single_expr_advanced_col2"
                          className="internal-link"
                        >
                          Gene name
                        </a>
                      </p>
                    </div>
                  </td>
                  <td>
                    <p>foxg1a</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>3</p>
                  </td>
                  <td>
                    <div>
                      <p>
                        <a
                          href="#single_expr_advanced_col2"
                          className="internal-link"
                        >
                          Anatomical entity ID
                        </a>
                      </p>
                    </div>
                  </td>
                  <td>
                    <p>UBERON:0000955</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>4</p>
                  </td>
                  <td>
                    <div>
                      <p>
                        <a
                          href="#single_expr_advanced_col2"
                          className="internal-link"
                        >
                          Anatomical entity name
                        </a>
                      </p>
                    </div>
                  </td>
                  <td>
                    <p>brain</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>5</p>
                  </td>
                  <td>
                    <div>
                      <p>
                        <a
                          href="#single_expr_advanced_col2"
                          className="internal-link"
                        >
                          Developmental stage ID *
                        </a>
                      </p>
                    </div>
                  </td>
                  <td>
                    <p>UBERON:0000113</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>6</p>
                  </td>
                  <td>
                    <div>
                      <p>
                        <a
                          href="#single_expr_advanced_col2"
                          className="internal-link"
                        >
                          Developmental stage name *
                        </a>
                      </p>
                    </div>
                  </td>
                  <td>
                    <p>post-juvenile adult stage</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>7</p>
                  </td>
                  <td>
                    <div>
                      <p>
                        <a
                          href="#single_expr_advanced_col2"
                          className="internal-link"
                        >
                          Expression
                        </a>
                      </p>
                    </div>
                  </td>
                  <td>
                    <p>present</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>8</p>
                  </td>
                  <td>
                    <div>
                      <p>
                        <a
                          href="#single_expr_advanced_col2"
                          className="internal-link"
                        >
                          Call quality
                        </a>
                      </p>
                    </div>
                  </td>
                  <td>
                    <p>silver quality</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>9</p>
                  </td>
                  <td>
                    <div>
                      <p>
                        <a
                          href="#single_expr_advanced_col2"
                          className="internal-link"
                        >
                          See Including observed data column
                          description&quot;&gt;Expression rank
                        </a>
                      </p>
                    </div>
                  </td>
                  <td>
                    <p>1.23e4</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>10</p>
                  </td>
                  <td>
                    <div>
                      <p>
                        <a
                          href="#single_expr_advanced_col2"
                          className="internal-link"
                        >
                          Including observed data
                        </a>
                      </p>
                    </div>
                  </td>
                  <td>
                    <p>yes</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>11</p>
                  </td>
                  <td>
                    <div>
                      <p>
                        <a
                          href="#single_expr_advanced_col2"
                          className="internal-link"
                        >
                          Affymetrix data
                        </a>
                      </p>
                    </div>
                  </td>
                  <td>
                    <p>present</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>12</p>
                  </td>
                  <td>
                    <div>
                      <p>
                        <a
                          href="#single_expr_advanced_col2"
                          className="internal-link"
                        >
                          Affymetrix experiment count showing expression of this
                          gene in this condition or in sub-conditions with a
                          high quality
                        </a>
                      </p>
                    </div>
                  </td>
                  <td>
                    <p>1</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>13</p>
                  </td>
                  <td>
                    <div>
                      <p>
                        <a
                          href="#single_expr_advanced_col2"
                          className="internal-link"
                        >
                          Affymetrix experiment count showing expression of this
                          gene in this condition or in sub-conditions with a low
                          quality
                        </a>
                      </p>
                    </div>
                  </td>
                  <td>
                    <p>0</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>14</p>
                  </td>
                  <td>
                    <div>
                      <p>
                        <a
                          href="#single_expr_advanced_col2"
                          className="internal-link"
                        >
                          Affymetrix experiment count showing absence of
                          expression of this gene in this condition or valid
                          parent conditions with a high quality
                        </a>
                      </p>
                    </div>
                  </td>
                  <td>
                    <p>0</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>15</p>
                  </td>
                  <td>
                    <div>
                      <p>
                        <a
                          href="#single_expr_advanced_col2"
                          className="internal-link"
                        >
                          Affymetrix experiment count showing absence of
                          expression of this gene in this condition or valid
                          parent conditions with a low quality
                        </a>
                      </p>
                    </div>
                  </td>
                  <td>
                    <p>0</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>16</p>
                  </td>
                  <td>
                    <div>
                      <p>
                        <a
                          href="#single_expr_advanced_col2"
                          className="internal-link"
                        >
                          Including Affymetrix observed data
                        </a>
                      </p>
                    </div>
                  </td>
                  <td>
                    <p>yes</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>17</p>
                  </td>
                  <td>
                    <div>
                      <p>
                        <a
                          href="#single_expr_advanced_col2"
                          className="internal-link"
                        >
                          EST data
                        </a>
                      </p>
                    </div>
                  </td>
                  <td>
                    <p>present</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>18</p>
                  </td>
                  <td>
                    <div>
                      <p>
                        <a
                          href="#single_expr_advanced_col2"
                          className="internal-link"
                        >
                          EST experiment count showing expression of this gene
                          in this condition or in sub-conditions with a high
                          quality
                        </a>
                      </p>
                    </div>
                  </td>
                  <td>
                    <p>0</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>19</p>
                  </td>
                  <td>
                    <div>
                      <p>
                        <a
                          href="#single_expr_advanced_col2"
                          className="internal-link"
                        >
                          EST experiment count showing expression of this gene
                          in this condition or in sub-conditions with a low
                          quality
                        </a>
                      </p>
                    </div>
                  </td>
                  <td>
                    <p>0</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>20</p>
                  </td>
                  <td>
                    <div>
                      <p>
                        <a
                          href="#single_expr_advanced_col2"
                          className="internal-link"
                        >
                          Including EST observed data
                        </a>
                      </p>
                    </div>
                  </td>
                  <td>
                    <p>no</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>21</p>
                  </td>
                  <td>
                    <div>
                      <p>
                        <a
                          href="#single_expr_advanced_col2"
                          className="internal-link"
                        >
                          In situ data
                        </a>
                      </p>
                    </div>
                  </td>
                  <td>
                    <p>present</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>22</p>
                  </td>
                  <td>
                    <div>
                      <p>
                        <a
                          href="#single_expr_advanced_col2"
                          className="internal-link"
                        >
                          In situ hybridization experiment count showing
                          expression of this gene in this condition or in
                          sub-conditions with a high quality
                        </a>
                      </p>
                    </div>
                  </td>
                  <td>
                    <p>1</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>23</p>
                  </td>
                  <td>
                    <div>
                      <p>
                        <a
                          href="#single_expr_advanced_col2"
                          className="internal-link"
                        >
                          In situ hybridization experiment count showing
                          expression of this gene in this condition or in
                          sub-conditions with a low quality
                        </a>
                      </p>
                    </div>
                  </td>
                  <td>
                    <p>0</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>24</p>
                  </td>
                  <td>
                    <div>
                      <p>
                        <a
                          href="#single_expr_advanced_col2"
                          className="internal-link"
                        >
                          In situ hybridization experiment count showing absence
                          of expression of this gene in this condition or valid
                          parent conditions with a high quality
                        </a>
                      </p>
                    </div>
                  </td>
                  <td>
                    <p>0</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>25</p>
                  </td>
                  <td>
                    <div>
                      <p>
                        <a
                          href="#single_expr_advanced_col2"
                          className="internal-link"
                        >
                          In situ hybridization experiment count showing absence
                          of expression of this gene in this condition or valid
                          parent conditions with a low quality
                        </a>
                      </p>
                    </div>
                  </td>
                  <td>
                    <p>0</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>26</p>
                  </td>
                  <td>
                    <div>
                      <p>
                        <a
                          href="#single_expr_advanced_col2"
                          className="internal-link"
                        >
                          Including in situ observed data
                        </a>
                      </p>
                    </div>
                  </td>
                  <td>
                    <p>yes</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>27</p>
                  </td>
                  <td>
                    <div>
                      <p>
                        <a
                          href="#single_expr_advanced_col2"
                          className="internal-link"
                        >
                          RNA-Seq data
                        </a>
                      </p>
                    </div>
                  </td>
                  <td>
                    <p>present</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>28</p>
                  </td>
                  <td>
                    <div>
                      <p>
                        <a
                          href="#single_expr_advanced_col2"
                          className="internal-link"
                        >
                          RNA-Seq experiment count showing expression of this
                          gene in this condition or in sub-conditions with a
                          high quality
                        </a>
                      </p>
                    </div>
                  </td>
                  <td>
                    <p>1</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>29</p>
                  </td>
                  <td>
                    <div>
                      <p>
                        <a
                          href="#single_expr_advanced_col2"
                          className="internal-link"
                        >
                          RNA-Seq experiment count showing expression of this
                          gene in this condition or in sub-conditions with a low
                          quality
                        </a>
                      </p>
                    </div>
                  </td>
                  <td>
                    <p>0</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>30</p>
                  </td>
                  <td>
                    <div>
                      <p>
                        <a
                          href="#single_expr_advanced_col2"
                          className="internal-link"
                        >
                          RNA-Seq experiment count showing absence of expression
                          of this gene in this condition or valid parent
                          conditions with a high quality
                        </a>
                      </p>
                    </div>
                  </td>
                  <td>
                    <p>0</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>31</p>
                  </td>
                  <td>
                    <div>
                      <p>
                        <a
                          href="#single_expr_advanced_col2"
                          className="internal-link"
                        >
                          RNA-Seq experiment count showing absence of expression
                          of this gene in this condition or valid parent
                          conditions with a low quality
                        </a>
                      </p>
                    </div>
                  </td>
                  <td>
                    <p>0</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>32</p>
                  </td>
                  <td>
                    <div>
                      <p>
                        <a
                          href="#single_expr_advanced_col2"
                          className="internal-link"
                        >
                          Including RNA-Seq observed data
                        </a>
                      </p>
                    </div>
                  </td>
                  <td>
                    <p>yes</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            * only present if &apos;developmental stage&apos; is selected as a
            condition parameter.
          </p>
          <div>
            <p className="has-text-centered has-text-weight-semibold mb-1">
              Example lines for single species advanced expression file
            </p>
            <div className="table-container">
              <table className="table is-bordered is-striped is-fullwidth">
                <thead>
                  <tr>
                    <th>Gene ID</th>
                    <th>Gene name</th>
                    <th>Anatomical entity ID</th>
                    <th>Anatomical entity name</th>
                    <th>Developmental stage ID</th>
                    <th>Developmental stage name</th>
                    <th>Expression</th>
                    <th>Call quality</th>
                    <th>Expression rank</th>
                    <th>Including observed data</th>
                    <th>Affymetrix data</th>
                    <th>
                      Affymetrix experiment count showing expression of this
                      gene in this condition or in sub-conditions with a high
                      quality
                    </th>
                    <th>
                      Affymetrix experiment count showing expression of this
                      gene in this condition or in sub-conditions with a low
                      quality
                    </th>
                    <th>
                      Affymetrix experiment count showing absence of expression
                      of this gene in this condition or valid parent conditions
                      with a high quality
                    </th>
                    <th>
                      Affymetrix experiment count showing absence of expression
                      of this gene in this condition or valid parent conditions
                      with a low quality
                    </th>
                    <th>Including Affymetrix observed data</th>
                    <th>EST data</th>
                    <th>
                      EST experiment count showing expression of this gene in
                      this condition or in sub-conditions with a high quality
                    </th>
                    <th>
                      EST experiment count showing expression of this gene in
                      this condition or in sub-conditions with a low quality
                    </th>
                    <th>Including EST observed data</th>
                    <th>In situ data</th>
                    <th>
                      In situ hybridization experiment count showing expression
                      of this gene in this condition or in sub-conditions with a
                      high quality
                    </th>
                    <th>
                      In situ hybridization experiment count showing expression
                      of this gene in this condition or in sub-conditions with a
                      low quality
                    </th>
                    <th>
                      In situ hybridization experiment count showing absence of
                      expression of this gene in this condition or valid parent
                      conditions with a high quality
                    </th>
                    <th>
                      In situ hybridization experiment count showing absence of
                      expression of this gene in this condition or valid parent
                      conditions with a low quality
                    </th>
                    <th>Including in situ observed data</th>
                    <th>RNA-Seq data</th>
                    <th>
                      RNA-Seq experiment count showing expression of this gene
                      in this condition or in sub-conditions with a high quality
                    </th>
                    <th>
                      RNA-Seq experiment count showing expression of this gene
                      in this condition or in sub-conditions with a low quality
                    </th>
                    <th>
                      RNA-Seq experiment count showing absence of expression of
                      this gene in this condition or valid parent conditions
                      with a high quality
                    </th>
                    <th>
                      RNA-Seq experiment count showing absence of expression of
                      this gene in this condition or valid parent conditions
                      with a low quality
                    </th>
                    <th>Including RNA-Seq observed data</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <p>ENSDARG00000000002</p>
                    </td>
                    <td>
                      <p>ccdc80</p>
                    </td>
                    <td>
                      <p>UBERON:0000965</p>
                    </td>
                    <td>
                      <p>lens of camera-type eye</p>
                    </td>
                    <td>
                      <p>ZFS:0000033</p>
                    </td>
                    <td>
                      <p>Hatching:Long-pec (Danio)</p>
                    </td>
                    <td>
                      <p>present</p>
                    </td>
                    <td>
                      <p>gold quality</p>
                    </td>
                    <td>
                      <p>385</p>
                    </td>
                    <td>
                      <p>yes</p>
                    </td>
                    <td>
                      <p>no data</p>
                    </td>
                    <td>
                      <p>0</p>
                    </td>
                    <td>
                      <p>0</p>
                    </td>
                    <td>
                      <p>0</p>
                    </td>
                    <td>
                      <p>0</p>
                    </td>
                    <td>
                      <p>no</p>
                    </td>
                    <td>
                      <p>no data</p>
                    </td>
                    <td>
                      <p>0</p>
                    </td>
                    <td>
                      <p>0</p>
                    </td>
                    <td>
                      <p>no</p>
                    </td>
                    <td>
                      <p>no data</p>
                    </td>
                    <td>
                      <p>0</p>
                    </td>
                    <td>
                      <p>0</p>
                    </td>
                    <td>
                      <p>0</p>
                    </td>
                    <td>
                      <p>0</p>
                    </td>
                    <td>
                      <p>no</p>
                    </td>
                    <td>
                      <p>present</p>
                    </td>
                    <td>
                      <p>2</p>
                    </td>
                    <td>
                      <p>1</p>
                    </td>
                    <td>
                      <p>0</p>
                    </td>
                    <td>
                      <p>0</p>
                    </td>
                    <td>
                      <p>yes</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>ENSDARG00000000175</p>
                    </td>
                    <td>
                      <p>hoxb2a</p>
                    </td>
                    <td>
                      <p>UBERON:0004734</p>
                    </td>
                    <td>
                      <p>gastrula</p>
                    </td>
                    <td>
                      <p>ZFS:0000017</p>
                    </td>
                    <td>
                      <p>Gastrula:50%-epiboly (Danio)</p>
                    </td>
                    <td>
                      <p>absent</p>
                    </td>
                    <td>
                      <p>silver quality</p>
                    </td>
                    <td>
                      <p>3.6e4</p>
                    </td>
                    <td>
                      <p>yes</p>
                    </td>
                    <td>
                      <p>no data</p>
                    </td>
                    <td>
                      <p>0</p>
                    </td>
                    <td>
                      <p>0</p>
                    </td>
                    <td>
                      <p>0</p>
                    </td>
                    <td>
                      <p>0</p>
                    </td>
                    <td>
                      <p>no</p>
                    </td>
                    <td>
                      <p>no data</p>
                    </td>
                    <td>
                      <p>0</p>
                    </td>
                    <td>
                      <p>0</p>
                    </td>
                    <td>
                      <p>no</p>
                    </td>
                    <td>
                      <p>absent</p>
                    </td>
                    <td>
                      <p>0</p>
                    </td>
                    <td>
                      <p>0</p>
                    </td>
                    <td>
                      <p>0</p>
                    </td>
                    <td>
                      <p>1</p>
                    </td>
                    <td>
                      <p>no</p>
                    </td>
                    <td>
                      <p>absent</p>
                    </td>
                    <td>
                      <p>0</p>
                    </td>
                    <td>
                      <p>0</p>
                    </td>
                    <td>
                      <p>1</p>
                    </td>
                    <td>
                      <p>0</p>
                    </td>
                    <td>
                      <p>yes</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>ENSDARG00000000241</p>
                    </td>
                    <td>
                      <p>slc40a1</p>
                    </td>
                    <td>
                      <p>UBERON:0000922</p>
                    </td>
                    <td>
                      <p>embryo</p>
                    </td>
                    <td>
                      <p>ZFS:0000019</p>
                    </td>
                    <td>
                      <p>Gastrula:Shield (Danio)</p>
                    </td>
                    <td>
                      <p>present</p>
                    </td>
                    <td>
                      <p>silver quality</p>
                    </td>
                    <td>
                      <p>8.2e3</p>
                    </td>
                    <td>
                      <p>yes</p>
                    </td>
                    <td>
                      <p>present</p>
                    </td>
                    <td>
                      <p>0</p>
                    </td>
                    <td>
                      <p>1</p>
                    </td>
                    <td>
                      <p>0</p>
                    </td>
                    <td>
                      <p>0</p>
                    </td>
                    <td>
                      <p>yes</p>
                    </td>
                    <td>
                      <p>no data</p>
                    </td>
                    <td>
                      <p>0</p>
                    </td>
                    <td>
                      <p>0</p>
                    </td>
                    <td>
                      <p>no</p>
                    </td>
                    <td>
                      <p>no data</p>
                    </td>
                    <td>
                      <p>0</p>
                    </td>
                    <td>
                      <p>0</p>
                    </td>
                    <td>
                      <p>0</p>
                    </td>
                    <td>
                      <p>0</p>
                    </td>
                    <td>
                      <p>no</p>
                    </td>
                    <td>
                      <p>present</p>
                    </td>
                    <td>
                      <p>0</p>
                    </td>
                    <td>
                      <p>1</p>
                    </td>
                    <td>
                      <p>0</p>
                    </td>
                    <td>
                      <p>0</p>
                    </td>
                    <td>
                      <p>yes</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <p id="single_expr_advanced_col1">
            <b>Gene ID (column 1)</b>
          </p>
          <p>Unique identifier of gene from Ensembl.</p>
          <p>
            Please note that for <i>P. paniscus</i> (bonobo) we use{' '}
            <i>P. troglodytes</i> genome (chimpanzee), and that for{' '}
            <i>P. pygmaeus</i> (Bornean orangutan) we use <i>P. abelii</i>{' '}
            genome (Sumatran orangutan). Only for those species (bonobo and
            Bornean orangutan), we modify the Ensembl gene IDs, to ensure that
            we provide unique gene identifiers over all species. It is therefore
            necessary, to obtain correct gene IDs for those species, to replace
            gene ID prefix &apos;PPAG&apos; with &apos;ENSPTRG&apos;, and
            &apos;PPYG&apos; prefix with &apos;ENSPPYG&apos;.
          </p>
          <p id="single_expr_advanced_col2" className="mt-2">
            <b>Gene name (column 2)</b>
          </p>
          <p>
            Name of the gene defined by <code>Gene ID</code> (column 1)
          </p>
          <p id="single_expr_advanced_col3" className="mt-2">
            <b>Anatomical entity ID (column 3)</b>
          </p>
          <p>
            Unique identifier of the anatomical entity, from the Uberon
            ontology.
          </p>
          <p id="single_expr_advanced_col4" className="mt-2">
            <b>Anatomical entity name (column 4)</b>
          </p>
          <p>
            Name of the anatomical entity defined by{' '}
            <code>Anatomical entity ID</code> (column 3)
          </p>
          <p id="single_expr_advanced_col5" className="mt-2">
            <b>Developmental stage ID (column 5)</b>
          </p>
          <p>
            Unique identifier of the developmental stage, from the Uberon
            ontology.
          </p>
          <p id="single_expr_advanced_col6" className="mt-2">
            <b>Developmental stage name (column 6)</b>
          </p>
          <p>
            Name of the developmental stage defined by{' '}
            <code>Developmental stage ID</code> (column 5)
          </p>
          <p id="single_expr_advanced_col7" className="mt-2">
            <b>Expression (column 7)</b>
          </p>
          <p>
            Call generated from all data types for <code>Gene ID</code> (column
            1), in <code>Anatomical entity ID</code> (column 3), at{' '}
            <code>Developmental stage ID</code> (column 5).
          </p>
          <p>Permitted values:</p>
          <ul className="unordered">
            <li>
              <p>
                <u>present:</u> report of presence of expression, from Bgee
                statistical tests and/or from <i>in situ</i> data sources.
              </p>
            </li>
            <li>
              <p>
                <u>past:</u> report of presence of expression, from Bgee
                statistical tests and/or from <i>in situ</i> data sources.
              </p>
            </li>
          </ul>
          <p>
            In Bgee, calls of absence of expression are always discarded if
            there exists a contradicting call of expression, for the same gene,
            in the same anatomical entity and developmental stage, or in a child
            entity or child developmental stage.
          </p>
          <p id="single_expr_advanced_col8" className="mt-2">
            <b>Call quality (column 8)</b>
          </p>
          <p>Quality associated to the call. Permitted values:</p>
          <ul className="unordered">
            <li>
              <p>
                <u>high quality:</u>: presence or absence of expression reported
                as high quality from Bgee statistical tests and/or from i
                <i>in situ</i> data sources.
              </p>
            </li>
            <li>
              <p>
                <u>low quality:</u>: presence or absence of expression reported
                as high quality from Bgee statistical tests and/or from i
                <i>in situ</i> data sources.
              </p>
            </li>
          </ul>
          <p>
            From this quality a <code>summary quality</code> is calculated using
            all calls corresponding to the same gene and condition parameters
            coming from different experiments and/or data types.
          </p>
          <p>
            Quality associated to the call in column <code>Expression</code>{' '}
            (column 7) is this <code>summary quality</code> and is calculated
            using following rules:
          </p>
          <ul className="unordered">
            <li>
              <p>
                <u>gold quality:</u> 2 or more high quality calls.
              </p>
            </li>
            <li>
              <p>
                <u>silver quality:</u> 1 high quality call or 2 low quality
                calls
              </p>
            </li>
            <li>
              <p>
                <u>bronze quality:</u> 1 low quality call (for internal use
                only. Not present in this file).
              </p>
            </li>
          </ul>
          <p id="single_expr_advanced_col9" className="mt-2">
            <b>Expression rank (column 9)</b>
          </p>
          <p>
            Rank score associated to the call. Rank scores of expression calls
            are normalized across genes, conditions and species.
          </p>
          <p>
            A low score means that the gene is highly expressed in the
            condition.
          </p>
          <p id="single_expr_advanced_col10" className="mt-2">
            <b>Including observed data (column 10)</b>
          </p>
          <p>
            Permitted value: <code>yes</code>
          </p>
          <p>
            Only calls which were actually seen in experimental data, at least
            once, are in this file.
          </p>
          <p id="single_expr_advanced_col11" className="mt-2">
            <b>Affymetrix data (column 11)</b>
          </p>
          <p>
            Call generated by Affymetrix data for <code>Gene ID</code> (column
            1), in <code>Anatomical entity ID</code> (column 3), at{' '}
            <code>Developmental stage ID</code> (column 5)
          </p>
          <p>Permitted values:</p>
          <ul className="unordered">
            <li>
              <p>
                <u>present:</u> report of presence of expression from Bgee
                statistical tests. See <code>Affymetrix call quality</code>{' '}
                (column 11) for associated quality level.
              </p>
            </li>
            <li>
              <p>
                <u>absent: </u>report of absence of expression from Bgee
                statistical tests, with no contradicting call of presence of
                expression generated by other Affymetrix probesets or chips for
                the same gene, in the same anatomical entity and developmental
                stage, or in a child entity or child developmental stage.
              </p>
            </li>
            <li>
              <p>
                <u>no data:</u> no Affymetrix data available for this
                gene/anatomical entity/developmental stage (data either not
                available, or discarded by Bgee quality controls).
              </p>
            </li>
          </ul>
          <p id="single_expr_advanced_col12" className="mt-2">
            <b>
              Affymetrix experiment count showing expression of this gene in
              this condition or in sub-conditions with a high quality (column
              12)
            </b>
          </p>
          <p id="single_expr_advanced_col13" className="mt-2">
            <b>
              Affymetrix experiment count showing expression of this gene in
              this condition or in sub-conditions with a low quality (column 13)
            </b>
          </p>
          <p id="single_expr_advanced_col14" className="mt-2">
            <b>
              Affymetrix experiment count showing absence of expression of this
              gene in this condition or valid parent conditions with a high
              quality (column 14)
            </b>
          </p>
          <p id="single_expr_advanced_col15" className="mt-2">
            <b>
              Affymetrix experiment count showing absence of expression of this
              gene in this condition or valid parent conditions with a low
              quality (column 15)
            </b>
          </p>
          <p id="single_expr_advanced_col16" className="mt-2">
            <b>Including Affymetrix observed data (column 16)</b>
          </p>
          <p>
            Permitted values: <code>yes</code> and <code>no</code>.
          </p>
          <p>
            Defines whether this call was generated from propagation only, or
            whether this call was actually seen in experimental data in this
            anatomical entity/developmental stage condition.
          </p>
          <p>
            In this column, the information is provided by solely considering
            Affymetrix data.
          </p>
          <p id="single_expr_advanced_col17" className="mt-2">
            <b>EST data (column 17)</b>
          </p>
          <p>
            Call generated by EST data for <code>Gene ID</code> (column 1), in{' '}
            <code>Anatomical entity ID</code> (column 3), at{' '}
            <code>Developmental stage ID</code>(column 5). Note that EST data
            are not used to produce calls of absence of expression.
          </p>
          <p>Permitted values:</p>
          <ul className="unordered">
            <li>
              <p>
                <u>present: </u>expression reported from Bgee statistical tests.
              </p>
            </li>
            <li>
              <p>
                <u>no data: </u>no EST data available for this gene/anatomical
                entity/developmental stage (data either not available, or
                discarded by Bgee quality controls).
              </p>
            </li>
          </ul>
          <p id="single_expr_advanced_col18" className="mt-2">
            <b>
              EST experiment count showing expression of this gene in this
              condition or in sub-conditions with a high quality (column 18)
            </b>
          </p>
          <p id="single_expr_advanced_col19" className="mt-2">
            <b>
              EST experiment count showing expression of this gene in this
              condition or in sub-conditions with a low quality (column 19)
            </b>
          </p>
          <p id="single_expr_advanced_col20" className="mt-2">
            <b>Including EST observed data (column 20)</b>
          </p>
          <p>
            Permitted values: <code>yes</code> and <code>no</code>.
          </p>
          <p>
            Defines whether this call was generated from propagation only, or
            whether this call was actually seen in experimental data in this
            anatomical entity/developmental stage condition.
          </p>
          <p>
            In this column, the information is provided by solely considering
            EST data.
          </p>
          <p id="single_expr_advanced_col21" className="mt-2">
            <b>In situ data (column 21)</b>
          </p>
          <p>
            Call generated by <i>in situ</i> data for <code>Gene ID</code>{' '}
            (column 1), in <code>Anatomical entity ID</code> (column 3), at{' '}
            <code>Developmental stage ID</code>(column 5).
          </p>
          <p>Permitted values:</p>
          <ul className="unordered">
            <li>
              <p>
                <u>present: </u> report of presence of expression from{' '}
                <i>in situ.</i> data sources.
              </p>
            </li>
            <li>
              <p>
                <u>absent: </u> report of absence of expression from{' '}
                <i>in situ.</i> data sources, with no contradicting call of
                presence of expression generated by other <i>in situ.</i>{' '}
                hybridization evidence lines for the same gene, in the same
                anatomical entity and developmental stage, or in a child entity
                or child developmental stage.
              </p>
            </li>
            <li>
              <p>
                <u>no data:</u> no <i>in situ.</i> data available for this
                gene/anatomical entity/developmental stage (data either not
                available, or discarded by Bgee quality controls).
              </p>
            </li>
          </ul>
          <p id="single_expr_advanced_col22" className="mt-2">
            <b>
              In situ hybridization experiment count showing expression of this
              gene in this condition or in sub-conditions with a high quality
              (column 22)
            </b>
          </p>
          <p id="single_expr_advanced_col23" className="mt-2">
            <b>
              In situ hybridization experiment count showing expression of this
              gene in this condition or in sub-conditions with a low quality
              (column 23)
            </b>
          </p>
          <p id="single_expr_advanced_col24" className="mt-2">
            <b>
              In situ hybridization experiment count showing absence of
              expression of this gene in this condition or valid parent
              conditions with a high quality (column 24)
            </b>
          </p>
          <p id="single_expr_advanced_col25" className="mt-2">
            <b>
              In situ hybridization experiment count showing absence of
              expression of this gene in this condition or valid parent
              conditions with a low quality (column 25)
            </b>
          </p>
          <p id="single_expr_advanced_col26" className="mt-2">
            <b>Including in situ observed data (column 26)</b>
          </p>
          <p>
            Permitted values: <code>yes</code> and <code>no</code>.
          </p>
          <p>
            Defines whether this call was generated from propagation only, or
            whether this call was actually seen in experimental data in this
            anatomical entity/developmental stage condition.
          </p>
          <p>
            In this column, the information is provided by solely considering{' '}
            <i>in situ</i> data.
          </p>
          <p id="single_expr_advanced_col27" className="mt-2">
            <b>RNA-Seq data (column 27)</b>
          </p>
          <p>
            Call generated by RNA-Seq data for <code>Gene ID</code> (column 1),
            in <code>Anatomical entity ID</code> (column 3), at{' '}
            <code>Developmental stage ID</code> (column 5).
          </p>
          <p>Permitted values:</p>
          <ul className="unordered">
            <li>
              <p>
                <u>present:</u> report of presence of expression from Bgee
                statistical tests. See <code>RNA-Seq call quality</code> (column
                20) for associated quality level.
              </p>
            </li>
            <li>
              <p>
                <u>absent:</u> report of absence of expression from Bgee
                statistical tests, with no contradicting call of presence of
                expression generated by other RNA-Seq libraries for the same
                gene, in the same anatomical entity and developmental stage, or
                in a child entity or child developmental stage. report of
                absence of expression from Bgee statistical tests, with no
                contradicting call of presence of expression generated by other
                RNA-Seq libraries for the same gene, in the same anatomical
                entity and developmental stage, or in a child entity or child
                developmental stage.
              </p>
            </li>
            <li>
              <p>
                <u>no data:</u> no RNA-Seq data available for this
                gene/anatomical entity/developmental stage (data either not
                available, or discarded by Bgee quality controls).
              </p>
            </li>
          </ul>
          <p id="single_expr_advanced_col28" className="mt-2">
            <b>
              RNA-Seq experiment count showing expression of this gene in this
              condition or in sub-conditions with a high quality (column 28)
            </b>
          </p>
          <p id="single_expr_advanced_col29" className="mt-2">
            <b>
              RNA-Seq experiment count showing expression of this gene in this
              condition or in sub-conditions with a low quality (column 29)
            </b>
          </p>
          <p id="single_expr_advanced_col30" className="mt-2">
            <b>
              RNA-Seq experiment count showing absence of expression of this
              gene in this condition or valid parent conditions with a high
              quality (column 30)
            </b>
          </p>
          <p id="single_expr_advanced_col31" className="mt-2">
            <b>
              RNA-Seq experiment count showing absence of expression of this
              gene in this condition or valid parent conditions with a low
              quality (column 31)
            </b>
          </p>
          <p id="single_expr_advanced_col32" className="mt-2">
            <b>Including RNA-Seq observed data (column 32)</b>
          </p>
          <p>
            Permitted values: <code>yes</code> and <code>no</code>.
          </p>
          <p>
            Defines whether this call was generated from propagation only, or
            whether this call was actually seen in experimental data in this
            anatomical entity/developmental stage condition.
          </p>
          <p>
            In this column, the information is provided by solely considering
            RNA-Seq data.
          </p>
          <p>
            This corresponds to the same expression state summary column as in
            simple files (column 7 of presence/absence simple file).
          </p>
        </div>
      )}
    </div>
  );
};

export default GECSingleExpr;
