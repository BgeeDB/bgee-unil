Expression call download file documentation
===========================================

This documentation describes both the format of single species presence/absence of expression files and how values of each columns are created. The files can be found in the Bgee [download page](/download/gene-expression-calls "Bgee expression data page") for each species.

Bgee provides calls of presence/absence of expression. Each call corresponds to a unique combination of a gene, an anatomical entity, and a life stage, with reported presence or absence of expression. Life stages describe development and aging. Only "normal" expression is considered in Bgee (i.e., no treatment, no disease, no gene knock-out, etc.). Bgee collects data from different types, from different studies, in different organisms, and provides a summary from all these data as unique calls `gene - anatomical entity - developmental stage`, with confidence information, notably taking into account potential conflicts.

Calls of presence/absence of expression are very similar to the data that can be reported using _in situ_ hybridization methods; Bgee applies dedicated statistical analyses to generate such calls from EST, Affymetrix, and RNA-Seq data, with confidence information, and also collects _in situ_ hybridization calls from model organism databases. This offers the possibility to aggregate and compare these calls of presence/absence of expression between different experiments, different data types, and different species, and to benefit from both the high anatomy coverage provided by low-throughput methods, and the high genomic coverage provided by high-throughput methods.

After presence/absence calls are generated from the raw data, they are propagated using anatomical and life stage ontologies:

*   calls of expression are propagated to parent anatomical entities and parent developmental stages. For instance, if gene A is expressed in midbrain at young adult stage, it will also be considered as expressed in brain at adult stage.
*   calls of absence of expression are propagated to child anatomical entities (and not to child developmental stages). For instance, if gene A is reported as not expressed in the brain at young adult stage, it will also be considered as not expressed in the midbrain at young adult stage. This is only permitted when it does not generate any contradiction with expression calls from the same data type (for instance, no contradiction permitted of reported absence of expression by RNA-Seq, with report of expression by RNA-Seq for the same gene, in the same anatomical entity and developmental stage, or any child anatomical entity or child developmental stage).

Call propagation allows a complete integration of the data, even if provided at different anatomical or developmental levels. For instance: if gene A is reported to be expressed in the midbrain dura mater at young adult stage; gene B is reported to be expressed in the midbrain pia mater at late adult stage; and gene C has an absence of expression reported in the brain at adult stage; it is then possible to retrieve that, in the midbrain at adult stage, gene A and B are both expressed, while gene C is not, thanks to call propagation.

It is possible to select two different combinations of `condition parameters`:

*   anatomical entities only (by default) files contain one expression call for each unique pair of gene and anatomical entity. If more than one developmental stage maps this unique pair, the resulting expression call corresponds to summarized information coming from all developmental stages.
*   all conditions parameters files contain one expression call for each unique gene, anatomical entity, developmental stage, sex and strain.

Presence/absence calls are then filtered and presented differently depending on whether a `simple file`, or an `advanced file` is used. Notably: `simple files` aim at providing summarized information over all data types, and only in anatomical entities and developmental stages actually used in experimental data; `advanced files` aim at reporting all information, allowing for instance to retrieve the contribution of each data type to a call, in all possible anatomical entities and developmental stages.

In simple files, propagated presence/absence expression calls are provided, but only calls in conditions of anatomical entity/developmental stage actually used in experimental data are displayed (no calls generated from propagation only).

Simple and advanced files contain the same expression calls (same number of lines) but advanced files contain more information on each call (more columns).

Advanced file information:

*   details of expression status generated from each data type are provided (present, absent, no data).
*   details of number of present high quality and present low quality calls from each data type.
*   details of number of absent high quality and absent low quality calls from _in situ_, Affymetrix, and RNA-Seq.
*   details of data type for which calls are observed. Each call is observed in at least one data type

