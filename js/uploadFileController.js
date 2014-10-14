//var UploadFileController = ['$scope', function($scope) {
/*
main.factory('CallApiService', function($resource){
    //return $resource('https://www.googleapis.com/books/v1/volumes?q=:action&key=AIzaSyB6xs-eZW2RbaNjsZyUi7Q0QLQWj3yoLiU');
    //return $resource('https: ... q=:action');
    //return $resource('https://admin.netbase.com/ariel/ariel/cb/TestDir/michael-wishesv1.json?pullsize=1000&domain=babycenter.com');
    return $resource('https://www.googleapis.com/books/v1/volumes?q=rand&key=AIzaSyB6xs-eZW2RbaNjsZyUi7Q0QLQWj3yoLiU');
});
*/
main.controller('UploadFileController', function($scope, $timeout, CallApiService){
//main.controller('UploadFileController', function($scope){
    $scope.searchTerm = "";
    
	$scope.uploadFile = function(){
		var file = $scope.myFile;
		//console.log(file)

		var read = new FileReader();
        read.readAsBinaryString(file);

        read.onloadend = function() {
            //console.log('^^^^^^^^^^^')
            //console.log(read)
            //$scope.data = [{"x":1,"y":16},{"x":2,"y":25},{"x":3,"y":30},{"x":4,"y":10}];
            //$scope.data = read.result;
            var fileContentString = read.result;
            var fileContentObject = JSON.parse(fileContentString)
            $scope.data = fileContentObject;

            console.log('read result: ')
            console.log(read.result);
            newData = read.result;
            console.log('var var')
            console.log(newData)

            document.getElementById('dataResult').innerHTML = "";
            document.getElementById('dataResult').innerHTML = newData;
            //$scope.charts = {data: newData};
            $scope.$apply(function() {
                //$scope.charts = {data: [112, 16, 3, 15, 20, 14]};
                //$scope.charts = {data: newData};
                //scope.data = newData;
                /*
                console.log('scope.apply function called')
                $scope.data = {data: newData};
                console.log($scope.data)
                console.log('data.data below')
                var pone = $scope.data.data;
                console.log(pone)
                */
                foamtree.set({
                    //dataObject: { groups: data.groups },
                    //dataObject: { groups: $scope.data.data },
                    //dataObject: { groups: newData },
                    //dataObject: { groups: $scope.data },
                    dataObject: { groups: $scope.data.groups },
                    //console.log('hi')
                    //console.log(newData)
                    /*
                    dataObject: { groups:
                        [
                            {
                                "label": "Ajax",
                                "weight": 1
                            },
                            {
                                "label": "Using",
                                "weight": 3
                            },
                            {
                                "label": "FoamTree",
                                "weight": 2
                            },
                            {
                                "label": "Visualization",
                                "weight": 4
                            }
                        ] },
                    */
                    rolloutDuration: 3000
                });
            })

        }; // end of read.onloadend

        read.onprogress = function(data) {
            if (data.lengthComputable) {                                            
                var progress = parseInt( ((data.loaded / data.total) * 100), 10 );
                console.log('progress')
                console.log(progress + '%');
            }
        }; // end of read.onprogress
	}; // end of $scope.uploadFile
/*
	$scope.update = function() { 
        $scope.data = [{"x":1,"y":16},{"x":2,"y":25},{"x":3,"y":30},{"x":4,"y":10}];
    }; 
*/
    //$scope.data = [{"x":1,"y":166},{"x":2,"y":386},{"x":3,"y":235},{"x":4,"y":36},{"x":5,"y":46}];
    var uploadedDataMessage = "data displayed when file uploaded";
    $scope.data = uploadedDataMessage;
	document.getElementById('dataResult').innerHTML = JSON.stringify($scope.data);

    $scope.callApi = function () {
        //var type = $scope.mediaType;
        //if ($scope.mediaType=="all")  type="";
        //MediaService.get({term:$scope.searchTerm,entity:type},function(response){
        CallApiService.get({action:$scope.searchTerm},function(response){
            /*
            $scope.$apply(function() {
                //$scope.charts = {data: [112, 16, 3, 15, 20, 14]};
                var pone = [{"x":1,"y":16},{"x":2,"y":25},{"x":3,"y":30},{"x":4,"y":10}];
                //$scope.charts = {data: newData};
                //scope.data = newData;
                foamtree.set({
                    // dataObject: { groups: $scope.charts },
                    //dataObject: { groups: $scope.yay.groups },
                    dataObject: { groups: pone.groups },
                    rolloutDuration: 3000
                });
                
            })
            */
            // Used this because of an error
            // solution: https://docs.angularjs.org/error/$rootScope/inprog?p0=$digest
            $timeout(function() {
                console.log('$$$$$$$$$$$$$$$')
                //console.log(response)
                $scope.yay = response;
                foamtree.set({
                    dataObject: { groups: $scope.yay.groups },
                    //dataObject: { groups: response.groups }, // this should also work
                    rolloutDuration: 3000
                });
                document.getElementById('dataResult').innerHTML = "";
                document.getElementById('dataResult').innerHTML = JSON.stringify(response.groups);
            }, 0);



            //var poneObject = JSON.parse(response.result)
            //$scope.data = poneObject;
            console.log('---------')
            //console.log(poneObject)
        });
    }

    $scope.selectTopic = function () {
        CallApiService.get({action:$scope.selectedSearchTopic},function(response){
            console.log('Button Clicked')
            $timeout(function() {
                console.log('!!!!!!!')
                //console.log(response)
                $scope.poning = response;
                foamtree.set({
                    dataObject: { groups: $scope.poning.groups },
                    //dataObject: { groups: response.groups }, // this should also work
                    rolloutDuration: 3000
                });
                document.getElementById('dataResult').innerHTML = "";
                document.getElementById('dataResult').innerHTML = JSON.stringify(response.groups);
            }, 0);
        })
    }
});