import Vue from 'vue'

let yearList = ['不限毕业时间',
  new Date().getFullYear() + '年毕业',
  new Date().getFullYear() + 1 + '年毕业',
  new Date().getFullYear() + 2 + '年及以后毕业',
  '1-2年工作经验',
  '3-4年工作经验',
  '5-6年工作经验',
  '7-8年工作经验',
  '8年以上工作经验'];

let typeList = [
  '',
  '实习',
  '校招',
  '社招'
];

let regularList = [
  '',
  '有机会',
  '无机会',
  '暂不确定',
];

Vue.filter('positionFilter', (value, type) => {
  if (type === 'position_graduation_year') {
    return yearList[+value]
  } else if (type === 'position_type') {
    return typeList[+value];
  } else if (type === 'position_regular') {
    return regularList[+value]
  } else if (type === 'create_time') {
    let date = new Date(value);
    let formatDate = date.getFullYear() + "/" + (date.getMonth() - 0 + 1) + "/" + date.getDate();
    return formatDate;
  }
})
