  <template>
  <Loading style="margin: 0 auto;" v-if="isLoading"></Loading>
  <div class="container-manage" v-else>
    <b-sidebar id="sidebar-border" sidebar-class="border-right border-danger" title="Manage tools">
      <div class="px-3 py-2">
        <b-icon-plus font-scale="3" @click="showModal('modal-1')" class="rounded-circle bg-success p-2" variant="light" v-b-modal.modal-1>
        </b-icon-plus>
        <b class="button-name"> Game</b>

        <br>
        <b-icon-plus font-scale="3"  class="rounded-circle bg-success p-2" variant="light" >
        </b-icon-plus>
        <b class="button-name"> Event</b>
        
        <br>
        <b-icon-plus font-scale="3" class="rounded-circle bg-success p-2" variant="light">
        </b-icon-plus>
        <b class="button-name"> Result</b>

      </div>
    </b-sidebar>
    <div>
      <!-- modal 1 for Add game -->
      <div>
        <b-modal id="modal-1" @ok="onOk" title="Add new game" >
            <!-- home team and away team inputs -->
            <b-container class="bv-example-row">
              <b-row>
                <b-col>
                    <p> Host </p>
                    <b-form-group>
                    <b-form-select id="homeTeamInput" 
                        v-model="$v.form.home_team_input.$model"
                        :options="teams_list"
                        :state="validateState('home_team_input')">
                      </b-form-select>
                      <b-form-invalid-feedback v-if="!$v.form.away_team_input.required">
                          Away Team is required
                        </b-form-invalid-feedback>
                    </b-form-group>          
                </b-col>
                <b-col>
                    <p> Guest </p>
                    <b-form-group>
                      <b-form-select id="awayTeamInput" 
                      v-model="$v.form.away_team_input.$model"
                      :options="teams_list"
                      :state="validateState('away_team_input')">
                      </b-form-select>
                        <b-form-invalid-feedback v-if="!$v.form.away_team_input.required">
                          Away Team is required
                        </b-form-invalid-feedback>
                        <b-form-invalid-feedback v-else-if="!$v.form.away_team_input.notLikeHome">
                          Away Team cannot be the same as Home Team
                        </b-form-invalid-feedback>
                    </b-form-group>
                </b-col>
              </b-row>
            </b-container>
            <!-- Date input -->
            <b-form-group label="Date">
                <b-form-input id="Date" 
                v-model="$v.form.date.$model"
                type="date"
                :state="validateState('date')">
                </b-form-input>
                  <b-form-invalid-feedback v-if="!$v.form.date.required">
                    Game date is required
                  </b-form-invalid-feedback>
                  <b-form-invalid-feedback v-if="!$v.form.date.minValue">
                    Cannot set a past game
                  </b-form-invalid-feedback>
            </b-form-group>
            <!-- time input -->
            <b-form-group label="Time">
              <b-form-input id="Date" 
              v-model="$v.form.time.$model"
              type="time"
              :state="validateState('time')">
              </b-form-input>
                <b-form-invalid-feedback v-if="!$v.form.time.required">
                  Time date is required
                </b-form-invalid-feedback>
                <b-form-invalid-feedback v-if="$v.form.time.required && !checkRange">
                  Time should be later than 9am but earlier than 9pm
                </b-form-invalid-feedback>
            </b-form-group>
            <!-- Field input -->
            <b-form-group label="Field">
              <b-form-input id="Field_input" 
                v-model="$v.form.field.$model"
                type="text"
                :state="validateState('field')">
              </b-form-input>
              <b-form-invalid-feedback v-if="!$v.form.field.required">
                Game must have a field
              </b-form-invalid-feedback> 
              <b-form-invalid-feedback v-if="!$v.form.field.length">
                Field must have valid name
              </b-form-invalid-feedback> 
            </b-form-group>
        </b-modal>
      </div>
      
    </div>
    <b-button id="edit" variant="outline-success" class="mb-2" v-b-toggle.sidebar-border>
      <b-icon-pencil-square></b-icon-pencil-square> Edit
    </b-button>
    <PastAndFutureGames v-if="!isLoading"
    :past_games="past_games"
    :future_games="futureGames"></PastAndFutureGames>
  </div>
