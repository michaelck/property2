!function(e){e.deparam=function(p,a){var t={},s={"true":!0,"false":!1,"null":null};return e.each(p.replace(/\+/g," ").split("&"),function(p,r){var n,l=r.split("="),o=decodeURIComponent(l[0]),i=t,c=0,u=o.split("]["),d=u.length-1;if(/\[/.test(u[0])&&/\]$/.test(u[d])?(u[d]=u[d].replace(/\]$/,""),u=u.shift().split("[").concat(u),d=u.length-1):d=0,2===l.length)if(n=decodeURIComponent(l[1]),a&&(n=n&&!isNaN(n)?+n:"undefined"===n?void 0:void 0!==s[n]?s[n]:n),d)for(;d>=c;c++)o=""===u[c]?i.length:u[c],i=i[o]=d>c?i[o]||(u[c+1]&&isNaN(u[c+1])?{}:[]):n;else e.isArray(t[o])?t[o].push(n):t[o]=void 0!==t[o]?[t[o],n]:n;else o&&(t[o]=a?void 0:"")}),t}}(jQuery);var app={};window.app=app,app.els={content:$("[data-hook=content]"),search:$("[data-hook=search]"),appTitle:$("[data-hook=app-title]"),appCrumb:$("[data-hook=app-crumb]"),appLink:$("<a>").attr("href",window.location.pathname)},app.els.appCrumbText=app.els.appCrumb.contents(),app.els.appCrumbLink=app.els.appLink.clone().text(app.els.appCrumb.text()),$("#templates").children().each(function(e,p){var a=$(p);app.els[a.data("hook")]=a}),app.views={titleLink:function(){app.els.appTitle.contents().wrap(app.els.appLink)},breadcrumbs:function(e){e?(app.els.appCrumbText.detach(),app.els.appCrumbLink.appendTo(app.els.appCrumb),app.els.crumb.text(e).appendTo(app.els.appCrumb.parent())):(app.els.appCrumbLink.detach(),app.els.appCrumbText.appendTo(app.els.appCrumb),app.els.crumb.detach())},search:function(e){e?app.els.search.val(e):(app.els.search.val(""),app.els.search.attr("placeholder","1234 Market, for example"))},count:function(e){app.els.count.find("#total").text(e),app.els.count.appendTo(app.els.content)},result:function(e){var p=app.els.result.clone(),a=e.standardizedAddress;p.find("a").attr("href","?"+$.param({a:a})).text(a),p.appendTo(app.els.results)},results:function(e){return e.error?app.els.content.text(e.error):(app.els.content.empty(),app.views.count(e.addresses.length),app.els.results.empty(),e.addresses.forEach(app.views.result),void app.els.results.appendTo(app.els.content))}},app.views.titleLink(),app.render=function(){var e=$.deparam(window.location.search.substr(1));app.views.search(e.q),e.q?(app.views.breadcrumbs("Search Results"),app.els.content.children().detach(),history.state?app.views.results(history.state):(app.els.content.text("Loading..."),$.ajax("https://api.phila.gov/ulrs/v3/addresses/"+encodeURIComponent(e.q)+"?format=json").done(function(e){history.replaceState&&history.replaceState(e),app.views.results(e)}).fail(function(){var e={error:"Failed to retrieve results. Please try another search."};history.replaceState&&history.replaceState(e),app.views.results(e)}))):e.a?app.views.breadcrumbs("Address"):app.views.breadcrumbs()},app.render(),window.onpopstate=app.render,app.els.search.parent().on("submit",function(e){if(history.pushState){e.preventDefault();var p=e.target.elements.q;p.blur(),history.pushState(null,p.value,"?"+$.param({q:p.value})),app.render()}});