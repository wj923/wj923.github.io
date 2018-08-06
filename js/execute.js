var curPath = "wjong";
var curFs = getFilesystem();
curFs = curFs["D/"+curPath];

function execute (command) {
  var cmd = command.split("\u00A0");
  switch(cmd[0]){
    case "cd" : change_directory(command); break;
    case "ls" : list(command); break;
    case "help" : help(); break;
    case "who" : who(); break;
    case "clear" : clear(); break;
    case "open" : open(command); break;
    default : print_line("error", cmd[0] + " : command not found"); break;
  }
}

function change_directory (command) {
  var path = getPath(command);
  var list = curFs;
  var tmpPath = curPath;

  if(path.length == 0){
    curFs = getFilesystem();
    curFs = curFs["D/wjong"];
    curPath = "wjong";
    return;
  }
  
  if(path.length != 0){
    var pathList = path.split("/");
    for(var i in pathList){
      if(pathList[i] == ".") continue;
      else if(pathList[i] == ".."){
        var return_parent = move_parent(tmpPath);
        list = return_parent[0];
        tmpPath = return_parent[1];
        continue;
      }
      var file = list["F/"+pathList[i]];
      if(file){
        print_line("error", "cd : " + path + ": Not a directory");
        return;
      }
      else{
        list = list["D/"+pathList[i]];
        if(!list){
          print_line("error", "cd : " + path + " : No such file or directory");
          return;
        }
        tmpPath += "/" + pathList[i];
      }
    }
  }
  
  var pathList = path.split("/");
  for(var i in pathList){
    if(pathList[i] == ".") continue;
    else if(pathList[i] == ".."){
      var return_parent = move_parent(curPath);
      curFs = return_parent[0];
      curPath = return_parent[1];
      continue;
    }
    curFs = curFs["D/"+pathList[i]];
    curPath += "/" + pathList[i];
  }
}

function list (command) {
  var path = getPath(command);
  var tmpPath = curPath;
  var list = curFs;
  
  if(path.length != 0){
    var pathList = path.split("/");
    for(var i in pathList){
      if(pathList[i] == ".") continue;
      else if(pathList[i] == ".."){
        var return_parent = move_parent(tmpPath);
        list = return_parent[0];
        tmpPath = return_parent[1];
        continue;
      }
      var file = list["F/"+pathList[i]];
      if(file){
        if(i == pathList.length-1){
          print_line("file", path);
          return;
        }
        else{
          print_line("error", "ls : " + path + ": Not a directory");
          return;
        }
      }
      else{
        list = list["D/"+pathList[i]];
        if(!list){
          print_line("error", "ls : " + path + " : No such file or directory");
          return;
        }
        tmpPath += "/" + pathList[i];
      }      
    }
  }

  for(var i in list){
    if(typeof list[i] == "string"){
        if(is_directory(list[i]))
          print_line("directory", list[i].split("/")[1]);
        else
          print_line("file", list[i].split("/")[1]);
    }
  }
}

function help () {
  $("#kernel").append(Data[0]);
}

function who() {
  print_line("directory", "장우종 (Jang Woo Jong)");
  print_line("line", "Soongsil Univ.");
  print_line("line", "010-3517-5766");
  print_line("line", "wj923@naver.com");
  print_line("line", "github.com/wj923");
  print_line("file", "Always Positive, Challenging Developer");
}

function open(command) {

}

function clear() {
  $("#kernel").children().remove();
}

function print_line (type, value) {
  var line = "<div class=\"" + type + "\">" + value + "</div>";
  $("#kernel").append(line);
}

function is_directory(path){
  var identifier = path.split("/")[0];
  if(identifier == "D")
    return true;
  else
    return false;
}

function move_parent (path) {
  var path_slice = path.split("/");
  var parentPath = new String();
  if(path_slice.length == 1)
    return [fs["D/wjong"], "wjong"];
  else{
    var parentFs = getFilesystem();
    for(i=0; i<path_slice.length-1; i++){
      parentFs = parentFs["D/"+path_slice[i]];
      if(i != 0)
        parentPath += "/";
      parentPath += path_slice[i];
    }
  }
  return [parentFs, parentPath];  
}

function getPath (command) {
  var cmd = command.split("\u00A0");
  var path = new String();
  for(var i=1; i<cmd.length; i++){
    path += cmd[i];
    if(i != cmd.length-1)
      path += " ";
  }
  return path;
}