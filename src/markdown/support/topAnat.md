TopAnat documentation
=====================

TopAnat is a tool to identify and visualize enriched anatomical terms, from the expression patterns of a list of genes.

It allows you to discover where genes from a set are preferentially expressed, as compared to a background, represented by default by all expression data in Bgee for the requested species. It is similar to a Gene Ontology enrichment test, except that it analyzes the anatomical structures where genes are expressed, rather than their GO functional annotations.

See also our [blog post](https://bgeedb.wordpress.com/category/topanat/ "Link to the Bgee Wordpress blog") about TopAnat for more information.

**Please note that the results can be slow to compute**, typically from 5 to 30 minutes, depending on the amount of data to process.

Quick start
-----------

### How to use

*   Enter a list of Ensembl identifiers into the first form field,
*   Optionally, enter a list of background genes,
*   Optionally, change the program parameters with the dropdown menu.
*   Click the 'Submit your job' button.

### Examples

*   [Human genes involved in autism and epilepsy, with decorrelation](/analysis/top-anat/8af5b0727ba1c62318707bf6f59c7c9c2b3697a1 "TopAnat example").
*   [Mouse genes mapped to the GO term "spermatogenesis", with decorrelation](/analysis/top-anat/2dd226ea83f1b041cf105e7d18a01d81fff19d10 "TopAnat example").
*   [Zebrafish 3R ohnologs showing nervous system expression of 3R duplicates](/analysis/top-anat/2bf58d4561f36bbaec9bebc730131423e695df3d "TopAnat example").
*   [Pigmentation genes in rabbit, with decorrelation](/analysis/top-anat/9a9896727557dab83c45731d3fd4f4ccadf19be0 "TopAnat example").
*   [COVID-19 related human genes, with decorrelation and increased FDR threshold](/analysis/top-anat/10fb20cc0f767484a570ee82e5c24fc317657d23 "TopAnat example").

Note of caution
---------------

In your analyses, you should be extremely careful about the definition of your universe (i.e., your background genes). The cases where it is correct to use the default background (i.e., all genes with data in Bgee for the selected species) should be actually rare. For instance, if you are studying a list of genes assigned to a specific GO category, then your universe should be 'all genes with a GO annotation', and not 'all genes with data in Bgee'. Of course, it is still useful to use the default background, for preliminary analyses, or when the biological signal extracted from your gene list is very strong. But it should often be more rigorously defined for data used in publications.

More information
----------------

TopAnat is based on [topGO](https://bioconductor.org/packages/topGO/ "topGO package in Bioconductor"). Adaptation of topGO courtesy of Adrian Alexa.
