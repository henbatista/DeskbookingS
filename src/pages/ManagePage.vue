<template>
  <v-app>
    <v-main id="main">
      <v-container class="container" fluid>
        <SheetsTitle text="Manage" icon="mdi-cog-outline" class="Title" />
          <template  >
            <v-card class="icon">
              <v-tabs  >
                <v-tab class="tab">
                  <v-icon class="icon" left> mdi-lock </v-icon>
                  Block Desks
                </v-tab>
                <v-tab class="tab">
                  <v-icon class="icon" le ft> mdi-information-variant-circle-outline </v-icon>
                  General Information
                </v-tab>
                <v-tab class="tab">
                  <v-icon class="icon" left> mdi-chart-box-outline </v-icon>
                  Attendance Report
                </v-tab>
                <v-tab class="tab">
                  <v-icon class="icon" left> mdi-office-building-marker-outline </v-icon>
                  Office Properties 
                </v-tab>
                <!-- Block Desk Booking Component -->
                <v-tab-item class="icon">
                  <v-card flat>
                    <v-card-text >
                      <BlockDeskBooking />
                    </v-card-text>
                  </v-card>
                </v-tab-item>
                <!-- General Information Component -->
                <v-tab-item>
                  <v-card flat>
                    <v-card-text>
                      <GeneralInformation />
                    </v-card-text>
                  </v-card>
                </v-tab-item>
                <!-- General Information Component -->
                <v-tab-item>
                  <v-card flat>
                    <v-card-text>
                      <AttendanceReport />
                    </v-card-text>
                  </v-card>
                </v-tab-item>
                <!-- Office Properties n Component -->
                <v-tab-item>
                  <v-card flat>
                    <v-card-text>
                      <OfficeProperties />
                    </v-card-text>
                  </v-card>
                </v-tab-item>
              </v-tabs>
            </v-card> 
          </template>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import BlockDeskBooking from "@/components/deskbookingComponents/BlockDeskBooking.vue";
import GeneralInformation from "@/components/deskbookingComponents/GeneralInformation.vue";
import AttendanceReport from "@/components/deskbookingComponents/AttendanceReport.vue";
import OfficeProperties from "@/components/deskbookingComponents/OfficeProperties.vue";
import SheetsTitle from "@/components/util/SheetsTitle.vue";

export default {
  data: () => ({
    tab: null,
  }),
  components: {
    BlockDeskBooking,
    SheetsTitle,
    GeneralInformation,
    AttendanceReport,
    OfficeProperties,
  },
};
</script>

<style lang="scss" scoped>
#main {
  background-color: #f7f8fa;
}

.Title{
  padding-bottom: 1.5rem;
}

.container{
  padding: 1.5rem;
}

.icon{
  color: #b8fc3c;
}

.tab{
  color: #03035e;
}


</style>
