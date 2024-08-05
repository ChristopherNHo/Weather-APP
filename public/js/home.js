
function clicked(){
var query = $("#searchbar").val();
$("#searchbar").val("");
    $.ajax({
    url: "/citysearch",
    type: "GET",
    data: {city:query},
    success: responseData
});

console.log("FINISHED CLICKED FUNCTION");
}


function responseData(data){
  console.log("RESPONSE DATA");
  if(data.data.length == 0){
    alert("Please input a valid location");
    return;   
  }
  else{
    console.log(data.data); 
    console.log("COORDINATES");
    console.log("Latitude = " + data.data[0].lat);
    console.log("Longitude = " + data.data[0].lon);
  }


}

$(document).ready(function(){        

	$("#searchbar").keydown( function( event ) {
        if ( event.which === 13 ) {

          if($("#searchbar").val() == "")
            alert("Please enter a location first.")
          else
            clicked();

          event.preventDefault();
          return false;
        }
    });

    $("#searchbutton").click(function () {
      if($("#searchbar").val() == "")
        alert("Please enter a location first.")
      else
        clicked();
    });
    
  });
