(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'restaurant_menu/templates/home.template.html'
  })
  .state('categories', {
    url: '/categories',
    templateUrl: 'restaurant_menu/templates/categories.template.html',
    controller: 'CategoriesController as categoriesList',
    resolve: {
       items: ['MenuDataService', function (MenuDataService) {
         return MenuDataService.getAllCategories().then(function(result){
           return result.data;
         });
       }]
    }
  })
  .state('items', {
    url: '/item/{short_name}',
    templateUrl: 'restaurant_menu/templates/items.template.html',
    controller: 'ItemsController as itemsCtrl',
    params: {
      category: null
    }
  })
  ;
}

})();
