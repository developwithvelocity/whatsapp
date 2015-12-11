Projects = new Mongo.Collection("Projects");
Tasks = new Mongo.Collection("Tasks");

if (Meteor.isClient) {

  angular.module('underscore', [])
    .factory('_', function() {
      return window._; // assumes underscore has already been loaded on the page
  });

  var app = angular.module('Whatsapp', [
    'angular-meteor',
    'ui.router',
    'ionic',
    'ngCordova.plugins.datePicker',
    'angularMoment',
    'Whatsapp.controllers',
    'Whatsapp.directives',
    'Whatsapp.filters',
    'Whatsapp.services',
    'Whatsapp.factories',
    'Whatsapp.config',
    'underscore',
    //'ngMap',
    'ngResource',
    'ngCordova',
    //'slugifier',
    //'ionic.contrib.ui.tinderCards',
    //'youtube-embed'
  ]);

  function onReady() {
    angular.bootstrap(document, ['Whatsapp'], {strictDi: true});
  }

  if (Meteor.isCordova) {
    angular.element(document).on("deviceready", onReady);
  }
  else {
    angular.element(document).ready(onReady);
  }


  app.config(['$urlRouterProvider', '$stateProvider',
    function($urlRouterProvider, $stateProvider){

      $stateProvider

      //INTRO
      .state('auth', {
        url: "/auth",
        templateUrl: "client/views/auth/auth.ng.html",
        abstract: true,
        controller: 'AuthCtrl'
      })

      .state('auth.walkthrough', {
        url: '/walkthrough',
        templateUrl: "client/views/auth/walkthrough.ng.html"
      })

      .state('auth.login', {
        url: '/login',
        templateUrl: "client/views/auth/login.ng.html",
        controller: 'LoginCtrl'
      })

      .state('auth.signup', {
        url: '/signup',
        templateUrl: "client/views/auth/signup.ng.html",
        controller: 'SignupCtrl'
      })

      .state('auth.forgot-password', {
        url: "/forgot-password",
        templateUrl: "client/views/auth/forgot-password.ng.html",
        controller: 'ForgotPasswordCtrl'
      })

      .state('app', {
        url: "/app",
        abstract: true,
        templateUrl: "client/views/app/side-menu.ng.html",
        controller: 'AppCtrl'
      })

      //MISCELLANEOUS
      .state('app.miscellaneous', {
        url: "/miscellaneous",
        views: {
          'menuContent': {
            templateUrl: "client/views/app/miscellaneous/miscellaneous.ng.html"
          }
        }
      })

      .state('app.maps', {
        url: "/miscellaneous/maps",
        views: {
          'menuContent': {
            templateUrl: "client/views/app/miscellaneous/maps.ng.html",
            controller: 'MapsCtrl'
          }
        }
      })

      .state('app.image-picker', {
        url: "/miscellaneous/image-picker",
        views: {
          'menuContent': {
            templateUrl: "client/views/app/miscellaneous/image-picker.ng.html",
            controller: 'ImagePickerCtrl'
          }
        }
      })

      //LAYOUTS
      .state('app.layouts', {
        url: "/layouts",
        views: {
          'menuContent': {
            templateUrl: "client/views/app/layouts/layouts.ng.html"
          }
        }
      })

      .state('app.tinder-cards', {
        url: "/layouts/tinder-cards",
        views: {
          'menuContent': {
            templateUrl: "client/views/app/layouts/tinder-cards.ng.html",
            controller: 'TinderCardsCtrl'
          }
        }
      })

      .state('app.slider', {
        url: "/layouts/slider",
        views: {
          'menuContent': {
            templateUrl: "client/views/app/layouts/slider.ng.html"
          }
        }
      })

      //FEEDS
      .state('app.feeds-categories', {
        url: "/feeds-categories",
        views: {
          'menuContent': {
            templateUrl: "client/views/app/feeds/feeds-categories.ng.html",
            controller: 'FeedsCategoriesCtrl'
          }
        }
      })

      .state('app.category-feeds', {
        url: "/category-feeds/:categoryId",
        views: {
          'menuContent': {
            templateUrl: "client/views/app/feeds/category-feeds.ng.html",
            controller: 'CategoryFeedsCtrl'
          }
        }
      })

      .state('app.feed-entries', {
        url: "/feed-entries/:categoryId/:sourceId",
        views: {
          'menuContent': {
            templateUrl: "client/views/app/feeds/feed-entries.ng.html",
            controller: 'FeedEntriesCtrl'
          }
        }
      })

      //WORDPRESS
      .state('app.wordpress', {
        url: "/wordpress",
        views: {
          'menuContent': {
            templateUrl: "client/views/app/wordpress/wordpress.ng.html",
            controller: 'WordpressCtrl'
          }
        }
      })

      .state('app.post', {
        url: "/wordpress/:postId",
        views: {
          'menuContent': {
            templateUrl: "client/views/app/wordpress/wordpress_post.ng.html",
            controller: 'WordpressPostCtrl'
          }
        },
        resolve: {
          post_data: function(PostService, $ionicLoading, $stateParams) {
            $ionicLoading.show({
          		template: 'Loading post ...'
          	});

            var postId = $stateParams.postId;
            return PostService.getPost(postId);
          }
        }
      })

      //OTHERS
      .state('app.settings', {
        url: "/settings",
        views: {
          'menuContent': {
            templateUrl: "client/views/app/settings.ng.html",
            controller: 'SettingsCtrl'
          }
        }
      })

      .state('app.forms', {
        url: "/forms",
        views: {
          'menuContent': {
            templateUrl: "client/views/app/forms.ng.html",
            controller: 'FormsCtrl'
          }
        }
      })

      .state('app.profile', {
        url: "/profile",
        views: {
          'menuContent': {
            templateUrl: "client/views/app/profile.ng.html"
          }
        }
      })

      .state('app.bookmarks', {
        url: "/bookmarks",
        views: {
          'menuContent': {
            templateUrl: "client/views/app/bookmarks.ng.html",
            controller: 'BookMarksCtrl'
          }
        }
      })
    ;
    $urlRouterProvider.otherwise('/auth/walkthrough');
  }]);
}