<template>
  <div class="player-search-container">
    <router-link :to="{ name: 'player ticket', params:{playerId:id}}"> 
        <b-card :img-src="picture" img-alt="player card" img-left class="mb-3">
            <b-row>
                <b-col>
                    <b-card-text>
                        {{fullname}}
                    </b-card-text>
                </b-col>
                <b-col class="details">Team: {{team}}</b-col>
                <b-col class="details">Position: {{position}}</b-col>
            </b-row>
        </b-card>
    </router-link>
  </div>
</template>

<script>
export default {
name: "PlayerSearch",
    props:{
        id:{
            type: Number,
            require: true
        },
        fullname: {
            type: String,
            require: true
        },
        picture: {
            type: String,
            require: true
        },
        team:{
            type: String,
            require: true
        },
        position:{
            type: Number,
            require: true
        }
    }
}
</script>

<style>
.player-search-container{
    width: fit-content;
}


.player-search-container .mb-3 {
    width:795px;
    height: 80px;
    transition: outline 0.6s linear;
    background-color: rgba(223, 231, 216,0.9);
}

.player-search-container .mb-3:hover{
    outline: solid 5px #707a72;
    outline-width: 5px;
}

.details{
    color: rgb(83, 156, 122);
    font-size: 20px;;
}

a {
    color: rgb(83, 156, 122);
}

a:hover{
    color: rgb(45, 107, 78);
    text-decoration: none;
}
</style>