angular.
    module('parcelConfig').
    component('parcelSize' , {
        transclude: true,
        templateUrl: "html/parcelSize.html",

        controller: function ParcelSizeController($scope, $http) {
            this.parcelsize = {
                parcelheight: "",
                parcelwidth: "",
                parceldepth: "",
            };


            this.calcSize=function(){
                $http({url: "/api/getPacelSize", method: "GET", params: {parcelsize: this.parcelsize}
                }).then(function(res){
                    $scope.parcelsize = res.data.size;
                })
            }

        }

});