/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';

const GECOmaHog = () => (
  <div className="static-section">
    <h1 className="gradient-underline title is-5 has-text-primary">
      OMA Hierarchical orthologous groups file
    </h1>
    <div className="notification is-warning is-light">
      Please note, these data will be available in a future release.
    </div>
    <p>
      OMA Hierarchical orthologous groups files provide gene orthology
      relations, by grouping genes that have descended from a single common
      ancestral gene in the taxon of interest. The targeted taxon is provided in
      the file name. Orthologous genes are grouped by common OMA IDs, provided
      in the column OMA ID (column 1, see below).
    </p>
    <div>
      <p className="has-text-centered has-text-weight-semibold mb-1">
        Format description for OMA Hierarchical orthologous groups file
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
                  <a href="#oma_hog_col1" className="internal-link">
                    OMA ID
                  </a>
                </p>
              </div>
            </td>
            <td>
              <p>10</p>
            </td>
          </tr>
          <tr>
            <td>
              <p>2</p>
            </td>
            <td>
              <div>
                <p>
                  <a href="#oma_hog_col2" className="internal-link">
                    Gene ID
                  </a>
                </p>
              </div>
            </td>
            <td>
              <p>ENSG00000105298</p>
            </td>
          </tr>
          <tr>
            <td>
              <p>3</p>
            </td>
            <td>
              <div>
                <p>
                  <a href="#oma_hog_col3" className="internal-link">
                    Gene name
                  </a>
                </p>
              </div>
            </td>
            <td>
              <p>CACTIN</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div>
      <p className="has-text-centered has-text-weight-semibold mb-1">
        Example lines for a OMA Hierarchical orthologous groups file
      </p>
      <table className="table is-bordered is-striped is-fullwidth">
        <thead>
          <tr>
            <th>OMA ID</th>
            <th>Gene ID</th>
            <th>Gene name</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <p>98828</p>
            </td>
            <td>
              <p>ENSG00000158473</p>
            </td>
            <td>
              <p>CD1D</p>
            </td>
          </tr>
          <tr>
            <td>
              <p>98828</p>
            </td>
            <td>
              <p>ENSMUSG00000028076</p>
            </td>
            <td>
              <p>Cd1d1</p>
            </td>
          </tr>
          <tr>
            <td>
              <p>98828</p>
            </td>
            <td>
              <p>ENSMUSG00000041750</p>
            </td>
            <td>
              <p>Cd1d2</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <p id="oma_hog_col1">
      <b>OMA ID (column 1)</b>
    </p>
    <p>
      Unique identifier of the OMA gene orthology group. Note that these
      identifiers are not stable between releases, and cannot be used to
      retrieve data from the{' '}
      <a
        href="https://omabrowser.org/oma/hogs/"
        target="_blank"
        rel="noopener noreferrer"
        className="external-link"
      >
        OMA browser
      </a>
      . They are provided solely to group data from orthologous genes belonging
      to a same orthology group. Genes member of a OMA gene orthology group can
      be retrieved through the associated{' '}
      <a href="#oma_hog" className="internal-link">
        hierarchical orthologous groups file
      </a>
      .
    </p>
    <p id="oma_hog_col2">
      <b>Gene ID (column 2)</b>
    </p>
    <p>Unique identifier of gene from Ensembl.</p>
    <p>
      Please note that for <i>P. paniscus</i> (bonobo) we use{' '}
      <i>P. troglodytes</i> genome (chimpanzee), and that for <i>P. pygmaeus</i>
      aaaaaaaaaaaaa<i>P. abelii </i> genome (Sumatran orangutan). Only for those
      species (bonobo and Bornean orangutan), we modify the Ensembl gene IDs, to
      ensure that we provide unique gene identifiers over all species. It is
      therefore necessary, to obtain correct Ensembl gene IDs for those species,
      to replace gene ID prefix &apos;PPAG&apos; with &apos;ENSPTRG&apos;, and
      &apos;PPYG&apos; prefix with &apos;ENSPPYG&apos;.
    </p>
    <p id="oma_hog_col3">
      <b>Gene name (column 3)</b>
    </p>
    <p>
      Name of the gene defined by <code>Gene ID</code> (column 2)
    </p>
  </div>
);

export default GECOmaHog;
