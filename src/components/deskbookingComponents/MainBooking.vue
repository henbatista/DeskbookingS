<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-container>
    <v-row justify="space-around">
      <!-- Title card -->
      <v-col v-for="rounded in [true]" :key="rounded">
        <v-sheet id="sheet-main" :rounded="rounded" class="mx-auto">
          <v-form v-model="form" @submit.prevent="onSubmit">
            <v-row class="itemSelect">
              <template>
                <div>
                  <v-toolbar-title class="textTitle">My Bookings</v-toolbar-title>
                  <v-spacer></v-spacer>

                  <!-- Dialog Form to New/Edit booking -->
                  <v-dialog v-model="dialog" max-width="700px">
                    <v-card>
                      <v-card-title>
                        <span class="headline">{{ formTitle }}</span>
                      </v-card-title>

                      <v-card-text>
                        <v-container>
                          <v-row>
                            <!-- Location Field -->
                            <v-col cols="12" sm="6" md="4">
                              <v-select
                                v-model="editedItem.location"
                                label="Office Location"
                                :items="dropdownItems"
                                :rules="[required]"
                                :readonly="loading"
                              ></v-select>
                            </v-col>

                            <!-- Period Field -->
                            <v-col cols="12" sm="6" md="4">
                              <v-select
                                v-model="editedItem.period"
                                label="Period"
                                :items="period"
                                :rules="[required]"
                                :readonly="loading"
                              ></v-select>
                            </v-col>

                            <!-- Date Field -->
                            <v-col cols="3" sm="10" md="4">
                              <template>
                                <div>
                                  <v-menu
                                    ref="menu"
                                    v-model="menu"
                                    :close-on-content-click="true"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="auto"
                                  >
                                    <template v-slot:activator="{ on, attrs }">
                                      <v-text-field
                                        v-model="editedItem.date"
                                        label="Date"
                                        prepend-icon="mdi-calendar"
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                        :rules="[required, checkDuplicateDate]"
                                      ></v-text-field>
                                    </template>
                                    <v-date-picker
                                      v-model="editedItem.date"
                                      :active-picker.sync="activePicker"
                                      :min="minDate"
                                      :max="maxDate"
                                      @change="updateDate"
                                      @click="editItem(item)"
                                      color="primary"
                                    ></v-date-picker>
                                  </v-menu>
                                </div>
                              </template>
                            </v-col>

                            <!-- Remind Field -->
                            <v-checkbox
                              class="checkbox"
                              v-model="checkbox"
                              label="Remind me of this reservation?"
                              color="secondary"
                            ></v-checkbox>
                          </v-row>
                        </v-container>
                      </v-card-text>
                      <div class="text-center">
                        <v-dialog v-model="policyDialog" width="900">
                          <template v-slot:activator="{ on, attrs }">
                            <v-card-text dark v-bind="attrs" v-on="on">
                              <span class="click-here">Booking Policy</span>
                            </v-card-text>
                          </template>

                          <v-card>
                            <v-card-title class="title">Policy</v-card-title>
                            <v-card-text class="card-text">Test</v-card-text>

                            <v-divider></v-divider>

                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn color="primary" text @click="policyDialog = false">
                                I accept
                              </v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                      </div>
                      <v-card-actions>
                        <v-spacer></v-spacer>

                        <!-- Cancel BTN  -->
                        <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                        <!-- Save BTN -->
                        <v-btn
                          color="blue darken-1"
                          type="submit"
                          :disabled="!form"
                          :loading="loading"
                          text
                          @click="save"
                        >
                          Save
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>

                  <v-container>
                    <v-btn id="button-style" @click="addNew">New Booking</v-btn>

                    <v-data-table
                      :headers="headers"
                      :items="items"
                      :search="search"
                      :loading="loading"
                      class="elevation-1"
                      :item-class="itemColor"
                    >
                      <template v-slot:[`item.actions`]="{ item }">
                        <!-- Edit  -->
                        <v-icon small class="mr-2" @click="editItem(item)">
                          mdi-pencil
                        </v-icon>
                        <!-- Delete -->
                        <v-alert
                          border="top"
                          color="secondary"
                          dark
                          v-if="showAlert"
                          :type="alertType"
                        >
                          {{ alertMessage }}
                        </v-alert>
                        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
                      </template>
                      <template v-slot:no-data>
                        <v-btn color="primary" @click="initialize">Reset</v-btn>
                      </template>
                    </v-data-table>
                  </v-container>
                </div>
              </template>
            </v-row>
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
      form: false,
      components: {},

      headers: [
        { text: "", value: "quadrate", sortable: false },
        { text: "Office Location", value: "location" },
        { text: "Date", value: "date" },
        { text: "Period", value: "period" },
        { text: "Actions", value: "actions", sortable: false },
      ],

      items: [
        {
          quadrate: "01",
          location: "Austin",
          date: "2023-03-24",
          period: "All Day (7am - 7pm)",
        },
        {
          quadrate: "02",
          location: "London",
          date: "2023-03-25",
          period: "All Day (7am - 7pm)",
        },
        {
          quadrate: "03",
          location: "Austin",
          date: "2023-03-28",
          period: "Morning (7am - 1pm)",
        },
        {
          quadrate: "04",
          location: "London",
          date: "2023-03-29",
          period: "Morning (7am - 1pm)",
        },
        {
          quadrate: "05",
          location: "London",
          date: "2023-04-05",
          period: "Afternoon (1pm - 7pm)",
        },
        {
          quadrate: "06",
          location: "Sydney",
          date: "2023-04-08",
          period: "Afternoon (1pm - 7pm)",
        },
        {
          quadrate: "07",
          location: "Zurich",
          date: "2023-04-12",
          period: "Morning (7am - 1pm)",
        },
        {
          quadrate: "08",
          location: "Sydney",
          date: "2023-04-15",
          period: "Morning (7am - 1pm)",
        },
        {
          quadrate: "09",
          location: "Zurich",
          date: "2023-04-24",
          period: "Afternoon (1pm - 7pm)",
        },
        {
          quadrate: "10",
          location: "Zurich",
          date: "2023-04-26",
          period: "All Day (7am - 7pm)",
        },
      ],
      dropdownItems: ["Austin", "London", "Rotterdam", "Sydney", "Zurich"],

      period: ["All Day (7am - 7pm)", "Morning (7am - 1pm)", "Afternoon (1pm - 7pm)"],

      editedIndex: -1,
      editedItem: {
        location: "",
        date: null,
        period: null,
      },

      defaultItem: {
        location: "",
        date: null,
        period: null,
      },

      search: "",
      loading: false,
      dialog: false,
      policyDialog: false,
      activePicker: null,
      minDate: new Date().toISOString().substr(0, 10),
      maxDate: "2025-01-01",
      itemContagem: {}, // Contador fictício para verificar a contagem de reservas por data
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Booking" : "Edit Booking";
    },
    formItems() {
      // Add the selected item to the form list
      if (this.select) {
        return [...this.colorItems, this.select];
      } else {
        return this.colorItems;
      }
    },
  },

  methods: {
    formatDate(date) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(date).toLocaleDateString(undefined, options);
    },
    checkDuplicateDate(v) {
      // Verifica se já existe uma reserva na mesma data
      const exists = this.items.some((item) => item.date === v);
      return !exists || "There is already a reservation on this date";
    },

    adicionarItem(item) {
      // Verificar se o item existe na contagem
      // eslint-disable-next-line no-prototype-builtins
      if (this.itemContagem.hasOwnProperty(item)) {
        // Incrementar a contagem do item
        this.itemContagem[item]++;
        // Ordenar a tabela por contagem crescente
        this.ordenarTabela();
      }
    },

    ordenarTabela() {
      this.items.sort((a, b) => {
        return this.itemContagem[a.date] - this.itemContagem[b.date];
      });
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

    onSubmit() {
      if (!this.form) return;

      this.loading = true;

      setTimeout(() => (this.loading = false), 2000);
    },

    required(v) {
      return !!v || "Field is required";
    },

    addNew() {
      this.editedItem = Object.assign({}, this.defaultItem);
      this.dialog = true;
    },

    editItem(item) {
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    save() {
      if (this.editedIndex === -1) {
        this.items.push(this.editedItem);
        this.adicionarItem(this.editedItem.date); // Atualiza o contador fictício
      } else {
        const oldDate = this.items[this.editedIndex].date;
        this.items.splice(this.editedIndex, 1, this.editedItem);
        if (oldDate !== this.editedItem.date) {
          this.adicionarItem(this.editedItem.date); // Atualiza o contador fictício
        }
      }
      this.dialog = false;
    },

    deleteItem(item) {
      const index = this.items.indexOf(item);
      if (confirm(`Are you sure you want to delete "${item.location}"?`)) {
        this.loading = true;
        setTimeout(() => {
          this.items.splice(index, 1);
          this.loading = false;
        }, 1000);
      }
    },

    close() {
      this.dialog = false;
    },

    initialize() {
      this.items = [
        {
          quadrate: "01",
          location: "Austin",
          date: "2023-03-24",
          period: "All Day (7am - 7pm)",
        },
        {
          quadrate: "02",
          location: "London",
          date: "2023-03-25",
          period: "All Day (7am - 7pm)",
        },
        {
          quadrate: "03",
          location: "Austin",
          date: "2023-03-28",
          period: "Morning (7am - 1pm)",
        },
        {
          quadrate: "04",
          location: "London",
          date: "2023-03-29",
          period: "Morning (7am - 1pm)",
        },
        {
          quadrate: "05",
          location: "London",
          date: "2023-04-05",
          period: "Afternoon (1pm - 7pm)",
        },
        {
          quadrate: "06",
          location: "Sydney",
          date: "2023-04-08",
          period: "Afternoon (1pm - 7pm)",
        },
        {
          quadrate: "07",
          location: "Zurich",
          date: "2023-04-12",
          period: "Morning (7am - 1pm)",
        },
        {
          quadrate: "08",
          location: "Sydney",
          date: "2023-04-15",
          period: "Morning (7am - 1pm)",
        },
        {
          quadrate: "09",
          location: "Zurich",
          date: "2023-04-24",
          period: "Afternoon (1pm - 7pm)",
        },
        {
          quadrate: "10",
          location: "Zurich",
          date: "2023-04-26",
          period: "All Day (7am - 7pm)",
        },
      ];
      this.itemContagem = {}; // Reinicia o contador fictício

      // Atualiza o contador fictício com base nos dados iniciais
      this.items.forEach((item) => {
        this.adicionarItem(item.date);
      });
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

.itemSelect {
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: 10rem, 200rem;
  grid-gap: 0.2rem;
}

.newBooking {
  color: #b8fc3c;
}

.checkbox {
  padding-left: 0.5rem;
}

#button-style {
  margin-left: 1rem;
  margin-bottom: 1.5rem;
  color: #314156;
  background-color: #b8fc3c;
}
.buttonStyle {
  color: #314156;
  background-color: #b8fc3c;
  margin-top: -1rem;
  margin-left: 50rem;
}
.textTitle {
  margin-left: 2rem;
  margin-top: 2rem;
}

.v-data-table > .v-data-table__wrapper > table {
  border-spacing: 0.7rem !important;
}

td.text-start:first-child {
  margin-bottom: 10px;
}

#gridid .x-grid3-hd-row {
  display: none;
}

.text-start:first-child {
  font-weight: bold;
  border-radius: 10px;
  width: 3rem;
  height: 1rem;
}

.text-start:nth-child(2) {
  font-weight: bold;
  margin-left: 26rem;
}

.clearBlue .text-start:nth-child(2) {
  color: #217efd;
}

.clearBlue .text-start:first-child {
  color: #217efd;
  background: #bae0f5;
}

.clematisMagenta .text-start:nth-child(2) {
  color: #db5aee;
}

.clematisMagenta .text-start:first-child {
  color: #db5aee;
  background: #edb8fa;
}

.wildCaribbeanPink .text-start:nth-child(2) {
  color: #c999af;
}

.wildCaribbeanPink .text-start:first-child {
  color: #c999af;
  background: #ffe5f0;
}

.chineseGoldfish .text-start:nth-child(2) {
  color: #f24822;
}

.chineseGoldfish .text-start:first-child {
  color: #f24822;
  background: #ff9688;
}

.WinterSea .text-start:nth-child(2) {
  color: #77dd77;
}

.WinterSea .text-start:first-child {
  color: #77dd77;
  background: #cfffca;
}

.title {
  background: #314156;
  color: #fff;
}

.click-here {
  font-size: 1.5rem;
  color: primary;
  font-weight: bolder;
}

.card-text {
  color: #314156;
  font-size: 1.5rem;
  margin-top: 1rem;
  justify-items: center;
}

#show-message {
  display: grid;
  grid-auto-flow: column;
  justify-content: start;
  padding-left: 1rem;
  padding-top: 2rem;
  color: #314156;
}
</style>
