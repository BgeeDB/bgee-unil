import React from 'react';
import Bulma from '../Bulma';
import useToggle from '../../hooks/useToggle';

const TopAnatHistoryModal = () => {
  const [isShown, { setTrue: openModal, setFalse: closeModal }] =
    useToggle(false);

  return (
    <>
      <button className="button is-bgee-link is-outlined mr-2" type="button">
        <Bulma.IonIcon name="list-outline" />
      </button>
    </>
  );
};

export default TopAnatHistoryModal;
