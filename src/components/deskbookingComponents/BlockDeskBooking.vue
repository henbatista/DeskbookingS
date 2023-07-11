<template>
  <v-container>
    <v-col v-for="rounded in [true]" :key="rounded">
         <!-- Block Desk Form -->
      <v-form v-model="form" @submit.prevent="onSubmit">

          <!-- Location Field -->
        <v-row class="itemSelect">
          <v-col cols="1" sm="9" md="4">
            <v-select
              v-model="select"
              :items="items"
              label="Office Location"
              required
              :rules="[required]"
              :readonly="loading"
              color="secondary"
            >
              <v-col> </v-col
            ></v-select>
          </v-col>

          <v-col cols="1" sm="9" md="4">
            <template>
              <div>
                <v-menu
                  ref="menu"
                  v-model="menu2"
                  :close-on-content-click="true"
                  transition="scale-transition"
                  offset-y
                >

                <!-- Date Field -->
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      label="Select your date"
                      :value="computedDateFormattedDatefns"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      :rules="[required]"
                      @click:clear="date = null"
                      color="secondary"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="date"
                    :active-picker.sync="activePicker"
                    :min="new Date(Date.now()).toISOString().substr(0, 10)"
                    max="2025-01-01"
                    @change="saveDate"
                    color="primary"
                  ></v-date-picker>
                </v-menu>
              </div>
            </template>
          </v-col>
          
          <!-- Period Field -->
          <v-radio-group
            class="v-radio-group"
            label="Period"
            required
            :rules="[required]"
            v-model="radioGroup"
          >
            <v-radio
              class="radio-group"
              label="Morning (7am - 1pm)"
              value="Morning (7am - 1pm)"
              color="secondary"
            ></v-radio>
            <v-radio
              class="radio-group"
              label="Afternoon (1pm - 7pm)"
              value="Aftersecondarynoon (1pm - 7pm)"
              color="secondary"
            ></v-radio>
            <v-radio
              class="radio-group"
              label="All Day (7am - 7pm)"
              value="All Day (7am - 7pm)"
              color="secondary"
            ></v-radio>
          </v-radio-group>

           <!-- Block all desk  -->
          <v-checkbox
            class="v-checkbox"
            v-model="checkbox"
            :error-messages="checkboxErrors"
            label="Do you want to block all the desks?"
            color="secondary"
          ></v-checkbox>

          <!-- Desk Field -->
          <div class="number">
            <v-col>
              <v-text-field
                outlined
                dense
                class="textNumber"
                required
                :rules="[required]"
              ></v-text-field>
            </v-col>
            <div class="textDesk">Of 30 desks</div>
          </div>

          <v-col>
            <template>
              
             <!-- Save btn Field -->
              <v-card-text>
                <v-btn
                  type="submit"
                  :disabled="!form"
                  :loading="loading"
                  text
                  @click="save"
                  class="buttonStyle"
                  >Save</v-btn
                >
              </v-card-text>
            </template>
          </v-col>
        </v-row>
      </v-form>
    </v-col>
  </v-container>
</template>

<script>
import { format, parseISO } from "date-fns";

export default {
  data: () => ({
    form: false,
    dialog: false,
    select: null,
    items: ["Austin", "London", "Rotterdam", "Sydney", "Zurich"],
    checkbox: false,
    date: format(parseISO(new Date().toISOString()), "yyyy-MM-dd"),
    menu2: false,
  }),

  computed: {
    formItems() {
      // Add the selected item to the form's list
      if (this.select) {
        return [...this.items, this.select];
      } else {
        return this.items;
      }
    },

    checkboxErrors() {
      const errors = [];
      return errors;
    },

    computedDateFormattedDatefns() {
      return this.date ? format(parseISO(this.date), "EEEE, MMMM do yyyy") : "";
    },
  },

  methods: {
    submit() {
      this.$v.$touch();
    },

    onSubmit() {
      if (!this.form) return;

      this.loading = true;

      setTimeout(() => (this.loading = false), 2000);
    },
    required(v) {
      return !!v || "Field is required";
    },

    save() {
      if (this.editedIndex === -1) {
        this.items.push(this.editedItem);
      } else {
        this.items.splice(this.editedIndex, 1, this.editedItem);
      }
      this.dialog = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.buttonStyle {
  color: #314156;
  background-color: #b8fc3c;
  margin-top: -1rem;
  margin-left: 13rem;
}
.itemSelect {
  display: grid;
  grid-template-columns: auto;
}

.v-radio-group,
.v-checkbox {
  padding-left: 1rem;
}

.textNumber {
  width: 2.6rem;
  height: 1rem;
}

.textDesk {
  padding-top: 0.5rem;
  margin-left: 0.5rem;
}

.number {
  display: grid;
  grid-auto-flow: column;
  justify-content: start;
}
</style>
