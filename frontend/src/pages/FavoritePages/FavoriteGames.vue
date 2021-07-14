<template>
    <div>
        <Loading style="margin: 0 auto;" v-if="isLoading"></Loading>
        <div>
            <b><p class="favPagetitle" v-if="!isLoading">Favorite games</p></b>
            <hr class="seperatorGame" v-if="!isLoading">
            <div class="favorite-game-container">
                <FavoriteGames @loaded="isLoading=false"></FavoriteGames>
            </div>
        </div>  
    </div>
</template>

<script>
import FavoriteGames from "../../components/FavoriteComponents/FavoriteGames.vue"
import Loading from "./../../components/Loading.vue"
export default {
    name: "FavoriteGamesPage",
    components: {
        FavoriteGames,
        Loading
    },
    data(){
        return{
            isLoading: true,
        }
    }
}
</script>

<style>
.favorite-game-container {
    background-color:rgb(216, 238, 201,0.8);
    width: 70%;
    margin: 0 auto;
}

html, body {
    max-width: 100%;
    overflow-x: hidden;
}

.favPagetitle{
    color: white;
    font-size: 40px;
    text-align: center;
}

.seperatorGame{
  line-height: 1.5em;
  position: relative;
  outline: 0;
  border: 0;
  color: white;
  text-align: center;
  opacity: 0.85;
}

.seperatorGame:before{
  content: '';
  background: linear-gradient(to right, transparent, white, transparent);
  position: absolute;
  left: 0;
  top: 30%;
  width: 100%;
  height: 4px;
}

.seperatorGame:after{
  content: attr(data-content);
  position: relative;
  display: inline-block;
  color: white;
  padding: 0 .5em;
  line-height: 3em;
  color: white;
  background-color: #fcfcfa;
}
</style>