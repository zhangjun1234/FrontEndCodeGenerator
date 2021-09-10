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
      
    };
  },
};
</script>

<style scoped lang="css">
ul {
  display: flex;
  background: #eee;
  width: 100%;
   
  padding: 0;
  border-radius: 10px;
}
ul li {
  width: 20%;
   
  height: 40px;
  line-height: 40px;
  text-align: center;
  list-style: none;
}
</style>
