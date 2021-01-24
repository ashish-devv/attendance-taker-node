
var app=angular.module("myapp",[]);
app.controller("mycontro",($scope,$http)=>{


    $scope.getlistofclasses=()=>{
        $http.get("/getallclasslist")
        .then(
            (response)=>{
                $scope.classinfolist=response.data;
                console.log(response.data);
                console.log("got list of all Classes");
                
            },
            (error)=>{
                console.log("Something Went Wrong");
            }
        )
    }

    $scope.createclass=()=>{
        $http(
            {
            method:'POST',
            url:"http://localhost:3000/dashboard",
            data:$.param({classname:$scope.classname}),
            headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
            })
            .then(
            (response)=>{
                console.log(response.data.classcode);
                $scope.classcode=response.data.classcode;
                $scope.getlistofclasses();
                //console.log(response);
            },
            (error)=>{
                console.log("Something Went Wrong"+error);

            }
        )
    }

    
})