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
exports.id = "app/api/razorpay/create-order/route";
exports.ids = ["app/api/razorpay/create-order/route"];
exports.modules = {

/***/ "(rsc)/./app/api/razorpay/create-order/route.ts":
/*!************************************************!*\
  !*** ./app/api/razorpay/create-order/route.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/auth */ \"(rsc)/./lib/auth.ts\");\n/* harmony import */ var _lib_razorpay__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/lib/razorpay */ \"(rsc)/./lib/razorpay.ts\");\n\n\n\n\nasync function POST(req) {\n    try {\n        // Validate session\n        const session = await (0,next_auth__WEBPACK_IMPORTED_MODULE_1__.getServerSession)(_lib_auth__WEBPACK_IMPORTED_MODULE_2__.authOptions);\n        if (!session || !session.user) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: 'Unauthorized'\n            }, {\n                status: 401\n            });\n        }\n        const body = await req.json();\n        const { planId, amount } = body;\n        if (!planId) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: 'Missing planId'\n            }, {\n                status: 400\n            });\n        }\n        // Validate planId and get server-side amount\n        const validPlans = [\n            'basic',\n            'premium'\n        ];\n        if (!validPlans.includes(planId)) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: 'Invalid plan selected'\n            }, {\n                status: 400\n            });\n        }\n        const plan = _lib_razorpay__WEBPACK_IMPORTED_MODULE_3__.PLANS[planId];\n        if (!plan) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: 'Plan not found'\n            }, {\n                status: 400\n            });\n        }\n        // Server-side amount calculation with minimum enforcement\n        const safeAmount = Math.max(plan.amount, 100); // Enforce INR minimum of ₹1.00 (100 paise)\n        // Create order with short receipt (Razorpay limit: 40 chars)\n        const timestamp = Date.now().toString().slice(-8);\n        const receipt = `rcpt_${timestamp}`;\n        const order = await (0,_lib_razorpay__WEBPACK_IMPORTED_MODULE_3__.createOrder)(safeAmount, 'INR', receipt);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            id: order.id,\n            amount: order.amount,\n            currency: order.currency\n        });\n    } catch (error) {\n        console.error('Error creating Razorpay order:', error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: 'Failed to create order'\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3Jhem9ycGF5L2NyZWF0ZS1vcmRlci9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBd0Q7QUFDWDtBQUNKO0FBQ1c7QUFFN0MsZUFBZUssS0FBS0MsR0FBZ0I7SUFDekMsSUFBSTtRQUNGLG1CQUFtQjtRQUNuQixNQUFNQyxVQUFVLE1BQU1OLDJEQUFnQkEsQ0FBQ0Msa0RBQVdBO1FBQ2xELElBQUksQ0FBQ0ssV0FBVyxDQUFDQSxRQUFRQyxJQUFJLEVBQUU7WUFDN0IsT0FBT1IscURBQVlBLENBQUNTLElBQUksQ0FBQztnQkFBRUMsT0FBTztZQUFlLEdBQUc7Z0JBQUVDLFFBQVE7WUFBSTtRQUNwRTtRQUVBLE1BQU1DLE9BQU8sTUFBTU4sSUFBSUcsSUFBSTtRQUMzQixNQUFNLEVBQUVJLE1BQU0sRUFBRUMsTUFBTSxFQUFFLEdBQUdGO1FBRTNCLElBQUksQ0FBQ0MsUUFBUTtZQUNYLE9BQU9iLHFEQUFZQSxDQUFDUyxJQUFJLENBQUM7Z0JBQUVDLE9BQU87WUFBaUIsR0FBRztnQkFBRUMsUUFBUTtZQUFJO1FBQ3RFO1FBRUEsNkNBQTZDO1FBQzdDLE1BQU1JLGFBQWE7WUFBQztZQUFTO1NBQVU7UUFDdkMsSUFBSSxDQUFDQSxXQUFXQyxRQUFRLENBQUNILFNBQVM7WUFDaEMsT0FBT2IscURBQVlBLENBQUNTLElBQUksQ0FBQztnQkFBRUMsT0FBTztZQUF3QixHQUFHO2dCQUFFQyxRQUFRO1lBQUk7UUFDN0U7UUFFQSxNQUFNTSxPQUFPYixnREFBSyxDQUFDUyxPQUE2QjtRQUNoRCxJQUFJLENBQUNJLE1BQU07WUFDVCxPQUFPakIscURBQVlBLENBQUNTLElBQUksQ0FBQztnQkFBRUMsT0FBTztZQUFpQixHQUFHO2dCQUFFQyxRQUFRO1lBQUk7UUFDdEU7UUFFQSwwREFBMEQ7UUFDMUQsTUFBTU8sYUFBYUMsS0FBS0MsR0FBRyxDQUFDSCxLQUFLSCxNQUFNLEVBQUUsTUFBTSwyQ0FBMkM7UUFFdEYsNkRBQTZEO1FBQ2pFLE1BQU1PLFlBQVlDLEtBQUtDLEdBQUcsR0FBR0MsUUFBUSxHQUFHQyxLQUFLLENBQUMsQ0FBQztRQUMvQyxNQUFNQyxVQUFVLENBQUMsS0FBSyxFQUFFTCxXQUFXO1FBRW5DLE1BQU1NLFFBQVEsTUFBTXhCLDBEQUFXQSxDQUFDZSxZQUFZLE9BQU9RO1FBRW5ELE9BQU8xQixxREFBWUEsQ0FBQ1MsSUFBSSxDQUFDO1lBQ3ZCbUIsSUFBSUQsTUFBTUMsRUFBRTtZQUNoQmQsUUFBUWEsTUFBTWIsTUFBTTtZQUNoQmUsVUFBVUYsTUFBTUUsUUFBUTtRQUMxQjtJQUVGLEVBQUUsT0FBT25CLE9BQU87UUFDZG9CLFFBQVFwQixLQUFLLENBQUMsa0NBQWtDQTtRQUNoRCxPQUFPVixxREFBWUEsQ0FBQ1MsSUFBSSxDQUN0QjtZQUFFQyxPQUFPO1FBQXlCLEdBQ2xDO1lBQUVDLFFBQVE7UUFBSTtJQUVsQjtBQUNGIiwic291cmNlcyI6WyIvaG9tZS9zYWNoaW4vRGVza3RvcC9Gb3JtYXRGdXNpb24tbWFpbi9Gb3JtYXRGdXNpb24tbWFpbi9hcHAvYXBpL3Jhem9ycGF5L2NyZWF0ZS1vcmRlci9yb3V0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0UmVxdWVzdCwgTmV4dFJlc3BvbnNlIH0gZnJvbSAnbmV4dC9zZXJ2ZXInO1xuaW1wb3J0IHsgZ2V0U2VydmVyU2Vzc2lvbiB9IGZyb20gJ25leHQtYXV0aCc7XG5pbXBvcnQgeyBhdXRoT3B0aW9ucyB9IGZyb20gJ0AvbGliL2F1dGgnO1xuaW1wb3J0IHsgY3JlYXRlT3JkZXIsIFBMQU5TIH0gZnJvbSAnQC9saWIvcmF6b3JwYXknO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gUE9TVChyZXE6IE5leHRSZXF1ZXN0KSB7XG4gIHRyeSB7XG4gICAgLy8gVmFsaWRhdGUgc2Vzc2lvblxuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBnZXRTZXJ2ZXJTZXNzaW9uKGF1dGhPcHRpb25zKTtcbiAgICBpZiAoIXNlc3Npb24gfHwgIXNlc3Npb24udXNlcikge1xuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6ICdVbmF1dGhvcml6ZWQnIH0sIHsgc3RhdHVzOiA0MDEgfSk7XG4gICAgfVxuXG4gICAgY29uc3QgYm9keSA9IGF3YWl0IHJlcS5qc29uKCk7XG4gICAgY29uc3QgeyBwbGFuSWQsIGFtb3VudCB9ID0gYm9keTtcblxuICAgIGlmICghcGxhbklkKSB7XG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogJ01pc3NpbmcgcGxhbklkJyB9LCB7IHN0YXR1czogNDAwIH0pO1xuICAgIH1cblxuICAgIC8vIFZhbGlkYXRlIHBsYW5JZCBhbmQgZ2V0IHNlcnZlci1zaWRlIGFtb3VudFxuICAgIGNvbnN0IHZhbGlkUGxhbnMgPSBbJ2Jhc2ljJywgJ3ByZW1pdW0nXTtcbiAgICBpZiAoIXZhbGlkUGxhbnMuaW5jbHVkZXMocGxhbklkKSkge1xuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6ICdJbnZhbGlkIHBsYW4gc2VsZWN0ZWQnIH0sIHsgc3RhdHVzOiA0MDAgfSk7XG4gICAgfVxuXG4gICAgY29uc3QgcGxhbiA9IFBMQU5TW3BsYW5JZCBhcyBrZXlvZiB0eXBlb2YgUExBTlNdO1xuICAgIGlmICghcGxhbikge1xuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6ICdQbGFuIG5vdCBmb3VuZCcgfSwgeyBzdGF0dXM6IDQwMCB9KTtcbiAgICB9XG5cbiAgICAvLyBTZXJ2ZXItc2lkZSBhbW91bnQgY2FsY3VsYXRpb24gd2l0aCBtaW5pbXVtIGVuZm9yY2VtZW50XG4gICAgY29uc3Qgc2FmZUFtb3VudCA9IE1hdGgubWF4KHBsYW4uYW1vdW50LCAxMDApOyAvLyBFbmZvcmNlIElOUiBtaW5pbXVtIG9mIOKCuTEuMDAgKDEwMCBwYWlzZSlcblxuICAgICAgICAvLyBDcmVhdGUgb3JkZXIgd2l0aCBzaG9ydCByZWNlaXB0IChSYXpvcnBheSBsaW1pdDogNDAgY2hhcnMpXG4gICAgY29uc3QgdGltZXN0YW1wID0gRGF0ZS5ub3coKS50b1N0cmluZygpLnNsaWNlKC04KTtcbiAgICBjb25zdCByZWNlaXB0ID0gYHJjcHRfJHt0aW1lc3RhbXB9YDtcblxuICAgIGNvbnN0IG9yZGVyID0gYXdhaXQgY3JlYXRlT3JkZXIoc2FmZUFtb3VudCwgJ0lOUicsIHJlY2VpcHQpO1xuXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHtcbiAgICAgIGlkOiBvcmRlci5pZCxcbiAgYW1vdW50OiBvcmRlci5hbW91bnQsXG4gICAgICBjdXJyZW5jeTogb3JkZXIuY3VycmVuY3ksXG4gICAgfSk7XG5cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKCdFcnJvciBjcmVhdGluZyBSYXpvcnBheSBvcmRlcjonLCBlcnJvcik7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxuICAgICAgeyBlcnJvcjogJ0ZhaWxlZCB0byBjcmVhdGUgb3JkZXInIH0sXG4gICAgICB7IHN0YXR1czogNTAwIH1cbiAgICApO1xuICB9XG59XG4iXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwiZ2V0U2VydmVyU2Vzc2lvbiIsImF1dGhPcHRpb25zIiwiY3JlYXRlT3JkZXIiLCJQTEFOUyIsIlBPU1QiLCJyZXEiLCJzZXNzaW9uIiwidXNlciIsImpzb24iLCJlcnJvciIsInN0YXR1cyIsImJvZHkiLCJwbGFuSWQiLCJhbW91bnQiLCJ2YWxpZFBsYW5zIiwiaW5jbHVkZXMiLCJwbGFuIiwic2FmZUFtb3VudCIsIk1hdGgiLCJtYXgiLCJ0aW1lc3RhbXAiLCJEYXRlIiwibm93IiwidG9TdHJpbmciLCJzbGljZSIsInJlY2VpcHQiLCJvcmRlciIsImlkIiwiY3VycmVuY3kiLCJjb25zb2xlIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/razorpay/create-order/route.ts\n");

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

