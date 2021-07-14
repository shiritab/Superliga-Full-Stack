<template>  
  <div class="player-full-container">
    <div class="sub-container">
        <ul class="ul_player_full">
            <li>
                <img class="symbol" :src="playerPreview.image">
            </li>
            <li>
                <h1>{{playerPreview.name}}</h1>
                <h4>Team: {{playerPreview.team_name}}</h4>
                <h4>Position: {{playerPreview.position}}</h4>
                <div>
                  <b-icon-heart v-if="$root.store.username && !favorite" @click="setFavorite" font-scale="1.5" ></b-icon-heart>
                  <b-icon-heart-fill v-if="$root.store.username && favorite"  font-scale="1.5" variant="danger"></b-icon-heart-fill>
                </div>
            </li>
        </ul>
        <hr>
        <ul class="player_full"  v-bind:style="{ backgroundImage: 'url(' + playerPreview.team_logo + ')' }">
          <li>
            <b>Common name: </b>{{playerFull.common_name}}
          </li>
          <li>
            <b>Nationality: </b>{{playerFull.nationality}}
          </li>
          <li>
            <b>Birth date: </b>{{playerFull.birth_date}}
          </li>
          <li>
            <b>Birth country: </b>{{playerFull.birth_country}}
          </li>
          <li>
            <b>Height: </b>{{playerFull.height}} 
          </li>
          <li>
            <b>Weight: </b>{{playerFull.weight}} 
          </li>
        </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlayerFull",
  components: {
  }, 
  data() {
    return {
      playerPreview: {},
      playerFull: {},
      favorite: false,
    };
  },
  methods: {
    async getPlayer(player_id){
      try {
        const response = await this.axios.get(
          `http://localhost:3000/players/${player_id}/ticketDetails`,
        );
        console.log(response);
        const player = response.data;
        this.playerPreview = player.player_preview[0];
        this.playerFull = player.player_full;
        this.favorite = player.player_full.favorite; //TODO CHECK FAVORITE
        this.$emit('loaded', true);
      } catch (error) {
        console.log("error in get player")
        console.log(error);
      }
    },
    async setFavorite(){
      try{
        this.favorite = true;
        const response = await this.axios.post(
          `http://localhost:3000/users/favoritePlayers`,{
            id: this.playerPreview.id
          }
        );
        console.log(response);
      }catch(error){
        console.log(error.response);
      }
    }
  }, 
  created(){
    console.log("player full created");
    this.getPlayer(this.$route.params.playerId);
  }
};
</script>

<style>
hr{
    border: 0;
    height: 2px;
    background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0));
}

.player-full-container{
    background-color:rgb(216, 238, 201,0.9);
    width: 50%;
    margin:0 auto;
}

.symbol{
    display:flex;
    margin: auto;
    width: 100%;
}

.ul_player_full{
    margin-top: 0;
    margin-bottom: 1rem;
    display: flex;
    justify-content: center;
    align-items: center
}

.player_full {
  margin-top: 0;
  margin-bottom: 1rem;
  justify-content: center;
  align-items: center;
}

.ul_player_full li{
    list-style-type: none;
    padding: 20px;
    float: left;
}

.player_full li{
    list-style-type: none;
    padding: 15px;
    font-size: 18px;;
}

.player_full{
  /* background: url('https://cdn.sportmonks.com/images//soccer/teams/21/85.png'); */
  background-size: 44%;
  background-repeat: no-repeat;
  background-position: right;
}
</style>