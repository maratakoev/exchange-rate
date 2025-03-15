<template>
  <div class="home">
    <exchange-rate></exchange-rate>
</div>
</template>

<script>
// @ is an alias to /src
import ExchangeRate from '@/components/ExchangeRate.vue';

export default {
  name: 'HomeView',
  components: {
    ExchangeRate
  }
}
</script>
