<template>
  <div class="game-preview">
    <b-card>
        <b-card-title class="teams">
          <img :src="hostLogo">
          vs.
          <img :src="guestLogo">
          <div style="float: right">
            <b-icon-heart v-if="$root.store.username && !favorite" @click="setFavorite" font-scale="1.5" ></b-icon-heart>
            <b-icon-heart-fill v-if="$root.store.username && favorite"  font-scale="1.5" variant="danger"></b-icon-heart-fill>
          </div>
        </b-card-title>
        <b-card-text style="font-size: 20px;">
          <ul class="game-details">
            <li>
              <b>Host: </b>{{hostTeam}}
            </li>
            <li>
              <b>Guest: </b>{{guestTeam}}
            </li>
            <li>
              <b>Date: </b>{{date}}
            </li>
            <li>
              <b>Hour: </b>{{(parseInt(hour.substr(0,2))-2).toString() + hour.substr(2,4)}}
            </li>
            <li>
              <b>Field: </b>{{field}}
            </li>
          </ul>
        </b-card-text>
      </b-card>
  </div>
</template>

<script>
export default {
  name: "GamePreview",
  props: {
      id: {
        type: Number,
        required: true
      },
      hostTeam: {
        type: String,
        required: true
      },
      hostLogo:{
        type: String,
        require: true
      },
      guestTeam: {
        type: String,
        required: true
      },
      guestLogo:{
        type: String,
        require: true
      },
      date: {
        type: String,
        required: true
      },
      hour: {
        type: String,
        required: true
      },
      field: {
        type: String,
        required: true
      },
      favorite:{
        type: Boolean,
        require: false,
      }
  }, 
  methods:{
    async setFavorite(){
      try{
        const added = this.axios.post(`
          http://localhost:3000/users/favoriteGames
        `, {
          id: this.id,
        });
        this.favorite = true;
      } catch(error){
        console.log(error);
      }
    }
  },
  mounted(){
    console.log("game preview mounted")
  },
  created(){
    
  } 
};
</script>

<style>
.game-preview {
  display: inline-block;
  width: 350px;
  height: 300px;
  position: relative;
  margin: 10px 10px;
  border-style: solid;
  border-radius: 10px;
  border-width: 5px;
  border-color:rgb(89, 173, 134);
  text-align: center;
}

.game-preview .game-title {
  text-align: center;
  text-transform: uppercase;
  color:  rgb(111, 197, 157);
}

.game-preview .game-content {
  width: 100%;
  overflow: hidden;
}

.teams img{
  width: 20%;
}

.game-details{
  list-style-type: none;
  display:inline;
}
</style>
