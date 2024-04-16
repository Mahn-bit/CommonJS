const axios = require("axios");
const { basename } = require("path");
const { config } = require("process");

const API_URL = "https://jsonplaceholder.typicode.com/users";


//Axios instance

const Env = {
  API_URL: "https://simple-books-api.glitch.me",
};

const client = axios.create({
  baseURL: "${Env.API_URL}",
});

client.interceptors.request.use(
  config => {
    
  }
)

//Simple Books API

const getStatus = async (endPoint) => {
  try {
    const response = await axios.get(`${Env.API_URL}/${endPoint}`);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};
// getStatus('status');

const getBooks = async (endPoint) => {
  try {
    const response = await axios.get(`${Env.API_URL}/${endPoint}`, {
      params: {
        type: "fiction",
        limit: 2,
      },
    });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

// getBooks("books");

const getSingleBook = async (bookId) => {
  try {
    const response = await axios.get(`${Env.API_URL}/books/${bookId}`);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

// getSingleBook(1)

const authentication = async () => {
  try {
    const response = await axios.post(`${Env.API_URL}/api-clients`, {
      clientName: "Ibrahim Molade",
      clientEmail: "moladeibrahim@example.com",
    });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

authentication();
