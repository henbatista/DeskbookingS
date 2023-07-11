<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-container>
    <v-row justify="space-around">
      <v-col v-for="rounded in [true]" :key="rounded">
        <v-sheet id="sheet-main" :rounded="rounded" class="mx-auto">
          <v-form v-model="form" @submit.prevent="onSubmit">
            <v-row class="itemSelect">
              <template>
                <div>
                  <v-toolbar-title class="textTitle"
                    >Booking History</v-toolbar-title
                  >
                  <v-spacer></v-spacer>
                  <v-container>
                    <v-data-table
                      :headers="headers"
                      :items="items"
                      :search="search"
                      :loading="loading"
                      class="elevation-1"
                      :item-class="itemColor"
                    >
                      <template v-slot:[`item.actions`]> </template>
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
import SheetsTitle from "../util/SheetsTitle.vue";

export default {
  data() {
    return {
      form: false,
      components: {
        SheetsTitle,
      },

      headers: [
        { text: "", value: "quadrate", sortable: false },
        { text: "Office Location", value: "location" },
        { text: "Date", value: "date" },
        { text: "Period", value: "period" },
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

      period: [
        "All Day (7am - 7pm)",
        "Morning (7am - 1pm)",
        "Afternoon (1pm - 7m)",
      ],

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
      activePicker: null,
      minDate: new Date().toISOString().substr(0, 10),
      maxDate: "2025-01-01",
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

    adicionarItem(item) {
      // Verificar se o item existe na contagem
      if (hasOwnProperty(item)) {
        // Incrementar a contagem do item
        // eslint-disable-next-line no-undef
        itemContagem[item]++;
        // Ordenar a tabela por contagem crescente
        // eslint-disable-next-line no-undef
        ordenarTabela();
      }
    },
    itemColor(colorItems) {
      console.log(colorItems);
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

    /// create a new

    addNew() {
      this.editedItem = Object.assign({}, this.defaultItem);
      this.dialog = true;
    },

    /// edit a Item
    editItem(item) {
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    /// save item
    save() {
      if (this.editedIndex === -1) {
        this.items.push(this.editedItem);
      } else {
        this.items.splice(this.editedIndex, 1, this.editedItem);
      }
      this.dialog = false;
    },

    /// delete item
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
</style>
