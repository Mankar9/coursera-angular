(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyListController', ToBuyListController)
.controller('BoughtListController', BoughtListController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

// LIST #1 - controller
ToBuyListController.$inject = ['ShoppingListCheckOffService'];
function ToBuyListController(ShoppingListCheckOffService) {

  var list1 = this;

  list1.items =  ShoppingListCheckOffService.getToBuyItems();

  list1.itemBought = function (itemIndex) {
    ShoppingListCheckOffService.itemBought(itemIndex);
  };

}


BoughtListController.$inject = ['ShoppingListCheckOffService'];
function BoughtListController(ShoppingListCheckOffService) {
  var list2 = this;

  list2.items = ShoppingListCheckOffService.getBoughtItems();

  list2.unBuy = function (itemIndex) {
    ShoppingListCheckOffService.unBuy(itemIndex);
  };
}

function ShoppingListCheckOffService() {
  var service = this;

  var toBuyItems = [ { name: "cookies", quantity: 10},
                { name: "apples", quantity: 6},
                { name: "shirts", quantity: 5},
                { name: "dragons", quantity: 2},
                { name: "pens", quantity: 12},
  ];
  var boughtItems = [];

  service.itemBought = function (itemIndex) {
    var item = toBuyItems.splice(itemIndex, 1);
    boughtItems.push(item[0]);
  };

  service.unBuy = function (itemIndex) {
    var item = boughtItems.splice(itemIndex, 1);
    toBuyItems.push(item[0]);
  };

  service.getToBuyItems = function () {
    return toBuyItems;
  };

  service.getBoughtItems = function () {
    return boughtItems;
  };
}


})();
