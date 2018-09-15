function searchBlurays() {
	var term = document.getElementById("brSearch").value;
	var xhr = new XMLHttpRequest();
	var uri = "http://redsox.uoa.auckland.ac.nz/BC/Open/Service.svc/brsearch?term=" + term;
	xhr.open("GET", uri, true);
	xhr.setRequestHeader("Accept", "application/json");
	xhr.onload = function() {
		var myBRList = JSON.parse(xhr.responseText);
		showBlurays(myBRList);
	}
	xhr.send(null);
}

function searchBooks() {
	var term = document.getElementById("bookSearch").value;
	var xhr = new XMLHttpRequest();
	var uri = "http://redsox.uoa.auckland.ac.nz/BC/Open/Service.svc/booksearch?term=" + term;
	xhr.open("GET", uri, true);
	xhr.setRequestHeader("Accept", "application/json");
	xhr.onload = function() {
		var myBRList = JSON.parse(xhr.responseText);
		showBooks(myBRList);
	}
	xhr.send(null);
}

function register() {
	var addr = document.getElementById("regAdd").value;
	var uName = document.getElementById("regName").value;
	var pwd = document.getElementById("regPwd").value;
	var entry = JSON.stringify({
					"Address": addr,
					"Name": uName,
					"Password": pwd
				});
	var xhr = new XMLHttpRequest();
	var uri = "http://redsox.uoa.auckland.ac.nz/BC/Open/Service.svc/register";
	xhr.open("POST", uri, true);
	xhr.setRequestHeader("Content-Type", "Application/json");
	xhr.onload = function() {
		alert(xhr.responseText);
	}
	xhr.send(entry);
	
	document.getElementById("regName").value = "";
	document.getElementById("regPwd").value = "";
	document.getElementById("regAdd").value = "";
}

function comment() {
	var name = document.getElementById("comName").value;
	var comStr = document.getElementById("comString").value;
	var xhr = new XMLHttpRequest();
	var uri = "http://redsox.uoa.auckland.ac.nz/BC/Open/Service.svc/comment?name=" + name;
	xhr.open("POST", uri, true);
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.onload = function() {
		var iFr = document.getElementById("commentIFrame");
		iFr.src = iFr.src;
	}
	xhr.send(JSON.stringify(comStr));
	document.getElementById("comName").value = "";
	document.getElementById("comString").value = "";
}

function getBlurays() {
	var xhr = new XMLHttpRequest();
	var uri = "http://redsox.uoa.auckland.ac.nz/BC/Open/Service.svc/brlist";
	xhr.open("GET", uri, true);
	xhr.setRequestHeader("Accept", "application/json");
	xhr.onload = function() {
		var myBRList = JSON.parse(xhr.responseText);
		showBlurays(myBRList);
	}
	
	xhr.send(null);
}

function getBooks() {
	var xhr = new XMLHttpRequest();
	var uri = "http://redsox.uoa.auckland.ac.nz/BC/Open/Service.svc/booklist";
	xhr.open("GET", uri, true);
	xhr.setRequestHeader("Accept", "application/json");
	xhr.onload = function() {
		var myBRList = JSON.parse(xhr.responseText);
		showBooks(myBRList);
	}
	
	xhr.send(null);
}

function showBlurays(array) {
	var blurayTable = "<tr class='tableTitle'><td>Product Image</td><td>Title</td><td>Buy Now</td></tr>\n";
	for (var i = 0; i < array.length; ++i) {
		var record = array[i];
		var brId = record.Id;
		var img = "<img src=\"http://redsox.uoa.auckland.ac.nz/BC/Open/Service.svc/brimg?id=" + brId + "\"><\img>";
		var buyLink = "<a href=\"http://redsox.uoa.auckland.ac.nz/BC/Closed/Service.svc/brbuy?id=" + brId + "\">&#128722; Buy Now<\a>";
		blurayTable += "<tr class='tableContent'><td>" + img + "</td><td>" + record.Title + "</td><td>" + buyLink + "</td></tr>\n";
	}
	document.getElementById("blurayT").innerHTML = blurayTable;
}

function showBooks(array) {
	var bookTable = "<tr class='tableTitle'><td>Product Image</td><td>Title</td><td>Buy Now</td></tr>\n";
	for (var i = 0; i < array.length; ++i) {
		var record = array[i];
		var bookId = record.Id;
		var img = "<img src=\"http://redsox.uoa.auckland.ac.nz/BC/Open/Service.svc/bookimg?id=" + bookId + "\"><\img>";
		var buyLink = "<a href=\"http://redsox.uoa.auckland.ac.nz/BC/Closed/Service.svc/bookbuy?id=" + bookId + "\">&#128722; Buy Now<\a>";
		bookTable += "<tr class='tableContent'><td>" + img + "</td><td>" + record.Title + "</td><td>" + buyLink + "</td></tr>\n";
	}
	document.getElementById("bookT").innerHTML = bookTable;
}

function showNoTab() {
         document.getElementById("blurayTab").style.backgroundColor = "transparent";
         document.getElementById("bookTab").style.backgroundColor = "transparent";
         document.getElementById("registerTab").style.backgroundColor = "transparent";
		 document.getElementById("commentTab").style.backgroundColor = "transparent";

         document.getElementById("bluraySec").style.display = "none";
         document.getElementById("bookSec").style.display = "none";
         document.getElementById("registerSec").style.display = "none";
		 document.getElementById("commentSec").style.display = "none";
}

function blurayTab() {
    if (currentTab != "blurayTab") {
        currentTab = "blurayTab";
        showNoTab();
        document.getElementById("blurayTab").style.backgroundColor = "lightBlue";
        document.getElementById("bluraySec").style.display = "inline";
		getBlurays();
    }
}

function bookTab() {
    if (currentTab != "bookTab") {
        currentTab = "bookTab";
        showNoTab();
        document.getElementById("bookTab").style.backgroundColor = "lightBlue";
        document.getElementById("bookSec").style.display = "inline";
		getBooks();
    }
}

function registerTab() {
    if (currentTab != "registerTab") {
        currentTab = "registerTab";
        showNoTab();
        document.getElementById("registerTab").style.backgroundColor = "lightBlue";
        document.getElementById("registerSec").style.display = "inline";
    }
}

function commentTab() {
    if (currentTab != "commentTab") {
        currentTab = "commentTab";
        showNoTab();
        document.getElementById("commentTab").style.backgroundColor = "lightBlue";
        document.getElementById("commentSec").style.display = "inline";
    }
}