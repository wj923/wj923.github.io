// set up text to print, each item in array is new line
var aText = new Array(
    "There are only 10 types of people in the world:",
    "Those who understand binary, and those who don't"
    );
var iSpeed = 20; // time delay of print out
var iIndex = 0; // start printing array at this posision
var iArrLength = aText[0].length; // the length of the text array
var iScrollAt = 20; // start scrolling up at this many lines
   
var iTextPos = 0; // initialise text position
var sContents = ''; // initialise contents variable
var iRow; // initialise current row
   
function typewriter() {
  sContents =  ' ';
  iRow = Math.max(0, iIndex-iScrollAt);
  var destination = document.getElementById("typedtext");
   
  while ( iRow < iIndex ) {
    sContents += aText[iRow++] + '<br />';
  }
  destination.innerHTML = sContents + aText[iIndex].substring(0, iTextPos);
  if ( iTextPos++ == iArrLength ) {
    iTextPos = 0;
    iIndex++;
    if ( iIndex != aText.length ) {
      iArrLength = aText[iIndex].length;
      setTimeout("typewriter()", 300);
    }
    else{
      $("#kernel").append("<div class=\"command-line\"></div>");
      $(".command-line").append("<div class=\"current-path\">wjong>&nbsp;</div>");
      $(".command-line").append("<div class=\"letter-caret\"></div>");
    }
  }
  else {
    destination.innerHTML += "_";
    setTimeout("typewriter()", iSpeed);
  }
}
typewriter();
