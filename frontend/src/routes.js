import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main
  },
  {
    path: "/Register",
    name: "register",
    component: () => import("./pages/AuthorizationPages/RegisterPage")
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./pages/AuthorizationPages/LoginPage")
  },
  {
    path: "/search",
    name: "search",
    component: () => import("./pages/SearchPage")
  },
  {
    path: "/current_games",
    name: "current_games",
    component: () => import("./pages/CurrentGames")
  },
  {
    path: "/favoriteGames",
    name: "favoriteGames",
    component: () => import("./pages/FavoritePages/FavoriteGames.vue")
  },
  {
    path: "/favoriteTeams",
    name: "favoriteTeams",
    component: () => import("./pages/FavoritePages/FavoriteTeams.vue")
  },
  {
    path: "/favoritePlayers",
    name: "favoritePlayers",
    component: () => import("./pages/FavoritePages/FavoritePlayers.vue")
  },
  {
    path: "/manage",
    name: "manage",
    component: () => import("./pages/ManageLeague.vue")
  },
  {
    path: "/about",
    name: "about",
    component: () => import("./pages/AboutPage.vue")
  },
  {
    path: "/players",
    name: "players",
    component: () => import("./pages/PlayerPages/PlayersPage.vue")
  },
  {
    path: "/players/:playerId",
    name: "player ticket",
    component: () => import("./pages/PlayerPages/PlayerTicketPage.vue")
  },
  {
    path: "/teams",
    name: "teams",
    component: () => import("./pages/TeamPages/TeamsPage.vue")
  },
  {
    path: "/teams/:teamId",
    name: "team ticket",
    component: () => import("./pages/TeamPages/TeamTicketPage.vue")
  },
  {
    path: "*",
    name: "notFound",
    component: NotFound
  }
];

export default routes;
