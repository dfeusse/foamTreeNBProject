
main.factory('CallApiService', function($resource){
	//return $resource('https://www.googleapis.com/books/v1/volumes?q=:action&key=AIzaSyB6xs-eZW2RbaNjsZyUi7Q0QLQWj3yoLiU');
	//return $resource('https: ... q=:action');
	//return $resource('https://admin.netbase.com/ariel/ariel/cb/TestDir/michael-wishesv1.json?pullsize=1000&domain=babycenter.com');
	return $resource('https://www.googleapis.com/books/v1/volumes?q=rand&key=AIzaSyB6xs-eZW2RbaNjsZyUi7Q0QLQWj3yoLiU');
});


/*
main.controller('CallApiController', function($scope, CallApiService) {
//main.controller('UploadFileController', function($scope){
	console.log('calling Controller yea yeah')

	$scope.callApi = function () {
        //var type = $scope.mediaType;
        //if ($scope.mediaType=="all")  type="";
        //MediaService.get({term:$scope.searchTerm,entity:type},function(response){
        CallApiService.get({action:$scope.searchTerm},function(response){
            //$scope.pics = response.items;
            console.log('$$$$$$$$$$$$$$$')
            console.log(response)
        });
    }

});
*/