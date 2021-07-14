<template>
  <div>
    <Loading style="margin: 0 auto;" v-if="isLoading"></Loading>
    <div class="current-games-container">
        <PastAndFutureGames v-if="!isLoading && $root.store.username"
        @click="setFavorite"
        :past_games="past_games"
        :future_games="future_games"
        ></PastAndFutureGames>
        <PastAndFutureGamesNoFav v-if="!isLoading && !$root.store.username"
        :past_games="past_games"
        :future_games="future_games"></PastAndFutureGamesNoFav>
    </div>  
  </div>
</template>

<script>
import PastAndFutureGames from '../components/GameComponents/PastAndFutureGames.vue'
import PastAndFutureGamesNoFav from '../components/GameComponents/PastAndFutureGamesNoFav.vue'
import Loading from './../components/Loading.vue'
export default {
  name: "CurrentGames",
  components: { 
    PastAndFutureGames,
    Loading,
    PastAndFutureGamesNoFav, 
  },
  data(){
    return{
      past_games:[],
      future_games:[],
      isLoading: true,
    }
  },
  methods:{
    async getGames(){
      try{
        const response = await this.axios.get(
          `http://localhost:3000/league/current_games`
        );
        console.log(response)
        const allGames = response.data;
        this.past_games = allGames.past_games;
        this.future_games = allGames.future_games;
        this.isLoading = false;
      }catch(error){
        console.log("couldn't retrieve past and future games");
        console.log(error);
      }
    },
    async setFavorite(game_id){
      try{
          console.log(`favoriting ${game_id} from current games`);
          const response = await this.axios.post(
          `http://localhost:3000/users/favoriteGames`,{
              id: game_id
          }
          );
          console.log(response);
      }catch(error){
          console.log(error.response);
      }
    }
  },
  // mounted(){
  //   setTimeout(() => {
  //     this.isLoading = false
  //   }, 3000)
  // },
  created(){
    console.log("Current games created")
    this.getGames();
  }
}
</script>

<style>
  .current-games-container{
    background-color: rgb(216, 238, 201,0.7) ;
    width: 70%;
    margin: 0 auto;
  }

</style>