<template>
    <Loading style="margin: 0 auto;" v-if="isLoading"></Loading>
    <b-container class="bv-example-row" v-else>
        <b-row>
            <b-col class="row">
                <PlayerPreview
                v-for="p in players"
                :image="p.picture"
                :id="p.id"
                :name="p.fullname" 
                :teamName="p.team" 
                :position="p.position"
                :key="p.id"></PlayerPreview>
            </b-col>
        </b-row>
    </b-container>  
</template>

<script>
import PlayerPreview from "../../components/PlayerComponents/PlayerPreview.vue"
import Loading from "./../../components/Loading.vue"
export default {
    name: "PlayersPage",
    components: {
        PlayerPreview,
        Loading
    },
    data(){
        return{
            players: [],
            isLoading: true,
        };
    },
    methods:{
        async getPlayers(){
            try {
                const players = JSON.parse(localStorage.getItem('search')).players;
                this.players = []
                players.map((player) => {
                    this.players.push(player);
                });
                this.isLoading = false;
            } catch (error) {
                console.log("error in get players")
                console.log(error);
            }
        }
    },
    created(){
        console.log("get all players");
        this.getPlayers();
    }
}
</script>

<style>
html, body {
    max-width: 100%;
    overflow-x: hidden;
}
</style>