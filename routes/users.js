var express = require('express');
var router = express.Router();
var request = require("request");
var cheerio = require("cheerio");

router.get('/', function(req, res, next) {
	if(req.query.begin_date&&req.query.end_date){
		var options = {
			url:'https://waterdata.usgs.gov/nwis/dv?cb_00010=on&cb_00095=on&cb_00300=on&cb_00400=on&cb_72019=on&format=html&site_no=431053090042702&referred_module=sw&period=&begin_date='+req.query.begin_date+'&end_date='+req.query.end_date
		}
		//warning 2017 3 12 not found (ph & oxygen)
		var x = 6;
		var d = req.query.begin_date.split("-");

		request(options ,function(err ,r ,data){
			if(err||!data)return res.send("con not connect server");
			var $ = cheerio.load(data);
			var table = $("table[class]").eq($("table[class]").length-1).find("td");
			var db = [];
			for(var i=0;i<table.length;i+=x){
				db.push({
					date:(table.eq(i).text()),
					depth:parseInt(table.eq(i+1).text()),
					specific:parseInt(table.eq(i+2).text()),
					degC:parseInt(table.eq(i+3).text()),
					ph:parseInt(table.eq(i+4).text()),
					oxygen:parseInt(table.eq(i+5).text())
				})
			}
			// console.log(db);
			res.send(JSON.stringify(db));
		});
	}else
		res.send("not found");
});

module.exports = router;
