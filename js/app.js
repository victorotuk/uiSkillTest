
var app = angular.module('ministerList', []);

app.controller('ministerListController',function($scope,$http){
  $scope.test ="test";



        var request = {
            method: 'get',
            url: '../output.json',
            dataType: 'json',
            contentType: "application/json"
        };


    $scope.data = new Array;

    $http(request).then(function successCallback(jsonData) {
        $scope.data = jsonData.data.ministers;

        console.log( $scope.data);
    }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
    });

    $scope.go = true;

});

app.factory('ministerListFactory',function($http){

});
