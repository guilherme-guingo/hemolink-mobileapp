import axios from 'axios'

export const apiAuth = axios.create({
    baseURL: 'https://6a2879f44e1e783349a58ef3.mockapi.io'
})

export const catalogoHospitalApi = axios.create({
  baseURL:'https://6a27365ca84f9d39e9085516.mockapi.io'
});