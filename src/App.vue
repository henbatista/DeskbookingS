<template>
  <div id="app">
    <nav>
      <v-navigation-drawer app>
        <div id="navigation">
          <v-img id="logo" src="../src/assets/motionUp3.png"></v-img>
          <v-list id="list">
            <v-list-item
              v-for="(item, index) in items"
              :key="index"
              link
              @click="redirectToLink(item.link)"
            >
              <v-list-item-icon id="icon-list">
                <v-icon color="primary" size="Dense">{{ item.icon }}</v-icon>
                <v-list-item-title color="primary">{{
                  item.text
                }}</v-list-item-title>
              </v-list-item-icon>
            </v-list-item>
          </v-list>
        </div>
      </v-navigation-drawer>

      <v-container class="avatar" fluid>
        <div>
            <!-- Avatar Header -->
  <v-col id="icons-header">
    <v-row>
      <v-avatar color="primary" size="48">
        <v-img
          id="img-avatar"
          src="https://avatars.githubusercontent.com/u/85231417?v=4"
        />
      </v-avatar>
    </v-row>
  </v-col>
        </div>
      </v-container>
    </nav>
    <router-view />
  </div>
</template>

components: { HeaderGlobal, },

<script>
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
export default {
  data: () => ({

    items: [
      {
        icon: "mdi-home-outline",
        text: "Overview",
        link: { name: "HomePage" },
      },

      {
        icon: "mdi-history",
        text: "Booking History",
        link: { name: "OverviewHistory" },
      },
      {
        icon: "mdi-account-group-outline",
        text: "Meeting Rooms",
        link: { name: "RoomMeeting" },
      },
      {
        icon: "mdi-chart-bell-curve-cumulative",
        text: "Analytics",
        link: { name: "AnalyticsPAge" },
      },
      { icon: "mdi-cog-outline", text: "Manage", link: { name: "ManagePage" } },
    ],
  }),
  methods: {
    redirectToLink(link) {
      const { isNavigationFailure, NavigationFailureType } = VueRouter;
      this.$router.push(link).catch((e) => {
        if (!isNavigationFailure(e, NavigationFailureType.duplicated)) {
          throw Error(e);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
#inspire {
  width: 100%;
}

.avatar {
  background-color: #f7f8fa;
}
#navigation {
  overflow-x: hidden;
  overflow-y: hidden;
}

#logo {
  width: 50%;
  margin-top: 2rem;
  margin-left: 0.7rem;
  overflow: hidden;
}

#main {
  background-color: #f7f8fa;
}

#sheet-main {
  display: grid;
  grid-auto-flow: column;
  margin-left: start auto;
}
#list {
  padding-top: 2rem;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  color: #314156;
}

#icon-list {
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 1rem;
}

#icons-header {
  display: grid;
  grid-auto-flow: column;
  justify-content: end;
}

#img-avatar {
  height: 50px;
  width: 50px;
}
</style>
