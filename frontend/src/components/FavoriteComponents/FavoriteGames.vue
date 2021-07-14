<template>
  <div>
    <b-table fixed striped hover :items="games" :fields="gameFields">
      <template #cell(time)="data">
            {{(parseInt(data.item.time.substr(0,2))-2).toString() + data.item.time.substr(2,4)}}
        </template>
      <template #cell(home_team)="data">
        <img style="width:28%;" :src="data.item.home_team_logo"> {{data.item.home_team}}
      </template>
      <template #cell(away_team)="data">
        <img style="width:28%;" :src="data.item.away_team_logo"> {{data.item.away_team}}
      </template>
      <template #cell(favorite)>
        <b-icon-heart-fill font-scale="1.5" variant="danger"></b-icon-heart-fill>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  name: "FavoriteGames",
  data() {
    return {
      games: [],
      gameFields: ["date","time","field","home_team","away_team","favorite"],
    };
  },
  methods: {
    async getGames(){
      console.log("response");
      try {
        const response = await this.axios.get(
          "http://localhost:3000/users/favoriteGames",
        );
        console.log(response);
        const games = response.data;
        this.games = [];
        games.map((game) =>{
          this.games.push(game);
        })
        console.log(response);
        this.$emit('loaded', true);
      } catch (error) {
        console.log("error in favorite games")
        console.log(error);
      }
    }
  }, 
  mounted(){
    console.log("favorite games created");
    this.getGames(); 
  }
};
</script>

<style></style>
