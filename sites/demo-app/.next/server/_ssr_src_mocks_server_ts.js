"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "_ssr_src_mocks_server_ts";
exports.ids = ["_ssr_src_mocks_server_ts"];
exports.modules = {

/***/ "(ssr)/./src/api/accounts.mock.ts":
/*!**********************************!*\
  !*** ./src/api/accounts.mock.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   accountsMockHandlers: () => (/* binding */ accountsMockHandlers)\n/* harmony export */ });\n/* harmony import */ var msw__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! msw */ \"(ssr)/../../node_modules/.pnpm/msw@2.10.5_@types+node@20.19.11_typescript@5.9.2/node_modules/msw/lib/core/http.mjs\");\n/* harmony import */ var msw__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! msw */ \"(ssr)/../../node_modules/.pnpm/msw@2.10.5_@types+node@20.19.11_typescript@5.9.2/node_modules/msw/lib/core/HttpResponse.mjs\");\n\nconst accountsMockHandlers = [\n    msw__WEBPACK_IMPORTED_MODULE_0__.http.get(\"/api/accounts\", ()=>{\n        return msw__WEBPACK_IMPORTED_MODULE_1__.HttpResponse.json([\n            {\n                id: \"1\",\n                name: \"Checking\",\n                balance: 1000\n            },\n            {\n                id: \"2\",\n                name: \"Savings\",\n                balance: 5000\n            }\n        ]);\n    })\n];\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9zcmMvYXBpL2FjY291bnRzLm1vY2sudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQXlDO0FBRWxDLE1BQU1FLHVCQUF1QjtJQUNsQ0YscUNBQUlBLENBQUNHLEdBQUcsQ0FBQyxpQkFBaUI7UUFDeEIsT0FBT0YsNkNBQVlBLENBQUNHLElBQUksQ0FBQztZQUN2QjtnQkFBRUMsSUFBSTtnQkFBS0MsTUFBTTtnQkFBWUMsU0FBUztZQUFLO1lBQzNDO2dCQUFFRixJQUFJO2dCQUFLQyxNQUFNO2dCQUFXQyxTQUFTO1lBQUs7U0FDM0M7SUFDSDtDQUNELENBQUMiLCJzb3VyY2VzIjpbIi9ob21lL3J1bm5lci93b3JrL2RhdGEtZmV0Y2hpbmctbW9ub3JlcG8tcG9jL2RhdGEtZmV0Y2hpbmctbW9ub3JlcG8tcG9jL3NpdGVzL2RlbW8tYXBwL3NyYy9hcGkvYWNjb3VudHMubW9jay50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBodHRwLCBIdHRwUmVzcG9uc2UgfSBmcm9tIFwibXN3XCI7XG5cbmV4cG9ydCBjb25zdCBhY2NvdW50c01vY2tIYW5kbGVycyA9IFtcbiAgaHR0cC5nZXQoXCIvYXBpL2FjY291bnRzXCIsICgpID0+IHtcbiAgICByZXR1cm4gSHR0cFJlc3BvbnNlLmpzb24oW1xuICAgICAgeyBpZDogXCIxXCIsIG5hbWU6IFwiQ2hlY2tpbmdcIiwgYmFsYW5jZTogMTAwMCB9LFxuICAgICAgeyBpZDogXCIyXCIsIG5hbWU6IFwiU2F2aW5nc1wiLCBiYWxhbmNlOiA1MDAwIH0sXG4gICAgXSk7XG4gIH0pLFxuXTsiXSwibmFtZXMiOlsiaHR0cCIsIkh0dHBSZXNwb25zZSIsImFjY291bnRzTW9ja0hhbmRsZXJzIiwiZ2V0IiwianNvbiIsImlkIiwibmFtZSIsImJhbGFuY2UiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./src/api/accounts.mock.ts\n");

/***/ }),

