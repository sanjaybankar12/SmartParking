var html5client={};
html5client.webdb={};
html5client.webdb.db=null;

createDatabase=function()
{
    var dbsize=5*1024*1024;
    html5client.webdb.db=openDatabase("smartparkingdb","1.0","smartparkingdb",dbsize);
};

createTable=function()
{
    var db=html5client.webdb.db;
    db.transaction(function(tx)
    {
        tx.executeSql("CREATE TABLE IF NOT EXISTS register_info(uid varchar(255) primary key,name varchar(255),phone varchar(255),pass varchar(255),email varchar(255))",[],function(){ });
    });
};

function init_client()
{
    createDatabase();
    createTable();
}

function registerUser(name,phone,userid,pass,email)
{
    var db=html5client.webdb.db;
    db.transaction(function(tx)
    {
        tx.executeSql("INSERT INTO register_info(uid,name,phone,pass,email) VALUES(?,?,?,?,?)",[uid,name,phone,pass,email],function(tx,rs){
                window.location.href="login.html";
                
        });
    });
}

function loginUser(uid,pass)
{
    var db=html5client.webdb.db;
    db.transaction(function(tx)
    {
        tx.executeSql("SELECT * FROM register_info WHERE uid=? AND pass=?",[uid,pass],function(tx,rs){
            var len=rs.rows.length;
            if(len>0)
            {
                window.location.href="home.html";
            }
        });
    });
}

function checkUserRegistration()
{
    var db=html5client.webdb.db;
    
    db.transaction(function(tx)
    {
        tx.executeSql("SELECT * FROM register_info",[],function(tx,rs){
            
            var len=rs.rows.length;
            if(len>0)
            {
                window.location.href="login.html";
            }
            else
            {
                window.location.href="register.html";
            }
        });
    });

}