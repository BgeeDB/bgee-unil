/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import {Link, useParams} from "react-router-dom";
import { Helmet } from 'react-helmet';
import Bulma from '../../components/Bulma';
import api from '../../api';
import Table from "../../components/Table";
import {MEDIA_QUERIES} from "../../helpers/constants/mediaQueries";
import PATHS from "../../routes/paths";

const SpeciesGeneList = () => {
    let speciesDisplay = '';
    let speciesName = '';
    
    const [data, setData] = useState([]);
    const { speciesId } = useParams();
    
    const onFilter = React.useCallback(
        (searchReg) => (element) => {
            const regExp = new RegExp(searchReg, 'i'); /* Needs i = ignoreCase to be able to search with human for Human and human strings */
            return (
                Boolean(regExp.test(element.id)) ||
                Boolean(regExp.test(element.description)) ||
                Boolean(regExp.test(element.name)) ||
                Boolean(regExp.test(element.biotype))
            );
        },
        []
    );
    
    const customHeader = (searchElement, pageSizeElement) => (
        <Bulma.Columns vCentered>
            <Bulma.C size={6}>
                <div className="field has-addons">{searchElement}</div>
            </Bulma.C>
            <Bulma.C size={6}>
                <div>{pageSizeElement}</div>
            </Bulma.C>
        </Bulma.Columns>
    );
    
    const onRenderCell = () => ({ cell, key, keyRow }, defaultRender) => {
        switch (key) {
            case 'id':
            case 'name':
                return (
                    <Link
                        key={`${key}-${keyRow}`}
                        className="internal-link"
                        to={PATHS.SEARCH.GENE_ITEM_BY_SPECIES
                            .replace(':geneId', cell.id)
                            .replace(':speciesId', cell.geneMappedToSameGeneIdCount === 1 ? '' : cell.speciesId)}
                    >
                        {cell[key]}
                    </Link>
                );
            case 'biotype':
            case 'description':
            default:
                return defaultRender(cell[key]);
        }
    };

    const objMapping = React.useCallback(
        (speId) => (element) => ({
            id: element.geneId,
            name: element.name,
            description: element.description,
            biotype: element.geneBioType.name,
            geneMappedToSameGeneIdCount: element.geneMappedToSameGeneIdCount,
            specId: speId,
        }),
        []
    );

    React.useEffect(() => {
        api.search.species.geneList(speciesId).then((resp) => {
            if (resp.code === 200) {
                setData(resp.data);
            } else {
                setData([]);
            }
        });
    }, []);

    if (data && data.species) {
        speciesName = `${data.species.genus} ${data.species.speciesName}`;
        speciesDisplay = `${speciesName}${data.species.name ? ` (${data.species.name})` : ''}`;
    }

    const meta = React.useMemo(
        () => ({
            title: `${speciesDisplay} gene list`,
            description: `List of genes of ${speciesName} with expression data available in Bgee`,
            keywords: `${speciesName} genes, gene expression in ${speciesName}`,
        }),
        [speciesName, speciesDisplay]
    );
    // zTODO add loading wheel

    return !data ? null :(
        <>
            <Helmet>
                <title>{meta.title} gene list</title>
                <meta name="description" content={meta.description}/>
                <meta name="keywords" content={meta.keywords}/>
            </Helmet>

            <div className="content has-text-centered">
                <Bulma.Title size={3} className="m-0">{`Gene list in ${speciesDisplay}`}
                </Bulma.Title>

            </div>
            <div className="content">
                <Table
                    sortable
                    classNamesTable="is-striped"
                    columns={[
                        { text: 'Gene ID', key: 'id', hide: MEDIA_QUERIES.MOBILE_P },
                        { text: 'Name', key: 'name' },
                        { text: 'Description', key: 'description', hide: MEDIA_QUERIES.TABLET },
                        { text: 'Biotype', key: 'biotype', hide: MEDIA_QUERIES.TABLET },
                    ]}
                    // onSortCustom={customGeneListSorter}
                    data={data?.genes}
                    onFilter={onFilter}
                    customHeader={customHeader}
                    onRenderCell={onRenderCell()}
                    mappingObj={objMapping(data?.species?.id)}
                />
            </div>
        </>
    );
};

export default SpeciesGeneList;
