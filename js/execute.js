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
    case "open" : open(cmd); break;
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
  $("#kernel").append(help_table);
}

function who() {
  print_line("directory", "장우종 (Jang Woo Jong)");
  print_line("line", "Soongsil Univ. Department of Computer Science");
  print_line("line", "010-3517-5766");
  print_line("line", "wj923@naver.com");
  print_line("line", "github.com/wj923");
  print_line("file", "Always Positive, Challenging Developer");
  $("#kernel").append("<br>");
}

function open(command) {
  var list = curFs;
  var str = curPath.split("/");
  var curDir = str[str.length-1];
  var file;
  var file_path = command[1];
  var tmpPath = curPath;
  var isDetail = false;

  if(command.length == 1) return;
  
  if(command.length == 3 && (command[1] == "-d" || command[2] == "-d") ){
    file_path = (command[1]=="-d" ? command[2] : command[1]);
    isDetail = true; 
  }

  var pathList = file_path.split("/");
  for(var i in pathList){
    if(pathList[i] == ".") continue;
    else if(pathList[i] == ".."){
      var return_parent = move_parent(tmpPath);
      list = return_parent[0];
      tmpPath = curDir = return_parent[1];
      continue;
    }
    var tmpFile = list["F/"+pathList[i]];
    if(tmpFile){
      if(i != pathList.length-1){
        print_line("error", "open : " + curDir + "/" + pathList[i] + ": Not a directory");
        return;
      }
      file = tmpFile;
      break;
    }
    else{
      list = list["D/"+pathList[i]];
      if(!list){
        print_line("error", "open : The file \'" + tmpPath + "/" + file_path + "\' does not exist");
        return;
      }
      
      if(i == pathList.length-1){
        print_line("error", "open : \'" + tmpPath + "/" + file_path + "\' is not a file");
        return;
      }
      tmpPath += "/" + pathList[i];
      curDir = pathList[i];
    }      
  }
  
  if(curDir == "wjong"){
    for(var i in file)
      print_line(i%2==0 ? "content-title" : "line-right", file[i]);
    $("#kernel").append("<br>");
    return;
  }

  print_line("content-title", "< "+file.name+" >");
  if(isDetail){
    print_line("line", file.detail);
    $("#kernel").append("<br>");
    return;
  }
  print_line("directory", file.summary);
  print_line("line", "date : "+file.date);
  print_line("line", curDir=="projects" ? "role : "+file.role : "organizer : "+file.organizer);
  print_line("line", "<a href=\""+file.link+"\" target=\"_blank\">"+file.link+"</a>");
  $("#kernel").append("<br>");
}

function clear() {
  $("#kernel").children().remove();
}

function print_line (type, value) {
  var line = "<div class=\"" + type + "\">" + value + "</div>";
  $("#kernel").append(line);
}

function is_directory(path){
  return path.split("/")[0] == "D" ? true : false;
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