define(function(require){'use strict';var CMD=require('../core/PathProxy').CMD;var line=require('./line');var cubic=require('./cubic');var quadratic=require('./quadratic');var arc=require('./arc');var normalizeRadian=require('./util').normalizeRadian;var curve=require('../core/curve');var windingLine=require('./windingLine');var containStroke=line.containStroke;var PI2=Math.PI*2;var EPSILON=1e-4;function isAroundEqual(a,b){return Math.abs(a-b)<EPSILON;}
var roots=[-1,-1,-1];var extrema=[-1,-1];function swapExtrema(){var tmp=extrema[0];extrema[0]=extrema[1];extrema[1]=tmp;}
function windingCubic(x0,y0,x1,y1,x2,y2,x3,y3,x,y){if((y>y0&&y>y1&&y>y2&&y>y3)||(y<y0&&y<y1&&y<y2&&y<y3)){return 0;}
var nRoots=curve.cubicRootAt(y0,y1,y2,y3,y,roots);if(nRoots===0){return 0;}
else{var w=0;var nExtrema=-1;var y0_,y1_;for(var i=0;i<nRoots;i++){var t=roots[i];var x_=curve.cubicAt(x0,x1,x2,x3,t);if(x_<x){continue;}
if(nExtrema<0){nExtrema=curve.cubicExtrema(y0,y1,y2,y3,extrema);if(extrema[1]<extrema[0]&&nExtrema>1){swapExtrema();}
y0_=curve.cubicAt(y0,y1,y2,y3,extrema[0]);if(nExtrema>1){y1_=curve.cubicAt(y0,y1,y2,y3,extrema[1]);}}
if(nExtrema==2){if(t<extrema[0]){w+=y0_<y0?1:-1;}
else if(t<extrema[1]){w+=y1_<y0_?1:-1;}
else{w+=y3<y1_?1:-1;}}
else{if(t<extrema[0]){w+=y0_<y0?1:-1;}
else{w+=y3<y0_?1:-1;}}}
return w;}}
function windingQuadratic(x0,y0,x1,y1,x2,y2,x,y){if((y>y0&&y>y1&&y>y2)||(y<y0&&y<y1&&y<y2)){return 0;}
var nRoots=curve.quadraticRootAt(y0,y1,y2,y,roots);if(nRoots===0){return 0;}
else{var t=curve.quadraticExtremum(y0,y1,y2);if(t>=0&&t<=1){var w=0;var y_=curve.quadraticAt(y0,y1,y2,t);for(var i=0;i<nRoots;i++){var x_=curve.quadraticAt(x0,x1,x2,roots[i]);if(x_<x){continue;}
if(roots[i]<t){w+=y_<y0?1:-1;}
else{w+=y2<y_?1:-1;}}
return w;}
else{var x_=curve.quadraticAt(x0,x1,x2,roots[0]);if(x_<x){return 0;}
return y2<y0?1:-1;}}}
function windingArc(cx,cy,r,startAngle,endAngle,anticlockwise,x,y){y-=cy;if(y>r||y<-r){return 0;}
var tmp=Math.sqrt(r*r-y*y);roots[0]=-tmp;roots[1]=tmp;var diff=Math.abs(startAngle-endAngle);if(diff<1e-4){return 0;}
if(diff%PI2<1e-4){startAngle=0;endAngle=PI2;var dir=anticlockwise?1:-1;if(x>=roots[0]+cx&&x<=roots[1]+cx){return dir;}else{return 0;}}
if(anticlockwise){var tmp=startAngle;startAngle=normalizeRadian(endAngle);endAngle=normalizeRadian(tmp);}
else{startAngle=normalizeRadian(startAngle);endAngle=normalizeRadian(endAngle);}
if(startAngle>endAngle){endAngle+=PI2;}
var w=0;for(var i=0;i<2;i++){var x_=roots[i];if(x_+cx>x){var angle=Math.atan2(y,x_);var dir=anticlockwise?1:-1;if(angle<0){angle=PI2+angle;}
if((angle>=startAngle&&angle<=endAngle)||(angle+PI2>=startAngle&&angle+PI2<=endAngle)){if(angle>Math.PI/2&&angle<Math.PI*1.5){dir=-dir;}
w+=dir;}}}
return w;}
function containPath(data,lineWidth,isStroke,x,y){var w=0;var xi=0;var yi=0;var x0=0;var y0=0;for(var i=0;i<data.length;){var cmd=data[i++];if(cmd===CMD.M&&i>1){if(!isStroke){w+=windingLine(xi,yi,x0,y0,x,y);}
if(w!==0){return true;}}
if(i==1){xi=data[i];yi=data[i+1];x0=xi;y0=yi;}
switch(cmd){case CMD.M:x0=data[i++];y0=data[i++];xi=x0;yi=y0;break;case CMD.L:if(isStroke){if(containStroke(xi,yi,data[i],data[i+1],lineWidth,x,y)){return true;}}
else{w+=windingLine(xi,yi,data[i],data[i+1],x,y)||0;}
xi=data[i++];yi=data[i++];break;case CMD.C:if(isStroke){if(cubic.containStroke(xi,yi,data[i++],data[i++],data[i++],data[i++],data[i],data[i+1],lineWidth,x,y)){return true;}}
else{w+=windingCubic(xi,yi,data[i++],data[i++],data[i++],data[i++],data[i],data[i+1],x,y)||0;}
xi=data[i++];yi=data[i++];break;case CMD.Q:if(isStroke){if(quadratic.containStroke(xi,yi,data[i++],data[i++],data[i],data[i+1],lineWidth,x,y)){return true;}}
else{w+=windingQuadratic(xi,yi,data[i++],data[i++],data[i],data[i+1],x,y)||0;}
xi=data[i++];yi=data[i++];break;case CMD.A:var cx=data[i++];var cy=data[i++];var rx=data[i++];var ry=data[i++];var theta=data[i++];var dTheta=data[i++];var psi=data[i++];var anticlockwise=1-data[i++];var x1=Math.cos(theta)*rx+cx;var y1=Math.sin(theta)*ry+cy;if(i>1){w+=windingLine(xi,yi,x1,y1,x,y);}
else{x0=x1;y0=y1;}
var _x=(x-cx)*ry/rx+cx;if(isStroke){if(arc.containStroke(cx,cy,ry,theta,theta+dTheta,anticlockwise,lineWidth,_x,y)){return true;}}
else{w+=windingArc(cx,cy,ry,theta,theta+dTheta,anticlockwise,_x,y);}
xi=Math.cos(theta+dTheta)*rx+cx;yi=Math.sin(theta+dTheta)*ry+cy;break;case CMD.R:x0=xi=data[i++];y0=yi=data[i++];var width=data[i++];var height=data[i++];var x1=x0+width;var y1=y0+height;if(isStroke){if(containStroke(x0,y0,x1,y0,lineWidth,x,y)||containStroke(x1,y0,x1,y1,lineWidth,x,y)||containStroke(x1,y1,x0,y1,lineWidth,x,y)||containStroke(x0,y1,x1,y1,lineWidth,x,y)){return true;}}
else{w+=windingLine(x1,y0,x1,y1,x,y);w+=windingLine(x0,y1,x0,y0,x,y);}
break;case CMD.Z:if(isStroke){if(containStroke(xi,yi,x0,y0,lineWidth,x,y)){return true;}}
else{w+=windingLine(xi,yi,x0,y0,x,y);if(w!==0){return true;}}
xi=x0;yi=y0;break;}}
if(!isStroke&&!isAroundEqual(yi,y0)){w+=windingLine(xi,yi,x0,y0,x,y)||0;}
return w!==0;}
return{contain:function(pathData,x,y){return containPath(pathData,0,false,x,y);},containStroke:function(pathData,lineWidth,x,y){return containPath(pathData,lineWidth,true,x,y);}};});