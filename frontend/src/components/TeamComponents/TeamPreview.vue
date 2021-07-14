<template>
  <div>
      <div class="team-preview">
        <div :title="symbol" class="team-title">
          <router-link :to="{ name: 'team ticket', params:{teamId:id}}">
              <img :src="symbol">
          </router-link>
        </div>
        <ul class="team-content">
            <li>
              <router-link :to="{ name: 'team ticket', params:{teamId:id}}">
                {{name}}
              </router-link></li>
        </ul>
      </div>
  </div>
</template>

<script>
export default {
    name: "TeamPreview",
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
        twitter: {
            type: String,
            require: true
        }
    }
}
</script>

<style>
.team-preview {
  display: inline-block;
  width: 250px;
  height: 250px;
  position: relative;
  margin: 10px 10px;
  border-style: solid;
  border-radius: 10px;
  border-width: 5px;
  border-color:rgb(124, 160, 95);
  background-color: rgba(223, 231, 216,0.8);
}

.team-preview .team-title {
  text-align: center;
  text-transform: uppercase;
  margin-top: 10px;
  color:  rgb(111, 197, 157);
}

.team-preview .team-content {
  width: 100%;
  overflow: hidden;
}

.team-content li{
  list-style-type: none;
  position: relative;
  margin: 10px 10px;
  text-align: center;
  margin-right: 22%;
}

.team-content a {
    color: rgb(83, 156, 122);
    font-size: 25px;
}

.team-content a:hover{
    color: rgb(45, 107, 78);
    text-decoration: none;
    font-size: 25px;
}
</style>