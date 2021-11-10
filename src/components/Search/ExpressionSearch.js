import React from 'react';
import i18n from '../../i18n';

const ExpressionSearch = ({ search, setSearch, elements, onRender }) => {
  const [showAuto, setShowAuto] = React.useState(false);
  const [prevSearch, setPrevSearch] = React.useState('');

  React.useEffect(() => {
    if (prevSearch !== search) {
      if (search !== '' && elements.length > 0) setShowAuto(true);
      setPrevSearch(search);
    }
  }, [search, elements, prevSearch]);
  React.useEffect(() => {
    const clickOutside = () => {
      setShowAuto(false);
    };
    document.getElementById('root').addEventListener('click', clickOutside);
    return () => {
      document
        .getElementById('root')
        .removeEventListener('click', clickOutside);
    };
  }, []);

  return (
    <div className="control">
      <input
        className="input"
        type="text"
        name="search-species"
        placeholder={i18n.t('download.processed-exp-values.search-placeholder')}
        value={search}
        onKeyDown={(e) => {
          if (e.key === 'Enter') setShowAuto(false);
        }}
        onChange={(e) => setSearch(e.target.value)}
      />
      {showAuto && (
        <div className="autocomplete-wrapper">
          {elements.map((s) =>
            onRender(s, () => {
              setShowAuto(false);
            })
          )}
        </div>
      )}
    </div>
  );
};

export default ExpressionSearch;
