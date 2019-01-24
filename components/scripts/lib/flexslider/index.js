/**
 * Created by mehmet.ham on 10/25/2016.
 */
require('./flexslider');
/*! modernizr 3.5.0 (Custom Build) | MIT *
 * https://modernizr.com/download/?-touchevents-setclasses !*/
!function(e,n,t){function o(e,n){return typeof e===n}function s(){var e,n,t,s,a,i,r;for(var l in c)if(c.hasOwnProperty(l)){if(e=[],n=c[l],n.name&&(e.push(n.name.toLowerCase()),n.options&&n.options.aliases&&n.options.aliases.length))for(t=0;t<n.options.aliases.length;t++)e.push(n.options.aliases[t].toLowerCase());for(s=o(n.fn,"function")?n.fn():n.fn,a=0;a<e.length;a++)i=e[a],r=i.split("."),1===r.length?Modernizr[r[0]]=s:(!Modernizr[r[0]]||Modernizr[r[0]]instanceof Boolean||(Modernizr[r[0]]=new Boolean(Modernizr[r[0]])),Modernizr[r[0]][r[1]]=s),f.push((s?"":"no-")+r.join("-"))}}function a(e){var n=u.className,t=Modernizr._config.classPrefix||"";if(p&&(n=n.baseVal),Modernizr._config.enableJSClass){var o=new RegExp("(^|\\s)"+t+"no-js(\\s|$)");n=n.replace(o,"$1"+t+"js$2")}Modernizr._config.enableClasses&&(n+=" "+t+e.join(" "+t),p?u.className.baseVal=n:u.className=n)}function i(){return"function"!=typeof n.createElement?n.createElement(arguments[0]):p?n.createElementNS.call(n,"http://www.w3.org/2000/svg",arguments[0]):n.createElement.apply(n,arguments)}function r(){var e=n.body;return e||(e=i(p?"svg":"body"),e.fake=!0),e}function l(e,t,o,s){var a,l,f,c,d="modernizr",p=i("div"),h=r();if(parseInt(o,10))for(;o--;)f=i("div"),f.id=s?s[o]:d+(o+1),p.appendChild(f);return a=i("style"),a.type="text/css",a.id="s"+d,(h.fake?h:p).appendChild(a),h.appendChild(p),a.styleSheet?a.styleSheet.cssText=e:a.appendChild(n.createTextNode(e)),p.id=d,h.fake&&(h.style.background="",h.style.overflow="hidden",c=u.style.overflow,u.style.overflow="hidden",u.appendChild(h)),l=t(p,e),h.fake?(h.parentNode.removeChild(h),u.style.overflow=c,u.offsetHeight):p.parentNode.removeChild(p),!!l}var f=[],c=[],d={_version:"3.5.0",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,n){var t=this;setTimeout(function(){n(t[e])},0)},addTest:function(e,n,t){c.push({name:e,fn:n,options:t})},addAsyncTest:function(e){c.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=d,Modernizr=new Modernizr;var u=n.documentElement,p="svg"===u.nodeName.toLowerCase(),h=d._config.usePrefixes?" -webkit- -moz- -o- -ms- ".split(" "):["",""];d._prefixes=h;var m=d.testStyles=l;Modernizr.addTest("touchevents",function(){var t;if("ontouchstart"in e||e.DocumentTouch&&n instanceof DocumentTouch)t=!0;else{var o=["@media (",h.join("touch-enabled),("),"heartz",")","{#modernizr{top:9px;position:absolute}}"].join("");m(o,function(e){t=9===e.offsetTop})}return t}),s(),a(f),delete d.addTest,delete d.addAsyncTest;for(var v=0;v<Modernizr._q.length;v++)Modernizr._q[v]();e.Modernizr=Modernizr}(window,document);


$('.section-flexslider').flexslider({
    animation: "fade",
    selector: ".slides > .content-type",
    slideshowSpeed: 4000,
    controlNav: true,
    drag:true,
    keyboard: true,
    touch: true,
    itemMargin: 0,
    directionNav: true,
    minItems: 1,
});

$('.multiple-filexslider').flexslider({
    animation: "swing",
    prevText: "<i class='font-back'></i>",
    nextText: "<i class='font-next'></i>",
    slideshowSpeed: 4000,
    controlNav: false,
    touch: true,
    itemMargin: false,
    itemWidth:306,
    directionNav: true,
    minItems: 3,
    maxItems: 20,
    startAt: 1
});
$('.other-filexslider').flexslider({
    animation: "swing",
    prevText: "<i class='font-back'></i>",
    nextText: "<i class='font-next'></i>",
    slideshowSpeed: 4000,
    controlNav: false,
    touch: true,
    itemMargin: 9,
    itemWidth:306,
    directionNav: true,
    maxItems: 3,
    startAt: 1
});

$('.thumb-flexslider').flexslider({
    animation: "slide",
    prevText: "",
    nextText: "",
    slideshowSpeed: 3000,
    controlNav: "thumbnails",
    touch: true,
    directionNav: true,
    start: function(){
        $('.flex-control-nav .flex-active').parent('li').addClass('flex-active').siblings().removeClass('flex‌​-active');
    },
    after: function(){
        $('.flex-control-nav li').removeClass('flex-active');
        $('.flex-control-nav .flex-active').parent('li').addClass('flex-active').siblings().removeClass('flex‌​-active');
    }
});

/*
if(device.any()){
    $('.flexslider').flexslider({
        animation: "swing",
        prevText: "",
        nextText: "",
        slideshowSpeed: 4000,
        controlNav: true,
        touch: true,
        itemWidth: 135,
        itemMargin: 17,
        directionNav: false,
        minItems:2,
    });

    $('.home-flexslider').flexslider({
        animation: "swing",
        prevText: "",
        nextText: "",
        slideshowSpeed: 4000,
        slideshow:false,
        controlNav: false,
        touch: true,
        itemMargin: 0,
        directionNav: false,
        itemWidth: 200,
        minItems:1,
        startAt: 1
    });
}
*/
