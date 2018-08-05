var preCmdList = new Array();
var currentCmd = 0;
var cmdNum = 0;

var currentPos = 0;
var cmdLength = 0;

var isShift = false;
var isCapsLock = false;
var isNumLock = false;
var command = new String();

var curPath = "wjong";

$("#kernel").focus();
$("#kernel").keyup(function(event){
  if(event.which == 16){
    // Shift key up
    isShift = false;
  }
});
$("#kernel").keydown(function(event){
  if(event.which == 13){
    // Enter
    if(command.length != 0){
      execute(command);
      preCmdList[cmdNum] = command;
      cmdNum++;
      command = "";
      cmdLength = currentPos = 0;
    }

    $(".letter-caret").remove();
    $(".command-line").addClass("line");
    $(".command-line").removeClass("command-line");
    $("#kernel").append("<div class=\"command-line\"></div>");
    $(".command-line").append("<div class=\"current-path\">"+ curPath + ">&nbsp;</div>");
    $(".command-line").append("<div class=\"letter-caret\"></div>");
  }
  else if(event.which == 16){
    // Shift
    isShift = true;
  }
  else if(event.which == 8){
    // Backspace
    var target = $(".letter-caret").prev();
    if(target.hasClass("letter")){
      target.remove();
      command = delete_letter(command, currentPos);
      cmdLength--;
      currentPos--;
    }
  }
  else if(event.which == 46){
    // Delete
    var target = $(".letter-caret");
    if(currentPos != cmdLength){
      target.next().addClass("letter-caret");
      target.next().removeClass("letter");
      target.remove();
      command = delete_letter(command, currentPos+1);
      cmdLength--;
    }
  }
  else if(event.which == 36 || event.which == 35){
    // Home, END
    var target;
    if(event.which == 36){
      // Home
      target = $(".command-line").children().first();
      currentPos = 0;
    }
    else{
      // End
      target = $(".command-line").children().last();
      currentPos = cmdLength;
    }
    $(".letter-caret").addClass("letter");
    $(".letter-caret").removeClass("letter-caret");
    target.addClass("letter-caret");
    target.removeClass("letter");
  }
  else if(event.which == 37 || event.which == 39){
    // Left Arrow, Right Arrow
    var target;
    if(event.which == 37){
      // Left Arrow
      target = $(".letter-caret").prev();
      if(target.hasClass("letter"))
        currentPos--;
    }
    else{
      // Right Arrow
      target = $(".letter-caret").next();
      if(target.hasClass("letter"))
        currentPos++;
    }

    if(target.hasClass("letter")){
      $(".letter-caret").addClass("letter");
      $(".letter-caret").removeClass("letter-caret");
      target.addClass("letter-caret");
      target.removeClass("letter");
    }    
  }
  else if(event.which == 38){
    // Up Arrow
  }
  else if(event.which == 40){
    // Down Arrow
  }
  else if(event.which == 9){
    // Tab
  }
  else if(event.which == 20){
    // CapsLock
    isCapsLock = !isCapsLock;
  }
  else if(event.which == 144){
    // NumLock
    isNumLock = !isNumLock;
  }
  else if(event.which == 27){
    // ESC
  }
  else if((112 <= event.which && event.which <= 123) || event.which == 12 || event.which == 21 || event.which == 25
          || event.which == 45 || event.which == 33 || event.which == 34 || event.which == 255 || event.which == 18 || event.which == 17){
    // Ignore List
    // F1 ~ F12 || NumPad 5 (No NumLock) || Korean <-> English || Korean <-> Chinese
    // Insert || PageUp, Down || Fn Lock (NoteBook) || Alt || Ctrl
  }
  else{
    var letter;
    if((48 <= event.which && event.which <= 57) && isShift){
      // !, @, #, $, %, ^, &, *, (, )
      switch(String.fromCharCode(event.which)){
        case "0" : letter = ")"; break;
        case "1" : letter = "!"; break;
        case "2" : letter = "@"; break;
        case "3" : letter = "#"; break;
        case "4" : letter = "$"; break;
        case "5" : letter = "%"; break;
        case "6" : letter = "^"; break;
        case "7" : letter = "&"; break;
        case "8" : letter = "*"; break;
        case "9" : letter = "("; break;
      }
    }
    else if(186 <= event.which && event.which <= 222){
      // Other special characters
      if(isShift){
        switch(event.which){
          case 186 : letter = ":"; break;
          case 187 : letter = "+"; break;
          case 188 : letter = "<"; break;
          case 189 : letter = "_"; break;
          case 190 : letter = ">"; break;
          case 191 : letter = "?"; break;
          case 192 : letter = "~"; break;
          case 219 : letter = "{"; break;
          case 220 : letter = "|"; break;
          case 221 : letter = "}"; break;
          case 222 : letter = "\""; break;
        }
      }
      else{
        switch(event.which){
          case 186 : letter = ";"; break;
          case 187 : letter = "="; break;
          case 188 : letter = ","; break;
          case 189 : letter = "-"; break;
          case 190 : letter = "."; break;
          case 191 : letter = "/"; break;
          case 192 : letter = "`"; break;
          case 219 : letter = "["; break;
          case 220 : letter = "\\"; break;
          case 221 : letter = "]"; break;
          case 222 : letter = "\'"; break;
        }
      }
    }
    else if(106 <= event.which && event.which <= 111){
      // Numpad special characters
      switch(event.which){
        case 106 : letter = "*"; break;
        case 107 : letter = "+"; break;
        case 109 : letter = "-"; break;
        case 110 : letter = "."; break;
        case 111 : letter = "/"; break;
      }
    }
    else if(event.which == 32){
      // Space
      letter = "\u00A0";
    }
    else{
      // Alphabet, Number
      letter = String.fromCharCode((96 <= event.which && event.which <= 105) ? event.which - 48 : event.which);
      if(!(isCapsLock ^ isShift))
        letter = letter.toLowerCase().charAt(0);
    }
    command = insert_letter(command, currentPos, letter);
    currentPos++;
    cmdLength++;

    $(".letter-caret").before("<div class=\"letter\">" + letter + "</div>");
  }
});

function insert_letter(str, index, value) {
  return str.substr(0, index) + value + str.substr(index);
}

function delete_letter(str, index) {
  return str.substr(0, index-1) + str.substr(index);
}

function set_path(path) {
  curPath = path;
}