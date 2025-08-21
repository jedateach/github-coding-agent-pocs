/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/accounts/route";
exports.ids = ["app/api/accounts/route"];
exports.modules = {

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "(rsc)/../../node_modules/.pnpm/next@15.0.3_@playwright+test@1.55.0_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Faccounts%2Froute&page=%2Fapi%2Faccounts%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Faccounts%2Froute.ts&appDir=%2Fhome%2Frunner%2Fwork%2Fdata-fetching-monorepo-poc%2Fdata-fetching-monorepo-poc%2Fsites%2Fdemo-app%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Frunner%2Fwork%2Fdata-fetching-monorepo-poc%2Fdata-fetching-monorepo-poc%2Fsites%2Fdemo-app&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../node_modules/.pnpm/next@15.0.3_@playwright+test@1.55.0_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Faccounts%2Froute&page=%2Fapi%2Faccounts%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Faccounts%2Froute.ts&appDir=%2Fhome%2Frunner%2Fwork%2Fdata-fetching-monorepo-poc%2Fdata-fetching-monorepo-poc%2Fsites%2Fdemo-app%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Frunner%2Fwork%2Fdata-fetching-monorepo-poc%2Fdata-fetching-monorepo-poc%2Fsites%2Fdemo-app&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/../../node_modules/.pnpm/next@15.0.3_@playwright+test@1.55.0_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/../../node_modules/.pnpm/next@15.0.3_@playwright+test@1.55.0_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/../../node_modules/.pnpm/next@15.0.3_@playwright+test@1.55.0_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _home_runner_work_data_fetching_monorepo_poc_data_fetching_monorepo_poc_sites_demo_app_src_app_api_accounts_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/app/api/accounts/route.ts */ \"(rsc)/./src/app/api/accounts/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/accounts/route\",\n        pathname: \"/api/accounts\",\n        filename: \"route\",\n        bundlePath: \"app/api/accounts/route\"\n    },\n    resolvedPagePath: \"/home/runner/work/data-fetching-monorepo-poc/data-fetching-monorepo-poc/sites/demo-app/src/app/api/accounts/route.ts\",\n    nextConfigOutput,\n    userland: _home_runner_work_data_fetching_monorepo_poc_data_fetching_monorepo_poc_sites_demo_app_src_app_api_accounts_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL25leHRAMTUuMC4zX0BwbGF5d3JpZ2h0K3Rlc3RAMS41NS4wX3JlYWN0LWRvbUAxOS4wLjBfcmVhY3RAMTkuMC4wX19yZWFjdEAxOS4wLjAvbm9kZV9tb2R1bGVzL25leHQvZGlzdC9idWlsZC93ZWJwYWNrL2xvYWRlcnMvbmV4dC1hcHAtbG9hZGVyL2luZGV4LmpzP25hbWU9YXBwJTJGYXBpJTJGYWNjb3VudHMlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmFjY291bnRzJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGYWNjb3VudHMlMkZyb3V0ZS50cyZhcHBEaXI9JTJGaG9tZSUyRnJ1bm5lciUyRndvcmslMkZkYXRhLWZldGNoaW5nLW1vbm9yZXBvLXBvYyUyRmRhdGEtZmV0Y2hpbmctbW9ub3JlcG8tcG9jJTJGc2l0ZXMlMkZkZW1vLWFwcCUyRnNyYyUyRmFwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9JTJGaG9tZSUyRnJ1bm5lciUyRndvcmslMkZkYXRhLWZldGNoaW5nLW1vbm9yZXBvLXBvYyUyRmRhdGEtZmV0Y2hpbmctbW9ub3JlcG8tcG9jJTJGc2l0ZXMlMkZkZW1vLWFwcCZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBK0Y7QUFDdkM7QUFDcUI7QUFDb0U7QUFDako7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlHQUFtQjtBQUMzQztBQUNBLGNBQWMsa0VBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzREFBc0Q7QUFDOUQ7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDMEY7O0FBRTFGIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIi9ob21lL3J1bm5lci93b3JrL2RhdGEtZmV0Y2hpbmctbW9ub3JlcG8tcG9jL2RhdGEtZmV0Y2hpbmctbW9ub3JlcG8tcG9jL3NpdGVzL2RlbW8tYXBwL3NyYy9hcHAvYXBpL2FjY291bnRzL3JvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9hY2NvdW50cy9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL2FjY291bnRzXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9hY2NvdW50cy9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIi9ob21lL3J1bm5lci93b3JrL2RhdGEtZmV0Y2hpbmctbW9ub3JlcG8tcG9jL2RhdGEtZmV0Y2hpbmctbW9ub3JlcG8tcG9jL3NpdGVzL2RlbW8tYXBwL3NyYy9hcHAvYXBpL2FjY291bnRzL3JvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/../../node_modules/.pnpm/next@15.0.3_@playwright+test@1.55.0_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Faccounts%2Froute&page=%2Fapi%2Faccounts%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Faccounts%2Froute.ts&appDir=%2Fhome%2Frunner%2Fwork%2Fdata-fetching-monorepo-poc%2Fdata-fetching-monorepo-poc%2Fsites%2Fdemo-app%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Frunner%2Fwork%2Fdata-fetching-monorepo-poc%2Fdata-fetching-monorepo-poc%2Fsites%2Fdemo-app&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/../../node_modules/.pnpm/next@15.0.3_@playwright+test@1.55.0_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!*************************************************************************************************************************************************************************************************************!*\
  !*** ../../node_modules/.pnpm/next@15.0.3_@playwright+test@1.55.0_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \*************************************************************************************************************************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/../../node_modules/.pnpm/next@15.0.3_@playwright+test@1.55.0_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!*************************************************************************************************************************************************************************************************************!*\
  !*** ../../node_modules/.pnpm/next@15.0.3_@playwright+test@1.55.0_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \*************************************************************************************************************************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(rsc)/./src/app/api/accounts/route.ts":
/*!***************************************!*\
  !*** ./src/app/api/accounts/route.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/../../node_modules/.pnpm/next@15.0.3_@playwright+test@1.55.0_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/api/server.js\");\n\nasync function GET() {\n    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json([\n        {\n            id: \"1\",\n            name: \"Checking\",\n            balance: 1000\n        },\n        {\n            id: \"2\",\n            name: \"Savings\",\n            balance: 5000\n        }\n    ]);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvYXBwL2FwaS9hY2NvdW50cy9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7OztBQUEyQztBQUVwQyxlQUFlQztJQUNwQixPQUFPRCxxREFBWUEsQ0FBQ0UsSUFBSSxDQUFDO1FBQ3ZCO1lBQUVDLElBQUk7WUFBS0MsTUFBTTtZQUFZQyxTQUFTO1FBQUs7UUFDM0M7WUFBRUYsSUFBSTtZQUFLQyxNQUFNO1lBQVdDLFNBQVM7UUFBSztLQUMzQztBQUNIIiwic291cmNlcyI6WyIvaG9tZS9ydW5uZXIvd29yay9kYXRhLWZldGNoaW5nLW1vbm9yZXBvLXBvYy9kYXRhLWZldGNoaW5nLW1vbm9yZXBvLXBvYy9zaXRlcy9kZW1vLWFwcC9zcmMvYXBwL2FwaS9hY2NvdW50cy9yb3V0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0UmVzcG9uc2UgfSBmcm9tICduZXh0L3NlcnZlcic7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBHRVQoKSB7XG4gIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihbXG4gICAgeyBpZDogXCIxXCIsIG5hbWU6IFwiQ2hlY2tpbmdcIiwgYmFsYW5jZTogMTAwMCB9LFxuICAgIHsgaWQ6IFwiMlwiLCBuYW1lOiBcIlNhdmluZ3NcIiwgYmFsYW5jZTogNTAwMCB9LFxuICBdKTtcbn0iXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwiR0VUIiwianNvbiIsImlkIiwibmFtZSIsImJhbGFuY2UiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./src/app/api/accounts/route.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next@15.0.3_@playwright+test@1.55.0_react-dom@19.0.0_react@19.0.0__react@19.0.0"], () => (__webpack_exec__("(rsc)/../../node_modules/.pnpm/next@15.0.3_@playwright+test@1.55.0_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Faccounts%2Froute&page=%2Fapi%2Faccounts%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Faccounts%2Froute.ts&appDir=%2Fhome%2Frunner%2Fwork%2Fdata-fetching-monorepo-poc%2Fdata-fetching-monorepo-poc%2Fsites%2Fdemo-app%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Frunner%2Fwork%2Fdata-fetching-monorepo-poc%2Fdata-fetching-monorepo-poc%2Fsites%2Fdemo-app&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();