/***/ "(rsc)/./lib/razorpay.ts":
/*!*************************!*\
  !*** ./lib/razorpay.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   PLANS: () => (/* binding */ PLANS),\n/* harmony export */   createOrder: () => (/* binding */ createOrder),\n/* harmony export */   razorpayInstance: () => (/* binding */ razorpayInstance),\n/* harmony export */   verifyPaymentSignature: () => (/* binding */ verifyPaymentSignature)\n/* harmony export */ });\n/* harmony import */ var razorpay__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! razorpay */ \"(rsc)/./node_modules/razorpay/dist/razorpay.js\");\n/* harmony import */ var razorpay__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(razorpay__WEBPACK_IMPORTED_MODULE_0__);\n\n// Get environment variables\nconst RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID;\nconst RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;\nif (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {\n    throw new Error('Razorpay credentials are not set in environment variables');\n}\n// Initialize Razorpay instance (following official docs)\nconst razorpayInstance = new (razorpay__WEBPACK_IMPORTED_MODULE_0___default())({\n    key_id: RAZORPAY_KEY_ID,\n    key_secret: RAZORPAY_KEY_SECRET\n});\n// Plan configurations with exact amounts in paise\nconst PLANS = {\n    basic: {\n        name: 'Basic Plan',\n        amount: 100,\n        currency: 'INR',\n        description: 'Unlimited conversions with priority support'\n    },\n    premium: {\n        name: 'Premium Plan',\n        amount: 199,\n        currency: 'INR',\n        description: 'Everything in Basic + Batch processing + API access'\n    }\n};\n// Utility function to create orders (following Razorpay docs pattern)\nconst createOrder = async (amount, currency = 'INR', receipt)=>{\n    const options = {\n        amount: amount,\n        currency,\n        receipt: receipt || `rcpt_${Date.now().toString().slice(-8)}`\n    };\n    return await razorpayInstance.orders.create(options);\n};\n// Utility to verify payment signature\nconst verifyPaymentSignature = (razorpayOrderId, razorpayPaymentId, razorpaySignature)=>{\n    try {\n        // eslint-disable-next-line @typescript-eslint/no-require-imports\n        const crypto = __webpack_require__(/*! crypto */ \"crypto\");\n        const body = razorpayOrderId + '|' + razorpayPaymentId;\n        const expectedSignature = crypto.createHmac('sha256', RAZORPAY_KEY_SECRET).update(body.toString()).digest('hex');\n        return expectedSignature === razorpaySignature;\n    } catch (error) {\n        console.error('Error verifying payment signature:', error);\n        return false;\n    }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvcmF6b3JwYXkudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQWdDO0FBRWhDLDRCQUE0QjtBQUM1QixNQUFNQyxrQkFBa0JDLFFBQVFDLEdBQUcsQ0FBQ0YsZUFBZTtBQUNuRCxNQUFNRyxzQkFBc0JGLFFBQVFDLEdBQUcsQ0FBQ0MsbUJBQW1CO0FBRTNELElBQUksQ0FBQ0gsbUJBQW1CLENBQUNHLHFCQUFxQjtJQUM1QyxNQUFNLElBQUlDLE1BQU07QUFDbEI7QUFFQSx5REFBeUQ7QUFDbEQsTUFBTUMsbUJBQW1CLElBQUlOLGlEQUFRQSxDQUFDO0lBQzNDTyxRQUFRTjtJQUNSTyxZQUFZSjtBQUNkLEdBQUc7QUFFSCxrREFBa0Q7QUFDM0MsTUFBTUssUUFBUTtJQUNuQkMsT0FBTztRQUNMQyxNQUFNO1FBQ05DLFFBQVE7UUFDUkMsVUFBVTtRQUNWQyxhQUFhO0lBQ2Y7SUFDQUMsU0FBUztRQUNQSixNQUFNO1FBQ05DLFFBQVE7UUFDUkMsVUFBVTtRQUNWQyxhQUFhO0lBQ2Y7QUFDRixFQUFFO0FBRUYsc0VBQXNFO0FBQy9ELE1BQU1FLGNBQWMsT0FBT0osUUFBZ0JDLFdBQVcsS0FBSyxFQUFFSTtJQUNsRSxNQUFNQyxVQUFVO1FBQ2ROLFFBQVFBO1FBQ1JDO1FBQ0FJLFNBQVNBLFdBQVcsQ0FBQyxLQUFLLEVBQUVFLEtBQUtDLEdBQUcsR0FBR0MsUUFBUSxHQUFHQyxLQUFLLENBQUMsQ0FBQyxJQUFJO0lBQy9EO0lBRUEsT0FBTyxNQUFNaEIsaUJBQWlCaUIsTUFBTSxDQUFDQyxNQUFNLENBQUNOO0FBQzlDLEVBQUU7QUFFRixzQ0FBc0M7QUFDL0IsTUFBTU8seUJBQXlCLENBQ3BDQyxpQkFDQUMsbUJBQ0FDO0lBRUEsSUFBSTtRQUNGLGlFQUFpRTtRQUNqRSxNQUFNQyxTQUFTQyxtQkFBT0EsQ0FBQyxzQkFBUTtRQUUvQixNQUFNQyxPQUFPTCxrQkFBa0IsTUFBTUM7UUFDckMsTUFBTUssb0JBQW9CSCxPQUN2QkksVUFBVSxDQUFDLFVBQVU3QixxQkFDckI4QixNQUFNLENBQUNILEtBQUtWLFFBQVEsSUFDcEJjLE1BQU0sQ0FBQztRQUVWLE9BQU9ILHNCQUFzQko7SUFDL0IsRUFBRSxPQUFPUSxPQUFPO1FBQ2RDLFFBQVFELEtBQUssQ0FBQyxzQ0FBc0NBO1FBQ3BELE9BQU87SUFDVDtBQUNGLEVBQUUiLCJzb3VyY2VzIjpbIi9ob21lL3NhY2hpbi9EZXNrdG9wL0Zvcm1hdEZ1c2lvbi1tYWluL0Zvcm1hdEZ1c2lvbi1tYWluL2xpYi9yYXpvcnBheS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmF6b3JwYXkgZnJvbSAncmF6b3JwYXknO1xuXG4vLyBHZXQgZW52aXJvbm1lbnQgdmFyaWFibGVzXG5jb25zdCBSQVpPUlBBWV9LRVlfSUQgPSBwcm9jZXNzLmVudi5SQVpPUlBBWV9LRVlfSUQ7XG5jb25zdCBSQVpPUlBBWV9LRVlfU0VDUkVUID0gcHJvY2Vzcy5lbnYuUkFaT1JQQVlfS0VZX1NFQ1JFVDtcblxuaWYgKCFSQVpPUlBBWV9LRVlfSUQgfHwgIVJBWk9SUEFZX0tFWV9TRUNSRVQpIHtcbiAgdGhyb3cgbmV3IEVycm9yKCdSYXpvcnBheSBjcmVkZW50aWFscyBhcmUgbm90IHNldCBpbiBlbnZpcm9ubWVudCB2YXJpYWJsZXMnKTtcbn1cblxuLy8gSW5pdGlhbGl6ZSBSYXpvcnBheSBpbnN0YW5jZSAoZm9sbG93aW5nIG9mZmljaWFsIGRvY3MpXG5leHBvcnQgY29uc3QgcmF6b3JwYXlJbnN0YW5jZSA9IG5ldyBSYXpvcnBheSh7XG4gIGtleV9pZDogUkFaT1JQQVlfS0VZX0lEISxcbiAga2V5X3NlY3JldDogUkFaT1JQQVlfS0VZX1NFQ1JFVCEsXG59KTtcblxuLy8gUGxhbiBjb25maWd1cmF0aW9ucyB3aXRoIGV4YWN0IGFtb3VudHMgaW4gcGFpc2VcbmV4cG9ydCBjb25zdCBQTEFOUyA9IHtcbiAgYmFzaWM6IHtcbiAgICBuYW1lOiAnQmFzaWMgUGxhbicsXG4gICAgYW1vdW50OiAxMDAsIC8vIOKCuTEuMDAgaW4gcGFpc2VcbiAgICBjdXJyZW5jeTogJ0lOUicsXG4gICAgZGVzY3JpcHRpb246ICdVbmxpbWl0ZWQgY29udmVyc2lvbnMgd2l0aCBwcmlvcml0eSBzdXBwb3J0JyxcbiAgfSxcbiAgcHJlbWl1bToge1xuICAgIG5hbWU6ICdQcmVtaXVtIFBsYW4nLCBcbiAgICBhbW91bnQ6IDE5OSwgLy8g4oK5MS45OSBpbiBwYWlzZVxuICAgIGN1cnJlbmN5OiAnSU5SJyxcbiAgICBkZXNjcmlwdGlvbjogJ0V2ZXJ5dGhpbmcgaW4gQmFzaWMgKyBCYXRjaCBwcm9jZXNzaW5nICsgQVBJIGFjY2VzcycsXG4gIH0sXG59O1xuXG4vLyBVdGlsaXR5IGZ1bmN0aW9uIHRvIGNyZWF0ZSBvcmRlcnMgKGZvbGxvd2luZyBSYXpvcnBheSBkb2NzIHBhdHRlcm4pXG5leHBvcnQgY29uc3QgY3JlYXRlT3JkZXIgPSBhc3luYyAoYW1vdW50OiBudW1iZXIsIGN1cnJlbmN5ID0gJ0lOUicsIHJlY2VpcHQ/OiBzdHJpbmcpID0+IHtcbiAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICBhbW91bnQ6IGFtb3VudCwgLy8gYW1vdW50IGluIHBhaXNlXG4gICAgY3VycmVuY3ksXG4gICAgcmVjZWlwdDogcmVjZWlwdCB8fCBgcmNwdF8ke0RhdGUubm93KCkudG9TdHJpbmcoKS5zbGljZSgtOCl9YCwgLy8gTWF4IDQwIGNoYXJzXG4gIH07XG5cbiAgcmV0dXJuIGF3YWl0IHJhem9ycGF5SW5zdGFuY2Uub3JkZXJzLmNyZWF0ZShvcHRpb25zKTtcbn07XG5cbi8vIFV0aWxpdHkgdG8gdmVyaWZ5IHBheW1lbnQgc2lnbmF0dXJlXG5leHBvcnQgY29uc3QgdmVyaWZ5UGF5bWVudFNpZ25hdHVyZSA9IChcbiAgcmF6b3JwYXlPcmRlcklkOiBzdHJpbmcsXG4gIHJhem9ycGF5UGF5bWVudElkOiBzdHJpbmcsXG4gIHJhem9ycGF5U2lnbmF0dXJlOiBzdHJpbmdcbik6IGJvb2xlYW4gPT4ge1xuICB0cnkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tcmVxdWlyZS1pbXBvcnRzXG4gICAgY29uc3QgY3J5cHRvID0gcmVxdWlyZSgnY3J5cHRvJyk7XG4gICAgXG4gICAgY29uc3QgYm9keSA9IHJhem9ycGF5T3JkZXJJZCArICd8JyArIHJhem9ycGF5UGF5bWVudElkO1xuICAgIGNvbnN0IGV4cGVjdGVkU2lnbmF0dXJlID0gY3J5cHRvXG4gICAgICAuY3JlYXRlSG1hYygnc2hhMjU2JywgUkFaT1JQQVlfS0VZX1NFQ1JFVCEpXG4gICAgICAudXBkYXRlKGJvZHkudG9TdHJpbmcoKSlcbiAgICAgIC5kaWdlc3QoJ2hleCcpO1xuXG4gICAgcmV0dXJuIGV4cGVjdGVkU2lnbmF0dXJlID09PSByYXpvcnBheVNpZ25hdHVyZTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKCdFcnJvciB2ZXJpZnlpbmcgcGF5bWVudCBzaWduYXR1cmU6JywgZXJyb3IpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufTsiXSwibmFtZXMiOlsiUmF6b3JwYXkiLCJSQVpPUlBBWV9LRVlfSUQiLCJwcm9jZXNzIiwiZW52IiwiUkFaT1JQQVlfS0VZX1NFQ1JFVCIsIkVycm9yIiwicmF6b3JwYXlJbnN0YW5jZSIsImtleV9pZCIsImtleV9zZWNyZXQiLCJQTEFOUyIsImJhc2ljIiwibmFtZSIsImFtb3VudCIsImN1cnJlbmN5IiwiZGVzY3JpcHRpb24iLCJwcmVtaXVtIiwiY3JlYXRlT3JkZXIiLCJyZWNlaXB0Iiwib3B0aW9ucyIsIkRhdGUiLCJub3ciLCJ0b1N0cmluZyIsInNsaWNlIiwib3JkZXJzIiwiY3JlYXRlIiwidmVyaWZ5UGF5bWVudFNpZ25hdHVyZSIsInJhem9ycGF5T3JkZXJJZCIsInJhem9ycGF5UGF5bWVudElkIiwicmF6b3JwYXlTaWduYXR1cmUiLCJjcnlwdG8iLCJyZXF1aXJlIiwiYm9keSIsImV4cGVjdGVkU2lnbmF0dXJlIiwiY3JlYXRlSG1hYyIsInVwZGF0ZSIsImRpZ2VzdCIsImVycm9yIiwiY29uc29sZSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./lib/razorpay.ts\n");

