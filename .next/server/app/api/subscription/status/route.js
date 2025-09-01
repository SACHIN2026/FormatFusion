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
exports.id = "app/api/subscription/status/route";
exports.ids = ["app/api/subscription/status/route"];
exports.modules = {

/***/ "(rsc)/./app/api/subscription/status/route.ts":
/*!**********************************************!*\
  !*** ./app/api/subscription/status/route.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/auth */ \"(rsc)/./lib/auth.ts\");\n/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/lib/db */ \"(rsc)/./lib/db.ts\");\n/* harmony import */ var _models_User__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/models/User */ \"(rsc)/./models/User.ts\");\n\n\n\n\n\nasync function GET() {\n    try {\n        const session = await (0,next_auth__WEBPACK_IMPORTED_MODULE_1__.getServerSession)(_lib_auth__WEBPACK_IMPORTED_MODULE_2__.authOptions);\n        if (!session?.user?.email) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: 'Unauthorized'\n            }, {\n                status: 401\n            });\n        }\n        await (0,_lib_db__WEBPACK_IMPORTED_MODULE_3__.dbconnect)();\n        const user = await _models_User__WEBPACK_IMPORTED_MODULE_4__[\"default\"].findOne({\n            email: session.user.email\n        });\n        if (!user) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: 'User not found'\n            }, {\n                status: 404\n            });\n        }\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            subscription: {\n                status: user.subscriptionStatus || 'free',\n                plan: user.subscriptionPlan || 'free',\n                currentPeriodEnd: user.subscriptionCurrentPeriodEnd || null\n            }\n        });\n    } catch (error) {\n        console.error('Error fetching subscription status:', error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: 'Internal server error'\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3N1YnNjcmlwdGlvbi9zdGF0dXMvcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUF3RDtBQUNYO0FBQ0o7QUFDSjtBQUNKO0FBRTFCLGVBQWVLO0lBQ3BCLElBQUk7UUFDRixNQUFNQyxVQUFVLE1BQU1MLDJEQUFnQkEsQ0FBQ0Msa0RBQVdBO1FBRWxELElBQUksQ0FBQ0ksU0FBU0MsTUFBTUMsT0FBTztZQUN6QixPQUFPUixxREFBWUEsQ0FBQ1MsSUFBSSxDQUN0QjtnQkFBRUMsT0FBTztZQUFlLEdBQ3hCO2dCQUFFQyxRQUFRO1lBQUk7UUFFbEI7UUFFQSxNQUFNUixrREFBU0E7UUFFZixNQUFNSSxPQUFPLE1BQU1ILG9EQUFJQSxDQUFDUSxPQUFPLENBQUM7WUFBRUosT0FBT0YsUUFBUUMsSUFBSSxDQUFDQyxLQUFLO1FBQUM7UUFFNUQsSUFBSSxDQUFDRCxNQUFNO1lBQ1QsT0FBT1AscURBQVlBLENBQUNTLElBQUksQ0FDdEI7Z0JBQUVDLE9BQU87WUFBaUIsR0FDMUI7Z0JBQUVDLFFBQVE7WUFBSTtRQUVsQjtRQUVBLE9BQU9YLHFEQUFZQSxDQUFDUyxJQUFJLENBQUM7WUFDdkJJLGNBQWM7Z0JBQ1pGLFFBQVFKLEtBQUtPLGtCQUFrQixJQUFJO2dCQUNuQ0MsTUFBTVIsS0FBS1MsZ0JBQWdCLElBQUk7Z0JBQy9CQyxrQkFBa0JWLEtBQUtXLDRCQUE0QixJQUFJO1lBQ3pEO1FBQ0Y7SUFFRixFQUFFLE9BQU9SLE9BQU87UUFDZFMsUUFBUVQsS0FBSyxDQUFDLHVDQUF1Q0E7UUFDckQsT0FBT1YscURBQVlBLENBQUNTLElBQUksQ0FDdEI7WUFBRUMsT0FBTztRQUF3QixHQUNqQztZQUFFQyxRQUFRO1FBQUk7SUFFbEI7QUFDRiIsInNvdXJjZXMiOlsiL2hvbWUvc2FjaGluL0Rlc2t0b3AvRm9ybWF0RnVzaW9uLW1haW4vRm9ybWF0RnVzaW9uLW1haW4vYXBwL2FwaS9zdWJzY3JpcHRpb24vc3RhdHVzL3JvdXRlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXF1ZXN0LCBOZXh0UmVzcG9uc2UgfSBmcm9tICduZXh0L3NlcnZlcic7XG5pbXBvcnQgeyBnZXRTZXJ2ZXJTZXNzaW9uIH0gZnJvbSAnbmV4dC1hdXRoJztcbmltcG9ydCB7IGF1dGhPcHRpb25zIH0gZnJvbSAnQC9saWIvYXV0aCc7XG5pbXBvcnQgeyBkYmNvbm5lY3QgfSBmcm9tICdAL2xpYi9kYic7XG5pbXBvcnQgVXNlciBmcm9tICdAL21vZGVscy9Vc2VyJztcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIEdFVCgpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgZ2V0U2VydmVyU2Vzc2lvbihhdXRoT3B0aW9ucyk7XG4gICAgXG4gICAgaWYgKCFzZXNzaW9uPy51c2VyPy5lbWFpbCkge1xuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxuICAgICAgICB7IGVycm9yOiAnVW5hdXRob3JpemVkJyB9LFxuICAgICAgICB7IHN0YXR1czogNDAxIH1cbiAgICAgICk7XG4gICAgfVxuXG4gICAgYXdhaXQgZGJjb25uZWN0KCk7XG4gICAgXG4gICAgY29uc3QgdXNlciA9IGF3YWl0IFVzZXIuZmluZE9uZSh7IGVtYWlsOiBzZXNzaW9uLnVzZXIuZW1haWwgfSk7XG4gICAgXG4gICAgaWYgKCF1c2VyKSB7XG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXG4gICAgICAgIHsgZXJyb3I6ICdVc2VyIG5vdCBmb3VuZCcgfSxcbiAgICAgICAgeyBzdGF0dXM6IDQwNCB9XG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7XG4gICAgICBzdWJzY3JpcHRpb246IHtcbiAgICAgICAgc3RhdHVzOiB1c2VyLnN1YnNjcmlwdGlvblN0YXR1cyB8fCAnZnJlZScsXG4gICAgICAgIHBsYW46IHVzZXIuc3Vic2NyaXB0aW9uUGxhbiB8fCAnZnJlZScsXG4gICAgICAgIGN1cnJlbnRQZXJpb2RFbmQ6IHVzZXIuc3Vic2NyaXB0aW9uQ3VycmVudFBlcmlvZEVuZCB8fCBudWxsLFxuICAgICAgfVxuICAgIH0pO1xuXG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcignRXJyb3IgZmV0Y2hpbmcgc3Vic2NyaXB0aW9uIHN0YXR1czonLCBlcnJvcik7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxuICAgICAgeyBlcnJvcjogJ0ludGVybmFsIHNlcnZlciBlcnJvcicgfSxcbiAgICAgIHsgc3RhdHVzOiA1MDAgfVxuICAgICk7XG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJnZXRTZXJ2ZXJTZXNzaW9uIiwiYXV0aE9wdGlvbnMiLCJkYmNvbm5lY3QiLCJVc2VyIiwiR0VUIiwic2Vzc2lvbiIsInVzZXIiLCJlbWFpbCIsImpzb24iLCJlcnJvciIsInN0YXR1cyIsImZpbmRPbmUiLCJzdWJzY3JpcHRpb24iLCJzdWJzY3JpcHRpb25TdGF0dXMiLCJwbGFuIiwic3Vic2NyaXB0aW9uUGxhbiIsImN1cnJlbnRQZXJpb2RFbmQiLCJzdWJzY3JpcHRpb25DdXJyZW50UGVyaW9kRW5kIiwiY29uc29sZSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/subscription/status/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/auth.ts":
/*!*********************!*\
  !*** ./lib/auth.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   authOptions: () => (/* binding */ authOptions)\n/* harmony export */ });\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth/providers/credentials */ \"(rsc)/./node_modules/next-auth/providers/credentials.js\");\n/* harmony import */ var _models_User__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/models/User */ \"(rsc)/./models/User.ts\");\n/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./db */ \"(rsc)/./lib/db.ts\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! bcryptjs */ \"(rsc)/./node_modules/bcryptjs/index.js\");\n\n\n\n\nconst authOptions = {\n    providers: [\n        (0,next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n            name: \"Credentials\",\n            credentials: {\n                email: {\n                    label: \"Email\",\n                    type: \"text\"\n                },\n                password: {\n                    label: \"Password\",\n                    type: \"password\"\n                }\n            },\n            async authorize (credentials) {\n                if (!credentials?.email || !credentials?.password) {\n                    throw new Error(\"Email and password are required\");\n                }\n                try {\n                    await (0,_db__WEBPACK_IMPORTED_MODULE_2__.dbconnect)();\n                    const user = await _models_User__WEBPACK_IMPORTED_MODULE_1__[\"default\"].findOne({\n                        email: credentials.email\n                    });\n                    if (!user) {\n                        throw new Error(\"No user found with this email\");\n                    }\n                    const isValid = await bcryptjs__WEBPACK_IMPORTED_MODULE_3__[\"default\"].compare(credentials.password, user.password);\n                    if (!isValid) {\n                        throw new Error(\"Invalid password\");\n                    }\n                    return {\n                        id: user._id.toString(),\n                        email: user.email\n                    };\n                } catch (error) {\n                    console.error(\"Error in authorize:\", error);\n                    throw new Error(\"Internal server error\");\n                }\n            }\n        })\n    ],\n    callbacks: {\n        async jwt ({ token, user }) {\n            if (user) {\n                token.id = user.id;\n            }\n            return token;\n        },\n        async session ({ session, token }) {\n            if (session.user) {\n                session.user.id = token.id;\n            }\n            return session;\n        }\n    },\n    pages: {\n        signIn: \"/login\",\n        error: \"/login\",\n        signOut: \"/signout\"\n    },\n    session: {\n        strategy: \"jwt\",\n        maxAge: 30 * 24 * 60 * 60\n    },\n    secret: process.env.NEXTAUTH_SECRET\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvYXV0aC50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUNrRTtBQUNqQztBQUNBO0FBQ0g7QUFHdkIsTUFBTUksY0FBK0I7SUFDeENDLFdBQVc7UUFDUEwsMkVBQW1CQSxDQUFDO1lBQ2hCTSxNQUFNO1lBQ05DLGFBQWE7Z0JBQ1RDLE9BQU87b0JBQUVDLE9BQU87b0JBQVNDLE1BQU07Z0JBQU87Z0JBQ3RDQyxVQUFVO29CQUFFRixPQUFPO29CQUFZQyxNQUFNO2dCQUFXO1lBQ3BEO1lBQ0EsTUFBTUUsV0FBVUwsV0FBVztnQkFDdkIsSUFBSSxDQUFDQSxhQUFhQyxTQUFTLENBQUNELGFBQWFJLFVBQVU7b0JBQy9DLE1BQU0sSUFBSUUsTUFBTTtnQkFDcEI7Z0JBRUEsSUFBSTtvQkFDQSxNQUFNWCw4Q0FBU0E7b0JBQ2YsTUFBTVksT0FBTyxNQUFNYixvREFBSUEsQ0FBQ2MsT0FBTyxDQUFDO3dCQUFFUCxPQUFPRCxZQUFZQyxLQUFLO29CQUFDO29CQUMzRCxJQUFJLENBQUNNLE1BQU07d0JBQ1AsTUFBTSxJQUFJRCxNQUFNO29CQUNwQjtvQkFFQSxNQUFNRyxVQUFVLE1BQU1iLHdEQUFjLENBQUNJLFlBQVlJLFFBQVEsRUFBRUcsS0FBS0gsUUFBUTtvQkFFeEUsSUFBSSxDQUFDSyxTQUFTO3dCQUNWLE1BQU0sSUFBSUgsTUFBTTtvQkFDcEI7b0JBRUEsT0FBTzt3QkFDSEssSUFBSUosS0FBS0ssR0FBRyxDQUFDQyxRQUFRO3dCQUNyQlosT0FBT00sS0FBS04sS0FBSztvQkFDckI7Z0JBRUosRUFBRSxPQUFPYSxPQUFPO29CQUNaQyxRQUFRRCxLQUFLLENBQUMsdUJBQXVCQTtvQkFDckMsTUFBTSxJQUFJUixNQUFNO2dCQUVwQjtZQUNKO1FBQ0o7S0FDSDtJQUVEVSxXQUFVO1FBQ04sTUFBTUMsS0FBSSxFQUFDQyxLQUFLLEVBQUVYLElBQUksRUFBQztZQUNuQixJQUFHQSxNQUFLO2dCQUNKVyxNQUFNUCxFQUFFLEdBQUdKLEtBQUtJLEVBQUU7WUFDdEI7WUFDQSxPQUFPTztRQUNYO1FBQ0EsTUFBTUMsU0FBUSxFQUFDQSxPQUFPLEVBQUVELEtBQUssRUFBQztZQUMxQixJQUFHQyxRQUFRWixJQUFJLEVBQUM7Z0JBQ1pZLFFBQVFaLElBQUksQ0FBQ0ksRUFBRSxHQUFHTyxNQUFNUCxFQUFFO1lBQzlCO1lBQ0EsT0FBT1E7UUFDWDtJQUlKO0lBRUFDLE9BQU87UUFDQ0MsUUFBUTtRQUNSUCxPQUFPO1FBQ1BRLFNBQVM7SUFDYjtJQUVBSCxTQUFTO1FBQ0xJLFVBQVU7UUFDVkMsUUFBUSxLQUFLLEtBQUssS0FBSztJQUMzQjtJQUVBQyxRQUFRQyxRQUFRQyxHQUFHLENBQUNDLGVBQWU7QUFDM0MsRUFBQyIsInNvdXJjZXMiOlsiL2hvbWUvc2FjaGluL0Rlc2t0b3AvRm9ybWF0RnVzaW9uLW1haW4vRm9ybWF0RnVzaW9uLW1haW4vbGliL2F1dGgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dEF1dGhPcHRpb25zIH0gZnJvbSBcIm5leHQtYXV0aFwiO1xuaW1wb3J0IENyZWRlbnRpYWxzUHJvdmlkZXIgZnJvbSBcIm5leHQtYXV0aC9wcm92aWRlcnMvY3JlZGVudGlhbHNcIjtcbmltcG9ydCBVc2VyIGZyb20gXCJAL21vZGVscy9Vc2VyXCI7XG5pbXBvcnQgeyBkYmNvbm5lY3QgfSBmcm9tIFwiLi9kYlwiO1xuaW1wb3J0IGJjcnlwdCBmcm9tIFwiYmNyeXB0anNcIjtcblxuXG5leHBvcnQgY29uc3QgYXV0aE9wdGlvbnM6IE5leHRBdXRoT3B0aW9ucyA9IHtcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgQ3JlZGVudGlhbHNQcm92aWRlcih7XG4gICAgICAgICAgICBuYW1lOiBcIkNyZWRlbnRpYWxzXCIsXG4gICAgICAgICAgICBjcmVkZW50aWFsczoge1xuICAgICAgICAgICAgICAgIGVtYWlsOiB7IGxhYmVsOiBcIkVtYWlsXCIsIHR5cGU6IFwidGV4dFwiIH0sXG4gICAgICAgICAgICAgICAgcGFzc3dvcmQ6IHsgbGFiZWw6IFwiUGFzc3dvcmRcIiwgdHlwZTogXCJwYXNzd29yZFwiIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYXN5bmMgYXV0aG9yaXplKGNyZWRlbnRpYWxzKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFjcmVkZW50aWFscz8uZW1haWwgfHwgIWNyZWRlbnRpYWxzPy5wYXNzd29yZCkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJFbWFpbCBhbmQgcGFzc3dvcmQgYXJlIHJlcXVpcmVkXCIpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IGRiY29ubmVjdCgpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB1c2VyID0gYXdhaXQgVXNlci5maW5kT25lKHsgZW1haWw6IGNyZWRlbnRpYWxzLmVtYWlsIH0pO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXVzZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vIHVzZXIgZm91bmQgd2l0aCB0aGlzIGVtYWlsXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaXNWYWxpZCA9IGF3YWl0IGJjcnlwdC5jb21wYXJlKGNyZWRlbnRpYWxzLnBhc3N3b3JkLCB1c2VyLnBhc3N3b3JkKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoIWlzVmFsaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgcGFzc3dvcmRcIik7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IHVzZXIuX2lkLnRvU3RyaW5nKCksXG4gICAgICAgICAgICAgICAgICAgICAgICBlbWFpbDogdXNlci5lbWFpbCxcbiAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBpbiBhdXRob3JpemU6XCIsIGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW50ZXJuYWwgc2VydmVyIGVycm9yXCIpO1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIF0sXG5cbiAgICBjYWxsYmFja3M6e1xuICAgICAgICBhc3luYyBqd3Qoe3Rva2VuLCB1c2VyfSl7XG4gICAgICAgICAgICBpZih1c2VyKXtcbiAgICAgICAgICAgICAgICB0b2tlbi5pZCA9IHVzZXIuaWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdG9rZW47XG4gICAgICAgIH0sXG4gICAgICAgIGFzeW5jIHNlc3Npb24oe3Nlc3Npb24sIHRva2VufSl7XG4gICAgICAgICAgICBpZihzZXNzaW9uLnVzZXIpe1xuICAgICAgICAgICAgICAgIHNlc3Npb24udXNlci5pZCA9IHRva2VuLmlkIGFzIHN0cmluZztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzZXNzaW9uO1xuICAgICAgICB9LFxuXG4gICAgICAgIFxuXG4gICAgfSxcblxuICAgIHBhZ2VzOiB7XG4gICAgICAgICAgICBzaWduSW46IFwiL2xvZ2luXCIsXG4gICAgICAgICAgICBlcnJvcjogXCIvbG9naW5cIixcbiAgICAgICAgICAgIHNpZ25PdXQ6IFwiL3NpZ25vdXRcIixcbiAgICAgICAgfSxcblxuICAgICAgICBzZXNzaW9uOiB7XG4gICAgICAgICAgICBzdHJhdGVneTogXCJqd3RcIixcbiAgICAgICAgICAgIG1heEFnZTogMzAgKiAyNCAqIDYwICogNjAsIC8vIDMwIGRheXNcbiAgICAgICAgfSxcblxuICAgICAgICBzZWNyZXQ6IHByb2Nlc3MuZW52Lk5FWFRBVVRIX1NFQ1JFVCxcbn0iXSwibmFtZXMiOlsiQ3JlZGVudGlhbHNQcm92aWRlciIsIlVzZXIiLCJkYmNvbm5lY3QiLCJiY3J5cHQiLCJhdXRoT3B0aW9ucyIsInByb3ZpZGVycyIsIm5hbWUiLCJjcmVkZW50aWFscyIsImVtYWlsIiwibGFiZWwiLCJ0eXBlIiwicGFzc3dvcmQiLCJhdXRob3JpemUiLCJFcnJvciIsInVzZXIiLCJmaW5kT25lIiwiaXNWYWxpZCIsImNvbXBhcmUiLCJpZCIsIl9pZCIsInRvU3RyaW5nIiwiZXJyb3IiLCJjb25zb2xlIiwiY2FsbGJhY2tzIiwiand0IiwidG9rZW4iLCJzZXNzaW9uIiwicGFnZXMiLCJzaWduSW4iLCJzaWduT3V0Iiwic3RyYXRlZ3kiLCJtYXhBZ2UiLCJzZWNyZXQiLCJwcm9jZXNzIiwiZW52IiwiTkVYVEFVVEhfU0VDUkVUIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/auth.ts\n");

