import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Layout from '../components/Layout';
import ROUTES from './routes';
import Home from '../pages/Home';
import PATHS from './paths';
import Page from '../components/Page';
import i18n from '../i18n';

const Router = () => (
  <BrowserRouter>
    <Layout>
      <Switch>
        <Route exact path={PATHS.HOME} component={Home} />

        <Route
          exact
          path={[
            PATHS.ANALYSIS.TOP_ANAT,
            PATHS.ANALYSIS.TOP_ANAT_RESULT,
            PATHS.ANALYSIS.TOP_ANAT_RESULT_JOB_ID,
          ]}
          render={(props) => (
            <Page
              {...props}
              title={i18n.t(ROUTES.ANALYSIS[PATHS.ANALYSIS.TOP_ANAT].i18nKey)}
              Component={ROUTES.ANALYSIS[PATHS.ANALYSIS.TOP_ANAT].component}
            />
          )}
        />
        <Route
          exact
          path={PATHS.ANALYSIS.TOP_ANAT_RESULT}
          render={(props) => (
            <Page
              {...props}
              title={i18n.t(
                ROUTES.ANALYSIS[PATHS.ANALYSIS.TOP_ANAT_RESULT].i18nKey
              )}
              Component={
                ROUTES.ANALYSIS[PATHS.ANALYSIS.TOP_ANAT_RESULT].component
              }
            />
          )}
        />
        <Route
          exact
          path={PATHS.ANALYSIS.EXPRESSION_COMPARISON}
          render={(props) => (
            <Page
              {...props}
              title={i18n.t(
                ROUTES.ANALYSIS[PATHS.ANALYSIS.EXPRESSION_COMPARISON].i18nKey
              )}
              Component={
                ROUTES.ANALYSIS[PATHS.ANALYSIS.EXPRESSION_COMPARISON].component
              }
            />
          )}
        />

        <Route
          exact
          path={PATHS.SEARCH.GENE}
          render={(props) => (
            <Page
              {...props}
              title={i18n.t(ROUTES.SEARCH[PATHS.SEARCH.GENE].i18nKey)}
              Component={ROUTES.SEARCH[PATHS.SEARCH.GENE].component}
            />
          )}
        />
        <Route
          exact
          path={PATHS.SEARCH.GENE_ITEM}
          render={(props) => (
            <Page
              {...props}
              title={i18n.t(ROUTES.SEARCH[PATHS.SEARCH.GENE_ITEM].i18nKey)}
              Component={ROUTES.SEARCH[PATHS.SEARCH.GENE_ITEM].component}
            />
          )}
        />
        <Route
          exact
          path={PATHS.SEARCH.ANATOMICAL_HOMOLOGY}
          render={(props) => (
            <Page
              {...props}
              title={i18n.t(
                ROUTES.SEARCH[PATHS.SEARCH.ANATOMICAL_HOMOLOGY].i18nKey
              )}
              Component={
                ROUTES.SEARCH[PATHS.SEARCH.ANATOMICAL_HOMOLOGY].component
              }
            />
          )}
        />
        <Route
          exact
          path={PATHS.SEARCH.SPECIES}
          render={(props) => (
            <Page
              {...props}
              title={i18n.t(ROUTES.SEARCH[PATHS.SEARCH.SPECIES].i18nKey)}
              Component={ROUTES.SEARCH[PATHS.SEARCH.SPECIES].component}
            />
          )}
        />
        <Route
          exact
          path={PATHS.SEARCH.SPECIES_ITEM}
          render={(props) => (
            <Page
              {...props}
              title={i18n.t(ROUTES.SEARCH[PATHS.SEARCH.SPECIES_ITEM].i18nKey)}
              Component={ROUTES.SEARCH[PATHS.SEARCH.SPECIES_ITEM].component}
            />
          )}
        />

        <Route
          exact
          path={PATHS.DOWNLOAD.GENE_EXPRESSION_CALLS}
          render={(props) => (
            <Page
              {...props}
              title={i18n.t(
                ROUTES.DOWNLOAD[PATHS.DOWNLOAD.GENE_EXPRESSION_CALLS].i18nKey
              )}
              Component={
                ROUTES.DOWNLOAD[PATHS.DOWNLOAD.GENE_EXPRESSION_CALLS].component
              }
            />
          )}
        />
        <Route
          exact
          path={PATHS.DOWNLOAD.PROCESSED_EXPRESSION_VALUES}
          render={(props) => (
            <Page
              {...props}
              title={i18n.t(
                ROUTES.DOWNLOAD[PATHS.DOWNLOAD.PROCESSED_EXPRESSION_VALUES]
                  .i18nKey
              )}
              Component={
                ROUTES.DOWNLOAD[PATHS.DOWNLOAD.PROCESSED_EXPRESSION_VALUES]
                  .component
              }
            />
          )}
        />
        <Route
          exact
          path={PATHS.DOWNLOAD.DATA_DUMPS}
          render={(props) => (
            <Page
              {...props}
              title={i18n.t(ROUTES.DOWNLOAD[PATHS.DOWNLOAD.DATA_DUMPS].i18nKey)}
              Component={ROUTES.DOWNLOAD[PATHS.DOWNLOAD.DATA_DUMPS].component}
            />
          )}
        />

        <Route
          exact
          path={PATHS.RESOURCES.DOCS}
          render={(props) => (
            <Page
              {...props}
              title={i18n.t(ROUTES.RESOURCES[PATHS.RESOURCES.DOCS].i18nKey)}
              Component={ROUTES.RESOURCES[PATHS.RESOURCES.DOCS].component}
            />
          )}
        />
        <Route
          exact
          path={PATHS.RESOURCES.R_PACKAGES}
          render={(props) => (
            <Page
              {...props}
              title={i18n.t(
                ROUTES.RESOURCES[PATHS.RESOURCES.R_PACKAGES].i18nKey
              )}
              Component={ROUTES.RESOURCES[PATHS.RESOURCES.R_PACKAGES].component}
            />
          )}
        />
        <Route
          exact
          path={PATHS.RESOURCES.SPARQL}
          render={(props) => (
            <Page
              {...props}
              title={i18n.t(ROUTES.RESOURCES[PATHS.RESOURCES.SPARQL].i18nKey)}
              Component={ROUTES.RESOURCES[PATHS.RESOURCES.SPARQL].component}
            />
          )}
        />
        <Route
          exact
          path={PATHS.RESOURCES.ANNOTATIONS}
          render={(props) => (
            <Page
              {...props}
              title={i18n.t(
                ROUTES.RESOURCES[PATHS.RESOURCES.ANNOTATIONS].i18nKey
              )}
              Component={
                ROUTES.RESOURCES[PATHS.RESOURCES.ANNOTATIONS].component
              }
            />
          )}
        />
        <Route
          exact
          path={PATHS.RESOURCES.ONTOLOGIES}
          render={(props) => (
            <Page
              {...props}
              title={i18n.t(
                ROUTES.RESOURCES[PATHS.RESOURCES.ONTOLOGIES].i18nKey
              )}
              Component={ROUTES.RESOURCES[PATHS.RESOURCES.ONTOLOGIES].component}
            />
          )}
        />
        <Route
          exact
          path={PATHS.RESOURCES.SOURCE_CODE}
          render={(props) => (
            <Page
              {...props}
              title={i18n.t(
                ROUTES.RESOURCES[PATHS.RESOURCES.SOURCE_CODE].i18nKey
              )}
              Component={
                ROUTES.RESOURCES[PATHS.RESOURCES.SOURCE_CODE].component
              }
            />
          )}
        />

        <Route
          exact
          path={PATHS.SUPPORT.GTEX}
          render={(props) => (
            <Page
              {...props}
              title={i18n.t(ROUTES.SUPPORT[PATHS.SUPPORT.GTEX].i18nKey)}
              Component={ROUTES.SUPPORT[PATHS.SUPPORT.GTEX].component}
            />
          )}
        />
        <Route
          exact
          path={PATHS.SUPPORT.TOP_ANAT}
          render={(props) => (
            <Page
              {...props}
              title={i18n.t(ROUTES.SUPPORT[PATHS.SUPPORT.TOP_ANAT].i18nKey)}
              Component={ROUTES.SUPPORT[PATHS.SUPPORT.TOP_ANAT].component}
            />
          )}
        />
        <Route
          exact
          path={PATHS.SUPPORT.GENE_EXPRESSION_CALLS}
          render={(props) => (
            <Page
              {...props}
              title={i18n.t(
                ROUTES.SUPPORT[PATHS.SUPPORT.GENE_EXPRESSION_CALLS].i18nKey
              )}
              Component={
                ROUTES.SUPPORT[PATHS.SUPPORT.GENE_EXPRESSION_CALLS].component
              }
            />
          )}
        />
        <Route
          exact
          path={PATHS.SUPPORT.FAQ}
          render={(props) => (
            <Page
              {...props}
              title={i18n.t(ROUTES.SUPPORT[PATHS.SUPPORT.FAQ].i18nKey)}
              Component={ROUTES.SUPPORT[PATHS.SUPPORT.FAQ].component}
            />
          )}
        />

        <Route
          exact
          path={PATHS.ABOUT.ABOUT}
          render={(props) => (
            <Page
              {...props}
              title={i18n.t(ROUTES.ABOUT[PATHS.ABOUT.ABOUT].i18nKey)}
              Component={ROUTES.ABOUT[PATHS.ABOUT.ABOUT].component}
            />
          )}
        />
        <Route
          exact
          path={PATHS.ABOUT.COLLABORATIONS}
          render={(props) => (
            <Page
              {...props}
              title={i18n.t(ROUTES.ABOUT[PATHS.ABOUT.COLLABORATIONS].i18nKey)}
              Component={ROUTES.ABOUT[PATHS.ABOUT.COLLABORATIONS].component}
            />
          )}
        />
        <Route
          exact
          path={PATHS.ABOUT.PUBLICATION}
          render={(props) => (
            <Page
              {...props}
              title={i18n.t(ROUTES.ABOUT[PATHS.ABOUT.PUBLICATION].i18nKey)}
              Component={ROUTES.ABOUT[PATHS.ABOUT.PUBLICATION].component}
            />
          )}
        />
        <Route
          exact
          path={PATHS.ABOUT.SOURCES}
          render={(props) => (
            <Page
              {...props}
              title={i18n.t(ROUTES.ABOUT[PATHS.ABOUT.SOURCES].i18nKey)}
              Component={ROUTES.ABOUT[PATHS.ABOUT.SOURCES].component}
            />
          )}
        />
        <Route
          exact
          path={PATHS.ABOUT.PRIVACY_POLICY}
          render={(props) => (
            <Page
              {...props}
              title={i18n.t(ROUTES.ABOUT[PATHS.ABOUT.PRIVACY_POLICY].i18nKey)}
              Component={ROUTES.ABOUT[PATHS.ABOUT.PRIVACY_POLICY].component}
            />
          )}
        />

        {/* <Route path={PATHS.ERROR} component={Error} /> */}

        <Redirect to={PATHS.HOME} />
      </Switch>
    </Layout>
  </BrowserRouter>
);

export default Router;
