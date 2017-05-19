!function(t){"use strict";function e(){}function i(t,e){return e.indexOf(t)>-1}function n(t){return"[object Array]"===Object.prototype.toString.call(t)}function s(t){return"[object Object]"===Object.prototype.toString.call(t)}function a(t,e){return t.className.match(new RegExp("(\\s|^)("+e+")(\\s|$)"))}function r(t,e){a(t,e)||(t.className+=" "+e)}function o(t,e){a(t,e)&&(t.className=t.className.replace(RegExp("(\\s|^)("+e+")(\\s|$)"),"$3"))}function h(t){return!/<\/?[^>]*>/.test(t)&&/^(?:(https|http|ftp|rtsp|mms):)?(\/\/)?(\w+:{0,1}\w*@)?([^\?#:\/]+\.[a-z]+|\d+\.\d+\.\d+\.\d+)?(:[0-9]+)?((?:\.?\/)?([^\?#]*)?(\?[^#]+)?(#.+)?)?$/.test(t)}function l(t){try{return t instanceof HTMLElement}catch(e){return"object"==typeof t&&1===t.nodeType&&"object"==typeof t.style&&"object"==typeof t.ownerDocument}}function d(t){return Array.prototype.slice.apply(t,Array.prototype.slice.call(arguments,1))}function c(t){return t.replace(/^[a-z]/,function(t){return t.toUpperCase()})}var u=function(){var t=d(arguments,0,3);if(!t.length)throw new Error("Parameters required!");var e=s(t.slice(-1)[0])?t.pop():{};switch(t.length){case 2:e.data=e.data||t[1];case 1:e.dom=e.dom||t[0]}if(!e.dom)throw new Error("Container can not be empty!");if(!l(e.dom))throw new Error("Container must be a HTMLElement instance!");if(!e.data||!e.data.length)throw new Error("Data must be an array and must have more than one element!");this._opts=e,e=null,t=null,this._setting(),this.fire("initialize"),this._renderWrapper(),this._initPlugins(),this._bindHandler(),this.fire("initialized"),this._autoPlay()};u.VERSION="2.2.2",u.EVENTS=["initialize","initialized","pluginInitialize","pluginInitialized","renderComplete","slide","slideStart","slideEnd","slideChange","slideChanged","slideRestore","slideRestored","loadData","reset","destroy"],u.EASING=[["linear","ease","ease-in","ease-out","ease-in-out"],/cubic-bezier\(([^\d]*(\d+.?\d*)[^\,]*\,?){4}\)/],u.FIX_PAGE_TAGS=["SELECT","INPUT","TEXTAREA","BUTTON","LABEL"],u.NODE_TYPE={unknown:"unknown",empty:"empty",pic:"pic",dom:"dom",html:"html",node:"node",element:"element"},u.TRANSITION_END_EVENT=null,u.BROWSER_PREFIX=null,function(){var t=document.createElement("fakeElement");[["WebkitTransition","webkitTransitionEnd","webkit"],["transition","transitionend",null],["MozTransition","transitionend","moz"],["OTransition","oTransitionEnd","o"]].some(function(e){if(void 0!==t.style[e[0]])return u.TRANSITION_END_EVENT=e[1],u.BROWSER_PREFIX=e[2],!0})}(),u.DEVICE_EVENTS=function(){var e=!!("ontouchstart"in t&&!/Mac OS X /.test(t.navigator.userAgent)||t.DocumentTouch&&document instanceof t.DocumentTouch);return{hasTouch:e,startEvt:e?"touchstart":"mousedown",moveEvt:e?"touchmove":"mousemove",endEvt:e?"touchend":"mouseup",cancelEvt:e?"touchcancel":"mouseout",resizeEvt:"onorientationchange"in t?"orientationchange":"resize"}}(),u.extend=function(){var t,e,i=arguments;switch(i.length){case 0:return;case 1:t=u.prototype,e=i[0];break;case 2:t=i[0],e=i[1]}for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])},u.plugins={},u.regPlugin=function(t,e){u.plugins[t]=u.plugins[t]||e},u.styleProp=function(t,e){return u.BROWSER_PREFIX?e?u.BROWSER_PREFIX+c(t):"-"+u.BROWSER_PREFIX+"-"+t:t},u.setStyle=function(t,e,i){t.style[u.styleProp(e,1)]=i},u.getStyle=function(t,e){return t.style[u.styleProp(e,1)]},u._animateFuncs={normal:function(){function t(t,e,i,n,s){u.setStyle(t,"transform","translateZ(0) translate"+e+"("+(s+i*(n-1))+"px)")}return t.effect=u.styleProp("transform"),t}()};var f=u.prototype;f.extend=u.extend,f._setting=function(){var s=this;s._plugins=u.plugins,s._animateFuncs=u._animateFuncs,s._holding=!1,s._locking=!1,s._intermediateScene=null,s._transitionEndHandler=null,s._LSN={autoPlay:null,resize:null,transitionEnd:null},s.currentEl=null,s._EventHandle={},s.onMoving=!1,s.onSliding=!1,s.direction=null;var a=this._opts;s.wrap=a.dom,s.data=a.data,s.isVertical=!!a.isVertical,s.isOverspread=!!a.isOverspread,s.duration=a.duration||2e3,s.initIndex=a.initIndex>0&&a.initIndex<=a.data.length-1?a.initIndex:0,s.fixPage=function(){var t=a.fixPage;return t!==!1&&0!==t&&(!(n(t)&&t.length>0||"string"==typeof t&&""!==t)||[].concat(t).toString())}(),s.fillSeam=!!a.fillSeam,s.slideIndex=s.slideIndex||s.initIndex||0,s.axis=s.isVertical?"Y":"X",s.reverseAxis="Y"===s.axis?"X":"Y",s.width="number"==typeof a.width?a.width:s.wrap.offsetWidth,s.height="number"==typeof a.height?a.height:s.wrap.offsetHeight,s.ratio=s.height/s.width,s.scale=s.isVertical?s.height:s.width,s.offset=s.offset||{X:0,Y:0},s.isTouchable=null==a.isTouchable||!!a.isTouchable,s.isLooping=!!(a.isLooping&&s.data.length>1),s.dampingForce=Math.max(0,Math.min(1,parseFloat(a.dampingForce)||0)),s.delay=a.delay||0,s.isAutoplay=!!(a.isAutoplay&&s.data.length>1),s.wakeupAutoplayDazetime=a.wakeupAutoplayDazetime>-1?parseInt(a.wakeupAutoplayDazetime):-1,s.animateType=a.animateType in s._animateFuncs?a.animateType:"normal",s._animateFunc=s._animateFuncs[s.animateType],s._animateReverse=function(){var t=[];for(var e in s._animateFuncs)s._animateFuncs.hasOwnProperty(e)&&s._animateFuncs[e].reverse&&t.push(e);return t}(),s.isVertical&&"card"===s.animateType&&(s.isOverspread=!0),s.log=a.isDebug?function(){t.console.log.apply(t.console,arguments)}:e,s._damping=function(){return function(t){return.62*Math.atan(Math.abs(t)/s.scale)*(1-s.dampingForce)*s.scale*(t>0?1:-1)}}(),s.animateTime=null!=a.animateTime&&a.animateTime>-1?a.animateTime:300,s.animateEasing=i(a.animateEasing,u.EASING[0])||u.EASING[1].test(a.animateEasing)?a.animateEasing:"ease",s.deviceEvents=u.DEVICE_EVENTS,s.fingerRecognitionRange=a.fingerRecognitionRange>-1?parseInt(a.fingerRecognitionRange):10,s.events={},u.EVENTS.forEach(function(t){var e=a["on"+t.replace(/^\w{1}/,function(t){return t.toUpperCase()})]||a["on"+t.toLowerCase()];"function"==typeof e&&s.on(t,e,1)}),s.pluginConfig=function(){var t={};return n(a.plugins)&&a.plugins.forEach(function(e){n(e)?t[e[0]]=e.slice(1):"string"==typeof e&&(t[e]=[])}),t}()},f._initPlugins=function(){var t=this.pluginConfig,e=this._plugins;for(var i in t)t.hasOwnProperty(i)&&e.hasOwnProperty(i)&&e[i]&&"function"==typeof e[i]&&typeof e[i].apply&&e[i].apply(this,t[i]);this.fire("pluginInitialized")},f._itemType=function(t){if(isNaN(t)||(t=this.data[t]),t.hasOwnProperty("type"))return t.type;var e,i=t.content,n=u.NODE_TYPE;return e=null==i?n.empty:Boolean(i.nodeName)&&Boolean(i.nodeType)?n.node:"string"==typeof i?h(i)?n.pic:n.html:n.unknown,t.type=e,e},f._renderItem=function(t,e){var i,n=this,s=this.data.length,a=function(){var e=' src="'+i.content+'"';e+=i.height/i.width>n.ratio?' height="100%"':' width="100%"',n.isOverspread&&(t.style.cssText+="background-image:url("+i.content+");background-repeat:no-repeat;background-position:50% 50%;background-size:cover",e+=' style="display:block;opacity:0;height:100%;width:100%;"'),t.innerHTML="<img"+e+" />"};if(t.innerHTML="",t.style.background="",this.isLooping||null!=this.data[e]){e=(s+e)%s,i=this.data[e];var o=this._itemType(i),h=u.NODE_TYPE;switch(r(t,"islider-"+o),o){case h.pic:if(2===i.load)a();else{var l=new Image;l.src=i.content,l.onload=function(){i.height=l.height,i.width=l.width,a(),i.load=2}}break;case h.dom:case h.html:t.innerHTML=i.content;break;case h.node:case h.element:if(11===i.content.nodeType){var d=document.createElement("div");d.appendChild(i.content),i.content=d}t.appendChild(i.content)}}},f._renderIntermediateScene=function(){null!=this._intermediateScene&&(this._renderItem.apply(this,this._intermediateScene),this._intermediateScene=null)},f._changedStyles=function(){var t=["islider-prev","islider-active","islider-next"];this.els.forEach(function(e,i){o(e,t.join("|")),r(e,t[i]),this.fillSeam&&this.originScale(e)}.bind(this))},f._renderWrapper=function(){var e;this.outer?(e=this.outer,e.innerHTML=""):e=document.createElement("ul"),e.className="islider-outer",this.els=[];for(var i=0;i<3;i++){var n=document.createElement("li");e.appendChild(n),this.els.push(n),this._animateFunc(n,this.axis,this.scale,i,0),this.fixPage||(n.style.overflow="auto"),!this.isVertical||"rotate"!==this.animateType&&"flip"!==this.animateType?this._renderItem(n,i-1+this.slideIndex):this._renderItem(n,1-i+this.slideIndex)}this._changedStyles(),this.fillSeam&&this.els.forEach(function(t,e){r(t,"islider-sliding"+(1===e?"-focus":""))}),t.setTimeout(function(){this._preloadImg(this.slideIndex)}.bind(this),200),this.outer||(this.outer=e,this.wrap.appendChild(e)),this.currentEl=this.els[1],this.fire("renderComplete",this.slideIndex,this.currentEl,this)},f._resetAnimation=function(){for(var t=this.els,e=0;e<3;e++)t[e].style.cssText="",this._animateFunc(t[e],this.axis,this.scale,e,0),!this.isVertical||"rotate"!==this.animateType&&"flip"!==this.animateType?this._renderItem(t[e],e-1+this.slideIndex):this._renderItem(t[e],1-e+this.slideIndex)},f._preloadImg=function(t){if(this.data.length>3){var e=this.data,i=e.length,n=this,s=function(t){var i=e[t];if("pic"===n._itemType(i)&&!i.load){var s=new Image;s.src=i.content,s.onload=function(){i.width=s.width,i.height=s.height,i.load=2},i.load=1}};s((t+2)%i),s((t-2+i)%i)}},f._watchTransitionEnd=function(e,i){var n=function(){this._unWatchTransitionEnd(),"slideChanged"===i&&this._changedStyles(),this.fire.call(this,i,this.slideIndex,this.currentEl,this),this._renderIntermediateScene(),this.play(),this.onSliding=!1,this.direction=null}.bind(this);u.TRANSITION_END_EVENT&&(this.currentEl.addEventListener(u.TRANSITION_END_EVENT,n),this._transitionEndHandler={el:this.currentEl,handler:n}),this._LSN.transitionEnd=t.setTimeout(n,e)},f._unWatchTransitionEnd=function(){this._LSN.transitionEnd&&t.clearTimeout(this._LSN.transitionEnd),null!==this._transitionEndHandler&&(this._transitionEndHandler.el.removeEventListener(u.TRANSITION_END_EVENT,this._transitionEndHandler.handler),this._transitionEndHandler=null)},f._bindHandler=function(){var e=this.outer,i=this.deviceEvents;this.isTouchable&&(i.hasTouch||(e.style.cursor="pointer",e.ondragstart=function(t){return!t}),e.addEventListener(i.startEvt,this),e.addEventListener(i.moveEvt,this),e.addEventListener(i.endEvt,this),!i.hasTouch&&e.addEventListener("mouseout",this)),t.addEventListener(i.resizeEvt,this),t.addEventListener("focus",this,!1),t.addEventListener("blur",this,!1)},f.handleEvent=function(t){var e=this.deviceEvents;switch(t.type){case"mousedown":if(0!==t.button)break;case"touchstart":this.startHandler(t);break;case e.moveEvt:this.moveHandler(t);break;case e.endEvt:case e.cancelEvt:this.endHandler(t);break;case e.resizeEvt:this.resizeHandler();break;case"focus":this.play();break;case"blur":this.pause(),this._tryToWakeupAutoplay()}},f.startHandler=function(t){if(this.fixPage&&u.FIX_PAGE_TAGS.indexOf(t.target.tagName.toUpperCase())<0&&!this._isItself(t.target)&&t.preventDefault(),!this._holding&&!this._locking){var e=this.deviceEvents;this.onMoving=!0,this.pause(),this.fire("slideStart",t,this),this.startTime=(new Date).getTime(),this.startX=e.hasTouch?t.targetTouches[0].pageX:t.pageX,this.startY=e.hasTouch?t.targetTouches[0].pageY:t.pageY}},f.moveHandler=function(t){if(this.onMoving){var e=this.deviceEvents,i=this.data.length,n=this.axis,s=this.reverseAxis,a={};t.hasOwnProperty("offsetRatio")?(a[n]=t.offsetRatio*this.scale,a[s]=0):(a.X=e.hasTouch?t.targetTouches[0].pageX-this.startX:t.pageX-this.startX,a.Y=e.hasTouch?t.targetTouches[0].pageY-this.startY:t.pageY-this.startY),this.offset=a,t.offsetRatio=a[n]/this.scale,Math.abs(a[n])-Math.abs(a[s])>10&&(t.preventDefault(),this._unWatchTransitionEnd(),this.isLooping||(a[n]>0&&0===this.slideIndex||a[n]<0&&this.slideIndex===i-1)&&(a[n]=this._damping(a[n])),this.els.forEach(function(t,e){t.style.visibility="visible",u.setStyle(t,"transition","none"),this._animateFunc(t,n,this.scale,e,a[n],a[n]),this.fillSeam&&this.seamScale(t)}.bind(this)),this.fire("slide",t,this))}},f.endHandler=function(e){function i(n){if(null!=n)if("A"===n.tagName){if(n.href)return"_blank"===n.getAttribute("target")?t.open(n.href):t.location.href=n.href,e.preventDefault(),!1}else{if("LI"===n.tagName&&n.className.search(/^islider\-/)>-1)return!1;i(n.parentNode)}}if(this.onMoving){this.onMoving=!1;var n=this.offset,s=this.axis,a=this.scale/2,r=(new Date).getTime(),o=this.fingerRecognitionRange;a=r-this.startTime>300?a:14;var h=Math.abs(n[s]),l=Math.abs(n[this.reverseAxis]);this.fire("slideEnd",e,this),n[s]>=a&&l<h?this.slideTo(this.slideIndex-1):n[s]<-a&&l<h?this.slideTo(this.slideIndex+1):Math.abs(this.offset[s])>=o&&this.slideTo(this.slideIndex),Math.abs(this.offset[s])<o&&this.fixPage&&e.target&&i(e.target),this.offset.X=this.offset.Y=0,this._tryToWakeupAutoplay()}},f.resizeHandler=function(){var e,i,n=this._LSN.resize,s=+new Date;this.deviceEvents.hasTouch?(n&&t.clearInterval(n),n=t.setInterval(function(){this.height!==this.wrap.offsetHeight||this.width!==this.wrap.offsetWidth?(n&&t.clearInterval(n),n=t.setInterval(function(){e===this.wrap.offsetWidth&&i===this.wrap.offsetHeight?(n&&t.clearInterval(n),this.reset()):(e=this.wrap.offsetWidth,i=this.wrap.offsetHeight)}.bind(this),12)):+new Date-s>=1e3&&n&&t.clearInterval(n)}.bind(this),12)):(n&&t.clearTimeout(n),n=t.setTimeout(function(){this.height===this.wrap.offsetHeight&&this.width===this.wrap.offsetWidth||(n&&t.clearInterval(n),this.reset())}.bind(this),200))},f.slideTo=function(t,e){if(this.isAutoplay&&this.pause(),!this._locking){this.unhold(),this.onSliding=!0;var n,s=this.animateTime,a=this.animateType,h=this._animateFunc,l=this.data,d=this.els,c=this.axis,f=t,p=t-this.slideIndex,m=this.offset,g=0;"object"==typeof e&&(e.animateTime>-1&&(s=e.animateTime),"string"==typeof e.animateType&&e.animateType in this._animateFuncs&&(a=e.animateType,h=this._animateFuncs[a],this._animateFunc=h,this.animateType=a,this._resetAnimation())),0!==m[c]&&(g=Math.abs(m[c])/this.scale*s),Math.abs(p)>1&&this._renderItem(p>0?this.els[2]:this.els[0],f),this._preloadImg(f),l[f]?this.slideIndex=f:this.isLooping?this.slideIndex=p>0?0:l.length-1:p=0;var v,E,y;0===p?n="slideRestore":((this.isVertical&&i(a,this._animateReverse))^p>0?(d.push(d.shift()),v=d[2],E=d[0],y=1):(d.unshift(d.pop()),v=d[0],E=d[2],y=-1),this.currentEl=d[1],1===Math.abs(p)?(this._renderIntermediateScene(),this._renderItem(v,f+p)):Math.abs(p)>1&&(this.isVertical&&i(a,this._animateReverse)?(this._renderItem(E,f+y),this._renderItem(d[1],f),this._intermediateScene=[v,f-y]):(this._renderItem(v,f+y),this._intermediateScene=[E,f-y])),u.setStyle(v,"transition","none"),g=s-g,n="slideChange",this.fillSeam&&(d.forEach(function(t){o(t,"islider-sliding|islider-sliding-focus")}),r(this.currentEl,"islider-sliding-focus"),r(v,"islider-sliding")),this.direction=y);for(var _=0;_<3;_++)d[_]!==v&&u.setStyle(d[_],"transition",(h.effect||"all")+" "+g+"ms "+this.animateEasing),h.call(this,d[_],c,this.scale,_,0,y),this.fillSeam&&this.seamScale(d[_]);this._watchTransitionEnd(g,n+"d"),this.fire(n,this.slideIndex,this.currentEl,this)}},f.slideNext=function(){this.slideTo.apply(this,[this.slideIndex+1].concat(d(arguments)))},f.slidePrev=function(){this.slideTo.apply(this,[this.slideIndex-1].concat(d(arguments)))},f.regPlugin=function(){var t=d(arguments),e=t.shift(),n=t[0];(this._plugins.hasOwnProperty(e)||"function"==typeof n)&&("function"==typeof n&&(this._plugins[e]=n,t.shift()),i(e,this._opts.plugins)||(this._opts.plugins.push(t.length?[].concat([e],t):e),"function"==typeof this._plugins[e]&&this._plugins[e].apply(this,t)))},f.bind=f.delegate=function(e,i,n){function s(e){for(var s=t.event?t.event:e,a=s.target,r=document.querySelectorAll(i),o=0;o<r.length;o++)if(a===r[o]){n.call(a);break}}this.wrap.addEventListener(e,s,!1);var a=e+";"+i;this._EventHandle.hasOwnProperty(a)?(this._EventHandle[a][0].push(n),this._EventHandle[a][1].push(s)):this._EventHandle[a]=[[n],[s]]},f.unbind=f.unDelegate=function(t,e,i){var n=t+";"+e;if(this._EventHandle.hasOwnProperty(n)){var s=this._EventHandle[n][0].indexOf(i);if(s>-1)return this.wrap.removeEventListener(t,this._EventHandle[n][1][s]),this._EventHandle[n][0][s]=this._EventHandle[n][1][s]=null,!0}return!1},f.destroy=function(){var e=this.outer,i=this.deviceEvents;this.fire("destroy"),this.isTouchable&&(e.removeEventListener(i.startEvt,this),e.removeEventListener(i.moveEvt,this),e.removeEventListener(i.endEvt,this),!i.hasTouch&&e.removeEventListener("mouseout",this)),t.removeEventListener(i.resizeEvt,this),t.removeEventListener("focus",this),t.removeEventListener("blur",this);var n;for(n in this._EventHandle)for(var s=this._EventHandle[n][1],a=0;a<s.length;a++)"function"==typeof s[a]&&this.wrap.removeEventListener(n.substr(0,n.indexOf(";")),s[a]);this._EventHandle=null;for(n in this._LSN)this._LSN.hasOwnProperty(n)&&this._LSN[n]&&t.clearTimeout(this._LSN[n]);this._LSN=null,this.wrap.innerHTML=""},f.on=function(t,e,n){return i(t,u.EVENTS)&&"function"==typeof e&&(!(t in this.events)&&(this.events[t]=[]),n?this.events[t].unshift(e):this.events[t].push(e)),this},f.has=function(t,e){return t in this.events&&-1<this.events[t].indexOf(e)},f.off=function(t,e){if(t in this.events){var i=this.events[t].indexOf(e);i>-1&&delete this.events[t][i]}},f.fire=function(t){var e=d(arguments,1);t.split(/\x20+/).forEach(function(t){if(t in this.events)for(var i=this.events[t],n=0;n<i.length;n++)"function"==typeof i[n]&&i[n].apply&&i[n].apply(this,e)}.bind(this))},f.reset=function(){this.pause(),this._unWatchTransitionEnd(),this.width="number"==typeof this._opts.width?this._opts.width:this.wrap.offsetWidth,this.height="number"==typeof this._opts.height?this._opts.height:this.wrap.offsetHeight,this.ratio=this.height/this.width,this.scale=this.isVertical?this.height:this.width,this._renderWrapper(),this._autoPlay(),this.fire("reset slideRestored",this.slideIndex,this.currentEl,this)},f.loadData=function(t,e){this.pause(),this._unWatchTransitionEnd(),this.slideIndex=e||0,this.data=t,this._renderWrapper(),this._autoPlay(),this.fire("loadData slideChanged",this.slideIndex,this.currentEl,this)},f.pushData=function(t){if(null!=t){var e=this.data.length;this.data=this.data.concat(t),this.isLooping&&0===this.slideIndex?this._renderItem(this.els[0],this.data.length-1):e-1===this.slideIndex&&(this._renderItem(this.els[2],e),this._autoPlay())}},f.unshiftData=function(t){if(null!=t){n(t)||(t=[t]);var e=t.length;this.data=t.concat(this.data),0===this.slideIndex&&this._renderItem(this.els[0],e-1),this.slideIndex+=e}},f._autoPlay=function(){this.delay>0?t.setTimeout(this.play.bind(this),this.delay):this.play()},f._tryToWakeupAutoplay=function(){~this.wakeupAutoplayDazetime&&(this.wakeupAutoplayDazetime>0?t.setTimeout(this.play.bind(this),this.wakeupAutoplayDazetime):this.play())},f.play=function(){this.pause(),this.isAutoplay&&(this.isLooping||this.slideIndex<this.data.length-1)&&(this._LSN.autoPlay=t.setTimeout(this.slideNext.bind(this),this.duration))},f.pause=function(){this._LSN.autoPlay&&t.clearTimeout(this._LSN.autoPlay)},f.hold=function(){this._holding=!0},f.unhold=function(){this._holding=!1,this.unlock()},f.lock=function(){this.hold(),this._locking=!0},f.unlock=function(){this._locking=!1},f.seamScale=function(t){var e=/scale([XY]?)\(([^\)]+)\)/,i=u.getStyle(t,"transform");e.test(i)?u.setStyle(t,"transform",i.replace(e,function(t,e,i){var n={};return e?(n[e]=parseFloat(i),"scale"+this.axis+"("+(e===this.axis?1.001*n[this.axis]:1.001)+")"):(i.indexOf(",")>-1?(i=i.split(","),n.X=parseFloat(i[0]),n.Y=parseFloat(i[1])):n.Y=n.X=parseFloat(i),n[this.axis]*=1.001,"scale("+n.X+", "+n.Y+")")}.bind(this))):u.setStyle(t,"transform",i+" scale"+this.axis+"(1.001)")},f.originScale=function(t){var e=/([\x20]?scale)([XY]?)\(([^\)]+)\)/;u.setStyle(t,"transform",u.getStyle(t,"transform").replace(e,function(t,e,i,n){return t={},i?"1.001"===n?"":(t[i]=parseFloat(n),"scale"+this.axis+"("+(i===this.axis?t[this.axis]/1.001:1)+")"):(n.indexOf(",")>-1?(n=n.split(","),t.X=parseFloat(n[0]),t.Y=parseFloat(n[1])):t.Y=t.X=parseFloat(n),t[this.axis]/=1.001,"scale("+t.X+", "+t.Y+")")}.bind(this)))},f._isItself=function(t){var e=this.fixPage;if("string"==typeof e){for(var i,n=[],s=t;!a(s,"islider-outer")&&s!==this.wrap;)n.push(s),s=s.parentNode;if(s=n.pop(),n.length)try{if(i=Array.prototype.slice.call(s.querySelectorAll(e)),i.length)for(var r=0;r<n.length;r++)if(i.indexOf(n[r])>-1)return!0}catch(o){return!1}}return!1},f.subjectTo=function(t,e){if(!(!t instanceof u)){var i=this;i.animateTime=t.animateTime,i.isLooping=t.isLooping,i.isAutoplay=!1,t.on("slideStart",function(t){i.startHandler(t)}),t.on("slide",function(t){i.moveHandler(t)}),t.on("slideEnd",function(t){i.endHandler(t)}),t.on("slideChange",function(t){var e=i.data.length,n=i.direction;n>0&&(t-i.slideIndex+e)%e===1?i.slideNext():n<0&&(t-i.slideIndex-e)%e===-1&&i.slidePrev()}),t.on("slideRestore",function(t){i.slideIndex!==t&&i.slideTo(t)})}},"function"==typeof require&&"object"==typeof module&&module&&"object"==typeof exports&&exports?module.exports=u:"function"==typeof define&&define.amd?define(function(){return u}):t.iSlider=t.iSlider||u}(window||this);