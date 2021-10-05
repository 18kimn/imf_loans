<template>
  <div v-if="isShowing" id="story">
    <CloseButton v-on:click="isShowing = false" />
    <h2 id="projectTitle">The IMF and Global Dispossession</h2>
    <p>
      The IMF’s loan packages require that recipient countries adapt Structural
      Adjustment Programs (SAPs), or macroeconomic policy changes. Although they
      have the stated neutral purpose of ensuring financial stability and loan
      repayment, in reality SAPs are deeply political maneuvers recreating
      imperial relationships in the contemporary era. One such avenue is through
      stipulating countries move towards export of manufactured goods, often to
      countries in the Global North where they are realized as tax revenue and
      profit.
    </p>
    <p>
      This map displays these relationships by showing loan recipient countries
      in red, each recipient’s top five increased export destinations over the
      next five years in blue, and lines connecting these countries to show the
      flow of goods from the Global South to Global North.
    </p>
    <p>
      Zoom in with the mouse wheel or by double-clicking, flick or slowly drag
      to move the map, and change the year displayed through the slider at the
      top of the page.
    </p>
    <p>
      Click
      <a href="https://nathankim.name/projects/imf_loans/">here</a> for a blog
      post on the map,
      <a
        href="https://github.com/18kimn/imf_loans/raw/production/content/text/rendered/paper.pdf"
      >
        here
      </a>
      for a paper on its message, and
      <a href="https://github.com/18kimn/imf_loans">here</a> for the source
      code. Contact Nathan Kim at nathan.kim@yale.edu with any questions.
    </p>
  </div>
  <OpenButton v-else v-on:click="isShowing = true" />
</template>

<script lang="ts">
import CloseButton from './Buttons/CloseButton.vue'
import OpenButton from './Buttons/OpenButton.vue'

export default {
  components: {
    CloseButton,
    OpenButton,
  },
  data() {
    return {
      isShowing: true,
    }
  },
  methods: {},
}
</script>

<style scoped>
#header {
  display: flex;
  justify-content: flex-end;
}

#story {
  width: 52ch;
  max-width: 52ch;
  min-width: 52ch;
  padding: 20px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0px 3px 3px -2px rgb(0 0 0 / 20%),
    0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%);
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  z-index: 2; /* needed for box shadow visibility */
}

#projectTitle {
  margin-top: 0;
}
</style>
