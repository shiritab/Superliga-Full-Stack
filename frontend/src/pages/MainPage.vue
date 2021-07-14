<template>
  <div id="cover">
    <Loading style="margin: 0 auto;" v-if="isLoading"></Loading>
    <div class="main-container">
      <div class="left">
        <LeagueInfo @loaded="leagueLoaded=true; changeLoading()"></LeagueInfo>
      </div>
      <div class="right">
        <LoginPage v-if="!$root.store.username"></LoginPage>
        <TopThreeFavoriteGame v-if="$root.store.username" @loaded="top3Loaded=true; changeLoading()"></TopThreeFavoriteGame>
      </div>
    </div>
  </div>
</template>

<script>
import LeagueInfo from "../components/LeagueInfo.vue";
import TopThreeFavoriteGame from "../components/FavoriteComponents/TopThreeFavoriteGame.vue";
import LoginPage from "./AuthorizationPages/LoginPage.vue";
import Loading from './../components/Loading.vue'
export default {
  components: {
    LeagueInfo, 
    LoginPage, 
    TopThreeFavoriteGame,
    Loading
  },
  data(){
    return{
      leagueLoaded: false,
      top3Loaded: false,
      loginLoaded: true,
      isLoading: true,
    }
  },
  methods:{
    changeLoading(){
      if(this.leagueLoaded && (this.top3Loaded || (this.loginLoaded && !this.$root.store.username))){
        console.log("condition is true");
        this.isLoading = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.RandomRecipes {
  margin: 10px 0 10px;
}
.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}

.main-container{
  display: flex;
  justify-content: center;
}

.main-container .left{
  margin: 0 auto;
}

.main-container .right{
  margin: 0 auto;
}

.seperator{
  line-height: 1em;
  position: relative;
  outline: 0;
  border: 0;
  color: black;
  text-align: center;
  height: 1.5em;
  opacity: 0.75;
}

</style>
