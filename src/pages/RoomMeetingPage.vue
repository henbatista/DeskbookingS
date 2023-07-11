<template>
  <v-app>
    <v-main id="main">
      <v-container fluid>
        <SheetsTitle
          text="Meeting Room"
          icon="mdi-account-group-outline"
          class="Title"
        />
        <RoomMeeting />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import RoomMeeting from "../components/deskbookingComponents/RoomMeeting.vue";
import SheetsTitle from "@/components/util/SheetsTitle.vue";

export default {
  data: () => ({ drawer: null }),
  components: {
    RoomMeeting,
    SheetsTitle,
  },
};
</script>

<style lang="scss" scoped>
.Title {
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
