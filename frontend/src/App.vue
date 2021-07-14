<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="success">
      <b-navbar-brand :to="{ name: 'main' }">
        <img src="./assets/soccer.png" class="img-responsive">
        SUPERLIGA
      </b-navbar-brand>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item :to="{ name: 'search' }">Search</b-nav-item>
          <b-nav-item :to="{ name: 'teams' }">Teams</b-nav-item>
          <b-nav-item :to="{ name: 'players' }">Players</b-nav-item>
          <b-nav-item :to="{name: 'current_games' }">Current games</b-nav-item>
          <b-nav-item :to="{name: 'about' }">About</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto" v-if="!$root.store.username">
          <b-nav-text>Hello, guest</b-nav-text>
          <b-nav-item :to="{ name: 'login' }">Login</b-nav-item>
          <b-nav-item :to="{ name: 'register' }">Register</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto" v-else>
          <b-nav-item-dropdown right>
            <template #button-content>
              {{ $root.store.username }}
            </template>
            <b-dropdown-item :to="{ name: 'favoriteTeams'}">
              <b-icon-heart></b-icon-heart> My teams
              </b-dropdown-item>
            <b-dropdown-item :to="{ name: 'favoritePlayers'}">
              <b-icon-heart></b-icon-heart> My players
            </b-dropdown-item>
            <b-dropdown-item :to="{ name: 'favoriteGames'}">
              <b-icon-heart></b-icon-heart> My games
            </b-dropdown-item>
            <b-dropdown-item @click="onLogout">Log Out</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item v-if="$root.store.manageGames" :to="{ name: 'manage'}">
            <b-icon-gear ></b-icon-gear> Manage
          </b-nav-item>

        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    async Logout() {
      await this.axios.post(
        "http://localhost:3000/logout",
      );
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");

      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    },
    onLogout(){
      this.Logout();
    },
  },
};
// window.onbeforeunload = function (e) {
//           var storage = window.localStorage;
//           storage.clear()
//       }
// },

</script>

<style lang="scss">
@import "/frontend/src/scss/form-style.scss";

html, body {
  height: 100%;
}

#app {
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
  background-image: url("./assets/soccer-background-7.jpg");
  background-repeat: no-repeat;
  background-size: 100%;
  background-attachment: fixed;
  background-size: cover;
  // background-color: rgba(204, 229, 153, 0.5);
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.img-responsive {
    height: auto;
    width: auto;
    max-height: 40px;
    max-width: 208px;
}
</style>
