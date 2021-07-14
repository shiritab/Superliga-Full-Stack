<template>
  <div class="search-body">
      <form class="form-inline d-flex justify-content-center md-form form-sm active-cyan-2 mt-2">
        <input v-model="searchQuery" style="background-color: rgba(223, 231, 216,0.95)" class="form-control form-control-sm mr-3 w-50" type="text" placeholder="Search"
          aria-label="Search">
        <i class="fas fa-search" aria-hidden="true"></i>
        <b-icon-search style="color: white"></b-icon-search>
      </form>
      <ul class="containter">
        <li class="results">
          <div v-if="selected=='Teams' | !(selected=='Teams' || selected=='Players')">
            <TeamSearch v-for="t in filteredTeams"
                :symbol="t.team_symbol"
                :id="t.team_id"
                :name="t.team_name"
                :key="t.team_id"
            ></TeamSearch>
          </div>
          <div v-if="selected=='Players' | !(selected=='Teams' || selected=='Players')">
            <PlayerSearch v-for="p in filteredPlayers"
              :picture="p.picture"
              :id="p.id"
              :fullname="p.fullname"
              :team="p.team"
              :position="p.position"
              :key="p.id"></PlayerSearch>
          </div>
          <div id="noResults" v-if="filteredPlayers.length == 0 && filteredTeams.length == 0">
            Sorry! no results found
            <b-icon-emoji-dizzy></b-icon-emoji-dizzy>
          </div> 
        </li>
        <li class="elements">
          <div class="filter-by">
            <b-button-group vertical>
              <div style="color: white">Filter
                <b-icon-funnel></b-icon-funnel>
              </div>
              <b-dropdown right text="Filter">
                 <b-form-checkbox-group
                  v-model="selected"
                  :options="options"
                  name="flavour-1a"
                  stacked
                ></b-form-checkbox-group>
                <b-dropdown-divider></b-dropdown-divider>
                <b-form-checkbox-group
                  v-if="selected == 'Players'"
                  v-model="selectedPlayerOption"
                  :options="playerOptions"
                  name="flavour-1a"
                  stacked
                >
                  <b-input v-if="selectedPlayerOption.length > 0" v-model="filterOption" placeholder="filter by..."></b-input>
                </b-form-checkbox-group>
              </b-dropdown>
            </b-button-group>
          </div>
          <div class="sort-by">
            <b-dropdown right text="Sort" v-model="sort">
              <b-dropdown-item @click="sort='A to Z'">
                <b-icon-arrow-down></b-icon-arrow-down>
                A to Z
              </b-dropdown-item>
              <b-dropdown-item @click="sort='Z to A'">
                <b-icon-arrow-down></b-icon-arrow-down>
                Z to A
              </b-dropdown-item>
              <b-dropdown-item v-if="selected=='Players'" @click="sort='A to Z team'">
                <b-icon-arrow-down></b-icon-arrow-down>
                Team's name A to Z
              </b-dropdown-item>
              <b-dropdown-item v-if="selected=='Players'" @click="sort='Z to A team'">
                <b-icon-arrow-down></b-icon-arrow-down>
                Team's name Z to A
              </b-dropdown-item>
            </b-dropdown>
          </div>
        </li>
      </ul>
  </div>
</template>

