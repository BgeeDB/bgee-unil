RNA-Seq download file documentation: annotations and processed expression values
=====================================================================

This documentation describes the format of annotation download files (that include the library and experiment files) as well as the processed expression values download files for RNA-Seq data. The files can be found in the Bgee [download page](/download/processed-expression-values "Bgee Processed expression values download page") for each species.

*   [Annotation download files](#annotation-download-files "Quick jump to this section")
    *   [Library file](#library-file "Quick jump to this section")
    *   [Experiment file](#experiment-file "Quick jump to this section")
*   [Processed expression values download files](#processed-expression-values-download-files "Quick jump to this section")


Annotation download files
---------------------------------------------------------------

Go to:

*   [Library file](#library-file "Quick jump to this section")
*   [Experiment file](#experiment-file "Quick jump to this section")


The annotation download files are divided in 2 main files:

1) **library information**: where is provided detailed information for each individual sample, as annotation to anatomy, development, sex, strain as well as provide quality scores used in quality control metrics.

2) **experiment information**: where is provided the over-all information about the experiment, as number of libraries that belong to the experiment, as well as number of conditions, number of organs, number of stages and number of strains.

### Library file

Format description of the library download file for a target species:

|Column|Content|Example|
|---|---|:---:|
|1|[Experiment ID](#lib_col1 "See Experiment ID column description")|GSE44612|
|2|[Library ID](#lib_col2 "See Library ID column description")|SRX091570|
|3|[Anatomical entity ID](#lib_col3 "See Anatomical entity ID column description")|UBERON:0000079|
|4|[Anatomical entity name](#lib_col4 "See Anatomical entity name column description")|male reproductive system|
|5|[Stage ID](#lib_col5 "See Stage ID column description")|DsimDv:0000007|
|6|[Stage name](#lib_col6 "See Stage name column description")|days 5-8 of fully formed stage (Drosophila simulans)|
|7|[Sex](#lib_col7 "See Sex column description")|male|
|8|[Strain](#lib_col8 "See Strain column description")|(DSSC) 14021-0251.199|
|9|[Expression mapped anatomical entity ID](#lib_col9 "See Expression mapped anatomical entity ID column description")|UBERON:0000079|
|10|[Expression mapped anatomical entity name](#lib_col10 "See Expression mapped anatomical entity name column description")|male reproductive system|
|11|[Expression mapped stage ID](#lib_col11 "See Expression mapped stage ID column description")|DsimDv:0000007|
|12|[Expression mapped stage name](#lib_col12 "See Expression mapped stage name column description")|days 5-8 of fully formed stage (Drosophila simulans)|
|13|[Expression mapped sex](#lib_col13 "See Expression mapped sex column description")|male|
|14|[Expression mapped strain](#lib_col14 "See Expression mapped strain column description")|(DSSC) 14021-0251.199|
|15|[Platform ID](#lib_col15 "See Platform ID column description")|Illumina Genome Analyzer II|
|16|[Protocol](#lib_col16 "See Protocol column description")|polyA|
|17|[Library type](#lib_col17 "See Library type column description")|paired|
|18|[Library orientation](#lib_col18 "See Library orientation column description")|NA|
|19|[TMM normalization factor](#lib_col19 "See TMM normalization factor column description")|0.831812|
|20|[TPM expression threshold](#lib_col20 "See TPM expression threshold column description")|0.410944|
|21|[Read count](#lib_col21 "See Read count column description")|27021668|
|22|[Mapped read count](#lib_col22 "See Mapped read count column description")|11538462|
|23|[Min. read length](#lib_col23 "See Min. read length column description")|101|
|24|[Max. read length](#lib_col24 "See Max. read length column description")|101|
|25|[All genes percent present](#lib_col25 "See All genes percent present column description")|80.49|
|26|[Protein coding genes percent present](#lib_col26 "See Protein coding genes percent present column description")|82.26|
|27|[Intergenic regions percent present](#lib_col27 "See Intergenic regions percent present column description")|3.53|
|28|[Distinct rank count](#lib_col28 "See Distinct rank count column description")|13871|
|29|[Max rank in the expression mapped condition](#lib_col29 "See Max rank in the expression mapped condition column description")|NA|
|30|[Run IDs](#lib_col30 "See Run IDs column description")|SRR330571|
|31|[Data source](#lib_col31 "See Data source column description")|GEO|
|32|[Data source URL](#lib_col32 "See Data source URL column description")|https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=SRX091570|
|33|[Bgee normalized data URL](#lib_col33 "See Bgee normalized data URL column description")|ftp://ftp.bgee.org/bgee_v15_0/download/processed_expr_values/rna_seq/Drosophila_simulans/Drosophila_simulans_RNA-Seq_read_counts_TPM_FPKM_GSE44612.tsv.gz|
|34|[Raw file URL](#lib_col34 "See Raw file URL column description")|https://trace.ncbi.nlm.nih.gov/Traces/study/?acc=SRX091570|

Example of rows of the library download file for a target species:

|Experiment ID|Library ID|Anatomical entity ID|Anatomical entity name|Stage ID|Stage name|Sex|Strain|Expression mapped anatomical entity ID|Expression mapped anatomical entity name|Expression mapped stage ID|Expression mapped stage name|Expression mapped sex|Expression mapped strain|Platform ID|Protocol|Library type|Library orientation|TMM normalization factor|TPM expression threshold|Read count|Mapped read count|Min. read length|Max. read length|All genes percent present|Protein coding genes percent present|Intergenic regions percent present|Distinct rank count|Max rank in the expression mapped condition|Run IDs|Data source|Data source URL|Bgee normalized data URL|Raw file URL|
|--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |
GSE44612|SRX091570|UBERON:0000079|male reproductive system|DsimDv:0000007|days 5-8 of fully formed stage (Drosophila simulans)|male|(DSSC) 14021-0251.199|UBERON:0000079|male reproductive system|DsimDv:0000007|days 5-8 of fully formed stage (Drosophila simulans)|male|(DSSC) 14021-0251.199|Illumina Genome Analyzer II|polyA|paired|NA|0.831812|0.410944|27021668|11538462|101|101|80.49|82.26|3.53|13871|NA|SRR330571|GEO|https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=SRX091570|ftp://ftp.bgee.org/bgee_v15_0/download/processed_expr_values/rna_seq/Drosophila_simulans/Drosophila_simulans_RNA-Seq_read_counts_TPM_FPKM_GSE44612.tsv.gz|https://trace.ncbi.nlm.nih.gov/Traces/study/?acc=SRX091570|
GSE44612|SRX091571|UBERON:0000079|male reproductive system|DsimDv:0000007|days 5-8 of fully formed stage (Drosophila simulans)|male|(DSSC) 14021-0251.199|UBERON:0000079|male reproductive system|DsimDv:0000007|days 5-8 of fully formed stage (Drosophila simulans)|male|(DSSC) 14021-0251.199|Illumina Genome Analyzer II|polyA|paired|NA|0.974193|0.228134|25107578|14585590|101|101|61.09|63.55|2.49|11546|NA|SRR330572|GEO|https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=SRX091571|ftp://ftp.bgee.org/bgee_v15_0/download/processed_expr_values/rna_seq/Drosophila_simulans/Drosophila_simulans_RNA-Seq_read_counts_TPM_FPKM_GSE44612.tsv.gz|https://trace.ncbi.nlm.nih.gov/Traces/study/?acc=SRX091571|
GSE44612|SRX091572|UBERON:0000079|male reproductive system|DsimDv:0000007|days 5-8 of fully formed stage (Drosophila simulans)|male|(DSSC) 14021-0251.199|UBERON:0000079|male reproductive system|DsimDv:0000007|days 5-8 of fully formed stage (Drosophila simulans)|male|(DSSC) 14021-0251.199|Illumina Genome Analyzer II|polyA|paired|NA|0.877587|0.414407|20281880|13357213|101|101|81.3|83.24|3.12|13954|NA|SRR330573|GEO|https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=SRX091572|ftp://ftp.bgee.org/bgee_v15_0/download/processed_expr_values/rna_seq/Drosophila_simulans/Drosophila_simulans_RNA-Seq_read_counts_TPM_FPKM_GSE44612.tsv.gz|https://trace.ncbi.nlm.nih.gov/Traces/study/?acc=SRX091572|


##### <a name="lib_col1"></a>Experiment ID (column 1)
The Experiment ID column provides the unique identifier per experiment.

##### <a name="lib_col2"></a>Library ID (column 2)
The Library ID column provides the unique identifier per sample that belongs to an `Experiment ID` (column 1).

##### <a name="lib_col3"></a>Anatomical entity ID (column 3)
The Anatomical entity ID column provides a unique identifier of the anatomical entity, from the Uberon ontology.

##### <a name="lib_col4"></a>Anatomical entity name (column 4)
The anatomical entity name column provides the name of the anatomical entity defined by `Anatomical entity ID` (column 3).

##### <a name="lib_col5"></a>Stage ID (column 5)
The Stage ID column provides the unique identifier of the developmental stage, from the Uberon ontology.

##### <a name="lib_col6"></a>Stage name (column 6)
The Stage name column provides the name of the developmental stage defined by `Stage ID` (column 5).

##### <a name="lib_col7"></a>Sex (column 7)
The Sex column provides the sexes information.

##### <a name="lib_col8"></a>Strain (column 8)
The Strain column provides the information about the genetic variant or subtype of an organism.

##### <a name="lib_col9"></a>Expression mapped anatomical entity ID (column 9)
The Expression mapped anatomical entity ID column is the annotation used in the Bgee expression calls. It can be different from the `Anatomical entity ID` (column 3) if it was too granular to be inserted in the database.

##### <a name="lib_col10"></a>Expression mapped anatomical entity name (column 10)
The Expression mapped anatomical entity name column provides the name of the anatomical entity defined by `Expression mapped anatomical entity ID` (column 9).

##### <a name="lib_col11"></a>Expression mapped stage ID (column 11)
The Expression mapped stage ID column is the annotation used in the Bgee expression calls. It can be different from the `Stage ID` (column 5) if it was too granular to be inserted in the database.

##### <a name="lib_col12"></a>Expression mapped stage name (column 12)
The Expression mapped stage name column provides the name of the developmental stage defined by `Expression mapped stage ID` (column 11).

##### <a name="lib_col13"></a>Expression mapped sex (column 13)
The Expression mapped sex column provides the sexes information used in the Bgee expression calls.

##### <a name="lib_col14"></a>Expression mapped strain (column 14)
The Expression mapped strain column provides the sexes information used in the Bgee expression calls.

##### <a name="lib_col15"></a>Platform ID (column 15)
The Platform ID column provides the sequencing platform identifier.

##### <a name="lib_col16"></a>Protocol (column 16)
The Protocol column provides the information about the RNA-sequencing protocol used for libraries construction. For the moment four different types of protocols are annotated: circRNA, lncRNA, miRNA and polyA.

##### <a name="lib_col17"></a>Library type (column 17)
The Library type column consists in the strandedness of the library. This can be single or paired-end.

##### <a name="lib_col18"></a>Library orientation (column 18)
The Library orientation column provides the relative orientation of the reads.

##### <a name="lib_col19"></a>TMM normalization factor (column 19)
The TMM normalization factor column provides the estimated normalized factor of the relative RNA production levels from the RNA-seq data. Using the TMM method we estimate the scale factors between samples, this means from libraries that belong to the same target `Experiment ID` (column 1).

##### <a name="lib_col20"></a>TPM expression threshold (column 20)
The TPM expression threshold column provides the minimum TPM value to call expressed genes in the `Library ID` (column 2).

##### <a name="lib_col21"></a>Read count (column 21)
The Read count column provides the total number of read counts that will be mapped to transcriptome.

##### <a name="lib_col22"></a>Mapped read count (column 22)
The Mapped read count column provides the number of read counts that overlap/mapped to the genomic position.

##### <a name="lib_col23"></a>Min. read length (column 23)
The Min. read length column provides the minimum number of base pairs (bp) sequenced from a DNA fragment.

##### <a name="lib_col24"></a>Max. read length (column 24)
The Max. read length column provides the maximum number of base pairs (bp) sequenced from a DNA fragment.

##### <a name="lib_col25"></a>All genes percent present (column 25)
The All genes percent present column provides the information about the proportion of genes called actively expressed in the `Library ID` (column 2).

##### <a name="lib_col26"></a>Protein coding genes percent present (column 26)
The Protein coding genes percent present column provides the information about the proportion of protein coding genes called actively expressed in the `Library ID` (column 2).

##### <a name="lib_col27"></a>Intergenic regions percent present (column 27)
The Intergenic regions percent present column provides the information about the proportion of intergenic regions called actively expressed in the `Library ID` (column 2).

##### <a name="lib_col28"></a>Distinct rank count (column 28)
The Distinct rank count column provides information about unique rank counts in the `Library ID` (column 2). It is used to weight the rank information coming from this library when computing expression ranks and expression scores.

##### <a name="lib_col29"></a>Max rank in the expression mapped condition (column 29)
The Max rank in the expression mapped condition column provides the max rank over all libraries in this condition. It is used to normalize ranks between conditions when computing expression ranks and expression scores.

##### <a name="lib_col30"></a>Run IDs (column 30)
The Run IDs column refers to a sequencing run associated to a `library ID` (column 2).

##### <a name="lib_col31"></a>Data source (column 31)
Data repository from where the raw files were extracted. Collect all `Run IDs` (column 30) correspondent to a target `library ID` (column 2).

##### <a name="lib_col32"></a>Data source URL (column 32)
URL pathway to the data repository where is located the `library ID` (column 2).

##### <a name="lib_col33"></a>Bgee normalized data URL (column 33)
URL pathway where is located the processed data for the correspondent `Experiment ID` (column 1) in Bgee.

##### <a name="lib_col34"></a>Raw file URL (column 34)
URL pathway to the SRA Run Selector. This allows to access to the `Run IDs` (column 30) through the `library ID` (column 2).


### Experiment file

Format description of the experiment download file for a target species:

|Column|Content|Example|
|---|---|:---:|
|1|[Experiment ID](#exp_col1 "See Experiment ID column description")|GSE44612|
|2|[Experiment name](#exp_col2 "See Experiment name column description")|Comparative Validation of the D. melanogaster Encyclopedia of DNA Elements Transcript Models|
|3|[Library count](#exp_col3 "See Library count column description")|13|
|4|[Condition count](#exp_col4 "See Condition count column description")|6|
|5|[Organ-stage count](#exp_col5 "See Organ-stage count column description")|3|
|6|[Organ count](#exp_col6 "See Organ count column description")|3|
|7|[Stage count](#exp_col7 "See Stage count column description")|1|
|8|[Sex count](#exp_col8 "See Sex count column description")|2|
|9|[Strain count](#exp_col9 "See Strain count column description")|3|
|10|[Data source](#exp_col10 "See Data source column description")|GEO|
|11|[Data source URL](#exp_col11 "See Data source URL column description")|https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE44612|
|12|[Bgee normalized data URL](#exp_col12 "See Bgee normalized data URL column description")|ftp://ftp.bgee.org/bgee_v15_0/download/processed_expr_values/rna_seq/Drosophila_simulans/Drosophila_simulans_RNA-Seq_read_counts_TPM_FPKM_GSE44612.tsv.gz|
|13|[Experiment description](#exp_col13 "See Experiment description column description")||

Example of rows for a single species in experiment download file:

|Experiment ID|Experiment name|Library count|Condition count|Organ-stage count|Organ count|Stage count|Sex count|Strain count|Data source|Data source URL|Bgee normalized data URL|Experiment description|
|--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |------------------- |
GSE44612|Comparative Validation of the D. melanogaster Encyclopedia of DNA Elements Transcript Models|13|6|3|3|1|2|3|GEO|https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE44612|ftp://ftp.bgee.org/bgee_v15_0/download/processed_expr_values/rna_seq/Drosophila_simulans/Drosophila_simulans_RNA-Seq_read_counts_TPM_FPKM_GSE44612.tsv.gz||
SRP099257|Pervasive epigenetic effects of Drosophila euchromatic transposable elements impact their evolution [RNA-seq]|2|1|1|1|1|1|1|GEO|https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=SRP099257|ftp://ftp.bgee.org/bgee_v15_0/download/processed_expr_values/rna_seq/Drosophila_simulans/Drosophila_simulans_RNA-Seq_read_counts_TPM_FPKM_SRP099257.tsv.gz|We study the relatively unexplored evolutionary consequences of the epigenetic effects of transpoable elements (TEs)....|

##### <a name="exp_col1"></a>Experiment ID (column 1)
The Experiment ID column provides the unique identifier per experiment.

##### <a name="exp_col2"></a>Experiment name (column 2)
The Experiment name column provides the title referent to the `Experiment ID` (column 1).

##### <a name="exp_col3"></a>Library count (column 3)
The Library count column provides the total number of the libraries associated to the `Experiment ID` (column 1).

##### <a name="exp_col4"></a>Condition count (column 4)
The Condition count column provides all the combinations of unique parameters in Bgee. This means, combinations between unique anatomical entities, developmental stages, sex and strains.

##### <a name="exp_col5"></a>Organ-stage count (column 5)
The Organ-stage count column provides the total number of unique combinations between anatomical entities Ids `Organ count` (column 6) and developmental stages `Stage count` (column 7) in the target `Experiment ID` (column 1).

##### <a name="exp_col6"></a>Organ count (column 6)
The Organ count column provides the total number of anatomical entities ids in the target `Experiment ID` (column 1).

##### <a name="exp_col7"></a>Stage count (column 7)
The Stage count column provides the total number of developmental stages in the target `Experiment ID` (column 1).

##### <a name="exp_col8"></a>Sex count (column 8)
The Sex count column provides the total number of sexes in the target `Experiment ID` (column 1).

##### <a name="exp_col9"></a>Strain count (column 9)
The Strain count column provides the total number of genetic variants or sub-types in the target `Experiment ID` (column 1).

##### <a name="exp_col10"></a>Data source (column 10)
Data repository from where the raw files that belong to the `Experiment ID` (column 1) were extracted.

##### <a name="exp_col11"></a>Data source URL (column 11)
URL pathway to the data repository where is located the `Experiment ID` (column 1).

##### <a name="exp_col12"></a>Bgee normalized data URL (column 12)
URL pathway where is located the processed data for the correspondent `Experiment ID` (column 1) in Bgee.

##### <a name="exp_col13"></a>Experiment description (column 13)
Description provided by the authors of the `Experiment ID` (column 1).


Processed expression values download files
-----------------------------------------------------------------

The processed expression values download files can be retrieved per experiment for a specific species, accessed through [FTP](/ftp/current/download/processed_expr_values/rna_seq/), or through the [download page](/download/processed-expression-values "Bgee Processed expression values download page") by selecting the species of interest and then by clicking in the button `Download read counts, TPM, and FPKMs`. By using the web-page all the processed data related to the species are downloaded, this means all the experiments are automatically downloaded. In the folder directory all the files (if more than 1 experiment) are organized by experiment identifier and each processed expression values experiment file include all processed data of all libraries that belong to the corresponding target experiment.

Format description of processed expression values download file per experiment identifier.

|Column|Content|Example|
|---|---|:---:|
|1|[Experiment ID](#procVal_col1 "See Experiment ID column description")|SRP099257|
|2|[Library ID](#procVal_col2 "See Library ID column description")|SRX2548614|
|3|[Library type](#procVal_col3 "See Library type column description")|paired|
|4|[Gene ID](#procVal_col4 "See Gene ID column description")|FBgn0012823|
|5|[Anatomical entity ID](#procVal_col5 "See Anatomical entity ID column description")|UBERON:0000922|
|6|[Anatomical entity name](#procVal_col6 "See Anatomical entity name column description")|embryo|
|7|[Stage ID](#procVal_col7 "See Stage ID column description")|UBERON:0000068|
|8|[Stage name](#procVal_col8 "See Stage name column description")|embryo stage|
|9|[Sex](#procVal_col9 "See Sex column description")|NA|
|10|[Strain](#procVal_col10 "See Strain column description")|W501|
|11|[Read count](#procVal_col11 "See Read count column description")|4|
|12|[TPM](#procVal_col12 "See TPM column description")|0.178537|
|13|[FPKM](#procVal_col13 "See FPKM column description")|0.159188|
|14|[Rank](#procVal_col14 "See Rank column description")|10528|
|15|[Detection flag](#procVal_col15 "See Detection flag column description")|absent|
|16|[pValue](#procVal_col16 "See pValue column description")|0.13514812|
|17|[State in Bgee](#procVal_col17 "See State in Bgee column description")|Part of a call|


Example of rows of processed expression values download file. Experiment SRP099257 from *Drosophila simulans*.

|Experiment ID|Library ID|Library type|Gene ID|Anatomical entity ID|Anatomical entity name|Stage ID|Stage name|Sex|Strain|Read count|TPM|FPKM|Rank|Detection flag|pValue|State in Bgee|
|---- |---- |---- |---- |---- |---- |---- |---- |---- |---- |---- |---- |---- |---- |---- |---- |---- |
SRP099257|SRX2548614|paired|FBgn0012820|UBERON:0000922|embryo|UBERON:0000068|embryo stage|NA|W501|0|0|0|13263|absent|1|Part of a call|
SRP099257|SRX2548614|paired|FBgn0012821|UBERON:0000922|embryo|UBERON:0000068|embryo stage|NA|W501|0|0|0|13263|absent|1|Part of a call|
SRP099257|SRX2548614|paired|FBgn0012823|UBERON:0000922|embryo|UBERON:0000068|embryo stage|NA|W501|4|0.178537|0.159188|10528|absent|0.13514812|Part of a call|
SRP099257|SRX2548614|paired|FBgn0012824|UBERON:0000922|embryo|UBERON:0000068|embryo stage|NA|W501|274.911|16.049365|14.310003|5174|present|1.81226E-05|Part of a call|

##### <a name="procVal_col1"></a>Experiment ID (column 1)
The Experiment ID column provides the unique identifier per experiment.

##### <a name="procVal_col2"></a>Library ID (column 2)
The Library ID column provides the unique identifier per sample that belongs to an `Experiment ID` (column 1).

##### <a name="procVal_col3"></a>Library type (column 3)
The Library type column consists in the strandedness of the library. This can be single or paired-end.

##### <a name="procVal_col4"></a>Gene ID (column 4)
The Gene ID column provides the unique identifier of genes from Ensembl.

##### <a name="procVal_col5"></a>Anatomical entity ID (column 5)
The Anatomical entity ID column provides the unique identifier of the anatomical entity, from the Uberon ontology.

##### <a name="procVal_col6"></a>Anatomical entity name (column 6)
The Anatomical entity name column provides the name of the anatomical entity defined by `Anatomical entity ID` (column 5).

##### <a name="procVal_col7"></a>Stage ID (column 7)
The Stage ID column provides the unique identifier of the developmental stage, from the Uberon ontology.

##### <a name="procVal_col8"></a>Stage name (column 8)
The Stage name column provides the name of the developmental stage defined by `Stage ID` (column 7).

##### <a name="procVal_col9"></a>Sex (column 9)
The Sex column provides the sexes information.

##### <a name="procVal_col10"></a>Strain (column 10)
The Strain column provides the information about the genetic variant or subtype of an organism.

##### <a name="procVal_col11"></a>Read count (column 11)
The Read count column provides the total number of reads of `Gene ID` (column 4) from a target `Library ID` (column 2) that will be mapped to the transcriptome.

##### <a name="procVal_col12"></a>TPM (column 12)
The TPM column provides a normalized quantification measure for sequencing depth and gene length of `Gene ID` (column 4) from a specific `Library ID` (column 2).

##### <a name="procVal_col13"></a>FPKM (column 13)
The FPKM column provides a normalized quantification measure for sequencing depth and gene length of `Gene ID` (column 4) from a specific `Library ID` (column 2).

##### <a name="procVal_col14"></a>Rank (column 14)
The Rank column provides the rank of a `Gene ID` (column 4) in a condition for a species. It is used to compute expression ranks and expression scores.

##### <a name="procVal_col15"></a>Detection flag (column 15)
The Detection flag column provides an informative classification of a `Gene ID` (column 4) being classified as present or absent.
The flag present means that the gene is actively expressed and absent means that the gene is not actively expressed.
The genes are classified as present or absent based on `pValue` (column 16) cutoff.

##### <a name="procVal_col16"></a>pValue (column 16)
The p-value is a quantitative metric to detect if `Gene ID` (column 4) is actively expressed in any standalone RNA-Seq `Library ID` (column 2).

For each individual `Library ID` (column 2) we map reads both to transcripts and to the reference intergenic regions, and compute `TPM` (column 12) per `Gene ID` (column 4) (summing over transcripts) and per intergenic region. Then for each `Gene ID` (column 4) in the `Library ID` (column 2), we compute a Z-score in terms of standard deviations from the mean of reference intergenic regions:

$ZScore_{Gene ID (column 4)} = \frac{(log2(TPM (column 12)_{Gene ID (column 4)}) - mean(log2(TPM_{RefIntergenic})))}{sd(log2(TPM_{RefIntergenic}))}$

Then for `Gene ID` (column 4) in the `Library ID` (column 2) we calculate a p-value based on a null hypothesis of expression at a similar level to reference intergenic, estimated as a Normal distribution.

The library-specific TPM limit to call genes expressed is the minimum value of TPM where $p-value ≤ \alpha$.
In the download files we used $\alpha = 0.05$.

##### <a name="procVal_col17"></a>State in Bgee (column 17)
The State in Bgee column provides the information about the usage of `Gene ID` (column 4) to make expression calls.
Three different labels can be retrieved in this column:

1) Part of a call --> This means the information from the `Gene ID` (column 4) was used to make an expression informative call.
1) Result excluded, reason: pre-filtering --> Pre-filtering of genes never observed as present in any `Library ID` (column 2). No calls will be generated for those `Gene ID` (column 4).
2) Result excluded, reason: absent call not reliable --> protocol used to generate the `Library ID` (column 2) does not allow to consider `Gene ID` (column 4) absent for this gene biotype.

The biotypes excluded of absent calls are:


RNASeqProtocol|biotypes_excluded_for_absent_calls|
|---- |---- |
polyA|3prime_overlapping_ncRNA,antisense,antisense_RNA,bidirectional_promoter_lncRNA,lincRNA,lncRNA,macro_lncRNA,miRNA,misc_RNA,Mt_tRNA,ncRNA,other,piRNA,pre_miRNA,processed_transcript,ribozyme,TEC,rRNA,rRNA_pseudogene,Mt_rRNA,snoRNA,snRNA,sRNA,sense_intronic,sense_overlapping,translated_processed_pseudogene,translated_unprocessed_pseudogene,tRNA,Y_RNA,scaRNA,scRNA,vault_RNA
lncRNA|IG_C_gene,IG_C_pseudogene,IG_D_gene,IG_D_pseudogene,IG_J_gene,IG_J_pseudogene,IG_LV_gene,IG_pseudogene,IG_V_gene,IG_V_pseudogene,miRNA,misc_RNA,Mt_rRNA,Mt_tRNA,ncRNA,other,piRNA,polymorphic_pseudogene,pre_miRNA,processed_pseudogene,protein_coding,pseudogene,ribozyme,rRNA,rRNA_pseudogene,scaRNA,scRNA,snoRNA,snRNA,sRNA,TEC,transcribed_processed_pseudogene,transcribed_unitary_pseudogene,transcribed_unprocessed_pseudogene,translated_processed_pseudogene,translated_unprocessed_pseudogene,tRNA,TR_C_gene,TR_D_gene,TR_J_gene,TR_J_pseudogene,TR_V_gene,TR_V_pseudogene,unitary_pseudogene,unprocessed_pseudogene,vault_RNA,Y_RNA|
miRNA|3prime_overlapping_ncRNA,antisense,antisense_RNA,bidirectional_promoter_lncRNA,IG_C_gene,IG_C_pseudogene,IG_D_gene,IG_D_pseudogene,IG_J_gene,IG_J_pseudogene,IG_LV_gene,IG_pseudogene,IG_V_gene,IG_V_pseudogene,lincRNA,lncRNA,macro_lncRNA,misc_RNA,Mt_rRNA,Mt_tRNA,ncRNA,other,piRNA,polymorphic_pseudogene,processed_pseudogene,processed_transcript,protein_coding,pseudogene,ribozyme,rRNA,rRNA_pseudogene,scaRNA,scRNA,sense_intronic,sense_overlapping,snoRNA,snRNA,sRNA,TEC,transcribed_processed_pseudogene,transcribed_unitary_pseudogene,transcribed_unprocessed_pseudogene,translated_processed_pseudogene,translated_unprocessed_pseudogene,tRNA,TR_C_gene,TR_D_gene,TR_J_gene,TR_J_pseudogene,TR_V_gene,TR_V_pseudogene,unitary_pseudogene,unprocessed_pseudogene,vault_RNA,Y_RNA|
circRNA|3prime_overlapping_ncRNA,antisense,antisense_RNA,bidirectional_promoter_lncRNA,IG_C_gene,IG_C_pseudogene,IG_D_gene,IG_D_pseudogene,IG_J_gene,IG_J_pseudogene,IG_LV_gene,IG_pseudogene,IG_V_gene,IG_V_pseudogene,lincRNA,lncRNA,macro_lncRNA,miRNA,misc_RNA,Mt_rRNA,Mt_tRNA,ncRNA,other,piRNA,polymorphic_pseudogene,pre_miRNA,processed_pseudogene,processed_transcript,protein_coding,pseudogene,ribozyme,rRNA,rRNA_pseudogene,scaRNA,scRNA,sense_intronic,sense_overlapping,snoRNA,snRNA,sRNA,TEC,transcribed_processed_pseudogene,transcribed_unitary_pseudogene,transcribed_unprocessed_pseudogene,translated_processed_pseudogene,translated_unprocessed_pseudogene,tRNA,TR_C_gene,TR_D_gene,TR_J_gene,TR_J_pseudogene,TR_V_gene,TR_V_pseudogene,unitary_pseudogene,unprocessed_pseudogene,vault_RNA,Y_RNA|
ribo-minus|Mt_rRNA,rRNA,rRNA_pseudogene|
