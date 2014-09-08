function link(scope, element, attrs){
    var el = element[0];

    //console.log('FOAM TREE VISUAL FILE')
    //console.log(scope.data)
    //console.log($scope.data)

    foamtree.set({
        dataObject: { groups: [ { label: "loading..." }, { label: "Please wait" } ] },
        fadeDuration: 500
    });

    $.ajax({
        url: "data/WishesBabyCenterSmall.json",
        dataType: "json",
        success: function(data) {
            
            var initialData = data;
            console.log('initial data')
            console.log(initialData)
            scope.data = initialData;

            foamtree.set({
                dataObject: { groups: data.groups },
                //dataObject: { groups: scope.data },
                rolloutDuration: 3000
            });
        }
    });

    console.log('initial scope')
    console.log(scope.data)

    //scope.$watch('data', update)
    scope.$watch(function(){
        console.log('SCOPE CHANGED')
        /*
        console.log(scope.data)
        foamtree.set({
                //dataObject: { groups: data.groups },
                dataObject: { groups: scope.data },
                rolloutDuration: 3000
            });
        */
        //console.log(data)
        //console.log(data.groups)
        //console.log(initialData)
        //console.log(groups)
    })
}