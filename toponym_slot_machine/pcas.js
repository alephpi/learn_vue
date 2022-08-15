import pcas_json from "./pcas-code.json" assert { type: "json" };
export default {
  data() {
    return {
      options: pcas_json,
      selectedOptions: [],
    };
  },
  mounted() {},
  methods: {
    handleChange(e, form, thsAreaCode) {
      thsAreaCode = this.$refs["cascaderAddr"].getCheckedNodes()[0].pathLabels; // 注意2： 获取label值
      console.log(thsAreaCode); // 注意3： 最终结果是个一维数组对象
      console.log(thsAreaCode[0] + thsAreaCode[1] + thsAreaCode[2]);
    },
  },
  template: `
            <div>
            <el-cascader ref="cascaderAddr" :options="options" v-model="selectedOptions" @change="handleChange"></el-cascader>
            </div>
            `,
};
