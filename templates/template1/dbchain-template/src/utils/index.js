/**
 * @params sortArr 排序的数组 {name:"id",sort:"1"}
 */
export const sortFiledData = (sortArr, sourceData) => {
  const afterOrdering = [];
  sortArr.forEach((item) => {
    let arr = [];
    item.sort;
    sourceData.forEach((i) => {
      arr.push(([item.sort] = i[item.name]));
    });
    afterOrdering.push(arr);
  });
  return afterOrdering;
};
