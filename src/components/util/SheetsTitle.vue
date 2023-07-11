
<template>
  <div id="container">
    <v-chip id="chips" color="#fff" label>
      <v-btn class="ma-2 Sheet-view" outlined fab>
        <v-icon>
          {{ icon }}
        </v-icon>
      </v-btn>
      {{ text }}
    </v-chip>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      require: true,
    },
    icon: {
      type: String,
      require: true,
    },
  },
};

</script>

<style>
.Sheet-view {
  background: #b8fc3c;
  border: #b8fc3c;
}

#container {
  display: grid;
  grid-template-columns: 300px;
  justify-content: start;
  color: #314156;
}

#chips {
  padding: 2.5rem;
  font-size: 1.3rem;
}
</style>
