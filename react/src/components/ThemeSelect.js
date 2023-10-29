import React from 'react';
import styles from '../styles/ThemeSelect.module.css';

const themeOptions = [
  'Animal',
  'Boy',
  'Dark Background',
  'Dots',
  'Floral',
  'Food',
  'Leaves',
  'Mudcloth',
  'Rainbow',
  'Autumn',
  'Spring',
  'Summer',
  'Winter',
  'Stripes',
  'Vehicle',
  'Vegan'
];

export default function ThemeSelect() {
  const options = themeOptions.map(option => (
    <option key={option} className={styles.option} value={option}>
      {option}
    </option>
  ));
  return (
    <div>
      <select id="cars" name="cars" className={styles.dropdown}>
        <option value="null">Filter by theme</option>
        {options}
      </select>
    </div>
  );
}
