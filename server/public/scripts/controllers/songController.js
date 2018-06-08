myApp.controller('songController', function(httpService) {
  let vm = this;

  vm.getSongs = function() {
    httpService.requestSongs()
    .then(function() {
      vm.allSongs = httpService.allSongs.data;
      console.log(vm.allSongs);
    })
  }
  vm.getSongs();

  vm.postSongs = function() {
    console.log('hello');
    if (!vm.formValidation()) {
      return;
    }
    httpService.requestPostSongs(vm.objectToSend)
    .then(function(response) {
      `Successfully Posted ${response}`;
      // vm.putSongs();
      vm.getSongs();
    })
  }

  // vm.putSongs = function() {
  //   console.log('in put');
  //   httpService.requestPutSongs()
  // }



  vm.formValidation = function() {
    console.log('elephant')
    if (vm.artist === undefined || vm.track === undefined) {
      alert('Please fill in all requisite fields');
      return false;
    }
    if (vm.published === undefined) {
      vm.objectToSend = {rank: 1, artist: vm.artist, track: vm.track};
      return true;
    }
    if (vm.published.split("").filter(x => isNaN(x) && x !== '/').length !== 0) {
      alert('Invalid Release Date, please follow format');
    }
    else {
      vm.objectToSend = {rank: 1, artist: vm.artist, track: vm.track, published: vm.published};
      return true;
    }

  }
});
