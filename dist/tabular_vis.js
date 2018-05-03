"use strict";var d3=require("d3");const rowBase=e=>{if("object"==typeof e)return Array.from(e.children);console.error("the cell bind doesn't come from DOM ")},colBase=e=>{if("object"==typeof e)return e.children;console.error("the cell bind doesn't come from DOM ")},base=(e,t)=>{let a;return"row"==t?a=rowBase(e):"col"==t?a=colBase(e):void console.error("please type row or col as direction")},canvasBase={setCanvas:function(e,t){return d3.select(".tabular_container").append("canvas").attr("width",e).attr("height",t).style("animation","canvas_key 1s").style("WebkitAnimation","canvas_key 1s")},setScale:function(e,t){return d3.scaleLinear().range([0,e-20]).domain([0,d3.max(t)])},maxData:function(e){return d3.max(e)}},barStyle=e=>{let t=e.createLinearGradient(0,200,0,0);t.addColorStop(0,"rgba(110,200,245,1)"),t.addColorStop(1,"rgba(40,125,250,1)");let a=e.createLinearGradient(0,200,0,0);return a.addColorStop(0,"rgba(135,135,135,1)"),a.addColorStop(1,"rgba(0,60,60,1)"),[t,a]},drawBarLine=(e,t,a,r,l)=>{e.beginPath(),e.moveTo(t,a),e.lineTo(r,l),e.stroke(),e.closePath()},drawBarMark=(e,t,a,r,l)=>{e.strokeStyle="black";let n=2*parseInt(t/a);e.textAlign="right";let s=0;for(e.fillText(0,0,l-5);s<t;){let a=s+n,o=parseInt(l*(1-a/t));e.moveTo(0,o),e.lineTo(r,o),e.strokeStyle="rgba(135,135,135,0.5)",e.stroke(),e.fillText(a,0,o),s+=n}},drawBarRect=(e,t,a,r,l,n,s)=>{t.forEach(function(o,i){e.beginPath(),e.rect(a/t.length*i*.92+10,r-5,a/t.length*.8,-l(o)),i==s?(e.fillStyle=n[0],e.strokeStyle=n[0]):(e.fillStyle=n[1],e.strokeStyle=n[1]),e.fill(),e.closePath()})},drawBar=(e,t)=>{e=e.map(e=>parseInt(e,10));let a=.3*document.body.clientWidth+15,r=canvasBase.setCanvas(a,400).node().getContext("2d"),l=canvasBase.setScale(400,e),n=canvasBase.maxData(e);r.translate(15,0),drawBarLine(r,5,395,a,395),drawBarLine(r,5,395,5,0),drawBarMark(r,n,e.length,a,400);let s=barStyle(r);drawBarRect(r,e,a,400,l,s,t)},insertCss=()=>{let e="".concat("@keyframes tabular{ from{ width:0px} to { width:30%} }\n","@keyframes canvas_key{ from{ height:0} to { height:100%} }\n","@-webkit-keyframes canvas_key{ from{ height:0} to { height:100%} }\n",".tabular_container {position:fixed;margin:auto;top:0;left:0;bottom:0;right:0;width:0;height:400px;background:rgba(255,255,255,0.7)}"),t=document.head||document.getElementsByTagName("head")[0],a=document.createElement("style");a.type="text/css",a.styleSheet?a.styleSheet.cssText=e:a.appendChild(document.createTextNode(e)),t.appendChild(a),console.log("Insert Css done")},className={addClass:function(e,t){let a=e.className,r=a+(""==a?"":" ")+t;e.className=r},removeClass:function(e,t){let a=" "+e.className+" ",r=(a=a.replace(/(\s+)/gi," ")).replace(" "+t+" "," ");removedSpace=r.replace(/(^\s+)|(\s+$)/g,""),e.className=removedSpace}},createTabular=()=>{let e=document.createElement("div");return className.addClass(e,"tabular_container"),e.addEventListener("click",()=>{e.removeAttribute("style"),e.style.width="0",e.removeChild(e.firstElementChild)}),document.body.appendChild(e),console.log("Create Tabular div done"),e},swapTabularVis=(e,t)=>e&&"0px"!=t.style.width?(t.removeAttribute("style"),t.style.width="0",t.removeChild(t.firstElementChild),!1):(t.style.width=.3*document.body.clientWidth+"px",t.style.animation="tabular 1s",t.style.WebkitAnimation="tabular 1s",t.style.cursor="pointer",!0),bar=(e,t)=>{let a=base(e,t),r=[],l=!1,n=new RegExp(/^\d+\.?\d*$/);insertCss();let s=createTabular();for(let e=0;e<a.length;e++)n.test(a[e].innerHTML)||a.splice(e,1);for(let e=0;e<a.length;e++){r.push(a[e].innerHTML);let t=Array.prototype.indexOf.call(a,a[e]);a[e].style.cursor="pointer",a[e].addEventListener("click",()=>{(l=swapTabularVis(l,s))&&drawBar(r,t)},!0)}},drawLinePath=(e,t,a,r,l,n,s)=>{t.forEach(function(o,i){e.beginPath(),i==s?(e.arc(a/t.length*i*.92+10,r-l(o),10,0,2*Math.PI),e.fillStyle=n[0],e.strokeStyle=n[0],e.stroke()):(e.arc(a/t.length*i*.92+10,r-l(o),5,0,2*Math.PI),e.fillStyle=n[1],e.strokeStyle=n[1],e.stroke()),e.fill(),i!=t.length-1&&(e.moveTo(a/t.length*i*.92+10,r-l(o)),e.lineTo(a/t.length*(i+1)*.92+10,r-l(t[i+1])),e.stroke())})},lineStyle=()=>{return["rgba(40,125,250,1)","rgba(0,0,0,1)"]},drawLine=(e,t)=>{e=e.map(e=>parseInt(e,10));let a=.3*document.body.clientWidth+15,r=canvasBase.setCanvas(a,400).node().getContext("2d"),l=canvasBase.setScale(400,e),n=canvasBase.maxData(e);r.translate(15,0),drawBarLine(r,5,395,a,395),drawBarLine(r,5,395,5,0),drawBarMark(r,n,e.length,a,400),drawLinePath(r,e,a,400,l,["rgba(40,125,250,1)","rgba(0,0,0,1)"],t)},line=(e,t)=>{let a=base(e,t),r=[],l=!1,n=new RegExp(/^\d+\.?\d*$/);insertCss();let s=createTabular();for(let e=0;e<a.length;e++)n.test(a[e].innerHTML)||a.splice(e,1);for(let e=0;e<a.length;e++){r.push(a[e].innerHTML);let t=Array.prototype.indexOf.call(a,a[e]);a[e].style.cursor="pointer",a[e].addEventListener("click",()=>{(l=swapTabularVis(l,s))&&drawLine(r,t)},!0)}},tabular_vis={bar:bar,line:line};module.exports=tabular_vis;
