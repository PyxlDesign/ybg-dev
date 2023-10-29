import React, { useRef, useEffect } from 'react';
import styles from '../styles/SearchModal.module.css';
import { useKeyPress } from '../utils/useKeypressHook';
import { useClickOutside } from '../utils/useClickOutsideHook';

export default function SearchModal({
  showModal = false,
  options,
  defaultOptions,
  toggleShowModal,
  searchText,
  searchResultsCount,
  setSearchText,
  setSearchAndCloseModal
}) {
  useEffect(() => {
    if (showModal) {
      searchInput.current.focus();
    }
  }, [showModal]);

  const searchInput = useRef(null);
  const modalRef = useRef(null);

  const enter = useKeyPress('Enter');
  const escape = useKeyPress('Escape');
  const arrowUp = useKeyPress('ArrowUp');
  const arrowDown = useKeyPress('ArrowDown');

  const clickedOutsideModal = useClickOutside(modalRef);

  if (clickedOutsideModal) {
    setSearchAndCloseModal(searchText);
  }

  if (escape || enter) {
    setSearchAndCloseModal(searchText);
  }

  if (showModal) {
    return (
      <div>
        <div className={styles.spacer}></div>
        <div className={styles.modalCont} ref={modalRef}>
          <div className={styles.modal}>
            <input
              ref={searchInput}
              placeholder="Search for a cushion"
              type="text"
              value={searchText}
              className={styles.searchInput}
              onChange={e => setSearchText(e.target.value)}
              onSubmit={e => {
                setSearchAndCloseModal(e.target.value);
              }}
            />
            <ul className={styles.tagListCont}>
              {searchText.length > 0 && (
                <li
                  key={searchText}
                  className={styles.tagListItem}
                  onClick={() => setSearchAndCloseModal(searchText)}
                >
                  <span className={styles.tagName}>{searchText}</span>{' '}
                  <span className={styles.tagCount}>
                    ({searchResultsCount})
                  </span>
                </li>
              )}
              {Object.keys(defaultOptions).map(item => (
                <li
                  key={item}
                  className={styles.tagListItem}
                  onClick={() => setSearchAndCloseModal(item)}
                >
                  <span className={styles.tagName}>{item}</span>{' '}
                  <span className={styles.tagCount}>
                    ({defaultOptions[item].length})
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div
      className={styles.container}
      onClick={() => toggleShowModal(true)}
      ref={modalRef}
    >
      <svg
        width="19"
        height="19"
        viewBox="0 0 19 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="7.5" cy="7.5" r="7" stroke="#C4C4C4" fill="none" />
        <path d="M12 12L18 18" stroke="#C4C4C4" />
      </svg>
    </div>
  );
}