<script>
import TeamSearch from "../components/SearchComponents/TeamSearch.vue"
import PlayerSearch from "../components/SearchComponents/PlayerSearch.vue"
export default {
  name: "SearchPage",
  components:{
    TeamSearch,
    PlayerSearch
  },
 data() {
    return {
      searchQuery:"",
      teams: [],
      players: [],
      teams_results: [],
      players_results: [],
      selected: [],
      selectedPlayerOption: [],
      sort: null,
      playerOptions:[
        {text: 'Team', value:'Team'},
        {text: 'Position', value: 'Position'}
      ],
      options:[
        {text: 'Players', value: 'Players'},
        {text: 'Teams', value: 'Teams'}],
      filterOption: "",
    };
  },
  methods:{
    getSearchData(){
      if(this.$root.store.username){
        const player_search = JSON.parse(sessionStorage.getItem("player_search"));
        const team_search = JSON.parse(sessionStorage.getItem("team_search"));
        if(player_search){
          this.searchQuery = player_search.query;
          this.selected = player_search.selected;
          this.selectedPlayerOption = player_search.playerOption;
          this.sort = player_search.sort;
          this.filterOption = player_search.filterOption;
        }
        if(team_search){
          this.searchQuery = team_search.query;
          this.selected = team_search.selected;
          this.sort = team_search.sort;
        }
      }
      var search = JSON.parse(localStorage.getItem("search"));
      console.log(search);
      this.teams_results = search.teams;
      this.players_results = search.players;
    },
    playerClickedFunc(){
      if(this.playerClicked == true){
        this.playerClicked = false;
      }
      else{
        this.playerClicked=true;
      }
    },
    teamClickedFunc(){
      if(this.teamClicked == true){
        this.teamClicked = false;
      }
      else{
        this.teamClicked=true;
      }
    },
    sortFunc: function(object, biggerValue, smallerValue){
      function compare(a, b) {
            if (a.team_name < b.team_name)
              return smallerValue;
            if (a.team_name > b.team_name)
              return biggerValue;
            return 0;
      };
      return object.sort(compare);
    },
    sortByPlayer: function(object, biggerValue, smallerValue, playerSearch){
      function comparePlayer(a, b) {
        if (a.fullname < b.fullname)
          return smallerValue;
        if (a.fullname > b.fullname)
          return biggerValue;
        return 0;
      };
      function compareTeam(a,b){
        if (a.team < b.team)
              return smallerValue;
            if (a.team > b.team)
              return biggerValue;
            return 0;
      };
      if(playerSearch){return object.sort(comparePlayer);}
      else{return object.sort(compareTeam)}
    }
  },
  computed:{
    filteredTeams: function(){
      var teams = this.teams_results.filter((team) => {
        return team.team_name.toLowerCase().includes(this.searchQuery.toLowerCase())
      });
      if(this.sort==="A to Z"){
        teams = this.sortFunc(teams, 1, -1);
      }
      if(this.sort==="Z to A"){
        teams = this.sortFunc(teams, -1, 1);
      }
      if(this.$root.store.username){
        const team_saved_search = {
          query: this.searchQuery,
          sort: this.sort,
          selected: this.selected,
        }
        sessionStorage.setItem("team_search",JSON.stringify(team_saved_search));
      }
      return teams
    },
    filteredPlayers: function() {
      var players = [];
      if(this.selectedPlayerOption == "Team"){
        players = this.players_results.filter((player) => {
          if(!player.team){return false;}
          return player.team.toLowerCase().includes(this.filterOption.toLowerCase())
          && player.fullname.toLowerCase().includes(this.searchQuery.toLowerCase())
        });
      }

      if(this.selectedPlayerOption == "Position"){
        players = this.players_results.filter((player) => {
          if(!player.position){return false;}
          return player.position.toString().includes(this.filterOption) 
          && player.fullname.toLowerCase().includes(this.searchQuery.toLowerCase())
        });
      }
      if(this.selectedPlayerOption.length == 0){
        players = this.players_results.filter((player) => {
          return player.fullname.toLowerCase().includes(this.searchQuery.toLowerCase())
        });
      }
      if(this.sort==="A to Z"){
        players = this.sortByPlayer(players, 1, -1, true);
      }
      if(this.sort==="Z to A"){
        players = this.sortByPlayer(players, -1, 1, true);
      }
      if(this.sort==="A to Z team"){
        players = this.sortByPlayer(players, 1, -1, false);
      }
      if(this.sort==="Z to A team"){
        players = this.sortByPlayer(players, -1, 1, false);
      }
      if(this.$root.store.username){
        const player_saved_search = {
          query: this.searchQuery,
          selected: this.selected,
          sort: this.sort,
          playerOption: this.selectedPlayerOption,
          filterOption: this.filterOption,
        }
        sessionStorage.setItem("player_search",JSON.stringify(player_saved_search));
      }
      return players
    },
  },
  created(){
    console.log("search was created");
    this.getSearchData();
  }
}
</script>

<style scoped>
.form-inline {
  display: flex;
  justify-content: center;
  padding-top: 30px;
  align-content: center;
}

.form-control{
  border-top-style: hidden;
  border-right-style: hidden;
  border-left-style: hidden;
}

.active-cyan-2 input.form-control[type=text]:focus:not([readonly]) {
  border-bottom: 3px solid #707a72;
  border-top: 0px;
  border-right: 0px;
  border-left: 0px;
  box-shadow: 0 3px 0 0 #707a72;
}
.active-cyan input.form-control[type=text] {
  border-bottom: 3px solid #707a72;
  box-shadow: 0 3px 0 0 #707a72;
}
.active-cyan .fa, .active-cyan-2 .fa {
  color: #72e281;
}

.containter {
  display: flex;
  justify-content: center;
}

.results {
  width: fit-content;
  list-style: none;
  float: left;
  margin-left: 0px;
  margin-right: 0px;
  padding:0;
  margin-top:20px;
}

.elements{
  width: fit-content;
  display:inline-block;
  list-style: none;
  margin-top:20px;
}

#noResults{
  background-color:rgb(216, 238, 201,0.8);
  width: fit-content;
  font-size: 24px;
  border: 2px solid black;
}

</style>