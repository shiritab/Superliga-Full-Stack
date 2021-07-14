<template>
    <Loading style="margin: 0 auto;" v-if="isLoading"></Loading>
    <b-container v-else>
        <b-row>
            <b-col class="row">
                <TeamPreview
                v-for="t in teams"
                :symbol="t.team_symbol"
                :id="t.team_id"
                :name="t.team_name"
                :twitter="t.team_twitter"
                :key="t.team_id"></TeamPreview>
            </b-col>
        </b-row>  
    </b-container>
</template>

<script>
import TeamPreview from "../../components/TeamComponents/TeamPreview.vue"
import Loading from "./../../components/Loading.vue"
export default {
    name: "TeamsPage",
    components: {
        TeamPreview,
        Loading
    },
    data(){
        return{
            teams: [],
            isLoading: true,
        };
    },
    methods:{
        async getTeams(){
            try {
                const teams = JSON.parse(localStorage.getItem('search')).teams;
                this.teams = []
                teams.map((team) => {
                    this.teams.push(team);
                });
                this.isLoading = false;
            } catch (error) {
                console.log("error in get teams")
                console.log(error);
            }
        }
    },
    created(){
        console.log("get all teams");
        this.getTeams();
    }
}
</script>

<style>
</style>