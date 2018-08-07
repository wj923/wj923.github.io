var fs = new Object();
fs["D/wjong"] = ["D/projects", "F/awards", "D/education"];

fs["D/wjong"]["D/projects"] = ["F/lets_go", "F/peep_peep", "F/word_chain", "F/midas_challenge"];
fs["D/wjong"]["D/education"] = ["F/yangjae_ai", "F/do_dream"];
fs["D/wjong"]["F/awards"] = ["< 2016 Software Contest - Bronze Statue >", "Soongsil Univ. IT College (2016.10.04)", 
                             "< 6th Capston Design Competition - The Best Prize >", "Soongsil Univ. Innovation Center (2016.09.21)"]
fs["D/wjong"]["D/projects"]["F/lets_go"] = {name: "Let\'s Go", summary: "Block simulation & 3D Printing App", 
                                            role: "Unity development, Block simulation", date: "2016", link: "https://github.com/wj923/LetGo",
                                            detail: "The \'Let\'s Go\'android app can simulate Lego blocks and convert the results into 3D printable drawing files."};
fs["D/wjong"]["D/projects"]["F/peep_peep"] = {name: "Peep Peep", summary: "Apps that search drug and pharmacy locations",
                                              role: "Android development, UI & Design & Animation", date: "2016", link: "https://github.com/wj923/BBiYac",
                                              detail: "Search for details of the drug by name or symptom & Search for details of nearby or currently operating pharmacies"};
fs["D/wjong"]["D/projects"]["F/word_chain"] = {name: "Word-chain Game", summary: "4-person Word-chain game App using item",
                                               role: "Server development, C based socket server", date: "2017", link: "https://github.com/wj923/NetworkProject",
                                               detail: "Users create a game room and play the game when 4 people get together. The word is a 3-letter Hangul, and there are jump, back and hint items available."};
fs["D/wjong"]["D/projects"]["F/midas_challenge"] = {name: "Midas Challenge", summary: "In-company Cafe App",
                                                    role: "Server development, Python based HTTP server", date: "2018", link: "https://github.com/wj923/MidasChallengeServer",
                                                    detail: "Restful server using flask. Users and Administrators are separated. Users can view the menu and place an order. Administrator can manage menus and order."};
fs["D/wjong"]["D/education"]["F/yangjae_ai"] = {name: "2018 Innovation hub AI School, AI R&D Hands-on worker Training Course", organizer: "Yangjae R&CD Innovation hub",
                                                date: "2018.05.01 ~ 2018.09.09", summary: "Learning about AI", link: "http://yangjaehub.com",
                                                detail: "Theoretical process for learning machine learning and algorithm overview (8 weeks),\
                                                Team project process that uses libraries and learns analysis techniques used in the field (6 weeks),\
                                                Career Coaching Course (2 Weeks)"};
fs["D/wjong"]["D/education"]["F/do_dream"] = {name: "Do Dream Match Makers", organizer: "Shinhan Bank, ARCON",
                                              date: "2018.07.03 ~ 2018.08.22", summary: "Web development job training", link: "http://www.understandavenue.com",
                                              detail: "Learn web development languages such as HTML, CSS, and Javascript, and learn how to use tools such as Firebase, Git, and Jasmine."};                                          


var help_table = "<table class=\"help-table\">\
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
                        <div style=\"float:right; color: lightskyblue; margin-left:15px\">(directory,&nbsp;</div> \
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