/***/ }),

/***/ "(rsc)/./models/User.ts":
/*!************************!*\
  !*** ./models/User.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   User: () => (/* binding */ User),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bcryptjs */ \"(rsc)/./node_modules/bcryptjs/index.js\");\n\n\nconst userSchema = new mongoose__WEBPACK_IMPORTED_MODULE_0__.Schema({\n    email: {\n        type: String,\n        required: true,\n        unique: true\n    },\n    password: {\n        type: String,\n        required: true\n    },\n    subscriptionStatus: {\n        type: String,\n        enum: [\n            'free',\n            'active',\n            'expired',\n            'cancelled'\n        ],\n        default: 'free'\n    },\n    subscriptionPlan: {\n        type: String,\n        enum: [\n            'free',\n            'basic',\n            'premium'\n        ],\n        default: 'free'\n    },\n    subscriptionCurrentPeriodEnd: {\n        type: Date\n    },\n    subscriptionId: {\n        type: String\n    },\n    stripeCustomerId: {\n        type: String\n    }\n}, {\n    timestamps: true\n});\nuserSchema.pre(\"save\", async function(next) {\n    if (this.isModified(\"password\")) {\n        this.password = await bcryptjs__WEBPACK_IMPORTED_MODULE_1__[\"default\"].hash(this.password, 10);\n    }\n    next();\n});\nconst User = mongoose__WEBPACK_IMPORTED_MODULE_0__.models?.User || (0,mongoose__WEBPACK_IMPORTED_MODULE_0__.model)(\"User\", userSchema);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (User);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9tb2RlbHMvVXNlci50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUEyRDtBQUM3QjtBQWlCOUIsTUFBTUksYUFBYSxJQUFJSiw0Q0FBTUEsQ0FDekI7SUFDSUssT0FBTztRQUFFQyxNQUFNQztRQUFRQyxVQUFVO1FBQU1DLFFBQVE7SUFBSztJQUNwREMsVUFBVTtRQUFFSixNQUFNQztRQUFRQyxVQUFVO0lBQUs7SUFDekNHLG9CQUFvQjtRQUNoQkwsTUFBTUM7UUFDTkssTUFBTTtZQUFDO1lBQVE7WUFBVTtZQUFXO1NBQVk7UUFDaERDLFNBQVM7SUFDYjtJQUNBQyxrQkFBa0I7UUFDZFIsTUFBTUM7UUFDTkssTUFBTTtZQUFDO1lBQVE7WUFBUztTQUFVO1FBQ2xDQyxTQUFTO0lBQ2I7SUFDQUUsOEJBQThCO1FBQUVULE1BQU1VO0lBQUs7SUFDM0NDLGdCQUFnQjtRQUFFWCxNQUFNQztJQUFPO0lBQy9CVyxrQkFBa0I7UUFBRVosTUFBTUM7SUFBTztBQUNyQyxHQUNBO0lBQ0lZLFlBQVk7QUFDaEI7QUFHSmYsV0FBV2dCLEdBQUcsQ0FBQyxRQUFRLGVBQWdCQyxJQUFJO0lBQ3ZDLElBQUcsSUFBSSxDQUFDQyxVQUFVLENBQUMsYUFBWTtRQUMzQixJQUFLLENBQVNaLFFBQVEsR0FBRyxNQUFNUCxxREFBVyxDQUFDLElBQUssQ0FBU08sUUFBUSxFQUFFO0lBQ3ZFO0lBQ0FXO0FBQ0o7QUFFTyxNQUFNRyxPQUFPdEIsNENBQU1BLEVBQUVzQixRQUFRdkIsK0NBQUtBLENBQVEsUUFBUUcsWUFBWTtBQUVyRSxpRUFBZW9CLElBQUlBLEVBQUMiLCJzb3VyY2VzIjpbIi9ob21lL3NhY2hpbi9EZXNrdG9wL0Zvcm1hdEZ1c2lvbi1tYWluL0Zvcm1hdEZ1c2lvbi1tYWluL21vZGVscy9Vc2VyLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtb25nb29zZSwgeyBTY2hlbWEsIG1vZGVsLCBtb2RlbHMgfSBmcm9tIFwibW9uZ29vc2VcIjtcbmltcG9ydCBiY3J5cHQgZnJvbSBcImJjcnlwdGpzXCI7XG5cblxuXG5leHBvcnQgaW50ZXJmYWNlIElVc2VyIHtcbiAgICBlbWFpbDogc3RyaW5nO1xuICAgIHBhc3N3b3JkOiBzdHJpbmc7XG4gICAgc3Vic2NyaXB0aW9uU3RhdHVzPzogJ2ZyZWUnIHwgJ2FjdGl2ZScgfCAnZXhwaXJlZCcgfCAnY2FuY2VsbGVkJztcbiAgICBzdWJzY3JpcHRpb25QbGFuPzogJ2ZyZWUnIHwgJ2Jhc2ljJyB8ICdwcmVtaXVtJztcbiAgICBzdWJzY3JpcHRpb25DdXJyZW50UGVyaW9kRW5kPzogRGF0ZTtcbiAgICBzdWJzY3JpcHRpb25JZD86IHN0cmluZztcbiAgICBzdHJpcGVDdXN0b21lcklkPzogc3RyaW5nO1xuICAgIF9pZD86IG1vbmdvb3NlLlR5cGVzLk9iamVjdElkO1xuICAgIGNyZWF0ZWRBdD86IERhdGU7XG4gICAgdXBkYXRlZEF0PzogRGF0ZTtcbn1cblxuY29uc3QgdXNlclNjaGVtYSA9IG5ldyBTY2hlbWE8SVVzZXI+KFxuICAgIHtcbiAgICAgICAgZW1haWw6IHsgdHlwZTogU3RyaW5nLCByZXF1aXJlZDogdHJ1ZSwgdW5pcXVlOiB0cnVlIH0sXG4gICAgICAgIHBhc3N3b3JkOiB7IHR5cGU6IFN0cmluZywgcmVxdWlyZWQ6IHRydWUgfSxcbiAgICAgICAgc3Vic2NyaXB0aW9uU3RhdHVzOiB7XG4gICAgICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgICAgICBlbnVtOiBbJ2ZyZWUnLCAnYWN0aXZlJywgJ2V4cGlyZWQnLCAnY2FuY2VsbGVkJ10sXG4gICAgICAgICAgICBkZWZhdWx0OiAnZnJlZSdcbiAgICAgICAgfSxcbiAgICAgICAgc3Vic2NyaXB0aW9uUGxhbjoge1xuICAgICAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgICAgICAgZW51bTogWydmcmVlJywgJ2Jhc2ljJywgJ3ByZW1pdW0nXSxcbiAgICAgICAgICAgIGRlZmF1bHQ6ICdmcmVlJ1xuICAgICAgICB9LFxuICAgICAgICBzdWJzY3JpcHRpb25DdXJyZW50UGVyaW9kRW5kOiB7IHR5cGU6IERhdGUgfSxcbiAgICAgICAgc3Vic2NyaXB0aW9uSWQ6IHsgdHlwZTogU3RyaW5nIH0sXG4gICAgICAgIHN0cmlwZUN1c3RvbWVySWQ6IHsgdHlwZTogU3RyaW5nIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHRpbWVzdGFtcHM6IHRydWVcbiAgICB9XG4pXG5cbnVzZXJTY2hlbWEucHJlKFwic2F2ZVwiLCBhc3luYyBmdW5jdGlvbiAobmV4dCkge1xuICAgIGlmKHRoaXMuaXNNb2RpZmllZChcInBhc3N3b3JkXCIpKXtcbiAgICAgICAgKHRoaXMgYXMgYW55KS5wYXNzd29yZCA9IGF3YWl0IGJjcnlwdC5oYXNoKCh0aGlzIGFzIGFueSkucGFzc3dvcmQsIDEwKTtcbiAgICB9XG4gICAgbmV4dCgpO1xufSk7XG5cbmV4cG9ydCBjb25zdCBVc2VyID0gbW9kZWxzPy5Vc2VyIHx8IG1vZGVsPElVc2VyPihcIlVzZXJcIiwgdXNlclNjaGVtYSk7XG5cbmV4cG9ydCBkZWZhdWx0IFVzZXI7XG4iXSwibmFtZXMiOlsiU2NoZW1hIiwibW9kZWwiLCJtb2RlbHMiLCJiY3J5cHQiLCJ1c2VyU2NoZW1hIiwiZW1haWwiLCJ0eXBlIiwiU3RyaW5nIiwicmVxdWlyZWQiLCJ1bmlxdWUiLCJwYXNzd29yZCIsInN1YnNjcmlwdGlvblN0YXR1cyIsImVudW0iLCJkZWZhdWx0Iiwic3Vic2NyaXB0aW9uUGxhbiIsInN1YnNjcmlwdGlvbkN1cnJlbnRQZXJpb2RFbmQiLCJEYXRlIiwic3Vic2NyaXB0aW9uSWQiLCJzdHJpcGVDdXN0b21lcklkIiwidGltZXN0YW1wcyIsInByZSIsIm5leHQiLCJpc01vZGlmaWVkIiwiaGFzaCIsIlVzZXIiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./models/User.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Frazorpay%2Fcreate-order%2Froute&page=%2Fapi%2Frazorpay%2Fcreate-order%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Frazorpay%2Fcreate-order%2Froute.ts&appDir=%2Fhome%2Fsachin%2FDesktop%2FFormatFusion-main%2FFormatFusion-main%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fsachin%2FDesktop%2FFormatFusion-main%2FFormatFusion-main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Frazorpay%2Fcreate-order%2Froute&page=%2Fapi%2Frazorpay%2Fcreate-order%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Frazorpay%2Fcreate-order%2Froute.ts&appDir=%2Fhome%2Fsachin%2FDesktop%2FFormatFusion-main%2FFormatFusion-main%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fsachin%2FDesktop%2FFormatFusion-main%2FFormatFusion-main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _home_sachin_Desktop_FormatFusion_main_FormatFusion_main_app_api_razorpay_create_order_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/razorpay/create-order/route.ts */ \"(rsc)/./app/api/razorpay/create-order/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/razorpay/create-order/route\",\n        pathname: \"/api/razorpay/create-order\",\n        filename: \"route\",\n        bundlePath: \"app/api/razorpay/create-order/route\"\n    },\n    resolvedPagePath: \"/home/sachin/Desktop/FormatFusion-main/FormatFusion-main/app/api/razorpay/create-order/route.ts\",\n    nextConfigOutput,\n    userland: _home_sachin_Desktop_FormatFusion_main_FormatFusion_main_app_api_razorpay_create_order_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZyYXpvcnBheSUyRmNyZWF0ZS1vcmRlciUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGcmF6b3JwYXklMkZjcmVhdGUtb3JkZXIlMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZyYXpvcnBheSUyRmNyZWF0ZS1vcmRlciUyRnJvdXRlLnRzJmFwcERpcj0lMkZob21lJTJGc2FjaGluJTJGRGVza3RvcCUyRkZvcm1hdEZ1c2lvbi1tYWluJTJGRm9ybWF0RnVzaW9uLW1haW4lMkZhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPSUyRmhvbWUlMkZzYWNoaW4lMkZEZXNrdG9wJTJGRm9ybWF0RnVzaW9uLW1haW4lMkZGb3JtYXRGdXNpb24tbWFpbiZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBK0Y7QUFDdkM7QUFDcUI7QUFDK0M7QUFDNUg7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlHQUFtQjtBQUMzQztBQUNBLGNBQWMsa0VBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzREFBc0Q7QUFDOUQ7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDMEY7O0FBRTFGIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIi9ob21lL3NhY2hpbi9EZXNrdG9wL0Zvcm1hdEZ1c2lvbi1tYWluL0Zvcm1hdEZ1c2lvbi1tYWluL2FwcC9hcGkvcmF6b3JwYXkvY3JlYXRlLW9yZGVyL3JvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9yYXpvcnBheS9jcmVhdGUtb3JkZXIvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9yYXpvcnBheS9jcmVhdGUtb3JkZXJcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL3Jhem9ycGF5L2NyZWF0ZS1vcmRlci9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIi9ob21lL3NhY2hpbi9EZXNrdG9wL0Zvcm1hdEZ1c2lvbi1tYWluL0Zvcm1hdEZ1c2lvbi1tYWluL2FwcC9hcGkvcmF6b3JwYXkvY3JlYXRlLW9yZGVyL3JvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Frazorpay%2Fcreate-order%2Froute&page=%2Fapi%2Frazorpay%2Fcreate-order%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Frazorpay%2Fcreate-order%2Froute.ts&appDir=%2Fhome%2Fsachin%2FDesktop%2FFormatFusion-main%2FFormatFusion-main%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fsachin%2FDesktop%2FFormatFusion-main%2FFormatFusion-main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

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

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("querystring");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "tty":
/*!**********************!*\
  !*** external "tty" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("tty");

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
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/jose","vendor-chunks/openid-client","vendor-chunks/bcryptjs","vendor-chunks/oauth","vendor-chunks/lru-cache","vendor-chunks/object-hash","vendor-chunks/preact","vendor-chunks/uuid","vendor-chunks/preact-render-to-string","vendor-chunks/cookie","vendor-chunks/oidc-token-hash","vendor-chunks/@panva","vendor-chunks/razorpay","vendor-chunks/asynckit","vendor-chunks/math-intrinsics","vendor-chunks/es-errors","vendor-chunks/call-bind-apply-helpers","vendor-chunks/debug","vendor-chunks/get-proto","vendor-chunks/axios","vendor-chunks/mime-db","vendor-chunks/has-symbols","vendor-chunks/gopd","vendor-chunks/function-bind","vendor-chunks/follow-redirects","vendor-chunks/supports-color","vendor-chunks/proxy-from-env","vendor-chunks/ms","vendor-chunks/mime-types","vendor-chunks/hasown","vendor-chunks/has-tostringtag","vendor-chunks/has-flag","vendor-chunks/get-intrinsic","vendor-chunks/es-set-tostringtag","vendor-chunks/es-object-atoms","vendor-chunks/es-define-property","vendor-chunks/dunder-proto","vendor-chunks/delayed-stream","vendor-chunks/combined-stream"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Frazorpay%2Fcreate-order%2Froute&page=%2Fapi%2Frazorpay%2Fcreate-order%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Frazorpay%2Fcreate-order%2Froute.ts&appDir=%2Fhome%2Fsachin%2FDesktop%2FFormatFusion-main%2FFormatFusion-main%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fsachin%2FDesktop%2FFormatFusion-main%2FFormatFusion-main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();