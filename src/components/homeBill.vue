<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">Счет в валюте</span>

        <p class="currency-line" v-for="cur in currencies" :key="cur">
          <span>{{getCurrency(cur)}} {{cur}}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    props: ['rates'],
    computed:{
        base(){
            return this.$store.getters.info.bill / (this.rates['RUB'] / this.rates['EUR'])
        }
    },
    data(){
        return{
            currencies:['RUB', 'USD', 'EUR']
        }
    },
    methods:{
        getCurrency(currency){
            return Math.floor(this.base * this.rates[currency])
        }
    }
    
};
</script>

<style></style>
