var mainApp = angular.module("mainApp", []);

mainApp.controller("ViewCtr", ['$scope', '$sce', '$window', '$rootScope', function($scope, $sce, $window, $rootScope) {

var leapYear = function(year) {
if (year % 4 == 0) // basic rule
return true // is leap year
/* else */ // else not needed when statement is "return"
return false // is not leap year
}

var getDays = function(month, year) {
// create array to hold number of days in each month
var ar = new Array(12)
ar[0] = 31 // January
ar[1] = (leapYear(year)) ? 29 : 28 // February
ar[2] = 31 // March
ar[3] = 30 // April
ar[4] = 31 // May
ar[5] = 30 // June
ar[6] = 31 // July
ar[7] = 31 // August
ar[8] = 30 // September
ar[9] = 31 // October
ar[10] = 30 // November
ar[11] = 31 // December

// return number of days in the specified month (parameter)
return ar[month]
}

var getMonthName = function(month) {
// create array to hold name of each month
var ar = new Array(12)
ar[0] = "January"
ar[1] = "February"
ar[2] = "March"
ar[3] = "April"
ar[4] = "May"
ar[5] = "June"
ar[6] = "July"
ar[7] = "August"
ar[8] = "September"
ar[9] = "October"
ar[10] = "November"
ar[11] = "December"

// return name of specified month (parameter)
return ar[month]
}

var tellDay = function(day){
var ar_day = new Array(12)
ar_day[0] = "SUNDAY"
ar_day[1] = "MONDAY"
ar_day[2] = "TUESDAY"
ar_day[3] = "WEDNESDAY"
ar_day[4] = "THURSDAY"
ar_day[5] = "FRIDAY"
ar_day[6] = "SATURDAY"

return ar_day[day]
}

var htmlString = function(str){
return '<td>' + str + '</td>'
}


var drawCal = function(firstDay, lastDate, date, monthName, year) {
	console.log('in drawCal func')
	console.log(monthName)
	console.log(year)
	console.log(firstDay)
var digit = 1
var curCell = 1
var count = 0
$scope.x = []
$scope.html = ''
$scope.new_html = ''
console.log($scope.new_html)

for (var row = 1; row <= Math.ceil((lastDate + firstDay - 1) / 7); ++row) {
	$scope.html = $scope.html + '<tr>'
for (var col = 1; col <= 7; ++col) {
count++

if (digit > lastDate){
$scope.x.push('')
$scope.html = $scope.html + htmlString(' ')
}

else if (curCell < firstDay) {
$scope.x.push(' ')
$scope.html = $scope.html + htmlString(' ')
curCell++
} 
else {
	$scope.x.push(digit)
	$scope.html = $scope.html + htmlString(digit)
digit++
}

}
$scope.html = $scope.html + '</tr>'
}
console.log($scope.x)
console.log($scope.html)
$scope.new_html = $sce.trustAsHtml($scope.html)
}


$scope.setCal = function(){
	$scope.now = new Date()
	$scope.year = $scope.now.getYear()
	if ($scope.year < 1000)
	$scope.year+=1900
	$scope.itrYear = $scope.year
	$scope.month = $scope.now.getMonth()
	$scope.itrMonth = $scope.month
	$scope.monthName = getMonthName($scope.month)
	$scope.date = $scope.now.getDate()

	$scope.firstDayInstance = new Date($scope.year, $scope.month, 1)
	$scope.firstDay = $scope.firstDayInstance.getDay()
	firstDayInstance = null

	$scope.days = getDays($scope.month, $scope.year)

	drawCal($scope.firstDay + 1, $scope.days, $scope.date, $scope.monthName, $scope.year)
}

$scope.setCal()

$scope.prevMonthView = function(){
	
	$scope.now = new Date()
	$scope.year = $scope.now.getYear()
	if ($scope.year < 1000)
	$scope.year+=1900
	if($scope.itrMonth == 0){ 
		$scope.itrMonth = 12
		$scope.itrYear = $scope.itrYear - 1
	}
	
	$scope.itrMonth = $scope.itrMonth - 1
	$scope.monthName = getMonthName($scope.itrMonth)
	$scope.date = $scope.now.getDate()

	$scope.firstDayInstance = new Date($scope.itrYear, $scope.itrMonth, 1)
	$scope.firstDay = $scope.firstDayInstance.getDay()
	firstDayInstance = null

	$scope.days = getDays($scope.itrMonth, $scope.year)

	drawCal($scope.firstDay + 1, $scope.days, $scope.date, $scope.monthName, $scope.itrYear)
	}


$scope.nextMonthView = function(){
	
	$scope.now = new Date()
	$scope.year = $scope.now.getYear()
	if ($scope.year < 1000)
	$scope.year+=1900
	//$scope.itrYear = $scope.year
		$scope.itrMonth = $scope.itrMonth + 1
	if($scope.itrMonth == 12){ 
		$scope.itrMonth = 0
		$scope.itrYear = $scope.itrYear + 1
	}
	//$scope.month = $scope.now.getMonth()
	$scope.monthName = getMonthName($scope.itrMonth)
	$scope.date = $scope.now.getDate()

	$scope.firstDayInstance = new Date($scope.itrYear, $scope.itrMonth, 1)
	$scope.firstDay = $scope.firstDayInstance.getDay()
	firstDayInstance = null

	$scope.days = getDays($scope.itrMonth, $scope.year)

	drawCal($scope.firstDay + 1, $scope.days, $scope.date, $scope.monthName, $scope.itrYear)
}

$scope.prevYearView = function(){
	
	$scope.now = new Date()
	$scope.itrYear = $scope.itrYear - 1
	$scope.monthName = getMonthName($scope.itrMonth)
	$scope.date = $scope.now.getDate()

	$scope.firstDayInstance = new Date($scope.itrYear, $scope.itrMonth, 1)
	$scope.firstDay = $scope.firstDayInstance.getDay()
	firstDayInstance = null

	$scope.days = getDays($scope.itrMonth, $scope.year)

	drawCal($scope.firstDay + 1, $scope.days, $scope.date, $scope.monthName, $scope.itrYear)
}

$scope.nextYearView = function(){
	
	$scope.now = new Date()
	$scope.itrYear = $scope.itrYear + 1
	$scope.monthName = getMonthName($scope.itrMonth)
	$scope.date = $scope.now.getDate()

	$scope.firstDayInstance = new Date($scope.itrYear, $scope.itrMonth, 1)
	$scope.firstDay = $scope.firstDayInstance.getDay()
	firstDayInstance = null

	$scope.days = getDays($scope.itrMonth, $scope.year)

	drawCal($scope.firstDay + 1, $scope.days, $scope.date, $scope.monthName, $scope.itrYear)
}


$window.onload = function(){
	$scope.answer = $rootScope.result
	console.log($scope.answer)

	var nameId = 'myModal'
	var nameBtn = 'myBtnAdd'
	
// Get the modal
var modal = document.getElementById(nameId);

// Get the button that opens the modal
var btn = document.getElementById(nameBtn);

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


}

$scope.showDateInfo = function(){
			console.log('in mouse over')
			var count = 0
			var tbl = document.getElementById("tableCal")
			if(tbl != null){
				for(var i = 1; i < tbl.rows.length; ++i){
					for(var j = 0; j < tbl.rows[i].cells.length; ++j){
						tbl.rows[i].cells[j].onclick = function() { getval(this) }
					}
				}
			}

			function getval(cel){
				
				var dateInfo = new Array(3)
				dateInfo[0] = parseInt(cel.innerHTML)
				dateInfo[1] = $scope.itrMonth + 1
				dateInfo[2] = $scope.itrYear
				$scope.dayIndex = (dateInfo[0] + $scope.firstDay - 1)%7
				console.log(dateInfo[0])
				console.log($scope.dayIndex)
				$scope.dayName = tellDay($scope.dayIndex)

				if(cel.innerHTML != ' ')
				alert(getMonthName($scope.itrMonth) + " " + cel.innerHTML + ", " + $scope.itrYear + ": " + $scope.dayName)

			}
		}

/*

    $scope.addMyModal = function(){
    	console.log('in add modal')
    var nameId = 'myModal'
	var nameBtn = 'myBtnAdd'
	
	console.log(nameId)
	console.log(nameBtn)
// Get the modal
var modal = document.getElementById(nameId);

// Get the button that opens the modal
var btn = document.getElementById(nameBtn);

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

    }


    $scope.viewMyModal = function(){
    	var nameId = 'myViewModal'
		var nameBtn = 'myBtnView'
    	console.log('in view modal')
    	console.log(nameId)
		console.log(nameBtn)
    
    var modal = document.getElementById('myViewModal');

	// Get the button that opens the modal
	var btn = document.getElementById("myBtnView");

	// Get the <span> element that closes the modal
	var span = document.getElementsByClassName("close")[0];

	// When the user clicks the button, open the modal
	btn.onclick = function() {
	    modal.style.display = "block";
	}

	// When the user clicks on <span> (x), close the modal
	span.onclick = function() {
	    modal.style.display = "none";
	}

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
	    if (event.target == modal) {
	        modal.style.display = "none";
	    }
	}
    }
    */

}]);