/***/ "(ssr)/./src/api/profile.mock.ts":
/*!*********************************!*\
  !*** ./src/api/profile.mock.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   profileMockHandlers: () => (/* binding */ profileMockHandlers)\n/* harmony export */ });\n/* harmony import */ var msw__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! msw */ \"(ssr)/../../node_modules/.pnpm/msw@2.10.5_@types+node@20.19.11_typescript@5.9.2/node_modules/msw/lib/core/http.mjs\");\n/* harmony import */ var msw__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! msw */ \"(ssr)/../../node_modules/.pnpm/msw@2.10.5_@types+node@20.19.11_typescript@5.9.2/node_modules/msw/lib/core/HttpResponse.mjs\");\n\nconst profileMockHandlers = [\n    msw__WEBPACK_IMPORTED_MODULE_0__.http.get(\"/api/me\", ()=>{\n        return msw__WEBPACK_IMPORTED_MODULE_1__.HttpResponse.json({\n            name: \"Jane Doe\",\n            email: \"jane@example.com\"\n        });\n    })\n];\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9zcmMvYXBpL3Byb2ZpbGUubW9jay50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBeUM7QUFFbEMsTUFBTUUsc0JBQXNCO0lBQ2pDRixxQ0FBSUEsQ0FBQ0csR0FBRyxDQUFDLFdBQVc7UUFDbEIsT0FBT0YsNkNBQVlBLENBQUNHLElBQUksQ0FBQztZQUN2QkMsTUFBTTtZQUNOQyxPQUFPO1FBQ1Q7SUFDRjtDQUNELENBQUMiLCJzb3VyY2VzIjpbIi9ob21lL3J1bm5lci93b3JrL2RhdGEtZmV0Y2hpbmctbW9ub3JlcG8tcG9jL2RhdGEtZmV0Y2hpbmctbW9ub3JlcG8tcG9jL3NpdGVzL2RlbW8tYXBwL3NyYy9hcGkvcHJvZmlsZS5tb2NrLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGh0dHAsIEh0dHBSZXNwb25zZSB9IGZyb20gXCJtc3dcIjtcblxuZXhwb3J0IGNvbnN0IHByb2ZpbGVNb2NrSGFuZGxlcnMgPSBbXG4gIGh0dHAuZ2V0KFwiL2FwaS9tZVwiLCAoKSA9PiB7XG4gICAgcmV0dXJuIEh0dHBSZXNwb25zZS5qc29uKHtcbiAgICAgIG5hbWU6IFwiSmFuZSBEb2VcIixcbiAgICAgIGVtYWlsOiBcImphbmVAZXhhbXBsZS5jb21cIlxuICAgIH0pO1xuICB9KSxcbl07Il0sIm5hbWVzIjpbImh0dHAiLCJIdHRwUmVzcG9uc2UiLCJwcm9maWxlTW9ja0hhbmRsZXJzIiwiZ2V0IiwianNvbiIsIm5hbWUiLCJlbWFpbCJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./src/api/profile.mock.ts\n");

/***/ }),

/***/ "(ssr)/./src/mocks/server.ts":
/*!*****************************!*\
  !*** ./src/mocks/server.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   server: () => (/* binding */ server)\n/* harmony export */ });\n/* harmony import */ var msw_node__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! msw/node */ \"(ssr)/../../node_modules/.pnpm/msw@2.10.5_@types+node@20.19.11_typescript@5.9.2/node_modules/msw/lib/node/index.mjs\");\n/* harmony import */ var _api_profile_mock__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../api/profile.mock */ \"(ssr)/./src/api/profile.mock.ts\");\n/* harmony import */ var _api_accounts_mock__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../api/accounts.mock */ \"(ssr)/./src/api/accounts.mock.ts\");\n\n\n\nconst server = (0,msw_node__WEBPACK_IMPORTED_MODULE_2__.setupServer)(..._api_profile_mock__WEBPACK_IMPORTED_MODULE_0__.profileMockHandlers, ..._api_accounts_mock__WEBPACK_IMPORTED_MODULE_1__.accountsMockHandlers);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9zcmMvbW9ja3Mvc2VydmVyLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBdUM7QUFDbUI7QUFDRTtBQUVyRCxNQUFNRyxTQUFTSCxxREFBV0EsSUFBSUMsa0VBQW1CQSxLQUFLQyxvRUFBb0JBLEVBQUUiLCJzb3VyY2VzIjpbIi9ob21lL3J1bm5lci93b3JrL2RhdGEtZmV0Y2hpbmctbW9ub3JlcG8tcG9jL2RhdGEtZmV0Y2hpbmctbW9ub3JlcG8tcG9jL3NpdGVzL2RlbW8tYXBwL3NyYy9tb2Nrcy9zZXJ2ZXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgc2V0dXBTZXJ2ZXIgfSBmcm9tIFwibXN3L25vZGVcIjtcbmltcG9ydCB7IHByb2ZpbGVNb2NrSGFuZGxlcnMgfSBmcm9tIFwiLi4vYXBpL3Byb2ZpbGUubW9ja1wiO1xuaW1wb3J0IHsgYWNjb3VudHNNb2NrSGFuZGxlcnMgfSBmcm9tIFwiLi4vYXBpL2FjY291bnRzLm1vY2tcIjtcblxuZXhwb3J0IGNvbnN0IHNlcnZlciA9IHNldHVwU2VydmVyKC4uLnByb2ZpbGVNb2NrSGFuZGxlcnMsIC4uLmFjY291bnRzTW9ja0hhbmRsZXJzKTsiXSwibmFtZXMiOlsic2V0dXBTZXJ2ZXIiLCJwcm9maWxlTW9ja0hhbmRsZXJzIiwiYWNjb3VudHNNb2NrSGFuZGxlcnMiLCJzZXJ2ZXIiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./src/mocks/server.ts\n");

/***/ })

};
;