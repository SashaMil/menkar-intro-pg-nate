myApp.service('httpService', function($http) {
  let vm = this;
  //GET REQUEST
  vm.requestSongs = function() {
    return $http({
      method: 'GET',
      url: '/song'
    })
    .then(function(response) {
      vm.allSongs = response;
    })
    .catch(function(error) {
      console.log(`Error getting songs ${error}`);
    })
  }

  //POST REQUEST
  vm.requestPostSongs = function(obj) {
    // songInfo
    return $http({
      method: 'POST',
      url: '/song',
      data: obj
    })
    .then(function(response) {
      console.log('response', response);
    })
    .catch(function(error) {
      console.log(`Error posting songs ${error}`);
    })
  }

  // vm.requestPutSongs = function(param){
  //   return $http({
  //     method: 'PUT',
  //     url: '/song',
  //     params: {
  //       id: param
  //   })
  //   .then(function(response) {
  //     console.log('response', response);
  //   })
  //   .catch(function(error) {
  //     console.log(`Error modifying songs ${error}`);
  //   })
  // }

})
