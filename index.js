var fs = require("fs");
var Handlebars = require("handlebars");

function render(resume) {
	var css = fs.readFileSync(__dirname + "/style.css", "utf-8");
	var tpl = fs.readFileSync(__dirname + "/resume.hbs", "utf-8");

  // Only show year.
  ['work', 'volunteer', 'education'].forEach(function(key){
    if(resume[key]){
      resume[key] = resume[key].map(function(obj){
        ['startDate', 'endDate'].forEach(function(date){
          if(obj[date]){
            obj[date] = obj[date].substring(0, 4);
          }
        });
        return obj;
      });
    }
  });

	return Handlebars.compile(tpl)({
		css: css,
		resume: resume
	});
}

module.exports = {
	render: render
};
