import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Layout from '../components/Layout';
import ROUTES from './routes';
import PATHS from './paths';
import Page from '../components/Page';
import i18n from '../i18n';
import { ModalProvider } from '../contexts/ModalContext';
import { NotificationProvider } from '../contexts/NotificationsContext';
import StaticPage from '../pages/StaticPage';
import MarkdownReader from '../pages/MarkdownReader';

const Router = () => (
  <BrowserRouter>
    <ModalProvider>
      <NotificationProvider>
        <Layout>
          <Switch>
            <Route
              exact
              path={PATHS.HOME}
              render={(props) => (
                <Page {...props} Component={ROUTES[PATHS.HOME].component} />
              )}
            />

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
                  title={i18n.t(ROUTES[PATHS.ANALYSIS.TOP_ANAT].i18nKey)}
                  Component={ROUTES[PATHS.ANALYSIS.TOP_ANAT].component}
                />
              )}
            />
            <Route
              exact
              path={PATHS.ANALYSIS.TOP_ANAT_RESULT}
              render={(props) => (
                <Page
                  {...props}
                  Component={ROUTES[PATHS.ANALYSIS.TOP_ANAT_RESULT].component}
                />
              )}
            />
            <Route
              exact
              path={PATHS.ANALYSIS.EXPRESSION_COMPARISON}
              render={(props) => (
                <Page
                  {...props}
                  Component={
                    ROUTES[PATHS.ANALYSIS.EXPRESSION_COMPARISON].component
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
                  Component={ROUTES[PATHS.SEARCH.GENE].component}
                />
              )}
            />
            <Route
              exact
              path={[PATHS.SEARCH.GENE_ITEM, PATHS.SEARCH.GENE_ITEM_BY_SPECIES]}
              render={(props) => (
                <Page
                  {...props}
                  Component={ROUTES[PATHS.SEARCH.GENE_ITEM].component}
                />
              )}
            />
            <Route
              exact
              path={PATHS.SEARCH.ANATOMICAL_HOMOLOGY}
              render={(props) => (
                <Page
                  {...props}
                  Component={ROUTES[PATHS.SEARCH.ANATOMICAL_HOMOLOGY].component}
                />
              )}
            />
            <Route
              exact
              path={PATHS.SEARCH.SPECIES}
              render={(props) => (
                <Page
                  {...props}
                  Component={ROUTES[PATHS.SEARCH.SPECIES].component}
                />
              )}
            />
            <Route
              exact
              path={PATHS.SEARCH.SPECIES_ITEM}
              render={(props) => (
                <Page
                  {...props}
                  Component={ROUTES[PATHS.SEARCH.SPECIES_ITEM].component}
                />
              )}
            />

            <Route
              exact
              path={PATHS.DOWNLOAD.GENE_EXPRESSION_CALLS}
              render={(props) => (
                <Page
                  {...props}
                  Component={
                    ROUTES[PATHS.DOWNLOAD.GENE_EXPRESSION_CALLS].component
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
                  Component={
                    ROUTES[PATHS.DOWNLOAD.PROCESSED_EXPRESSION_VALUES].component
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
                  Component={ROUTES[PATHS.DOWNLOAD.DATA_DUMPS].component}
                />
              )}
            />

            <Route
              exact
              path={[
                PATHS.RESOURCES.DOCS,
                PATHS.RESOURCES.R_PACKAGES,
                PATHS.RESOURCES.SPARQL,
                PATHS.RESOURCES.ANNOTATIONS,
                PATHS.RESOURCES.ONTOLOGIES,
                PATHS.RESOURCES.SOURCE_CODE,
                PATHS.SUPPORT.TOP_ANAT,
                PATHS.SUPPORT.FAQ,
                PATHS.ABOUT.ABOUT,
                PATHS.ABOUT.COLLABORATIONS,
                PATHS.ABOUT.PUBLICATION,
                PATHS.ABOUT.SOURCES,
                PATHS.ABOUT.PRIVACY_POLICY,
              ]}
              render={(props) => <Page {...props} Component={StaticPage} />}
            />
            <Route
              exact
              path={[PATHS.SUPPORT.GTEX]}
              render={(props) => <Page {...props} Component={MarkdownReader} />}
            />

            <Route
              exact
              path={PATHS.SUPPORT.GENE_EXPRESSION_CALLS}
              render={(props) => (
                <Page
                  {...props}
                  title={i18n.t(
                    ROUTES[PATHS.SUPPORT.GENE_EXPRESSION_CALLS].i18nKey
                  )}
                  Component={
                    ROUTES[PATHS.SUPPORT.GENE_EXPRESSION_CALLS].component
                  }
                />
              )}
            />

            {/* <Route path={PATHS.ERROR} component={Error} /> */}

            <Redirect to={PATHS.HOME} />
          </Switch>
        </Layout>
      </NotificationProvider>
    </ModalProvider>
  </BrowserRouter>
);

export default Router;
