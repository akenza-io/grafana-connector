/*! For license information please see module.js.LICENSE.txt */
define(["react","@grafana/data","@grafana/ui"],(function(e,t,n){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var a=t[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(r,a,function(t){return e[t]}.bind(null,a));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/",n(n.s=4)}([function(t,n){t.exports=e},function(e,n){e.exports=t},function(e,t){e.exports=n},function(e,t,n){(function(){"use strict";var n=this,r=n.buildUrl,a=function(e,t){var n,r,a,o=[];if(a=!(!t||!t.lowerCase)&&!!t.lowerCase,null===e?r="":"object"==typeof e?(r="",t=e):r=e,t){if(t.path){r&&"/"===r[r.length-1]&&(r=r.slice(0,-1));var s=String(t.path).trim();a&&(s=s.toLowerCase()),0===s.indexOf("/")?r+=s:r+="/"+s}if(t.queryParams){for(n in t.queryParams){var i;if(t.queryParams.hasOwnProperty(n)&&void 0!==t.queryParams[n])if(t.disableCSV&&Array.isArray(t.queryParams[n])&&t.queryParams[n].length)for(var u=0;u<t.queryParams[n].length;u++)i=encodeURIComponent(String(t.queryParams[n][u]).trim()),o.push(n+"="+i);else i=a?encodeURIComponent(String(t.queryParams[n]).trim().toLowerCase()):encodeURIComponent(String(t.queryParams[n]).trim()),o.push(n+"="+i)}r+="?"+o.join("&")}t.hash&&(r+=a?"#"+String(t.hash).trim().toLowerCase():"#"+String(t.hash).trim())}return r};a.noConflict=function(){return n.buildUrl=r,a},e.exports&&(t=e.exports=a),t.buildUrl=a}).call(this)},function(e,t,n){"use strict";n.r(t);var r=n(1),a=function(e,t){return(a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(e,t)};function o(e,t){function n(){this.constructor=e}a(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}var s=function(){return(s=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var a in t=arguments[n])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e}).apply(this,arguments)};function i(e,t,n,r){return new(n||(n=Promise))((function(a,o){function s(e){try{u(r.next(e))}catch(e){o(e)}}function i(e){try{u(r.throw(e))}catch(e){o(e)}}function u(e){var t;e.done?a(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(s,i)}u((r=r.apply(e,t||[])).next())}))}function u(e,t){var n,r,a,o,s={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return o={next:i(0),throw:i(1),return:i(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function i(o){return function(i){return function(o){if(n)throw new TypeError("Generator is already executing.");for(;s;)try{if(n=1,r&&(a=2&o[0]?r.return:o[0]?r.throw||((a=r.return)&&a.call(r),0):r.next)&&!(a=a.call(r,o[1])).done)return a;switch(r=0,a&&(o=[2&o[0],a.value]),o[0]){case 0:case 1:a=o;break;case 4:return s.label++,{value:o[1],done:!1};case 5:s.label++,r=o[1],o=[0];continue;case 7:o=s.ops.pop(),s.trys.pop();continue;default:if(!(a=s.trys,(a=a.length>0&&a[a.length-1])||6!==o[0]&&2!==o[0])){s=0;continue}if(3===o[0]&&(!a||o[1]>a[0]&&o[1]<a[3])){s.label=o[1];break}if(6===o[0]&&s.label<a[1]){s.label=a[1],a=o;break}if(a&&s.label<a[2]){s.label=a[2],s.ops.push(o);break}a[2]&&s.ops.pop(),s.trys.pop();continue}o=t.call(e,s)}catch(e){o=[6,e],r=0}finally{n=a=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,i])}}}function l(e){var t="function"==typeof Symbol&&Symbol.iterator,n=t&&e[t],r=0;if(n)return n.call(e);if(e&&"number"==typeof e.length)return{next:function(){return e&&r>=e.length&&(e=void 0),{value:e&&e[r++],done:!e}}};throw new TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")}var c=n(3),p=n.n(c),d=function(e){function t(t,n){var r=e.call(this,t)||this;return r.backendSrv=n,r.baseUrl=t.jsonData.baseUrl,r.apiKey=t.jsonData.apiKey,r}return o(t,e),t.prototype.testDatasource=function(){return i(this,void 0,void 0,(function(){var e=this;return u(this,(function(t){return[2,this.doRequest("/v1/environments","GET").then((function(){return{status:"success",message:"Success"}}),(function(t){return{status:"error",message:e.generateErrorMessage(t)}}))]}))}))},t.prototype.query=function(e){var t;return i(this,void 0,Promise,(function(){var n,a,o,s,i,c,p,d,f,h,y,v,g,m,b,S,K;return u(this,(function(u){switch(u.label){case 0:n=e.range.from,a=e.range.to,o=[],u.label=1;case 1:u.trys.push([1,6,7,8]),s=l(e.targets),i=s.next(),u.label=2;case 2:return i.done?[3,5]:(c=i.value).assetId&&c.topic&&c.dataKey&&!c.hide?[4,this.getTimeSeriesData(c,n.toISOString(),a.toISOString())]:[3,4];case 3:p=u.sent(),d=[],f=[];try{for(S=void 0,h=l(p.dataPoints),y=h.next();!y.done;y=h.next())v=y.value,d.push(v[0]),f.push(Object(r.dateTime)(v[1]).valueOf())}catch(e){S={error:e}}finally{try{y&&!y.done&&(K=h.return)&&K.call(h)}finally{if(S)throw S.error}}o.push(new r.MutableDataFrame({refId:c.refId,fields:[{name:"Time",values:f,type:r.FieldType.time},{name:(null===(t=c.asset)||void 0===t?void 0:t.name)+" - "+c.dataKey,values:d,type:r.FieldType.number}]})),u.label=4;case 4:return i=s.next(),[3,2];case 5:return[3,8];case 6:return g=u.sent(),m={error:g},[3,8];case 7:try{i&&!i.done&&(b=s.return)&&b.call(s)}finally{if(m)throw m.error}return[7];case 8:return[2,{data:o}]}}))}))},t.prototype.getTimeSeriesData=function(e,t,n){return i(this,void 0,Promise,(function(){var r,a=this;return u(this,(function(o){return r={dataKey:e.dataKey,topic:e.topic,timestamp:{gte:t,lte:n}},[2,this.doRequest("/v3/assets/"+e.assetId+"/query/time-series","POST",null,r).then((function(e){return e.data}),(function(e){throw a.generateErrorMessage(e)}))]}))}))},t.prototype.getAssets=function(){return i(this,void 0,Promise,(function(){var e,t=this;return u(this,(function(n){return e={unpaged:!0,fields:'{"id": true, "name": true}'},[2,this.getEnvironment().then((function(n){return t.doRequest("/v2/environments/"+n.id+"/devices","GET",e).then((function(e){return e.data.data}),(function(e){throw t.generateErrorMessage(e)}))}),(function(e){throw t.generateErrorMessage(e)}))]}))}))},t.prototype.getTopics=function(e){return i(this,void 0,Promise,(function(){var t=this;return u(this,(function(n){return[2,this.doRequest("/v3/assets/"+e+"/query/topics","GET").then((function(e){return e.data}),(function(e){throw t.generateErrorMessage(e)}))]}))}))},t.prototype.getKeys=function(e,t){return i(this,void 0,Promise,(function(){var n,r=this;return u(this,(function(a){return n={topic:t,limit:1,skip:0},[2,this.doRequest("/v3/assets/"+e+"/query","POST",null,n).then((function(e){var t=[];return Object.keys(e.data[0].data).forEach((function(e){return t.push(e)})),t}),(function(e){throw r.generateErrorMessage(e)}))]}))}))},t.prototype.getEnvironment=function(){return i(this,void 0,Promise,(function(){var e=this;return u(this,(function(t){return[2,this.doRequest("/v1/environments","GET").then((function(e){return e.data.data[0]}),(function(t){throw e.generateErrorMessage(t)}))]}))}))},t.prototype.doRequest=function(e,t,n,r){var a={url:p()(this.baseUrl,{path:e}),method:t,params:n,data:r,headers:{"Api-Key":this.apiKey}};return this.backendSrv.datasourceRequest(a)},t.prototype.generateErrorMessage=function(e){var t;return 401===e.status?"401 Unauthorized - API Key provided is not valid":e.statusText&&(null===(t=e.data)||void 0===t?void 0:t.message)?e.status+" "+e.statusText+": "+e.data.message:"An unknown error occurred, please contact Akenza Support: support@akenza.com"},t}(r.DataSourceApi),f=n(0),h=n.n(f),y=n(2),v=y.LegacyForms.FormField,g=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.onBaseUrlChange=function(e){var n=t.props,r=n.onOptionsChange,a=n.options,o=s(s({},a.jsonData),{baseUrl:e.target.value});r(s(s({},a),{jsonData:o}))},t.onAPIKeyChange=function(e){var n=t.props,r=n.onOptionsChange,a=n.options,o=s(s({},a.jsonData),{apiKey:e.target.value});r(s(s({},a),{jsonData:o}))},t}return o(t,e),t.prototype.render=function(){var e=this.props.options.jsonData;return h.a.createElement("div",{className:"gf-form-group"},h.a.createElement("div",{className:"gf-form"},h.a.createElement(v,{label:"Base URL",labelWidth:10,inputWidth:27,onChange:this.onBaseUrlChange,value:e.baseUrl||"",placeholder:"e.g. https://api.core.akenza.io"})),h.a.createElement("div",{className:"gf-form"},h.a.createElement(v,{value:e.apiKey||"",label:"API Key",placeholder:"API Key",labelWidth:10,inputWidth:27,onChange:this.onAPIKeyChange})))},t}(f.PureComponent),m=function(e){function t(t){var n=e.call(this,t)||this;return n.loadingAssets=!1,n.loadingTopics=!1,n.loadingDataKeys=!1,n.initialLoadingComplete=!1,n.onAssetSelectionChange=function(e){var t=n.props,r=t.onChange,a=t.query,o=t.onRunQuery;r(s(s({},a),{assetId:e.value,asset:e.asset})),n.setState((function(t){return s(s({},t),{assetValue:e})})),e.value&&n.loadTopics(e.value),o()},n.onTopicSelectionChange=function(e){var t=n.props,r=t.onChange,a=t.query,o=t.onRunQuery;r(s(s({},a),{topic:e.value})),n.setState((function(t){return s(s({},t),{topicValue:e})})),e.value&&a.assetId&&n.loadKeys(a.assetId,e.value),o()},n.onKeySelectionChange=function(e){var t=n.props,r=t.onChange,a=t.query,o=t.onRunQuery;r(s(s({},a),{dataKey:e.value})),n.setState((function(t){return s(s({},t),{dataKeyValue:e})})),o()},n.initializeViewProperties(),n.dataSourceId=n.props.datasource.id,n}return o(t,e),t.prototype.initializeViewProperties=function(){var e,t=this.props.query,n={label:(null===(e=t.asset)||void 0===e?void 0:e.name)||void 0,value:t.assetId||null,asset:t.asset},r={label:t.topic,value:t.topic||null},a={label:t.dataKey,value:t.dataKey||null};this.state={assetValue:n,assetOptions:[n],topicValue:r,topicOptions:[r],dataKeyValue:a,dataKeyOptions:[a]},this.loadAssets(),t.assetId&&t.topic&&(this.loadTopics(t.assetId),this.loadKeys(t.assetId,t.topic))},t.prototype.loadAssets=function(){var e=this;this.loadingAssets||this.dataSourceId===this.props.datasource.id||(this.loadingAssets=!0,this.dataSourceId!==this.props.datasource.id&&this.initialLoadingComplete&&(this.resetAllValues(),this.dataSourceId=this.props.datasource.id),this.props.datasource.getAssets().then((function(t){var n,r,a=[];try{for(var o=l(t),i=o.next();!i.done;i=o.next()){var u=i.value;a.push({label:u.name,value:u.id,asset:u})}}catch(e){n={error:e}}finally{try{i&&!i.done&&(r=o.return)&&r.call(o)}finally{if(n)throw n.error}}e.setState((function(e){return s(s({},e),{assetOptions:a})})),e.loadingAssets=!1,e.initialLoadingComplete=!0,e.forceUpdate()}),(function(){e.loadingAssets=!1})))},t.prototype.loadTopics=function(e){var t=this;this.loadingTopics=!0,this.props.datasource.getTopics(e).then((function(e){var n,r,a=[];try{for(var o=l(e),i=o.next();!i.done;i=o.next()){var u=i.value;a.push({label:u,value:u})}}catch(e){n={error:e}}finally{try{i&&!i.done&&(r=o.return)&&r.call(o)}finally{if(n)throw n.error}}t.loadingTopics=!1,t.setState((function(e){return s(s({},e),{topicOptions:a})})),0===a.length&&t.resetTopicAndDataKeyValues()}),(function(){t.loadingTopics=!1}))},t.prototype.loadKeys=function(e,t){var n=this;this.loadingDataKeys=!0,this.props.datasource.getKeys(e,t).then((function(e){var t,r,a=[];try{for(var o=l(e),i=o.next();!i.done;i=o.next()){var u=i.value;a.push({label:u,value:u})}}catch(e){t={error:e}}finally{try{i&&!i.done&&(r=o.return)&&r.call(o)}finally{if(t)throw t.error}}n.loadingDataKeys=!1,n.setState((function(e){return s(s({},e),{dataKeyOptions:a})}))}),(function(){n.loadingDataKeys=!1}))},t.prototype.render=function(){var e=this.state,t=e.assetOptions,n=e.assetValue,r=e.dataKeyOptions,a=e.dataKeyValue,o=e.topicOptions,s=e.topicValue;return this.loadAssets(),h.a.createElement("div",{className:"gf-form"},h.a.createElement(y.Select,{autoFocus:!0,isLoading:this.loadingAssets,prefix:"Asset:",placeholder:"Select an asset",noOptionsMessage:"No assets available",options:t,value:n,backspaceRemovesValue:!0,onChange:this.onAssetSelectionChange}),h.a.createElement(y.Select,{disabled:!this.props.query.assetId,isLoading:this.loadingTopics,prefix:"Topic:",placeholder:"Select a topic",noOptionsMessage:"No topics available",options:o,value:s,backspaceRemovesValue:!0,onChange:this.onTopicSelectionChange}),h.a.createElement(y.Select,{disabled:!this.props.query.topic,isLoading:this.loadingDataKeys,prefix:"Data Key:",placeholder:"Select a data key",noOptionsMessage:"No data keys available",options:r,value:a,backspaceRemovesValue:!0,onChange:this.onKeySelectionChange}))},t.prototype.resetAllValues=function(){var e=this.props,t=e.onChange,n=e.query;t(s(s({},n),{assetId:"",asset:void 0,topic:"",dataKey:""})),this.setState({assetValue:{},assetOptions:[],topicValue:{},topicOptions:[],dataKeyValue:{},dataKeyOptions:[]})},t.prototype.resetTopicAndDataKeyValues=function(){var e=this.props,t=e.onChange,n=e.query;t(s(s({},n),{topic:"",dataKey:""})),this.setState((function(e){return s(s({},e),{topicValue:{},dataKeyValue:{},dataKeyOptions:[]})}))},t}(f.PureComponent);n.d(t,"plugin",(function(){return b}));var b=new r.DataSourcePlugin(d).setConfigEditor(g).setQueryEditor(m)}])}));
//# sourceMappingURL=module.js.map