<template>
  <div class="table">
    
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
</template>
<script>
export const tableList = [{"field":[{"fieldType":"string","name":"id"},{"fieldType":"string","name":"created_by"},{"fieldType":"string","name":"created_at"},{"fieldType":"string","name":"tx_hash"},{"fieldType":"string","name":"name"},{"fieldType":"int","name":"age"},{"fieldType":"int","name":"count"}],"name":"student"}];

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
.template {
                      
}
</style>
