import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';
import { useState } from 'react';

export default function ImageGalleryItem() {
  const [scelet, setScelet] = useState(true);

  // state = {
  //   scelet: true,
  // };

  const showSceleton = () => {
    setScelet(false);
  };

  return (
    <li className={css['ImageGalleryItem']}>
      {scelet ? (
        <img
          onLoad={showSceleton}
          index={index}
          className={css['ImageGalleryItem-scelet']}
          src={src}
          alt={alt}
        />
      ) : (
        <img
          onLoad={showSceleton}
          index={index}
          onClick={onChange}
          className={css['ImageGalleryItem-image']}
          src={src}
          alt={alt}
        />
      )}
    </li>
  );
}

ImageGalleryItem.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};
