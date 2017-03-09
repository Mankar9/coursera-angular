(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];

function LunchCheckController($scope) {

  $scope.dishes = "";

  $scope.checkTooMuch = function () {

    var dishNumber = countDishes($scope.dishes);

    if (dishNumber == 0) {
        $scope.message = "Please enter data first";
    } else if (dishNumber <= 3) {
        $scope.message = "Enjoy!";
    } else {
        $scope.message = "Too Much!";
    }

  };

  function countDishes (dishes) {
    if (dishes.length == 0) { return 0; }
    return dishes.split(",").length;
  }


}

})();
