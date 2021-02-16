(function(global,factory){typeof exports==='object'&&typeof module!=='undefined'?factory(exports):typeof define==='function'&&define.amd?define('venn',['exports'],factory):factory((global.venn={}));}(this,function(exports){'use strict';function bisect(f,a,b,parameters){parameters=parameters||{};var maxIterations=parameters.maxIterations||100,tolerance=parameters.tolerance||1e-10,fA=f(a),fB=f(b),delta=b-a;if(fA*fB>0){throw "Initial bisect points must have opposite signs";}
if(fA===0)return a;if(fB===0)return b;for(var i=0;i<maxIterations;++i){delta/=2;var mid=a+delta,fMid=f(mid);if(fMid*fA>=0){a=mid;}
if((Math.abs(delta)<tolerance)||(fMid===0)){return mid;}}
return a+delta;}
function zeros(x){var r=new Array(x);for(var i=0;i<x;++i){r[i]=0;}return r;}
function zerosM(x,y){return zeros(x).map(function(){return zeros(y);});}
function dot(a,b){var ret=0;for(var i=0;i<a.length;++i){ret+=a[i]*b[i];}
return ret;}
function norm2(a){return Math.sqrt(dot(a,a));}
function multiplyBy(a,c){for(var i=0;i<a.length;++i){a[i]*=c;}}
function weightedSum(ret,w1,v1,w2,v2){for(var j=0;j<ret.length;++j){ret[j]=w1*v1[j]+w2*v2[j];}}
function fmin(f,x0,parameters){parameters=parameters||{};var maxIterations=parameters.maxIterations||x0.length*200,nonZeroDelta=parameters.nonZeroDelta||1.1,zeroDelta=parameters.zeroDelta||0.001,minErrorDelta=parameters.minErrorDelta||1e-6,minTolerance=parameters.minErrorDelta||1e-5,rho=parameters.rho||1,chi=parameters.chi||2,psi=parameters.psi||-0.5,sigma=parameters.sigma||0.5,callback=parameters.callback,maxDiff,temp;var N=x0.length,simplex=new Array(N+1);simplex[0]=x0;simplex[0].fx=f(x0);for(var i=0;i<N;++i){var point=x0.slice();point[i]=point[i]?point[i]*nonZeroDelta:zeroDelta;simplex[i+1]=point;simplex[i+1].fx=f(point);}
var sortOrder=function(a,b){return a.fx-b.fx;};var centroid=x0.slice(),reflected=x0.slice(),contracted=x0.slice(),expanded=x0.slice();for(var iteration=0;iteration<maxIterations;++iteration){simplex.sort(sortOrder);if(callback){callback(simplex);}
maxDiff=0;for(i=0;i<N;++i){maxDiff=Math.max(maxDiff,Math.abs(simplex[0][i]-simplex[1][i]));}
if((Math.abs(simplex[0].fx-simplex[N].fx)<minErrorDelta)&&(maxDiff<minTolerance)){break;}
for(i=0;i<N;++i){centroid[i]=0;for(var j=0;j<N;++j){centroid[i]+=simplex[j][i];}
centroid[i]/=N;}
var worst=simplex[N];weightedSum(reflected,1+rho,centroid,-rho,worst);reflected.fx=f(reflected);if(reflected.fx<=simplex[0].fx){weightedSum(expanded,1+chi,centroid,-chi,worst);expanded.fx=f(expanded);if(expanded.fx<reflected.fx){temp=simplex[N];simplex[N]=expanded;expanded=temp;}else{temp=simplex[N];simplex[N]=reflected;reflected=temp;}}
else if(reflected.fx>=simplex[N-1].fx){var shouldReduce=false;if(reflected.fx>worst.fx){weightedSum(contracted,1+psi,centroid,-psi,worst);contracted.fx=f(contracted);if(contracted.fx<worst.fx){temp=simplex[N];simplex[N]=contracted;contracted=temp;}else{shouldReduce=true;}}else{weightedSum(contracted,1-psi*rho,centroid,psi*rho,worst);contracted.fx=f(contracted);if(contracted.fx<=reflected.fx){temp=simplex[N];simplex[N]=contracted;contracted=temp;}else{shouldReduce=true;}}
if(shouldReduce){for(i=1;i<simplex.length;++i){weightedSum(simplex[i],1-sigma,simplex[0],sigma,simplex[i]);simplex[i].fx=f(simplex[i]);}}}else{temp=simplex[N];simplex[N]=reflected;reflected=temp;}}
simplex.sort(sortOrder);return{f:simplex[0].fx,solution:simplex[0]};}
function minimizeConjugateGradient(f,initial,params){var current={x:initial.slice(),fx:0,fxprime:initial.slice()},next={x:initial.slice(),fx:0,fxprime:initial.slice()},yk=initial.slice(),pk,temp,a=1,maxIterations;params=params||{};maxIterations=params.maxIterations||initial.length*5;current.fx=f(current.x,current.fxprime);pk=current.fxprime.slice();multiplyBy(pk,-1);for(var i=0;i<maxIterations;++i){if(params.history){params.history.push({x:current.x.slice(),fx:current.fx,fxprime:current.fxprime.slice()});}
a=wolfeLineSearch(f,pk,current,next,a);if(!a){for(var j=0;j<pk.length;++j){pk[j]=-1*current.fxprime[j];}}else{weightedSum(yk,1,next.fxprime,-1,current.fxprime);var delta_k=dot(current.fxprime,current.fxprime),beta_k=Math.max(0,dot(yk,next.fxprime)/delta_k);weightedSum(pk,beta_k,pk,-1,next.fxprime);temp=current;current=next;next=temp;}
if(norm2(current.fxprime)<=1e-5){break;}}
if(params.history){params.history.push({x:current.x.slice(),fx:current.fx,fxprime:current.fxprime.slice()});}
return current;}
var c1=1e-6;var c2=0.1;function wolfeLineSearch(f,pk,current,next,a){var phi0=current.fx,phiPrime0=dot(current.fxprime,pk),phi=phi0,phi_old=phi0,phiPrime=phiPrime0,a0=0;a=a||1;function zoom(a_lo,a_high,phi_lo){for(var iteration=0;iteration<16;++iteration){a=(a_lo+a_high)/2;weightedSum(next.x,1.0,current.x,a,pk);phi=next.fx=f(next.x,next.fxprime);phiPrime=dot(next.fxprime,pk);if((phi>(phi0+c1*a*phiPrime0))||(phi>=phi_lo)){a_high=a;}else{if(Math.abs(phiPrime)<=-c2*phiPrime0){return a;}
if(phiPrime*(a_high-a_lo)>=0){a_high=a_lo;}
a_lo=a;phi_lo=phi;}}
return 0;}
for(var iteration=0;iteration<10;++iteration){weightedSum(next.x,1.0,current.x,a,pk);phi=next.fx=f(next.x,next.fxprime);phiPrime=dot(next.fxprime,pk);if((phi>(phi0+c1*a*phiPrime0))||(iteration&&(phi>=phi_old))){return zoom(a0,a,phi_old);}
if(Math.abs(phiPrime)<=-c2*phiPrime0){return a;}
if(phiPrime>=0){return zoom(a,a0,phi);}
phi_old=phi;a0=a;a*=2;}
return 0;}
var SMALL=1e-10;function intersectionArea(circles,stats){var intersectionPoints=getIntersectionPoints(circles);var innerPoints=intersectionPoints.filter(function(p){return containedInCircles(p,circles);});var arcArea=0,polygonArea=0,arcs=[],i;if(innerPoints.length>1){var center=getCenter(innerPoints);for(i=0;i<innerPoints.length;++i){var p=innerPoints[i];p.angle=Math.atan2(p.x-center.x,p.y-center.y);}
innerPoints.sort(function(a,b){return b.angle-a.angle;});var p2=innerPoints[innerPoints.length-1];for(i=0;i<innerPoints.length;++i){var p1=innerPoints[i];polygonArea+=(p2.x+p1.x)*(p1.y-p2.y);var midPoint={x:(p1.x+p2.x)/2,y:(p1.y+p2.y)/2},arc=null;for(var j=0;j<p1.parentIndex.length;++j){if(p2.parentIndex.indexOf(p1.parentIndex[j])>-1){var circle=circles[p1.parentIndex[j]],a1=Math.atan2(p1.x-circle.x,p1.y-circle.y),a2=Math.atan2(p2.x-circle.x,p2.y-circle.y);var angleDiff=(a2-a1);if(angleDiff<0){angleDiff+=2*Math.PI;}
var a=a2-angleDiff/2,width=distance(midPoint,{x:circle.x+circle.radius*Math.sin(a),y:circle.y+circle.radius*Math.cos(a)});if((arc===null)||(arc.width>width)){arc={circle:circle,width:width,p1:p1,p2:p2};}}}
if(arc!==null){arcs.push(arc);arcArea+=circleArea(arc.circle.radius,arc.width);p2=p1;}}}else{var smallest=circles[0];for(i=1;i<circles.length;++i){if(circles[i].radius<smallest.radius){smallest=circles[i];}}
var disjoint=false;for(i=0;i<circles.length;++i){if(distance(circles[i],smallest)>Math.abs(smallest.radius-circles[i].radius)){disjoint=true;break;}}
if(disjoint){arcArea=polygonArea=0;}else{arcArea=smallest.radius*smallest.radius*Math.PI;arcs.push({circle:smallest,p1:{x:smallest.x,y:smallest.y+smallest.radius},p2:{x:smallest.x-SMALL,y:smallest.y+smallest.radius},width:smallest.radius*2});}}
polygonArea/=2;if(stats){stats.area=arcArea+polygonArea;stats.arcArea=arcArea;stats.polygonArea=polygonArea;stats.arcs=arcs;stats.innerPoints=innerPoints;stats.intersectionPoints=intersectionPoints;}
return arcArea+polygonArea;}
function containedInCircles(point,circles){for(var i=0;i<circles.length;++i){if(distance(point,circles[i])>circles[i].radius+SMALL){return false;}}
return true;}
function getIntersectionPoints(circles){var ret=[];for(var i=0;i<circles.length;++i){for(var j=i+1;j<circles.length;++j){var intersect=circleCircleIntersection(circles[i],circles[j]);for(var k=0;k<intersect.length;++k){var p=intersect[k];p.parentIndex=[i,j];ret.push(p);}}}
return ret;}
function circleIntegral(r,x){var y=Math.sqrt(r*r-x*x);return x*y+r*r*Math.atan2(x,y);}
function circleArea(r,width){return circleIntegral(r,width-r)-circleIntegral(r,-r);}
function distance(p1,p2){return Math.sqrt((p1.x-p2.x)*(p1.x-p2.x)+
(p1.y-p2.y)*(p1.y-p2.y));}
function circleOverlap(r1,r2,d){if(d>=r1+r2){return 0;}
if(d<=Math.abs(r1-r2)){return Math.PI*Math.min(r1,r2)*Math.min(r1,r2);}
var w1=r1-(d*d-r2*r2+r1*r1)/(2*d),w2=r2-(d*d-r1*r1+r2*r2)/(2*d);return circleArea(r1,w1)+circleArea(r2,w2);}
function circleCircleIntersection(p1,p2){var d=distance(p1,p2),r1=p1.radius,r2=p2.radius;if((d>=(r1+r2))||(d<=Math.abs(r1-r2))){return[];}
var a=(r1*r1-r2*r2+d*d)/(2*d),h=Math.sqrt(r1*r1-a*a),x0=p1.x+a*(p2.x-p1.x)/d,y0=p1.y+a*(p2.y-p1.y)/d,rx=-(p2.y-p1.y)*(h/d),ry=-(p2.x-p1.x)*(h/d);return[{x:x0+rx,y:y0-ry},{x:x0-rx,y:y0+ry}];}
function getCenter(points){var center={x:0,y:0};for(var i=0;i<points.length;++i){center.x+=points[i].x;center.y+=points[i].y;}
center.x/=points.length;center.y/=points.length;return center;}
function venn(areas,parameters){parameters=parameters||{};parameters.maxIterations=parameters.maxIterations||500;var initialLayout=parameters.initialLayout||bestInitialLayout;areas=addMissingAreas(areas);var circles=initialLayout(areas);var initial=[],setids=[],setid;for(setid in circles){if(circles.hasOwnProperty(setid)){initial.push(circles[setid].x);initial.push(circles[setid].y);setids.push(setid);}}
var totalFunctionCalls=0;var solution=fmin(function(values){totalFunctionCalls+=1;var current={};for(var i=0;i<setids.length;++i){var setid=setids[i];current[setid]={x:values[2*i],y:values[2*i+1],radius:circles[setid].radius,};}
return lossFunction(current,areas);},initial,parameters);var positions=solution.solution;for(var i=0;i<setids.length;++i){setid=setids[i];circles[setid].x=positions[2*i];circles[setid].y=positions[2*i+1];}
return circles;}
var SMALL$1=1e-10;function distanceFromIntersectArea(r1,r2,overlap){if(Math.min(r1,r2)*Math.min(r1,r2)*Math.PI<=overlap+SMALL$1){return Math.abs(r1-r2);}
return bisect(function(distance){return circleOverlap(r1,r2,distance)-overlap;},0,r1+r2);}
function addMissingAreas(areas){areas=areas.slice();var ids=[],pairs={},i,j,a,b;for(i=0;i<areas.length;++i){var area=areas[i];if(area.sets.length==1){ids.push(area.sets[0]);}else if(area.sets.length==2){a=area.sets[0];b=area.sets[1];pairs[[a,b]]=true;pairs[[b,a]]=true;}}
ids.sort(function(a,b){return a>b;});for(i=0;i<ids.length;++i){a=ids[i];for(j=i+1;j<ids.length;++j){b=ids[j];if(!([a,b]in pairs)){areas.push({'sets':[a,b],'size':0});}}}
return areas;}
function getDistanceMatrices(areas,sets,setids){var distances=zerosM(sets.length,sets.length),constraints=zerosM(sets.length,sets.length);areas.filter(function(x){return x.sets.length==2;}).map(function(current){var left=setids[current.sets[0]],right=setids[current.sets[1]],r1=Math.sqrt(sets[left].size/Math.PI),r2=Math.sqrt(sets[right].size/Math.PI),distance=distanceFromIntersectArea(r1,r2,current.size);distances[left][right]=distances[right][left]=distance;var c=0;if(current.size+1e-10>=Math.min(sets[left].size,sets[right].size)){c=1;}else if(current.size<=1e-10){c=-1;}
constraints[left][right]=constraints[right][left]=c;});return{distances:distances,constraints:constraints};}
function constrainedMDSGradient(x,fxprime,distances,constraints){var loss=0,i;for(i=0;i<fxprime.length;++i){fxprime[i]=0;}
for(i=0;i<distances.length;++i){var xi=x[2*i],yi=x[2*i+1];for(var j=i+1;j<distances.length;++j){var xj=x[2*j],yj=x[2*j+1],dij=distances[i][j],constraint=constraints[i][j];var squaredDistance=(xj-xi)*(xj-xi)+(yj-yi)*(yj-yi),distance=Math.sqrt(squaredDistance),delta=squaredDistance-dij*dij;if(((constraint>0)&&(distance<=dij))||((constraint<0)&&(distance>=dij))){continue;}
loss+=2*delta*delta;fxprime[2*i]+=4*delta*(xi-xj);fxprime[2*i+1]+=4*delta*(yi-yj);fxprime[2*j]+=4*delta*(xj-xi);fxprime[2*j+1]+=4*delta*(yj-yi);}}
return loss;}
function bestInitialLayout(areas,params){var initial=greedyLayout(areas,params);if(areas.length>=8){var constrained=constrainedMDSLayout(areas,params),constrainedLoss=lossFunction(constrained,areas),greedyLoss=lossFunction(initial,areas);if(constrainedLoss+1e-8<greedyLoss){initial=constrained;}}
return initial;}
function constrainedMDSLayout(areas,params){params=params||{};var restarts=params.restarts||10;var sets=[],setids={},i;for(i=0;i<areas.length;++i){var area=areas[i];if(area.sets.length==1){setids[area.sets[0]]=sets.length;sets.push(area);}}
var matrices=getDistanceMatrices(areas,sets,setids),distances=matrices.distances,constraints=matrices.constraints;var norm=norm2(distances.map(norm2))/(distances.length);distances=distances.map(function(row){return row.map(function(value){return value/norm;});});var obj=function(x,fxprime){return constrainedMDSGradient(x,fxprime,distances,constraints);};var best,current;for(i=0;i<restarts;++i){var initial=zeros(distances.length*2).map(Math.random);current=minimizeConjugateGradient(obj,initial,params);if(!best||(current.fx<best.fx)){best=current;}}
var positions=best.x;var circles={};for(i=0;i<sets.length;++i){var set=sets[i];circles[set.sets[0]]={x:positions[2*i]*norm,y:positions[2*i+1]*norm,radius:Math.sqrt(set.size/Math.PI)};}
if(params.history){for(i=0;i<params.history.length;++i){multiplyBy(params.history[i].x,norm);}}
return circles;}
function greedyLayout(areas){var circles={},setOverlaps={},set;for(var i=0;i<areas.length;++i){var area=areas[i];if(area.sets.length==1){set=area.sets[0];circles[set]={x:1e10,y:1e10,rowid:circles.length,size:area.size,radius:Math.sqrt(area.size/Math.PI)};setOverlaps[set]=[];}}
areas=areas.filter(function(a){return a.sets.length==2;});for(i=0;i<areas.length;++i){var current=areas[i];var weight=current.hasOwnProperty('weight')?current.weight:1.0;var left=current.sets[0],right=current.sets[1];if(current.size+SMALL$1>=Math.min(circles[left].size,circles[right].size)){weight=0;}
setOverlaps[left].push({set:right,size:current.size,weight:weight});setOverlaps[right].push({set:left,size:current.size,weight:weight});}
var mostOverlapped=[];for(set in setOverlaps){if(setOverlaps.hasOwnProperty(set)){var size=0;for(i=0;i<setOverlaps[set].length;++i){size+=setOverlaps[set][i].size*setOverlaps[set][i].weight;}
mostOverlapped.push({set:set,size:size});}}
function sortOrder(a,b){return b.size-a.size;}
mostOverlapped.sort(sortOrder);var positioned={};function isPositioned(element){return element.set in positioned;}
function positionSet(point,index){circles[index].x=point.x;circles[index].y=point.y;positioned[index]=true;}
positionSet({x:0,y:0},mostOverlapped[0].set);for(i=1;i<mostOverlapped.length;++i){var setIndex=mostOverlapped[i].set,overlap=setOverlaps[setIndex].filter(isPositioned);set=circles[setIndex];overlap.sort(sortOrder);if(overlap.length===0){throw "ERROR: missing pairwise overlap information";}
var points=[];for(var j=0;j<overlap.length;++j){var p1=circles[overlap[j].set],d1=distanceFromIntersectArea(set.radius,p1.radius,overlap[j].size);points.push({x:p1.x+d1,y:p1.y});points.push({x:p1.x-d1,y:p1.y});points.push({y:p1.y+d1,x:p1.x});points.push({y:p1.y-d1,x:p1.x});for(var k=j+1;k<overlap.length;++k){var p2=circles[overlap[k].set],d2=distanceFromIntersectArea(set.radius,p2.radius,overlap[k].size);var extraPoints=circleCircleIntersection({x:p1.x,y:p1.y,radius:d1},{x:p2.x,y:p2.y,radius:d2});for(var l=0;l<extraPoints.length;++l){points.push(extraPoints[l]);}}}
var bestLoss=1e50,bestPoint=points[0];for(j=0;j<points.length;++j){circles[setIndex].x=points[j].x;circles[setIndex].y=points[j].y;var loss=lossFunction(circles,areas);if(loss<bestLoss){bestLoss=loss;bestPoint=points[j];}}
positionSet(bestPoint,setIndex);}
return circles;}
function lossFunction(sets,overlaps){var output=0;function getCircles(indices){return indices.map(function(i){return sets[i];});}
for(var i=0;i<overlaps.length;++i){var area=overlaps[i],overlap;if(area.sets.length==1){continue;}else if(area.sets.length==2){var left=sets[area.sets[0]],right=sets[area.sets[1]];overlap=circleOverlap(left.radius,right.radius,distance(left,right));}else{overlap=intersectionArea(getCircles(area.sets));}
var weight=area.hasOwnProperty('weight')?area.weight:1.0;output+=weight*(overlap-area.size)*(overlap-area.size);}
return output;}
function orientateCircles(circles,orientation,orientationOrder){if(orientationOrder===null){circles.sort(function(a,b){return b.radius-a.radius;});}else{circles.sort(orientationOrder);}
var i;if(circles.length>0){var largestX=circles[0].x,largestY=circles[0].y;for(i=0;i<circles.length;++i){circles[i].x-=largestX;circles[i].y-=largestY;}}
if(circles.length>1){var rotation=Math.atan2(circles[1].x,circles[1].y)-orientation,c=Math.cos(rotation),s=Math.sin(rotation),x,y;for(i=0;i<circles.length;++i){x=circles[i].x;y=circles[i].y;circles[i].x=c*x-s*y;circles[i].y=s*x+c*y;}}
if(circles.length>2){var angle=Math.atan2(circles[2].x,circles[2].y)-orientation;while(angle<0){angle+=2*Math.PI;}
while(angle>2*Math.PI){angle-=2*Math.PI;}
if(angle>Math.PI){var slope=circles[1].y/(1e-10+circles[1].x);for(i=0;i<circles.length;++i){var d=(circles[i].x+slope*circles[i].y)/(1+slope*slope);circles[i].x=2*d-circles[i].x;circles[i].y=2*d*slope-circles[i].y;}}}}
function disjointCluster(circles){circles.map(function(circle){circle.parent=circle;});function find(circle){if(circle.parent!==circle){circle.parent=find(circle.parent);}
return circle.parent;}
function union(x,y){var xRoot=find(x),yRoot=find(y);xRoot.parent=yRoot;}
for(var i=0;i<circles.length;++i){for(var j=i+1;j<circles.length;++j){var maxDistance=circles[i].radius+circles[j].radius;if(distance(circles[i],circles[j])+1e-10<maxDistance){union(circles[j],circles[i]);}}}
var disjointClusters={},setid;for(i=0;i<circles.length;++i){setid=find(circles[i]).parent.setid;if(!(setid in disjointClusters)){disjointClusters[setid]=[];}
disjointClusters[setid].push(circles[i]);}
circles.map(function(circle){delete circle.parent;});var ret=[];for(setid in disjointClusters){if(disjointClusters.hasOwnProperty(setid)){ret.push(disjointClusters[setid]);}}
return ret;}
function getBoundingBox(circles){var minMax=function(d){var hi=Math.max.apply(null,circles.map(function(c){return c[d]+c.radius;})),lo=Math.min.apply(null,circles.map(function(c){return c[d]-c.radius;}));return{max:hi,min:lo};};return{xRange:minMax('x'),yRange:minMax('y')};}
function normalizeSolution(solution,orientation,orientationOrder){if(orientation===null){orientation=Math.PI/2;}
var circles=[],i,setid;for(setid in solution){if(solution.hasOwnProperty(setid)){var previous=solution[setid];circles.push({x:previous.x,y:previous.y,radius:previous.radius,setid:setid});}}
var clusters=disjointCluster(circles);for(i=0;i<clusters.length;++i){orientateCircles(clusters[i],orientation,orientationOrder);var bounds=getBoundingBox(clusters[i]);clusters[i].size=(bounds.xRange.max-bounds.xRange.min)*(bounds.yRange.max-bounds.yRange.min);clusters[i].bounds=bounds;}
clusters.sort(function(a,b){return b.size-a.size;});circles=clusters[0];var returnBounds=circles.bounds;var spacing=(returnBounds.xRange.max-returnBounds.xRange.min)/50;function addCluster(cluster,right,bottom){if(!cluster)return;var bounds=cluster.bounds,xOffset,yOffset,centreing;if(right){xOffset=returnBounds.xRange.max-bounds.xRange.min+spacing;}else{xOffset=returnBounds.xRange.max-bounds.xRange.max;centreing=(bounds.xRange.max-bounds.xRange.min)/2-
(returnBounds.xRange.max-returnBounds.xRange.min)/2;if(centreing<0)xOffset+=centreing;}
if(bottom){yOffset=returnBounds.yRange.max-bounds.yRange.min+spacing;}else{yOffset=returnBounds.yRange.max-bounds.yRange.max;centreing=(bounds.yRange.max-bounds.yRange.min)/2-
(returnBounds.yRange.max-returnBounds.yRange.min)/2;if(centreing<0)yOffset+=centreing;}
for(var j=0;j<cluster.length;++j){cluster[j].x+=xOffset;cluster[j].y+=yOffset;circles.push(cluster[j]);}}
var index=1;while(index<clusters.length){addCluster(clusters[index],true,false);addCluster(clusters[index+1],false,true);addCluster(clusters[index+2],true,true);index+=3;returnBounds=getBoundingBox(circles);}
var ret={};for(i=0;i<circles.length;++i){ret[circles[i].setid]=circles[i];}
return ret;}
function scaleSolution(solution,width,height,padding){var circles=[],setids=[];for(var setid in solution){if(solution.hasOwnProperty(setid)){setids.push(setid);circles.push(solution[setid]);}}
width-=2*padding;height-=2*padding;var bounds=getBoundingBox(circles),xRange=bounds.xRange,yRange=bounds.yRange,xScaling=width/(xRange.max-xRange.min),yScaling=height/(yRange.max-yRange.min),scaling=Math.min(yScaling,xScaling),xOffset=(width-(xRange.max-xRange.min)*scaling)/2,yOffset=(height-(yRange.max-yRange.min)*scaling)/2;var scaled={};for(var i=0;i<circles.length;++i){var circle=circles[i];scaled[setids[i]]={radius:scaling*circle.radius,x:padding+xOffset+(circle.x-xRange.min)*scaling,y:padding+yOffset+(circle.y-yRange.min)*scaling,};}
return scaled;}
function VennDiagram(){var width=600,height=350,padding=15,duration=1000,orientation=Math.PI/2,normalize=true,wrap=true,styled=true,fontSize=null,orientationOrder=null,colours=d3.scale.category10(),layoutFunction=venn;function chart(selection){var data=selection.datum();var solution=layoutFunction(data);if(normalize){solution=normalizeSolution(solution,orientation,orientationOrder);}
var circles=scaleSolution(solution,width,height,padding);var textCentres=computeTextCentres(circles,data);var svg=selection.selectAll("svg").data([circles]);svg.enter().append("svg");svg.attr("width",width).attr("height",height);var previous={},hasPrevious=false;svg.selectAll("g").each(function(d){var path=d3.select(this).select("path").attr("d");if((d.sets.length==1)&&path){hasPrevious=true;previous[d.sets[0]]=circleFromPath(path);}});var pathTween=function(d){return function(t){var c=d.sets.map(function(set){var start=previous[set],end=circles[set];if(!start){start={x:width/2,y:height/2,radius:1};}
if(!end){end={x:width/2,y:height/2,radius:1};}
return{'x':start.x*(1-t)+end.x*t,'y':start.y*(1-t)+end.y*t,'radius':start.radius*(1-t)+end.radius*t};});return intersectionAreaPath(c);};};var nodes=svg.selectAll("g").data(data,function(d){return d.sets;});var enter=nodes.enter().append('g').attr("class",function(d){return "venn-area venn-"+
(d.sets.length==1?"circle":"intersection");}).attr("data-venn-sets",function(d){return d.sets.join("_");});var enterPath=enter.append("path"),enterText=enter.append("text").attr("class","label").text(function(d){return label(d);}).attr("text-anchor","middle").attr("dy",".35em").attr("x",width/2).attr("y",height/2);if(styled){enterPath.style("fill-opacity","0").filter(function(d){return d.sets.length==1;}).style("fill",function(d){return colours(label(d));}).style("fill-opacity",".25");enterText.style("fill",function(d){return d.sets.length==1?colours(label(d)):"#444";});}
var update=nodes.transition("venn").duration(hasPrevious?duration:0);update.select("path").attrTween("d",pathTween);var updateText=update.select("text").text(function(d){return label(d);}).attr("x",function(d){return Math.floor(textCentres[d.sets].x);}).attr("y",function(d){return Math.floor(textCentres[d.sets].y);});if(wrap){updateText.each("end",wrapText(circles,label));}
var exit=nodes.exit().transition('venn').duration(duration).remove();exit.select("path").attrTween("d",pathTween);var exitText=exit.select("text").text(function(d){return label(d);}).attr("x",width/2).attr("y",height/2);if(fontSize!==null){enterText.style("font-size","0px");updateText.style("font-size",fontSize);exitText.style("font-size","0px");}
return{'circles':circles,'textCentres':textCentres,'nodes':nodes,'enter':enter,'update':update,'exit':exit};}
function label(d){if(d.label){return d.label;}
if(d.sets.length==1){return ''+d.sets[0];}}
chart.wrap=function(_){if(!arguments.length)return wrap;wrap=_;return chart;};chart.width=function(_){if(!arguments.length)return width;width=_;return chart;};chart.height=function(_){if(!arguments.length)return height;height=_;return chart;};chart.padding=function(_){if(!arguments.length)return padding;padding=_;return chart;};chart.colours=function(_){if(!arguments.length)return colours;colours=_;return chart;};chart.fontSize=function(_){if(!arguments.length)return fontSize;fontSize=_;return chart;};chart.duration=function(_){if(!arguments.length)return duration;duration=_;return chart;};chart.layoutFunction=function(_){if(!arguments.length)return layoutFunction;layoutFunction=_;return chart;};chart.normalize=function(_){if(!arguments.length)return normalize;normalize=_;return chart;};chart.styled=function(_){if(!arguments.length)return styled;styled=_;return chart;};chart.orientation=function(_){if(!arguments.length)return orientation;orientation=_;return chart;};chart.orientationOrder=function(_){if(!arguments.length)return orientationOrder;orientationOrder=_;return chart;};return chart;}
function wrapText(circles,labeller){return function(){var text=d3.select(this),data=text.datum(),width=circles[data.sets[0]].radius||50,label=labeller(data)||'';var words=label.split(/\s+/).reverse(),maxLines=3,minChars=(label.length+words.length)/maxLines,word=words.pop(),line=[word],joined,lineNumber=0,lineHeight=1.1,tspan=text.text(null).append("tspan").text(word);while(true){word=words.pop();if(!word)break;line.push(word);joined=line.join(" ");tspan.text(joined);if(joined.length>minChars&&tspan.node().getComputedTextLength()>width){line.pop();tspan.text(line.join(" "));line=[word];tspan=text.append("tspan").text(word);lineNumber++;}}
var initial=0.35-lineNumber*lineHeight/2,x=text.attr("x"),y=text.attr("y");text.selectAll("tspan").attr("x",x).attr("y",y).attr("dy",function(d,i){return(initial+i*lineHeight)+"em";});};}
function circleMargin(current,interior,exterior){var margin=interior[0].radius-distance(interior[0],current),i,m;for(i=1;i<interior.length;++i){m=interior[i].radius-distance(interior[i],current);if(m<=margin){margin=m;}}
for(i=0;i<exterior.length;++i){m=distance(exterior[i],current)-exterior[i].radius;if(m<=margin){margin=m;}}
return margin;}
function computeTextCentre(interior,exterior){var points=[],i;for(i=0;i<interior.length;++i){var c=interior[i];points.push({x:c.x,y:c.y});points.push({x:c.x+c.radius/2,y:c.y});points.push({x:c.x-c.radius/2,y:c.y});points.push({x:c.x,y:c.y+c.radius/2});points.push({x:c.x,y:c.y-c.radius/2});}
var initial=points[0],margin=circleMargin(points[0],interior,exterior);for(i=1;i<points.length;++i){var m=circleMargin(points[i],interior,exterior);if(m>=margin){initial=points[i];margin=m;}}
var solution=fmin(function(p){return-1*circleMargin({x:p[0],y:p[1]},interior,exterior);},[initial.x,initial.y],{maxIterations:500,minErrorDelta:1e-10}).solution;var ret={x:solution[0],y:solution[1]};var valid=true;for(i=0;i<interior.length;++i){if(distance(ret,interior[i])>interior[i].radius){valid=false;break;}}
for(i=0;i<exterior.length;++i){if(distance(ret,exterior[i])<exterior[i].radius){valid=false;break;}}
if(!valid){if(interior.length==1){ret={x:interior[0].x,y:interior[0].y};}else{var areaStats={};intersectionArea(interior,areaStats);if(areaStats.arcs.length===0){ret={'x':0,'y':-1000,disjoint:true};}else if(areaStats.arcs.length==1){ret={'x':areaStats.arcs[0].circle.x,'y':areaStats.arcs[0].circle.y};}else if(exterior.length){ret=computeTextCentre(interior,[]);}else{ret=getCenter(areaStats.arcs.map(function(a){return a.p1;}));}}}
return ret;}
function getOverlappingCircles(circles){var ret={},circleids=[];for(var circleid in circles){circleids.push(circleid);ret[circleid]=[];}
for(var i=0;i<circleids.length;i++){var a=circles[circleids[i]];for(var j=i+1;j<circleids.length;++j){var b=circles[circleids[j]],d=distance(a,b);if(d+b.radius<=a.radius+1e-10){ret[circleids[j]].push(circleids[i]);}else if(d+a.radius<=b.radius+1e-10){ret[circleids[i]].push(circleids[j]);}}}
return ret;}
function computeTextCentres(circles,areas){var ret={},overlapped=getOverlappingCircles(circles);for(var i=0;i<areas.length;++i){var area=areas[i].sets,areaids={},exclude={};for(var j=0;j<area.length;++j){areaids[area[j]]=true;var overlaps=overlapped[area[j]];for(var k=0;k<overlaps.length;++k){exclude[overlaps[k]]=true;}}
var interior=[],exterior=[];for(var setid in circles){if(setid in areaids){interior.push(circles[setid]);}else if(!(setid in exclude)){exterior.push(circles[setid]);}}
var centre=computeTextCentre(interior,exterior);ret[area]=centre;if(centre.disjoint&&(areas[i].size>0)){console.log("WARNING: area "+area+" not represented on screen");}}
return ret;}
function sortAreas(div,relativeTo){var overlaps=getOverlappingCircles(div.selectAll("svg").datum());var exclude={};for(var i=0;i<relativeTo.sets.length;++i){var check=relativeTo.sets[i];for(var setid in overlaps){var overlap=overlaps[setid];for(var j=0;j<overlap.length;++j){if(overlap[j]==check){exclude[setid]=true;break;}}}}
function shouldExclude(sets){for(var i=0;i<sets.length;++i){if(!(sets[i]in exclude)){return false;}}
return true;}
div.selectAll("g").sort(function(a,b){if(a.sets.length!=b.sets.length){return a.sets.length-b.sets.length;}
if(a==relativeTo){return shouldExclude(b.sets)?-1:1;}
if(b==relativeTo){return shouldExclude(a.sets)?1:-1;}
return b.size-a.size;});}
function circlePath(x,y,r){var ret=[];ret.push("\nM",x,y);ret.push("\nm",-r,0);ret.push("\na",r,r,0,1,0,r*2,0);ret.push("\na",r,r,0,1,0,-r*2,0);return ret.join(" ");}
function circleFromPath(path){var tokens=path.split(' ');return{'x':parseFloat(tokens[1]),'y':parseFloat(tokens[2]),'radius':-parseFloat(tokens[4])};}
function intersectionAreaPath(circles){var stats={};intersectionArea(circles,stats);var arcs=stats.arcs;if(arcs.length===0){return "M 0 0";}else if(arcs.length==1){var circle=arcs[0].circle;return circlePath(circle.x,circle.y,circle.radius);}else{var ret=["\nM",arcs[0].p2.x,arcs[0].p2.y];for(var i=0;i<arcs.length;++i){var arc=arcs[i],r=arc.circle.radius,wide=arc.width>r;ret.push("\nA",r,r,0,wide?1:0,1,arc.p1.x,arc.p1.y);}
return ret.join(" ");}}
var version="0.2.10";exports.version=version;exports.fmin=fmin;exports.minimizeConjugateGradient=minimizeConjugateGradient;exports.bisect=bisect;exports.intersectionArea=intersectionArea;exports.circleCircleIntersection=circleCircleIntersection;exports.circleOverlap=circleOverlap;exports.circleArea=circleArea;exports.distance=distance;exports.circleIntegral=circleIntegral;exports.venn=venn;exports.greedyLayout=greedyLayout;exports.scaleSolution=scaleSolution;exports.normalizeSolution=normalizeSolution;exports.bestInitialLayout=bestInitialLayout;exports.lossFunction=lossFunction;exports.disjointCluster=disjointCluster;exports.distanceFromIntersectArea=distanceFromIntersectArea;exports.VennDiagram=VennDiagram;exports.wrapText=wrapText;exports.computeTextCentres=computeTextCentres;exports.computeTextCentre=computeTextCentre;exports.sortAreas=sortAreas;exports.circlePath=circlePath;exports.circleFromPath=circleFromPath;exports.intersectionAreaPath=intersectionAreaPath;}));