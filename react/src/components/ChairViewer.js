import React from 'react';
import styles from '../styles/ChairViewer.module.css';
import Footrest from './Footrest';
import Legs from './Legs';
import Floormat from './Floormat';
import Placemat from './Placemat';
import LegEnds from './LegEnds';

import ChairImage from '../images/chair.png';
import { addToCart } from '../utils/api';

export default function ChairViewer({ options }) {
  const chairImage = options.cushion.file ? options.cushion.file : ChairImage;
  return (
    <div className={styles.container}>
      <Footrest file={options.footrest.file}> </Footrest>
      <Legs file={options.legs.file}></Legs>
      <Placemat placemat={options.placemat}></Placemat>
      <div className={styles.chair}>
        <img src={chairImage} layout="fixed"></img>
      </div>
      <Floormat options={options}></Floormat>
      <LegEnds options={options}></LegEnds>
    </div>
  );
}
