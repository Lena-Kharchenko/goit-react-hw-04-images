import { useState } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';

export default function App() {

   const [searchImg, setSearchImg] = useState(null);
  // state = {
  //   searchImg: null,
  // };

  const setSearchText(data) {
    setSearchImg({ searchImg: data });
  };


    return (
      <>
        <Searchbar valueData={setSearchText} />
        <ImageGallery searchByInputData={setSearchImg} />
      </>
    );
  
}
