import React from 'react';
import Bulma from '../Bulma';

const divSample =
  '<div>\n' +
  '      <strong>Release of Bgee version 15 beta</strong>\n' +
  '      <p>\n' +
  '        This is a major update of Bgee, with 28 new species; integration of\n' +
  '        single-cell RNA-Seq full-length data; improved treatment of bulk\n' +
  '        RNA-Seq, and addition of new libraries; and improved statistical\n' +
  "        treatment to control for False Discovery Rate. All <i>in situ</i>{' '}\n" +
  '        hybridization data retrieved from Model Organism Databases, and all\n' +
  '        genomes and underlying ontologies, have been updated.\n' +
  '      </p>\n' +
  '      <p>\n' +
  "        It is for now released as a beta version.{' '}\n" +
  '        <strong>\n' +
  '          Please note that the data for this beta release will not be archived\n' +
  '          and should not be used in publications, expecting long-term retrieval\n' +
  '        </strong>\n' +
  '        . The SPARQL endpoint was not updated.\n' +
  '      </p>\n' +
  '      <ul>\n' +
  '        <li>\n' +
  "          We are happy to announce that{' '}\n" +
  '          <strong>\n' +
  '            Bgee now includes single-cell RNA-Seq full-length data\n' +
  '          </strong>\n' +
  '          . We have designed statistical methods allowing to produce reliable\n' +
  '          present expression calls and expression scores for this data type. We\n' +
  '          also use annotation procedures allowing to capture with a high\n' +
  '          precision the cell types studied and their anatomical origin\n' +
  '          (post-composition of ontology terms). It is straightforwardly\n' +
  '          integrated in all our tools, along with all other data (bulk RNA-Seq,\n' +
  '          Affymetrix, <i>in situ</i> hybridization, Expressed Sequence Tags).\n' +
  '          For this release, we have integrated 1 481 libraries in human and\n' +
  '          mouse.\n' +
  '        </li>\n' +
  '        <li>\n' +
  '          28 species have been added, while 5 species have been discontinued,\n' +
  "          due to new criteria on anatomical coverage.{' '}\n" +
  '          <strong>\n' +
  '            In total, Bgee now integrates expression data in 52 species.\n' +
  '          </strong>\n' +
  '        </li>\n' +
  '        <li>\n' +
  '          We have improved the control of False Discovery Rate to produce\n' +
  '          present/absent expression calls. Rather than integrating boolean calls\n' +
  '          (where present calls always dominate), we produce a p-value for each\n' +
  '          expression call from each sample, and integrate these to produce a\n' +
  "          single call for each gene in each condition,{' '}\n" +
  '          <strong>\n' +
  '            using a Benjamini-Hochberg procedure to control for FDR\n' +
  '          </strong>\n' +
  '          .\n' +
  '        </li>\n' +
  '        <li>\n' +
  '          <strong>\n' +
  '            We have improved the treatment of bulk RNA-Seq data to generate more\n' +
  '            reliable absent expression calls\n' +
  '          </strong>\n' +
  '          . We now annotate precisely the protocol used to generate libraries\n' +
  '          (e.g., polyA, ribo-minus), and the gene types targeted (e.g., protein\n' +
  '          coding, miRNA). With this information, we produce absent expression\n' +
  '          calls for a gene only if its type was accessible to the RNA-Seq\n' +
  '          protocol used.\n' +
  '        </li>\n' +
  '        <li>\n' +
  '          <strong>5 818 bulk RNA-Seq libraries have been added</strong>, and 47\n' +
  "          libraries removed following improved quality controls.{' '}\n" +
  '          <ul>\n' +
  '            <li>\n' +
  "              For model organisms:{' '}\n" +
  '              <ul>\n' +
  '                <li>\n' +
  '                  261 added, 12 removed, for <i>Homo sapiens</i> (total library\n' +
  '                  count: 5 984)\n' +
  '                </li>\n' +
  '                <li>\n' +
  '                  73 added for <i>Mus musculus</i> (total: 566)\n' +
  '                </li>\n' +
  '                <li>\n' +
  '                  14 for <i>Danio rerio</i> (total: 161)\n' +
  '                </li>\n' +
  '                <li>\n' +
  "                  4 added, 35 removed, for <i>Drosophila melanogaster</i>{' '}\n" +
  '                  (total: 257)\n' +
  '                </li>\n' +
  '              </ul>\n' +
  '            </li>\n' +
  '            <li>\n' +
  '              For animals of agronomic and veterinary relevance (see also\n' +
  "              ray-finned fish below):{' '}\n" +
  '              <ul>\n' +
  '                <li>\n' +
  '                  1 356 new libraries for <i>Bos taurus</i> (total: 2 774)\n' +
  '                </li>\n' +
  '                <li>\n' +
  '                  594 for <i>Meleagris gallopavo</i> (new species)\n' +
  '                </li>\n' +
  '                <li>\n' +
  '                  434 for <i>Ovis aries</i> (new species)\n' +
  '                </li>\n' +
  '                <li>\n' +
  '                  79 for <i>Sus scrofa</i> (total: 528)\n' +
  '                </li>\n' +
  '                <li>\n' +
  '                  64 for <i>Capra hircus</i> (new species)\n' +
  '                </li>\n' +
  '                <li>\n' +
  '                  36 for <i>Gallus gallus</i> (total: 84)\n' +
  '                </li>\n' +
  '                <li>\n' +
  '                  3 for <i>Equus caballus</i> (total: 248)\n' +
  '                </li>\n' +
  '                <li>\n' +
  '                  1 for <i>Cavia porcellus</i> (total: 284)\n' +
  '                </li>\n' +
  '                <li>\n' +
  '                  1 for <i>Canis lupus familiaris</i> (total: 162)\n' +
  '                </li>\n' +
  '              </ul>\n' +
  '            </li>\n' +
  '            <li>\n' +
  "              For non-model primates:{' '}\n" +
  '              <ul>\n' +
  '                <li>\n' +
  '                  814 for <i>Papio anubis</i> (new species)\n' +
  '                </li>\n' +
  '                <li>\n' +
  '                  409 for <i>Chlorocebus sabaeus</i> (new species)\n' +
  '                </li>\n' +
  '                <li>\n' +
  '                  37 for <i>Macaca fascicularis</i> (new species)\n' +
  '                </li>\n' +
  '                <li>\n' +
  '                  19 for <i>Macaca nemestrina</i> (new species)\n' +
  '                </li>\n' +
  '                <li>\n' +
  '                  18 for <i>Cercocebus atys</i> (new species)\n' +
  '                </li>\n' +
  '                <li>\n' +
  '                  18 for <i>Microcebus murinus</i> (new species)\n' +
  '                </li>\n' +
  '                <li>\n' +
  '                  14 for <i>Callithrix jacchus</i> (new species)\n' +
  '                </li>\n' +
  '                <li>\n' +
  '                  4 for <i>Macaca mulatta</i> (total: 264)\n' +
  '                </li>\n' +
  '              </ul>\n' +
  '            </li>\n' +
  '            <li>\n' +
  "              For non-model ray-finned fish:{' '}\n" +
  '              <ul>\n' +
  '                <li>\n' +
  '                  333 for <i>Oryzias latipes</i> (new species)\n' +
  '                </li>\n' +
  '                <li>\n' +
  '                  274 for <i>Gasterosteus aculeatus</i> (new species)\n' +
  '                </li>\n' +
  '                <li>\n' +
  '                  165 for <i>Nothobranchius furzeri</i> (new species)\n' +
  '                </li>\n' +
  '                <li>\n' +
  '                  64 for <i>Astyanax mexicanus</i> (new species)\n' +
  '                </li>\n' +
  '                <li>\n' +
  '                  57 for <i>Gadus morhua</i> (new species)\n' +
  '                </li>\n' +
  '                <li>\n' +
  '                  45 for <i>Poecilia reticulata</i> (new species)\n' +
  '                </li>\n' +
  '                <li>\n' +
  '                  38 for <i>Astatotilapia calliptera</i> (new species)\n' +
  '                </li>\n' +
  '                <li>\n' +
  '                  36 for <i>Anguilla anguilla</i> (new species)\n' +
  '                </li>\n' +
  '                <li>\n' +
  '                  36 for <i>Scophthalmus maximus</i> (new species)\n' +
  '                </li>\n' +
  '                <li>\n' +
  '                  32 for <i>Neolamprologus brichardi</i> (new species)\n' +
  '                </li>\n' +
  '                <li>\n' +
  '                  32 for <i>Salmo salar</i> (new species)\n' +
  '                </li>\n' +
  '                <li>\n' +
  '                  24 for <i>Esox lucius</i> (new species)\n' +
  '                </li>\n' +
  '                <li>\n' +
  '                  21 for <i>Lepisosteus oculatus</i> (new species)\n' +
  '                </li>\n' +
  '              </ul>\n' +
  '            </li>\n' +
  '            <li>\n' +
  "              Other species:{' '}\n" +
  '              <ul>\n' +
  '                <li>\n' +
  '                  274 added for <i>Heterocephalus glaber</i> (new species)\n' +
  '                </li>\n' +
  '                <li>\n' +
  '                  57 for <i>Xenopus laevis</i> (new species)\n' +
  '                </li>\n' +
  '                <li>\n' +
  '                  52 for <i>Branchiostoma lanceolatum</i> (new species)\n' +
  '                </li>\n' +
  '                <li>\n' +
  '                  14 for <i>Latimeria chalumnae</i> (new species)\n' +
  '                </li>\n' +
  '                <li>\n' +
  '                  11 for <i>Manis javanica</i> (new species)\n' +
  '                </li>\n' +
  '              </ul>\n' +
  '            </li>\n' +
  '          </ul>\n' +
  "          The following species have been discontinued:{' '}\n" +
  "          <i>Erinaceus europaeus</i>, <i>Drosophila ananassae</i>,{' '}\n" +
  "          <i>Drosophila mojavensis</i>, <i>Drosophila virilis</i>,{' '}\n" +
  '          <i>Drosophila yakuba</i>.\n' +
  '        </li>\n' +
  '        <li>\n' +
  '          We have updated all data from Model Organism Databases (\n' +
  '          <a\n' +
  '            href="http://insitu.fruitfly.org/"\n' +
  '            target="_blank"\n' +
  '            className="external_link"\n' +
  '            rel="noreferrer"\n' +
  '          >\n' +
  '            BDGP\n' +
  '          </a>\n' +
  "          ,{' '}\n" +
  '          <a\n' +
  '            href="http://flybase.org/"\n' +
  '            target="_blank"\n' +
  '            className="external_link"\n' +
  '            rel="noreferrer"\n' +
  '          >\n' +
  '            FlyBase\n' +
  '          </a>\n' +
  "          ,{' '}\n" +
  '          <a\n' +
  '            href="http://www.informatics.jax.org/expression.shtml"\n' +
  '            target="_blank"\n' +
  '            className="external_link"\n' +
  '            rel="noreferrer"\n' +
  '          >\n' +
  '            MGI\n' +
  '          </a>\n' +
  "          ,{' '}\n" +
  '          <a\n' +
  '            href="http://www.wormbase.org"\n' +
  '            target="_blank"\n' +
  '            className="external_link"\n' +
  '            rel="noreferrer"\n' +
  '          >\n' +
  '            WormBase\n' +
  '          </a>\n' +
  "          ,{' '}\n" +
  '          <a\n' +
  '            href="http://www.xenbase.org/"\n' +
  '            target="_blank"\n' +
  '            className="external_link"\n' +
  '            rel="noreferrer"\n' +
  '          >\n' +
  '            Xenbase\n' +
  '          </a>\n' +
  "          ,{' '}\n" +
  '          <a\n' +
  '            href="http://zfin.org/"\n' +
  '            target="_blank"\n' +
  '            className="external_link"\n' +
  '            rel="noreferrer"\n' +
  '          >\n' +
  '            ZFIN\n' +
  '          </a>\n' +
  '          )\n' +
  '        </li>\n' +
  '        <li>\n' +
  '          We have updated all genome information and all underlying ontologies\n' +
  "          used (e.g.,{' '}\n" +
  '          <a\n' +
  '            href="http://uberon.org/"\n' +
  '            target="_blank"\n' +
  '            className="external_link"\n' +
  '            rel="noreferrer"\n' +
  '          >\n' +
  '            Uberon\n' +
  '          </a>\n' +
  '          )\n' +
  '        </li>\n' +
  '      </ul>\n' +
  '      <p>\n' +
  "        You can still access Bgee version 14.2 at{' '}\n" +
  '        <a\n' +
  '          title="Archive site Bgee version 14.2"\n' +
  '          href="https://bgee.org/bgee15_0/bgee14_2"\n' +
  '          target="_blank"\n' +
  '          rel="noopener noreferrer"\n' +
  '          className="external_link"\n' +
  '        >\n' +
  '          https://bgee.org/bgee15_0/bgee14_2\n' +
  '        </a>\n' +
  '        .\n' +
  '      </p>\n' +
  '    </div>';

const NewsItem = () => (
  <Bulma.Columns>
    <Bulma.C size={2}>
      <p className="has-text-centered">2021-06-15</p>
    </Bulma.C>
    {/* eslint-disable-next-line react/no-danger-with-children */}
    <Bulma.C size={10} dangerouslySetInnerHTML={{ __html: divSample }} />
  </Bulma.Columns>
);

export default NewsItem;
