/* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions,jsx-a11y/control-has-associated-label */
import React from 'react';
import classnames from '../../helpers/classnames';

const GECSingleDiff = () => {
  const [active, setActive] = React.useState('simple');
  return (
    <div id="single_diff">
      <div className="static-section">
        <div className="notification is-warning is-light">
          Please note, these data will be available in a future release.
        </div>
        <p>
          Bgee provides calls of over-/under-expression. A call corresponds to a
          gene, with significant variation of its level of expression, in an
          anatomical entity during a developmental stage, as compared to,
          either: i) other anatomical entities at the same (broadly defined)
          developmental stage (over-/under-expression across anatomy); ii) the
          same anatomical entity at different (precise) developmental stages
          (over-/under-expression across life stages). These analyses of
          differential expression are performed using Affymetrix and RNA-Seq
          experiments with at least 3 suitable conditions (anatomical
          entity/developmental stage), and at least 2 replicates for each; as
          for all data in Bgee, only &quot;normal&quot; expression is considered
          (i.e., no treatment, no disease, no gene knock-out, etc.).
        </p>
        <p>
          Bgee runs all possible differential expression analyses for each
          experiment independently, then collects all results and provides a
          summary as unique calls{' '}
          <code>gene - anatomical entity - developmental stage</code>, with
          confidence information, and conflicts within each data type resolved
          using a voting system weighted by p-values (conflicts between
          different data types are treated differently). This offers the
          possibility to aggregate and compare these calls between different
          experiments, different data types, and different species.
        </p>
        <p>
          Note that, as opposed to calls of presence/absence of expression, no
          propagation of differential expression calls is performed using
          anatomical and life stage ontologies.
        </p>
        <p>
          Over-/under-expression calls are then filtered and presented
          differently depending on whether a <code>simple file</code> or a{' '}
          <code>complete file</code> is used. Notably: <code>simple files</code>{' '}
          aim at providing summarized information over all data types;{' '}
          <code>complete files</code> aim at reporting all information, allowing
          for instance to retrieve the contribution of each data type to a call,
          or to retrieve all genes and conditions tested, including genes having
          no differential expression in these conditions.
        </p>
        <div className="tabs is-toggle is-toggle-rounded is-small">
          <ul>
            <li className={classnames({ 'is-active': active === 'simple' })}>
              <a onClick={() => setActive('simple')}>simple file</a>
            </li>
            <li className={classnames({ 'is-active': active === 'complete' })}>
              <a onClick={() => setActive('complete')}>complete file</a>
            </li>
          </ul>
        </div>
      </div>
      {active === 'simple' && (
        <div className="static-section">
          <h1 className="gradient-underline title is-5 has-text-primary">
            Simple file
          </h1>
          <p>
            In simple files, only calls of over-expression and under-expression
            are provided, summarizing the contribution of each data type to the
            call.
          </p>
          <div>
            <p className="has-text-centered has-text-weight-semibold mb-1">
              Format description for single species simple differential
              expression file
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
                          href="#single_diff_simple_col1"
                          className="internal-link"
                        >
                          Gene ID
                        </a>
                      </p>
                    </div>
                  </td>
                  <td>
                    <p>ENSG00000000419</p>
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
                          href="#single_diff_simple_col2"
                          className="internal-link"
                        >
                          Gene name
                        </a>
                      </p>
                    </div>
                  </td>
                  <td>
                    <p>DPM1</p>
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
                          href="#single_diff_simple_col3"
                          className="internal-link"
                        >
                          Anatomical entity ID
                        </a>
                      </p>
                    </div>
                  </td>
                  <td>
                    <p>UBERON:0009834</p>
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
                          href="#single_diff_simple_col4"
                          className="internal-link"
                        >
                          Anatomical entity name
                        </a>
                      </p>
                    </div>
                  </td>
                  <td>
                    <p>dorsolateral prefrontal cortex</p>
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
                          href="#single_diff_simple_col5"
                          className="internal-link"
                        >
                          Developmental stage ID
                        </a>
                      </p>
                    </div>
                  </td>
                  <td>
                    <p>HsapDv:0000083</p>
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
                          href="#single_diff_simple_col6"
                          className="internal-link"
                        >
                          Developmental stage name
                        </a>
                      </p>
                    </div>
                  </td>
                  <td>
                    <p>infant stage (human)</p>
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
                          href="#single_diff_simple_col7"
                          className="internal-link"
                        >
                          Differential expression
                        </a>
                      </p>
                    </div>
                  </td>
                  <td>
                    <p>under-expression</p>
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
                          href="#single_diff_simple_col8"
                          className="internal-link"
                        >
                          Call quality
                        </a>
                      </p>
                    </div>
                  </td>
                  <td>
                    <p>high quality</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <p className="has-text-centered has-text-weight-semibold mb-1">
              Example lines for single species simple differential expression
              file
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
                    <th>Differential expression</th>
                    <th>Call quality</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <p>ENSG00000000003</p>
                    </td>
                    <td>
                      <p>TSPAN6</p>
                    </td>
                    <td>
                      <p>UBERON:0000922</p>
                    </td>
                    <td>
                      <p>embryo</p>
                    </td>
                    <td>
                      <p>HsapDv:0000017</p>
                    </td>
                    <td>
                      <p>Carnegie stage 10 (human)</p>
                    </td>
                    <td>
                      <p>over-expression</p>
                    </td>
                    <td>
                      <p>low quality</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>ENSG00000000419</p>
                    </td>
                    <td>
                      <p>DPM1</p>
                    </td>
                    <td>
                      <p>UBERON:0000922</p>
                    </td>
                    <td>
                      <p>embryo</p>
                    </td>
                    <td>
                      <p>HsapDv:0000020</p>
                    </td>
                    <td>
                      <p>Carnegie stage 13 (human)</p>
                    </td>
                    <td>
                      <p>under-expression</p>
                    </td>
                    <td>
                      <p>low quality</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>ENSG00000000457</p>
                    </td>
                    <td>
                      <p>SCYL3</p>
                    </td>
                    <td>
                      <p>UBERON:0000178</p>
                    </td>
                    <td>
                      <p>blood</p>
                    </td>
                    <td>
                      <p>HsapDv:0000094</p>
                    </td>
                    <td>
                      <p>65-79 year-old human stage (human)</p>
                    </td>
                    <td>
                      <p>over-expression</p>
                    </td>
                    <td>
                      <p>low quality</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <p className="mt-2" id="single_diff_simple_col1">
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
          <p id="single_diff_simple_col2" className="mt-2">
            <b>Gene name (column 2)</b>
          </p>
          <p>
            Name of the gene defined by <code>Gene ID</code> (column 1)
          </p>
          <p id="single_diff_simple_col3" className="mt-2">
            <b>Anatomical entity ID (column 3)</b>
          </p>
          <p>
            Unique identifier of the anatomical entity, from the Uberon
            ontology.
          </p>
          <p id="single_diff_simple_col4" className="mt-2">
            <b>Anatomical entity name (column 4)</b>
          </p>
          <p>
            Name of the anatomical entity defined by{' '}
            <code>Anatomical entity ID</code> (column 4)
          </p>
          <p id="single_diff_simple_col5" className="mt-2">
            <b>Developmental stage ID (column 5)</b>
          </p>
          <p>
            Unique identifier of the developmental stage, from the Uberon
            ontology.
          </p>
          <p id="single_diff_simple_col6" className="mt-2">
            <b>Developmental stage name (column 6)</b>
          </p>
          <p>
            Name of the developmental stage defined by{' '}
            <code>Developmental stage ID</code> (column 5)
          </p>
          <p id="single_diff_simple_col7" className="mt-2">
            <b>Differential expression (column 7)</b>
          </p>
          <p>
            Call generated from all data types for <i>Gene ID</i> (column 1), in{' '}
            <i>Anatomical entity ID</i> (column 3), at{' '}
            <i>Developmental stage ID</i> (column 5)
          </p>
          <p>Permitted values:</p>
          <ul className="unordered">
            <li>
              <p>
                <u>over-expression</u>: the gene was shown in one or more
                analyses to have a significant over-expression in this
                condition, as compared to the expression levels in other
                conditions of the analyses.
              </p>
            </li>
            <li>
              <p>
                <u>under-expressio</u>: the gene was shown in one or more
                analyses to have a significant under-expression in this
                condition, as compared to the expression levels in other
                conditions of the analyses.
              </p>
            </li>
            <li>
              <p>
                <u>weak ambiguity</u>: there exists a call of over-expression or
                under-expression generated from a data type, but another data
                type showed no significant variation of the level of expression
                of this gene in the same condition; or, a gene was shown to be
                never expressed in a condition by some analyses of a given data
                type, but other analyses of different data types produced a call
                of over-expression or of absence of differential expression for
                the same gene, in the same condition (note that conflicts where
                a data type produced an under-expression call in a condition,
                while another data type showed the same gene to be never
                expressed in that condition, do not produce a{' '}
                <code>weak ambiguity</code> call, but a call of{' '}
                <code>under-expression low quality</code>).
              </p>
            </li>
            <li>
              <p>
                <u>strong ambiguity</u>: there exists a call of over-expression
                or under-expression generated from a data type, but there exists
                a call in the opposite direction generated from another data
                type for the same gene, anatomical entity and developmental
                stage. For instance, gene A is reported to be over-expressed in
                the midbrain at young adult stage from Affymetrix data, but is
                reported to be under-expressed in the midbrain at young adult
                stage from RNA-Seq data.
              </p>
            </li>
          </ul>
          <p id="single_diff_simple_col8" className="mt-2">
            <b>Call quality (column 8)</b>
          </p>
          <p>
            Confidence in the differential expression call provided in{' '}
            <i>Differential expression</i> (column 7).
          </p>
          <p>Permitted values:</p>
          <ul className="unordered">
            <li>
              <p>
                <u>high quality</u>: differential expression reported as high
                quality, with no contradicting call from same type of analysis
                (across anatomy/across life stages), for same gene, in same
                anatomical entity and developmental stage, (call generated
                either from multiple congruent analyses, or from a single
                analysis).
              </p>
            </li>
            <li>
              <p>
                <u>poor quality</u>: differential expression reported as low
                quality, or there exists a conflict for the same gene,
                anatomical entity and developmental stage, from different
                analyses of a same data type (conflicts between different data
                types are treated differently). For instance, an analysis showed
                a gene to be over-expressed in a condition, while another
                analysis showed the same gene to be under-expressed or not
                differentially expressed in the same condition. Such conflicts
                are resolved by a voting system based on the number of
                conditions compared, weighted by p-value. Note that in one case,
                this quality level is used to reconcile conflicting calls from
                different data types: when a data type produced an
                under-expression call, while a different data type has shown
                that the same gene was never seen as expressed in the same
                condition. In that case, the overall summary is{' '}
                <code>under-expression low quality</code>
                <u>.</u>
              </p>
            </li>
            <li>
              <p>
                <u>NA</u>: no quality applicable when ambiguity state in{' '}
                <code>Differential expression</code> (column 7).
              </p>
            </li>
          </ul>
          <p>
            <a href="#single_diff" className="internal-link">
              Back to over-/under-expression menu
            </a>
          </p>
        </div>
      )}
      {active === 'complete' && (
        <div className="static-section">
          <h1 className="gradient-underline title is-5 has-text-primary">
            Complete file
          </h1>
          <p>
            The differences between simple and complete files are that, in
            complete files:
          </p>
          <ul className="unordered">
            <li>
              <p>
                details of the contribution of each data type to the final calls
                are provided, notably with information about best p-values, or
                number of supporting/conflicting analyses.
              </p>
            </li>
            <li>
              <p>
                calls representing absence of differential expression are
                provided, allowing to determine all genes and conditions tested
                for differential expression.
              </p>
            </li>
          </ul>
          <div>
            <p className="has-text-centered has-text-weight-semibold mb-1">
              Format description for single species complete differential
              expression file
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
                          href="#single_diff_complete_col1"
                          className="internal-link"
                        >
                          Gene ID
                        </a>
                      </p>
                    </div>
                  </td>
                  <td>
                    <p>ENSMUSG00000093930</p>
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
                          href="#single_diff_complete_col2"
                          className="internal-link"
                        >
                          Gene name
                        </a>
                      </p>
                    </div>
                  </td>
                  <td>
                    <p>Hmgcs1</p>
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
                          href="#single_diff_complete_col3"
                          className="internal-link"
                        >
                          Anatomical entity ID
                        </a>
                      </p>
                    </div>
                  </td>
                  <td>
                    <p>UBERON:0002107</p>
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
                          href="#single_diff_complete_col4"
                          className="internal-link"
                        >
                          Anatomical entity name
                        </a>
                      </p>
                    </div>
                  </td>
                  <td>
                    <p>liver</p>
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
                          href="#single_diff_complete_col5"
                          className="internal-link"
                        >
                          Developmental stage ID
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
                          href="#single_diff_complete_col6"
                          className="internal-link"
                        >
                          Developmental stage name
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
                          href="#single_diff_complete_col7"
                          className="internal-link"
                        >
                          Differential expression
                        </a>
                      </p>
                    </div>
                  </td>
                  <td>
                    <p>over-expression</p>
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
                          href="#single_diff_complete_col8"
                          className="internal-link"
                        >
                          Call quality
                        </a>
                      </p>
                    </div>
                  </td>
                  <td>
                    <p>high quality</p>
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
                          href="#single_diff_complete_col9"
                          className="internal-link"
                        >
                          Affymetrix data
                        </a>
                      </p>
                    </div>
                  </td>
                  <td>
                    <p>over-expression</p>
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
                          href="#single_diff_complete_col10"
                          className="internal-link"
                        >
                          Affymetrix call quality
                        </a>
                      </p>
                    </div>
                  </td>
                  <td>
                    <p>poor quality</p>
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
                          href="#single_diff_complete_col11"
                          className="internal-link"
                        >
                          Affymetrix best supporting p-value
                        </a>
                      </p>
                    </div>
                  </td>
                  <td>
                    <p>0.0035659347</p>
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
                          href="#single_diff_complete_col12"
                          className="internal-link"
                        >
                          Affymetrix analysis count supporting Affymetrix call
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
                          href="#single_diff_complete_col13"
                          className="internal-link"
                        >
                          Affymetrix analysis count in conflict with Affymetrix
                          call
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
                    <p>14</p>
                  </td>
                  <td>
                    <div>
                      <p>
                        <a
                          href="#single_diff_complete_col14"
                          className="internal-link"
                        >
                          RNA-Seq data
                        </a>
                      </p>
                    </div>
                  </td>
                  <td>
                    <p>over-expression</p>
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
                          href="#single_diff_complete_col15"
                          className="internal-link"
                        >
                          RNA-Seq call quality
                        </a>
                      </p>
                    </div>
                  </td>
                  <td>
                    <p>high quality</p>
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
                          href="#single_diff_complete_col16"
                          className="internal-link"
                        >
                          RNA-Seq best supporting p-value
                        </a>
                      </p>
                    </div>
                  </td>
                  <td>
                    <p>2.96E-8</p>
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
                          href="#single_diff_complete_col17"
                          className="internal-link"
                        >
                          RNA-Seq analysis count supporting RNA-Seq call
                        </a>
                      </p>
                    </div>
                  </td>
                  <td>
                    <p>2</p>
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
                          href="#single_diff_complete_col18"
                          className="internal-link"
                        >
                          RNA-Seq analysis count in conflict with RNA-Seq call
                        </a>
                      </p>
                    </div>
                  </td>
                  <td>
                    <p>0</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <p className="has-text-centered has-text-weight-semibold mb-1">
              Example lines for single species complete differential expression
              file
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
                    <th>Differential expression</th>
                    <th>Call quality</th>
                    <th>Affymetrix data</th>
                    <th>Affymetrix call quality</th>
                    <th>Affymetrix best supporting p-value</th>
                    <th>
                      Affymetrix analysis count supporting Affymetrix call
                    </th>
                    <th>
                      Affymetrix analysis count in conflict with Affymetrix call
                    </th>
                    <th>RNA-Seq data</th>
                    <th>RNA-Seq call quality</th>
                    <th>RNA-Seq best supporting p-value</th>
                    <th>RNA-Seq analysis count supporting RNA-Seq call</th>
                    <th>
                      RNA-Seq analysis count in conflict with RNA-Seq call
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <p>ENSMUSG00000000001</p>
                    </td>
                    <td>
                      <p>Gnai3</p>
                    </td>
                    <td>
                      <p>UBERON:0000081</p>
                    </td>
                    <td>
                      <p>metanephros</p>
                    </td>
                    <td>
                      <p>MmusDv:0000027</p>
                    </td>
                    <td>
                      <p>Theiler stage 20 (mouse)</p>
                    </td>
                    <td>
                      <p>no diff expression</p>
                    </td>
                    <td>
                      <p>high quality</p>
                    </td>
                    <td>
                      <p>no diff expression</p>
                    </td>
                    <td>
                      <p>high quality</p>
                    </td>
                    <td>
                      <p>0.22166589</p>
                    </td>
                    <td>
                      <p>1</p>
                    </td>
                    <td>
                      <p>0</p>
                    </td>
                    <td>
                      <p>no data</p>
                    </td>
                    <td>
                      <p>no data</p>
                    </td>
                    <td>
                      <p>1.0</p>
                    </td>
                    <td>
                      <p>0</p>
                    </td>
                    <td>
                      <p>0</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>ENSMUSG00000000028</p>
                    </td>
                    <td>
                      <p>Cdc45</p>
                    </td>
                    <td>
                      <p>UBERON:0000992</p>
                    </td>
                    <td>
                      <p>female gonad</p>
                    </td>
                    <td>
                      <p>MmusDv:0000035</p>
                    </td>
                    <td>
                      <p>Theiler stage 26 (mouse)</p>
                    </td>
                    <td>
                      <p>under-expression</p>
                    </td>
                    <td>
                      <p>poor quality</p>
                    </td>
                    <td>
                      <p>under-expression</p>
                    </td>
                    <td>
                      <p>poor quality</p>
                    </td>
                    <td>
                      <p>6.386149E-4</p>
                    </td>
                    <td>
                      <p>1</p>
                    </td>
                    <td>
                      <p>1</p>
                    </td>
                    <td>
                      <p>no data</p>
                    </td>
                    <td>
                      <p>no data</p>
                    </td>
                    <td>
                      <p>1.0</p>
                    </td>
                    <td>
                      <p>0</p>
                    </td>
                    <td>
                      <p>0</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>ENSMUSG00000000031</p>
                    </td>
                    <td>
                      <p>H19</p>
                    </td>
                    <td>
                      <p>UBERON:0002037</p>
                    </td>
                    <td>
                      <p>cerebellum</p>
                    </td>
                    <td>
                      <p>MmusDv:0000036</p>
                    </td>
                    <td>
                      <p>Theiler stage 27 (mouse)</p>
                    </td>
                    <td>
                      <p>over-expression</p>
                    </td>
                    <td>
                      <p>high quality</p>
                    </td>
                    <td>
                      <p>over-expression</p>
                    </td>
                    <td>
                      <p>high quality</p>
                    </td>
                    <td>
                      <p>1.2336E-6</p>
                    </td>
                    <td>
                      <p>2</p>
                    </td>
                    <td>
                      <p>0</p>
                    </td>
                    <td>
                      <p>no data</p>
                    </td>
                    <td>
                      <p>no data</p>
                    </td>
                    <td>
                      <p>1.0</p>
                    </td>
                    <td>
                      <p>0</p>
                    </td>
                    <td>
                      <p>0</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <p className="mt-2" id="single_diff_complete_col1">
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
          <p className="mt-2" id="single_diff_complete_col2">
            <b>Gene name (column 2)</b>
          </p>
          <p>
            Name of the gene defined by <code>Gene ID</code> (column 1)
          </p>
          <p className="mt-2" id="single_diff_complete_col3">
            <b>Anatomical entity ID (column 3)</b>
          </p>
          <p>
            Unique identifier of the anatomical entity, from the Uberon
            ontology.
          </p>
          <p className="mt-2" id="single_diff_complete_col4">
            <b>Anatomical entity name (column 4)</b>
          </p>
          <p>
            Name of the anatomical entity defined by{' '}
            <code>Anatomical entity ID</code> (column 4)
          </p>
          <p className="mt-2" id="single_diff_complete_col5">
            <b>Developmental stage ID (column 5)</b>
          </p>
          <p>
            Unique identifier of the developmental stage, from the Uberon
            ontology.
          </p>
          <p className="mt-2" id="single_diff_complete_col6">
            <b>Developmental stage name (column 6)</b>
          </p>
          <p>
            Name of the developmental stage defined by{' '}
            <code>Developmental stage ID</code> (column 5)
          </p>
          <p className="mt-2" id="single_diff_complete_col7">
            <b>Differential expression (column 7)</b>
          </p>
          <p>
            Call generated from all data types for <i>Gene ID</i> (column 1), in{' '}
            <i>Anatomical entity ID</i> (column 3), at{' '}
            <i>Developmental stage ID</i> (column 5)
          </p>
          <p>Permitted values:</p>
          <ul className="unordered">
            <li>
              <p>
                <u>over-expression</u>: the gene was shown in one or more
                analyses to have a significant over-expression in this
                condition, as compared to the expression levels in other
                conditions of the analyses.
              </p>
            </li>
            <li>
              <p>
                <u>under-expressio</u>: the gene was shown in one or more
                analyses to have a significant under-expression in this
                condition, as compared to the expression levels in other
                conditions of the analyses.
              </p>
            </li>
            <li>
              <p>
                <u>weak ambiguity</u>: there exists a call of over-expression or
                under-expression generated from a data type, but another data
                type showed no significant variation of the level of expression
                of this gene in the same condition; or, a gene was shown to be
                never expressed in a condition by some analyses of a given data
                type, but other analyses of different data types produced a call
                of over-expression or of absence of differential expression for
                the same gene, in the same condition (note that conflicts where
                a data type produced an under-expression call in a condition,
                while another data type showed the same gene to be never
                expressed in that condition, do not produce a{' '}
                <code>weak ambiguity</code> call, but a call of{' '}
                <code>under-expression low quality</code>).
              </p>
            </li>
            <li>
              <p>
                <u>strong ambiguity</u>: there exists a call of over-expression
                or under-expression generated from a data type, but there exists
                a call in the opposite direction generated from another data
                type for the same gene, anatomical entity and developmental
                stage. For instance, gene A is reported to be over-expressed in
                the midbrain at young adult stage from Affymetrix data, but is
                reported to be under-expressed in the midbrain at young adult
                stage from RNA-Seq data.
              </p>
            </li>
          </ul>
          <p className="mt-2" id="single_diff_complete_col8">
            <b>Call quality (column 8)</b>
          </p>
          <p>
            Confidence in the differential expression call provided in{' '}
            <i>Differential expression</i> (column 7).
          </p>
          <p>Permitted values:</p>
          <ul className="unordered">
            <li>
              <p>
                <u>high quality</u>: differential expression reported as high
                quality, with no contradicting call from same type of analysis
                (across anatomy/across life stages), for same gene, in same
                anatomical entity and developmental stage, (call generated
                either from multiple congruent analyses, or from a single
                analysis).
              </p>
            </li>
            <li>
              <p>
                <u>poor quality</u>: differential expression reported as low
                quality, or there exists a conflict for the same gene,
                anatomical entity and developmental stage, from different
                analyses of a same data type (conflicts between different data
                types are treated differently). For instance, an analysis showed
                a gene to be over-expressed in a condition, while another
                analysis showed the same gene to be under-expressed or not
                differentially expressed in the same condition. Such conflicts
                are resolved by a voting system based on the number of
                conditions compared, weighted by p-value. Note that in one case,
                this quality level is used to reconcile conflicting calls from
                different data types: when a data type produced an
                under-expression call, while a different data type has shown
                that the same gene was never seen as expressed in the same
                condition. In that case, the overall summary is{' '}
                <code>under-expression low quality</code>
                <u>.</u>
              </p>
            </li>
            <li>
              <p>
                <u>NA</u>: no quality applicable when ambiguity state in{' '}
                <code>Differential expression</code> (column 7).
              </p>
            </li>
          </ul>
          <p id="single_diff_complete_col9" className="mt-2">
            <b>Affymetrix data (column 9)</b>
          </p>
          <p>
            Call generated from Affymetrix data for <code>Gene ID</code> (column
            1), in <code>Anatomical entity ID</code> (column 5), at{' '}
            <code>Developmental stage ID</code> (column 3).
          </p>
          <p>Permitted values:</p>
          <ul className="unordered">
            <li>
              <p>
                <u>over-expression</u>: the gene was shown in one or more
                analyses to have a significant over-expression in this
                condition, as compared to the expression levels in other
                conditions of the analyses.
              </p>
            </li>
            <li>
              <p>
                <u>under-expression</u>: the gene was shown in one or more
                analyses to have a significant under-expression in this
                condition, as compared to the expression levels in other
                conditions of the analyses.
              </p>
            </li>
            <li>
              <p>
                <u>no diff expression</u>: the gene was tested for differential
                expression in this condition, but was never shown to have a
                significant variation of expression as compared to the other
                conditions of the analyses.
              </p>
            </li>
            <li>
              <p>
                <u>no data</u>: no analyses of this data type compared
                expression level of this gene in this condition.
              </p>
            </li>
          </ul>
          <p id="single_diff_complete_col10" className="mt-2">
            <b>Affymetrix call quality (column 10)</b>
          </p>
          <p>
            Confidence in the differential expression call provided in{' '}
            <code>Affymetrix data</code> (column 9).
          </p>
          <p>Permitted values:</p>
          <ul className="unordered">
            <li>
              <p>
                <u>high quality</u>: differential expression reported as high
                quality, with no contradicting call from same type of analysis
                (across anatomy/across life stages), for same gene, in same
                anatomical entity and developmental stage, (call generated
                either from multiple congruent analyses, or from a single
                analysis).
              </p>
            </li>
            <li>
              <p>
                <u>poor quality</u>: differential expression reported as low
                quality, or there exists a conflict for the same gene,
                anatomical entity and developmental stage, from different
                analyses of a same data type (conflicts between different data
                types are treated differently). For instance, an analysis showed
                a gene to be over-expressed in a condition, while another
                analysis showed the same gene to be under-expressed or not
                differentially expressed in the same condition. Such conflicts
                are resolved by a voting system based on the number of
                conditions compared, weighted by p-value. Note that in one case,
                this quality level is used to reconcile conflicting calls from
                different data types: when a data type produced an
                under-expression call, while a different data type has shown
                that the same gene was never seen as expressed in the same
                condition. In that case, the overall summary is{' '}
                <code>under-expression low quality</code>.
              </p>
            </li>
            <li>
              <p>
                <u>no data</u>: no data associated with{' '}
                <code>Affymetrix data</code> (column 9).
              </p>
            </li>
          </ul>
          <p id="single_diff_complete_col11" className="mt-2">
            <b>Affymetrix best supporting p-value (column 11)</b>
          </p>
          <p>
            Best p-value from the Affymetrix analyses supporting the Affymetrix
            call provided in <code>Affymetrix data</code> (column 9). Set to 1.0
            if no data available by Affymetrix.
          </p>
          <p id="single_diff_complete_col12" className="mt-2">
            <b>
              Affymetrix analysis count supporting Affymetrix call (column 12)
            </b>
          </p>
          <p>
            Number of Affymetrix analyses supporting the Affymetrix call
            provided in <code>Affymetrix data</code> (column 9). Set to 0 if no
            data available by Affymetrix.
          </p>
          <p id="single_diff_complete_col13" className="mt-2">
            <b>
              Affymetrix analysis count in conflict with Affymetrix call (column
              13)
            </b>
          </p>
          <p>
            Number of Affymetrix analyses in conflict, generating a call
            different from the call provided in <code>Affymetrix data</code>{' '}
            (column 9). Set to 0 if no data available by Affymetrix.
          </p>
          <p id="single_diff_complete_col14" className="mt-2">
            <b>RNA-Seq data (column 14)</b>
          </p>
          <p>
            Call generated from RNA-Seq data for <code>Gene ID</code> (column
            1), in <code>Anatomical entity ID</code> (column 5), at{' '}
            <code>Developmental stage ID</code> (column 3).
          </p>
          <p>Permitted values:</p>
          <ul className="unordered">
            <li>
              <p>
                <u>over-expression</u>: the gene was shown in one or more
                analyses to have a significant over-expression in this
                condition, as compared to the expression levels in other
                conditions of the analyses.
              </p>
            </li>
            <li>
              <p>
                <u>under-expression</u>: the gene was shown in one or more
                analyses to have a significant under-expression in this
                condition, as compared to the expression levels in other
                conditions of the analyses.
              </p>
            </li>
            <li>
              <p>
                <u>no diff expression</u>: the gene was tested for differential
                expression in this condition, but was never shown to have a
                significant variation of expression as compared to the other
                conditions of the analyses.
              </p>
            </li>
            <li>
              <p>
                <u>no data</u>: no analyses of this data type compared
                expression level of this gene in this condition.
              </p>
            </li>
          </ul>
          <p id="single_diff_complete_col15" className="mt-2">
            <b>RNA-Seq call quality (column 15)</b>
          </p>
          <p>
            Confidence in the differential expression call provided in{' '}
            <code>RNA-Seq data</code> (column 14).
          </p>
          <p>Permitted values:</p>
          <ul className="unordered">
            <li>
              <p>
                <u>high quality</u>: differential expression reported as high
                quality, with no contradicting call from same type of analysis
                (across anatomy/across life stages), for same gene, in same
                anatomical entity and developmental stage, (call generated
                either from multiple congruent analyses, or from a single
                analysis).
              </p>
            </li>
            <li>
              <p>
                <u>poor quality</u>: differential expression reported as low
                quality, or there exists a conflict for the same gene,
                anatomical entity and developmental stage, from different
                analyses of a same data type (conflicts between different data
                types are treated differently). For instance, an analysis showed
                a gene to be over-expressed in a condition, while another
                analysis showed the same gene to be under-expressed or not
                differentially expressed in the same condition. Such conflicts
                are resolved by a voting system based on the number of
                conditions compared, weighted by p-value. Note that in one case,
                this quality level is used to reconcile conflicting calls from
                different data types: when a data type produced an
                under-expression call, while a different data type has shown
                that the same gene was never seen as expressed in the same
                condition. In that case, the overall summary is{' '}
                <code>under-expression low quality</code>.
              </p>
            </li>
            <li>
              <p>
                <u>no data</u>: no data associated with{' '}
                <code>RNA-Seq data</code> (column 14).
              </p>
            </li>
          </ul>
          <p id="single_diff_complete_col16" className="mt-2">
            <b>RNA-Seq best supporting p-value (column 16)</b>
          </p>
          <p>
            Best p-value from the RNA-Seq analyses supporting the RNA-Seq call
            provided in <code>RNA-Seq data</code> (column 14). Set to 1.0 if no
            data available by RNA-Seq.
          </p>
          <p id="single_diff_complete_col17" className="mt-2">
            <b>RNA-Seq analysis count supporting RNA-Seq call (column 17)</b>
          </p>
          <p>
            Number of RNA-Seq analyses supporting the RNA-Seq call provided in{' '}
            <code>RNA-Seq data</code> (column 14). Set to 0 if no data available
            by RNA-Seq.
          </p>
          <p id="single_diff_complete_col18" className="mt-2">
            <b>
              RNA-Seq analysis count in conflict with RNA-Seq call (column 18)
            </b>
          </p>
          <p>
            Number of RNA-Seq analyses in conflict, generating a call different
            from the call provided in <code>RNA-Seq data</code> (column 14). Set
            to 0 if no data available by RNA-Seq.
          </p>
          <p>
            <a href="#single_diff" className="internal-link">
              Back to over-/under-expression menu
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export default GECSingleDiff;
