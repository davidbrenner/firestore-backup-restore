"use strict";var __createBinding=(this&&this.__createBinding)||(Object.create?(function(o,m,k,k2){if(k2===undefined)k2=k;Object.defineProperty(o,k2,{enumerable:true,get:function(){return m[k];}});}):(function(o,m,k,k2){if(k2===undefined)k2=k;o[k2]=m[k];}));var __setModuleDefault=(this&&this.__setModuleDefault)||(Object.create?(function(o,v){Object.defineProperty(o,"default",{enumerable:true,value:v});}):function(o,v){o["default"]=v;});var __importStar=(this&&this.__importStar)||function(mod){if(mod&&mod.__esModule)return mod;var result={};if(mod!=null)for(var k in mod)if(k!=="default"&&Object.prototype.hasOwnProperty.call(mod,k))__createBinding(result,mod,k);__setModuleDefault(result,mod);return result;};var __awaiter=(this&&this.__awaiter)||function(thisArg,_arguments,P,generator){function adopt(value){return value instanceof P?value:new P(function(resolve){resolve(value);});}
return new(P||(P=Promise))(function(resolve,reject){function fulfilled(value){try{step(generator.next(value));}catch(e){reject(e);}}
function rejected(value){try{step(generator["throw"](value));}catch(e){reject(e);}}
function step(result){result.done?resolve(result.value):adopt(result.value).then(fulfilled,rejected);}
step((generator=generator.apply(thisArg,_arguments||[])).next());});};var __generator=(this&&this.__generator)||function(thisArg,body){var _={label:0,sent:function(){if(t[0]&1)throw t[1];return t[1];},trys:[],ops:[]},f,y,t,g;return g={next:verb(0),"throw":verb(1),"return":verb(2)},typeof Symbol==="function"&&(g[Symbol.iterator]=function(){return this;}),g;function verb(n){return function(v){return step([n,v]);};}
function step(op){if(f)throw new TypeError("Generator is already executing.");while(_)try{if(f=1,y&&(t=op[0]&2?y["return"]:op[0]?y["throw"]||((t=y["return"])&&t.call(y),0):y.next)&&!(t=t.call(y,op[1])).done)return t;if(y=0,t)op=[op[0]&2,t.value];switch(op[0]){case 0:case 1:t=op;break;case 4:_.label++;return{value:op[1],done:false};case 5:_.label++;y=op[1];op=[0];continue;case 7:op=_.ops.pop();_.trys.pop();continue;default:if(!(t=_.trys,t=t.length>0&&t[t.length-1])&&(op[0]===6||op[0]===2)){_=0;continue;}
if(op[0]===3&&(!t||(op[1]>t[0]&&op[1]<t[3]))){_.label=op[1];break;}
if(op[0]===6&&_.label<t[1]){_.label=t[1];t=op;break;}
if(t&&_.label<t[2]){_.label=t[2];_.ops.push(op);break;}
if(t[2])_.ops.pop();_.trys.pop();continue;}
op=body.call(thisArg,_);}catch(e){op=[6,e];y=0;}finally{f=t=0;}
if(op[0]&5)throw op[1];return{value:op[0]?op[1]:void 0,done:true};}};Object.defineProperty(exports,"__esModule",{value:true});exports.restore=void 0;var fs=__importStar(require("fs"));var uuid_1=require("uuid");var admin=__importStar(require("firebase-admin"));var helper_1=require("./helper");var restore=function(fileName,options){var db=admin.firestore();return new Promise(function(resolve,reject){if(typeof fileName==='object'){var dataObj=fileName;updateCollection(db,dataObj,options).then(function(){resolve({status:true,message:'Collection successfully imported!',});}).catch(function(error){reject({status:false,message:error.message});});}
else{fs.readFile(fileName,'utf8',function(err,data){if(err){console.log(err);reject({status:false,message:err.message});}
var dataObj=JSON.parse(data);updateCollection(db,dataObj,options).then(function(){resolve({status:true,message:'Collection successfully imported!',});}).catch(function(error){reject({status:false,message:error.message});});});}}).catch(function(error){return console.error(error);});};exports.restore=restore;var updateCollection=function(db,dataObj,options){if(options===void 0){options={};}
return __awaiter(void 0,void 0,void 0,function(){var _a,_b,_i,index,collectionName,_c,_d,_e,doc,docId,subCollections,subCollections,_f,_g,_h,subIndex,revivedSubCollection,subCollectionPath;return __generator(this,function(_j){switch(_j.label){case 0:_a=[];for(_b in dataObj)
_a.push(_b);_i=0;_j.label=1;case 1:if(!(_i<_a.length))return[3,13];index=_a[_i];collectionName=index;_c=[];for(_d in dataObj[index])
_c.push(_d);_e=0;_j.label=2;case 2:if(!(_e<_c.length))return[3,12];doc=_c[_e];if(!dataObj[index].hasOwnProperty(doc))return[3,11];docId=Array.isArray(dataObj[index])?uuid_1.v1():doc;if(!!Array.isArray(dataObj[index]))return[3,6];subCollections=dataObj[index][docId]['subCollection'];delete dataObj[index][doc]['subCollection'];return[4,startUpdating(db,collectionName,docId,dataObj[index][doc],options)];case 3:_j.sent();if(!subCollections)return[3,5];return[4,updateCollection(db,subCollections,options)];case 4:_j.sent();_j.label=5;case 5:return[3,11];case 6:subCollections=dataObj[index][doc]['subCollection'];delete dataObj[index][doc]['subCollection'];return[4,startUpdating(db,collectionName,docId,dataObj[index][doc],options)];case 7:_j.sent();if(!subCollections)return[3,11];_f=[];for(_g in subCollections)
_f.push(_g);_h=0;_j.label=8;case 8:if(!(_h<_f.length))return[3,11];subIndex=_f[_h];revivedSubCollection={};subCollectionPath=collectionName+"/"+docId+"/"+subIndex;revivedSubCollection[subCollectionPath]=subCollections[subIndex];return[4,updateCollection(db,revivedSubCollection,options)];case 9:_j.sent();_j.label=10;case 10:_h++;return[3,8];case 11:_e++;return[3,2];case 12:_i++;return[3,1];case 13:return[2];}});});};var startUpdating=function(db,collectionName,docId,data,options){if(options.dates&&options.dates.length>0){options.dates.forEach(function(date){if(data.hasOwnProperty(date)){if(Array.isArray(data[date])){data[date]=data[date].map(function(d){return helper_1.makeTime(d);});}
else{data[date]=helper_1.makeTime(data[date]);}}
if(date.indexOf('.')>-1){helper_1.traverseObjects(data,function(value){if(!value.hasOwnProperty('_seconds')){return null;}
return helper_1.makeTime(value);});}});}
if(options.autoParseDates){helper_1.parseAndConvertDates(data);}
if(options.refs&&options.refs.length>0){options.refs.forEach(function(ref){if(data.hasOwnProperty(ref)){if(Array.isArray(data[ref])){data[ref]=data[ref].map(function(ref){return db.doc(ref);});}
else{data[ref]=db.doc(data[ref]);}}});}
if(options.geos&&options.geos.length>0){options.geos.forEach(function(geo){if(data.hasOwnProperty(geo)){if(Array.isArray(data[geo])){data[geo]=data[geo].map(function(geoValues){return helper_1.makeGeoPoint(geoValues);});}
else{data[geo]=helper_1.makeGeoPoint(data[geo]);}}
if(geo.indexOf('.')>-1){helper_1.traverseObjects(data,function(value){if(!value.hasOwnProperty('_latitude')){return null;}
return helper_1.makeGeoPoint(value);});}});}
if(options.autoParseGeos){helper_1.parseAndConvertGeos(data);}
return new Promise(function(resolve,reject){db.collection(collectionName).doc(docId).set(data).then(function(){(options===null||options===void 0?void 0:options.showLogs)&&console.log(docId+" was successfully added to firestore!");resolve({status:true,message:docId+" was successfully added to firestore!",});}).catch(function(error){console.log(error);reject({status:false,message:error.message,});});});};