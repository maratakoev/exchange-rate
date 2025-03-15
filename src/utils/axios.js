// src/utils/axios.js
import axios from 'axios';

// Создаем экземпляр axios с базовыми настройками
const instance = axios.create({
  baseURL: 'https://api.exchangerate-api.com/', // Указываем базовый URL для API
  timeout: 5000, // Устанавливаем таймаут для запроса (5 секунд)
});

// Пример перехватчиков для обработки ошибок и добавления токенов (если нужно)
instance.interceptors.request.use(
  (config) => {
    // Здесь можно добавлять токен авторизации, если он есть
    // Например: config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response.data; // Возвращаем только данные ответа
  },
  (error) => {
    // Здесь можно обработать ошибки глобально
    console.error('Ошибка ответа:', error);
    return Promise.reject(error);
  }
);

export default instance;
