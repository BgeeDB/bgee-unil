import React from 'react';
import config from '../../config.json';
import api from '../../api';

// todo meta not working from page component
const DataSource = () => {
  const [loading, setLoading] = React.useState(false);
  const [sources, setSources] = React.useState({});
  React.useEffect(() => {
    setLoading(true);
    api.get
      .dataSources()
      .then(({ data }) => {
        const categories = new Set();
        data.sources.forEach((s) => {
          categories.add(s.category);
        });
        const categorizedSources = {};
        categories.forEach((category) => {
          categorizedSources[category] = data.sources.filter(
            (s) => s.category === category
          );
        });
        setSources(categorizedSources);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="content has-text-centered">
        <p className="title is-3">Data sources</p>
      </div>
      <p className="">
        This page provides information about the data sources used in Bgee{' '}
        {config.version}.
      </p>
      {loading && (
        <progress
          className="progress is-small"
          max="100"
          style={{ animationDuration: '3s', marginBottom: 12 }}
        >
          80%
        </progress>
      )}
      {sources.GENOMICS && (
        <>
          <h1 className="gradient-underline title is-size-4 has-text-primary">
            Genomics databases
          </h1>
          {sources.GENOMICS.map((s, key) => (
            <React.Fragment key={s.id}>
              <div className="columns mt-2">
                <div className="column is-2">
                  <p className="">
                    <a
                      href={s.baseUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="external-link"
                    >
                      {s.name}
                    </a>
                  </p>
                </div>
                <div className="column is-10">
                  <div className="columns mb-0">
                    <div className="column is-2">
                      <p className="">DESCRIPTION</p>
                    </div>
                    <div className="column is-10">
                      <p className="">{s.description}</p>
                    </div>
                  </div>
                  <div className="columns">
                    <div className="column is-2">
                      <p className="">LAST IMPORT</p>
                    </div>
                    <div className="column is-10">
                      <p className="">
                        {s.releaseDate}
                        {s.releaseVersion !== '' &&
                          ` (release ${s.releaseVersion})`}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {key + 1 < sources.GENOMICS.length && (
                <div className="separator" />
              )}
            </React.Fragment>
          ))}
        </>
      )}
      {sources.PROTEOMICS && (
        <>
          <h1 className="gradient-underline title is-size-4 has-text-primary">
            Proteomics databases
          </h1>
          {sources.PROTEOMICS.map((s, key) => (
            <React.Fragment key={s.id}>
              <div className="columns mt-2">
                <div className="column is-2">
                  <p className="">
                    <a
                      href={s.baseUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="external-link"
                    >
                      {s.name}
                    </a>
                  </p>
                </div>
                <div className="column is-10">
                  <div className="columns mb-0">
                    <div className="column is-2">
                      <p className="">DESCRIPTION</p>
                    </div>
                    <div className="column is-10">
                      <p className="">{s.description}</p>
                    </div>
                  </div>
                  <div className="columns">
                    <div className="column is-2">
                      <p className="">LAST IMPORT</p>
                    </div>
                    <div className="column is-10">
                      <p className="">
                        {s.releaseDate}
                        {s.releaseVersion !== '' &&
                          ` (release ${s.releaseVersion})`}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {key + 1 < sources.GENOMICS.length && (
                <div className="separator" />
              )}
            </React.Fragment>
          ))}
        </>
      )}
      {sources.RNA_SEQ && (
        <>
          <h1 className="gradient-underline title is-size-4 has-text-primary">
            RNA-Seq data sources
          </h1>
          {sources.RNA_SEQ.map((s, key) => (
            <React.Fragment key={s.id}>
              <div className="columns mt-2">
                <div className="column is-2">
                  <p className="">
                    <a
                      href={s.baseUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="external-link"
                    >
                      {s.name}
                    </a>
                  </p>
                </div>
                <div className="column is-10">
                  <div className="columns mb-0">
                    <div className="column is-2">
                      <p className="">DESCRIPTION</p>
                    </div>
                    <div className="column is-10">
                      <p className="">{s.description}</p>
                    </div>
                  </div>
                  <div className="columns">
                    <div className="column is-2">
                      <p className="">LAST IMPORT</p>
                    </div>
                    <div className="column is-10">
                      <p className="">
                        {s.releaseDate}
                        {s.releaseVersion !== '' &&
                          ` (release ${s.releaseVersion})`}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {key + 1 < sources.GENOMICS.length && (
                <div className="separator" />
              )}
            </React.Fragment>
          ))}
        </>
      )}
      {sources.AFFYMETRIX && (
        <>
          <h1 className="gradient-underline title is-size-4 has-text-primary">
            Affymetrix data sources
          </h1>
          {sources.AFFYMETRIX.map((s, key) => (
            <React.Fragment key={s.id}>
              <div className="columns mt-2">
                <div className="column is-2">
                  <p className="">
                    <a
                      href={s.baseUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="external-link"
                    >
                      {s.name}
                    </a>
                  </p>
                </div>
                <div className="column is-10">
                  <div className="columns mb-0">
                    <div className="column is-2">
                      <p className="">DESCRIPTION</p>
                    </div>
                    <div className="column is-10">
                      <p className="">{s.description}</p>
                    </div>
                  </div>
                  <div className="columns">
                    <div className="column is-2">
                      <p className="">LAST IMPORT</p>
                    </div>
                    <div className="column is-10">
                      <p className="">
                        {s.releaseDate}
                        {s.releaseVersion !== '' &&
                          ` (release ${s.releaseVersion})`}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {key + 1 < sources.GENOMICS.length && (
                <div className="separator" />
              )}
            </React.Fragment>
          ))}
        </>
      )}
      {sources.IN_SITU && (
        <>
          <h1 className="gradient-underline title is-size-4 has-text-primary">
            In situ data sources
          </h1>
          {sources.IN_SITU.map((s, key) => (
            <React.Fragment key={s.id}>
              <div className="columns mt-2">
                <div className="column is-2">
                  <p className="">
                    <a
                      href={s.baseUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="external-link"
                    >
                      {s.name}
                    </a>
                  </p>
                </div>
                <div className="column is-10">
                  <div className="columns mb-0">
                    <div className="column is-2">
                      <p className="">DESCRIPTION</p>
                    </div>
                    <div className="column is-10">
                      <p className="">{s.description}</p>
                    </div>
                  </div>
                  <div className="columns">
                    <div className="column is-2">
                      <p className="">LAST IMPORT</p>
                    </div>
                    <div className="column is-10">
                      <p className="">
                        {s.releaseDate}
                        {s.releaseVersion !== '' &&
                          ` (release ${s.releaseVersion})`}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {key + 1 < sources.GENOMICS.length && (
                <div className="separator" />
              )}
            </React.Fragment>
          ))}
        </>
      )}
      {sources.EST && (
        <>
          <h1 className="gradient-underline title is-size-4 has-text-primary">
            EST data sources
          </h1>
          {sources.EST.map((s, key) => (
            <React.Fragment key={s.id}>
              <div className="columns mt-2">
                <div className="column is-2">
                  <p className="">
                    <a
                      href={s.baseUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="external-link"
                    >
                      {s.name}
                    </a>
                  </p>
                </div>
                <div className="column is-10">
                  <div className="columns mb-0">
                    <div className="column is-2">
                      <p className="">DESCRIPTION</p>
                    </div>
                    <div className="column is-10">
                      <p className="">{s.description}</p>
                    </div>
                  </div>
                  <div className="columns">
                    <div className="column is-2">
                      <p className="">LAST IMPORT</p>
                    </div>
                    <div className="column is-10">
                      <p className="">
                        {s.releaseDate}
                        {s.releaseVersion !== '' &&
                          ` (release ${s.releaseVersion})`}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {key + 1 < sources.GENOMICS.length && (
                <div className="separator" />
              )}
            </React.Fragment>
          ))}
        </>
      )}
      {sources.ONTOLOGY && (
        <>
          <h1 className="gradient-underline title is-size-4 has-text-primary">
            Ontologies
          </h1>
          {sources.ONTOLOGY.map((s, key) => (
            <React.Fragment key={s.id}>
              <div className="columns mt-2">
                <div className="column is-2">
                  <p className="">
                    <a
                      href={s.baseUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="external-link"
                    >
                      {s.name}
                    </a>
                  </p>
                </div>
                <div className="column is-10">
                  <div className="columns mb-0">
                    <div className="column is-2">
                      <p className="">DESCRIPTION</p>
                    </div>
                    <div className="column is-10">
                      <p className="">{s.description}</p>
                    </div>
                  </div>
                  <div className="columns">
                    <div className="column is-2">
                      <p className="">LAST IMPORT</p>
                    </div>
                    <div className="column is-10">
                      <p className="">
                        {s.releaseDate}
                        {s.releaseVersion !== '' &&
                          ` (release ${s.releaseVersion})`}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {key + 1 < sources.GENOMICS.length && (
                <div className="separator" />
              )}
            </React.Fragment>
          ))}
        </>
      )}
      {sources.NONE && (
        <>
          <h1 className="gradient-underline title is-size-4 has-text-primary">
            Other sources
          </h1>
          {sources.NONE.map((s, key) => (
            <React.Fragment key={s.id}>
              <div className="columns mt-2">
                <div className="column is-2">
                  <p className="">
                    <a
                      href={s.baseUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="external-link"
                    >
                      {s.name}
                    </a>
                  </p>
                </div>
                <div className="column is-10">
                  <div className="columns mb-0">
                    <div className="column is-2">
                      <p className="">DESCRIPTION</p>
                    </div>
                    <div className="column is-10">
                      <p className="">{s.description}</p>
                    </div>
                  </div>
                  <div className="columns">
                    <div className="column is-2">
                      <p className="">LAST IMPORT</p>
                    </div>
                    <div className="column is-10">
                      <p className="">
                        {s.releaseDate}
                        {s.releaseVersion !== '' &&
                          ` (release ${s.releaseVersion})`}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {key + 1 < sources.GENOMICS.length && (
                <div className="separator" />
              )}
            </React.Fragment>
          ))}
        </>
      )}
    </>
  );
};

export default DataSource;
