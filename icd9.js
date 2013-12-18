var express = require('express');
var app = express();
var fs = require('fs');

var fileText = fs.readFileSync('icd9.txt');
var lines = fileText.toString().split('\n');

app.use('/public',express.static(__dirname + '/public'));

app.get('/icd9/search/:searchString', function(req, res) {
  if(req.params.searchString < 0) {
    res.statusCode = 404;
    return res.send('Error 404: No quote found');
  }
    var searchString = req.params.searchString.toUpperCase();
    var searchTokens = searchString.split(' ');
    var searchResults = [];
    
    lines.forEach(function(line){
        tokenFound = true;
        searchTokens.forEach(function(token){
            if (tokenFound){
                if (line.indexOf(token) == -1){
                    tokenFound = false;
                } 
            }
        });
        
        if (tokenFound == true){
            searchResults.push(line);
        }
    });
    
    res.send(JSON.stringify(searchResults));

});


app.listen(8000);
console.log('listening at 8000');
