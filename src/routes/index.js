import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Layout from '../components/Layout';
import ROUTES from './routes';
import Home from '../pages/Home';
import Error from '../pages/Error';
import PATHS from './paths';

const Router = () => (
  <BrowserRouter>
    <Layout>
      <Switch>
        <Route exact path={PATHS.HOME} component={Home} />

        <Route
          exact
          path={PATHS.ANALYSIS.TOP_ANAT}
          component={ROUTES.ANALYSIS[PATHS.ANALYSIS.TOP_ANAT].component}
        />
        <Route
          exact
          path={PATHS.ANALYSIS.EXPRESSION_COMPARISON}
          component={
            ROUTES.ANALYSIS[PATHS.ANALYSIS.EXPRESSION_COMPARISON].component
          }
        />

        <Route
          exact
          path={PATHS.SEARCH.GENE}
          component={ROUTES.SEARCH[PATHS.SEARCH.GENE].component}
        />
        <Route
          exact
          path={PATHS.SEARCH.ANATOMICAL_HOMOLOGY}
          component={ROUTES.SEARCH[PATHS.SEARCH.ANATOMICAL_HOMOLOGY].component}
        />
        <Route
          exact
          path={PATHS.SEARCH.SPECIES}
          component={ROUTES.SEARCH[PATHS.SEARCH.SPECIES].component}
        />

        <Route
          exact
          path={PATHS.DOWNLOAD.GENE_EXPRESSION_CALLS}
          component={
            ROUTES.DOWNLOAD[PATHS.DOWNLOAD.GENE_EXPRESSION_CALLS].component
          }
        />
        <Route
          exact
          path={PATHS.DOWNLOAD.PROCESSED_EXPRESSION_VALUES}
          component={
            ROUTES.DOWNLOAD[PATHS.DOWNLOAD.PROCESSED_EXPRESSION_VALUES]
              .component
          }
        />
        <Route
          exact
          path={PATHS.DOWNLOAD.DATA_DUMPS}
          component={ROUTES.DOWNLOAD[PATHS.DOWNLOAD.DATA_DUMPS].component}
        />

        <Route
          exact
          path={PATHS.RESOURCES.DOCS}
          component={ROUTES.RESOURCES[PATHS.RESOURCES.DOCS].component}
        />
        <Route
          exact
          path={PATHS.RESOURCES.R_PACKAGES}
          component={ROUTES.RESOURCES[PATHS.RESOURCES.R_PACKAGES].component}
        />
        <Route
          exact
          path={PATHS.RESOURCES.SPARQL}
          component={ROUTES.RESOURCES[PATHS.RESOURCES.SPARQL].component}
        />
        <Route
          exact
          path={PATHS.RESOURCES.ANNOTATIONS}
          component={ROUTES.RESOURCES[PATHS.RESOURCES.ANNOTATIONS].component}
        />
        <Route
          exact
          path={PATHS.RESOURCES.ONTOLOGIES}
          component={ROUTES.RESOURCES[PATHS.RESOURCES.ONTOLOGIES].component}
        />
        <Route
          exact
          path={PATHS.RESOURCES.SOURCE_CODE}
          component={ROUTES.RESOURCES[PATHS.RESOURCES.SOURCE_CODE].component}
        />

        <Route
          exact
          path={PATHS.SUPPORT.GTEX}
          component={ROUTES.SUPPORT[PATHS.SUPPORT.GTEX].component}
        />
        <Route
          exact
          path={PATHS.SUPPORT.TOP_ANAT}
          component={ROUTES.SUPPORT[PATHS.SUPPORT.TOP_ANAT].component}
        />
        <Route
          exact
          path={PATHS.SUPPORT.GENE_EXPRESSION_CALLS}
          component={
            ROUTES.SUPPORT[PATHS.SUPPORT.GENE_EXPRESSION_CALLS].component
          }
        />
        <Route
          exact
          path={PATHS.SUPPORT.FAQ}
          component={ROUTES.SUPPORT[PATHS.SUPPORT.FAQ].component}
        />

        <Route
          exact
          path={PATHS.ABOUT.ABOUT}
          component={ROUTES.ABOUT[PATHS.ABOUT.ABOUT].component}
        />
        <Route
          exact
          path={PATHS.ABOUT.COLLABORATIONS}
          component={ROUTES.ABOUT[PATHS.ABOUT.COLLABORATIONS].component}
        />
        <Route
          exact
          path={PATHS.ABOUT.PUBLICATION}
          component={ROUTES.ABOUT[PATHS.ABOUT.PUBLICATION].component}
        />
        <Route
          exact
          path={PATHS.ABOUT.SOURCES}
          component={ROUTES.ABOUT[PATHS.ABOUT.SOURCES].component}
        />
        <Route
          exact
          path={PATHS.ABOUT.PRIVACY_POLICY}
          component={ROUTES.ABOUT[PATHS.ABOUT.PRIVACY_POLICY].component}
        />

        <Route path={PATHS.ERROR} component={Error} />

        <Redirect to={PATHS.HOME} />
      </Switch>
    </Layout>
  </BrowserRouter>
);

export default Router;
