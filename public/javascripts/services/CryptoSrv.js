angular.module('CryptoSrv', []).service('$crypto', function() {
    return {
        encode : function(value) {return btoa(value)},
        decode : function(value) {return atob(value)}
    }
})