mainApp.controller('taskCtr', ['$scope', '$rootScope', function($scope, $rootScope){
	console.log('in try taskctr')
	
    $scope.today = new Date();
    $scope.saved = localStorage.getItem('taskItems');
    if (localStorage.getItem('taskItems')!==null) 
    $scope.taskItem = JSON.parse($scope.saved)
    localStorage.setItem('taskItems', JSON.stringify($scope.taskItem));
    console.log(JSON.stringify($scope.taskItem))

    var frequency = new Array(5).fill(0)
    var percentage = new Array(5).fill(0)

		console.log(frequency)
	    var len = JSON.parse(localStorage.taskItems).length
	    console.log(JSON.parse(localStorage.taskItems).length)
	    
	    for(var i = 0; i < len; i++) {
	   	console.log(i)
	    var obj = JSON.parse(localStorage.getItem('taskItems'));
	    console.log(obj[i].category);

	    if(obj[i].category == "Self")
	    	frequency[0]++
	    else if(obj[i].category == "Family")
	    	frequency[1]++
	    else if(obj[i].category == "Work")
	    	frequency[2]++
	    else if(obj[i].category == "Social")
	    	frequency[3]++
	    else if(obj[i].category == "Other")
	    	frequency[4]++
		}

		console.log(frequency)
		for(var i=0; i < len-1; i++){
			percentage[i] = parseInt((frequency[i]*100)/len);
		}
		$rootScope.result = percentage 
		console.log($rootScope.result)

    $scope.newTask = null;
    $scope.newTaskDate = null;
    $scope.categories = [
        {name: 'Self'},
        {name: 'Family'},
        {name: 'Work'},
        {name: 'Social'},
        {name: 'Other'}
    ];
    $scope.newTaskCategory = $scope.categories;
    $scope.addNew = function () {
        if ($scope.newTaskDate == null || $scope.newTaskDate == '') {
            $scope.taskItem.push({
                description: $scope.newTask,
                complete: false,
                category: $scope.newTaskCategory.name
            }) 
        } else {
            $scope.taskItem.push({
                description: $scope.newTask,
                date: $scope.newTaskDate,
                complete: false,
                category: $scope.newTaskCategory.name
            })
        };
        $scope.newTask = '';
        $scope.newTaskDate = '';
        $scope.newTaskCategory = $scope.categories;
        localStorage.setItem('taskItems', JSON.stringify($scope.taskItem));
    };

    $scope.deleteTask = function () {
        var completedTask = $scope.taskItem;
        $scope.taskItem = [];
        angular.forEach(completedTask, function (taskItem) {
            if (!taskItem.complete) {
                $scope.taskItem.push(taskItem);
            }
        });
        localStorage.setItem('taskItems', JSON.stringify($scope.taskItem));
    };
    
    $scope.save = function () {
        localStorage.setItem('taskItems', JSON.stringify($scope.taskItem));
    }

    $scope.analysis = function(){
    	Array.apply(null, Array(5)).map(frequency.prototype.valueOf,0);
		console.log(frequency)
	    var len = JSON.parse(localStorage.taskItems).length
	    console.log(JSON.parse(localStorage.taskItems).length)
	    
	    for(var i = 0; i < len; i++) {
	   	console.log(i)
	    var obj = JSON.parse(localStorage.getItem('taskItems'));
	    console.log(obj[i].category);

	    if(obj[i].category == "Self")
	    	frequency[0]++
	    else if(obj[i].category == "Family")
	    	frequency[1]++
	    else if(obj[i].category == "Work")
	    	frequency[2]++
	    else if(obj[i].category == "Social")
	    	frequency[3]++
	    else if(obj[i].category == "Other")
	    	frequency[4]++
		}
		console.log(frequency)
		for(var i=0; i < len-1; i++){
			percentage[i] = parseInt((frequency[i]*100)/len);
		}
		$scope.res = percentage 
		console.log($scope.res)

    }

   
}]); 
