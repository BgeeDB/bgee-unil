const topAnat = {
  runJob: () => {
    /*
     * https://bgee.org/?
     * page=top_anat&
     * action=submit_job&
     * ajax=1&

     *
     * display_type=json
     *
     * data_type=RNA_SEQ
     * &data_type=AFFYMETRIX&
     * data_type=IN_SITU&
     * data_type=EST&
     *
     * expr_type=EXPRESSED&
     * fg_list=ENSG00000100888%0AENSG00000136531%0AENSG00000197283%0AFAKE_GENE_ID%0AENSMUSG00000023010&
     * bg_list=ENSG00000100888%0AENSG00000136531%0AENSG00000197283%0AFAKE_GENE_ID%0AENSMUSG00000023010%0AENSG00000101126%0AENSG00000114861%0AENSG00000143442&

     *
     * stage_id=&
     *
     * data_qual=all& // or gold
     *
     * decorr_type=classic&
     *
     * nb_node=20&
     * node_size=3&
     * p_value_thr=1&
     * fdr_thr=0.2&
     *
     * submitted=true
     * &email=&
     * job_creation_date=22.09.2021,+17:23:27&
     * job_title=&
     */
    const body = {
      page: 'top_anat',
      action: 'submit_job',
    };
  },
};
export default topAnat;
