<template>
  <v-app>
    <v-main id="main">
      <v-container fluid>
      <SheetsTitle text="Booking History" icon="mdi-history" class="Title"/>
        <OverviewUserHistory />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import OverviewUserHistory from "@/components/deskbookingComponents/OverviewUserHistory.vue";
import SheetsTitle from "@/components/util/SheetsTitle.vue";

export default {
  data: () => ({ drawer: null }),
  components: {
    OverviewUserHistory,
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

#sheet-main {
  display: grid;
  grid-auto-flow: column;
  margin-left: start auto;
}
</style>
