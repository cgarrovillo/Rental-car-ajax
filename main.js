var xhr = new XMLHttpRequest();
var clientsjson;
var clientlist = [];

document.addEventListener("DOMContentLoaded",function(){
    load();
    loadlist();
    // console.log(clientlist);
});


function load() {
    document.getElementById("search").addEventListener("keyup", function (){ 
        searchLast(this.value);
    },false);

    xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) 
    {
        clientsjson = JSON.parse(xhr.responseText);
    }
    };
    xhr.open("GET", "rentalclients.json", true);
    xhr.send();
}

function loadlist() {
    setTimeout(function (){
        for (var i = 0; i < clientsjson.length;i++)
        {
            var c = clientsjson[i];
            clientlist.push(c);
        }
      }, 1000);
    
}


function searchLast (name) {
    var table = "<tr><th>Last Name</th><th>First Name</th></tr>";
    var lastname;
    

    for (var i = 0; i < clientsjson.length;i++)
    {
        var c = clientsjson[i];
        lastname = c.last_name;
        if (lastname.startsWith(name))
        {
            table += "<tr>";
            table += "<td>" + c.last_name + "</td>";
            table += "<td>" + c.first_name + "</td>";
            table += "<td>" + "<input type=\"radio\" name=\"selcli\" ";
            table += "value=" + i + " onchange=selectclient(this.value)>" + "<br/>";
            table += "</td>";
            table += "</tr>";
        }
    }
    document.getElementById("clienttable").innerHTML = table;
}

function selectclient(x) {
    document.getElementById("rentalform").style.visibility = "visible";
    var clientinfo;
    clientinfo = clientlist[x];

    document.getElementById("fullname").innerHTML = clientinfo.first_name + " " + clientinfo.last_name;
    document.getElementById("address").innerHTML = clientinfo.address + " " + clientinfo.state_prov;
    document.getElementById("email").innerHTML = clientinfo.email;
    document.getElementById("phone").innerHTML = clientinfo.phone;

    // console.log(clientinfo);
}

function rent() {
    var total = 0;
    var perday = 0;
    var optionstxt = [];
    var car = document.querySelector('input[name=cartype]:checked').value;
    switch (car)
    {
        case '15':
            perday += 15;
        break;
        case '20':
            perday += 20;
        break;
        case '35':
            perday += 35;
        break;
        case '40':
            perday += 40;
        break;
    }
    
    if (document.querySelector('input[name=rack]:checked'))
    {
        optionstxt.push("Roof Rack/Bike Rack");
        perday += 5;
    }
    if (document.querySelector('input[name=gps]:checked'))
    {
        optionstxt.push("GPS");
        total += 10;
    }
    if (document.querySelector('input[name=seat]:checked'))
    {
        optionstxt.push("Child Booster Seat");
    }

    var days = "";
    days = document.getElementById("days").value;
    days = parseInt(days);
    // console.log(days);

    total += perday * days;

    document.getElementById("opttxt").innerHTML = optionstxt;
    document.getElementById("total").innerHTML = "$" + total.toFixed(2);
}