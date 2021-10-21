import React from 'react';
import { Link } from 'react-router-dom';
import Bulma from '../Bulma';
import i18n from '../../i18n';
import NewsItem from '../NewsItem';
import config from '../../config.json';
import PATHS from '../../routes/paths';

const HomeNewsList = () => (
  <>
    <Bulma.Card.Header>
      <Bulma.Card.Header.Title className="is-size-4 has-text-primary">
        {i18n.t('home.news')}
      </Bulma.Card.Header.Title>
    </Bulma.Card.Header>
    <Bulma.Card.Body style={{ height: 350, overflowY: 'auto' }}>
      <div className="content">
        <NewsItem date="2021-06-15">
          <strong>Release of Bgee version 15 beta</strong>
          <p>
            This is a major update of Bgee, with 28 new species; integration of
            single-cell RNA-Seq full-length data; improved treatment of bulk
            RNA-Seq, and addition of new libraries; and improved statistical
            treatment to control for False Discovery Rate. All <i>in situ</i>
            hybridization data retrieved from Model Organism Databases, and all
            genomes and underlying ontologies, have been updated.
          </p>
          <p>
            It is for now released as a beta version.{' '}
            <strong>
              Please note that the data for this beta release will not be
              archived and should not be used in publications, expecting
              long-term retrieval
            </strong>
            . The SPARQL endpoint was not updated.
          </p>
          <ul>
            <li>
              We are happy to announce that{' '}
              <strong>
                Bgee now includes single-cell RNA-Seq full-length data
              </strong>
              . We have designed statistical methods allowing to produce
              reliable present expression calls and expression scores for this
              data type. We also use annotation procedures allowing to capture
              with a high precision the cell types studied and their anatomical
              origin (post-composition of ontology terms). It is
              straightforwardly integrated in all our tools, along with all
              other data (bulk RNA-Seq, Affymetrix, <i>in situ</i>
              hybridization, Expressed Sequence Tags). For this release, we have
              integrated 1 481 libraries in human and mouse.
            </li>
            <li>
              28 species have been added, while 5 species have been
              discontinued, due to new criteria on anatomical coverage.{' '}
              <strong>
                In total, Bgee now integrates expression data in 52 species.
              </strong>
            </li>
            <li>
              We have improved the control of False Discovery Rate to produce
              present/absent expression calls. Rather than integrating boolean
              calls (where present calls always dominate), we produce a p-value
              for each expression call from each sample, and integrate these to
              produce a single call for each gene in each condition,{' '}
              <strong>
                using a Benjamini-Hochberg procedure to control for FDR
              </strong>
              .
            </li>
            <li>
              <strong>
                We have improved the treatment of bulk RNA-Seq data to generate
                more reliable absent expression calls
              </strong>
              . We now annotate precisely the protocol used to generate
              libraries (e.g., polyA, ribo-minus), and the gene types targeted
              (e.g., protein coding, miRNA). With this information, we produce
              absent expression calls for a gene only if its type was accessible
              to the RNA-Seq protocol used.
            </li>
            <li>
              <strong>5 818 bulk RNA-Seq libraries have been added</strong>, and
              47 libraries removed following improved quality controls.{' '}
              <ul>
                <li>
                  For model organisms:{' '}
                  <ul>
                    <li>
                      261 added, 12 removed, for <i>Homo sapiens</i> (total
                      library count: 5 984)
                    </li>
                    <li>
                      73 added for <i>Mus musculus</i> (total: 566)
                    </li>
                    <li>
                      14 for <i>Danio rerio</i> (total: 161)
                    </li>
                    <li>
                      4 added, 35 removed, for <i>Drosophila melanogaster</i>
                      (total: 257)
                    </li>
                  </ul>
                </li>
                <li>
                  For animals of agronomic and veterinary relevance (see also
                  ray-finned fish below):{' '}
                  <ul>
                    <li>
                      1 356 new libraries for <i>Bos taurus</i> (total: 2 774)
                    </li>
                    <li>
                      594 for <i>Meleagris gallopavo</i> (new species)
                    </li>
                    <li>
                      434 for <i>Ovis aries</i> (new species)
                    </li>
                    <li>
                      79 for <i>Sus scrofa</i> (total: 528)
                    </li>
                    <li>
                      64 for <i>Capra hircus</i> (new species)
                    </li>
                    <li>
                      36 for <i>Gallus gallus</i> (total: 84)
                    </li>
                    <li>
                      3 for <i>Equus caballus</i> (total: 248)
                    </li>
                    <li>
                      1 for <i>Cavia porcellus</i> (total: 284)
                    </li>
                    <li>
                      1 for <i>Canis lupus familiaris</i> (total: 162)
                    </li>
                  </ul>
                </li>
                <li>
                  For non-model primates:{' '}
                  <ul>
                    <li>
                      814 for <i>Papio anubis</i> (new species)
                    </li>
                    <li>
                      409 for <i>Chlorocebus sabaeus</i> (new species)
                    </li>
                    <li>
                      37 for <i>Macaca fascicularis</i> (new species)
                    </li>
                    <li>
                      19 for <i>Macaca nemestrina</i> (new species)
                    </li>
                    <li>
                      18 for <i>Cercocebus atys</i> (new species)
                    </li>
                    <li>
                      18 for <i>Microcebus murinus</i> (new species)
                    </li>
                    <li>
                      14 for <i>Callithrix jacchus</i> (new species)
                    </li>
                    <li>
                      4 for <i>Macaca mulatta</i> (total: 264)
                    </li>
                  </ul>
                </li>
                <li>
                  For non-model ray-finned fish:{' '}
                  <ul>
                    <li>
                      333 for <i>Oryzias latipes</i> (new species)
                    </li>
                    <li>
                      274 for <i>Gasterosteus aculeatus</i> (new species)
                    </li>
                    <li>
                      165 for <i>Nothobranchius furzeri</i> (new species)
                    </li>
                    <li>
                      64 for <i>Astyanax mexicanus</i> (new species)
                    </li>
                    <li>
                      57 for <i>Gadus morhua</i> (new species)
                    </li>
                    <li>
                      45 for <i>Poecilia reticulata</i> (new species)
                    </li>
                    <li>
                      38 for <i>Astatotilapia calliptera</i> (new species)
                    </li>
                    <li>
                      36 for <i>Anguilla anguilla</i> (new species)
                    </li>
                    <li>
                      36 for <i>Scophthalmus maximus</i> (new species)
                    </li>
                    <li>
                      32 for <i>Neolamprologus brichardi</i> (new species)
                    </li>
                    <li>
                      32 for <i>Salmo salar</i> (new species)
                    </li>
                    <li>
                      24 for <i>Esox lucius</i> (new species)
                    </li>
                    <li>
                      21 for <i>Lepisosteus oculatus</i> (new species)
                    </li>
                  </ul>
                </li>
                <li>
                  Other species:{' '}
                  <ul>
                    <li>
                      274 added for <i>Heterocephalus glaber</i> (new species)
                    </li>
                    <li>
                      57 for <i>Xenopus laevis</i> (new species)
                    </li>
                    <li>
                      52 for <i>Branchiostoma lanceolatum</i> (new species)
                    </li>
                    <li>
                      14 for <i>Latimeria chalumnae</i> (new species)
                    </li>
                    <li>
                      11 for <i>Manis javanica</i> (new species)
                    </li>
                  </ul>
                </li>
              </ul>
              The following species have been discontinued:{' '}
              <i>Erinaceus europaeus</i>, <i>Drosophila ananassae</i>,{' '}
              <i>Drosophila mojavensis</i>, <i>Drosophila virilis</i>,{' '}
              <i>Drosophila yakuba</i>.
            </li>
            <li>
              We have updated all data from Model Organism Databases (
              <a
                href="http://insitu.fruitfly.org/"
                target="_blank"
                className="external_link"
                rel="noreferrer"
              >
                BDGP
              </a>
              ,{' '}
              <a
                href="http://flybase.org/"
                target="_blank"
                className="external_link"
                rel="noreferrer"
              >
                FlyBase
              </a>
              ,{' '}
              <a
                href="http://www.informatics.jax.org/expression.shtml"
                target="_blank"
                className="external_link"
                rel="noreferrer"
              >
                MGI
              </a>
              ,{' '}
              <a
                href="http://www.wormbase.org"
                target="_blank"
                className="external_link"
                rel="noreferrer"
              >
                WormBase
              </a>
              ,{' '}
              <a
                href="http://www.xenbase.org/"
                target="_blank"
                className="external_link"
                rel="noreferrer"
              >
                Xenbase
              </a>
              ,{' '}
              <a
                href="http://zfin.org/"
                target="_blank"
                className="external_link"
                rel="noreferrer"
              >
                ZFIN
              </a>
              )
            </li>
            <li>
              We have updated all genome information and all underlying
              ontologies used (e.g.,{' '}
              <a
                href="http://uberon.org/"
                target="_blank"
                className="external_link"
                rel="noreferrer"
              >
                Uberon
              </a>
              )
            </li>
          </ul>
          <p>
            You can still access Bgee version 14.2 at{' '}
            <a
              title="Archive site Bgee version 14.2"
              href="https://bgee.org/bgee14_2"
              target="_blank"
              rel="noopener noreferrer"
              className="external_link"
            >
              https://bgee.org/bgee14_2
            </a>
            .
          </p>
        </NewsItem>
        <NewsItem date="2021-02-22">
          Release of Bgee version 14.2
          <p>
            This is an incremental update of Bgee, improving data coverage
            mostly for animals of agronomic and veterinary relevance, and adding
            new functionalities to the website:{' '}
          </p>
          <ul>
            <li>
              On all gene pages you will now find links to ortholog and paralog
              gene pages, and links to directly run an{' '}
              <Link
                to={PATHS.ANALYSIS.EXPRESSION_COMPARISON}
                title="Expression comparison"
              >
                expression comparison analysis
              </Link>
              on them.
            </li>
            <li>
              We have made{' '}
              <Link
                to={PATHS.ANALYSIS.TOP_ANAT}
                title="Perform gene expression enrichment tests with TopAnat"
              >
                TopAnat
              </Link>
              faster when used with no decorrelation method.
            </li>
          </ul>
          <p>
            We have added new RNA-Seq libraries to Bgee. For animals of
            agronomic and veterinary relevance:{' '}
          </p>
          <ul>
            <li>
              <i>Bos taurus</i>: 1299 RNA-Seq libraries added
            </li>
            <li>
              <i>Sus scrofa</i>: 286 RNA-Seq libraries added
            </li>
            <li>
              <i>Cavia porcellus</i>: 255 RNA-Seq libraries added
            </li>
            <li>
              <i>Oryctolagus cuniculus</i>: 49 RNA-Seq libraries added
            </li>
            <li>
              <i>Canis lupus familiaris</i>: 20 RNA-Seq libraries added
            </li>
            <li>
              <i>Equus caballus</i>: 13 RNA-Seq libraries added
            </li>
            <li>
              <i>Felis catus </i>: 2 RNA-Seq libraries added
            </li>
          </ul>
          <p>For other species in Bgee: </p>
          <ul>
            <li>
              <i>Homo sapiens</i>: 47 RNA-Seq libraries added
            </li>
            <li>
              <i>Mus musculus</i>: 176 RNA-Seq libraries added
            </li>
            <li>
              <i>Macaca mulatta </i>: 22 RNA-Seq libraries added
            </li>
            <li>
              <i>Rattus norvegicus</i>: 10 RNA-Seq libraries added
            </li>
            <li>
              <i>Monodelphis domestica</i>: 7 RNA-Seq libraries added
            </li>
            <li>
              <i>Gorilla gorilla</i>: 2 RNA-Seq libraries added
            </li>
          </ul>
          <p>
            All calls of presence/absence of expression, expression scores, and
            all the Bgee tools and download files, have been updated
            accordingly.
          </p>
          <p>Other changes in this release: </p>
          <ul>
            <li>
              We have made changes to the way we propagate expression calls
              along the graph of conditions: calls of absence of expression are
              no longer propagated to child anatomical entities, so that an
              information of absence of expression is more reliable from now on.
            </li>
            <li>
              We have also corrected some relations between anatomical entities
              that were incorrectly missing in our database, improving the
              propagation of expression calls as well.
            </li>
          </ul>
        </NewsItem>
        <NewsItem date="2020-08-20">
          <ul>
            <li>
              Update of{' '}
              <Link
                to={PATHS.ANALYSIS.TOP_ANAT}
                title="Perform gene expression enrichment tests with TopAnat"
              >
                TopAnat
              </Link>
              :{' '}
              <ul>
                <li>
                  More information is now displayed about the list of genes you
                  entered.
                </li>
                <li>
                  It is now possible to use data from any developmental and life
                  stage in a same analysis. Previously, it was only possible to
                  perform analyses for embryonic stage on the one hand,
                  post-embryonic stage on the other hand.
                </li>
                <li>Fix various bugs in the interface.</li>
                <li>
                  Improve queries to the server for faster loading of existing
                  results.
                </li>
              </ul>
            </li>
            <li>
              New{' '}
              <Link to={PATHS.ABOUT.PUBLICATION} title="Bgee publications">
                publication page
              </Link>
              listing the publications related to Bgee, and describing how to
              cite us.
            </li>
            <li>Fixed several broken links to external resources.</li>
          </ul>
        </NewsItem>
        <NewsItem date="2020-03-26">
          Release of Bgee version 14.1
          <p>
            This is an incremental update of Bgee, with an updated RNA-Seq
            dataset, using the same genomes and ontologies as for the previous
            version Bgee 14.0. New RNA-Seq libraries have been added; some
            libraries previously integrated in Bgee have been discarded
            following corrections and improvements of quality controls. The
            Affymetrix, <i>in situ</i> hybridization, and EST datasets, are the
            same as for the previous release of Bgee 14.0. All calls of
            presence/absence of expression, expression scores, and all the Bgee
            tools and download files, have been updated accordingly.
          </p>
          <p>
            For most species in Bgee, notably non-human primates and farm and
            domestic animals, this represents a major improvement of the anatomy
            and life stage coverage of the data, making all Bgee tools much more
            useful, notably{' '}
            <Link
              to={PATHS.ANALYSIS.TOP_ANAT}
              title="Perform gene expression enrichment tests with TopAnat"
            >
              TopAnat
            </Link>
            and the{' '}
            <Link to={PATHS.SEARCH.GENE} title="Gene page">
              gene pages
            </Link>
            .
          </p>
          <ul>
            <li>
              For human, 663 RNA-Seq libraries added, 13 removed, for a total of
              5,676 libraries in Bgee 14.1; there are now in total 1,794
              conditions annotated in Bgee, in 334 anatomical entities.
            </li>
            <li>
              For model organisms:{' '}
              <ul>
                <li>
                  197 libraries added for mouse (total 330 libraries); there are
                  now in total 13,821 conditions annotated in Bgee, in 3,275
                  anatomical entities.
                </li>
                <li>
                  193 added for <i>Xenopus tropicalis</i> (total 259); 4,808
                  conditions annotated in Bgee, in 395 anatomical entities.
                </li>
                <li>
                  239 added for <i>Drosophila melanogaster</i> (total 253);
                  5,704 conditions annotated in Bgee, in 1,138 anatomical
                  entities.
                </li>
                <li>
                  80 added for <i>Danio rerio</i> (total 147); 7,307 conditions
                  annotated in Bgee, in 1,292 anatomical entities.
                </li>
                <li>
                  9 libraries removed for <i>Caenorhabditis elegans</i> (total
                  41), following improvements of quality controls; 745
                  conditions annotated in Bgee, in 360 anatomical entities.
                </li>
              </ul>
            </li>
            <li>
              Addition of data also in non-human primates:{' '}
              <ul>
                <li>
                  235 libraries added for <i>Pan troglodytes</i> (total 250
                  libraries); there are now in total 70 conditions annotated in
                  Bgee, in 26 anatomical entities.
                </li>
                <li>
                  196 libraries added, 48 removed for <i>Macaca mulatta</i>
                  (total 238); 50 conditions annotated in Bgee, in 25 anatomical
                  entities.
                </li>
                <li>
                  1 library added for <i>Pan paniscus</i> (total 13); 12
                  conditions annotated in Bgee, in 7 anatomical entities.
                </li>
              </ul>
            </li>
            <li>
              For farm and domestic animals:{' '}
              <ul>
                <li>
                  224 libraries added for <i>Equus caballus</i> (total 232);
                  there are now in total 58 conditions annotated in Bgee, in 24
                  anatomical entities.
                </li>
                <li>
                  159 added for <i>Sus scrofa</i> (total 169); 82 conditions
                  annotated in Bgee, in 41 anatomical entities.
                </li>
                <li>
                  135 added for <i>Canis lupus familiaris</i> (total 141); 105
                  conditions annotated in Bgee, in 54 anatomical entities.
                </li>
                <li>
                  88 added for <i>Bos taurus</i> (total 121); 22 conditions
                  annotated in Bgee, in 19 anatomical entities.
                </li>
                <li>
                  49 added for <i>Oryctolagus cuniculus</i> (total 55); 24
                  conditions annotated in Bgee, in 19 anatomical entities.
                </li>
                <li>
                  3 added for <i>Gallus gallus</i> (total 48); 30 conditions
                  annotated in Bgee, in 14 anatomical entities.
                </li>
                <li>
                  23 added for <i>Felis catus</i> (total 32); 15 conditions
                  annotated in Bgee, in 11 anatomical entities.
                </li>
                <li>
                  19 added for <i>Cavia porcellus</i> (total 28); 6 conditions
                  annotated in Bgee, in 5 anatomical entities.
                </li>
              </ul>
            </li>
            <li>
              Other species with changes:{' '}
              <ul>
                <li>
                  89 libraries added for <i>Monodelphis domestica</i> (total
                  108); there are now in total 51 conditions annotated in Bgee,
                  in 24 anatomical entities.
                </li>
                <li>
                  70 added for <i>Rattus norvegicus</i> (total 106); 64
                  conditions annotated in Bgee, in 22 anatomical entities.
                </li>
                <li>
                  27 added for <i>Anolis carolinensis</i> (total 31); 20
                  conditions annotated in Bgee, in 15 anatomical entities.
                </li>
                <li>
                  4 added for <i>Ornithorhynchus anatinus</i> (total 21); 16
                  conditions annotated in Bgee, in 9 anatomical entities.
                </li>
                <li>
                  2 added, 4 removed for <i>Drosophila simulans</i> (total 15);
                  7 conditions annotated in Bgee, in 4 anatomical entities.
                </li>
                <li>
                  4 removed for <i>Drosophila pseudoobscura</i> (total 10); 6
                  conditions annotated in Bgee, in 4 anatomical entities.
                </li>
              </ul>
            </li>
            <li>
              Update of the{' '}
              <Link to={PATHS.ANALYSIS.EXPRESSION_COMPARISON}>
                Expression Comparison page
              </Link>
              to display expression scores rather than expression ranks.
            </li>
            <li>
              Update of the menu, of the{' '}
              <Link to={PATHS.ABOUT.COLLABORATIONS}>collaboration page</Link>,
              of the{' '}
              <Link to={PATHS.RESOURCES.SPARQL}>SPARQL documentation page</Link>
              (notably to access archived version of Bgee, starting with Bgee
              14.0).{' '}
            </li>
          </ul>
          <p>
            You can still access Bgee version 14.0 at{' '}
            <a
              title="Archive site Bgee version 14"
              href={
                config.archivedVersion.find((a) => a.version === '14.0').url
              }
              target="_blank"
              rel="noopener noreferrer"
              className="external_link"
            >
              {config.archivedVersion.find((a) => a.version === '14.0').url}
            </a>
            .
          </p>
        </NewsItem>
        <NewsItem date="2019-10-05">
          <ul>
            <li>
              New score on{' '}
              <Link to={PATHS.SEARCH.GENE} title="Gene page">
                gene pages
              </Link>
              .
            </li>
            <li>
              New{' '}
              <Link to={PATHS.SEARCH.SPECIES} title="Species">
                species
              </Link>
              page.
            </li>
            <li>
              Update of the{' '}
              <Link
                to={PATHS.ANALYSIS.EXPRESSION_COMPARISON}
                title="Expression comparison"
              >
                expression comparison
              </Link>
              .{' '}
              <ul>
                <li>Better sorting approach.</li>
                <li>
                  Possibility to export results (copy to clipboard or TSV).
                </li>
              </ul>
            </li>
            <li>
              Improve findability of data by adding{' '}
              <a href="https://bioschemas.org" title="Bioschemas">
                Bioschemas
              </a>
              markup.
            </li>
          </ul>
        </NewsItem>
        <NewsItem date="2019-05-21">
          <ul>
            <li>
              New{' '}
              <Link
                to={PATHS.ANALYSIS.EXPRESSION_COMPARISON}
                title="Expression comparison"
              >
                expression comparison
              </Link>
              page.
            </li>
            <li>
              New{' '}
              <Link
                to={PATHS.SEARCH.ANATOMICAL_HOMOLOGY}
                title="Anatomical homology"
              >
                anatomical homology
              </Link>
              page.
            </li>
            <li>
              New resource pages:{' '}
              <Link to={PATHS.RESOURCES.R_PACKAGES} title="R packages">
                R packages
              </Link>
              ,{' '}
              <Link to={PATHS.RESOURCES.ANNOTATIONS} title="Annotations">
                Annotations
              </Link>
              ,{' '}
              <Link to={PATHS.RESOURCES.ONTOLOGIES} title="Ontologies">
                Ontologies
              </Link>
              and{' '}
              <Link to={PATHS.RESOURCES.SOURCE_CODE} title="Source code">
                Source code
              </Link>
              pages.
            </li>
            <li>
              New{' '}
              <Link to={PATHS.DOWNLOAD.DATA_DUMPS} title="MySQL dumps">
                Data dumps
              </Link>
              and{' '}
              <Link to={PATHS.RESOURCES.SPARQL} title="Bgee SPARQL endpoint">
                SPARQL endpoint
              </Link>
              pages.
            </li>
            <li>
              New{' '}
              <Link to={PATHS.ABOUT.COLLABORATIONS} title="Bgee collaborations">
                Bgee collaborations
              </Link>
              page.
            </li>
            <li>Update of the menu</li>
          </ul>
        </NewsItem>
        <NewsItem date="2019-05-12">
          <ul>
            <li>
              Update of the <Link to={PATHS.SEARCH.GENE}>gene search page</Link>
              :{' '}
              <ul>
                <li>
                  Addition of a gene search result page (i.e.{' '}
                  <Link
                    to={`${PATHS.SEARCH.GENE}?query=HBB`}
                    title='Search genes with "HBB"'
                  >
                    search with &quot;HBB&quot;
                  </Link>
                  )
                </li>
                <li>Improvement of the speed of autocompletion</li>
              </ul>
            </li>
            <li>
              Modification of gene pages to display gene name synoyms, and
              cross-references to other resources
            </li>
          </ul>
        </NewsItem>
        <NewsItem date="2019-04-05">
          <ul>
            <li>
              New{' '}
              <Link to={PATHS.ABOUT.PRIVACY_POLICY}>privacy policy page</Link>
            </li>
            <li>
              New <Link to={PATHS.SUPPORT.FAQ}>FAQ page</Link>
              where we address common user queries
            </li>
            <li>
              New <Link to={PATHS.RESOURCES.DOCS}>documentation page</Link>
              specific to GTEx project to learn how we integrated these data
              into Bgee
            </li>
            <li>
              Update to Bgee 14.0 of the{' '}
              <Link to={PATHS.SUPPORT.GENE_EXPRESSION_CALLS}>
                gene expression call documentation
              </Link>
            </li>
            <li>
              Update of the{' '}
              <Link to={PATHS.ABOUT.SOURCES}>data source page</Link>
              to provide version information
            </li>
            <li>We have clarified our license; we have chosen CC0.</li>
            <li>Update of the menu</li>
          </ul>
        </NewsItem>
        <NewsItem date="2018-02-14">
          Release of Bgee version 14.0:
          <ul>
            <li>
              Release of the production version of Bgee release 14:{' '}
              <ul>
                <li>
                  <Link
                    to={PATHS.ANALYSIS.TOP_ANAT}
                    title="Perform gene expression enrichment tests with TopAnat"
                  >
                    TopAnat
                  </Link>
                  can now be used based on Bgee 14 data.
                </li>
                <li>
                  <Link
                    to={PATHS.SEARCH.GENE}
                    title="Search expression call for a gene"
                  >
                    Gene expression calls
                  </Link>
                  should now be properly retrieved for all genes.
                </li>
              </ul>
            </li>
          </ul>
          You can still access Bgee 13 at{' '}
          <a
            title="Archive site Bgee version 13"
            href={config.archivedVersion.find((a) => a.version === '13.0').url}
            target="_blank"
            rel="noopener noreferrer"
            className="external_link"
          >
            {config.archivedVersion.find((a) => a.version === '13.0').url}
          </a>
          .
        </NewsItem>
        <NewsItem date="2017-05-16">
          Release of Bgee version 14-beta:
          <ul>
            <li>
              12 new species, bringing the total to 29:{' '}
              <ul>
                <li>
                  new mammal species: horse, rabbit, dog, cat, guinea pig,
                  hedgehog;
                </li>
                <li>
                  new Drosophila species: D. ananassae, D. mojavensis, D.
                  pseudoobscura, D. simulans, D. virilis, D. yakuba.
                </li>
              </ul>
            </li>
            <li>All species now have RNA-Seq data.</li>
            <li>
              Addition of curated human RNA-Seq data from GTEx, removing
              unhealthy samples; see
              <Link
                to={`${PATHS.DOWNLOAD.GENE_EXPRESSION_CALLS}#1`}
                // href="https://bgee.org/bgee15_0/?page=download&amp;action=expr_calls#id1" {/* TODO replace with correct PATH */}
              >
                human data
              </Link>
              .
            </li>
            <li>
              Improved quality annotation of calls: replacement of &quot;low
              quality&quot; / &quot;high quality&quot; by:
              <ul>
                <li>
                  &quot;Gold&quot;: ≥2 experiments with a high confidence calls;
                </li>
                <li>
                  &quot;Silver&quot;: 1 experiment with a high confidence call,
                  or ≥2 experiments with low confidence calls;
                </li>
                <li>
                  &quot;Bronze&quot;: 1 experiment with a low confidence call;
                  these are not shown by default.
                </li>
              </ul>
            </li>
            <li>
              Update of download pages to make it easier to chose files to
              retrieve; inclusion of gene ranks (as used in gene pages) in call
              files..
            </li>
          </ul>
          You can still access Bgee 13 at{' '}
          <a
            title="Archive site Bgee version 13"
            href={config.archivedVersion.find((a) => a.version === '13.0').url}
            target="_blank"
            rel="noopener noreferrer"
            className="external_link"
          >
            {config.archivedVersion.find((a) => a.version === '13.0').url}
          </a>
          .
        </NewsItem>
        <NewsItem date="2016-07-06">
          Release of Bgee version 13.2:{' '}
          <ul>
            <li>
              Major update of our gene page and ranking algorithm:{' '}
              <ul>
                <li>
                  We are happy to announce that we have updated our ranking
                  algorithm allowing to discover the most relevant anatomical
                  entities and life stages where a gene is expressed. We hope
                  that you will appreciate the noticeable improvements.
                </li>
                <li>
                  The gene page has been updated to display the rank scores of
                  conditions where a gene is expressed, allowing to easily
                  identify major functional shifts in gene expression.
                </li>
              </ul>
              Give a try to this updated ranking by searching for your favorite
              gene, or by using the example links, on the{' '}
              <Link to={PATHS.SEARCH.GENE}>gene search page</Link>.
            </li>
            <li>
              We now display more information about the sources of data used in
              Bgee, see the new{' '}
              <Link to={PATHS.ABOUT.SOURCES}>data source page</Link>, and new
              information added to the gene pages.
            </li>
          </ul>
        </NewsItem>
        <NewsItem date="2016-05-09">
          Release of our new{' '}
          <a
            href="https://bioconductor.org/packages/BgeeDB/"
            className="external_link"
            target="_blank"
            rel="noopener noreferrer"
          >
            BgeeDB R package
          </a>
          , a package for the annotation and gene expression data download from
          Bgee database into R, and TopAnat analysis (see also{' '}
          <a
            href="https://bioconductor.org/packages/BgeeDB/"
            className="external_link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Bioconductor website
          </a>
          ).
        </NewsItem>
        <NewsItem date="2016-03-22">
          Various improvements of our new interface.
        </NewsItem>
        <NewsItem date="2016-03-09">
          Release of our new <Link to={PATHS.SEARCH.GENE}>gene page</Link>,
          allowing to discover the most relevant conditions where a gene is
          expressed. This update also includes an important revamping of our
          interfaces.
        </NewsItem>
        <NewsItem date="2015-12-24">
          Major update of{' '}
          <Link
            to={PATHS.ANALYSIS.TOP_ANAT}
            title="Perform gene expression enrichment tests with TopAnat"
          >
            TopAnat
          </Link>
          . Happy Christmas!
        </NewsItem>
        <NewsItem date="2015-11-24">
          We are happy to release of our new exclusive tool for gene expression
          enrichment analyses:{' '}
          <Link
            to={PATHS.ANALYSIS.TOP_ANAT}
            title="Perform gene expression enrichment tests with TopAnat"
          >
            TopAnat
          </Link>
          . This is a tool with absolutely no equivalent, developped in
          collaboration with the Web-Team of the SIB Swiss Institute of
          Bioinformatics. Check it out!
        </NewsItem>
        <NewsItem date="2015-08-26">Update of the home page.</NewsItem>
        <NewsItem date="2015-06-08">
          Release of Bgee version 13.1:{' '}
          <ul>
            <li>Update of the website interfaces.</li>
            <li>
              <Link to={PATHS.DOWNLOAD.PROCESSED_EXPRESSION_VALUES}>
                New download page
              </Link>
              providing processed expression values.
            </li>
            <li>
              Addition of mouse <i>in situ</i> data from MGI, see{' '}
              <Link
                to={`${PATHS.DOWNLOAD.GENE_EXPRESSION_CALLS}#id2`}
                // href="https://bgee.org/bgee15_0/?page=download&amp;action=expr_calls#id2" TODO check it's matching
              >
                mouse data
              </Link>
              .
            </li>
            <li>
              Differential expression data have been added for{' '}
              <Link
                to={`${PATHS.DOWNLOAD.GENE_EXPRESSION_CALLS}#id3`}
                // href="https://bgee.org/bgee15_0/?page=download&amp;action=expr_calls#id3" TODO check it's matching
              >
                zebrafish
              </Link>
              ,{' '}
              <Link
                to={`${PATHS.DOWNLOAD.GENE_EXPRESSION_CALLS}#id6`}
                // href="https://bgee.org/bgee15_0/?page=download&amp;action=expr_calls#id6" TODO check it's matching
              >
                chimpanzee
              </Link>
              ,{' '}
              <Link
                to={`${PATHS.DOWNLOAD.GENE_EXPRESSION_CALLS}#id8`}
                // href="https://bgee.org/bgee15_0/?page=download&amp;action=expr_calls#id8" TODO check it's matching
              >
                gorilla
              </Link>
              , and{' '}
              <Link
                to={`${PATHS.DOWNLOAD.GENE_EXPRESSION_CALLS}#id19`}
                // href="https://bgee.org/bgee15_0/?page=download&amp;action=expr_calls#id19" TODO check it's matching
              >
                opossum
              </Link>
              .
            </li>
            <li>
              Addition of new multi-species differential expression data, see
              for instance{' '}
              <Link
                to={`${PATHS.DOWNLOAD.GENE_EXPRESSION_CALLS}#9598_9544`}
                // href="https://bgee.org/bgee15_0/?page=download&amp;action=expr_calls#id9598_9544" TODO check it's matching
              >
                chimpanzee/macaque comparison
              </Link>
              .
            </li>
            <li>
              New format to provide gene orthology information in multi-species
              files, see for instance{' '}
              <Link
                to={`${PATHS.DOWNLOAD.GENE_EXPRESSION_CALLS}#oma_hog`}
                // href="https://bgee.org/bgee15_0/?page=doc&amp;action=call_files#oma_hog" TODO check it's matching
              >
                OMA Hierarchical orthologous groups documentation
              </Link>
              .
            </li>
            <li>
              Removal of data incorrectly considered as normal in{' '}
              <i>C. elegans</i>, see{' '}
              <Link
                to={`${PATHS.DOWNLOAD.GENE_EXPRESSION_CALLS}#id5`}
                // href="https://bgee.org/bgee15_0/?page=download&amp;action=expr_calls#id5" TODO check it's matching
              >
                worm data
              </Link>
              .
            </li>
            <li>
              Improved filtering of propagated no-expression calls. As a result,
              complete expression calls files do not contain invalid conditions
              anymore.
            </li>
            <li>
              Filtering of invalid developmental stages for differential
              expression analyses.
            </li>
          </ul>
        </NewsItem>
        <NewsItem date="2015-04-16">
          Release of the multi-species differential expression data (across
          anatomy) for 6 groups, see{' '}
          <Link
            to={PATHS.DOWNLOAD.PROCESSED_EXPRESSION_VALUES}
            title="Download overview"
          >
            download overview
          </Link>
          .
        </NewsItem>
        <NewsItem date="2015-03-03">
          Release of the single-species differential expression data for 11
          species, see{' '}
          <Link
            to={PATHS.DOWNLOAD.PROCESSED_EXPRESSION_VALUES}
            title="Download overview"
          >
            download overview
          </Link>
          .
        </NewsItem>
        <NewsItem date="2014-12-19">
          Release of the single-species expression data for 17 species, see{' '}
          <a
            href={
              config.permanentVersionedDomain +
              PATHS.DOWNLOAD.PROCESSED_EXPRESSION_VALUES
            }
            title="Download overview"
          >
            download overview
          </a>
          .
        </NewsItem>
      </div>
    </Bulma.Card.Body>
  </>
);

export default HomeNewsList;
