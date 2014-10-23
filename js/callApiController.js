main.controller('CallApiController', function($scope, CallApiService) {

	$scope.callApi = function () {
        //var type = $scope.mediaType;
        //if ($scope.mediaType=="all")  type="";
        //MediaService.get({term:$scope.searchTerm,entity:type},function(response){
        CallApiService.get({action:$scope.searchTerm},function(response){
            //$scope.pics = response.items;
            console.log('Http response:')
            console.log(response)
        });
    }

});
