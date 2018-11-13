var db="";
var dbstatus = "";
var dbqueryLogin = "";
var tempText="";
var usertype="";
var sqlquery="";
var userid="";
var messagelist=[];
var chatlist=[];
//CREATE TABLE

function createTable(){
	db.transaction(createDB, errorCB);
}
function createDB(tx)
{  
   tx.executeSql('CREATE TABLE IF NOT EXISTS Login (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL, password TEXT NOT NULL, usertype TEXT NOT NULL)');
}

function openDB() {
	db=window.openDatabase("BrokerDB", "1.0", "BrokerDB DB", 2500000);
}

//INSERT INTO TABLE
function insertData(UserType)
{
	usertype=UserType;
	db.transaction(insertDB, errorCB);
}

function insertDB(tx)
{
    db.transaction(populateDB, errorCB, successInsCB);
}

function successInsCB()
 {
 }

function deleteRecords()
{
    dbqueryLogin = "truncate";
    db.transaction(queryDB, errorCB);
}

function populateDB(tx) {
    var username=sessionStorage.getItem("UserName");
    var Password=sessionStorage.getItem("Password");
    tx.executeSql("INSERT INTO Login (username,password,usertype) VALUES ('"+username+"', '"+Password+"','"+usertype+"')");
    sessionStorage.removeItem("UserName");
	sessionStorage.removeItem("Password");
}


//SELECT FROM TABLE AND SET THE VALUES ON SCREEN
function chkLogin(UserType){
	usertype=UserType;
    dbqueryLogin = "select";
    db.transaction(queryDB, errorCB);     
}

function truncateTable(UserType)
{
	usertype=UserType;
     dbqueryLogin = "truncate";
    db.transaction(queryDB, errorCB);
}

function queryDB(tx) {
	if (dbqueryLogin == "select"){
	   tx.executeSql('SELECT * FROM Login Where usertype="'+usertype+'"', [],selectSuccess, errorCB);
    }
    if (dbqueryLogin == "truncate"){
        tx.executeSql('DELETE FROM Login Where usertype="'+usertype+'"');
    }
    dbqueryLogin = "";
    usertype="";
}

function selectSuccess(tx, results) {
    var len = results.rows.length;
    if(len>0)
    {
        for (var i=0; i<len; i++){
            var uname=results.rows.item(i).username;
            var pwd=results.rows.item(i).password;
            $('#username').val(uname); 
            $('#password').val(pwd);
            $('#rememberme').prop('checked', true).checkboxradio('refresh');
        }
    }
    
}



function deleteSuccess(tx, results) {

}
function truncateSuccess(tx, results) {
    
}

//DELETE FROM TABLE
function deleteData()
{
    dbqueryLogin = "delete";
    db.transaction(queryDB, errorCB);
}


function deleteDB(tx)
{
    if (dbTruncate == "false"){
        var username=sessionStorage.username;
        var Password=sessionStorage.password;
      tx.executeSql("DELETE FROM Login WHERE id=?", username);
         }else{
        tx.executeSql("DELETE FROM Login");
    }
    dbTruncate = "false";
}

//UPDATE TABLE
function updateData()
{
    truncateTable();
    insertData();
}

//COMMON FUNCTIONS
function closeDB() {
    if (dbstatus == "open"){
        db = window.closeDatabase("BrokerDB");
        dbstatus = "";
    }
}

function errorTruncateCB(err) {
    createTable();
}

function errorCB(err) {
	createTable();
}


function successCB() {

}

//DROP TABLE
function DropTable()
{
	db.transaction(DropDB, errorCB);
}

function DropDB(tx)
{
    tx.executeSql('DROP TABLE IF EXISTS Login');
}


function Selectlogin(UserType){
	usertype=UserType;
	db=openDB(UserType);
	createTable();
    dbqueryLogin = "select";
    db.transaction(queryDBbywhere, errorCB);
}

function queryDBbywhere(tx) {
	   
	if (dbqueryLogin == "select"){
	var id=1
		tx.executeSql('SELECT * FROM Login Where usertype="'+usertype+'"', [],selectSuccess, errorCB);

		 
    }
    dbqueryLogin = "";
    usertype="";
}
