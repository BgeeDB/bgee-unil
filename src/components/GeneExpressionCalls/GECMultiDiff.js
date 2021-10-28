/* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions,jsx-a11y/control-has-associated-label */
import React from 'react';
import { useHistory } from 'react-router-dom';
import classnames from '../../helpers/classnames';
import useQuery from '../../hooks/useQuery';
import GEC_TABS from '../../helpers/constants/GecTabs';

// <h1 className="gradient-underline title is-5 has-text-primary">

const GECMultiDiff = () => {
  const file = useQuery('file');
  const history = useHistory();

  const onClick = React.useCallback(
    (key) => () => {
      history.push(
        `?cat=${GEC_TABS.CAT.MULTI}&section=${GEC_TABS.MULTI.DIFF}&file=${key}`
      );
    },
    []
  );
  React.useEffect(() => {
    if (!file)
      history.push(
        `?cat=${GEC_TABS.CAT.MULTI}&section=${GEC_TABS.MULTI.DIFF}&file=${GEC_TABS.MULTI.FILES.DIFF.SIMPLE}`
      );
  }, [file]);

  return (
    <div id="multi_diff">
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
          In multi-species files, results are made comparable between
          orthologous genes, in homologous anatomical entities and comparable
          developmental stages: only genes sharing a common ancestral gene in
          the least common ancestor of the species compared are studied, and
          only in anatomical entities sharing a homology relation between all
          species compared, with data mapped to broad developmental stages
          shared across animal kingdom (see{' '}
          <a
            href={`?cat=${GEC_TABS.CAT.MULTI}&section=${GEC_TABS.MULTI.DIFF}`}
            className="internal-link"
          >
            use of homology in multi-species files
          </a>
          ).
        </p>
        <p>
          Note that, as opposed to calls of presence/absence of expression, no
          propagation of differential expression calls is performed using
          anatomical and life stage ontologies.
        </p>
        <p>
          Over-/under-expression calls are then filtered and presented
          differently depending on whether a <code>simple file</code>, or a{' '}
          <code>complete file</code> is used. Notably: <code>simple files</code>{' '}
          aim at providing one line per gene orthology group and homologous
          anatomical entities/developmental stage, and only for anatomical
          entities with a homology relation defined with good level of
          confidence. <code>complete files</code> aim at reporting all
          information, for each gene of the orthology groups, using all
          available homology relations between anatomical entities, and allowing
          for instance to retrieve the contribution of each data type to a call,
          or to retrieve all genes and conditions tested, including genes having
          no differential expression in these conditions.
        </p>
        <div className="tabs is-toggle is-toggle-rounded is-small">
          <ul>
            <li
              className={classnames({
                'is-active': file === GEC_TABS.MULTI.FILES.DIFF.SIMPLE,
              })}
            >
              <a onClick={onClick(GEC_TABS.MULTI.FILES.DIFF.SIMPLE)}>
                simple file
              </a>
            </li>
            <li
              className={classnames({
                'is-active': file === GEC_TABS.MULTI.FILES.DIFF.COMPLETE,
              })}
            >
              <a onClick={onClick(GEC_TABS.MULTI.FILES.DIFF.COMPLETE)}>
                complete file
              </a>
            </li>
          </ul>
        </div>
      </div>
      {file === GEC_TABS.MULTI.FILES.DIFF.SIMPLE && (
        <div className="static-section">
          <h1 className="gradient-underline title is-5 has-text-primary">
            Simple file
          </h1>
          <p>
            In simple files, each line provides information for a gene orthology
            group, in a condition (homologous anatomical entity/comparable
            developmental stage); columns then provide, for each species, the
            number of genes over-expressed, under-expressed, not differentially
            expressed or with inconclusive results, and with no data. This means
            that the number of columns is variable depending on the number of
            species compared.
          </p>
          <p>
            In simple files, only lines with data in at least two species, and
            at least one over-expression or under-expression call in a species,
            are provided, and only for anatomical entities with a homology
            relation defined with a good level of confidence.
          </p>
          <p>
            Relations of orthology between genes member of a same orthology gene
            group are provided through the associated{' '}
            <a
              href={`?cat=${GEC_TABS.CAT.MULTI}&section=${GEC_TABS.MULTI.OMA_HOG}`}
              className="internal-link"
            >
              hierarchical orthologous groups file
            </a>
            .
          </p>
          <div>
            <p className="has-text-centered has-text-weight-semibold mb-1">
              Format description for multi-species simple differential
              expression file
            </p>
            <table className="table is-bordered is-striped is-fullwidth">
              <thead>
                <tr>
                  <th>Column</th>
                  <th>Content</th>
                  <th>Cardinality</th>
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
                          href="#multi_diff_simple_col1"
                          className="internal-link"
                        >
                          OMA ID
                        </a>
                      </p>
                    </div>
                  </td>
                  <td>
                    <p>1</p>
                  </td>
                  <td>
                    <p>80</p>
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
                          href="#multi_diff_simple_col2"
                          className="internal-link"
                        >
                          Anatomical entity IDs
                        </a>
                      </p>
                    </div>
                  </td>
                  <td>
                    <p>1 or greater</p>
                  </td>
                  <td>
                    <p>UBERON:0001898</p>
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
                          href="#multi_diff_simple_col3"
                          className="internal-link"
                        >
                          Anatomical entity names
                        </a>
                      </p>
                    </div>
                  </td>
                  <td>
                    <p>1 or greater</p>
                  </td>
                  <td>
                    <p>hypothalamus</p>
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
                          href="#multi_diff_simple_col4"
                          className="internal-link"
                        >
                          Developmental stage ID
                        </a>
                      </p>
                    </div>
                  </td>
                  <td>
                    <p>1</p>
                  </td>
                  <td>
                    <p>UBERON:0000113</p>
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
                          href="#multi_diff_simple_col5"
                          className="internal-link"
                        >
                          Developmental stage name
                        </a>
                      </p>
                    </div>
                  </td>
                  <td>
                    <p>1</p>
                  </td>
                  <td>
                    <p>post-juvenile adult stage</p>
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
                          href="#multi_diff_simple_col6"
                          className="internal-link"
                        >
                          Over-expressed gene count for species1
                        </a>{' '}
                        (e.g.,{' '}
                        <code>Over-expressed gene count for Homo sapiens</code>)
                      </p>
                    </div>
                  </td>
                  <td>
                    <p>1</p>
                  </td>
                  <td>
                    <p>1</p>
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
                          href="#multi_diff_simple_col7"
                          className="internal-link"
                        >
                          Under-expressed gene count for species1
                        </a>{' '}
                        (e.g.,{' '}
                        <code>Under-expressed gene count for Homo sapiens</code>
                        )
                      </p>
                    </div>
                  </td>
                  <td>
                    <p>1</p>
                  </td>
                  <td>
                    <p>0</p>
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
                          href="#multi_diff_simple_col9"
                          className="internal-link"
                        >
                          Not diff. expressed gene count for species1
                        </a>{' '}
                        (e.g.,{' '}
                        <code>
                          Not diff. expressed gene count for Homo sapiens
                        </code>
                        )
                      </p>
                    </div>
                  </td>
                  <td>
                    <p>1</p>
                  </td>
                  <td>
                    <p>0</p>
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
                          href="#multi_diff_simple_col9"
                          className="internal-link"
                        >
                          NA gene count for species1
                        </a>{' '}
                        (e.g., <code>NA gene count for Homo sapiens</code>)
                      </p>
                    </div>
                  </td>
                  <td>
                    <p>1</p>
                  </td>
                  <td>
                    <p>...</p>
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
                          href="#multi_diff_simple_col6"
                          className="internal-link"
                        >
                          Over-expressed gene count for species2
                        </a>{' '}
                        (e.g.,{' '}
                        <code>Over-expressed gene count for Mus musculus</code>)
                      </p>
                    </div>
                  </td>
                  <td>
                    <p>1</p>
                  </td>
                  <td>
                    <p>1</p>
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
                          href="#multi_diff_simple_col7"
                          className="internal-link"
                        >
                          Under-expressed gene count for species2
                        </a>{' '}
                        (e.g.,{' '}
                        <code>Under-expressed gene count for Mus musculus</code>
                        )
                      </p>
                    </div>
                  </td>
                  <td>
                    <p>1</p>
                  </td>
                  <td>
                    <p>0</p>
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
                          href="#multi_diff_simple_col9"
                          className="internal-link"
                        >
                          Not diff. expressed gene count for species2
                        </a>{' '}
                        (e.g.,{' '}
                        <code>
                          Not diff. expressed gene count for Mus musculus
                        </code>
                        )
                      </p>
                    </div>
                  </td>
                  <td>
                    <p>1</p>
                  </td>
                  <td>
                    <p>0</p>
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
                          href="#multi_diff_simple_col9"
                          className="internal-link"
                        >
                          NA gene count for species2
                        </a>{' '}
                        (e.g., <code>NA gene count for Mus musculus</code>)
                      </p>
                    </div>
                  </td>
                  <td>
                    <p>1</p>
                  </td>
                  <td>
                    <p>...</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>...</p>
                  </td>
                  <td>
                    <div>
                      <p>Over-expressed gene count for speciesXX</p>
                    </div>
                  </td>
                  <td>
                    <p />
                  </td>
                  <td>
                    <p />
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>...</p>
                  </td>
                  <td>
                    <div>
                      <p>...</p>
                    </div>
                  </td>
                  <td>
                    <p />
                  </td>
                  <td>
                    <p />
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>(species*4 + 6)</p>
                  </td>
                  <td>
                    <div>
                      <p>
                        <a
                          href="#multi_diff_simple_col_gene_ids"
                          className="internal-link"
                        >
                          Gene IDs
                        </a>
                      </p>
                    </div>
                  </td>
                  <td>
                    <p>2 or greater</p>
                  </td>
                  <td>
                    <p>ENSG00000169057|ENSMUSG00000031393</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>(species*4 + 7)</p>
                  </td>
                  <td>
                    <div>
                      <p>
                        <a
                          href="#multi_diff_simple_col_gene_names"
                          className="internal-link"
                        >
                          Gene names
                        </a>
                      </p>
                    </div>
                  </td>
                  <td>
                    <p>2 or greater</p>
                  </td>
                  <td>
                    <p>MECP2|Mecp2</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <p className="has-text-centered has-text-weight-semibold mb-1">
              Example lines for multi-species simple differential expression
              file
            </p>
            <div className="table-container">
              <table className="table is-bordered is-striped is-fullwidth">
                <thead>
                  <tr>
                    <th>OMA ID</th>
                    <th>Anatomical entity IDs</th>
                    <th>Anatomical entity names</th>
                    <th>Developmental stage ID</th>
                    <th>Developmental stage name</th>
                    <th>Over-expressed gene count for Homo sapiens</th>
                    <th>Under-expressed gene count for Homo sapiens</th>
                    <th>Not diff. expressed gene count for Homo sapiens</th>
                    <th>NA gene count for Homo sapiens</th>
                    <th>Over-expressed gene count for Mus musculus</th>
                    <th>Under-expressed gene count for Mus musculus</th>
                    <th>Not diff. expressed gene count for Mus musculus</th>
                    <th>NA gene count for Mus musculus</th>
                    <th>Gene IDs</th>
                    <th>Gene names</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <p>93</p>
                    </td>
                    <td>
                      <p>UBERON:0000473</p>
                    </td>
                    <td>
                      <p>testis</p>
                    </td>
                    <td>
                      <p>UBERON:0000113</p>
                    </td>
                    <td>
                      <p>post-juvenile adult stage</p>
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
                      <p>ENSG00000162512|ENSMUSG00000025743</p>
                    </td>
                    <td>
                      <p>SDC3|Sdc3</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>93</p>
                    </td>
                    <td>
                      <p>UBERON:0000955</p>
                    </td>
                    <td>
                      <p>brain</p>
                    </td>
                    <td>
                      <p>UBERON:0000113</p>
                    </td>
                    <td>
                      <p>post-juvenile adult stage</p>
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
                      <p>0</p>
                    </td>
                    <td>
                      <p>ENSG00000162512|ENSMUSG00000025743</p>
                    </td>
                    <td>
                      <p>SDC3|Sdc3</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>93</p>
                    </td>
                    <td>
                      <p>UBERON:0001134</p>
                    </td>
                    <td>
                      <p>skeletal muscle tissue</p>
                    </td>
                    <td>
                      <p>UBERON:0000113</p>
                    </td>
                    <td>
                      <p>post-juvenile adult stage</p>
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
                      <p>ENSG00000162512|ENSMUSG00000025743</p>
                    </td>
                    <td>
                      <p>SDC3|Sdc3</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <p id="multi_diff_simple_col1" className="mt-2">
            <b>OMA ID (column 1)</b>
          </p>
          <p>
            Unique identifier of the OMA gene orthology group. Note that these
            identifiers are not stable between releases, and cannot be used to
            retrieve data from{' '}
            <a
              href="https://omabrowser.org/oma/hogs/"
              target="_blank"
              rel="noopener noreferrer"
              className="external-link"
            >
              the OMA browser
            </a>
            . They are provided solely to group data from orthologous genes
            belonging to the same orthology group. Genes member of an OMA gene
            orthology group can be retrieved through the associated{' '}
            <a
              href={`?cat=${GEC_TABS.CAT.MULTI}&section=${GEC_TABS.MULTI.OMA_HOG}`}
              className="internal-link"
            >
              hierarchical orthologous groups file
            </a>
            .
          </p>
          <p id="multi_diff_simple_col2" className="mt-2">
            <b>Anatomical entity IDs (column 2)</b>
          </p>
          <p>
            Unique identifiers of the homologous anatomical entities, from the
            Uberon ontology. Cardinality 1 or greater. When more than one
            anatomical entity is used, they are separated with the character
            |.|..
          </p>
          <p>
            In most cases, the cardinality is 1, as most of the homologous
            anatomical entities compared in different species are not derived
            enough so that they are described by different anatomical concepts.
            But the cardinality can sometimes be greater, when homologous
            anatomical entities are highly derived in the species compared, and
            represented by distinct anatomical concepts.
          </p>
          <p id="multi_diff_simple_col3" className="mt-2">
            <b>Anatomical entity names (column 3)</b>
          </p>
          <p>
            Names of the anatomical entities defined by{' '}
            <code>Anatomical entity IDs</code> (column 2). Cardinality 1 or
            greater. When more than one anatomical entity is used, they are
            separated with the character <code>|</code>. See{' '}
            <code>Anatomical entity IDs</code> column description for more
            details.
          </p>
          <p id="multi_diff_simple_col4" className="mt-2">
            <b>Developmental stage ID (column 4)</b>
          </p>
          <p id="multi_diff_simple_col5" className="mt-2">
            <b>Developmental stage name (column 5)</b>
          </p>
          <p>
            Name of the developmental stage defined by{' '}
            <code>Developmental stage ID</code> (column 4)
          </p>
          <p id="multi_diff_simple_col6" className="mt-2">
            <b>Over-expressed gene count for speciesXX</b>
          </p>
          <p>
            Number of genes, members of the OMA orthologous gene group with ID
            provided in <code>OMA ID</code> (column 1), shown in one or more
            analyses to have a significant over-expression in this condition (
            <code>Anatomical entity IDs</code> (column 2), at{' '}
            <code>Developmental stage ID</code> (column 4)), as compared to the
            expression levels in other conditions of the analyses. This means
            that there were no conflicts found between results generated from
            different data types (results generated either from a single data
            type, or from congruent analyses of different data types). Note that
            there can still be conflicts between different analyses within a
            same data type, but such conflicts are resolved by a voting system
            based on the number of conditions compared, weighted by p-value, in
            order to produce a single differential expression call, taking into
            account all analyses from a given data type.
          </p>
          <p>
            Please note that the list of all genes member of the OMA orthologous
            gene group with ID provided in <code>OMA ID</code> (column 1) is
            provided through the{' '}
            <a
              href={`?cat=${GEC_TABS.CAT.MULTI}&section=${GEC_TABS.MULTI.OMA_HOG}`}
              className="internal-link"
            >
              hierarchical orthologous groups file
            </a>
            .
          </p>
          <p id="multi_diff_simple_col7" className="mt-2">
            <b>Under-expressed gene count for speciesXX</b>
          </p>
          <p>
            Number of genes, members of the OMA orthologous gene group with ID
            provided in <code>OMA ID</code> (column 1), shown in one or more
            analyses to have a significant under-expression in this condition (
            <code>Anatomical entity IDs</code> (column 2), at{' '}
            <code>Developmental stage ID</code> (column 4)), as compared to the
            expression levels in other conditions of the analyses. This means
            that there were no conflicts found between results generated from
            different data types (results generated either from a single data
            type, or from congruent analyses of different data types). Note that
            there can still be conflicts between different analyses within a
            same data type, but such conflicts are resolved by a voting system
            based on the number of conditions compared, weighted by p-value, in
            order to produce a single differential expression call, taking into
            account all analyses from a given data type.
          </p>
          <p>
            Please note that the list of all genes member of the OMA orthologous
            gene group with ID provided in <code>OMA ID</code> (column 1) is
            provided through the{' '}
            <a
              href={`?cat=${GEC_TABS.CAT.MULTI}&section=${GEC_TABS.MULTI.OMA_HOG}`}
              className="internal-link"
            >
              hierarchical orthologous groups file
            </a>
            .
          </p>
          <p id="multi_diff_simple_col8" className="mt-2">
            <b>Not diff. expressed gene count for speciesXX</b>
          </p>
          <p>
            Number of genes, members of the OMA orthologous gene group with ID
            provided in <code>OMA ID</code> (column 1), that were tested for
            differential expression in this condition (
            <code>Anatomical entity IDs</code> (column 2), at{' '}
            <code>Developmental stage ID</code>(column 4)), but that were never
            shown to have a significant variation of their level of expression
            as compared to the other conditions of the analyses, or for which
            conflicting results were generated from different data types.
          </p>
          <p>
            Please note that the list of all genes member of the OMA orthologous
            gene group with ID provided in <code>OMA ID</code> (column 1) is
            provided through the{' '}
            <a
              href={`?cat=${GEC_TABS.CAT.MULTI}&section=${GEC_TABS.MULTI.OMA_HOG}`}
              className="internal-link"
            >
              hierarchical orthologous groups file
            </a>
            .
          </p>
          <p id="multi_diff_simple_col9" className="mt-2">
            <b>NA gene count for speciesXX</b>
          </p>
          <p>
            Number of genes, members of the OMA orthologous gene group with ID
            provided in <code>OMA ID</code> (column 1), that were not tested for
            differential expression in this condition (
            <code>Anatomical entity IDs</code> (column 2), at{' '}
            <code>Developmental stage ID</code> (column 4)).
          </p>
          <p>
            Please note that the list of all genes member of the OMA orthologous
            gene group with ID provided in <code>OMA ID</code> (column 1) is
            provided through the{' '}
            <a
              href={`?cat=${GEC_TABS.CAT.MULTI}&section=${GEC_TABS.MULTI.OMA_HOG}`}
              className="internal-link"
            >
              hierarchical orthologous groups file
            </a>
            .
          </p>
          <p id="multi_diff_simple_col_gene_ids" className="mt-2">
            <b>Gene IDs</b>
          </p>
          <p>
            IDs of the genes member of the OMA orthologous gene group with ID
            provided in <code>OMA ID</code> (column 1). Cardinality 2 or
            greater. IDs are separated with the character <code>|</code>.
          </p>
          <p>
            This column is provided as additional information, members of OMA
            orthologous gene groups can be retrieved through the use of the{' '}
            <a
              href={`?cat=${GEC_TABS.CAT.MULTI}&section=${GEC_TABS.MULTI.OMA_HOG}`}
              className="internal-link"
            >
              hierarchical orthologous groups file
            </a>
            .
          </p>
          <p id="multi_diff_simple_col_gene_names" className="mt-2">
            <b>Gene names</b>
          </p>
          <p>
            Name of the genes member of the OMA orthologous gene group with ID
            provided in <code>OMA ID</code> (column 1). Cardinality 2 or
            greater. IDs are separated with the character <code>|</code>.
          </p>
          <p>
            This column is provided as additional information, members of OMA
            orthologous gene groups can be retrieved through the use of the{' '}
            <a
              href={`?cat=${GEC_TABS.CAT.MULTI}&section=${GEC_TABS.MULTI.OMA_HOG}`}
              className="internal-link"
            >
              hierarchical orthologous groups file
            </a>
            .
          </p>
        </div>
      )}
      {file === GEC_TABS.MULTI.FILES.DIFF.COMPLETE && (
        <div className="static-section">
          <h1 className="gradient-underline title is-5 has-text-primary">
            Complete file
          </h1>
          <p>
            In complete files, information for all genes are provided, in all
            conditions tested, for anatomical entities homologous between all
            species compared, and comparable broad developmental stages. As
            opposed to simple multi-species files, all homology relations
            available for the anatomical entities are considered, even from
            homology hypotheses with low support; a column allows to retrieve
            the level of confidence in the homology hypothesis used. Also, the
            number of columns in complete files is not variable, whatever the
            number of species compared is.
          </p>
          <p>
            Relations of orthology between genes can be retrieved through the
            use of the{' '}
            <a
              href={`?cat=${GEC_TABS.CAT.MULTI}&section=${GEC_TABS.MULTI.OMA_HOG}`}
              className="internal-link"
            >
              hierarchical orthologous groups file
            </a>
            . This allows notably to detect genes with no data for a condition:
            if a gene is listed as a member of an orthology group, but there is
            no call for this gene in a given condition, it means that there is
            no data available for this gene in this condition.
          </p>
          <div>
            <p className="has-text-centered has-text-weight-semibold mb-1">
              Format description for multi-species complete differential
              expression file
            </p>
            <table className="table is-bordered is-striped is-fullwidth">
              <thead>
                <tr>
                  <th>Column</th>
                  <th>Content</th>
                  <th>Cardinality</th>
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
                          href="#multi_diff_complete_col1"
                          className="internal-link"
                        >
                          OMA ID
                        </a>
                      </p>
                    </div>
                  </td>
                  <td>
                    <p>1</p>
                  </td>
                  <td>
                    <p>42865</p>
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
                          href="#multi_diff_complete_col2"
                          className="internal-link"
                        >
                          Gene ID
                        </a>
                      </p>
                    </div>
                  </td>
                  <td>
                    <p>1</p>
                  </td>
                  <td>
                    <p>ENSMMUG00000012094</p>
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
                          href="#multi_diff_complete_col3"
                          className="internal-link"
                        >
                          Gene name
                        </a>
                      </p>
                    </div>
                  </td>
                  <td>
                    <p>1</p>
                  </td>
                  <td>
                    <p>RAB17</p>
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
                          href="#multi_diff_complete_col4"
                          className="internal-link"
                        >
                          Anatomical entity IDs
                        </a>
                      </p>
                    </div>
                  </td>
                  <td>
                    <p>1 or greater</p>
                  </td>
                  <td>
                    <p>UBERON:0002037</p>
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
                          href="#multi_diff_complete_col5"
                          className="internal-link"
                        >
                          Anatomical entity names
                        </a>
                      </p>
                    </div>
                  </td>
                  <td>
                    <p>1 or greater</p>
                  </td>
                  <td>
                    <p>cerebellum</p>
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
                          href="#multi_diff_complete_col6"
                          className="internal-link"
                        >
                          Developmental stage ID
                        </a>
                      </p>
                    </div>
                  </td>
                  <td>
                    <p>1</p>
                  </td>
                  <td>
                    <p>UBERON:0018241</p>
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
                          href="#multi_diff_complete_col7"
                          className="internal-link"
                        >
                          Developmental stage name
                        </a>
                      </p>
                    </div>
                  </td>
                  <td>
                    <p>1</p>
                  </td>
                  <td>
                    <p>prime adult stage</p>
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
                          href="#multi_diff_complete_col8"
                          className="internal-link"
                        >
                          Latin species name
                        </a>
                      </p>
                    </div>
                  </td>
                  <td>
                    <p>1</p>
                  </td>
                  <td>
                    <p>Macaca_mulatta</p>
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
                          href="#multi_diff_complete_col9"
                          className="internal-link"
                        >
                          Differential expression
                        </a>
                      </p>
                    </div>
                  </td>
                  <td>
                    <p>1</p>
                  </td>
                  <td>
                    <p>under-expression</p>
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
                          href="#multi_diff_complete_col10"
                          className="internal-link"
                        >
                          Call quality
                        </a>
                      </p>
                    </div>
                  </td>
                  <td>
                    <p>1</p>
                  </td>
                  <td>
                    <p>high quality</p>
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
                          href="#multi_diff_complete_col11"
                          className="internal-link"
                        >
                          Affymetrix data
                        </a>
                      </p>
                    </div>
                  </td>
                  <td>
                    <p>1</p>
                  </td>
                  <td>
                    <p>no data</p>
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
                          href="#multi_diff_complete_col12"
                          className="internal-link"
                        >
                          Affymetrix call quality
                        </a>
                      </p>
                    </div>
                  </td>
                  <td>
                    <p>1</p>
                  </td>
                  <td>
                    <p>no data</p>
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
                          href="#multi_diff_complete_col13"
                          className="internal-link"
                        >
                          Affymetrix best supporting p-value
                        </a>
                      </p>
                    </div>
                  </td>
                  <td>
                    <p>1</p>
                  </td>
                  <td>
                    <p>1.0</p>
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
                          href="#multi_diff_complete_col14"
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
                          href="#multi_diff_complete_col15"
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
                          href="#multi_diff_complete_col16"
                          className="internal-link"
                        >
                          RNA-Seq data
                        </a>
                      </p>
                    </div>
                  </td>
                  <td>
                    <p>1</p>
                  </td>
                  <td>
                    <p>under-expression</p>
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
                          href="#multi_diff_complete_col17"
                          className="internal-link"
                        >
                          RNA-Seq call quality
                        </a>
                      </p>
                    </div>
                  </td>
                  <td>
                    <p>1</p>
                  </td>
                  <td>
                    <p>high quality</p>
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
                          href="#multi_diff_complete_col18"
                          className="internal-link"
                        >
                          RNA-Seq best supporting p-value
                        </a>
                      </p>
                    </div>
                  </td>
                  <td>
                    <p>1</p>
                  </td>
                  <td>
                    <p>8.82E-7</p>
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
                          href="#multi_diff_complete_col19"
                          className="internal-link"
                        >
                          RNA-Seq analysis count supporting RNA-Seq call
                        </a>
                      </p>
                    </div>
                  </td>
                  <td>
                    <p>1</p>
                  </td>
                  <td>
                    <p>1</p>
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
                          href="#multi_diff_complete_col20"
                          className="internal-link"
                        >
                          RNA-Seq analysis count in conflict with RNA-Seq call
                        </a>
                      </p>
                    </div>
                  </td>
                  <td>
                    <p>1</p>
                  </td>
                  <td>
                    <p>0</p>
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
                          href="#multi_diff_complete_col21"
                          className="internal-link"
                        >
                          Anatomy homology CIO ID
                        </a>
                      </p>
                    </div>
                  </td>
                  <td>
                    <p>1</p>
                  </td>
                  <td>
                    <p>CIO:0000003</p>
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
                          href="#multi_diff_complete_col22"
                          className="internal-link"
                        >
                          Anatomy homology CIO name
                        </a>
                      </p>
                    </div>
                  </td>
                  <td>
                    <p>1</p>
                  </td>
                  <td>
                    <p>high confidence from single evidence</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <p className="has-text-centered has-text-weight-semibold mb-1">
              Example lines for multi-species complete differential expression
              file
            </p>
            <div className="table-container">
              <table className="table is-bordered is-striped is-fullwidth">
                <thead>
                  <tr>
                    <th>OMA ID</th>
                    <th>Gene ID</th>
                    <th>Gene name</th>
                    <th>Anatomical entity IDs</th>
                    <th>Anatomical entity names</th>
                    <th>Developmental stage ID</th>
                    <th>Developmental stage name</th>
                    <th>Latin species name</th>
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
                    <th>Anatomy homology CIO ID</th>
                    <th>Anatomy homology CIO name</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <p>59</p>
                    </td>
                    <td>
                      <p>ENSMUSG00000030516</p>
                    </td>
                    <td>
                      <p>Tjp1</p>
                    </td>
                    <td>
                      <p>UBERON:0000948</p>
                    </td>
                    <td>
                      <p>heart</p>
                    </td>
                    <td>
                      <p>UBERON:0018241</p>
                    </td>
                    <td>
                      <p>prime adult stage</p>
                    </td>
                    <td>
                      <p>Mus_musculus</p>
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
                      <p>0.0</p>
                    </td>
                    <td>
                      <p>5</p>
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
                    <td>
                      <p>CIO:0000004</p>
                    </td>
                    <td>
                      <p>medium confidence from single evidence</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>59</p>
                    </td>
                    <td>
                      <p>ENSMMUG00000017878</p>
                    </td>
                    <td>
                      <p>Tjp1</p>
                    </td>
                    <td>
                      <p>UBERON:0000948</p>
                    </td>
                    <td>
                      <p>heart</p>
                    </td>
                    <td>
                      <p>UBERON:0018241</p>
                    </td>
                    <td>
                      <p>prime adult stage</p>
                    </td>
                    <td>
                      <p>Macaca_mulatta</p>
                    </td>
                    <td>
                      <p>no diff expression</p>
                    </td>
                    <td>
                      <p>high quality</p>
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
                    <td>
                      <p>no diff expression</p>
                    </td>
                    <td>
                      <p>high quality</p>
                    </td>
                    <td>
                      <p>0.6239275</p>
                    </td>
                    <td>
                      <p>2</p>
                    </td>
                    <td>
                      <p>0</p>
                    </td>
                    <td>
                      <p>CIO:0000004</p>
                    </td>
                    <td>
                      <p>medium confidence from single evidence</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>59</p>
                    </td>
                    <td>
                      <p>ENSBTAG00000015398</p>
                    </td>
                    <td>
                      <p>ZO1</p>
                    </td>
                    <td>
                      <p>UBERON:0000948</p>
                    </td>
                    <td>
                      <p>heart</p>
                    </td>
                    <td>
                      <p>UBERON:0018241</p>
                    </td>
                    <td>
                      <p>prime adult stage</p>
                    </td>
                    <td>
                      <p>Bos_taurus</p>
                    </td>
                    <td>
                      <p>over-expression</p>
                    </td>
                    <td>
                      <p>high quality</p>
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
                    <td>
                      <p>over-expression</p>
                    </td>
                    <td>
                      <p>high quality</p>
                    </td>
                    <td>
                      <p>8.741838E-4</p>
                    </td>
                    <td>
                      <p>1</p>
                    </td>
                    <td>
                      <p>0</p>
                    </td>
                    <td>
                      <p>CIO:0000004</p>
                    </td>
                    <td>
                      <p>medium confidence from single evidence</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <p id="multi_diff_complete_col1" className="mt-2">
            <b>OMA ID (column 1)</b>
          </p>
          <p>
            Unique identifier of the OMA gene orthology group. Note that these
            identifiers are not stable between releases, and cannot be used to
            retrieve data from{' '}
            <a
              href="text"
              target="_blank"
              rel="noopener noreferrer"
              className="external-link"
            >
              the OMA browser
            </a>
            . They are provided solely to group data from orthologous genes
            belonging to the same orthology group. Genes member of an OMA gene
            orthology group can be retrieved through the associated{' '}
            <a
              href={`?cat=${GEC_TABS.CAT.MULTI}&section=${GEC_TABS.MULTI.OMA_HOG}`}
              className="internal-link"
            >
              hierarchical orthologous groups file
            </a>
            .
          </p>
          <p id="multi_diff_complete_col2" className="mt-2">
            <b>Gene ID (column 2) (column 2)</b>
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
          <p>
            Please note that the list of all genes member of the OMA orthologous
            gene group with ID provided in <code>OMA ID</code> (column 1) is
            provided through the{' '}
            <a
              href={`?cat=${GEC_TABS.CAT.MULTI}&section=${GEC_TABS.MULTI.OMA_HOG}`}
              className="internal-link"
            >
              hierarchical orthologous groups file
            </a>
            . If a gene listed in this file has no call for the condition{' '}
            <code>Anatomical entity IDs</code> (column 4), at{' '}
            <code>Developmental stage ID</code> (column 6), it means that there
            is no data available for this gene in this condition.
          </p>
          <p id="multi_diff_complete_col3" className="mt-2">
            <b>Gene name (column 3)</b>
          </p>
          <p>
            Name of the gene defined by <code>Gene ID</code> (column 2)
          </p>
          <p id="multi_diff_complete_col4" className="mt-2">
            <b>Anatomical entity IDs (column 4)</b>
          </p>
          <p>
            Unique identifiers of the homologous anatomical entities, from the
            Uberon ontology. Cardinality 1 or greater. When more than one
            anatomical entity is used, they are separated with the character{' '}
            <code>|</code>.
          </p>
          <p id="multi_diff_complete_col5" className="mt-2">
            <b>Anatomical entity names (column 5)</b>
          </p>
          <p>
            Names of the anatomical entities defined by{' '}
            <code>Anatomical entity IDs</code> (column 4). Cardinality 1 or
            greater. When more than one anatomical entity is used, they are
            separated with the character <code>|</code>. See{' '}
            <code>Anatomical entity IDs</code> column description for more
            details.
          </p>
          <p id="multi_diff_complete_col6" className="mt-2">
            <b>Developmental stage ID (column 6)</b>
          </p>
          <p>
            Unique identifier of the developmental stage, from the Uberon
            ontology. For multi-species analyses, only broad developmental
            stages are used, common to the species being compared.
          </p>
          <p id="multi_diff_complete_col7" className="mt-2">
            <b>Developmental stage name (column 7)</b>
          </p>
          <p>
            Name of the developmental stage defined by{' '}
            <code>Developmental stage ID</code> (column 6)
          </p>
          <p id="multi_diff_complete_col8" className="mt-2">
            <b>Latin species name (column 8)</b>
          </p>
          <p>
            The latin name of the species which the gene in Gene ID (column 2)
            belongs to.
          </p>
          <p id="multi_diff_complete_col9" className="mt-2">
            <b>Differential expression (column 9)</b>
          </p>
          <p>
            Call generated from all data types for <code>Gene ID</code> (column
            2), in <code>Anatomical entity IDs</code> (column 4), at{' '}
            <code>Developmental stage ID</code> (column 6).
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
                expressed in that condition, do not produce a
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
          <p id="multi_diff_complete_col10" className="mt-2">
            <b>Call quality (column 10)</b>
          </p>
          <p>
            Confidence in the differential expression call provided in{' '}
            <code>Differential expression</code> (column 2).
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
                <u>NA</u>: no quality applicable when ambiguity state in{' '}
                <code>Differential expression</code> (column 2).
              </p>
            </li>
          </ul>
          <p id="multi_diff_complete_col11" className="mt-2">
            <b>Affymetrix data (column 11)</b>
          </p>
          <p>
            Call generated from Affymetrix data for <code>Gene ID</code> (column
            2), in <code>Anatomical entity IDs</code> (column 4), at{' '}
            <code>Developmental stage ID</code> (column 6).
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
          <p id="multi_diff_complete_col12" className="mt-2">
            <b>Affymetrix call quality (column 12)</b>
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
          <p id="multi_diff_complete_col13" className="mt-2">
            <b>Affymetrix best supporting p-value (column 13)</b>
          </p>
          <p>
            Best p-value from the Affymetrix analyses supporting the Affymetrix
            call provided in <code>Affymetrix data</code> (column 11). Set to
            1.0 if no data available by Affymetrix.
          </p>
          <p id="multi_diff_complete_col14" className="mt-2">
            <b>
              Affymetrix analysis count supporting Affymetrix call (column 14)
            </b>
          </p>
          <p>
            Number of Affymetrix analyses supporting the Affymetrix call
            provided in <code>Affymetrix data</code> (column 11). Set to 1.0 if
            no data available by Affymetrix.
          </p>
          <p id="multi_diff_complete_col15" className="mt-2">
            <b>
              Affymetrix analysis count in conflict with Affymetrix call (column
              15)
            </b>
          </p>
          <p>
            Number of Affymetrix analyses in conflict, generating a call
            different from the call provided in <code>Affymetrix data</code>{' '}
            (column 11). Set to 0 if no data available by Affymetrix.
          </p>
          <p id="multi_diff_complete_col16" className="mt-2">
            <b>RNA-Seq data (column 16)</b>
          </p>
          <p>
            Call generated from RNA-Seq data for <code>Gene ID</code> (column
            2), in <code>Anatomical entity IDs</code> (column 4), at{' '}
            <code>Developmental stage ID</code> (column 6).{' '}
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
          <p id="multi_diff_complete_col17" className="mt-2">
            <b>RNA-Seq call quality (column 17)</b>
          </p>
          <p>
            Confidence in the differential expression call provided in{' '}
            <code>RNA-Seq data</code> (column 16).
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
                <code>RNA-Seq data</code> (column 16).
              </p>
            </li>
          </ul>
          <p id="multi_diff_complete_co18l" className="mt-2">
            <b>RNA-Seq best supporting p-value (column 18)</b>
          </p>
          <p>
            Best p-value from the RNA-Seq analyses supporting the RNA-Seq call
            provided in <code>RNA-Seq data</code> (column 16). Set to 1.0 if no
            data available by RNA-Seq.
          </p>
          <p id="multi_diff_complete_col19" className="mt-2">
            <b>RNA-Seq analysis count supporting RNA-Seq call (column 19)</b>
          </p>
          <p>
            Number of RNA-Seq analyses supporting the RNA-Seq call provided in{' '}
            <code>RNA-Seq data</code> (column 16). Set to 0 if no data available
            by RNA-Seq.
          </p>
          <p id="multi_diff_complete_col20" className="mt-2">
            <b>
              RNA-Seq analysis count in conflict with RNA-Seq call (column 20)
            </b>
          </p>
          <p>
            Number of RNA-Seq analyses in conflict, generating a call different
            from the call provided in <code>RNA-Seq data</code> (column 16). Set
            to 0 if no data available by RNA-Seq.
          </p>
          <p id="multi_diff_complete_col21" className="mt-2">
            <b>Anatomy homology CIO ID (column 21)</b>
          </p>
          <p>
            Unique identifier from the{' '}
            <a
              href="https://github.com/BgeeDB/confidence-information-ontology/blob/master/src/ontology/cio-simple.obo"
              target="_blank"
              rel="noopener noreferrer"
              className="external-link"
            >
              Confidence Information Ontology
            </a>
            , providing the confidence in the annotation of homology of
            anatomical entities defined in <code>Anatomical entity IDs</code>{' '}
            (column 4). This ontology is an attempt to provide a mean to capture
            the confidence in annotations. See{' '}
            <a
              href="https://github.com/BgeeDB/confidence-information-ontology"
              target="_blank"
              rel="noopener noreferrer"
              className="external-link"
            >
              project home
            </a>{' '}
            for more details.
          </p>
          <p id="multi_diff_complete_col22" className="mt-2">
            <b>Anatomy homology CIO name (column 22)</b>
          </p>
          <p>
            Name of the CIO term defined by <code>Anatomy homology CIO ID</code>{' '}
            (column 21).
          </p>
        </div>
      )}
    </div>
  );
};

export default GECMultiDiff;
