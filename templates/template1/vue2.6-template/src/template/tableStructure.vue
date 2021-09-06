<template>
  <div class="table">
    {[range $i,$t := .table]}
    <ul class="filed" v-show="currentTable === '{[.name]}'">
      {[range .field]}
      <li>
        <span>{[.name]} </span>
      </li>
      {[end]}
    </ul>
    {[end]}
  </div>
</template>
<script>
export const tableList = {[.table]};

export default {
  props: {
    currentTable: String,
  },
  data() {
    return {
      // list: list,
    };
  },
};
</script>

<style scoped lang="css">
ul {
  display: flex;
  background: #eee;
  width: 100%;
  /* justify-content: space-around; */
  padding: 0;
  border-radius: 10px;
}
ul li {
  width: 20%;
  /* width: 200px; */
  height: 40px;
  line-height: 40px;
  text-align: center;
  list-style: none;
}
.template {
  /* <template>
  <div class="table" name="list = {[.table]}">
    {[range $i,$t := .table]}
    <ul class="filed" v-show="currentTable === '{[.name]}'">
      {[range .field]}
      <li>
        <span>{[.name]} </span>
      </li>
      {[end]}
    </ul>
    {[end]}
  </div>
</template> */
}
</style>
