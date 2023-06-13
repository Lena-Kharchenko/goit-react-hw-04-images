import { useState, useEffect } from 'react';
import css from './ImageGallery.module.css';
import axios from 'axios';
import ImageGalleryItem from 'components/ImageGalleryItem';
import { RotatingLines } from 'npm i react-loader-spinner';
import { Button } from 'components/Button/Button';
import Modal from 'components/Modal/Modal';
import PropTypes from 'prop-types';

const baseUrl = 'https://pixabay.com/api/';
const API_KEY = '35661093-d03a926eaf01982ed473b40fb';

export default function ImageGallery() {

   const [gallery, setGallery] = useState([]);
  //  const [page, setPage] = useState(1);
   const [status, setStatus] = useState('idle');
   const [buttonLoader, setButtonLoader] = useState(false);
   const [openModal, setOpenModal] = useState(false);
   const [activeImg, setActiveImg] = useState(null);

  // state = {
  //   galery: [],
  //   page: 1,
  //   status: 'idle',
  //   buttonLoader: false,
  //   openModal: false,
  //   activeImg: null,
  // };

  // перед кожним оновленням

useEffect(()=> {
  if (searchByInputData === null) {
    return;
  }


 // перевіряємо чи змінилось слово у пошуку
 if (searchByInputData !== getImgApi.search) {
  getImgApi.resetPage();
 }
  

      try {

        setStatus('pending');
        getImgApi.setSearch(searchByInputData);
        getImgApi.getImg()
        .then(response => setGallery([...response], setStatus('resolved')));

      } catch (error) {
        setStatus('rejected');
      }

      return;
    }


    // перевіряємо чи користувач хоче підвантажити ще картинки

    if (buttonLoader) {
      try {
        getImgApi.setSearch(searchByInputData);
        getImgApi.getImg().then(response =>
          setGalery(
            [...galery, ...response],
            setButtonLoader(false),
            setTimeout(() => {
              window.scrollBy({
                top: window.innerHeight - 170,
                behavior: 'smooth',
              });
            }, 250)
          )
        );
      } catch {
        setStatus('rejected');
      }
    }
  }, [searchByInputData, galery, buttonLoader]);

  
  // Перегортаєм на наступну сторінку та замість кнопки ставим load more
  const handleAddImg = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      buttonLoader: true,
    }));
  };

  // відкриває/закриває модалку
  toglleModal = () => {
    this.setState(prevState => ({
      openModal: !prevState.openModal,
    }));
  };

  // зберігає індекс обєкта на якого click на розміченій сторінці
  addActiveImg = index => {
    this.setState({
      activeImg: index,
    });

    // відкриваєм модалку по кліку
    this.toglleModal();
  };

  render() {
    const { status, galery, buttonLoader, activeImg, openModal } = this.state;
    // якщо зашли на сайт перший раз
    if (status === 'idle') {
      return (
        <h2 style={{ textAlign: 'center', marginTop: 50 }}>
          Введіть значення у поле пошуку
        </h2>
      );
    }
    // коли ввели і завантажуються дані
    if (status === 'pending') {
      return (
        <RotatingLines
          className={css.Loader}
          strokeColor=" #303f9f"
          animationDuration="0.9"
          width="40"
        />
      );
    }

    // малюємо галерею
    if (status === 'resolved') {
      // якщо прийшов порожній список повідомляєм що нічого не знайдено. Данний API при незнайденних даних не повертає 404, а повертає пустий масив
      if (galery.length === 0) {
        return (
          <h2 style={{ textAlign: 'center' }}>
            За Вашим запитом "{this.props.searchByInputData}" нічого не знайдено
          </h2>
        );
        // якщо в повернутому масиві є хоть 1 обєкт, малюємо нашу галерею
      } else {
        //якщо масив не порожній робим map по масиву обєкті та рендеримо перші <= 12 елементів
        return (
          <>
            <h2 style={{ textAlign: 'center' }}>
              Результат за запитом:{' '}
              <span style={{ color: '#3f51b5' }}>
                {this.props.searchByInputData}
              </span>
            </h2>
            <ul className={css.ImageGallery}>
              {galery.map(({ id, webformatURL, title }, index) => (
                <ImageGalleryItem
                  onChange={() => this.addActiveImg(index)}
                  className={css.loader}
                  key={id}
                  src={webformatURL}
                  alt={title}
                  index={index}
                />
              ))}
            </ul>

            {/* якщо масив має менше 12 обєктів не рендерим кнопку  */}
            {/* коли догружаєм нову порцію картинок рендерим замість кнопки loader */}
            {!buttonLoader ? (
              galery.length % 12 === 0 ? (
                <Button onChange={this.handleAddImg}></Button>
              ) : null
            ) : (
              <RotatingLines
                className={css.Loader}
                strokeColor=" #303f9f"
                animationDuration="0.9"
                width="40"
              />
            )}
            {/* рендер модалки */}
            {openModal && (
              <Modal
                toglleModal={this.toglleModal}
                largeImageURL={galery[activeImg]}
              />
            )}
          </>
        );
      }
    }
    // якщо виникла помилка
    if (status === 'rejected') {
      return <h2>Виникла невідома помилка повторіть пошук ще раз</h2>;
    }
  }
}

ImageGallery.propTypes = {
  searchByInputData: PropTypes.string,
};
