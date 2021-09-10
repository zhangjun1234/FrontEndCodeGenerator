import { mapState } from "vuex";
export const mixinsTableHeight = {
  data() {
    return {
      TableHeight: document.body.clientHeight - 206,
    };
  },
  computed: {
    ...mapState(["clientHeight"]),
  },
  watch: {
    clientHeight(newd, old) {
      this.TableHeight = newd - 206;
    },
  },
};
