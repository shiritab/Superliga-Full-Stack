<template>
  <div>
    <b><p id="title">Upcoming favorite games</p></b>
    <hr class="seperatorTop3">
    <b v-if="games.length==0 && loaded">
      <p id="favTitle">Haven't chosen any favorite games yet
        <b-icon-emoji-frown></b-icon-emoji-frown>
      </p>
    </b>
    <b-container class="bv-example-row">
      <b-row>
        <b-col class="row">
          <SmallGamePreview
            v-for="g in games"
            :id=g.game_id
            :date="g.date"
            :hour="g.time" 
            :hostTeam="g.home_team" 
            :guestTeam="g.away_team" 
            :field="g.field"
            :hostLogo="g.home_team_logo"
            :guestLogo="g.away_team_logo"
            :favorite="true"
            :key="g.game_id"></SmallGamePreview>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import SmallGamePreview from "../GameComponents/SmallGamePreview.vue";
export default {
  name: "TopThreeFavoriteGame",
  components: {
    SmallGamePreview
  }, 
  data() {
    return {
      games: [],
      loaded: false,
    };
  },
  methods: {
    async updateGames(){
      console.log("response");
      try {
        const response = await this.axios.get(
          "http://localhost:3000/",
        );
        console.log(response);
        const games = response.data[1];
        this.games = [];
        if(!(games === "no favorite games were found")){
            games.map((game) =>{
            this.games.push(game);
            });
        }
        console.log(response);
        this.loaded=true;
        this.$emit('loaded',true);
      } catch (error) {
        console.log("error in update games")
        console.log(error);
      }
    }
  }, 
  mounted(){
    console.log("favorite games mounted");
    this.updateGames(); 
  }
};
</script>

<style>
.seperatorTop3{
  line-height: 1.5em;
  position: relative;
  outline: 0;
  border: 0;
  color: white;
  text-align: center;
  height: 1.5em;
  opacity: 0.85;
}

.seperatorTop3:before{
  content: '';
  background: linear-gradient(to right, transparent, white, transparent);
  position: absolute;
  left: 0;
  top: 30%;
  width: 100%;
  height: 4px;
}

.seperatorTop3:after{
  content: attr(data-content);
  position: relative;
  display: inline-block;
  color: white;
  padding: 0 .5em;
  line-height: 3em;
  color: white;
  background-color: #fcfcfa;
}
   
#title{
  color: white;
  font-size: 40px;
  text-align: center;
}
#favTitle{
  color: white;
  font-size: 20px;
  text-align: center;
}
</style>
