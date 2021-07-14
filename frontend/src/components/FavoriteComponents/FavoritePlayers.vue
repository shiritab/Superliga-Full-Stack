<template>
  <div>
    <b-table fixed striped hover :items="players" :fields="playerFields">
      <template #cell(image)="data">
          <router-link id="player_name" :to="{ name: 'player ticket', params:{playerId: data.item.id}}">
            <img :src="data.item.image" class="player_img">
          </router-link>
      </template>
      <template #cell(name)="data">
          <router-link id="player_name" :to="{ name: 'player ticket', params:{playerId: data.item.id}}">
            {{data.item.name}}
          </router-link>
      </template>
      <template #cell(favorite)>
        <b-icon-heart-fill font-scale="1.5" variant="danger"></b-icon-heart-fill>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  name: "FavoritePlayers",
  data() {
    return {
      players: [],
      playerFields: ["image","name","team","position","favorite"],
    };
  },
  methods: {
    async getPlayers(){
      console.log("response");
      try {
        const response = await this.axios.get(
          "http://localhost:3000/users/favoritePlayers",
        );
        console.log(response);
        const players = response.data;
        this.players = [];
        players.map((player) =>{
          this.players.push(player);
        })
        console.log(response);
        this.$emit('loaded',true);
      } catch (error) {
        console.log("error in favorite players")
        console.log(error);
      }
    }
  }, 
  created(){
    console.log("favorite players created");
    this.getPlayers(); 
  }
};
</script>

<style>
.player_img{
  width:28%;
}
</style>
