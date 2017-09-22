

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

      return new Promise(function(resolve, reject){
        resolve({
          id : '123456'
        });
      })
    },

    saveToken: function(token, client, user){
      console.log('saveToken',token)
      console.log('client',client)
      console.log('user',user)

      return new Promise(function(resolve, reject){
        resolve({
          accessToken: token.accessToken,
          accessTokenExpiresAt: token.accessTokenExpiresAt,
          refreshToken: token.refreshToken,
          refreshTokenExpiresAt: token.refreshTokenExpiresAt,
          scope: token.scope,
          client: {id: client.id},
          user: {id: user.id}
        });
      })


        

    }
};