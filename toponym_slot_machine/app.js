import pcas_json from "./pcas-code.json" assert { type: "json" };
import pcas from "./pcas.js";
const { createApp, ref } = Vue;
const app = createApp({
  el: "#app",
  data() {
    return {
      json: pcas_json,
      ShengIsLocked: false,
      ShiIsLocked: false,
      XianIsLocked: false,
    };
  },
  methods: {
    roll() {
      if (!this.ShengIsLocked) {
      }
      let keys = Object.keys(this.json);
      console.log(keys);
    },
    rollOnSheng() {},

    rollOnShi() {},

    rollOnXian() {},
  },
  components: {
    pcas,
  },
});
app.use(ElementPlus);
app.mount("#app");
