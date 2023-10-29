import React from 'react';
import styles from '../styles/OptionsContainer.module.css';
import OptionSelector from './OptionSelector';
import {
  getCushionList,
  getLegList,
  getFootrestList,
  getPlacematList,
  getFloormatList
} from '../options';
import ThemeSelect from './ThemeSelect';

import Title from './Title';

export default function OptionsContainer({ options, setOptions, shopifyData }) {
  function updateSelection(property, value) {
    const newOptions = { ...options, [property]: value };
    setOptions(newOptions);
  }

  const cushionList = getCushionList(shopifyData.cushions);
  const legList = getLegList(shopifyData.legwraps);
  const footrestList = getFootrestList(shopifyData.footrests);
  const placematList = getPlacematList(shopifyData.placemats);
  const floormatList = getFloormatList(shopifyData.floormats);

  const cushion_price = "+ $" + shopifyData.cushions[0].price/100;
  const placemat_price = "+ $" + shopifyData.placemats[0].price/100;
  const legs_price = "+ $" + shopifyData.legwraps[0].price/100;
  const footrest_price = "+ $" + shopifyData.footrests[0].price/100;
  const floormat_price = "+ $" + shopifyData.floormats[0].price/100;

  return (
    <div className={styles.container}>
      <Title></Title>
      <OptionSelector
        title="select your cover"
        options={cushionList}
        selectedOption={options.cushion}
        changeSelection={updateSelection}
        property="cushion"
        search={true}
        thumbStyle="cropped"
        displayPrice={cushion_price}
      ></OptionSelector>
      <OptionSelector
        title="select your placemat"
        options={placematList}
        selectedOption={options.placemat}
        changeSelection={updateSelection}
        property="placemat"
        thumbStyle="fill"
        displayPrice={placemat_price}
      ></OptionSelector>

      <OptionSelector
        title="select your leg wraps"
        options={legList}
        selectedOption={options.legs}
        changeSelection={updateSelection}
        property="legs"
        thumbStyle="cropped-local"
        displayPrice={legs_price}
      ></OptionSelector>

      <OptionSelector
        title="select your footrest"
        options={footrestList}
        selectedOption={options.footrest}
        changeSelection={updateSelection}
        property="footrest"
        displayPrice={footrest_price}
      ></OptionSelector>

      <OptionSelector
        title="select your floormat"
        options={floormatList}
        selectedOption={options.floormat}
        changeSelection={updateSelection}
        property="floormat"
        thumbStyle="fill"
        displayPrice={floormat_price}
      ></OptionSelector>
    </div>
  );
}