|Column|Content|In anatomical simple files|In anatomical advanced files|In all conditions simple files|In all conditions advanced files|Example|
|--- |--- |--- |--- |--- |--- |--- |
|1|[Gene ID](#gene-id-column-1 "See Gene ID column description")|Yes|Yes|Yes|Yes|FBgn0005427|
|2|[Gene name](#gene-name-column-2 "See Gene name column description")|Yes|Yes|Yes|Yes|ewg|
|3|[Anatomical entity ID](#anatomical-entity-id-column-3 "See Anatomical entity ID column description")|Yes|Yes|Yes|Yes|UBERON:6001060|
|4|[Anatomical entity name](#anatomical-entity-name-column-4 "See Anatomical entity name column description")|Yes|Yes|Yes|Yes|embryonic brain|
|5|[Developmental stage ID](#developmental-stage-id-column-5 "See Developmental stage ID column description")|No|No|Yes|Yes|FBdv:00005334|
|6|[Developmental stage name](#developmental-stage-name-column-6 "See Developmental stage name column description")|No|No|Yes|Yes|embryonic stage 16 (fruit fly)|
|7|[Sex](#sex-column-7 "See Sex column description")|No|No|Yes|Yes|any|
|8|[Strain](#strain-column-8 "See Strain column description")|No|No|Yes|Yes|wild-type|
|9|[Expression](#expression-column-9 "See Expression column description")|Yes|Yes|Yes|Yes|present|
|10|[Call quality](#call-quality-column-10 "See Call quality column description")|Yes|Yes|Yes|Yes|gold quality|
|11|[FDR](#fdr-column-11 "See FDR column description")|Yes|Yes|Yes|Yes|0.0004|
|12|[Expression score](#expression-score-column-12 "See Expression score column description")|Yes|Yes|Yes|Yes|49.99|
|13|[Expression rank](#expression-rank-column-13 "See Expression rank column description")|Yes|Yes|Yes|Yes|8.32e3|
|14|[Including observed data](#including-observed-data-column-14 "See Including observed data column description")|No|Yes|No|Yes|yes|
|15|[Self observation count](#self-observation-count-column-15 "See Self observation count column description")|No|Yes|No|Yes|1|
|16|[Descendant observation count](#descendant-observation-count-column-16 "See Descendant observation count column description")|No|Yes|No|Yes|0|
|17|[Affymetrix expression](#affymetrix-expression-column-17 "See Affymetrix expression column description")|No|Yes|No|Yes|no data|
|18|[Affymetrix call quality](#affymetrix-call-quality-column-18 "See Affymetrix call quality column description")|No|Yes|No|Yes|NA|
|19|[Affymetrix FDR](#affymetrix-fdr-column-19 "See Affymetrix FDR column description")|No|Yes|No|Yes|NA|
|20|[Affymetrix expression score](#affymetrix-expression-score-column-20 "See Affymetrix expression score column description")|No|Yes|No|Yes|NA|
|21|[Affymetrix expression rank](#affymetrix-expression-rank-column-17 "See Affymetrix expression rank column description")|No|Yes|No|Yes|NA|
|22|[Affymetrix weight for expression rank and score](#affymetrix-weight-column-17 "See Affymetrix weight for expression rank and score column description")|No|Yes|No|Yes|NA|
|23|[Including Affymetrix observed data](#including-affymetrix-observed-data-column-17 "See Including Affymetrix observed data column description")|No|Yes|No|Yes|no|
|24|[Self observation count Affymetrix](#self-observation-count-affymetrix-column-17 "See Self observation count Affymetrix column description")|No|Yes|No|Yes|0|
|25|[Descendant observation count Affymetrix](#descendant-observation-count-affymetrix-column-17 "See Descendant observation count Affymetrix column description")|No|Yes|No|Yes|0|
|26|[EST expression](#est-expression-column-26 "See EST expression column description")|No|Yes|No|Yes|no data|
|27|[EST call quality](#est-call-quality-column-27 "See EST call quality column description")|No|Yes|No|Yes|NA|
|28|[EST FDR](#est-fdr-column-28 "See EST FDR column description")|No|Yes|No|Yes|NA|
|29|[EST expression score](#est-expression-score-column-29 "See EST expression score column description")|No|Yes|No|Yes|NA|
|30|[EST expression rank](#est-expression-rank-column-30 "See EST expression rank column description")|No|Yes|No|Yes|NA|
|31|[EST weight for expression rank and score](#est-weight-column-31 "See EST weight for expression rank and score column description")|No|Yes|No|Yes|NA|
|32|[Including EST observed data](#including-est-observed-data-column-32 "See Including EST observed data column description")|No|Yes|No|Yes|no|
|33|[Self observation count EST](#self-observation-count-est-column-33 "See Self observation count EST column description")|No|Yes|No|Yes|0|
|34|[Descendant observation count EST](#descendant-observation-count-est-column-34 "See Descendant observation count EST column description")|No|Yes|No|Yes|0|
|35|[in situ hybridization expression](#in-situ-hybridization-expression-column-35 "See in situ hybridization expression column description")|No|Yes|No|Yes|present|
|36|[in situ hybridization call quality](#in-situ-hybridization-call-quality-column-36 "See in situ hybridization call quality column description")|No|Yes|No|Yes|gold quality|
|37|[in situ hybridization FDR](#in-situ-hybridization-fdr-column-37 "See in situ hybridization FDR column description")|No|Yes|No|Yes|0.0004|
|38|[in situ hybridization expression score](#in-situ-hybridization-expression-score-column-38 "See in situ hybridization expression score column description")|No|Yes|No|Yes|49.99|
|39|[in situ hybridization expression rank](#in-situ-hybridization-expression-rank-column-39 "See in situ hybridization expression rank column description")|No|Yes|No|Yes|8.32e3|
|40|[in situ hybridization weight for expression rank and score](#in-situ-hybridization-weight-column-40 "See in situ hybridization weight for expression rank and score column description")|No|Yes|No|Yes|5.00|
|41|[Including in situ hybridization observed data](#including-in-situ-hybridization-observed-data-column-41 "See Including in situ hybridization observed data column description")|No|Yes|No|Yes|yes|
|42|[Self observation count in situ hybridization](#self-observation-count-in-situ-hybridization-column-42 "See Self observation count in situ hybridization column description")|No|Yes|No|Yes|1|
|43|[Descendant observation count in situ hybridization](#descendant-observation-count-in-situ-hybridization-column-43 "See Descendant observation count in situ hybridization column description")|No|Yes|No|Yes|0|
|44|[RNA-Seq expression](#rna-seq-expression-column-44 "See RNA-Seq expression column description")|No|Yes|No|Yes|no data|
|45|[RNA-Seq call quality](#rna-seq-call-quality-column-45 "See RNA-Seq call quality column description")|No|Yes|No|Yes|NA|
|46|[RNA-Seq FDR](#rna-seq-fdr-column-46 "See RNA-Seq FDR column description")|No|Yes|No|Yes|NA|
|47|[RNA-Seq expression score](#rna-seq-expression-score-column-47 "See RNA-Seq expression score column description")|No|Yes|No|Yes|NA|
|48|[RNA-Seq expression rank](#rna-seq-expression-rank-column-48 "See RNA-Seq expression rank column description")|No|Yes|No|Yes|NA|
|49|[RNA-Seq weight for expression rank and score](#rna-seq-weight-column-49 "See RNA-Seq weight for expression rank and score column description")|No|Yes|No|Yes|NA|
|50|[Including RNA-Seq observed data](#including-rna-seq-observed-data-column-50 "See Including RNA-Seq observed data column description")|No|Yes|No|Yes|no|
|51|[Self observation count RNA-Seq](#self-observation-count-rna-seq-column-51 "See Self observation count RNA-Seq column description")|No|Yes|No|Yes|0|
|52|[Descendant observation count RNA-Seq](#descendant-observation-count-rna-seq-column-52 "See Descendant observation count RNA-Seq column description")|No|Yes|No|Yes|0|
|53|[full length single cell RNA-Seq expression](#full-length-single-cell-rna-seq-expression-column-53 "See full length single cell RNA-Seq expression column description")|No|Yes|No|Yes|no data|
|54|[full length single cell RNA-Seq call quality](#full-length-single-cell-rna-seq-call-quality-column-54 "See full length single cell RNA-Seq call quality column description")|No|Yes|No|Yes|NA|
|55|[full length single cell RNA-Seq FDR](#full-length-single-cell-rna-seq-fdr-column-55 "See full length single cell RNA-Seq FDR column description")|No|Yes|No|Yes|NA|
|56|[full length single cell RNA-Seq expression score](#full-length-single-cell-rna-seq-expression-score-column-56 "See full length single cell RNA-Seq expression score column description")|No|Yes|No|Yes|NA|
|57|[full length single cell RNA-Seq expression rank](#full-length-single-cell-rna-seq-expression-rank-column-57 "See full length single cell RNA-Seq expression rank column description")|No|Yes|No|Yes|NA|
|58|[full length single cell RNA-Seq weight for expression rank and score](#full-length-single-cell-rna-seq-weight-column-58 "See full length single cell RNA-Seq weight for expression rank and score column description")|No|Yes|No|Yes|NA|
|59|[Including full length single cell RNA-Seq observed data](#including-full-length-single-cell-rna-seq-observed-data-column-59 "See Including full length single cell RNA-Seq observed data column description")|No|Yes|No|Yes|no|
|60|[Self observation count full length single cell RNA-Seq](#self-observation-count-full-length-single-cell-rna-seq-column-60 "See Self observation count full length single cell RNA-Seq column description")|No|Yes|No|Yes|0|
|61|[Descendant observation count full length single cell RNA-Seq](#descendant-observation-count-full-length-single-cell-rna-seq-column-61 "See Descendant observation count full length single cell RNA-Seq column description")|No|Yes|No|Yes|0|


##### <a name="gene-id-column-1"></a>Gene ID (column 1)

Unique identifier of the gene

##### <a name="gene-name-column-2"></a>Gene name (column 2)

Name of the gene defined by `Gene ID` (column 1)

##### <a name="anatomical-entity-id-column-3"></a>Anatomical entity ID (column 3)

Unique identifier of the anatomical entity, from the Uberon ontology.

##### <a name="anatomical-entity-name-column-4"></a>Anatomical entity name (column 4)

Name of the anatomical entity defined by `Anatomical entity ID` (column 3)

##### <a name="developmental-stage-id-column-5"></a>Developmental stage ID (column 5)

Unique identifier of the developmental stage, from the Uberon ontology.

##### <a name="developmental-stage-name-column-6"></a>Developmental stage name (column 6)

Name of the developmental stage defined by `Developmental stage ID` (column 5)

##### <a name="sex-column-7"></a>Sex (column 7)

Sex of the sample used to generate the call

##### <a name="strain-column-8"></a>Strain (column 8)

Strain of the sample used to generate the call

##### <a name="expression-column-9"></a>Expression (column 9)

Call generated from all data types for the selected combination of condition parameters (anatomical or all conditions). Permitted values:

*   present: report of presence of expression, from Bgee statistical tests and/or from _in situ_ data sources.
*   absent: report of absence of expression, from Bgee statistical tests and/or from _in situ_ data sources.

In Bgee, calls of absence of expression are always discarded if there exists a contradicting call of expression, for the same gene, in the same anatomical entity and developmental stage, or in a child entity or child developmental stage.

##### <a name="call-quality-column-10"></a>Call quality (column 10)

Quality associated to the call. Permitted values:

*   high quality: presence or absence of expression reported as high quality from Bgee statistical tests and/or from _in situ_ data sources.
*   low quality: presence or absence of expression reported as low quality from Bgee statistical tests and/or from _in situ_ data sources.

From this quality a `summary quality` is calculated using all calls corresponding to the same gene and condition parameters coming from different experiments and/or data types.

Quality associated to the call in column `Expression` (column 9) is this `summary quality` and is calculated using following rules:

*   gold quality: 2 or more high quality calls.
*   silver quality: 1 high quality call or 2 low quality calls
*   bronze quality: 1 low quality call (for internal use only. Not present in this file).

##### <a name="fdr-column-11"></a>FDR (column 11)


##### <a name="expression-score-column-12"></a>Expression score (column 12)

Score of expression to the call. The score uses the minimum and maximum `Expression Rank` (column 13) of the species to normalize the expression to a value between 0 and 100. 

Low score means that the gene is lowly expressed in the condition.

##### <a name="expression-rank-column-13"></a>Expression rank (column 13)

Rank score associated to the call. Rank scores of expression calls are normalized across genes, conditions and species.

A low score means that the gene is highly expressed in the condition.

##### <a name="including-observed-data-column-14"></a>Including observed data (column 14)

Permitted value: `yes`

Only calls which were actually seen in experimental data, at least once, are in this file.

##### <a name="self-observation-count-column-15"></a>Self observation count (column 15)

Number of observation coming from experimental data for this combination of condition parameters (anatomical or all conditions)

##### <a name="descendant-observation-count-column-16"></a>Descendant observation count (column 16)

Number of observation coming from experimental data for combination of condition parameters (anatomical or all conditions) descendant of the current one.

##### <a name="affymetrix-expression-column-17"></a>Affymetrix expression (column 17)


##### <a name="affymetrix-call-quality-column-18"></a>Affymetrix call quality (column 18)


##### <a name="affymetrix-fdr-column-19"></a>Affymetrix FDR (column 19)


##### <a name="affymetrix-expression-score-column-20"></a>Affymetrix expression score (column 20)


##### <a name="affymetrix-expression-rank-column-17"></a>Affymetrix expression rank (column 21)


##### <a name="affymetrix-weight-column-17"></a>Affymetrix weight for expression rank and score (column 22)


##### <a name="including-affymetrix-observed-data-column-17"></a>Including Affymetrix observed data (column 23)


##### <a name="self-observation-count-affymetrix-column-17"></a>Self observation count Affymetrix (column 24)


##### <a name="descendant-observation-count-affymetrix-column-17"></a>Descendant observation count Affymetrix (column 25)


##### <a name="est-expression-column-26"></a>EST expression (column 26)


##### <a name="est-call-quality-column-27"></a>EST call quality (column 27)


##### <a name="est-fdr-column-28"></a>EST FDR (column 28)


##### <a name="est-expression-score-column-29"></a>EST expression score (column 29)


##### <a name="est-expression-rank-column-30"></a>EST expression rank (column 30)


##### <a name="est-weight-column-31"></a>EST weight for expression rank and score (column 31)


##### <a name="including-est-observed-data-column-32"></a>Including EST observed data (column 32)


##### <a name="self-observation-count-est-column-33"></a>Self observation count EST (column 33)


##### <a name="descendant-observation-count-est-column-34"></a>Descendant observation count EST (column 34)


##### <a name="in-situ-hybridization-expression-column-35"></a>in situ hybridization expression (column 35)


##### <a name="in-situ-hybridization-call-quality-column-36"></a>in situ hybridization call quality (column 36)


##### <a name="in-situ-hybridization-fdr-column-37"></a>in situ hybridization FDR (column 37)


##### <a name="in-situ-hybridization-expression-score-column-38"></a>in situ hybridization expression score (column 38)


##### <a name="in-situ-hybridization-expression-rank-column-39"></a>in situ hybridization expression rank (column 39)


##### <a name="in-situ-hybridization-weight-column-40"></a>in situ hybridization weight for expression rank and score (column 40)


##### <a name="including-in-situ-hybridization-observed-data-column-41"></a>Including in situ hybridization observed data (column 41)


##### <a name="self-observation-count-in-situ-hybridization-column-42"></a>Self observation count in situ hybridization (column 42)


##### <a name="descendant-observation-count-in-situ-hybridization-column-43"></a>Descendant observation count in situ hybridization (column 43)


##### <a name="rna-seq-expression-column-44"></a>RNA-Seq expression (column 44)


##### <a name="rna-seq-call-quality-column-45"></a>RNA-Seq call quality (column 45)


##### <a name="rna-seq-fdr-column-46"></a>RNA-Seq FDR (column 46)


##### <a name="rna-seq-expression-score-column-47"></a>RNA-Seq expression score (column 47)


##### <a name="rna-seq-expression-rank-column-48"></a>RNA-Seq expression rank (column 48)


##### <a name="rna-seq-weight-column-49"></a>RNA-Seq weight for expression rank and score (column 49)


##### <a name="including-rna-seq-observed-data-column-50"></a>Including RNA-Seq observed data (column 50)


##### <a name="self-observation-count-rna-seq-column-51"></a>Self observation count RNA-Seq (column 51)


##### <a name="descendant-observation-count-rna-seq-column-52"></a>Descendant observation count RNA-Seq (column 52)


##### <a name="full-length-single-cell-rna-seq-expression-column-53"></a>full length single cell RNA-Seq expression (column 53)


##### <a name="full-length-single-cell-rna-seq-call-quality-column-54"></a>full length single cell RNA-Seq call quality (column 54)


##### <a name="full-length-single-cell-rna-seq-fdr-column-55"></a>full length single cell RNA-Seq FDR (column 55)


##### <a name="full-length-single-cell-rna-seq-expression-score-column-56"></a>full length single cell RNA-Seq expression score (column 56)


##### <a name="full-length-single-cell-rna-seq-expression-rank-column-57"></a>full length single cell RNA-Seq expression rank (column 57)


##### <a name="full-length-single-cell-rna-seq-weight-column-58"></a>full length single cell RNA-Seq weight for expression rank and score (column 58)


##### <a name="including-full-length-single-cell-rna-seq-observed-data-column-59"></a>Including full length single cell RNA-Seq observed data (column 59)


##### <a name="self-observation-count-full-length-single-cell-rna-seq-column-60"></a>Self observation count full length single cell RNA-Seq (column 60)


##### <a name="descendant-observation-count-full-length-single-cell-rna-seq-column-61"></a>Descendant observation count full length single cell RNA-Seq (column 61)

