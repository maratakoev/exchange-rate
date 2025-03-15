<template>
  <div>
    <h1>Курс валют</h1>
    <button @click="fetchExchangeRate">Обновить курс</button>
    <button @click="clearExchangeRate">Очистить курс</button>
    
    <div v-if="isLoading">Загрузка...</div>
    <p v-if="exchangeRates">
      1 USD = {{ exchangeRates.USD }} RUB
    </p>

    <p v-else>Обновите курс валют.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from '../utils/axios'; // Импортируем настроенный экземпляр axios

const exchangeRates = ref(null);
const isLoading = ref(true); // Флаг загрузки, изначально true

// Функция для получения курса валют
const fetchExchangeRate = async () => {
  try {
    isLoading.value = true; // Устанавливаем флаг загрузки
    const exchangeRateResponse = await axios.get('v4/latest/USD');
    exchangeRates.value = {
      USD: exchangeRateResponse.rates.RUB, // Курс доллара к рублю
    };
  } catch (error) {
    console.error('Ошибка при получении курса валют:', error);
    exchangeRates.value = null; // Если ошибка, показываем "Не удалось загрузить данные"
  } finally {
    isLoading.value = false; // После загрузки или ошибки меняем флаг
  }
};

// Функция для очистки данных о курсе валют
const clearExchangeRate = () => {
  exchangeRates.value = null;
};

// Запрашиваем курс валют при монтировании компонента
onMounted(() => {
  fetchExchangeRate();
});
</script>

<style scoped>
html, body {
  margin: 0;
  padding: 0;
}

h1 {
  font-size: 24px;
  margin-bottom: 10px;
}

p {
  font-size: 18px;
}

div {
  font-size: 16px;
  color: #000000;
}

button {
  padding: 8px 12px;
  margin: 5px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #f0f0f0;
}
</style>
