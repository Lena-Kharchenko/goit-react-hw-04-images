import axios from 'axios';

const baseUrl = 'https://pixabay.com/api/';
const API_KEY = '35661093-d03a926eaf01982ed473b40fb';

export default class SearchImg {
  constructor() {
    this.page = 1;
    this.search = null;
  }

  setSearch = inputData => {
    this.search = inputData;
  };

  resetPage = () => {
    this.page = 1;
  };

  addPage = () => {
    this.page += 1;
  };

  async getImg() {
    const response = await axios.get(
      `${baseUrl}?q=${this.search}&page=${this.page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    );

    return response.data.hits;
  }
}
