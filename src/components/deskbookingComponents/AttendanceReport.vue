<template>
  <v-container>
    <v-form v-model="form" @submit.prevent="onSubmit">
      <div id="app">
        <v-app>
          <v-data-table :headers="headers" :items="tableData" item-key="name">
            <template v-slot:top>
              <!-- v-container, v-col and v-row are just for decoration purposes. -->
              <v-container fluid>
                <v-row>
                  <!-- Filter for Location-->
                  <v-col>
                    <v-row class="filterField">
                      <v-select
                        v-model="locationFilterValue"
                        :items="locationList"
                        label="Office Location"
                      ></v-select>
                    </v-row>
                  </v-col>

                  <!-- Filter for Room Meeting -->
                  <v-col>
                    <v-row class="filterField">
                      <v-select
                        v-model="periodFilterValue"
                        :items="periodList"
                        label="Period"
                      ></v-select>
                    </v-row>
                  </v-col>

                  <!-- Filter for Name -->
                  <v-col>
                    <v-row class="filterField">
                      <v-select
                        v-model="nameFilterValue"
                        :items="nameList"
                        label="Name"
                      ></v-select>
                    </v-row>
                  </v-col>

                  <v-col>
                    <v-row class="filterField">
                      <!-- Filter for date -->
                      <v-selectmeetingRoomValue
                        label="Date"
                        :rules="[required]"
                        :readonly="loading"
                      ></v-selectmeetingRoomValue>
                    </v-row>
                  </v-col>
                  <v-col>
                    <template>
                      <template>
                        <v-card-text text dark v-bind="attrs" v-on="on">
                          <v-btn
                            type="submit"
                            :disabled="!form"
                            :loading="loading"
                            text
                            @click="generateCSV"
                            class="buttonStyleGenerate"
                          >
                            Generate
                          </v-btn>
                        </v-card-text>
                      </template>
                    </template>
                  </v-col>
                </v-row>
              </v-container>
            </template>
          </v-data-table>
        </v-app>
      </div>
    </v-form>
  </v-container>
</template>

<script>
import { exportCSV } from "../util/csvUtils";

export default {
  data() {
    return {
      dialog: false,

      // Filter list to Meeting Room.
      periodList: [
        { text: "All", value: "" },
        { text: "All Day", value: "All Day" },
        { text: "Morning", value: "Morning" },
        { text: "Afternoon", value: "Afternoon" },
      ],
      // Filter list to Location.
      locationList: [
        { text: "All", value: "" },
        { text: "Austin", value: "Austin" },
        { text: "London", value: "London" },
        { text: "Rotterdam", value: "Rotterdam" },
        { text: "Sydney", value: "Sydney" },
        { text: "Zurich", value: "Zurich" },
      ],
      // Filter list to Name.
      nameList: [
        { text: "All", value: "" },
        { text: "Jonh Doe	", value: "Jonh Doe" },
        { text: "Henrique Batista", value: "Henrique Batista" },
      ],

      locationFilterValue: "",

      periodFilterValue: "",

      dateFilterValue: "",

      nameFilterValue: "",

      // Table data.
      tableData: [
        {
          location: "Austin",
          name: "Jonh Doe",
          period: "All Day",
          dateEnd: "24 Feb",
        },
        {
          location: "Sydney",
          name: "Jonh Doe",
          period: "Morning",
          dateEnd: "24 Feb",
        },
        {
          location: "London",
          name: "Jonh Doe",
          period: "All Day",
          dateEnd: "24 Feb",
        },
        {
          location: "Austin",
          name: "Jonh Doe",
          period: "Afternoon",
          dateEnd: "24 Feb",
        },
        {
          location: "Sydney",
          name: "Jonh Doe",
          period: "Morning",
          dateEnd: "24 Feb",
        },
        {
          location: "Austin",
          name: "Jonh Doe",
          period: "All Day",
          dateEnd: "24 Feb",
        },
        {
          location: "Zurich",
          name: "Jonh Doe",
          period: "Morning",
          dateEnd: "24 Feb",
        },
        {
          location: "Austin",
          name: "Jonh Doe",
          period: "Afternoon",
          dateEnd: "24 Feb",
        },
        {
          location: "London",
          name: "Jonh Doe",
          period: "Afternoon",
          dateEnd: "24 Feb",
        },
        {
          location: "London",
          name: "Jonh Doe",
          period: "Morning",
          dateEnd: "24 Feb",
        },
      ],
    };
  },

  // Filter Header
  computed: {
    headers() {
      return [
        {
          text: "Location",
          align: "left",
          sortable: true,
          value: "location",
          filter: this.locationFilter,
        },
        {
          text: "Period",
          align: "left",
          sortable: true,
          value: "period",
          filter: this.periodFilter,
        },

        {
          text: "Name",
          align: "left",
          sortable: true,
          value: "name",
          filter: this.nameFilter,
        },

        {
          text: "Date",
          value: "dateEnd",
        },
      ];
    },
  },
  form: false,

  methods: {
    /**
     * Filter for location names column.
     * @param value Value to be tested.
     * @returns {boolean}
     */

    onSubmit() {
      if (!this.form) return;

      this.loading = true;

      setTimeout(() => (this.loading = false), 2000);
    },

    generateCSV() {
      const csvData = this.tableData.map((item) => ({
        Location: item.location,
        Period: item.period,
        Name: item.name,
        Date: item.dateEnd,
      }));

      const csvHeaders = Object.keys(csvData[0]);

      exportCSV(csvData, csvHeaders, "data.csv");
    },
    save() {
      if (this.editedIndex === -1) {
        this.items.push(this.editedItem);
      } else {
        this.items.splice(this.editedIndex, 1, this.editedItem);
      }
      this.dialog = false;
    },

    locationFilter(value) {
      // If this filter has no value we just skip the entire filter.
      if (!this.locationFilterValue) {
        return true;
      }

      // Check if the current loop value
      // partially contains the searched word.
      return value.toLowerCase().includes(this.locationFilterValue.toLowerCase());
    },

    /**
     * Filter for Period Room column.
     * @param value Value to be tested.
     * @returns {boolean}
     */
    periodFilter(value) {
      if (!this.periodFilterValue) {
        return true;
      }
      // Check if the current loop value ()
      // partially contains the searched word.
      return value.toLowerCase().includes(this.periodFilterValue.toLowerCase());
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
      // Check if the current loop value
      // partially contains the searched word.
      return value.toLowerCase().includes(this.nameFilterValue.toLowerCase());
    },

    mounted() {
      this.periodFilterValue = "All";
    },
  },
};
</script>

<style>
.card-text {
  color: #314156;
  font-size: 1.5rem;
  margin-top: 1rem;
  justify-items: center;
}

.filterField {
  padding: 0.5rem;
  width: 12rem;
}

.buttonStyleGenerate {
  color: #314156;
  background-color: #b8fc3c;
  padding-bottom: -1rem;
}
</style>
