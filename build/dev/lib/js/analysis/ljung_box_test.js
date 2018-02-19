"use strict";define(["../util/utils","ng!$q"],function(e,t){return{createCube:function(t,s){var r=s.layout,a=e.validateDimension(r.props.dimensions[0]),i=[{qNullSuppression:!0,qDef:{qFieldDefs:[a],qSortCriterias:[{qSortByNumeric:1}]}}],n=e.validateMeasure(r.props.measures[0]),o="";r.props.lag===!1&&(o=", lag="+r.props.lagValue+" "),e.displayDebugModeMessage(r.props.debugMode);var l=e.getDebugSaveDatasetScript(r.props.debugMode,"debug_ljung_box_test.rda"),p="N",d=null;s.dataTitle=null,1===r.props.differencing?(d="R.ScriptEvalExStr('"+p+"','"+l+" library(jsonlite); res<-Box.test(diff(q$Measure, "+r.props.seasonalDifferences+'), type="Ljung-Box" '+o+"); json<-toJSON(list(res$statistic,res$parameter,res$p.value)); json;', "+n+" as Measure)",s.dataTitle="diff("+n+","+r.props.seasonalDifferences+")"):2===r.props.differencing?(d="R.ScriptEvalExStr('"+p+"','"+l+" library(jsonlite); res<-Box.test(diff(diff(q$Measure, "+r.props.seasonalDifferences+"), "+r.props.firstDifferences+'), type="Ljung-Box" '+o+"); json<-toJSON(list(res$statistic,res$parameter,res$p.value)); json;', "+n+" as Measure)",s.dataTitle="diff(diff("+n+", "+r.props.seasonalDifferences+"),"+r.props.firstDifferences+")"):(d="R.ScriptEvalExStr('"+p+"','"+l+' library(jsonlite); res<-Box.test(q$Measure, type="Ljung-Box" '+o+"); json<-toJSON(list(res$statistic,res$parameter,res$p.value)); json;', "+n+" as Measure)",s.dataTitle=n),e.displayRScriptsToConsole(r.props.debugMode,[d]);var u=[{qDef:{qLabel:"Results",qDef:d}},{qDef:{qLabel:"-",qDef:""}},{qDef:{qLabel:"-",qDef:""}},{qDef:{qLabel:"-",qDef:""}},{qDef:{qLabel:"-",qDef:""}}];return s.backendApi.applyPatches([{qPath:"/qHyperCubeDef/qDimensions",qOp:"replace",qValue:JSON.stringify(i)},{qPath:"/qHyperCubeDef/qMeasures",qOp:"replace",qValue:JSON.stringify(u)}],!1),s.patchApplied=!0,null},drawChart:function(s){var r=t.defer(),a=s.layout,i=(e.validateDimension(a.props.dimensions[0]),[{qTop:0,qLeft:0,qWidth:6,qHeight:1}]);return s.backendApi.getData(i).then(function(t){s.layout.qHyperCube.qMeasureInfo;if(0===t[0].qMatrix[0][1].qText.length||"-"==t[0].qMatrix[0][1].qText)e.displayConnectionError(s.extId);else{e.displayReturnedDatasetToConsole(a.props.debugMode,t[0]);var i=JSON.parse(t[0].qMatrix[0][1].qText);$(".advanced-analytics-toolsets-"+s.extId).html('\n            <h2>Box-Ljung Test</h2>\n            <table class="simple">\n              <thead>\n                <tr>\n                  <th>Item</th><th>Value</th>\n                </tr>\n              </thead>\n              <tbody>\n                <tr><td>data</td><td>'+s.dataTitle+"</td></tr>\n                <tr><td>X-squared</td><td>"+i[0]+"</td></tr>\n                <tr><td>df</td><td>"+i[1]+"</td></tr>\n                <tr><td>p-value</td><td>"+i[2]+"</td></tr>\n              </tbody>\n            </table>\n          ")}return r.resolve()}),r.promise}}});
//# sourceMappingURL=../../maps/analysis/ljung_box_test.js.map
