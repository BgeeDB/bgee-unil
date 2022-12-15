/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

const Sex = ({ speciesSexes, selectedSexes, toggleSex }) => (
  <>
    <label className="labelWithHelpIcon">
      <span>Sex</span>
    </label>
    <div className="sex-container">
      {speciesSexes.map((sex) => {
        const isChecked = selectedSexes.indexOf(sex.name) !== -1;
        return (
          <div id={sex.name} key={sex.name} className="sex-input-name">
            <input
              onChange={() => toggleSex(sex.name)}
              type="checkbox"
              checked={isChecked ? 'checked' : ''}
            />
            <label
              onClick={() => toggleSex(sex.name)}
              htmlFor={sex.name}
              className="sex-name"
            >
              {sex.name}
            </label>
          </div>
        );
      })}
    </div>
  </>
);

export default Sex;
