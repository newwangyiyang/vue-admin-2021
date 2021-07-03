import * as filtes from './filters';
const importFilters = (Vue) => {
  Object.keys(filtes).forEach((filter) => {
    Vue.filter(filter, filtes[filter]);
  });
};

export default importFilters;
