/*** jsx React.DOM */
var initialArray = [7001, 7002, 7003, 7004, 7005];

var currentArray = initialArray.slice();

var duplicateValues = [];

var notificationMessage = {
	rangeError : '',
	duplication : ''
}

var isPresent = function(ele, arr){
	if(arr.indexOf(ele) >= 0){
		//console.log(ele+" already present");
		return true;
	}
	else{
		return false;
	}
};

var pushNumbersInRange = function(lowerB, upperB){
	if(lowerB > upperB)
		notificationMessage.rangeError = "Lower Bound can't be greater than upper bound";
	else{
		notificationMessage.rangeError = '';
		for(var i=lowerB; i<=upperB; i++){
			if(!isPresent(i, currentArray))
				currentArray.push(i);
			else if(!isPresent(i, duplicateValues))
				duplicateValues.push(i);
		}
	}
};

var displayArray = function(arr){
	return "[ "+arr.join(" , ")+" ]";
};

var ArrayInputField = React.createClass({
	handleKeyPress : function(e){
		// whitelist all digits, space, comma, hyhen, backspace & enter
		var allowedValues = [8, 13, 32, 44, 45, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58];
		pressedKey = e.which;
		if(allowedValues.indexOf(pressedKey) == -1)
			e.preventDefault();
	},
	handleKeyUp : function(){
		var range = [];
		currentArray = initialArray.slice();
		duplicateValues = [];
		var values = this.refs.arrayField.getDOMNode().value.split(',');
		values.forEach(function(ele){
			if(ele.indexOf('-')>=0){
				range = ele.split('-');
				var lowerBound = parseInt(range[0]);
				var upperBound = parseInt(range[1]);
				pushNumbersInRange(lowerBound, upperBound);
			}else if(!isNaN(parseInt(ele))){
				ele = parseInt(ele);
				if(!isPresent(ele, currentArray))
					currentArray.push(ele);
				else if(!isPresent(ele, duplicateValues))
					duplicateValues.push(ele);
			}
		});
		if(duplicateValues.length > 0){
			var newAditionsCount = currentArray.length - initialArray.length;
				notificationMessage.duplication = "Duplicate value(s) - "+duplicateValues.toString()+" will be skipped. Final quantity of new additions is "+newAditionsCount;		
		}
		else{
			notificationMessage.duplication = '';
		}
		//clear range error message if there's no '-' in input string
		if(values.toString().indexOf('-') == -1){
			notificationMessage.rangeError = '';
		}
		console.log(currentArray);
		this.props.onUserInput(currentArray, notificationMessage.rangeError, notificationMessage.duplication);
	},
	render : function () {
		return(
			<input type="text" placeholder="Enter your array" ref="arrayField" id="userInput" className="textInput" autoComplete="off" onKeyPress={this.handleKeyPress} onKeyUp={this.handleKeyUp} name="userInput"/>
		)
	}
});

var SubmitArrayBtn = React.createClass({
	render : function(){
		return(
			<button type="submit" className="submitBtn">Submit</button>
		)
	}
});

var ArrayForm = React.createClass({
	handleFormSubmit : function(e){
		document.arrayInput.userInput.value = currentArray;
			return true;
	},
	render : function(){
		return(
			<form onSubmit={this.handleFormSubmit} method="post" name="arrayInput">
				<ArrayInputField onUserInput={this.props.onUserInput} />
				<SubmitArrayBtn />
			 </form>
		)
	}
});

var Notification = React.createClass({
	render : function(){
		return(
			<div className="notificationWrapper">
				<p>{this.props.message.rangeError}</p>
				<p>{this.props.message.duplication}</p>
				<p>You may enter comma separated numbers or a range of numbers separated by hyphen</p>
			</div>
		)
	}
});

var CurrentArrayDisplay = React.createClass({
	render : function(){
		return(
			<span className="arrayValue" id="currentArray">{displayArray(this.props.array)}</span>
		)
	}
})

var ArrayDisplay = React.createClass({
	render : function(){
		return(
			<div className="arrayDisplay">
				<div className="currentArray">
					<p className="arrayName">Current Array | Unique Values</p>
					<CurrentArrayDisplay array={this.props.array} />
				</div>
				<div className="divider"></div>
				<div className="initialArray">
					<p className="arrayName">Initial Array </p>
					<span className="arrayValue">{displayArray(initialArray)}</span>
				</div>
			</div>
		)	
	}
});

var BigWrapper = React.createClass({
	getInitialState : function(){
		return{
			array : initialArray,
			notification : {
				duplication : "",
				rangeError : ""
			}
		}
	},
	handleUserInput : function(arr, rangeErr, duplicationErr){
		this.setState({
			array : arr,
			notification : {
				instruction : "You may enter comma separated numbers or a range of numbers separated by hyphen",
				duplication : duplicationErr,
				rangeError : rangeErr
			}
		});
	},
	render : function() {
		return (
			<div>
				<h2 className="testName">DevTest#3</h2>
				<ArrayForm onUserInput={this.handleUserInput} />
				<div id="notification">
					<Notification message={this.state.notification} />
				</div>
				<ArrayDisplay array={this.state.array} />
			</div>
		);
	}
});

React.render(
	<BigWrapper />,
	document.getElementById('content')
);