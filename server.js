var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
var path    = require("path");

//
app.use(express.static("./"));


app.get('/', function(req, res){
  var url = 'https://news.ontario.ca/cabinet/en';

  request(url, function(error, response, html){
    if(!error){
      var $ = cheerio.load(html);


      var json = {
        ministers:[]
      };



        $('#bioList').filter(function(){
          $('.bioCard').filter(function(){
            var data = $(this);
                 var person = {
                   name:data.find('h3').text().trim() ,
                   img: data.find('img').attr('src'),
                   titles: []

                 }

                 data.find('p').find('a').each(function (index) {

                       person.titles[index] = $( this ).text();
                  })


                 json.ministers.push(person);

          })
        })

    }

    fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
      console.log('File successfully written! - Check your project directory for the output.json file');
    })

  })

    res.sendFile("./");
})

app.listen('8081');
console.log('Magic happens on port 8081');
exports = module.exports = app;