/***/ }),

/***/ "(rsc)/./lib/db.ts":
/*!*******************!*\
  !*** ./lib/db.ts ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   dbconnect: () => (/* binding */ dbconnect)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst MONGODB_URI = process.env.MONGODB_URI;\nif (!MONGODB_URI) {\n    throw new Error(\"Please define the MONGODB_URI environment variable inside .env\");\n}\nlet cached = global.mongoose;\nif (!cached) {\n    cached = global.mongoose = {\n        conn: null,\n        promise: null\n    };\n}\nasync function dbconnect() {\n    if (cached.conn) {\n        return cached.conn;\n    }\n    if (!cached.promise) {\n        mongoose__WEBPACK_IMPORTED_MODULE_0___default().connect(MONGODB_URI).then(()=>(mongoose__WEBPACK_IMPORTED_MODULE_0___default().connection));\n    }\n    try {\n        cached.conn = await cached.promise;\n    } catch (error) {\n        cached.promise = null;\n        throw error;\n    }\n    return cached.conn;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvZGIudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWdDO0FBRWhDLE1BQU1DLGNBQWNDLFFBQVFDLEdBQUcsQ0FBQ0YsV0FBVztBQUUzQyxJQUFHLENBQUNBLGFBQVk7SUFDWixNQUFNLElBQUlHLE1BQU07QUFDcEI7QUFFQSxJQUFJQyxTQUFTQyxPQUFPTixRQUFRO0FBRTVCLElBQUcsQ0FBQ0ssUUFBTztJQUNQQSxTQUFTQyxPQUFPTixRQUFRLEdBQUc7UUFBQ08sTUFBTTtRQUFNQyxTQUFTO0lBQUk7QUFDekQ7QUFFTyxlQUFlQztJQUNsQixJQUFHSixPQUFPRSxJQUFJLEVBQUM7UUFDWCxPQUFPRixPQUFPRSxJQUFJO0lBQ3RCO0lBRUEsSUFBRyxDQUFDRixPQUFPRyxPQUFPLEVBQUM7UUFDZlIsdURBQWdCLENBQUNDLGFBQWFVLElBQUksQ0FBQyxJQUFLWCw0REFBbUI7SUFDL0Q7SUFFQSxJQUFJO1FBQ0FLLE9BQU9FLElBQUksR0FBRyxNQUFNRixPQUFPRyxPQUFPO0lBQ3RDLEVBQUUsT0FBT0ssT0FBTztRQUNaUixPQUFPRyxPQUFPLEdBQUc7UUFDakIsTUFBTUs7SUFDVjtJQUNBLE9BQU9SLE9BQU9FLElBQUk7QUFDdEIiLCJzb3VyY2VzIjpbIi9ob21lL3NhY2hpbi9EZXNrdG9wL0Zvcm1hdEZ1c2lvbi1tYWluL0Zvcm1hdEZ1c2lvbi1tYWluL2xpYi9kYi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbW9uZ29vc2UgZnJvbSBcIm1vbmdvb3NlXCI7XG5cbmNvbnN0IE1PTkdPREJfVVJJID0gcHJvY2Vzcy5lbnYuTU9OR09EQl9VUkkhXG5cbmlmKCFNT05HT0RCX1VSSSl7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiUGxlYXNlIGRlZmluZSB0aGUgTU9OR09EQl9VUkkgZW52aXJvbm1lbnQgdmFyaWFibGUgaW5zaWRlIC5lbnZcIik7XG59XG5cbmxldCBjYWNoZWQgPSBnbG9iYWwubW9uZ29vc2VcblxuaWYoIWNhY2hlZCl7XG4gICAgY2FjaGVkID0gZ2xvYmFsLm1vbmdvb3NlID0ge2Nvbm46IG51bGwsIHByb21pc2U6IG51bGx9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkYmNvbm5lY3QoKXtcbiAgICBpZihjYWNoZWQuY29ubil7XG4gICAgICAgIHJldHVybiBjYWNoZWQuY29ubjtcbiAgICB9XG5cbiAgICBpZighY2FjaGVkLnByb21pc2Upe1xuICAgICAgICBtb25nb29zZS5jb25uZWN0KE1PTkdPREJfVVJJKS50aGVuKCgpPT4gbW9uZ29vc2UuY29ubmVjdGlvbilcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgICBjYWNoZWQuY29ubiA9IGF3YWl0IGNhY2hlZC5wcm9taXNlO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNhY2hlZC5wcm9taXNlID0gbnVsbDtcbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuICAgIHJldHVybiBjYWNoZWQuY29ubjtcbn0iXSwibmFtZXMiOlsibW9uZ29vc2UiLCJNT05HT0RCX1VSSSIsInByb2Nlc3MiLCJlbnYiLCJFcnJvciIsImNhY2hlZCIsImdsb2JhbCIsImNvbm4iLCJwcm9taXNlIiwiZGJjb25uZWN0IiwiY29ubmVjdCIsInRoZW4iLCJjb25uZWN0aW9uIiwiZXJyb3IiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/db.ts\n");

/***/ }),

