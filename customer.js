/** Customers **/
var custs = [
    {"id":0,"fname":"rajeev","lname":"sakhuja","state":"NJ"},
    {"id":1,"fname":"bob","lname":"angelwood","state":"CA"}
];
var maxId = 1;


module.exports = {
    // Returns all customers
    getAllCustomers : function(){
        return custs;
    },
    
    // returns specific customer by id
    getCustomer : function(id,callback){
        //console.log(id);
        custs.forEach(function(cust){
            if(cust.id == id) {
                callback(cust);
            }
        });
        return callback(null);
    },
    
    // create a customer
    createCustomer : function(fname, lname, state,callback){
        maxId++;
        var dat = {"id":maxId, "fname":fname, "lname":lname,"state":state};
        custs.push(dat);
        callback(true);
    }
}