import React from 'react';
import styles from '../styles/Footrest.module.css';
import EmptyImage from '../images/empty.png';

export default function Footrest({ file }) {
  if (!file) {
    return (
      <div className={styles.container}>
        <img src={EmptyImage}></img>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <img src={require(`../images/footrest/${file}`).default}></img>
    </div>
  );
}
