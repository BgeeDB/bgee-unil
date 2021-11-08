import React from 'react';
import { Link } from 'react-router-dom';
import useAnchorAtMount from '../../hooks/useAnchorAtMount';
import PATHS from '../../routes/paths';
import GoTop from '../../components/GoTop';

const GeneExpressionCalls = () => {
  useAnchorAtMount();

  return (
    <>
      <div className="content has-text-centered">
        <p className="title is-5">
          Expression call download file documentation
        </p>
      </div>
      <p property="schema:description">
        Bgee provides calls of baseline presence/absence of expression, and of
        differential over-/under-expression, either for single species, or
        compared between species (orthologous genes in homologous organs). This
        documentation describes the format of these{' '}
        <Link
          to={PATHS.DOWNLOAD.GENE_EXPRESSION_CALLS}
          title="Bgee expression data page"
        >
          download files
        </Link>
        .
      </p>
      <GoTop />
    </>
  );
};

export default GeneExpressionCalls;