/***/ "(rsc)/./models/User.ts":
/*!************************!*\
  !*** ./models/User.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   User: () => (/* binding */ User),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bcryptjs */ \"(rsc)/./node_modules/bcryptjs/index.js\");\n\n\nconst userSchema = new mongoose__WEBPACK_IMPORTED_MODULE_0__.Schema({\n    email: {\n        type: String,\n        required: true,\n        unique: true\n    },\n    password: {\n        type: String,\n        required: true\n    },\n    subscriptionStatus: {\n        type: String,\n        enum: [\n            'free',\n            'active',\n            'expired',\n            'cancelled'\n        ],\n        default: 'free'\n    },\n    subscriptionPlan: {\n        type: String,\n        enum: [\n            'free',\n            'basic',\n            'premium'\n        ],\n        default: 'free'\n    },\n    subscriptionCurrentPeriodEnd: {\n        type: Date\n    },\n    subscriptionId: {\n        type: String\n    },\n    stripeCustomerId: {\n        type: String\n    }\n}, {\n    timestamps: true\n});\nuserSchema.pre(\"save\", async function(next) {\n    if (this.isModified(\"password\")) {\n        this.password = await bcryptjs__WEBPACK_IMPORTED_MODULE_1__[\"default\"].hash(this.password, 10);\n    }\n    next();\n});\nconst User = mongoose__WEBPACK_IMPORTED_MODULE_0__.models?.User || (0,mongoose__WEBPACK_IMPORTED_MODULE_0__.model)(\"User\", userSchema);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (User);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9tb2RlbHMvVXNlci50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUEyRDtBQUM3QjtBQWlCOUIsTUFBTUksYUFBYSxJQUFJSiw0Q0FBTUEsQ0FDekI7SUFDSUssT0FBTztRQUFFQyxNQUFNQztRQUFRQyxVQUFVO1FBQU1DLFFBQVE7SUFBSztJQUNwREMsVUFBVTtRQUFFSixNQUFNQztRQUFRQyxVQUFVO0lBQUs7SUFDekNHLG9CQUFvQjtRQUNoQkwsTUFBTUM7UUFDTkssTUFBTTtZQUFDO1lBQVE7WUFBVTtZQUFXO1NBQVk7UUFDaERDLFNBQVM7SUFDYjtJQUNBQyxrQkFBa0I7UUFDZFIsTUFBTUM7UUFDTkssTUFBTTtZQUFDO1lBQVE7WUFBUztTQUFVO1FBQ2xDQyxTQUFTO0lBQ2I7SUFDQUUsOEJBQThCO1FBQUVULE1BQU1VO0lBQUs7SUFDM0NDLGdCQUFnQjtRQUFFWCxNQUFNQztJQUFPO0lBQy9CVyxrQkFBa0I7UUFBRVosTUFBTUM7SUFBTztBQUNyQyxHQUNBO0lBQ0lZLFlBQVk7QUFDaEI7QUFHSmYsV0FBV2dCLEdBQUcsQ0FBQyxRQUFRLGVBQWdCQyxJQUFJO0lBQ3ZDLElBQUcsSUFBSSxDQUFDQyxVQUFVLENBQUMsYUFBWTtRQUMzQixJQUFLLENBQVNaLFFBQVEsR0FBRyxNQUFNUCxxREFBVyxDQUFDLElBQUssQ0FBU08sUUFBUSxFQUFFO0lBQ3ZFO0lBQ0FXO0FBQ0o7QUFFTyxNQUFNRyxPQUFPdEIsNENBQU1BLEVBQUVzQixRQUFRdkIsK0NBQUtBLENBQVEsUUFBUUcsWUFBWTtBQUVyRSxpRUFBZW9CLElBQUlBLEVBQUMiLCJzb3VyY2VzIjpbIi9ob21lL3NhY2hpbi9EZXNrdG9wL0Zvcm1hdEZ1c2lvbi1tYWluL0Zvcm1hdEZ1c2lvbi1tYWluL21vZGVscy9Vc2VyLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtb25nb29zZSwgeyBTY2hlbWEsIG1vZGVsLCBtb2RlbHMgfSBmcm9tIFwibW9uZ29vc2VcIjtcbmltcG9ydCBiY3J5cHQgZnJvbSBcImJjcnlwdGpzXCI7XG5cblxuXG5leHBvcnQgaW50ZXJmYWNlIElVc2VyIHtcbiAgICBlbWFpbDogc3RyaW5nO1xuICAgIHBhc3N3b3JkOiBzdHJpbmc7XG4gICAgc3Vic2NyaXB0aW9uU3RhdHVzPzogJ2ZyZWUnIHwgJ2FjdGl2ZScgfCAnZXhwaXJlZCcgfCAnY2FuY2VsbGVkJztcbiAgICBzdWJzY3JpcHRpb25QbGFuPzogJ2ZyZWUnIHwgJ2Jhc2ljJyB8ICdwcmVtaXVtJztcbiAgICBzdWJzY3JpcHRpb25DdXJyZW50UGVyaW9kRW5kPzogRGF0ZTtcbiAgICBzdWJzY3JpcHRpb25JZD86IHN0cmluZztcbiAgICBzdHJpcGVDdXN0b21lcklkPzogc3RyaW5nO1xuICAgIF9pZD86IG1vbmdvb3NlLlR5cGVzLk9iamVjdElkO1xuICAgIGNyZWF0ZWRBdD86IERhdGU7XG4gICAgdXBkYXRlZEF0PzogRGF0ZTtcbn1cblxuY29uc3QgdXNlclNjaGVtYSA9IG5ldyBTY2hlbWE8SVVzZXI+KFxuICAgIHtcbiAgICAgICAgZW1haWw6IHsgdHlwZTogU3RyaW5nLCByZXF1aXJlZDogdHJ1ZSwgdW5pcXVlOiB0cnVlIH0sXG4gICAgICAgIHBhc3N3b3JkOiB7IHR5cGU6IFN0cmluZywgcmVxdWlyZWQ6IHRydWUgfSxcbiAgICAgICAgc3Vic2NyaXB0aW9uU3RhdHVzOiB7XG4gICAgICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgICAgICBlbnVtOiBbJ2ZyZWUnLCAnYWN0aXZlJywgJ2V4cGlyZWQnLCAnY2FuY2VsbGVkJ10sXG4gICAgICAgICAgICBkZWZhdWx0OiAnZnJlZSdcbiAgICAgICAgfSxcbiAgICAgICAgc3Vic2NyaXB0aW9uUGxhbjoge1xuICAgICAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgICAgICAgZW51bTogWydmcmVlJywgJ2Jhc2ljJywgJ3ByZW1pdW0nXSxcbiAgICAgICAgICAgIGRlZmF1bHQ6ICdmcmVlJ1xuICAgICAgICB9LFxuICAgICAgICBzdWJzY3JpcHRpb25DdXJyZW50UGVyaW9kRW5kOiB7IHR5cGU6IERhdGUgfSxcbiAgICAgICAgc3Vic2NyaXB0aW9uSWQ6IHsgdHlwZTogU3RyaW5nIH0sXG4gICAgICAgIHN0cmlwZUN1c3RvbWVySWQ6IHsgdHlwZTogU3RyaW5nIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHRpbWVzdGFtcHM6IHRydWVcbiAgICB9XG4pXG5cbnVzZXJTY2hlbWEucHJlKFwic2F2ZVwiLCBhc3luYyBmdW5jdGlvbiAobmV4dCkge1xuICAgIGlmKHRoaXMuaXNNb2RpZmllZChcInBhc3N3b3JkXCIpKXtcbiAgICAgICAgKHRoaXMgYXMgYW55KS5wYXNzd29yZCA9IGF3YWl0IGJjcnlwdC5oYXNoKCh0aGlzIGFzIGFueSkucGFzc3dvcmQsIDEwKTtcbiAgICB9XG4gICAgbmV4dCgpO1xufSk7XG5cbmV4cG9ydCBjb25zdCBVc2VyID0gbW9kZWxzPy5Vc2VyIHx8IG1vZGVsPElVc2VyPihcIlVzZXJcIiwgdXNlclNjaGVtYSk7XG5cbmV4cG9ydCBkZWZhdWx0IFVzZXI7XG4iXSwibmFtZXMiOlsiU2NoZW1hIiwibW9kZWwiLCJtb2RlbHMiLCJiY3J5cHQiLCJ1c2VyU2NoZW1hIiwiZW1haWwiLCJ0eXBlIiwiU3RyaW5nIiwicmVxdWlyZWQiLCJ1bmlxdWUiLCJwYXNzd29yZCIsInN1YnNjcmlwdGlvblN0YXR1cyIsImVudW0iLCJkZWZhdWx0Iiwic3Vic2NyaXB0aW9uUGxhbiIsInN1YnNjcmlwdGlvbkN1cnJlbnRQZXJpb2RFbmQiLCJEYXRlIiwic3Vic2NyaXB0aW9uSWQiLCJzdHJpcGVDdXN0b21lcklkIiwidGltZXN0YW1wcyIsInByZSIsIm5leHQiLCJpc01vZGlmaWVkIiwiaGFzaCIsIlVzZXIiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./models/User.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fsubscription%2Fstatus%2Froute&page=%2Fapi%2Fsubscription%2Fstatus%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fsubscription%2Fstatus%2Froute.ts&appDir=%2Fhome%2Fsachin%2FDesktop%2FFormatFusion-main%2FFormatFusion-main%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fsachin%2FDesktop%2FFormatFusion-main%2FFormatFusion-main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fsubscription%2Fstatus%2Froute&page=%2Fapi%2Fsubscription%2Fstatus%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fsubscription%2Fstatus%2Froute.ts&appDir=%2Fhome%2Fsachin%2FDesktop%2FFormatFusion-main%2FFormatFusion-main%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fsachin%2FDesktop%2FFormatFusion-main%2FFormatFusion-main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _home_sachin_Desktop_FormatFusion_main_FormatFusion_main_app_api_subscription_status_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/subscription/status/route.ts */ \"(rsc)/./app/api/subscription/status/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/subscription/status/route\",\n        pathname: \"/api/subscription/status\",\n        filename: \"route\",\n        bundlePath: \"app/api/subscription/status/route\"\n    },\n    resolvedPagePath: \"/home/sachin/Desktop/FormatFusion-main/FormatFusion-main/app/api/subscription/status/route.ts\",\n    nextConfigOutput,\n    userland: _home_sachin_Desktop_FormatFusion_main_FormatFusion_main_app_api_subscription_status_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZzdWJzY3JpcHRpb24lMkZzdGF0dXMlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRnN1YnNjcmlwdGlvbiUyRnN0YXR1cyUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRnN1YnNjcmlwdGlvbiUyRnN0YXR1cyUyRnJvdXRlLnRzJmFwcERpcj0lMkZob21lJTJGc2FjaGluJTJGRGVza3RvcCUyRkZvcm1hdEZ1c2lvbi1tYWluJTJGRm9ybWF0RnVzaW9uLW1haW4lMkZhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPSUyRmhvbWUlMkZzYWNoaW4lMkZEZXNrdG9wJTJGRm9ybWF0RnVzaW9uLW1haW4lMkZGb3JtYXRGdXNpb24tbWFpbiZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBK0Y7QUFDdkM7QUFDcUI7QUFDNkM7QUFDMUg7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlHQUFtQjtBQUMzQztBQUNBLGNBQWMsa0VBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzREFBc0Q7QUFDOUQ7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDMEY7O0FBRTFGIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIi9ob21lL3NhY2hpbi9EZXNrdG9wL0Zvcm1hdEZ1c2lvbi1tYWluL0Zvcm1hdEZ1c2lvbi1tYWluL2FwcC9hcGkvc3Vic2NyaXB0aW9uL3N0YXR1cy9yb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvc3Vic2NyaXB0aW9uL3N0YXR1cy9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL3N1YnNjcmlwdGlvbi9zdGF0dXNcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL3N1YnNjcmlwdGlvbi9zdGF0dXMvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCIvaG9tZS9zYWNoaW4vRGVza3RvcC9Gb3JtYXRGdXNpb24tbWFpbi9Gb3JtYXRGdXNpb24tbWFpbi9hcHAvYXBpL3N1YnNjcmlwdGlvbi9zdGF0dXMvcm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICB3b3JrQXN5bmNTdG9yYWdlLFxuICAgICAgICB3b3JrVW5pdEFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fsubscription%2Fstatus%2Froute&page=%2Fapi%2Fsubscription%2Fstatus%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fsubscription%2Fstatus%2Froute.ts&appDir=%2Fhome%2Fsachin%2FDesktop%2FFormatFusion-main%2FFormatFusion-main%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fsachin%2FDesktop%2FFormatFusion-main%2FFormatFusion-main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

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

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("mongoose");

/***/ }),

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

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("querystring");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/jose","vendor-chunks/openid-client","vendor-chunks/bcryptjs","vendor-chunks/oauth","vendor-chunks/lru-cache","vendor-chunks/object-hash","vendor-chunks/preact","vendor-chunks/uuid","vendor-chunks/preact-render-to-string","vendor-chunks/cookie","vendor-chunks/oidc-token-hash","vendor-chunks/@panva"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fsubscription%2Fstatus%2Froute&page=%2Fapi%2Fsubscription%2Fstatus%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fsubscription%2Fstatus%2Froute.ts&appDir=%2Fhome%2Fsachin%2FDesktop%2FFormatFusion-main%2FFormatFusion-main%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fsachin%2FDesktop%2FFormatFusion-main%2FFormatFusion-main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();