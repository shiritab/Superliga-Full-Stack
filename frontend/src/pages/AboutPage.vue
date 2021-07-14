<template>
  <b-container class="bv-example-row">
      <b-row>
          <b-card
            title="1st assingnment"
            img-src="https://png.pngitem.com/pimgs/s/133-1336122_grandpa-clipart-happy-old-couple-grandmother-and-grandfather.png"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 20rem;"
            class="mb-2"
          >
            <b-card-text>
              In this assignment we built a web about our grandmothers.
            </b-card-text>
            <b-button-group>
              <b-button href="https://web-development-environments-2021.github.io/204389639/" variant="outline-danger">Guy's website</b-button>
              <b-button href="https://web-development-environments-2021.github.io/316590470/" variant="outline-warning">Shiri's website</b-button>
            </b-button-group>
          </b-card>
          <b-card
            title="2nd assingnment"
            img-src="https://www.pngkit.com/png/full/204-2040666_pacman-logo-download-logo-pac-man-png.png"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 20rem;"
            class="mb-2"
          >
            <b-card-text>
              In this assignment we created a website with a PacMan game.
            </b-card-text>
            <b-button-group>
              <b-button href="https://web-development-environments-2021.github.io/Assignment2_204389639_316590470/" variant="outline-success">Visit our website</b-button>
            </b-button-group>
          </b-card>
          <b-card
            tag="article"
            style="max-width: 20rem;"
            class="mb-2"
            title="About us">
            <b-card-text>
              We are Guy and Shiri, both of us are 3rd year Information System Engineering student at Ben Gurion University
              of The Negev.
            </b-card-text>
          </b-card>
      </b-row>
    </b-container>
</template>

<script>
export default {
    name: "AboutPage",
}
</script>

<style>

</style>