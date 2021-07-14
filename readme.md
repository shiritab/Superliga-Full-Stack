# Assignment-3-3-316590470-204389639

- [Assignment-3-3-316590470-204389639](#assignment-3-3-316590470-204389639)
  - [Navigator](#navigator)
  - [About](#about)
  - [Register](#register)
  - [Login](#login)
  - [Homepage](#homepage)
  - [PlayerTicket](#playerticket)
  - [TeamTicket](#teamticket)
  - [Search](#search)
  - [CurrentGames](#currentgames)
  - [Favorites](#favorites)
  - [LeagueManagement](#leaguemanagement)

## Navigator
- On the navigator you can go to:
  - Search
  - Teams
    - on this page you will find all teams playing on Superliga
  - Players
    - on this page you will find all players playing on Superliga
  - Current games
  - About
  - Login
  - Register
  - Manage
  - My Teams/Players/Games
  - Logout
    - this button will logout logged in user

## About
- on this page you will find some information about us, Guy and Shiri, and also links to our past assignments are attached

## Register
- Back end:
  - route: http://localhost:{port}/Register
  - validation checks will be implemented in front-end.
  - all users who register will be automatically a fan-user(non admin) and therefore their user_type will be 0.
- Front end:
    - this page will let users create a new user to out system, user must provide:
      - username: an alpha input only 3-8 long
      - first name & last name: an alpha input only with white spaces allowed
      - country: a list of existed countries all over the world
      - password: an input with 5-10 long characters with letters, special character and number
      - confirmation password: equal to password
      - email: a valid email
      - picture: a valid url
      *Notice: in order to register, you must fill all fields and press 'regsiter'*

## Login
- Back end:
  - route: http://localhost:{port}/login
  - if you wish to login as an admin then please fill as follow:
      ```
      {
          "username": "Israel"
          "password": "israel1!"
      }
      ``` 
  - if you wish to login as a fan then please fill as follow:
      ```
      {
          "username": "yarden"
          "password": "yardenl1!"
      }
      ```
  - otherwise you may login with another registered user you created yourself.
- Front end:
  - this page will lead registered users to log in our system, user must provide:
        - username: an alpha input only
        - password: a unique input

## Homepage
- route: http://localhost:{port}/

## PlayerTicket
- route: http://localhost:{port}/players/{playerId}/ticketDetails

## TeamTicket
- route http://localhost:{port}/teams/{teamId}/ticketDetails

## Search
- Back end:
  - no filters:
    - route: http://localhost:{port}/search
    - you can filter by "name" only, for example:
      - http://localhost:{port}/search?name=sten
      - will return all teams and players with a name that contains "sten"
  - players filter:
    - route: http://localhost:{port}/search/players
    - you can filter by "name", "position" and team_name" only, for example:
      - http://localhost:{port}/search/players?name=sten&position=1
      - will return all *players* with a name that contains "sten" and have a position_id equals to 1
  - teams filter:
    - route: http://localhost:{port}/search/teams
    - you can filter by "name" only, for example:
      - http://localhost:{port}/search/teams?name=sten
      - will return all *teams* with a name that contains "sten"

- Frond end:
  - search by players:
      on this part you can choose whether or not to
      - use a sort button
      - filter by player's position or player's team's name or player's name 
  - search by teams:
      on this part you can choose whether or not to
      - use a sort button
      - filter by team's name.
  - *Notice: only logged in users may have the privilege of getting last search results*

## CurrentGames
- Back end:
  - route: http://localhost:{port}/league/current_games
- Front end:
  - on this page you will find all games for Superliga - occured already games, and not yet occured games.

## Favorites
- Back end:
  - route for players: http://localhost:{port}/users/favoritePlayers
  - route for games: http://localhost:{port}/users/favoriteGames
  - route for teams: http://localhost:{port}/users/favoriteTeams
- Front end:
  - *bonus* these pages are only valid for registered users only, each one of them contains favorites part accordingly

## LeagueManagement
- Back end:
  - route for manage page: http://localhost:{port}/league/manage
  - route for adding event: http://localhost:{port}/games/addEvent
    - you may add only one event at a time
    - we assumed event can be added only for a game which date's is current and have no results
  - route for adding game: http://localhost:{port}/league/addGame
  - route for adding result: http://localhost:{port}/games/addResult
    - we assumed result can be added only for a game which date's is current and have no results
- Frond end:
  - this page is only valid for users of type 'manager'
    - contains:
      - current games
      - manage tools:
        - creating new game
        - *bonus* creating new event 