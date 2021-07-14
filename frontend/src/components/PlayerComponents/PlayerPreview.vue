<template>
  <div>
    <div class="player-preview">
        <div :title="image" class="player-title">
            <router-link  :to="{ name: 'player ticket', params:{playerId:id}}">
                <img :src="image">
            </router-link>
        </div>
        <ul class="player-content">
            <li> 
                <router-link :to="{ name: 'player ticket', params:{playerId:id}}">
                    {{name}}
                </router-link>
            </li>
        </ul>
  </div>
  </div>
</template>

<script>
export default {
    name: "PlayerPreview",
    props:{
        id: {
            type: Number,
            require: true
        },
        name: {
            type: String,
            require: true
        },
        image: {
            type: String,
            require: true
        },
        position: {
            type: Number,
            require: true
        },
        teamName: {
            type: String,
            require: true
        }
    },
    mounted(){
        console.log("player preview mounted")
    } 
}
</script>

<style>
.player-preview {
  display: inline-block;
  width: 250px;
  height: 300px;
  position: relative;
  margin: 10px 10px;
  border-style: solid;
  border-radius: 10px;
  border-width: 5px;
  border-color:cadetblue;
  text-align: center;
  background-color: rgba(223, 231, 216,0.8);
}

.player-preview .player-title {
  text-align: center;
  text-transform: uppercase;
  color:  rgb(111, 197, 157);
}

.player-preview .player-content {
  width: 100%;
  overflow: hidden;
}

.player-content li{
  list-style-type: none;
  position: relative;
  margin: 10px 10px;
  text-align: center;
  margin-right: 22%;
}

.player-content a {
    color: rgb(83, 156, 122);
    font-size: 22px;
    
}

.player-content a:hover{
    color: rgb(45, 107, 78);
    font-size: 22px;
}
</style>