<template>
    <div class="league-preview">
      <b-card
      img-alt="Image"
      tag="article"
      style="max-width: 530px;"
      class="mb-2"
    >
      <b-card-title style="font-size: 90px;" :title="leagueName" >
        <router-link class="router-link" :to="{name: 'current_games' }">
          {{leagueName}}
        </router-link>
      </b-card-title>
      <b-card-text class="b-card-title" style="font-size: 30px;">
        {{ season }}
        <br/>
        {{ stage }}
      </b-card-text>

      <hr class="seperator" data-content="Next game">
      <div style="text-align: center; height: 50%;">
        <GamePreview
        :hostLogo="nextGame.home_logo"
        :guestLogo="nextGame.away_logo"
        :date="nextGame.date"
        :id=nextGame.game_id
        :hour="nextGame.time"
        :guestTeam="nextGame.away_team"
        :hostTeam="nextGame.home_team"
        :field="nextGame.field"
        :favorite="nextGame.favorite">
        </GamePreview>
      </div>
    </b-card>
  </div>
</template>

<script>
import GamePreview from "./GameComponents/GamePreview.vue";
export default {
  name: "LeagueInfo",
  components: {
    GamePreview
  }, 
 data() {
    return {
      leagueName: "", 
      season: "", 
      stage: "",
      nextGame: {},
    };
  },
  methods:{
    async getLeagueInfo() {
      try {
        const response = await this.axios.get(
          "http://localhost:3000/"
        );
        console.log(response);
        this.leagueName = response.data[0].league_name;
        this.season = response.data[0].current_season_name;
        this.stage = response.data[0].current_stage_name;
        this.nextGame = 
          {
            game_id: response.data[0].next_game_details_id,
            date: response.data[0].next_game_details_date,
            time: response.data[0].next_game_details_time,
            home_team: response.data[0].next_game_details_home_team,
            home_logo: response.data[0].next_game_home_logo,
            away_team: response.data[0].next_game_details_away_team,
            away_logo: response.data[0].next_game_away_logo,
            field: response.data[0].next_game_details_field,
            favorite: response.data[0].next_game_favorite,
          }
        this.$emit('loaded',true);
      } catch (err) {
        console.log(err.response);
      }
    },
  },
  created(){
    this.getLeagueInfo();
  }

}
</script>

<style>
.seperator:before{
      content: '';
    background: linear-gradient(to right, transparent, #818078, transparent);
    position: absolute;
    left: 0;
    top: 50%;
    width: 100%;
    height: 1px;
}

.seperator:after{
  content: attr(data-content);
    position: relative;
    display: inline-block;
    color: black;
    padding: 0 .5em;
    line-height: 1.5em;
    background-color: #fcfcfa;
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
    font-family: Arial, Helvetica, sans-serif;
}

.league-preview {
  display: inline-block;
  width: 520px;
  height: fit-content;
  position: relative;
  margin: 10px 10px;
  border-style: solid;
  border-radius: 10px;
  border-width: 5px;
  border-color:rgb(44, 89, 116);
}

.league-preview .league-title {
  text-align: center;
  text-transform: uppercase;
  color:  rgb(111, 155, 197);
}

.league-preview .league-content {
  width: 100%;
  overflow: hidden;
}

.router-link{
  color: rgb(111, 155, 197);
}

.b-card-title{
  background-image: url('./../assets/superligaLogo.png');
  background-size: 30%;
  background-repeat: no-repeat;
  background-position: right;
}
</style>