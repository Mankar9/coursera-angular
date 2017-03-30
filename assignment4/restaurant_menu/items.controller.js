(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemsController', ItemsController);


ItemsController.$inject = ['$stateParams', 'MenuDataService'];
function ItemsController($stateParams, MenuDataService) {
  var categoryItems = this;

  categoryItems.category = $stateParams.category;

  MenuDataService.getItemsForCategory($stateParams.short_name).then(function (result) {
    categoryItems.items = result.data.menu_items;
  });
}

})();
