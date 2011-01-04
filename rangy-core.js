/**
 * Rangy, a cross-browser JavaScript range and selection library
 * http://code.google.com/p/rangy/
 *
 * Copyright 2010, Tim Down
 * Licensed under the MIT license.
 * Version: 0.1.76
 * Build date: 22 August 2010
 */
var rangy=(function(){var h="object",e="function",v="undefined";var i=["startContainer","startOffset","endContainer","endOffset","collapsed","commonAncestorContainer","START_TO_START","START_TO_END","END_TO_START","END_TO_END"];var b=["setStart","setStartBefore","setStartAfter","setEnd","setEndBefore","setEndAfter","collapse","selectNode","selectNodeContents","compareBoundaryPoints","deleteContents","extractContents","cloneContents","insertNode","surroundContents","cloneRange","toString","detach"];var q=["boundingHeight","boundingLeft","boundingTop","boundingWidth","htmlText","text"];var m=["collapse","compareEndPoints","duplicate","getBookmark","moveToBookmark","moveToElementText","parentElement","pasteHTML","select","setEndPoint"];function g(y,x){var w=typeof y[x];return w==e||(!!(w==h&&y[x]))||w=="unknown"}function c(x,w){return !!(typeof x[w]==h&&x[w])}function n(x,w){return typeof x[w]!=v}function j(w){return function(z,y){var x=y.length;while(x--){if(!w(z,y[x])){return false}}return true}}var l=j(g);var p=j(c);var u=j(n);var k={initialized:false,supported:false,util:{isHostMethod:g,isHostObject:c,isHostProperty:n,areHostMethods:l,areHostObjects:p,areHostProperties:u},features:{},modules:{}};function d(w){alert("Rangy not supported in your browser. Reason: "+w);k.initialized=true;k.supported=false}k.fail=d;function r(){var x;var A=false,B=false;if(g(document,"createRange")){x=document.createRange();if(l(x,b)&&u(x,i)){A=true}x.detach()}if(c(document,"body")&&g(document.body,"createTextRange")){x=document.body.createTextRange();if(l(x,m)&&u(x,q)){B=true}}if(!A&&!B){d("Neither Range nor TextRange are implemented")}k.initialized=true;k.features={implementsDomRange:A,implementsTextRange:B};for(var z=0,w=s.length;z<w;++z){try{s[z](k)}catch(y){}}}k.init=r;var s=[];k.addInitListener=function(w){s.push(w)};function t(w){this.name=w;this.initialized=false;this.supported=false}t.prototype.fail=function(w){this.initialized=true;this.supported=false;throw new Error("Module '"+this.name+"' failed to load: "+w)};k.createModule=function(w,y){var x=new t(w);k.modules[w]=x;s.push(function(z){y(z,x);x.initialized=true;x.supported=true})};k.requireModules=function(y){for(var A=0,w=y.length,z,x;A<w;++A){x=y[A];z=k.modules[x];if(!z||!(z instanceof t)){throw new Error("Module '"+x+"' not found")}if(!z.supported){throw new Error("Module '"+x+"' not supported")}}};var a=false;var o;var f=function(w){if(!a){a=true;if(!k.initialized){r()}}};if(typeof window==v){d("No window found");return}if(typeof document==v){d("No document found");return}if(g(document,"addEventListener")){document.addEventListener("DOMContentLoaded",f,false)}if(g(window,"addEventListener")){window.addEventListener("load",f,false)}else{if(g(window,"attachEvent")){window.attachEvent("onload",f)}else{o=window.onload;window.onload=function(w){f(w);if(o){o.call(window,w)}}}}return k})();rangy.createModule("DomUtil",function(i,b){if(!i.util.areHostMethods(document,["createDocumentFragment","createElement","createTextNode"])){b.fail("document missing a Node creation method")}var c=document.createElement("div");if(!i.util.areHostMethods(c,["insertBefore","appendChild","cloneNode"]||!i.util.areHostObjects(c,["previousSibling","nextSibling","childNodes","parentNode"]))){b.fail("Incomplete Element implementation")}var l=document.createTextNode("test");if(!i.util.areHostMethods(l,["splitText","deleteData","insertData","appendData","cloneNode"]||!i.util.areHostObjects(c,["previousSibling","nextSibling","childNodes","parentNode"])||!i.util.areHostProperties(l,["data"]))){b.fail("Incomplete Text Node implementation")}var q=function(t,v){var u=t.length;while(u--){if(t[u]===v){return true}}return false};function a(u){var t=0;while((u=u.previousSibling)){t++}return t}function p(u,t){var v=[],w;for(w=u;w;w=w.parentNode){v.push(w)}for(w=t;w;w=w.parentNode){if(q(v,w)){return w}}return null}function s(t,u,w){var v=w?u:u.parentNode;while(v){if(v===t){return true}else{v=v.parentNode}}return false}function r(u,t,x){var v,w=x?u:u.parentNode;while(w){v=w.parentNode;if(v===t){return w}w=v}return null}function f(v){var u=v.nodeType;return u==3||u==4||u==8}function n(w,u){var t=u.nextSibling,v=u.parentNode;if(t){v.insertBefore(w,t)}else{v.appendChild(w)}return w}function o(v,t){var u;if(v.nodeType==3){u=v.splitText(t)}else{u=v.cloneNode();u.deleteData(0,t);v.deleteData(0,v.length-t);n(u,v)}return u}function j(t){if(t.nodeType==9){return t}else{if(typeof t.ownerDocument!="undefined"){return t.ownerDocument}else{if(typeof t.document!="undefined"){return t.document}else{if(t.parentNode){return j(t.parentNode)}else{throw new Error("getDocument: no document found for node")}}}}}function k(w,y,v,x){var t,z,B,A,u;if(w==v){return y===x?0:(y<x)?-1:1}else{if((t=r(v,w,true))){return y<=a(t)?-1:1}else{if((t=r(w,v,true))){return a(t)<x?-1:1}else{z=p(w,v);B=(w===z)?z:r(w,z,true);A=(v===z)?z:r(v,z,true);if(B===A){throw new Error("comparePoints got to case 4 and childA and childB are the same!")}else{u=z.firstChild;while(u){if(u===B){return -1}else{if(u===A){return 1}}u=u.nextSibling}throw new Error("Should not be here!")}}}}}function g(t){this.root=t;this._next=t}g.prototype={_current:null,hasNext:function(){return !!this._next},next:function(){var v=this._current=this._next;var u,t;if(this._current){u=v.firstChild;if(u){this._next=u}else{t=null;while((v!==this.root)&&!(t=v.nextSibling)){v=v.parentNode}this._next=t}}return this._current},detach:function(){this._current=this._next=this.root=null}};function d(t){return new g(t)}function e(t,u){this.node=t;this.offset=u}e.prototype={equals:function(t){return this.node===t.node&this.offset==t.offset}};var h={INDEX_SIZE_ERR:1,HIERARCHY_REQUEST_ERR:3,WRONG_DOCUMENT_ERR:4,NO_MODIFICATION_ALLOWED_ERR:7,NOT_FOUND_ERR:8,NOT_SUPPORTED_ERR:9,INVALID_STATE_ERR:11};function m(t){this.code=h[t];this.codeName=t;this.message="DOMException: "+this.codeName}m.prototype=h;m.prototype.toString=function(){return this.message};i.dom={arrayContains:q,getNodeIndex:a,getCommonAncestor:p,isAncestorOf:s,getClosestAncestorIn:r,isCharacterDataNode:f,insertAfter:n,splitDataNode:o,getDocument:j,comparePoints:k,createIterator:d,DomPosition:e,DOMException:m}});rangy.createModule("DomRange",function(f,d){f.requireModules(["DomUtil"]);var a=f.dom;var A=a.DomPosition;var O=a.DOMException;function e(af,ae){this.range=af;this.clonePartiallySelectedTextNodes=ae;if(!af.collapsed){this.sc=af.startContainer;this.so=af.startOffset;this.ec=af.endContainer;this.eo=af.endOffset;var ad=af.commonAncestorContainer;if(this.sc===this.ec&&a.isCharacterDataNode(this.sc)){this.isSingleCharacterDataNode=true;this._first=this._last=this._next=this.sc}else{this._first=this._next=(this.sc===ad&&!a.isCharacterDataNode(this.sc))?this.sc.childNodes[this.so]:a.getClosestAncestorIn(this.sc,ad,true);this._last=(this.ec===ad&&!a.isCharacterDataNode(this.ec))?this.ec.childNodes[this.eo-1]:a.getClosestAncestorIn(this.ec,ad,true)}}}e.prototype={_current:null,_next:null,_first:null,_last:null,isSingleCharacterDataNode:false,reset:function(){this._current=null;this._next=this._first},hasNext:function(){return !!this._next},next:function(){var ad=this._current=this._next;if(ad){this._next=(ad!==this._last)?ad.nextSibling:null;if(a.isCharacterDataNode(ad)&&this.clonePartiallySelectedTextNodes){if(ad===this.ec){(ad=ad.cloneNode(true)).deleteData(this.eo,ad.length-this.eo)}if(this._current===this.sc){(ad=ad.cloneNode(true)).deleteData(0,this.so)}}}return ad},remove:function(){var ae=this._current,af,ad;if(a.isCharacterDataNode(ae)&&(ae===this.sc||ae===this.ec)){af=(ae===this.sc)?this.so:0;ad=(ae===this.ec)?this.eo:ae.length;if(af!=ad){ae.deleteData(af,ad-af)}}else{if(ae.parentNode){ae.parentNode.removeChild(ae)}else{}}},isPartiallySelectedSubtree:function(){var ad=this._current;return u(ad,this.range)},getSubtreeIterator:function(){var ae;if(this.isSingleCharacterDataNode){ae=this.range.cloneRange();ae.collapse()}else{ae=new ac(k(this.range));var ai=this._current;var ag=ai,ad=0,ah=ai,af=m(ai);if(a.isAncestorOf(ai,this.sc,true)){ag=this.sc;ad=this.so}if(a.isAncestorOf(ai,this.ec,true)){ah=this.ec;af=this.eo}z(ae,ag,ad,ah,af)}return new e(ae,this.clonePartiallySelectedTextNodes)},detach:function(ad){if(ad){this.range.detach()}this.range=this._current=this._next=this._first=this._last=this.sc=this.so=this.ec=this.eo=null}};var I={BAD_BOUNDARYPOINTS_ERR:1,INVALID_NODE_TYPE_ERR:2};function L(ad){this.code=I[ad];this.codeName=ad;this.message="RangeException: "+this.codeName}L.prototype=I;L.prototype.toString=function(){return this.message};function h(ad){if(!ad){return"No node"}return a.isCharacterDataNode(ad)?'"'+ad.data+'"':ad.nodeName}function k(ad){return a.getDocument(ad.startContainer)}function r(ae,ai,af){var ah=ae._listeners[ai];if(ah){for(var ag=0,ad=ah.length;ag<ad;++ag){ah[ag].call(ae,{target:ae,args:af})}}}function w(ad){return new A(ad.parentNode,a.getNodeIndex(ad))}function R(ad){return new A(ad.parentNode,a.getNodeIndex(ad)+1)}function m(ad){return a.isCharacterDataNode(ad)?ad.length:(ad.childNodes?ad.childNodes.length:0)}function g(ad,af,ae){if(a.isCharacterDataNode(af)){if(ae==af.length){af.parentNode.appendChild(ad)}else{af.parentNode.insertBefore(ad,ae==0?af:a.splitDataNode(af,ae))}}else{if(ae>=af.childNodes.length){af.appendChild(ad)}else{af.insertBefore(ad,af.childNodes[ae])}}return ad}function D(af){var ae;for(var ag,ah=k(af.range).createDocumentFragment(),ad;ag=af.next();){ae=af.isPartiallySelectedSubtree();ag=ag.cloneNode(!ae);if(ae){ad=af.getSubtreeIterator();ag.appendChild(D(ad));ad.detach(true)}if(ag.nodeType==10){throw new O("HIERARCHY_REQUEST_ERR")}ah.appendChild(ag)}return ah}function Q(ae,ah,ad){var af,aj;ad=ad||{stop:false};for(var ag,ai;ag=ae.next();){if(ae.isPartiallySelectedSubtree()){if(ah(ag)===false){ad.stop=true;return}else{ai=ae.getSubtreeIterator();Q(ai,ah,ad);ai.detach(true);if(ad.stop){return}}}else{af=a.createIterator(ag);while((aj=af.next())){if(ah(aj)===false){ad.stop=true;return}}}}}function l(ae){var ad;while(ae.next()){if(ae.isPartiallySelectedSubtree()){ad=ae.getSubtreeIterator();l(ad);ad.detach(true)}else{ae.remove()}}}function M(ae){for(var af,ag=k(ae.range).createDocumentFragment(),ad;af=ae.next();){if(ae.isPartiallySelectedSubtree()){af=af.cloneNode(false);ad=ae.getSubtreeIterator();af.appendChild(M(ad));ad.detach(true)}else{ae.remove()}if(af.nodeType==10){throw new O("HIERARCHY_REQUEST_ERR")}ag.appendChild(af)}return ag}function n(af,ad,ag){var ai=!!(ad&&ad.length),ah;var aj=!!ag;if(ai){ah=new RegExp("^("+ad.join("|")+")$")}var ae=[];Q(new e(af,false),function(ak){if((!ai||ah.test(ak.nodeType))&&(!aj||ag(ak))){ae.push(ak)}});return ae}function t(ae,ad,af){this.nodes=n(ae,ad,af);this._next=this.nodes[0];this._pointer=0}t.prototype={_current:null,hasNext:function(){return !!this._next},next:function(){this._current=this._next;this._next=this.nodes[++this._pointer];return this._current},detach:function(){this._current=this._next=this.nodes=null}};function u(ae,ad){return(ae.nodeType!=3)&&(a.isAncestorOf(ae,ad.startContainer,true)||a.isAncestorOf(ae,ad.endContainer,true))}var Y=[1,3,4,5,7,8,10];var W=[2,9,11];var x=[5,6,10,12];var J=[1,3,4,5,7,8,10,11];var B=[1,3,4,5,7,8];function T(ad){return function(af,ah){var ae,ag=ah?af:af.parentNode;while(ag){ae=ag.nodeType;if(a.arrayContains(ad,ae)){return ag}ag=ag.parentNode}return null}}function q(ae){var ad;while((ad=ae.parentNode)){ae=ad}return ae}var E=T([9,11]);var G=T(x);var b=T([6,10,12]);function o(ae,ad){if(b(ae,ad)){throw new L("INVALID_NODE_TYPE_ERR")}}function y(ad){if(!ad.startContainer){throw new O("INVALID_STATE_ERR")}}function P(ad,ae){if(!a.arrayContains(ae,ad.nodeType)){throw new L("INVALID_NODE_TYPE_ERR")}}function X(ad,ae){if(ae<0||ae>(a.isCharacterDataNode(ad)?ad.length:ad.childNodes.length)){throw new O("INDEX_SIZE_ERR")}}function c(ae,ad){if(E(ae,true)!==E(ad,true)){throw new O("WRONG_DOCUMENT_ERR")}}function V(ad){if(G(ad,true)){throw new O("NO_MODIFICATION_ALLOWED_ERR")}}function aa(ae,ad){if(!ae){throw new O(ad)}}var H=["startContainer","startOffset","endContainer","endOffset","collapsed","commonAncestorContainer"];var j=0,v=1,Z=2,U=3;var p=0,s=1,F=2,i=3;function N(ad){ad.START_TO_START=j;ad.START_TO_END=v;ad.END_TO_END=Z;ad.END_TO_START=U;ad.NODE_BEFORE=p;ad.NODE_AFTER=s;ad.NODE_BEFORE_AND_AFTER=F;ad.NODE_INSIDE=i}function C(ad){N(ad);N(ad.prototype)}function S(ag,aj,ae){function ai(al,ak){return function(am){y(this);P(am,Y);P(q(am),W);var an=(al?w:R)(am);(ak?af:ah)(this,an.node,an.offset)}}function af(al,an,ao){var am=al.endContainer,ak=al.endOffset;if(an!==al.startContainer||ao!==this.startOffset){if(q(an)!=q(am)||a.comparePoints(an,ao,am,ak)==1){am=an;ak=ao}aj(al,an,ao,am,ak)}}function ah(ak,al,ao){var an=ak.startContainer,am=ak.startOffset;if(al!==ak.endContainer||ao!==this.endOffset){if(q(al)!=q(an)||a.comparePoints(al,ao,an,am)==-1){an=al;am=ao}aj(ak,an,am,al,ao)}}function ad(ak){return function(){y(this);var aq=this.startContainer,ap=this.startOffset,al=this.commonAncestorContainer;var an=new e(this,true);var ao,ar;if(aq!==al){ao=a.getClosestAncestorIn(aq,al,true);ar=R(ao);aq=ar.node;ap=ar.offset}Q(an,V);an.reset();var am=ak(an);an.detach();aj(this,aq,ap,aq,ap);return am}}ag.prototype={attachListener:function(ak,al){this._listeners[ak].push(al)},setStart:function(ak,al){y(this);o(ak,true);X(ak,al);af(this,ak,al)},setEnd:function(ak,al){y(this);o(ak,true);X(ak,al);ah(this,ak,al)},setStartBefore:ai(true,true),setStartAfter:ai(false,true),setEndBefore:ai(true,false),setEndAfter:ai(false,false),collapse:function(ak){y(this);if(ak){aj(this,this.startContainer,this.startOffset,this.startContainer,this.startOffset)}else{aj(this,this.endContainer,this.endOffset,this.endContainer,this.endOffset)}},selectNodeContents:function(ak){y(this);o(ak,true);aj(this,ak,0,ak,m(ak))},selectNode:function(al){y(this);o(al,false);P(al,Y);var am=w(al),ak=R(al);aj(this,am.node,am.offset,ak.node,ak.offset)},compareBoundaryPoints:function(ap,am){y(this);c(this.startContainer,am.startContainer);var ar,al,aq,ak;var ao=(ap==U||ap==j)?"start":"end";var an=(ap==v||ap==j)?"start":"end";ar=this[ao+"Container"];al=this[ao+"Offset"];aq=am[an+"Container"];ak=am[an+"Offset"];return a.comparePoints(ar,al,aq,ak)},insertNode:function(ak){y(this);P(ak,J);V(this.startContainer);if(a.isAncestorOf(ak,this.startContainer,true)){throw new O("HIERARCHY_REQUEST_ERR")}g(ak,this.startContainer,this.startOffset);this.setStartBefore(ak)},cloneContents:function(){y(this);var am,al;if(this.collapsed){return k(this).createDocumentFragment()}else{if(this.startContainer===this.endContainer&&a.isCharacterDataNode(this.startContainer)){am=this.startContainer.cloneNode(true);am.data=am.data.slice(this.startOffset,this.endOffset);al=k(this).createDocumentFragment();al.appendChild(am);return al}else{var ak=new e(this,true);am=D(ak);ak.detach()}return am}},extractContents:ad(M),deleteContents:ad(l),surroundContents:function(am){y(this);V(this.startContainer);V(this.endContainer);P(am,B);var ak=new e(this,true);var an=(ak._first&&(u(ak._first,this))||(ak._last&&u(ak._last,this)));ak.detach();if(an){throw new L("BAD_BOUNDARYPOINTS_ERR")}var al=this.extractContents();if(am.hasChildNodes()){while(am.lastChild){am.removeChild(am.lastChild)}}g(am,this.startContainer,this.startOffset);am.appendChild(al);this.selectNode(am)},cloneRange:function(){y(this);var ak=new ac(k(this));var al=H.length,am;while(al--){am=H[al];ak[am]=this[am]}return ak},detach:function(){ae(this)},toString:function(){y(this);var al=this.startContainer;if(al===this.endContainer&&a.isCharacterDataNode(al)){return(al.nodeType==3||al.nodeType==4)?al.data.slice(this.startOffset,this.endOffset):""}else{var am=[],ak=new e(this,true);Q(ak,function(an){if(an.nodeType==2){}if(an.nodeType==3||an.nodeType==4){am.push(an.data)}});ak.detach();return am.join("")}},compareNode:function(am){var al=am.parentNode;var ao=a.getNodeIndex(am);if(!al){throw new O("NOT_FOUND_ERR")}var an=this.comparePoint(al,ao),ak=this.comparePoint(al,ao+1);if(an<0){return(ak>0)?F:p}else{return(ak>0)?s:i}},comparePoint:function(ak,al){y(this);aa(ak,"HIERARCHY_REQUEST_ERR");c(ak,this.startContainer);if(a.comparePoints(ak,al,this.startContainer,this.startOffset)<0){return -1}else{if(a.comparePoints(ak,al,this.endContainer,this.endOffset)>0){return 1}}return 0},createContextualFragment:function(al){y(this);var am=k(this);var ak=am.createElement("div");ak.innerHTML=al;var ao=am.createDocumentFragment(),an;while((an=ak.firstChild)){ao.appendChild(an)}return ao},intersectsNode:function(am){y(this);aa(am,"NOT_FOUND_ERR");if(a.getDocument(am)!==k(this)){return false}var al=am.parentNode,ao=a.getNodeIndex(am);aa(al,"NOT_FOUND_ERR");var an=a.comparePoints(al,ao,this.startContainer,this.startOffset),ak=a.comparePoints(al,ao+1,this.endContainer,this.endOffset);return !((an<0&&ak<0)||(an>0&&ak>0))},isPointInRange:function(ak,al){y(this);aa(ak,"HIERARCHY_REQUEST_ERR");c(ak,this.startContainer);return(a.comparePoints(ak,al,this.startContainer,this.startOffset)>=0)&&(a.comparePoints(ak,al,this.endContainer,this.endOffset)<=0)},intersectsRange:function(ak){y(this);if(k(ak)!=k(this)){throw new O("WRONG_DOCUMENT_ERR")}return a.comparePoints(this.startContainer,this.startOffset,ak.endContainer,ak.endOffset)<0&&a.comparePoints(this.endContainer,this.endOffset,ak.startContainer,ak.startOffset)>0},containsNode:function(al){var ak=al.parentNode;var am=a.getNodeIndex(al);if(!ak){throw new O("NOT_FOUND_ERR")}return this.comparePoint(ak,am)>=0&&this.comparePoint(ak,am+1)<=0},containsNodeContents:function(ak){return this.comparePoint(ak,0)>=0&&this.comparePoint(ak,m(ak))<=0},splitBoundaries:function(){var ao=this.startContainer,an=this.startOffset,al=this.endContainer,ak=this.endOffset;var am=(ao===al);y(this);if(a.isCharacterDataNode(al)&&ak<al.length){a.splitDataNode(al,ak)}if(a.isCharacterDataNode(ao)&&an>0){ao=a.splitDataNode(ao,an);if(am){ak-=an;al=ao}an=0}aj(this,ao,an,al,ak)},normalizeBoundaries:function(){var ar=this.startContainer,aq=this.startOffset,an=this.endContainer,al=this.endOffset;var ap,ao=(ar===an);y(this);var am=a.isCharacterDataNode(ar)?ar:ar.childNodes[aq];var ak=a.isCharacterDataNode(an)?an:(al?an.childNodes[al-1]:null);if(ak&&a.isCharacterDataNode(ak)){ap=ak.nextSibling;if(ap&&a.isCharacterDataNode(ap)){an=ak;al=ak.length;an.appendData(ap.data);ap.parentNode.removeChild(ap)}}if(am&&a.isCharacterDataNode(am)){ap=am.previousSibling;if(ap&&a.isCharacterDataNode(ap)){ar=am;ar.insertData(0,ap.data);aq=ap.length;ap.parentNode.removeChild(ap);if(ao){al+=aq;an=ar}}}aj(this,ar,aq,an,al)},createNodeIterator:function(ak,al){return new t(this,ak,al)},getNodes:function(ak,al){return n(this,ak,al)}};C(ag)}function K(ad){ad.collapsed=(ad.startContainer===ad.endContainer&&ad.startOffset===ad.endOffset);ad.commonAncestorContainer=ad.collapsed?ad.startContainer:a.getCommonAncestor(ad.startContainer,ad.endContainer)}function z(af,ah,ae,ai,ag){var ad=(af.startContainer!==ah||af.startOffset!==ae);var aj=(af.endContainer!==ai||af.endOffset!==ag);af.startContainer=ah;af.startOffset=ae;af.endContainer=ai;af.endOffset=ag;K(af);r(af,"boundarychange",{startMoved:ad,endMoved:aj})}function ab(ad){y(ad);ad.startContainer=ad.startOffset=ad.endContainer=ad.endOffset=null;ad.collapsed=ad.commonAncestorContainer=null;r(ad,"detach",null);ad._listeners=null}function ac(ad){this.startContainer=ad;this.startOffset=0;this.endContainer=ad;this.endOffset=0;this._listeners={boundarychange:[],detach:[]};K(this)}S(ac,z,ab);ac.fromRange=function(ae){var ad=new ac(k(ae));z(ad,ae.startContainer,ae.startOffset,ae.endContainer,ae.endOffset);return ad};ac.rangeProperties=H;ac.RangeIterator=e;ac.DOMException=O;ac.RangeException=L;ac.copyComparisonConstants=C;ac.createPrototypeRange=S;ac.util={getRangeDocument:k,nodeToString:h,getEndOffset:m,rangesEqual:function(ae,ad){return ae.startContainer===ad.startContainer&&ae.startOffset===ad.startOffset&&ae.endContainer===ad.endContainer&&ae.endOffset===ad.endOffset}};rangy.DomRange=ac});rangy.createModule("WrappedRange",function(h,d){h.requireModules(["DomRange"]);var a;var g=h.dom;var b=g.DomPosition;var i=rangy.DomRange;var c=i.util;function k(l,m,n){this.position=l;this.cleanUpFunc=m;this.alteredDom=n}k.prototype.cleanUp=function(){if(this.cleanUpFunc){this.cleanUpFunc()}};function e(z,o){var A=z.duplicate();var v=A.parentElement();A.collapse(o);var y=A.parentElement();if(!g.isAncestorOf(v,y,true)){y=v}if(!y.canHaveHTML){return new k(new b(y.parentNode,g.getNodeIndex(y)),null,false)}var n=g.getDocument(y).createElement("span");var x,t=o?"StartToStart":"StartToEnd";var u,r,m,p,s,w,q=null;var l=false;do{y.insertBefore(n,n.previousSibling);A.moveToElementText(n)}while((x=A.compareEndPoints(t,z))>0&&n.previousSibling);p=n.nextSibling;if(x==-1&&p){A.setEndPoint(o?"EndToStart":"EndToEnd",z);w=A.text;if(/[\r\n]/.test(p.data)){s=A.duplicate();s.collapse(false);s.text=" ";w=p.data.slice(0,-1);l=true;q=function(){r=p.nextSibling;p.data=p.data.slice(0,-1)+r.data;r.parentNode.removeChild(r);z.collapse()}}m=new b(p,w.length)}else{u=!o&&n.previousSibling;r=o&&n.nextSibling;if(r&&g.isCharacterDataNode(r)){m=new b(r,0)}else{if(u&&g.isCharacterDataNode(u)){m=new b(u,u.length)}else{m=new b(y,g.getNodeIndex(n))}}}n.parentNode.removeChild(n);return new k(m,q,l)}function j(l,n){var o,t,p=l.offset;var u=g.getDocument(l.node);var m,v,w=u.body.createTextRange();var r=false,s=false;var q=g.isCharacterDataNode(l.node);if(q){o=l.node;t=o.parentNode;if(t.nodeType==1){if(p==0&&!o.previousSibling){r=true}else{if(p==o.length&&!o.nextSibling){s=true}}}}else{v=l.node.childNodes;if(l.node.nodeType==1){if(p==0){r=true}else{if(p==v.length){s=true}}}o=(p<v.length)?v[p]:null;t=l.node}if(r||s){w.moveToElementText(t);w.collapse(r)}else{m=u.createElement("span");if(o){t.insertBefore(m,o)}else{t.appendChild(m)}w.moveToElementText(m);t.removeChild(m);if(q){w[n?"moveStart":"moveEnd"]("character",p)}}return w}if(h.features.implementsDomRange){(function(){var n;var s=i.rangeProperties;var v;function l(w){var x=s.length,y;while(x--){y=s[x];w[y]=w.nativeRange[y]}}function o(y,A,x,B,z){var w=(y.startContainer!==A||y.startOffset!=x);var C=(y.endContainer!==B||y.endOffset!=z);if(C){y.setEnd(B,z)}if(w){y.setStart(A,x)}}function t(w){w.nativeRange.detach();w.detached=true;var x=s.length,y;while(x--){y=s[x];w[y]=null}}var m;a=function(w){if(!w){throw new Error("Range must be specified")}this.nativeRange=w;l(this)};i.createPrototypeRange(a,o,t);n=a.prototype;n.selectNode=function(w){this.nativeRange.selectNode(w);l(this)};n.deleteContents=function(){this.nativeRange.deleteContents();l(this)};n.extractContents=function(){var w=this.nativeRange.extractContents();l(this);return w};n.cloneContents=function(){return this.nativeRange.cloneContents()};n.surroundContents=function(w){this.nativeRange.surroundContents(w);l(this)};n.collapse=function(w){this.nativeRange.collapse(w);l(this)};n.cloneRange=function(){return new a(this.nativeRange.cloneRange())};n.toString=function(){return this.nativeRange.toString()};var r=document.createTextNode("test");document.body.appendChild(r);var p=document.createRange();p.setStart(r,0);p.setEnd(r,0);try{p.setStart(r,1);v=true;n.setStart=function(w,x){this.nativeRange.setStart(w,x);l(this)};n.setEnd=function(w,x){this.nativeRange.setEnd(w,x);l(this)};m=function(w,x){return function(y){this.nativeRange[w](y);l(this)}}}catch(q){v=false;n.setStart=function(x,y){try{this.nativeRange.setStart(x,y)}catch(w){this.nativeRange.setEnd(x,y);this.nativeRange.setStart(x,y)}l(this)};n.setEnd=function(x,y){try{this.nativeRange.setEnd(x,y)}catch(w){this.nativeRange.setStart(x,y);this.nativeRange.setEnd(x,y)}l(this)};m=function(w,x){return function(z){try{this.nativeRange[w](z)}catch(y){this.nativeRange[x](z);this.nativeRange[w](z)}l(this)}}}n.setStartBefore=m("setStartBefore","setEndBefore");n.setStartAfter=m("setStartAfter","setEndAfter");n.setEndBefore=m("setEndBefore","setStartBefore");n.setEndAfter=m("setEndAfter","setStartAfter");p.selectNodeContents(r);if(p.startContainer==r&&p.endContainer==r&&p.startOffset==0&&p.endOffset==r.length){n.selectNodeContents=function(w){this.nativeRange.selectNodeContents(w);l(this)}}else{n.selectNodeContents=function(w){this.setStart(w,0);this.setEnd(w,c.getEndOffset(w))}}p.selectNodeContents(r);p.setEnd(r,3);var u=document.createRange();u.selectNodeContents(r);u.setEnd(r,4);u.setStart(r,2);if(p.compareBoundaryPoints(p.START_TO_END,u)==-1&&p.compareBoundaryPoints(p.END_TO_START,u)==1){n.compareBoundaryPoints=function(x,w){w=w.nativeRange||w;if(x==w.START_TO_END){x=w.END_TO_START}else{if(x==w.END_TO_START){x=w.START_TO_END}}return this.nativeRange.compareBoundaryPoints(x,w)}}else{n.compareBoundaryPoints=function(x,w){return this.nativeRange.compareBoundaryPoints(x,w.nativeRange||w)}}document.body.removeChild(r);p.detach();u.detach()})()}else{if(h.features.implementsTextRange){a=function(m){var n,l;if(m.text){l=e(m,false);n=e(m,true);n.cleanUp();l.cleanUp();this.alteredDom=n.alteredDom||l.alteredDom}else{l=n=e(m,true);n.cleanUp();this.alteredDom=n.alteredDom}this.setStart(n.position.node,n.position.offset);this.setEnd(l.position.node,l.position.offset)};a.prototype=new i(document);a.rangeToTextRange=function(l){var o=j(new b(l.startContainer,l.startOffset),true);var n=j(new b(l.endContainer,l.endOffset),false);var m=g.getDocument(l.startContainer).body.createTextRange();m.setEndPoint("StartToStart",o);m.setEndPoint("EndToEnd",n);return m};i.copyComparisonConstants(a);var f=(function(){return this})();if(typeof f.Range=="undefined"){f.Range=a}}}h.WrappedRange=a;h.createNativeRange=function(l){l=l||document;if(rangy.features.implementsDomRange){return l.createRange()}else{if(rangy.features.implementsTextRange){return l.body.createTextRange()}}};h.createRange=function(l){l=l||document;return new a(h.createNativeRange(l))};h.createRangyRange=function(l){l=l||document;return new i(l)}});rangy.createModule("WrappedSelection",function(l,e){l.requireModules(["DomRange","WrappedRange"]);var k="boolean";var p=l.dom;var c=l.util;var j=l.DomRange;var u=l.WrappedRange;var o=p.DOMException;var g,x;if(l.util.isHostMethod(window,"getSelection")){g=function(z){return(z||window).getSelection()}}else{if(l.util.isHostObject(document,"selection")){g=function(z){return((z||window).document.selection)}}else{e.fail("No means of obtaining a selection object")}}l.getNativeSelection=g;var d=g();var i=l.createNativeRange(document);var y=c.areHostObjects(d,["anchorNode","focusNode"]&&c.areHostProperties(d,["anchorOffset","focusOffset"]));l.features.selectionHasAnchorAndFocus=y;var r=c.isHostProperty(d,"type");var s=false,h;if(c.isHostObject(document,"body")&&c.isHostMethod(document.body,"createControlRange")){h=document.body.createControlRange();if(c.areHostProperties(h,["item","add"])){s=true}}l.features.implementsControlRange=s;if(typeof d.isCollapsed==k){x=function(z){return z.nativeSelection.isCollapsed}}else{if(y){x=function(z){return z.anchorNode===z.focusNode&&z.anchorOffset===z.focusOffset}}else{x=function(z){return z.rangeCount?z.getRangeAt(0).collapsed:false}}}function v(A,z){A.anchorNode=z.startContainer;A.anchorOffset=z.startOffset;A.focusNode=z.endContainer;A.focusOffset=z.endOffset}function t(z){var A=z.nativeSelection;z.anchorNode=A.anchorNode;z.anchorOffset=A.anchorOffset;z.focusNode=A.focusNode;z.focusOffset=A.focusOffset}function f(z){z.anchorNode=z.focusNode=null;z.anchorOffset=z.focusOffset=0;z.rangeCount=0;z.isCollapsed=true}function n(z){var A;if(z instanceof j){A=z._selectionNativeRange;if(!A){A=l.createNativeRange(p.getDocument(z.startContainer));A.setEnd(z.endContainer,z.endOffset);A.setStart(z.startContainer,z.startOffset);z._selectionNativeRange=A;z.attachListener("detach",function(){this._selectionNativeRange=null})}}else{if(z instanceof u){A=z.nativeRange}else{if(window.Range&&(z instanceof Range)){A=z}}}return A}function q(A){var z=A.getNodes();if(z.length!=1||z[0].nodeType!=1){throw new Error("getSingleElementFromRange: range did not consist of a single element")}return z[0]}function m(C){C._ranges.length=0;if(C.nativeSelection.type=="None"){f(C)}else{var B=C.nativeSelection.createRange();C.rangeCount=B.length;var z,D=p.getDocument(B.item(A));for(var A=0;A<C.rangeCount;++A){z=l.createRange(D);z.selectNode(B.item(A));C._ranges.push(z)}C.isCollapsed=C.rangeCount==1&&C._ranges[0].collapsed;v(C,C._ranges[C.rangeCount-1])}}function w(z){this.nativeSelection=z;this._ranges=[];this.refresh()}l.getSelection=function(z){return new w(g(z))};var a=w.prototype;if(y&&c.areHostMethods(d,["removeAllRanges","addRange"])){a.removeAllRanges=function(){this.nativeSelection.removeAllRanges();f(this)};a.addRange=function(z){this.nativeSelection.addRange(n(z));t(this);this.isCollapsed=x(this);this.rangeCount=(typeof this.nativeSelection.rangeCount=="number")?this.nativeSelection.rangeCount:1}}else{if(c.isHostMethod(d,"empty")&&c.isHostMethod(i,"select")&&r&&s){a.removeAllRanges=function(){this.nativeSelection.empty();this._ranges.length=0;f(this)};a.addRange=function(A){if(this.nativeSelection.type=="Control"){var D=this.nativeSelection.createRange();var C=q(A);var E=p.getDocument(D.item(0));var F=E.body.createControlRange();for(var B=0,z=D.length;B<z;++B){F.add(D.item(B))}F.add(C);F.select();m(this)}else{u.rangeToTextRange(A).select();this._ranges.push(A);this.rangeCount=this._ranges.length;this.isCollapsed=this.rangeCount==1&&this._ranges[0].collapsed}}}else{e.fail("No means of selecting a Range or TextRange was found");return false}}if(c.isHostMethod(d,"getRangeAt")&&typeof d.rangeCount=="number"){a.getRangeAt=function(z){return new u(this.nativeSelection.getRangeAt(z))};a.refresh=function(){t(this);this.isCollapsed=x(this);this.rangeCount=this.nativeSelection.rangeCount}}else{if(y&&typeof i.collapsed==k&&l.features.implementsDomRange){a.getRangeAt=function(z){if(z<0||z>=this.rangeCount){throw new o("INDEX_SIZE_ERR")}else{return this._ranges[z]}};a.refresh=function(){var B,z,A=this.nativeSelection;if(A.anchorNode){B=p.getDocument(A.anchorNode);z=l.createRange(B);z.setStart(A.anchorNode,A.anchorOffset);z.setEnd(A.focusNode,A.focusOffset);if(z.collapsed!==this.isCollapsed){z.setStart(A.focusNode,A.focusOffset);z.setEnd(A.anchorNode,A.anchorOffset)}t(this);this.isCollapsed=z.collapsed;this._ranges=[z];this.rangeCount=1}else{f(this);this._ranges=[]}}}else{if(c.isHostMethod(d,"createRange")&&l.features.implementsTextRange){a.getRangeAt=function(z){if(z<0||z>=this.rangeCount){throw new o("INDEX_SIZE_ERR")}else{return this._ranges[z]}};a.refresh=function(){var B=this.nativeSelection.createRange(),A,z;if(this.nativeSelection.type=="Control"){m(this)}else{if(B&&typeof B.text!="undefined"){A=new u(B);this._ranges=[A];if(A.alteredDom){u.rangeToTextRange(A).select()}v(this,A);this.rangeCount=1;this.isCollapsed=A.collapsed}else{f(this);this._ranges.length=this.rangeCount=0}}}}else{e.fail("No means of obtaining a Range or TextRange from the user's selection was found");return false}}}if(c.isHostMethod(d,"removeRange")&&typeof d.rangeCount=="number"){a.removeRange=function(z){this.nativeSelection.removeRange(n(z));t(this);this.rangeCount=this.nativeSelection.rangeCount;this.isCollapsed=x(this)}}else{var b=function(D,B){var A=D.getAllRanges(),E=false;D.removeAllRanges();for(var C=0,z=A.length;C<z;++C){if(E||!j.util.rangesEqual(A[C],B)){D.addRange(A[C])}else{E=true}}if(!D.rangeCount){f(D)}};if(r&&s){a.removeRange=function(D){if(this.nativeSelection.type=="Control"){var B=this.nativeSelection.createRange();var z=q(D);var H=p.getDocument(B.item(0));var F=H.body.createControlRange();var A,G=false;for(var C=0,E=B.length;C<E;++C){A=B.item(C);if(A!==z||G){F.add(B.item(C))}else{G=true}}F.select();m(this)}else{b(this,D)}}}else{a.removeRange=function(z){b(this,z)}}}if(y&&l.features.implementsDomRange){a.isBackwards=function(){var A=this.nativeSelection,z=false;if(A.anchorNode){z=(p.comparePoints(A.anchorNode,A.anchorOffset,A.focusNode,A.focusOffset)==1)}return z}}else{a.isBackwards=function(){return false}}if(c.isHostMethod(d,"toString")){a.toString=function(){return""+this.nativeSelection}}else{a.toString=function(){var B=[];for(var A=0,z=this.rangeCount;A<z;++A){B[A]=""+this.getRangeAt(A)}return B.join("")}}if(c.isHostMethod(d,"collapse")){a.collapse=function(z,A){this.nativeSelection.collapse(z,A);t(this);this.rangeCount=1;this.isCollapsed=true}}else{a.collapse=function(A,B){if(this.anchorNode&&(p.getDocument(this.anchorNode)!==p.getDocument(A))){throw new o("WRONG_DOCUMENT_ERR")}var z=l.createRange(p.getDocument(A));z.setStart(A,B);z.collapse(true);this.removeAllRanges();this.addRange(z);this.isCollapsed=true}}if(c.isHostMethod(d,"collapseToStart")){a.collapseToStart=function(){this.nativeSelection.collapseToStart();t(this);this.rangeCount=1;this.isCollapsed=true}}else{a.collapseToStart=function(){if(this.rangeCount){var z=this.getRangeAt(0);z.collapse(true);this.removeAllRanges();this.addRange(z);this.isCollapsed=true}else{throw new o("INVALID_STATE_ERR")}}}if(c.isHostMethod(d,"collapseToEnd")){a.collapseToEnd=function(){this.nativeSelection.collapseToEnd();t(this);this.rangeCount=1;this.isCollapsed=true}}else{a.collapseToEnd=function(){if(this.rangeCount){var z=this.getRangeAt(this.rangeCount-1);z.collapse(false);this.removeAllRanges();this.addRange(z);this.isCollapsed=true}else{throw new o("INVALID_STATE_ERR")}}}if(c.isHostMethod(d,"selectAllChildren")){a.selectAllChildren=function(z){this.nativeSelection.selectAllChildren(z);t(this);this.rangeCount=1}}else{a.selectAllChildren=function(A){if(this.anchorNode&&(p.getDocument(this.anchorNode)!==p.getDocument(A))){throw new o("WRONG_DOCUMENT_ERR")}var z=l.createRange(p.getDocument(A));z.selectNodeContents(A);if(p.isCharacterDataNode(A)){z.collapse(true)}this.removeAllRanges();this.addRange(z)}}if(c.isHostMethod(d,"deleteFromDocument")){a.deleteFromDocument=function(){this.nativeSelection.deleteFromDocument();t(this);this.rangeCount=1}}else{a.deleteFromDocument=function(){if(this.rangeCount){var A=this.getAllRanges();this.removeAllRanges();for(var B=0,z=A.length;B<z;++B){A[B].deleteContents()}this.addRange(A[z-1])}}}a.getAllRanges=function(){var z=[];for(var A=0;A<this.rangeCount;++A){z[A]=this.getRangeAt(A)}return z};a.setRanges=function(A){this.removeAllRanges();for(var B=0,z=A.length;B<z;++B){this.addRange(A[B])}}});