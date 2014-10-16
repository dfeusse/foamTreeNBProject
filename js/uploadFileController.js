//var UploadFileController = ['$scope', function($scope) {
/*
main.factory('CallApiService', function($resource){
    //return $resource('https://www.googleapis.com/books/v1/volumes?q=:action&key=AIzaSyB6xs-eZW2RbaNjsZyUi7Q0QLQWj3yoLiU');
    //return $resource('https: ... q=:action');
    //return $resource('https://admin.netbase.com/ariel/ariel/cb/TestDir/michael-wishesv1.json?pullsize=1000&domain=babycenter.com');
    return $resource('https://www.googleapis.com/books/v1/volumes?q=rand&key=AIzaSyB6xs-eZW2RbaNjsZyUi7Q0QLQWj3yoLiU');
});
*/
main.controller('UploadFileController', function($scope, $timeout, CallApiService, CallSecondLayerApiService){
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

    var loader = (function(foamtree){
        return {
            load: function(group, service, searchterm){
                // load data from the server
                service.get({action:searchterm},function(response){
                    // insert data into the data structure
                    group.groups
                })
            }
        }
    })(foamtree);

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
            foamtree.set({
                onGroupHold: function (e) {
                //onGroupHover: function(e) {
                    console.log('onGroupHold() called')
                    //console.log(e.type)
                    console.log(e.group)
                    console.log(e.group.label)
                    var clusterTermClicked = e.group.label;
                    var group = e.secondary ? e.bottommostOpenGroup : e.topmostClosedGroup;
                    console.log('group being used')
                    console.log(group)

                    CallSecondLayerApiService.get({clickterm:clusterTermClicked},function(response){
                        $timeout(function() {
                            console.log('$$$$$$$$$$$$$$$')
                            console.log(response)

                            console.log('********')
                            console.log(group)
                            
                            group.groups = response.groups.slice(0,20);
                            
                            console.log(group)
                            console.log('********')
                            // /*
                            if (!e.secondary && !e.group.groups) {
                                //loader.load(e.group);
                                console.log('first conditional')
                                
                                foamtree.open({ groups: group, open: true}).then(function(){
                                    console.log('PONED FIRST')
                                    //console.log(staticData.groups)
                                })
                                
                            } else {
                                //this.open({ groups: e.group, open: !e.secondary });
                                console.log('second conditional')
                                
                                foamtree.open({ groups: group, open: true}).then(function(){
                                    console.log('PONED SECOND')
                                    //console.log(staticData.groups)
                                })
                                
                            } //*/
                            //$scope.oppen = response;
                            
                            //foamtree.set({
                            //    dataObject: { groups: $scope.yay.groups },
                            //    rolloutDuration: 3000
                            //});

                            //document.getElementById('dataResult').innerHTML = "";
                            //document.getElementById('dataResult').innerHTML = JSON.stringify(response.groups);

                        }, 0); // end of timeout
                    }); // end of CallSecondLayer

                /*
                    console.log('********')
                    console.log(group)

                    //if (!e.secondary && e.group.expandable && !e.group.groups) {
                    var staticData = {"pone":[{"weight":54,"label":"'t even want"},{"weight":34,"label":"'t really want"},{"weight":43,"label":"DD"},{"weight":127,"label":"DH"},{"weight":41,"label":"DS"},{"weight":79,"label":"LO"},{"weight":24,"label":"MIL"},{"weight":22,"label":"VBAC this time"},{"weight":10,"label":"a little"},{"weight":18,"label":"able"},{"weight":8,"label":"alone time"},{"weight":22,"label":"amount of time"},{"weight":175,"label":"baby"},{"weight":10,"label":"baby boy"},{"weight":18,"label":"baby comes"},{"weight":9,"label":"baby girl"},{"weight":7,"label":"baby got"},{"weight":11,"label":"baby is born"},{"weight":8,"label":"baby this time"},{"weight":14,"label":"bed"},{"weight":11,"label":"bf"},{"weight":39,"label":"birth this time"},{"weight":52,"label":"boy this time"},{"weight":7,"label":"c section"},{"weight":68,"label":"child"},{"weight":66,"label":"daughter"},{"weight":7,"label":"different this time"},{"weight":8,"label":"doctor"},{"weight":8,"label":"eat each time"},{"weight":22,"label":"enjoy my time"},{"weight":9,"label":"enjoy our time"},{"weight":42,"label":"enjoy the time"},{"weight":104,"label":"enjoy this time"},{"weight":10,"label":"find out this time"},{"weight":98,"label":"girl this time"},{"weight":11,"label":"healthy baby"},{"weight":52,"label":"hospital"},{"weight":35,"label":"hours"},{"weight":15,"label":"hubby"},{"weight":7,"label":"hungry"},{"weight":101,"label":"husband"},{"weight":157,"label":"kids"},{"weight":14,"label":"labor"},{"weight":10,"label":"last baby"},{"weight":34,"label":"last time"},{"weight":11,"label":"maternity leave"},{"weight":12,"label":"midwife"},{"weight":9,"label":"miss any time"},{"weight":7,"label":"miss time"},{"weight":20,"label":"mom"},{"weight":17,"label":"more"},{"weight":48,"label":"more time"},{"weight":9,"label":"most time"},{"weight":9,"label":"nap"},{"weight":23,"label":"natural birth"},{"weight":10,"label":"natural this time"},{"weight":21,"label":"new baby"},{"weight":11,"label":"newborn"},{"weight":10,"label":"normal"},{"weight":34,"label":"nurse"},{"weight":10,"label":"ob"},{"weight":33,"label":"own"},{"weight":30,"label":"parents"},{"weight":14,"label":"pregnancy"},{"weight":66,"label":"pregnant"},{"weight":13,"label":"ready"},{"weight":12,"label":"same"},{"weight":107,"label":"son"},{"weight":29,"label":"spend a lot of time"},{"weight":32,"label":"spend any time"},{"weight":35,"label":"spend my time"},{"weight":49,"label":"spend the time"},{"weight":377,"label":"spend time"},{"weight":7,"label":"stop time"},{"weight":40,"label":"take the time"},{"weight":59,"label":"take time"},{"weight":7,"label":"time I really"},{"weight":354,"label":"time I want"},{"weight":45,"label":"time alone"},{"weight":33,"label":"time out"},{"weight":8,"label":"time so"},{"weight":41,"label":"time soon"},{"weight":32,"label":"time together"},{"weight":71,"label":"time we want"},{"weight":11,"label":"time with LO"},{"weight":8,"label":"twins"},{"weight":10,"label":"visitors"},{"weight":9,"label":"want a VBAC"},{"weight":51,"label":"want a boy"},{"weight":100,"label":"want a girl"},{"weight":10,"label":"want a natural"},{"weight":15,"label":"want a time"},{"weight":103,"label":"want my time"},{"weight":136,"label":"want some time"},{"weight":48,"label":"want that time"},{"weight":70,"label":"want the time"},{"weight":176,"label":"want this time"},{"weight":289,"label":"want time"},{"weight":14,"label":"wanted sex"},{"weight":25,"label":"year old"}]}
                    //group.groups = staticData.pone;
                    group.groups = staticData.pone.slice(0,20);
                    console.log(group)
                    console.log('********')
                    
                    //var tempData = e.group;
                    //tempData.groups = staticData.groups;
                    //console.log(tempData)
                    
                    if (!e.secondary && !e.group.groups) {
                        //loader.load(e.group);
                        console.log('first conditional')
                        
                        foamtree.open({ groups: group, open: true}).then(function(){
                            console.log('PONED FIRST')
                            console.log(staticData.groups)
                        })
                        
                    } else {
                        //this.open({ groups: e.group, open: !e.secondary });
                        console.log('second conditional')
                        
                        foamtree.open({ groups: group, open: true}).then(function(){
                            console.log('PONED SECOND')
                            console.log(staticData.groups)
                        })
                        
                    }
                */

                }, // end of OnGroupHold
                onGroupClick: function (e) {
                //onGroupHover: function(e) {
                    console.log('onGroupClick() called')
                    //console.log(e.type)
                    console.log(e.group)
                    console.log(e.group.label)
                    var clusterTermClicked = e.group.label;
                    var group = e.secondary ? e.bottommostOpenGroup : e.topmostClosedGroup;
                    console.log('group being used')
                    console.log(group)

                    CallSecondLayerApiService.get({clickterm:clusterTermClicked},function(response){
                        $timeout(function() {
                            console.log('$$$$$$$$$$$$$$$')
                            console.log(response)

                            console.log('********')
                            console.log(group)
                            
                            group.groups = response.groups.slice(0,20);
                            
                            console.log(group)
                            console.log('********')
                            // /*
                            if (!e.secondary && !e.group.groups) {
                                //loader.load(e.group);
                                console.log('first conditional')
                                
                                foamtree.open({ groups: group, open: true}).then(function(){
                                    console.log('foam tree opened')
                                    //console.log(staticData.groups)
                                })
                                
                            } else {
                                //this.open({ groups: e.group, open: !e.secondary });
                                console.log('second conditional')
                                
                                foamtree.open({ groups: group, open: true}).then(function(){
                                    console.log('foam tree opened')
                                    //console.log(staticData.groups)
                                })

                                if(group.groups.length==0){
                                    console.log('NO data, array is empty, SHOULD NOT load')
                                }
                                
                            } //*/
                            //$scope.oppen = response;
                            
                            //foamtree.set({
                            //    dataObject: { groups: $scope.yay.groups },
                            //    rolloutDuration: 3000
                            //});

                            //document.getElementById('dataResult').innerHTML = "";
                            //document.getElementById('dataResult').innerHTML = JSON.stringify(response.groups);

                        }, 0); // end of timeout
                    }); // end of CallSecondLayer

                } // end of onGroupClick
                /*
                onGroupDoubleClick: function (e) {
                    e.preventDefault();

                    var group = e.secondary ? e.bottommostOpenGroup : e.topmostClosedGroup;
                    var toZoom;
                    if (group) {
                        // Open on left-click, close on right-click
                        if (!e.secondary && group.expandable && !e.group.groups) {
                            loader.load(group);
                        } else {
                            this.open({ groups: group, open: !e.secondary });
                        }
                        toZoom = e.secondary ? group.parent : group;
                    } else {
                        toZoom = this.get("dataObject");
                    }
                    this.zoom(toZoom);
                } // end of onGroupDoubleClick
                */
            })



        // end of stuff
        })
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