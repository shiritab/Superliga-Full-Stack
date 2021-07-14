<template>
  <div>
      <Loading style="margin: 0 auto;" v-if="isLoading"></Loading>
      <PlayerFull @loaded="isLoading=false"></PlayerFull>
  </div>
</template>

<script>
import PlayerFull from "../../components/PlayerComponents/PlayerFull.vue";
import Loading from './../../components/Loading.vue';
export default {
    name: "PlayerTicketPage",
    components: {
        PlayerFull,
        Loading
    },
    data(){
        return{
            isLoading: true,
        }
    },
    created(){
        isLoading = true;
    }
}
</script>

<style>
html, body{
     max-width: 100%;
    overflow-x: hidden;
}
</style>