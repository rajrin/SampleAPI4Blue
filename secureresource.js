/** SecureResource **/

var auth = require('basic-auth');

var   user = 'tcs';
var   pass = 'password';

module.exports = {

    /**
     * This function reads the basic aiuth parameters from the HTTp header
     **/
    access : function(req,res){
        var credentials = auth(req);
        
        if(!credentials || credentials.name !== user || credentials.pass !== pass){
            res.statusCode = 401;
            res.setHeader('WWW-Authenticate', 'Basic realm="example"');
            res.end('Access Denied');
        } else {
            res.end('{"SecretResource" : "Access granted"}');
        }
    }

}