<template>
  <v-container>
    <v-row justify="space-around">
      <!-- General Information Form -->
      <v-col v-for="rounded in [true]" :key="rounded">
        <v-sheet id="sheet-main" :rounded="rounded" class="mx-auto">
          <v-form v-model="form" @submit.prevent="onSubmit">
            <v-row class="itemSelect">
              <!-- Select Office Item -->
              <v-col cols="1" sm="9" md="4">
                <v-select
                  v-model="select"
                  :items="items"
                  label="Office Location"
                  required
                  :rules="[required]"
                  :readonly="loading"
                  color="secondary"
                ></v-select>
              </v-col>

              <!-- Booking Policies Text -->

              <div class="number">
                <v-col class="deskNumber">
                  <v-text-field
                    v-model="numberOfDesks"
                    outlined
                    dense
                    class="textNumber"
                    :rules="[required]"
                    :readonly="loading"
                  ></v-text-field>
                  <div class="text">Number of Desks</div>
                </v-col>
              </div>
              <div class="number">
                <v-col class="deskNumber">
                  <v-text-field
                    v-model="meetingRoomLimit"
                    outlined
                    dense
                    class="textNumber"
                    :rules="[required]"
                    :readonly="loading"
                  ></v-text-field>
                  <div class="text">Suggested meeting room people limit</div>
                </v-col>
              </div>
              <div class="number">
                <v-col class="deskNumber">
                  <v-text-field
                    v-model="acousticPods"
                    outlined
                    dense
                    class="textNumber"
                    :rules="[required]"
                    :readonly="loading"
                  ></v-text-field>
                  <div class="text">Number of acoustic pods</div>
                </v-col>
              </div>

              <v-col>
                <template>
                  <div>
                    <template>
                      <v-card-text dark v-bind="attrs" v-on="on">
                        <v-btn
                          type="submit"
                          :loading="loading"
                          text
                          @click="save"
                          class="buttonStyle"
                        >
                          Save
                        </v-btn>
                      </v-card-text>
                    </template>
                  </div>
                </template>
              </v-col>
            </v-row>
          </v-form>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { required } from "vuelidate/lib/validators";

export default {
  validations: {
    select: { required },
    numberOfDesks: { required },
    meetingRoomLimit: { required },
    acousticPods: { required },
  },

  data: () => ({
    form: false,
    dialog: false,
    select: null,
    items: ["Austin", "London", "Rotterdam", "Sydney", "Zurich"],
    numberOfDesks: "",
    meetingRoomLimit: "",
    acousticPods: "",
    loading: false,
  }),

  computed: {
    selectErrors() {
      const errors = [];
      if (!this.$v.select.$dirty) return errors;
      !this.$v.select.required && errors.push("Item is required");
      return errors;
    },
  },

  methods: {
    onSubmit() {
      if (!this.form) return;
      this.loading = true;
      setTimeout(() => (this.loading = false), 2000);
    },

    save() {
      // Aqui você pode salvar os valores nos campos de texto e select
      const data = {
        select: this.select,
        numberOfDesks: this.numberOfDesks,
        meetingRoomLimit: this.meetingRoomLimit,
        acousticPods: this.acousticPods,
      };
      console.log(data); // Exemplo: exibe os dados no console
    },

    required(v) {
      return !!v || "Field is required";
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
}

.itemSelect {
  display: grid;
  grid-template-columns: auto;
}

.number .textNumber {
  margin-top: -1rem;
  width: 2.6rem;
  height: 1rem;
}

.text {
  margin-left: 1rem;
}

.deskNumber {
  display: grid;
  grid-auto-flow: column;
  justify-items: center;
  justify-content: start;
}

.buttonStyle {
  color: #314156;
  background-color: #b8fc3c;
  margin-left: 14rem;
}
</style>
