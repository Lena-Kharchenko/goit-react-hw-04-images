import { useState, useEffect } from 'react';
import css from './ImageGallery.module.css';

import ImageGalleryItem from 'components/ImageGalleryItem';
import { RotatingLines } from 'react-loader-spinner';
import { Button } from 'components/Button/Button';
import Modal from 'components/Modal/Modal';
import PropTypes from 'prop-types';
import SearchImg from 'API/searchImg';

const getImgApi = new SearchImg();

export default function ImageGallery({ searchByInputData }) {
  const [gallery, setGallery] = useState([]);
  const [status, setStatus] = useState('idle');
  const [buttonLoader, setButtonLoader] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [activeImg, setActiveImg] = useState(null);

  // перед кожним оновленням
  useEffect(() => {
    //при першому рендері інпут пустий, нічого не рендеримо
    if (searchByInputData === null) {
      return;
    }

    //якщо пропс відмінний від наших даних робимо запит на сервер
    if (searchByInputData !== getImgApi.search) {
      getImgApi.resetPage();

      try {
        setStatus('pending');
        getImgApi.setSearch(searchByInputData);
        getImgApi
          .getImg()
          .then(response => setGallery([...response], setStatus('resolved')));
      } catch {
        setStatus('rejected');
      }
      return;
    }
    //якщо ми натиснули на кнопку loadMore підгружаємо наступні фото
    if (buttonLoader) {
      try {
        getImgApi.setSearch(searchByInputData);
        getImgApi.getImg().then(response =>
          setGallery(
            [...gallery, ...response],
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
  }, [searchByInputData, gallery, buttonLoader]);

  // Перегортаєм на наступну сторінку та замість кнопки ставим завантаження
  const handleAddImg = () => {
    getImgApi.addPage();
    setButtonLoader(true);
  };

  // відкриває/закриває модалку
  const toglleModal = () => {
    setOpenModal(!openModal);
  };
  // зберігає індекс обєкта на якого click на розміченій сторінці
  const addActiveImg = index => {
    setActiveImg(index);

    // відкриваєм модалку по кліку
    toglleModal();
  };

  // якщо зайшли в перший раз на сайт
  if (status === 'idle') {
    return (
      <h2 style={{ textAlign: 'center', marginTop: 50 }}>
        Введіть значення в поле пошуку
      </h2>
    );
  }
  // коли ввели і підвантажуються данні
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
    // якщо прийшов порожній список повідомляєм що нічого не знайдено. Данний API при незнайденних даних не повертає 404,
    // а повертає пустий масив
    if (gallery.length === 0) {
      return (
        <h2 style={{ textAlign: 'center' }}>
          За запитом "{searchByInputData}" нічого не знайдено
        </h2>
      );
      // якщо в повернутому масиві є хоч 1 обєкт, малюємо нашу галерею
    } else {
      //якщо масив не порожній робим map по масиву обєктів та рендеримо перші <= 12 елементів
      return (
        <>
          <h2 style={{ textAlign: 'center' }}>
            Результат за запитом:{' '}
            <span style={{ color: '#3f51b5' }}>{searchByInputData}</span>
          </h2>
          <ul className={css.ImageGallery}>
            {gallery.map(({ id, webformatURL, title }, index) => (
              <ImageGalleryItem
                onChange={() => addActiveImg(index)}
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
            gallery.length % 12 === 0 ? (
              <Button onChange={handleAddImg}></Button>
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
              toglleModal={toglleModal}
              largeImageURL={gallery[activeImg]}
            />
          )}
        </>
      );
    }
  }
  // якщо виникла помилка
  if (status === 'rejected') {
    return <h2>Виникла помилка. Повторіть спробу, будь ласка</h2>;
  }
}

ImageGallery.propTypes = {
  searchByInputData: PropTypes.string,
};
