<template>
  <div class="team-full-container">
        <ul class="ul_team_full">
            <li>
                <img class="symbol" :src="team.team_symbol">
            </li>
            <li>
                <h1>{{team.team_name}}</h1>
                <h4>{{team.team_twitter}}</h4>
                <div>
                  <b-icon-heart v-if="$root.store.username && !favorite" @click="setFavorite" font-scale="1.5" ></b-icon-heart>
                  <b-icon-heart-fill v-if="$root.store.username && favorite"  font-scale="1.5" variant="danger"></b-icon-heart-fill>
                </div>
            </li>
        </ul>
        <hr>
        <b-tabs content-class="mt-3"
        active-nav-item-class="font-weight-bold text-success"
        >
            <b-tab title="Games" :title-link-class="'tab-title-class'">
                <PastAndFutureGamesNoFav
                :past_games="past_games"
                :future_games="future_games"></PastAndFutureGamesNoFav>
            </b-tab>
            <b-tab title="Players" :title-link-class="'tab-title-class'">
                <b-table fixed striped hover :items="players" :fields="player_fields">
                    <template #cell(image)="data">
                        <router-link :to="{ name: 'player ticket', params:{playerId: data.item.id}}">
                            <img class="player_img" :src="data.value">
                        </router-link>
                    </template>
                    <template #cell(name)="data">
                        <router-link id="player_name" :to="{ name: 'player ticket', params:{playerId: data.item.id}}">
                            {{data.item.name}}
                        </router-link>
                    </template>
                </b-table>
            </b-tab>
        </b-tabs>
  </div>
</template>

<script>
import PastAndFutureGamesNoFav from "../GameComponents/PastAndFutureGamesNoFav.vue"
export default {
    name: "TeamFull",
    components:{
        PastAndFutureGamesNoFav
    },
    data(){
        return {
            player_fields: ["image","name","position"],
            team: {
                team_symbol: "",
                team_name: "",
                team_twitter: "" 
            },
            past_games: [],
            future_games: [],
            players: [],
            favorite: false,
        }
    },
    methods: {
        async getTeam(team_id){
            try {
                const response = await this.axios.get(
                `http://localhost:3000/teams/${team_id}/ticketDetails`,
                );
                console.log(response);
                const team = response.data;
                this.team = team.teamPreview;
                this.future_games = team.teamFull.games.future_games;
                this.past_games = team.teamFull.games.past_games;
                this.players = team.teamFull.players;
                this.favorite = team.teamFull.favorite; //TODO CHECK FAOVIRTE
                this.$emit('loaded',true);
            } catch (error) {
                console.log("error in get player")
                console.log(error);
            }
        },
        async setFavorite(){
            try{
                this.favorite = true;
                const response = await this.axios.post(
                `http://localhost:3000/users/favoriteTeams`,{
                    id: this.team.team_id
                }
                );
                console.log(response);
            }catch(error){
                console.log(error.response);
            }
        },
    }, 
    created(){
        console.log("team full created");
        this.getTeam(this.$route.params.teamId); 
    }
}
</script>

<style>
hr{
    border: 0;
    height: 2px;
    background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0));
}
.team-full-container{
    background-color:rgb(216, 238, 201,0.9);
    width: 50%;
    margin:0 auto;
}
.symbol{
    display:flex;
    margin: auto;
    width: 100%;
}
.ul_team_full {
    margin-top: 0;
    margin-bottom: 1rem;
    display: flex;
    justify-content: center;
    align-items: center
}
.ul_team_full li{
    list-style-type: none;
    display: inline;
    padding: 20px;
}
.tab-title-class {
    color: black;  
    font-weight: bold;
}
.tab-title-class:hover{
    color: rgb(66, 65, 65); 
    font-weight: bold;
}
.player_img{
    width:28%;
}
#player_name{
    /* font-size: 20px; */
    color: rgb(24, 36, 16);
}
#player_name:hover{
    /* font-size: 20px; */
    color: rgb(51, 78, 33);
}
</style>