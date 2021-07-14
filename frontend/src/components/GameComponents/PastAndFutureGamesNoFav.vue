<template>
  <div>
    <h4>Past fixures:</h4>
    <b-table fixed striped hover :items="past_games" :fields="past_fields">
        <template #cell(time)="data">
            {{(parseInt(data.item.time.substr(0,2))-2).toString() + data.item.time.substr(2,4)}}
        </template>
        <template #cell(events)="data">
            <b-button @click="data.toggleDetails">Show</b-button>
        </template>
        <template #row-details="row">
                <b-table v-if="row.item.events" fixed striped hover :items="row.item.events" :fields="events_field">
                </b-table>
                <b v-else><p style="text-align:center;">No events occurred yet</p></b>
        </template>
        <template #cell(home_team)="data">
            <router-link class="links" :to="{ name: 'team ticket', params:{teamId: data.item.home_team_id}}">
                {{data.item.home_team}}
            </router-link>
        </template>
        <template #cell(away_team)="data">
            <router-link class="links" :to="{ name: 'team ticket', params:{teamId: data.item.away_team_id}}">
                {{data.item.away_team}}
            </router-link>
        </template>
    </b-table>
    <h4>Future fixtures:</h4>
    <b-table fixed striped hover :items="future_games" :fields="future_fields">
        <template #cell(time)="data">
            {{(parseInt(data.item.time.substr(0,2))-2).toString() + data.item.time.substr(2,4)}}
        </template>
        <template #cell(home_team)="data">
            <router-link class="links" :to="{ name: 'team ticket', params:{teamId: data.item.home_team_id}}">
                {{data.item.home_team}}
            </router-link>
        </template>
        <template #cell(away_team)="data">
            <router-link class="links" :to="{ name: 'team ticket', params:{teamId: data.item.away_team_id}}">
                {{data.item.away_team}}
            </router-link>
        </template>
    </b-table>
  </div>
</template>

<script>
export default {
    name: "PastAndFutureGamesNoFav",
    props:{
        past_games:{
            type: Array,
            require: true
        },
        future_games:{
            type: Array,
            require: true
        },
    },
    data(){
        return{
            past_fields: [
                {key:"date",sortable:true},
                {key:"time",sortable:true},
                "field",
                {key:"home_team",sortable: true},
                "home_goal",
                "away_goal",
                {key:"away_team",sortable:true},
                "events"],
            future_fields: [
                {key:"date",sortable:true},
                {key:"time",sortable:true},
                "field",
                {key:"home_team",
                sortable: true},
                {key:"away_team",sortable:true}],
            events_field: ["date","time","minute","eventType","player"],
        }
    },
}
</script>

<style>
.links{
    color: rgb(24, 36, 16);
}

.links:hover{
    color: rgb(51, 78, 33);
}
</style>