import React, { useState, useRef, useEffect } from 'react';
import cn from 'classnames';
import styles from '../styles/OptionSelector.module.css';
import ImageGallery from 'react-image-gallery';
import { images } from '../images';
import SearchModal from './SearchModal';
import { nullOption, tagList } from '../options';
import { useKeyPress } from '../utils/useKeypressHook';

export default function OptionSelector({
  title,
  options,
  changeSelection,
  property,
  search = false,
  thumbStyle,
  displayPrice,
  selectedOption
}) {
  const gallery = useRef(null);
  const [searchText, setSearchText] = useState('');
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [optionsByTag, setOptionsByTag] = useState([]);

  if (property === 'cushion') {
    const leftArrow = useKeyPress('ArrowLeft');
    const rightArrow = useKeyPress('ArrowRight');

    if (leftArrow) goBack();
    if (rightArrow) advance();
  }

  useEffect(() => {
    const startTime = Date.now();

    if (!search) return;
    if (!searchText && !showSearchModal) return;

    const filteredOptions = [];
    const tagOptions = {};

    options.forEach(item => {
      if (!item.title) return;
      const tagText = item.tags?.join(' ');
      const textToSearch = `${tagText} ${item.title}`;
      if (searchText.length > 0) {
        if (textToSearch.toLowerCase().includes(searchText.toLowerCase())) {
          filteredOptions.push(item);
        }
      }

      item.tags?.forEach(tag => {
        if (tagList.includes(tag.toLowerCase())) {
          if (tagOptions[tag]) {
            tagOptions[tag] = [...tagOptions[tag], item];
          } else {
            tagOptions[tag] = [item];
          }
        }
      });
    });
    const endTime = Date.now();

    setOptionsByTag(tagOptions);
    setFilteredOptions([nullOption, ...filteredOptions]);
  }, [searchText, showSearchModal]);

  function setSearchAndCloseModal(text) {
    setSearchText(text);
    setShowSearchModal(false);
  }

  function setSelection(item) {
    gallery.current.slideToIndex(currentIndex + 1);
  }

  function advance() {
    const currentIndex = gallery.current.getCurrentIndex();
    gallery.current.slideToIndex(currentIndex + 1);
  }

  function goBack() {
    const currentIndex = gallery.current.getCurrentIndex();
    gallery.current.slideToIndex(currentIndex - 1);
  }
  function renderInner(props) {
    if (property === 'footrest') {
    }
    const imageTitle = props.file && props.file.split('.')[0];
    let imageStyle = {};
    if (props.thumbnail === 'none') {
      imageStyle = {
        backgroundImage: `url(${
          require('../images/none-selected.png').default
        })`
      };
    } else {
      switch (thumbStyle) {
        case 'cropped':
          imageStyle = {
            backgroundImage: `url(${props.thumbnail})`,
            backgroundRosition: '50% 0%',
            backgroundSize: 'cover',
            transform: 'scale(2.9)',
            transformOrigin: '50% 20%'
          };
          break;
        case 'cropped-local':
          imageStyle = {
            backgroundImage: `url(${images[imageTitle]})`
          };
          break;
        case 'fill':
          imageStyle = {
            backgroundColor: `rgb(${props.fillColorRGB})`
          };
          break;
        default:
          imageStyle = {
            backgroundImage: `url(${images[imageTitle]})`
          };
          break;
      }
    }

    let thumbContStyle = {};
    if (
      property === 'cushion' &&
      props?.id &&
      props.id === selectedOption?.id
    ) {
      thumbContStyle = { border: '2px solid #dd9864' };
    }

    if (property === 'legs' && props.thumbnail === 'none') {
      imageStyle = { ...imageStyle, transform: 'none' };
      thumbContStyle = {
        border: 'none'
      };
    }

    // console.log('RENDER INNER', props);
    return (
      <label htmlFor="thumb" title={props.title}>
        <div
          id="thumb"
          className={cn({
            [styles.thumbContainer]: true,
            cropped: thumbStyle === 'cropped-local'
          })}
          style={thumbContStyle}
        >
          <div
            className={cn({
              thumbnail: true,
              [styles.thumbnail]: true,
              [styles.cropped]: thumbStyle === 'cropped',
              [styles.cropped]: thumbStyle === 'cropped-local',
              [styles.fill]: thumbStyle === 'fill'
            })}
            style={imageStyle}
          ></div>
        </div>
      </label>
    );
  }

  function onBeforeSlide(index) {
    if (searchText.length > 0) {
      const newSelection = index === 0 ? {} : filteredOptions[index];
      changeSelection(property, newSelection);
    } else {
      const newSelection = index === 0 ? {} : options[index];
      changeSelection(property, newSelection);
    }
    setShowSearchModal(false);
  }

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <span className={styles.title}>
          {title} <span className={styles.displayPrice}>{displayPrice}</span>
        </span>
        {search ? (
          <SearchModal
            options={options}
            toggleShowModal={setShowSearchModal}
            showModal={showSearchModal}
            setSearchText={setSearchText}
            setSearchAndCloseModal={setSearchAndCloseModal}
            defaultOptions={optionsByTag}
            searchText={searchText}
            searchResultsCount={filteredOptions.length - 1}
          ></SearchModal>
        ) : null}
      </div>
      <div className={styles.row}>
        <button onClick={goBack} className={styles.chevron}>
          <img
            src={require('../images/ChevronLeft.png').default}
            alt="previous option"
          />
        </button>
        <ImageGallery
          items={searchText.length > 0 ? filteredOptions : options}
          onBeforeSlide={onBeforeSlide}
          showNav={false}
          renderItem={() => null}
          ref={gallery}
          showFullscreenButton={false}
          showPlayButton={false}
          renderThumbInner={renderInner}
          additionalClass={styles.gallery}
          disableKeyDown={true}
        />
        <button onClick={advance} className={styles.chevron}>
          <img
            src={require('../images/ChevronRight.png').default}
            alt="next option"
          />
        </button>
      </div>
    </div>
  );
}
