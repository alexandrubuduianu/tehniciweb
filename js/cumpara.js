var url = "http://localhost:3000/cumpara"; 
var cumpara = [];

var num = "";
var com = "";


function myLoad(){
    return new Promise(function(resolve, reject){
        var xhr  = new XMLHttpRequest()
        xhr.open('GET', url, true)
        xhr.onload = function () {
            if (xhr.readyState == 4 && xhr.status == "200") {
                cumpara = JSON.parse(xhr.responseText);
                console.table(cumpara);
                return resolve(cumpara);
            } else {
                reject({
                    statusText: xhr.statusText
                });
            }
        }
        
    xhr.send(null);
    })

}

myLoad();

function login(){

    num = document.getElementById("nume1").value;
    com = document.getElementById("com1").value;
    var ok = 0;
    console.log(num + " " + com);
    console.log(cumpara.length);
    for(var i = 0; i < cumpara.length; i++){
        if(cumpara[i].nume == num && cumpara[i].id == com){
            console.log("Comanda ta a ajuns la noi si o sa te anuntam cand va fi livrata!");
            window.location.href="http://localhost:8080/comenzi.html";
        }
            
         else{
            ok = ok + 1;
            console.log("Comanda ta nu a ajuns la noi!");
         }
            
    }

    if (ok === cumpara.length)
        alert("Date invalide!")
}

function del(){
    var comToDelete = document.getElementById("com2").value;

    return new Promise(function(resolve, reject){
        var xhr = new XMLHttpRequest();
        xhr.open("DELETE", url+"/"+comToDelete, true);
        xhr.onload = function () {
            alert("Succes!!!");
            var us = JSON.parse(xhr.responseText);
            if (xhr.readyState == 4 && xhr.status == "200") {
                console.table(us);
                window.location.href="http://localhost:8080/modele.html";
            } else {
                console.error(us);
            }
        }

        xhr.onerror = function () {
            alert('Nu s-a sters!');
        }
        xhr.send();

    })
}

function update(){

    let nume = document.getElementById("num3").value;
    let com = document.getElementById("com3").value;
    let nrTel = document.getElementById("nrtel3").value;
    let pantof = document.getElementById("pantof3").value;

    
    let data = {};
    data.id = com;
    data.nume = nume;
    data.numarTelefon = nrTel;
    data.pantof = pantof;


    let json = JSON.stringify(data);

    return new Promise(function(resolve, reject){
        var xhr = new XMLHttpRequest();
        xhr.open("PUT", url+"/"+com, true);
        xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
        xhr.onload = function () {
            alert("Succes!!!");
            var us = JSON.parse(xhr.responseText);
            if (xhr.readyState == 4 && xhr.status == "200") {
                console.table(us);
            } else {
                console.error(us);
            }
        }

        xhr.onerror = function () {
            alert('Nu s-a realizat Update!');
        }
        xhr.send(json);

        //window.location.href = "index.html";
    })
      
}


function adaugaComanda(){
    let numeNou = document.getElementById("nume4").value;
    let nrTelefonNou = document.getElementById("tlf4").value;
    let model = document.getElementById("pantof4").value;
        
        let data = {};
        data.id = cumpara[cumpara.length - 1].id + 1;
        data.nume = numeNou;
        data.numarTelefon = nrTelefonNou;
        data.model = model;

        let json = JSON.stringify(data);
        return new Promise(function(resolve, reject){
            var xhr = new XMLHttpRequest();
            xhr.open("POST", url, true);
            xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
            xhr.onload = function () {
                alert("Comanda adaugata cu success!!!");
                var us = JSON.parse(xhr.responseText);
                if (xhr.readyState == 4 && xhr.status == "200") {
                    console.table(us);
                } else {
                    console.error(us);
                }
            }
            xhr.onerror = function () {
                alert('Nu s-a adaugat comanda!');
            }
            xhr.send(json);            
        })   

}

function getProgram() {
    let program = document.getElementById("program");

  let h1 = document.createElement("h3");
  let t1 = document.createTextNode("Program");
  h1.appendChild(t1);
  let h2 = document.createElement("h4");
  let t2 = document.createTextNode("Luni - Vineri: 10:00 - 20:30 | Sambata - Duminica: Inchis");
  h2.appendChild(t2);
  

  program.appendChild(h1);
  program.appendChild(h2);

}

getProgram();
