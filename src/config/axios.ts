import axios from 'axios'

const appID = 'DyAShocuh1yeoTr5J7STq9Nf'
const appSecret = 'BRLL72sYYcJ4L75BMWQ2zGX8'

const instance = axios.create({
  baseURL: 'https://gp-server.hunger-valley.com/',
  headers: {
    't-app-id': appID,
    't-app-secret': appSecret
  }
});


// Add a request interceptor
instance.interceptors.request.use(function (config) {
  // Do something before request is sent
  
  const xToken = localStorage.getItem('x-token')
  if(xToken){
    config.headers['Authorization'] = `Bearer ${xToken}`
  }
  return config;
}, function (error) {
  // Do something with request error
  console.error(error)
  return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
  if(response.headers['x-token']){
    localStorage.setItem('x-token',response.headers['x-token'])
  }
  // Do something with response data
  return response;
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
});

export default instance