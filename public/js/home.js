
function clicked(){
var query = $("#searchbar").val();
$("#searchbar").val("");
    $.ajax({
    url: "/citysearch",
    type: "GET",
    data: {city:query},
});

}
console.log("Before ready function")
$(document).ready(function(){        

	$("#searchbar").keydown( function( event ) {
        if ( event.which === 13 ) {
          clicked();
          event.preventDefault();
          return false;
        }
    });
    
  });
