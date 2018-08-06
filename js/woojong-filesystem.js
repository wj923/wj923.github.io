var fs = new Object();
fs["D/wjong"] = ["D/projects", "F/awards", "D/education", "F/introduce"];

fs["D/wjong"]["D/projects"] = ["F/abc"];
fs["D/wjong"]["D/projects"]["F/abc"] = 2;
fs["D/wjong"]["F/awards"] = 1;

var Data = new Array();
Data[0] = "<table class=\"help-table\">\
            <tr>\
              <th>help</th>\
              <td>show all the possible command</td>\
            </tr>\
            <tr>\
              <th>who</th>\
              <td>display information about WooJong</td>\
            </tr>\
            <tr>\
              <th>cd&nbsp;<div class=\"underline\">[dir]</div> </th> \
              <td>change the working directory</td>\
            </tr>\
            <tr>\
              <th>ls&nbsp;<div class=\"underline\">[dir]</div></th>\
              <td>list directory contents\
                <div style=\"float:right; color: lightgreen;\">files)</div>\
                <div style=\"float:right; color: lightskyblue;\">&nbsp;(directory,&nbsp;</div> \
              </td>\
            </tr>\
            <tr>\
              <th>open&nbsp;<div class=\"underline\">files</div></th>\
              <td>open the files</td>\
            </tr>\
            <tr>\
              <th>clear</th>\
              <td>clear the terminal screen</td>\
            </tr>\
            </table>";


function getFilesystem() {  
  return fs;
}