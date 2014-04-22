/*
App: Vimeo App oef1 katrien
=========================================================================
Version: 0.1.0
Last updated: 11/12/2013
=========================================================================
*/
var _vimeoData = null;
var URLDATAVIMEOGROUP = 'http://vimeo.com/api/v2/group/209646/videos.json?callback=?';


/*
 Utilities
 =========================================================================
 */
String.prototype.format = function() {
    var formatted = this;
    for (var i = 0; i < arguments.length; i++) {
        var regexp = new RegExp('\\{'+i+'\\}', 'gi');
        formatted = formatted.replace(regexp, arguments[i]);
    }
    return formatted;
};

/*
 Function: Load Vimeo Group Data
 =========================================================================
 Load Vimeo Videos from a certain group
 */



function loadVimeoGroup (groupname){
    $.ajax({
        type:'Get',
        url:URLDATAVIMEOGROUP.format(groupname),
        dataType:'jsonp',
        contentType:'application/json',
        cache:false,
        success: function(data){
            _vimeoData = data;
            parseAndVizuVimeoData();
        }

    })
}

/*
 Function: Parse en Visualize Vimeo Data
 =========================================================================
 Show all Vimeo data
 */

function parseAndVizuVimeoData(){

    $("#vimeoitems").html();//Clear all data in element

    var content= ' ';
    content += '<ul> ';
    $.each(_vimeoData, function(key, vimeoDataItem){
        content += ' '
        + '<li data-id="' + vimeoDataItem.id +'" class="vimeoitem col col-sc1-12 col-sc2-6 col-sc3-4 col-sc4-4 col-sc5-3 col-sc6-3">'
        + '<h2>' + vimeoDataItem.user_name +'</h2>'
        + '<p class="title">' + vimeoDataItem.title + '</p>'
        + '<img src="' + vimeoDataItem.thumbnail_medium + '"class="thumbnail" />'
        + '<p class="foot">' + vimeoDataItem.stats_number_of_likes + '<img src="content/images/like.png" class="icon" />'
        + vimeoDataItem.stats_number_of_plays + '<img src="content/images/view.png" class="icon" />' 
        + vimeoDataItem.stats_number_of_comments + '<img src="content/images/comments.png" class="icon" />'
        + '</p>'
        //+ '<iframe id="video" src="'+ "http://player.vimeo.com/video/"+ _vimeoDataItem.id +'" allowfullscreen="" frameborder="0" height="315" width="100%"></iframe>'
        + '</li>';


    });
    content += '</ul>';
    $("#vimeoitems").append(content);
    }

/*
 Function: Nameless function
 =========================================================================
 Simulate document.ready but better
 */

(function (){
    loadVimeoGroup(209646);
})();