<template>
  <div class="team-search-container">
      <router-link :to="{ name: 'team ticket', params:{teamId:id}}">
        <b-card :img-src="symbol" img-alt="team card" img-left class="mb-3">
            <b-card-text class="card-text">
                {{name}}
            </b-card-text>
        </b-card>
    </router-link>
  </div>
</template>

<script>
export default {
name: "TeamSearch",
    props:{
        id:{
            type: Number,
            require: true
        },
        name: {
            type: String,
            require: true
        },
        symbol: {
            type: String,
            require: true
        },
    }
}
</script>

<style>
.team-search-container{
    width: fit-content;
}

.team-search-container .card-text{
    font-size: 20px;
    /* margin-left: 20px; */
}

.team-search-container .mb-3 {
    width:795px;
    height: 70px;
    transition: outline 0.6s linear;
    background-color: rgba(223, 231, 216,0.9);
}

.team-search-container .mb-3:hover{
    outline: solid 5px #707a72;
    outline-width: 5px;
}

a {
    color: rgb(83, 156, 122);
}

a:hover{
    color: rgb(45, 107, 78);
    text-decoration: none;
}


</style>