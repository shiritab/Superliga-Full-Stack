<template>
    <div>
        <Loading style="margin: 0 auto;" v-if="isLoading"></Loading>
        <div>
            <b><p id="favPagetitle" v-if="!isLoading">Favorite teams</p></b>
            <hr class="seperatorTeam" v-if="!isLoading">
            <div class="favorite-team-container">
                <FavoriteTeams @loaded="isLoading=false"></FavoriteTeams>
            </div>
        </div>
    </div>
</template>

<script>
import FavoriteTeams from "../../components/FavoriteComponents/FavoriteTeams.vue"
import Loading from "./../../components/Loading.vue"
export default {
    name: "FavoriteTeamsPage",
    components: {
        FavoriteTeams,
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
.favorite-team-container {
    background-color:rgb(216, 238, 201,0.8);
    width: 70%;
    margin: 0 auto;
}

html, body {
    max-width: 100%;
    overflow-x: hidden;
}
#favPagetitle{
    color: white;
    font-size: 40px;
    text-align: center;
}

.seperatorTeam{
  line-height: 1.5em;
  position: relative;
  outline: 0;
  border: 0;
  color: white;
  text-align: center;
  opacity: 0.85;
}

.seperatorTeam:before{
  content: '';
  background: linear-gradient(to right, transparent, white, transparent);
  position: absolute;
  left: 0;
  top: 30%;
  width: 100%;
  height: 4px;
}

.seperatorTeam:after{
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