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
<!-- <template>
  <div class="table">
    <ul class="filed" v-show="currentTable === 'user'">
      <li>
        <span>id </span>
      </li>

      <li>
        <span>created_by </span>
      </li>

      <li>
        <span>created_at </span>
      </li>

      <li>
        <span>tx_hash </span>
      </li>

      <li>
        <span>name </span>
      </li>

      <li>
        <span>age </span>
      </li>
    </ul>

    <ul class="filed" v-show="currentTable === 'student'">
      <li>
        <span>id </span>
      </li>

      <li>
        <span>created_by </span>
      </li>

      <li>
        <span>created_at </span>
      </li>

      <li>
        <span>tx_hash </span>
      </li>

      <li>
        <span>name </span>
      </li>

      <li>
        <span>age </span>
      </li>

      <li>
        <span>count </span>
      </li>
    </ul>
  </div>
</template> -->
<script>
export default {
  props: {
    currentTable: String,
  },
  data() {
    return {};
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
</template> */
}
</style>
