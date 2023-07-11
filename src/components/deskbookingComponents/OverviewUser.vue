<template>
  <v-container>
    <v-row justify="space-around">
      <!-- Title card -->
      <v-col v-for="rounded in [true]" :key="rounded">
        <SheetsTitle text="Overview" icon="mdi-home-outline" />
        <v-sheet id="sheet-main" :rounded="rounded" class="mx-auto">
          <!-- Component to Overview Form -->
          <v-form>
            <v-data-table
              v-model="selected"
              :headers="headers"
              :items="itemsForm"
              sort-by="date"
              class="elevation-1"
              :single-select="singleSelect"
              item-key="name"
              show-select
            >
              <template v-slot:top>
                <v-toolbar flat>
                  <!-- Title -->
                  <v-toolbar-title>My Bookings</v-toolbar-title>

                  <v-spacer></v-spacer>
                  <!-- Sheet Form -->
                  <v-dialog v-model="dialog" max-width="500px">
                    <v-card>
                      <v-card-title>
                        <span class="text-h5">{{ formTitle }}</span>
                      </v-card-title>

                      <!-- Select Item -->
                      <template v-slot:top>
                        <v-switch
                          v-model="singleSelect"
                          label="Single select"
                          class="pa-3"
                        ></v-switch>
                      </template>

                      <!-- Edit Location -->

                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12" sm="6" md="4">
                              <v-select
                                v-model="editedItem.location"
                                label="Location"
                                :items="items"
                                :error-messages="selectErrors"
                                required
                                @change="$v.select.$touch()"
                                @blur="$v.select.$touch()"
                              ></v-select>
                            </v-col>

                            <!-- Edit Date -->
                            <v-col cols="3" sm="10" md="4">
                              <template>
                                <div>
                                  <v-menu
                                    ref="menu"
                                    v-model="menu"
                                    :close-on-content-click="false"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="auto"
                                  >
                                    <template v-slot:activator="{ on, attrs }">
                                      <v-text-field
                                        v-model="date"
                                        label="Date"
                                        prepend-icon="mdi-calendar"
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                      ></v-text-field>
                                    </template>
                                    <v-date-picker
                                      v-model="date"
                                      :active-picker.sync="activePicker"
                                      :min="
                                        new Date(Date.now())
                                          .toISOString()
                                          .substr(0, 10)
                                      "
                                      max="2025-01-01"
                                      @change="updateDate"
                                      @click="editItem(item)"
                                      color="primary"
                                    ></v-date-picker>
                                  </v-menu>
                                </div>
                              </template>
                            </v-col>

                            <v-col cols="12" sm="6" md="4">
                              <v-select
                                v-model="editedItem.period"
                                label="Period"
                              ></v-select>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-text>

                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="close">
                          Cancel
                        </v-btn>
                        <v-btn color="blue darken-1" text @click="save">
                          Save
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                  <!-- Delete Item -->
                  <v-dialog v-model="dialogDelete" max-width="500px">
                    <v-card>
                      <v-card-title class="text-h5"
                        >Are you sure you want to delete this
                        item?</v-card-title
                      >
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="closeDelete"
                          >Cancel</v-btn
                        >
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="deleteItemConfirm"
                          >OK</v-btn
                        >
                        <v-spacer></v-spacer>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-toolbar>
              </template>
              <template v-slot:[`item.actions`]="{ item }">
                <!-- Icon Edit  -->
                <v-icon small class="mr-2" @click="editItem(item)">
                  mdi-pencil
                </v-icon>
                <!-- Icon Delete -->
                <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
              </template>
              <template v-slot:no-data>
                <v-btn color="primary" @click="initialize"> Reset </v-btn>
              </template>
            </v-data-table>
          </v-form>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SheetsTitle from "../atoms/SheetsTitle.vue";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { format, parseISO } from "date-fns";


export default {
  mixins: [validationMixin],

  validations: {
    select: { required },
    date: { required },
  },

  data: () => ({
    components: {
      SheetsTitle,
    },
    activePicker: null,
    date: null,
    menu: false,

    singleSelect: false,
    selected: [],
    items: ["Austin", "London", "Rotterdam", "Sydney", "Zurich"],
    period: ["All Day", "Morning", "Afternoon"],
    dialog: false,
    dialogDelete: false,
    menu2: false,
    headers: [
      { text: "Location", value: "location" },
      { text: "Date", value: "date", align: "start" },
      { text: "Period", value: "period" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    itemsForm: [],
    editedIndex: -1,
    editedItem: {
      location: "",
      date: "",
      period: "",
    },
    defaultItem: {
      location: "",
      date: "",
      period: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },

    computedDateFormattedDatefns() {
      return this.date ? format(parseISO(this.date), "EEEE, MMMM do yyyy") : "";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  menu(val) {
    val && setTimeout(() => (this.activePicker = "YEAR"));
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.itemsForm = [
        {
          location: "Austin",
          date: "Today",
          period: "All Day",
        },
        {
          location: "London",
          date: "Tomorrow",
          period: "All Day",
        },
        {
          location: "Austin",
          date: "24 Nov",
          period: "Morning",
        },
        {
          location: "London",
          date: "26 Nov",
          period: "Morning",
        },
        {
          location: "London",
          date: "29 Nov",
          period: "Afternoon",
        },
        {
          location: "Sydney",
          date: "1 Dec",
          period: "Afternoon",
        },
        {
          location: "Zurich",
          date: "4 Dec",
          period: "Morning",
        },
        {
          location: "Sydney",
          date: "10 Dec",
          period: "Morning",
        },
        {
          location: "Zurich",
          date: "12 Dec",
          period: "Afternoon",
        },
        {
          location: "Zurich",
          date: "17 Dec",
          period: "All Day",
        },
      ];
    },

    methods: {
      saveDate() {
        // update the edited item's date property with the selected date
        this.editedItem.date = this.date;
        // do other things with the selected date as needed
      },
      editItem(item) {
        // Definir o item atualmente editado
        this.editItem = item;
      },
    },

    selectErrors() {
      const errors = [];
      if (!this.$v.select.$dirty) return errors;
      !this.$v.select.required && errors.push("Item is required");
      return errors;
    },

    editItem(item) {
      this.editedIndex = this.itemsForm.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.itemsForm.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.itemsForm.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.itemsForm[this.editedIndex], this.editedItem);
      } else {
        this.itemsForm.push(this.editedItem);
      }
      this.close();
    },

    saveDate(date) {
      this.$refs.menu.save(date);
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

.delete-button {
  display: grid;
  grid-auto-flow: column;
  justify-content: start;
  margin: 0.5rem;
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
</style>
