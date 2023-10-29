import React from 'react';
import styles from '../styles/Cart.module.css';
import { addToCart } from '../utils/api';
import { centsToDollars } from '../utils/money';
import {
  CUSHION_TYPE,
  FOOTREST_TYPE,
  LEG_WRAPS_TYPE,
  PLACEMAT_TYPE,
  FLOORMAT_TYPE
} from './Container';

export default function Cart({ options, cushionInsert, setOptions }) {
  function updateSelection(property = 'insert', value = {}) {
    const newOptions = { ...options, [property]: value };
    setOptions(newOptions);
  }

  async function formatAndAddToCart() {
    try {
      let itemsToAddToCart = [];
      for (const product in options) {
        if (Object.keys(options[product]).length !== 0) {
          itemsToAddToCart.push({
            id: options[product]?.variants[0]?.id,
            quantity: 1
          });
        }
      }
      const updatedCart = await addToCart(itemsToAddToCart);
      window.location.href = '/cart';
    } catch (error) {
      console.log('Error adding to cart and redirecting', error);
    }
  }

  let configurationPrice = 0;
  let cartDisplayNames = {};
  for (const product in options) {
    const item = options[product];
    switch (item.type) {
      case CUSHION_TYPE:
        if (item.title !== 'Cushion Insert') {
          configurationPrice += item.price;
          cartDisplayNames.CUSHION_TYPE = item.title;
        }
        break;
      case FOOTREST_TYPE:
        configurationPrice += item.price;
        cartDisplayNames.FOOTREST_TYPE = item.title;
        break;
      case LEG_WRAPS_TYPE:
        configurationPrice += item.price;
        cartDisplayNames.LEG_WRAPS_TYPE = item.title;
        break;
      case PLACEMAT_TYPE:
        configurationPrice += item.price;
        cartDisplayNames.PLACEMAT_TYPE = item.title;
        break;
      case FLOORMAT_TYPE:
        configurationPrice += item.price;
        cartDisplayNames.FLOORMAT_TYPE = item.title;
        break;
    }
  }
  var addRemoveButton = document.querySelector('button.gIkksSuQZo89D25hl85E');

  const cushionInCart = Object.keys(options.insert).length > 0;
  if (cushionInCart) {
    configurationPrice += options.insert.price;
  }

  function toggleCushionInsert() {
    addRemoveButton.classList.toggle('checked');
    if (cushionInCart) {
      updateSelection('insert', {});
    } else {
      updateSelection('insert', cushionInsert);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.optionsContainer}>
        <div className={styles.productTypeCont}>
          <p className={styles.productType}>Cover</p>
          <p className={styles.productName}>
            {cartDisplayNames.CUSHION_TYPE || 'None selected'}
          </p>
          {cushionInsert && (
            <button
              className={styles.cushionButton }
              onClick={toggleCushionInsert}
            >
              {' '}
              {cushionInCart ? '' : ''}Add Cushion Insert{' '}
              {centsToDollars(cushionInsert.price)}
            </button>
          )}
        </div>
        <div className={styles.productTypeCont}>
          <p className={styles.productType}>Placemat</p>
          <p className={styles.productName}>
            {cartDisplayNames.PLACEMAT_TYPE?.replace(
              'IKEA Highchair Placemat',
              ''
            )
              .replace('Limited Edition', '')
              .trim() || 'None selected'}
          </p>
        </div>
        <div className={styles.productTypeCont}>
          <p className={styles.productType}>Leg Wraps</p>
          <p className={styles.productName}>
            {cartDisplayNames.LEG_WRAPS_TYPE?.replace(
              'Leg Wraps -',
              ''
            ).trim() || 'None selected'}
          </p>
        </div>
        <div className={styles.productTypeCont}>
          <p className={styles.productType}>Footrest</p>
          <p className={styles.productName}>
            {cartDisplayNames.FOOTREST_TYPE?.replace(
              'Adjustable Highchair Footrest',
              ''
            ).trim() || 'None selected'}
          </p>
        </div>
        <div className={styles.productTypeCont}>
          <p className={styles.productType}>Floormat</p>
          <p className={styles.productName}>
            {cartDisplayNames.FLOORMAT_TYPE?.replace(
              'Floor Mat -',
              ''
            ).trim() || 'None selected'}
          </p>
        </div>
      </div>
      <button className={styles.button} onClick={formatAndAddToCart}>
        Add to cart {centsToDollars(configurationPrice)}
      </button>
    </div>
  );
}