</template>

<script>
import PastAndFutureGames from "../components/GameComponents/PastAndFutureGames.vue"
import Loading from './../components/Loading.vue'


import {
  required,
  minLength,
  maxLength,
  alpha,
  sameAs,
  not
} from "vuelidate/lib/validators";
export default {
    name: "ManageLeague",
    components:{
      PastAndFutureGames,
      Loading
    },
    data(){
        return {
           
          isLoading: true,
          past_games: [],
          future_games: [],
          teams_list: [],
          
          form:{
            home_team_input:'',
            away_team_input:'',
            date:'',
            time:'',
            field:'',
            
          },
         
        }
    },

    validations: {
      form: {
        home_team_input: {
          required
        },
        away_team_input:{
          required,
          notLikeHome: not(sameAs("home_team_input"))
        },
        date:{
          required,
          minValue: value => value > new Date().toISOString()
        },
        time:{
          required,
          checkRange: function(value){
            return (value > "09:00" && value <"21:00");
          }
        },
        field:{
          required,
          length: (value) => minLength(5)(value)
        }
      }
    },
    methods:{
      async getGames(){
        const games = await this.axios.get("http://localhost:3000/league/manage",);
        console.log(games);
        this.past_games = games.data.past_games;
        this.future_games = games.data.future_games;
        this.isLoading = false;
      },
      
      getTeams(){
        if(this.$root.store.username){
          let search = JSON.parse(localStorage.getItem("search"));  
          let teams = search.teams;
          // console.log(teams)
          teams.map((team)=>{
            this.teams_list.push(team.team_name);
          })
        }
      },

      showModal: (input) => {
         this.$bvModal.show(input);
        },

      closeModal: () => {
        this.$nextTick(()=>{
          this.$bvModal.hide('modal-1');
        })
        
      },

      validateState(param) {
          const { $dirty, $error } = this.$v.form[param];
          return $dirty ? !$error : null;
        },

      handleOk(){
        this.$v.form.$touch();
        if (this.$v.form.$anyError) {
          return;
        }
        
        this.addNewGameToDB();
      },
      
      onOk(){

        this.handleOk();
      }, 

      async addNewGameToDB() {
        try {
          console.log("hi");
          let team_dict = {}
          let search = JSON.parse(localStorage.getItem("search"));  
          let teams = search.teams;
          console.log("teams");
          console.log(teams);
          teams.map((team)=>{
            // console.log(team);
            team_dict[team.team_name] = team.team_id;
          })
          console.log(team_dict);
          const response = await this.axios.post(
            "http://localhost:3000/league/addGame",
            {
              home_team: team_dict[this.form.home_team_input],
              away_team: team_dict[this.form.away_team_input],
              date: this.form.date,
              time: this.form.time,
              field: this.form.field
            }
          );
          // this.closeModal();
          console.log(response);
          this.$root.toast("addGame", "game added successfully", "success");
          this.future_games.push({
              home_team: this.form.home_team_input,
              away_team: this.form.away_team_input,
              date: this.form.date,
              time: this.form.time,
              field: this.form.field,
              favorite: false,
            });
        } catch (err) {
          console.log(err.response);
          this.$root.toast("Error",err.response.data, "warning");
        }
      }
    },
    computed:{
      futureGames:function(){
        return this.future_games;
      }
    },
    created(){
      console.log("manage created");
      this.getGames();
      this.getTeams();
    }
}

</script>

<style>
.container-manage{
  background-color: rgba(252, 250, 247,0.7);
  width: 80%;
  margin: 0 auto;
}

/* .b-sidebar{
  display: flex;
  flex-direction: column;
  position: fixed !important;
  top: 0;
  height: 100vh;
  max-width: 100% !important;
  height: 100vh !important;
  margin-top: 4.40% !important;
  outline: 0;
  transform: translateX(0);
  width: 11%;
} */

.button-name{
  font-size: 30px;
  white-space: pre;
}

.optionsDiv{
  display: flex;
  margin-bottom: 10px;
}

#sidebar-border{
  width:20%;
}

.teamInput{
  display: inline-block;
  padding: 20px;

}

#edit{
  float: right;
}
</style>