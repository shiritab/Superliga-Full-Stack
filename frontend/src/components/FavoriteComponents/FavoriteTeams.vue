<template>
  <div>
    <b-table fixed striped hover :items="teams" :fields="teamFields" >
      <template #cell(team_name)="data">
        <router-link :to="{ name: 'team ticket', params:{teamId:data.item.team_id}}">
            <img style="width:17%;" :src="data.item.team_symbol"> {{data.item.team_name}}
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
  name: "FavoriteTeams",
  data() {
    return {
      teams: [],
      teamFields: ["team_name","twitter","favorite"],
    };
  },
  methods: {
    async getTeams(){
      console.log("response");
      try {
        const response = await this.axios.get(
          "http://localhost:3000/users/favoriteTeams",
        );
        console.log(response);
        const teams = response.data;
        this.teams = [];
        teams.map((team) =>{
          this.teams.push(team);
        })
        console.log(response);
        this.$emit('loaded', true);
      } catch (error) {
        console.log("error in favorite teams")
        console.log(error);
      }
    }
  }, 
  created(){
    console.log("favorite teams created");
    this.getTeams(); 
  }
};
</script>

<style>
</style>
