import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

export class ImageGalleryItem extends Component {
  state = {
    scelet: true,
  };

  showSceleton = () => {
    this.setState({ scelet: false });
  };

  render() {
    const { src, alt, onChange, index } = this.props;
    return (
      <li className={css['ImageGalleryItem']}>
        {this.state.scelet ? (
          <img
            onLoad={this.showSceleton}
            index={index}
            className={css['ImageGalleryItem-scelet']}
            src={src}
            alt={alt}
          />
        ) : (
          <img
            onLoad={this.showSceleton}
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
}

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};
