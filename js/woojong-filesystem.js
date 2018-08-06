var fs = new Object();
fs["D/wjong"] = ["D/projects", "F/awards", "D/education", "F/introduce"];

fs["D/wjong"]["D/projects"] = ["F/abc"];
fs["D/wjong"]["D/projects"]["F/abc"] = 2;
fs["D/wjong"]["F/awards"] = 1;

function getFilesystem() {  
  return fs;
}