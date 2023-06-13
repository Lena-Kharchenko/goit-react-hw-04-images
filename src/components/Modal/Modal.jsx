import css from './Modal.module.css';
import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  state = {
    returnSkeleton: true,
    scelet: true,
  };
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDon);
  }

  showSceleton = () => {
    this.setState({ scelet: false });
  };

  handleKeyDon = e => {
    if (e.code === 'Escape') {
      this.props.toglleModal();
    }
  };

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDon);
    window.removeEventListener('load', this.showSceleton);
  }

  overlayClick = e => {
    if (e.currentTarget === e.target) {
      this.props.toglleModal();
    }
  };
  render() {
    const { largeImageURL } = this.props;
    return createPortal(
      <div className={css.Overlay} onClick={this.overlayClick}>
        <div className={css.Modal}>
          <button
            className={css.Button}
            type="button"
            onClick={this.props.toglleModal}
          ></button>
          {this.state.scelet && <div className="Scelet"></div>}
          <img
            onLoad={this.showSceleton}
            width={900}
            height={600}
            src={largeImageURL.largeImageURL}
            alt={largeImageURL.tags}
          />
        </div>
      </div>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  toglleModal: PropTypes.func.isRequired,
  largeImageURL: PropTypes.object.isRequired,
};
