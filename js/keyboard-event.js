var preCmdList = new Array();
var currentCmd = 0;
var cmdNum = 0;

var tmpCmd;

var currentPos = 0;
var cmdLength = 0;

var isShift = false;
var isCapsLock = false;
var isNumLock = false;
var isTab = false;

var command = new String();
var curPath = "wjong";

$("#kernel").blur(function() {
  $(".letter-caret").css("animation-name", "lose-focus");
  $(".letter-caret").css("border", "ridge 0.5px");
});
$("#kernel").focus(function() {
  $(".letter-caret").css("animation-name", "blink");
  $(".letter-caret").css("border", "none");
});
$("#kernel").focus();
$("#kernel").on("keydown.disableScroll", function(e) { e.preventDefault(); });
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
      currentCmd = cmdNum;
      command = "";
      cmdLength = currentPos = 0;
    }

  
    $(".letter-caret").addClass("letter");
    $(".letter-caret").removeClass("letter-caret");
    $(".command-line").addClass("line");
    $(".command-line").removeClass("command-line");
    $("#kernel").append("<div class=\"command-line\"></div>");
    $(".command-line").append("<div class=\"current-path\">"+ curPath + ">&nbsp;</div>");
    $(".command-line").append("<div class=\"letter-caret\"></div>");
  }
  else if(event.which == 16){
    // Shift
    isShift = true;
    isTab = false;
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
    isTab = false;
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
    isTab = false;
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
    isTab = false;
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
    isTab = false;
  }
  else if(event.which == 38 || event.which == 40){
    // Up Arrow, Down Arrow
    if(event.which == 38 && currentCmd-1 >= 0){
      // Up Arrow
      if(currentCmd == cmdNum){
        tmpCmd = command;
      }
      $(".command-line").children(".letter").remove();
      currentCmd--;
      command = preCmdList[currentCmd];
      for(var i in command)
        $(".letter-caret").before("<div class=\"letter\">" + command[i] + "</div>");
      currentPos = command.length;
      cmdLength = command.length;
    }
    else if(event.which == 40 && currentCmd != cmdNum){
      // Down Arrow
      $(".command-line").children(".letter").remove();
      currentCmd++;
      command = (currentCmd == cmdNum) ? tmpCmd : preCmdList[currentCmd];
      for(var i in command)
        $(".letter-caret").before("<div class=\"letter\">" + command[i] + "</div>");
      currentPos = command.length;
      cmdLength = command.length;
    }
    isTab = false;
  }
  else if(event.which == 9 && currentPos == cmdLength){
    // Tab
    var list = curFs;
    var str = command.split("\u00A0");
    var start_str;

    var path = str[str.length-1];
    var tmpPath = curPath;
    var pathList = path.split("/");
    for(var i in pathList){
      if(pathList[i] == ".") continue;
      else if(pathList[i] == ".."){
        var return_parent = move_parent(tmpPath);
        list = return_parent[0];
        tmpPath = return_parent[1];
        continue;
      }

      if(i == pathList.length-1){
        start_str = pathList[i];
        break;
      }
      list = list["D/"+pathList[i]];
      if(!list) return;
      tmpPath += "/" + pathList[i];
    }

    var pattern = new RegExp("^"+start_str+".*");
    var match_list = new Array();
    for(var i=0; i<list.length; i++){
      if(list[i].substr(2).match(pattern))
        match_list.push(list[i]);
    }

    if(match_list.length == 1){
      var remain_str = match_list[0].substr(start_str.length+2);
      command += remain_str;
      currentPos += remain_str.length;
      cmdLength += remain_str.length;
      for(var i in remain_str)
        $(".letter-caret").before("<div class=\"letter\">" + remain_str[i] + "</div>");
    }
    else if(match_list.length > 1){
      if(!isTab){
        isTab = true;
        return;
      }
      for(var i in match_list){
        if(is_directory(match_list[i]))
          print_line("directory", match_list[i].substr(2));
        else
          print_line("file", match_list[i].substr(2));
      }
      var cur_line = $(".command-line").clone();
      $(".letter-caret").addClass("letter");
      $(".letter-caret").removeClass("letter-caret");
      $(".command-line").addClass("line");
      $(".command-line").removeClass("command-line");
      $("#kernel").append(cur_line);
    }
  }
  else if(event.which == 20){
    // CapsLock
    isCapsLock = !isCapsLock;
    isTab = false;
  }
  else if(event.which == 144){
    // NumLock
    isNumLock = !isNumLock;
    isTab = false;
  }
  else if(event.which == 27){
    // ESC
    $(".letter-caret").remove();
    $(".command-line").addClass("line");
    $(".command-line").removeClass("command-line");
    $("#kernel").append("<div class=\"command-line\"></div>");
    $(".command-line").append("<div class=\"current-path\">"+ curPath + ">&nbsp;</div>");
    $(".command-line").append("<div class=\"letter-caret\"></div>");
    isTab = false;
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
    isTab = false;
  }
  $("#kernel").scrollTop($("#kernel").prop("scrollHeight"));
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