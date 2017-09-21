module.exports = {
    getAccessToken: function() {
      console.log('getAccessToken')
      return new Promise('works!');
    },
  
    // Or, calling a Node-style callback.
    getAuthorizationCode: function(done) {
      console.log('getAuthorizationCode')
      done(null, 'works!');
    },
  
    // Or, using generators.
    getClient: function(clientId, clientSecret) {
      console.log('clientId', clientId)
      console.log('clientSecret', clientSecret)
       return {
        id: clientId,
        redirectUris: '/blob',
        grants: ['password']
      };
    },
  
    // Or, async/wait (using Babel).
    getUser: function(username, password) {
      console.log('username', username)
      console.log('password', password)
      return {
        username : 'Tee',
        name : 'tee'
      };
    },

    saveToken: function(token, client, user, [callback]){
      console.log('saveToken')
      return new Promise('works!');
    }
};