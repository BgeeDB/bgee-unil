/* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */
import React from 'react';
import classnames from '../../helpers/classnames';
import GECOmaHog from './GECOmaHog';
import GECMultiDiff from './GECMultiDiff';

const GeneExpressionCallsTabMulti = () => {
  const [active, setActive] = React.useState('multi_diff');
  return (
    <>
      <div className="static-section">
        <p>
          Bgee provides the ability to compare expression data between species,
          with great anatomical detail, using formal concepts of homology:
          orthology of genes, homology of anatomical entities. This allows to
          perform accurate comparisons between species, even for distant species
          for which the anatomy mapping might not be obvious.
        </p>
        <ul className="unordered">
          <li>
            <p>
              <u>homology of anatomical entities:</u> When comparing multiple
              species, only anatomical entities homologous between all species
              compared are considered, meaning, only anatomical entities derived
              from an organ existing before the divergence of the species
              compared. This requires careful annotations of the homology
              history of animal anatomy. These annotations are described in a
              separate project maintained by the Bgee team, see{' '}
              <a
                href="https://github.com/BgeeDB/anatomical-similarity-annotations/"
                target="_blank"
                rel="noopener noreferrer"
                className="external-link"
              >
                homology annotation project on GitHub
              </a>
              .<br />
              In practice, when comparing expression data between several
              species, the anatomical entities used are those with a homology
              relation valid for their Least Common Ancestor (LCA), or any of
              its ancestral taxa. For instance, if comparing data between human
              and zebrafish, the LCA would be the taxon <i>Euteleostomi</i>; as
              a result, annotations to this taxon would be used, such as the
              relation of homology between &quot;tetrapod parietal bone&quot;
              (UBERON:0000210) and &quot;actinopterygian frontal bone&quot;
              (UBERON:0004866); but also, annotations to ancestral taxa, such as
              the annotation stating that &quot;ophthalmic nerve&quot; appeared
              in the <i>Vertebrata </i> common ancestor; annotations to more
              recent taxa than the LCA would be discarded, such as the
              annotation to the &quot;forelimb&quot; structure (UBERON:0002102),
              homologous in the <i>Tetrapoda </i> lineage.
            </p>
          </li>
          <li>
            <p>
              <u>orthology of genes:</u> relations of orthology between genes
              are retrieved using{' '}
              <a
                href="https://omabrowser.org/oma/hogs/"
                target="_blank"
                rel="noopener noreferrer"
                className="external-link"
              >
                OMA
              </a>
              ; when comparing several species, Bgee identifies their Least
              Common Ancestor (LCA), and retrieve genes that have descended from
              a single common ancestral gene in that LCA. Relations of orthology
              between genes are provided in Bgee through{' '}
              <a href="#oma_hog" className="internal-link">
                hierarchical orthologous groups files
              </a>
              .
            </p>
          </li>
        </ul>
      </div>
      <div className="tabs is-centered is-toggle is-toggle-rounded is-small">
        <ul>
          <li className={classnames({ 'is-active': active === 'oma_hog' })}>
            <a onClick={() => setActive('oma_hog')}>
              OMA Hierarchical orthologous groups
            </a>
          </li>
          <li className={classnames({ 'is-active': active === 'multi_diff' })}>
            <a onClick={() => setActive('multi_diff')}>
              Over-/under-expression across anatomy or life stages
            </a>
          </li>
        </ul>
      </div>
      {active === 'oma_hog' && <GECOmaHog />}
      {active === 'multi_diff' && <GECMultiDiff />}
    </>
  );
};

export default GeneExpressionCallsTabMulti;
