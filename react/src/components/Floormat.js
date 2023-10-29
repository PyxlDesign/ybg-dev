import React from 'react';
import styles from '../styles/Floormat.module.css';
import Shadow from '../images/floormat_shadow.png';
export default function Floormat({ options }) {
  const floormatColor = options?.floormat?.metafields?.floormat_color;
  if (!floormatColor) {
    return (
      <div className={styles.container} id="floormatz">
        {/* <img src={Shadow} alt="" className={styles.shadow} id="floormatz" /> */}
      </div>
    );
  }
  return (
    <div className={styles.container} id="floormatz">
      <img src={Shadow} alt="" className={styles.shadow} id="floormatz" />
      <svg
        version="1.1"
        id="Layer_1"
        x="0px"
        y="0px"
        viewBox="0 0 1200 1200"
        className={styles.floormat}
      >
        <path
          fill={`rgb(${floormatColor})`}
          stroke={`rgb(${floormatColor})`}
          d="M339.1,771.8c18.6-16.8,47.9-27.2,126.9-21.9c0,0,436,37.1,451.2,38.4s74.9,5.1,89.4,26.2
	c6.6,9.6-3.2,26.1-7.9,39.4l-64.4,176c-11.3,28.1-42.6,31.6-54.9,34.5c-43.2,9.9-113-1.4-150.2-5.1l-514.9-55.5
	c-17.3-2.2-40.3-5.7-57-14.9c-23-12.7-17.1-27-2.6-40.4L339.1,771.8z"
        />
      </svg>
    </div>
  );
}
