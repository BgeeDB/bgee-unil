/* eslint-disable no-nested-ternary,jsx-a11y/label-has-associated-control,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions, no-case-declarations, react/no-array-index-key */
import React from 'react';
import Bulma from '../Bulma';
import i18n from '../../i18n';
import LinkExternal from '../LinkExternal';
import GeneExpandableList from './GeneExpandableList';

const GeneXRefs = ({ isLoading, data }) => (
  <div id="cross-references">
    <Bulma.Title size={5} className="gradient-underline">
      {i18n.t('search.gene.cross-references')}
    </Bulma.Title>
    <div className="static-section near-columns">
      {isLoading ? (
        <progress
          className="progress is-small"
          max="100"
          style={{ animationDuration: '4s' }}
        >
          80%
        </progress>
      ) : (
        data?.gene?.xRefs.map((xref) => (
          <Bulma.Columns key={xref.source.name} className="my-0">
            <Bulma.C size={3}>
              <p className="has-text-weight-semibold">{xref.source.name}</p>
            </Bulma.C>
            <Bulma.C size={9}>
              <GeneExpandableList
                items={xref.xRefs}
                renderElement={(ref, key, elements) => (
                  <span key={ref.xRefId}>
                    <LinkExternal to={ref.xRefURL}>{ref.xRefId}</LinkExternal>
                    {ref.xRefName && <>{` (${ref.xRefName})`}</>}
                    {key !== elements.length - 1 ? (
                      <span className="mr-1">,</span>
                    ) : (
                      ''
                    )}
                  </span>
                )}
              />
            </Bulma.C>
          </Bulma.Columns>
        ))
      )}
    </div>
  </div>
);
export default GeneXRefs;
