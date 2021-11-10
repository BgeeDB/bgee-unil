/* eslint-disable react/destructuring-assignment,jsx-a11y/interactive-supports-focus,react/no-array-index-key,react/button-has-type,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions,jsx-a11y/label-has-associated-control */
import React from 'react';

const expressionPageHelper = {
  autocompleteSpecies: (list, kwList, search) =>
    list &&
    kwList &&
    list
      ?.map((s) => ({
        info: s,
        word: kwList?.[s.id]?.find((kw) => new RegExp(search, 'gi').test(kw)),
      }))
      ?.sort((a, b) => a?.word?.localeCompare(b.word)),
  autocompleteSpeciesRender: (setSearch, history) => (s, closeAutoComplete) =>
    (
      <div
        key={s.info.id}
        role="button"
        onClick={() => {
          setSearch(s.word);
          history.replace(`?id=${s.info.id}`);
          setTimeout(() => {
            closeAutoComplete();
          }, 100);
        }}
      >
        {s.word}
      </div>
    ),
};

export default expressionPageHelper;
