(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective);

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      found: '<',
      onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'foundCtrl',
    bindToController: true,
    transclude: true
  };

  return ddo;
}

function FoundItemsDirectiveController() {
  var list = this;
  list.found = [];

  list.isEmpty = function () {
    return list.found.length === 0;
  };

}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {

  var ctrl = this;

  ctrl.searchTerm = "";

  ctrl.getItems = function () {
    var response = MenuSearchService.getMatchedMenuItems();

    response.then(function (result) {

        var items = result.data.menu_items;
        var foundItems = [];

        for (var i = 0; i < items.length; i++) {

          if (items[i].description.toLowerCase().indexOf(ctrl.searchTerm) !== -1) {
            foundItems.push(items[i]);
          }

        }

        ctrl.found = foundItems;

    });
  };

  ctrl.onRemove = function (index) {
    ctrl.found.splice(index, 1);
    console.log(ctrl.found);
  }

  //ctrl.found = MenuSearchService.getMatchedMenuItems(ctrl.searchTerm);

}

MenuSearchService.$inject = ['$http'];
function MenuSearchService ($http) {

  var search = this;

  this.getMatchedMenuItems = function () {
    var response = $http({
      method: "GET",
      url: ("https://davids-restaurant.herokuapp.com/menu_items.json")
    });

    return response;
  };

}


})();
