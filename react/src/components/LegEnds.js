import React from 'react';
import styles from '../styles/LegEnds.module.css';
import EmptyImage from '../images/empty.png';

const colors = [
  "bamboo",
  "cherry",
  "black",
  "gold",
  "walnut"]

export default function LegEnds({ options }) {
  if (!Object.keys(options.floormat).length) {
    return null;
  }

  if (!Object.keys(options.legs).length) {
    return (
      <div className={styles.nullCont} id="leg-end-cont">
        <img src={require(`../images/legs/leg-ends/legs.png`).default}></img>
      </div>
    );
  } else {

    const filename = options.legs.tags.find(tag => colors.includes(tag))

    return (
      <div className={styles.container} id="leg-end-cont">
        <img
          src={require(`../images/legs/leg-ends/${filename}.png`).default}
        ></img>
      </div>
    );
  }
}
