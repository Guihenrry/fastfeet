import axios from 'axios';

export default function getAddress(zipCode) {
  return axios.get(`https://viacep.com.br/ws/${zipCode}/json/`);
}
