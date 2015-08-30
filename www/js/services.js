angular.module('starter.services', [])

.factory('$questions', function($http, $q){
    return{
        getQuestion: function(){
            var deferred = $q.defer();   
            $http.get('http://jservice.io/api/random').then(function(resp){
                deferred.resolve(resp);
            }, function(err){
                deferred.reject(err);   
            });
            return deferred.promise;
        },
        getAllQuestionsFromCategory: function(catId){
            var deferred = $q.defer();   
            $http.get('http://jservice.io/api/clues?category='+catId).then(function(resp){
                console.log(resp);
                deferred.resolve(resp);
            }, function(err){
                console.log(err);
                deferred.reject(err);   
            });
            return deferred.promise;
        }
    }
})

angular.module('ionic.utils', [])

.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  }
}]);
