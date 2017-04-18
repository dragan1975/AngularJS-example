/*
function slide(){
	var x = document.getElementsByClassName("column_w300_section_01")[0];
	//var y = x.cloneNode(true);
	x.parentNode.removeChild(x);
	document.getElementById('column_w300').appendChild(x);
}
*/

function slide(){
	var firstDiv = $(".column_w300_section_01:first");
	firstDiv.slideUp(function(){
		$(this).appendTo(this.parentNode).slideDown();
	});
}

setInterval(function(){
	slide();
}, 3000);
