<template>
  <div>
      <Loading style="margin: 0 auto;" v-if="isLoading"></Loading>
      <TeamFull  @loaded="isLoading=false"></TeamFull>
  </div>
</template>

<script>
import TeamFull from "../../components/TeamComponents/TeamFull.vue";
import Loading from './../../components/Loading.vue';
export default {
    name: "TeamTicketPage",
    components: {
        TeamFull,
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