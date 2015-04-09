//app.js

var app= {
    // browser
    loadRequirements:1,
    // device
    //loadRequirements:0,
    init: function(){
        document.addEventListener("deviceready", app.onDeviceReady);
        document.addEventListener("DOMContentLoaded", app.onDomReady);
    },
    onDeviceReady: function(){
        app.loadRequirements++;
        console.log('onDevReady = ' + app.loadRequirements);
        if(app.loadRequirements === 2){
            app.start();
        }
    },
    onDomReady: function(){
        app.loadRequirements++;
        console.log('onDomReady = ' + app.loadRequirements);
        if(app.loadRequirements === 2){
            app.start();
        }
    },
    start: function(){
        console.log("I'm starting");

        //connect to database
        //build the lists for the main pages based on data
        //add button and navigation listeners

        var db = null;


        window.addEventListener("DOMContentLoaded", function(){
            //app has loaded
            //access / create the database
            checkDB();

            document.getElementById("btnAddgp").addEventListener("click", addpplgift);
            document.getElementById("btnAddgo").addEventListener("click", addoccgift);
            document.getElementById("btnAdd1").addEventListener("click", addperson);
            document.getElementById("addOcc").addEventListener("click", addocc);
            document.getElementById("openm").addEventListener("click", modlist);
            document.getElementById("openm2").addEventListener("click", modlist2);
            document.getElementById("occback").addEventListener("click", function(){
                document.getElementById("occasion-list").style.display = "block";
                document.getElementById("gifts-for-occasion").style.display = "none";
            });
            document.getElementById("pplback").addEventListener("click", function(){
                document.getElementById("people-list").style.display = "block";
                document.getElementById("gifts-for-person").style.display = "none";
            });
//            document.getElementById("cheat").addEventListener("click", function(){
//                document.getElementById("people-list").style.display = "none";
//                document.getElementById("gifts-for-occasion").style.display = "none";
//                document.getElementById("gifts-for-person").style.display = "block";
//            });
        });

        function checkDB(){
            //app start once deviceready occurs
            console.log("deviceready");
            db = openDatabase('masl0016', '', 'Giftr', 1024*1024);
            if(db.version == ''){
                console.log('First time running... create tables');
                //means first time creation of DB
                //increment the version and create the tables
                db.changeVersion('', '1.0',
                                 function(trans){
                    //something to do in addition to incrementing the value
                    //otherwise your new version will be an empty DB
                    console.log("DB version incremented");
                    //do the initial setup
                    trans.executeSql('CREATE TABLE people(person_id INTEGER PRIMARY KEY AUTOINCREMENT, person_name varchar)', [],
                                     function(tx, rs){
                        //do something if it works
                        console.log("Table people created");
                    },
                                     function(tx, err){
                        //failed to run query
                        console.log( err.message);
                    });

                    trans.executeSql('CREATE TABLE occasions(occ_id INTEGER PRIMARY KEY AUTOINCREMENT, occ_name varchar)', [],
                                     function(tx, rs){
                        //do something if it works
                        console.log("Table occ created");
                    },
                                     function(tx, err){
                        //failed to run query
                        console.log( err.message);
                    });

                    //////////////////////////////////////do i need autoincrement?
                    trans.executeSql('CREATE TABLE gifts(gift_id INTEGER , person_id integer, occ_id integer, gift_idea varchar, purchased boolean)', [],
                                     function(tx, rs){
                        //do something if it works
                        console.log("Table gifts created");
                    },
                                     function(tx, err){
                        //failed to run query
                        console.log( err.message);
                    });

                    trans.executeSql('INSERT INTO people (person_name) VALUES ("test")', [],
                                     function(tx, rs){
                        //do something if it works, as desired
                        console.log("Added test1 in people");
                    },
                                     function(tx, err){
                        //failed to run query
                        console.log( err.message);
                    });

                    trans.executeSql('INSERT INTO occasions (occ_name) VALUES ("test")', [],
                                     function(tx, rs){
                        //do something if it works, as desired
                        console.log("Added test in occ");
                    },
                                     function(tx, err){
                        //failed to run query
                        console.log( err.message);
                    });

                    trans.executeSql('INSERT INTO gifts (gift_idea) VALUES ("test")', [],
                                     function(tx, rs){
                        //do something if it works, as desired
                        console.log("Added test1 in people");
                    },
                                     function(tx, err){
                        //failed to run query
                        console.log( err.message);
                    });
                },
                                 function(err){
                    //error in changing version
                    //if the increment fails
                    console.log( err.message);
                },
                                 function(){
                    //successfully completed the transaction of incrementing the version number
                });
                addNavHandlers();
            }else{
                //version should be 1.0
                //this won't be the first time running the app
                console.log('Version: ', db.version)
                addNavHandlers();
                //put in a
                updateList();
                updateOccList();
            }
        }

        function addNavHandlers(){
            //get the lists of links and pages
            //add the tap/click events to the links
            //add the pageshow and pagehide events to the pages
            console.log("Adding nav handlers");
            //dispatch the click event on the first tab to make the home page load
            demoFunction();
        }

        function demoFunction() {

                        //just a function to show it in use.
//                        db.transaction(function(trans){
//                            trans.executeSql('INSERT INTO people (person_name) VALUES ("Admiral Doofus")', [],
//                                             function(tx, rs){
//                                //success running the query
//                                console.log("success inserting test2");
//                                var output2 = document.querySelector("#output3");
//                                //                    output2.innerHTML = rs.rows.item(0).cnt;
//                                console.log(tx);
//                            },
//                                             function(tx, err){
//                                //failed to run the query
//                                console.log( err.message);
//                            });
//                        });
//
//                        db.transaction(function(trans){
//                            trans.executeSql('SELECT person_name FROM people', [],
//                                             function(tx, rs){
//                                //success running the query
//                                console.log("success getting name test1");
//                                var output2 = document.querySelector("#output2");
//                                var output3 = document.querySelector("#output3");
//            //                    for (var i=0; i < rs.rows.length; i++){
//            //                        output2.innerHTML = rs.rows.item(i).person_name;
//            //                        console.log(rs.rows.item(i).person_name);
//            //                    }
//            //                    output2.innerHTML = rs.rows.item(0).person_name
//            //                    output3.innerHTML = rs.rows.item(1).person_name
//            //                    console.log(rs.rows.item(0));
//            //                    console.log(rs.rows.item(1));
//            //                    console.log(rs.rows.item(2));
//            //                    console.log(rs.rows.item(3));
//            //                    console.log(rs.rows.item(4));
//            //                    console.log(rs.rows.item(5));
//                            },
//                                             function(tx, err){
//                                //failed to run the query
//                                console.log( err.message);
//                            });
//                        });

//                        db.transaction(function(trans){
//                            trans.executeSql('SELECT COUNT(*) AS cnt FROM people', [],
//                                             function(tx, rs){
//                                //success running the query
//                                console.log("success getting number of rows");
//                                var output = document.querySelector("#output");
//                                output.innerHTML = rs.rows.item(0).cnt;
//                                console.log("number of items in people output");
//                                console.log(rs.rows.item(0));
//                            },
//                                             function(tx, err){
//                                //failed to run the query
//                                console.log( err.message);
//                            });
//                        }, transErr, transSuccess);
//                    }
//
//                    function transErr(tx, err){
//                        //a generic function to run when any transaction fails
//                        //navigator.notification.alert(message, alertCallback, [title], [buttonName])
//                        console.log("Error processing transaction: " + err);
//                    }
//
//                    function transSuccess(){
//                        //a generic function to run when any transaction is completed
//                        //not something often done generically
                    }


//////////////////////////////////////////////////////
//people second page
function addpplgift(ev){
    ev.preventDefault();
    var txt14 = document.getElementById("txt14").value;
    if(txt14 != ""){
        //save the value in the stuff table
        db.transaction(function(trans){
            trans.executeSql('INSERT INTO gifts(gift_idea) VALUES(?)', [txt14],
            function(tx, rs){
            //do something if it works, as desired
            console.log("Added row in people");
            updateList14();
            },
            function(tx, err){
            //failed to run query
            console.log( err.message);
            });
        },
        function(){
        //error for the transaction
        console.log("The insert sql transaction failed.")
        },
        function(){
        //success for the transation
        //this function is optional
        });
    }
    else{
        console.log("Text field is empty");
    }
}

            function modlist2(){
                var ppl2list = document.getElementById("pplList");
                ppl2list.innerHTML = "";
                //clear out the list before displaying everything
                db.transaction(function(trans){
                    trans.executeSql("SELECT * FROM occasions", [],
                                     function(tx, rs){
                        //success
                        //rs.rows.item(0).name would be the contents of the first row, name column
                        //rs.rows.length is the number of rows in the recordset
                        var numStuff = rs.rows.length;
                        for(var i=0; i<numStuff; i++){
                            var ppl2 = document.createElement("option");
                            ppl2.innerHTML = rs.rows.item(i).occ_name;
                            ppl2list.appendChild(ppl2);
                        }
                    },
                                     function(tx, err){
                        //error
                        console.log("transaction to list contents of stuff failed")
                    });
                });
            }

            function updateList14(){
                var list = document.getElementById("ppl2list");
                list.innerHTML = "";
                //clear out the list before displaying everything
                db.transaction(function(trans){
                    trans.executeSql("SELECT * FROM gifts", [],
                                     function(tx, rs){
                        //success
                        //rs.rows.item(0).name would be the contents of the first row, name column
                        //rs.rows.length is the number of rows in the recordset
                        var numStuff = rs.rows.length;
                        for(var i=0; i<numStuff; i++){
                            var li = document.createElement("li");
                            li.innerHTML = rs.rows.item(i).gift_idea;
                            list.appendChild(li);
                        }
                        console.log("update list ran")
                    },
                                     function(tx, err){
                        //error
                        console.log("transaction to list contents of stuff failed")
                    });
                });
            }

////////////////////////////////////////////////////////////
//occasion second page
        function addoccgift(ev){
  ev.preventDefault();
  var per = document.getElementById("optlist")
  var txt = document.getElementById("txt27").value;
  if(per != ""){
    if(txt != ""){
    //save the value in the stuff table
    db.transaction(function(trans){
        trans.executeSql('INSERT INTO gifts(gift_idea) VALUES(?)', [txt],
        function(tx, rs){
            //do something if it works, as desired
            console.log("Added row in people");
            updateList2();
        },
        function(tx, err){
            //failed to run query
            console.log( err.message);
        });
    },
    function(){
      //error for the transaction
      console.log("The insert sql transaction failed.")
    },
    function(){
      //success for the transation
      //this function is optional
    });
  }
        else{
    console.log("Text field is empty");
  }
  }
}

        function modlist(){
            var optlist = document.getElementById("optlist");
            optlist.innerHTML = "";
            console.log("testing");
            //clear out the list before displaying everything
            db.transaction(function(trans){
                trans.executeSql("SELECT * FROM people", [],
                                 function(tx, rs){
                    //success
                    //rs.rows.item(0).name would be the contents of the first row, name column
                    //rs.rows.length is the number of rows in the recordset
                    var numStuff = rs.rows.length;
                    for(var i=0; i<numStuff; i++){
                        var opt = document.createElement("option");
                        opt.innerHTML = rs.rows.item(i).person_name;
                        optlist.appendChild(opt);
                    }
                },
                                 function(tx, err){
                    //error
                    console.log("transaction to list contents of stuff failed")
                });
            });
        }

        function updateList2(){
            var list = document.getElementById("occ2list");
            list.innerHTML = "";
            //clear out the list before displaying everything
            db.transaction(function(trans){
                trans.executeSql("SELECT * FROM gifts", [],
                                 function(tx, rs){
                    //success
                    //rs.rows.item(0).name would be the contents of the first row, name column
                    //rs.rows.length is the number of rows in the recordset
                    var numStuff = rs.rows.length;
                    for(var i=0; i<numStuff; i++){
                        var li = document.createElement("li");
                        li.innerHTML = rs.rows.item(i).gift_idea;
                        list.appendChild(li);
                    }
                    console.log("update list ran")
                },
                                 function(tx, err){
                    //error
                    console.log("transaction to list contents of stuff failed")
                });
            });
        }
//////////////////
//testing



////////////////////////////////////
//Occasions Main Page
        function addocc(ev){
            ev.preventDefault();
            var txt = document.getElementById("txtocc").value;
            if(txt != ""){
                //save the value in the stuff table
                db.transaction(function(trans){
                    trans.executeSql('INSERT INTO occasions(occ_name) VALUES(?)', [txt],
                                     function(tx, rs){
                        //do something if it works, as desired
                        console.log("Added row in occ");
                        updateOccList();
                    },
                                     function(tx, err){
                        //failed to run query
                        console.log( err.message);
                    });
                },
                               function(){
                    //error for the transaction
                    console.log("The insert sql transaction failed.")
                },
                               function(){
                    //success for the transation
                    //this function is optional
                });
            }else{
                console.log("Text field is empty");
            }
        }

        function updateOccList(){
            var occlist = document.getElementById("occlist");
            occlist.innerHTML = "";
            //clear out the list before displaying everything
            db.transaction(function(trans){
                trans.executeSql("SELECT * FROM occasions", [],
                                 function(tx, rs){
                    //success
                    //rs.rows.item(0).name would be the contents of the first row, name column
                    //rs.rows.length is the number of rows in the recordset
                    var numStuff = rs.rows.length;
                    for(var i=0; i<numStuff; i++){
                        var occli = document.createElement("li");
                        occli.innerHTML = rs.rows.item(i).occ_name;
                        occli.id = "testid";
                        occlist.appendChild(occli);

                    }
                    console.log("update list ran")
                },
                                 function(tx, err){
                    //error
                    console.log("transaction to list contents of stuff failed")
                });
            });
        }

////////////////////////////////////
//people main page
        function addperson(ev){
            ev.preventDefault();
            var txt = document.getElementById("txt1").value;
            if(txt != ""){
                //save the value in the stuff table
                db.transaction(function(trans){
                    trans.executeSql('INSERT INTO people(person_name) VALUES(?)', [txt],
                                     function(tx, rs){
                        //do something if it works, as desired
                        console.log("Added row in people");
                        updateList();
                    },
                                     function(tx, err){
                        //failed to run query
                        console.log( err.message);
                    });
                },
                               function(){
                    //error for the transaction
                    console.log("The insert sql transaction failed.")
                },
                               function(){
                    //success for the transaction
                    //this function is optional
                });
            }else{
                console.log("Text field is empty");
            }
        }

        function updateList(){
            var list = document.getElementById("ppllist");
            list.innerHTML = "";
            //clear out the list before displaying everything
            db.transaction(function(trans){
                trans.executeSql("SELECT * FROM people", [],
                                 function(tx, rs){
                    //success
                    //rs.rows.item(0).name would be the contents of the first row, name column
                    //rs.rows.length is the number of rows in the recordset
                    var numStuff = rs.rows.length;
                    for(var i=0; i<numStuff; i++){
                        var li = document.createElement("li");
                        li.innerHTML = rs.rows.item(i).person_name;
                        list.appendChild(li);
                    }
                    console.log("update list ran")
                },
                                 function(tx, err){
                    //error
                    console.log("transaction to list contents of stuff failed")
                });
            });
        }
/////////////////////////////////////////
////////HAMMER STUFF
        var ul = document.getElementById("occlist");
        var hammertime = new Hammer(ul);
        var singleTap = new Hammer.Tap({event: 'tap'});
        var doubleTap = new Hammer.Tap({event: 'doubletap', taps: 2});
        hammertime.add([doubleTap, singleTap]);
        doubleTap.requireFailure(singleTap);

        hammertime.on('tap', function(ev) {
            document.getElementById("occasion-list").style.display = "none";
            document.getElementById("gifts-for-occasion").style.display = "block";
        });
        hammertime.on('doubletap', function(ev) {
            console.log("double");
            console.log(ev);
        });

        var ul2 = document.getElementById("ppllist");
        var hammertime2 = new Hammer(ul2);
        var singleTap2 = new Hammer.Tap({event: 'tap'});
        var doubleTap2 = new Hammer.Tap({event: 'doubletap', taps: 2});
        hammertime2.add([doubleTap2, singleTap2]);
        doubleTap2.requireFailure(singleTap2);

        hammertime2.on('tap', function(ev) {
            document.getElementById("people-list").style.display = "none";
            document.getElementById("gifts-for-person").style.display = "block";
            document.getElementById("gifts-for-occasion").style.display = "none";
        });
        hammertime2.on('doubletap', function(ev) {
            console.log("double");
            console.log(ev);
        });
//////////////////////////////
        var hammertimes = new Hammer(document.body,{});
        hammertimes.on('swipeleft', function(ev){
            document.getElementById("occasion-list").style.display = "none";
            document.getElementById("people-list").style.display = "block";
        });
        hammertimes.on('swiperight', function(ev){
            document.getElementById("occasion-list").style.display = "block";
            document.getElementById("people-list").style.display = "none";

        });

    }
}

app.init();
