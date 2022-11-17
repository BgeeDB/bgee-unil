/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import './tagInput.scss';

const TagInput = () => {
  const [tags, setTags] = useState([]);

  const handleKeyDown = (e) => {
    if (e.key !== 'Enter') return;
    // eslint-disable-next-line prefer-destructuring
    const value = e.target.value;
    if (!value.trim()) return;
    setTags([...tags, value]);
    e.target.value = '';
  };

  const removeTag = (index) => {
    setTags(tags.filter((el, i) => i !== index));
  };

  return (
    <div className="div-container">
      <div className="tag-input-container">
        <input
          onKeyDown={handleKeyDown}
          type="text"
          className="tag-input"
          placeholder="Experiment or assay ID"
        />
      </div>
      <div className="conteneur-result">
        {tags.map((tag, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div className="tag-item" key={index}>
            <span className="text">{tag}</span>
            <span className="close" onClick={() => removeTag(index)}>
              &times;
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagInput;
