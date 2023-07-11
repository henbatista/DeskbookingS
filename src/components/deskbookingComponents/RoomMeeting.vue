<template>
  <v-container>
    <v-row justify="space-around">
      <!-- Title card -->
      <v-col v-for="rounded in [true]" :key="rounded">
        <v-sheet id="sheet-main" :rounded="rounded" class="mx-auto">
          <v-form>
            <div id="app">
              <v-app>
                <v-data-table
                  :headers="headers"
                  :items="tableData"
                  item-key="name"
                  class="elevation-1 pa-6"
                  :item-class="itemColor"
                >
                  <template v-slot:top>
                    <!-- v-container, v-col and v-row are just for decoration purposes. -->
                    <v-container fluid>
                      <v-row>
                        <v-col cols="3">
                          <v-row class="pa-2">
                            <!-- Filter for Location-->
                            <v-select
                              v-model="locationFilterValue"
                              :items="locationList"
                              label="Office Location"
                            ></v-select>
                          </v-row>
                        </v-col>
                        <v-col cols="3">
                          <v-row class="pa-2">
                            <!-- Filter for Room Meeting -->
                            <v-select
                              v-model="meetingRoomFilterValue"
                              :items="meetingRoomList"
                              label="Meeting Room"
                            ></v-select>
                          </v-row>
                        </v-col>

                        <v-col cols="3">
                          <v-row class="pa-2">
                            <!-- Filter for Name -->
                            <v-select
                              v-model="nameFilterValue"
                              :items="nameList"
                              label="Name"
                            ></v-select>
                          </v-row>
                        </v-col>

                        <v-col cols="3">
                          <v-row class="pa-2">
                            <!-- Filter for date -->
                            <v-selectmeetingRoomValue
                              label="Date"
                            ></v-selectmeetingRoomValue>
                          </v-row>
                        </v-col>

                        <!-- Save btn Field -->
                        <v-btn
                          type="submit"
                          :loading="loading"
                          text
                          @click="save"
                          class="buttonStyleGenerateRoom"
                          >Generate</v-btn
                        >
                      </v-row>
                    </v-container>
                  </template>
                </v-data-table>
              </v-app>
            </div>
          </v-form>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      components: {},
      // Filter list to Meeting Room.
      meetingRoomList: [
        { text: "All", value: null },
        { text: "Boardroom (Austin)", value: "Boardroom" },
        { text: "Acornroom (London)", value: "Acornroom" },
        { text: "Oakroom (London)", value: "Oakroom" },
        { text: "Harringtonroom (Sydney)", value: "Harringtonroom" },
        { text: "Quayroom (Sydney)", value: "Quayroom" },
        { text: "Uetliberg (Zurich)", value: "Uetliberg" },
      ],
      // Filter list to Location.
      locationList: [
        { text: "All", value: null },
        { text: "Austin", value: "Austin" },
        { text: "London", value: "London" },
        { text: "Rotterdam", value: "Rotterdam" },
        { text: "Sydney", value: "Sydney" },
        { text: "Zurich", value: "Zurich" },
      ],
      // Filter list to Name.
      nameList: [
        { text: "All", value: null },
        { text: "Jonh Doe	", value: "Jonh Doe" },
        { text: "Henrique Batista", value: "Henrique Batista" },
      ],

      locationFilterValue: "",

      meetingRoomFilterValue: "",

      nameFilterValue: "",

      dateFilterValue: "",

      // Table data.
      tableData: [
        {
          location: "Austin",
          meetingRoom: "Boardroom",
          name: "Jonh Doe",
          period: "All Day",
          dateStart: "24 Feb",
          dateEnd: "24 Feb",
          externalMeeting: "Yes",
        },
        {
          location: "Sydney",
          meetingRoom: "Harringtonroom",
          name: "Jonh Doe",
          period: "Morning",
          dateStart: "24 Feb",
          dateEnd: "24 Feb",
          externalMeeting: "Yes",
        },
        {
          location: "London",
          meetingRoom: "Acornroom",
          name: "Jonh Doe",
          period: "All Day",
          dateStart: "24 Feb",
          dateEnd: "24 Feb",
          externalMeeting: "No",
        },
        {
          location: "Austin",
          meetingRoom: "Boardroom",
          name: "Jonh Doe",
          period: "Afternoon",
          dateStart: "24 Feb",
          dateEnd: "24 Feb",
          externalMeeting: "No",
        },
        {
          location: "Sydney",
          meetingRoom: "Quayroom",
          name: "Jonh Doe",
          period: "Morning",
          dateStart: "24 Feb",
          dateEnd: "24 Feb",
          externalMeeting: "Yes",
        },
        {
          location: "Austin",
          meetingRoom: "Boardroom",
          name: "Jonh Doe",
          period: "All Day",
          dateStart: "24 Feb",
          dateEnd: "24 Feb",
          externalMeeting: "No",
        },
        {
          location: "Zurich",
          meetingRoom: "Uetliberg",
          name: "Jonh Doe",
          period: "Morning",
          dateStart: "24 Feb",
          dateEnd: "24 Feb",
          externalMeeting: "Yes",
        },
        {
          location: "Austin",
          meetingRoom: "Boardroom",
          name: "Jonh Doe",
          period: "Afternoon",
          dateStart: "24 Feb",
          dateEnd: "24 Feb",
          externalMeeting: "No",
        },
        {
          location: "London",
          meetingRoom: "Oakroom",
          name: "Jonh Doe",
          period: "Afternoon",
          dateStart: "24 Feb",
          dateEnd: "24 Feb",
          externalMeeting: "No",
        },
        {
          location: "London",
          meetingRoom: "Acornroom",
          name: "Jonh Doe",
          period: "Morning",
          dateStart: "24 Feb",
          dateEnd: "24 Feb",
          externalMeeting: "Yes",
        },
      ],
    };
  },

  // Filter Header
  computed: {
    headers() {
      return [
        {
          text: "Office Location",
          align: "left",
          sortable: true,
          value: "location",
          filter: this.locationFilter,
        },
        {
          text: "Meeting Room",
          align: "left",
          sortable: true,
          value: "meetingRoom",
          filter: this.meetingRoomFilter,
        },

        {
          text: "Name",
          align: "left",
          sortable: true,
          value: "name",
          filter: this.nameFilter,
        },

        { text: "External Meeting", value: "externalMeeting" },

        { text: "Date Start", value: "dateStart" },

        {
          text: "Date End",
          value: "dateEnd",
          filter: this.caloriesFilter,
        },
      ];
    },
  },
  methods: {
    /**
     * Filter for location names column.
     * @param value Value to be tested.
     * @returns {boolean}
     */
    locationFilter(value) {
      // If this filter has no value we just skip the entire filter.
      if (!this.locationFilterValue) {
        return true;
      }

      // Check if the current loop value (The dessert name)
      // partially contains the searched word.
      return value
        .toLowerCase()
        .includes(this.locationFilterValue.toLowerCase());
    },

    itemColor(colorItems) {
      switch (colorItems.location) {
        case "Austin":
          return "clearBlue";
        case "London":
          return "clematisMagenta";
        case "Rotterdam":
          return "wildCaribbeanPink";
        case "Sydney":
          return "chineseGoldfish";
        case "Zurich":
          return "WinterSea";
        default:
          return "black";
      }
    },

    /**
     * Filter for Meeting Room column.
     * @param value Value to be tested.
     * @returns {boolean}
     */
    meetingRoomFilter(value) {
      if (!this.meetingRoomFilterValue) {
        return true;
      }
      // Check if the current loop value (The dessert name)
      // partially contains the searched word.
      return value
        .toLowerCase()
        .includes(this.meetingRoomFilterValue.toLowerCase());
    },

    /**
     * Filter for Name column.
     * @param value Value to be tested.
     * @returns {boolean}
     */
    nameFilter(value) {
      if (!this.nameFilterValue) {
        return true;
      }
      // Check if the current loop value (The dessert name)
      // partially contains the searched word.
      return value.toLowerCase().includes(this.nameFilterValue.toLowerCase());
    },
  },
};
</script>

