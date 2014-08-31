this["jst"] = this["jst"] || {};

this["jst"]["app/templates/test.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<body>\n<p>\n<span>3321</span>\n<ul>\n<li>dsksdk</li>\n<li>";
  if (helper = helpers.varname) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.varname); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</li>\n</ul>\n</p>\n</body>";
  return buffer;
  });

this["jst"]["app/templates/test2.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "sdfsdfdsf\n<p>dssd</p>\n<div>\n<div>\n<div>dfsd</div>\n</div>\n</div>";
  });