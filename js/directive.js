main.directive('foamTree', function(){
    return {
        //template: '<svg></svg>'
        //, restrict: 'E'
        restrict: 'E'
        , scope: { data: '=', max: '=', min: '=' }
        , link: link
    }
})