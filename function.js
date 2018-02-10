var apikey = "af1146a2df5582ec7a4b02c644eb2c1f";
var links = "";
var page = 1;
console.log("ready!!!");
function getlist(photoset_id, page){
    var xml = new XMLHttpRequest();
    xml.open("GET", "https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=" + apikey + "&per_page=500&format=json&nojsoncallback=1&photoset_id=" + photoset_id + "&page=" + page, false);
    xml.send();
    return JSON.parse(xml.response);
}
function getlink(photo_id){
    var xml = new XMLHttpRequest();
    xml.open("GET", "https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=" + apikey + "&format=json&nojsoncallback=1&photo_id=" + photo_id, false);
    xml.send();
    var response = JSON.parse(xml.response);
    var link = response["sizes"]["size"][response["sizes"]["size"].length - 1]["source"];
    return link;
}
var json = "";
console.log("starting!!!");
do {
    json = getlist(document.URL.split("/")[6], page);
    for (var i = 0; i < json["photoset"]["photo"].length; i++){
        links += getlink(json["photoset"]["photo"][i]["id"]) + "\n";
        console.log("< count");
    }
    page = page + 1;
}while(page <= json["photoset"]["pages"]);
console.clear();
console.log(links);
console.log("done!!!");
var a = "";
for (var i = 0;i<links.split("\n").length;i++){
    a = document.createElement("a");
    a.download = links.split("\n")[i].split("/")[4];
    a.href = links.split("\n")[i];
    document.body.appendChild(a);
    a.click();
}
