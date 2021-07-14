<template>
  <div class="login-container">
    <b-form class="form" @submit.prevent="onLogin">
      <h3>Login</h3>
      <br>

      <!-- username -->
      <b-form-group
        id="input-group-Username"
        label-cols-sm="3"
        label="Username:"
        label-for="Username"
      >
        <b-form-input
          id="Username"
          v-model="$v.form.username.$model"
          type="text"
          :state="validateState('username')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.username.required">
          Username is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="$v.form.username.required && !$v.form.username.alpha">
          Username must contain characters only
        </b-form-invalid-feedback>
      </b-form-group>

      <!-- password -->
      <b-form-group
        id="input-group-Password"
        label-cols-sm="3"
        label="Password:"
        label-for="Password"
      >
        <b-form-input
          id="Password"
          type="password"
          v-model="$v.form.password.$model"
          :state="validateState('password')"
        ></b-form-input>
        <b-form-invalid-feedback>
          Password is required
        </b-form-invalid-feedback>
      </b-form-group>

      <!-- login button -->
      <b-button
        type="submit"
        variant="success"
        style="width:100px;display:block;"
        class="mx-auto w-100"
        >Login</b-button
      >

      <!-- link to register page -->
      <div class="mt-2">
        Do not have an account yet?
        <router-link to="register"> Register in here</router-link>
      </div>
    </b-form>

    <!-- alert from server -->
    <b-alert
      class="mt-2"
      v-if="form.submitError"
      variant="warning"
      dismissible
      show
    >
      Login failed: {{ form.submitError }}
    </b-alert>
  </div>
</template>

<script>
import { required, alpha } from "vuelidate/lib/validators";
export default {
  name: "Login",
  data() {
    return {
      form: {
        username: "",
        password: "",
        submitError: undefined
      }
    };
  },
  validations: {
    form: {
      username: {
        required,
        alpha,
      },
      password: {
        required
      }
    }
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async Login() {
      try {
        console.log("login post");
        const response = await this.axios.post(
          "http://localhost:3000/login",
          {
            username: this.form.username,
            password: this.form.password
          }
        );
        console.log(response);
        console.log(this.$root.store.login);
        this.$root.store.username = this.form.username;
        await this.checkType();
        this.$router.push("/");
      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data;
      }
    },
    async checkType(){
      try{
        const user = await this.axios.get(
          "http://localhost:3000/users/type",
        );
        if(user.data.user_type == 1){
          this.$root.store.manageGames = true;
        }
      } catch(error){
        console.log(error.response);
      }
      
    },
    onLogin() {
      console.log("login method called");
      this.form.submitError = undefined;
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      // console.log("login method go");

      this.Login();
    }
  }
};
</script>
<style lang="scss" scoped>
.login-container {
  max-width: 400px;
  background-color: rgba(214, 235, 203,0.7);
  position: relative;
  margin-top: 5%;
  text-align: center;
  padding: 20px;
}

.login-container a {
    color: #175820;
}

.login-container a:hover{
    color: rgb(83, 156, 122);
}

</style>
