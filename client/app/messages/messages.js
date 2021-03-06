angular.module('myapp.Messages',[])

 .controller('MessagesCtrl',function ($dialogs, $scope,$rootScope,$http,$location,Tradeworker){
  
  $rootScope.isLogged = true;
  $scope.flag= false;
  $scope.users=[];
  $rootScope.emailu=undefined;
  $rootScope.usernameu= undefined;


  $scope.intilize = function(){
     $http({
      method: 'GET',
      url: '/api/getmsg'
    }).then(function(mesg){
      if(mesg.data.length ===0){
        $scope.flag=false;
      } else{
        $scope.flag= true;
        $scope.users = mesg.data;
      }
    }).catch(function(error){
        alert(error);
    })   
  }

  $scope.responseToUser =function(username, email){
    $rootScope.emailu=email;
    $rootScope.usernameu= username;
     dlg = $dialogs.create('./app/messages/sendResponseEmail/sendResponseEmail.html','sendMessageECtrl',{},{key: false,back: 'static'});
  }

  $scope.deleteMessage =function(userEmail){
    $http({
      method: 'POST',
      url: '/api/delmsg',
      data: {userEmail: userEmail}
    }).then(function(mesg){
      if(mesg.length ===0){
        $scope.flag=false;
      } else{

        alert(mesg.data)
        $scope.intilize();
      }
    }).catch(function(error){
        alert(error);
    })   
  }
})