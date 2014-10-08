
main.factory('CallApiService', function($resource){
	//return $resource('https://www.googleapis.com/books/v1/volumes?q=:action&key=AIzaSyB6xs-eZW2RbaNjsZyUi7Q0QLQWj3yoLiU');
	//return $resource('https: ... q=:action');
	//return $resource('https://admin.netbase.com/ariel/ariel/cb/TestDir/michael-wishesv1.json?pullsize=1000&domain=babycenter.com');
	//return $resource('https://www.googleapis.com/books/v1/volumes?q=rand&key=AIzaSyB6xs-eZW2RbaNjsZyUi7Q0QLQWj3yoLiU');
    //return $resource("http://api.usatoday.com/open/census/loc?api_key=nqjr52fpvsu8gs97tgnkyzfx");
    //return $resource('https://dfeusse@netbase.com:Super99@admin.netbase.com/ariel/ariel/cb/TestDir/michael-wishesv1.json?pullsize=100&domain=babycenter.com')

    // return $resource('http://dfeusse@netbase.com:Super99@admin.netbase.com/ariel/ariel/cb/TestDir/michael-wishesv1.json?pullsize=100&domain=babycenter.com', {},
    //return $resource('https://www.googleapis.com/books/v1/volumes?q=:action&key=AIzaSyB6xs-eZW2RbaNjsZyUi7Q0QLQWj3yoLiU', {},
    //    return $resource('https://www.googleapis.com/books/v1/volumes?q=rand&key=AIzaSyB6xs-eZW2RbaNjsZyUi7Q0QLQWj3yoLiU', {},
    // return $resource('https://admin.netbase.com/ariel/ariel/cb/TestDir/michael-thingsForFoamTreev1.json?report=want&operation=objects&pullSize=100&indexSelector=TOPIC-347955:null\:null', {},
    return $resource('https://admin.netbase.com/ariel/ariel/cb/TestDir/michael-thingsForFoamTreev1.json?report=want&operation=objects&pullSize=100&indexSelector=TOPIC-:action:null\:null', {},
    // return $resource('https://admin.netbase.com/ariel/ariel/cb/TestDir/michael-thingsForFoamTreev1.json?report=want&operation=objects&pullSize=100&indexSelector=TOPIC-:action:null', {},
       {
         get: { method: 'JSONP', params: {callback: 'JSON_CALLBACK'} }
       }
    );
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