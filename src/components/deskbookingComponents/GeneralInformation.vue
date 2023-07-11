<template>
  <v-container>
    <v-row justify="space-around">
      <!-- General Information Form -->
      <v-col v-for="rounded in [true]" :key="rounded">
        <v-sheet id="sheet-main" :rounded="rounded" class="mx-auto">
          <v-form v-model="form" @submit.prevent="onSubmit">
            <!-- Select Office Item -->
            <v-row class="itemSelect">
              <v-col cols="1" md="4">
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
              <v-col sm="6">
                <v-textarea
                  v-model="bookingPolicies"
                  label="Booking Policies"
                  auto-grow
                  rows="6"
                  outlined
                  dense
                  required
                  :rules="[required]"
                  :readonly="loading"
                ></v-textarea>
              </v-col>

              <!-- Save btn Field -->
              <v-btn
                type="submit"
                :loading="loading"
                text
                @click="save"
                class="buttonStylesSave"
                >Save</v-btn
              >
            </v-row>
          </v-form>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    form: false,
    dialog: false,
    select: null,
    items: ["Austin", "London", "Rotterdam", "Sydney", "Zurich"],
    bookingPolicies: "", // Adicionado estado para armazenar o valor do campo "Booking Policies"
  }),

  methods: {
    onSubmit() {
      if (!this.form) return;

      this.loading = true;

      setTimeout(() => (this.loading = false), 2000);
    },
    required(v) {
      return !!v || "Field is required";
    },

    save() {
      // Aqui você pode fazer a lógica para salvar as informações em algum lugar, como um banco de dados ou um servidor.
      const data = {
        items: this.select,
        BookingPolicies: this.bookingPolicies,
      };
      // Neste exemplo, vamos apenas exibir as informações no console.
      console.log(data);
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
.itemSelect {
  display: grid;
  grid-template-columns: 80rem;
}

.buttonStylesSave {
  color: #314156;
  background-color: #b8fc3c;
  width: 2rem;
  margin-left: 26.3rem;
}

.title {
  background: #03035e;
  color: #fff;
}

.card-text {
  color: #314156;
  font-size: 1.5rem;
  justify-items: center;
}
</style>
