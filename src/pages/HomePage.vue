<template>
  <v-app>
    <v-main id="main">
      <v-container fluid>
        <SheetsTitle text="Overview" icon="mdi-home-outline" class="Title" />

        <MainBooking />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import MainBooking from "@/components/deskbookingComponents/MainBooking";
import SheetsTitle from "@/components/util/SheetsTitle.vue";


export default {
  data: () => ({ drawer: null }),
  components: {
    MainBooking,
    SheetsTitle
  },
};
</script>

<style lang="scss" scoped>

.Title{
  margin-left: 0.8rem;
}

#main {
  background-color: #f7f8fa;
}

</style>