<style>
#sheet-main {
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto;
  width: 100%;
  margin: 1rem;
}

.buttonStyleGenerateRoom {
  color: #314156;
  background-color: #b8fc3c;
  margin-left: 55rem;
}
#my-booking {
  display: grid;
  grid-template-columns: auto;
  font-size: 1.5rem;
  padding: 1rem;
  justify-content: start;
  font-weight: bold;
  color: #314156;
}

.list-content {
  display: grid;
  grid-auto-flow: column;
  margin-left: 10rem;
  grid-gap: 10rem;
  justify-content: start;
}

.text-left:first-child {
  font-weight: bold;
  border-radius: 10px;
  width: 3rem;
  height: 1rem;
}

.text-left:nth-child(2) {
  font-weight: bold;
  margin-left: 26rem;
}

.clearBlue .text-left:nth-child(2) {
  color: #217efd;
}

.clearBlue .text-left:first-child {
  color: #217efd;
  background: #bae0f5;
}

.clematisMagenta .text-left:nth-child(2) {
  color: #db5aee;
}

.clematisMagenta .text-left:first-child {
  color: #db5aee;
  background: #edb8fa;
}

.wildCaribbeanPink.text-left:nth-child(2) {
  color: #c999af;
}

.wildCaribbeanPink .text-left:first-child {
  color: #c999af;
  background: #ffe5f0;
}

.chineseGoldfish .text-left:nth-child(2) {
  color: #f24822;
}

.chineseGoldfish .text-left:first-child {
  color: #f24822;
  background: #ff9688;
}

.WinterSea .text-left:nth-child(2) {
  color: #77dd77;
}

.WinterSea .text-left:first-child {
  color: #77dd77;
  background: #cfffca;
}
</style>
