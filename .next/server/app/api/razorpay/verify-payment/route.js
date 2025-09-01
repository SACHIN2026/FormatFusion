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
exports.id = "app/api/razorpay/verify-payment/route";
exports.ids = ["app/api/razorpay/verify-payment/route"];
exports.modules = {

/***/ "(rsc)/./app/api/razorpay/verify-payment/route.ts":
/*!**************************************************!*\
  !*** ./app/api/razorpay/verify-payment/route.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/auth */ \"(rsc)/./lib/auth.ts\");\n/* harmony import */ var _lib_razorpay__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/lib/razorpay */ \"(rsc)/./lib/razorpay.ts\");\n/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/lib/db */ \"(rsc)/./lib/db.ts\");\n/* harmony import */ var _models_User__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/models/User */ \"(rsc)/./models/User.ts\");\n\n\n\n\n\n\nasync function POST(req) {\n    try {\n        const session = await (0,next_auth__WEBPACK_IMPORTED_MODULE_1__.getServerSession)(_lib_auth__WEBPACK_IMPORTED_MODULE_2__.authOptions);\n        if (!session || !session.user || !session.user.email) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: 'Unauthorized'\n            }, {\n                status: 401\n            });\n        }\n        const body = await req.json();\n        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, planId } = body;\n        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !planId) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: 'Missing required fields'\n            }, {\n                status: 400\n            });\n        }\n        // Verify payment signature\n        const isValid = (0,_lib_razorpay__WEBPACK_IMPORTED_MODULE_3__.verifyPaymentSignature)(razorpay_order_id, razorpay_payment_id, razorpay_signature);\n        if (!isValid) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: 'Invalid payment signature'\n            }, {\n                status: 400\n            });\n        }\n        // Update user subscription in database\n        await (0,_lib_db__WEBPACK_IMPORTED_MODULE_4__.dbconnect)();\n        const currentDate = new Date();\n        const nextMonthDate = new Date();\n        nextMonthDate.setMonth(currentDate.getMonth() + 1);\n        const user = await _models_User__WEBPACK_IMPORTED_MODULE_5__[\"default\"].findOneAndUpdate({\n            email: session.user.email\n        }, {\n            $set: {\n                subscriptionStatus: 'active',\n                subscriptionPlan: planId,\n                subscriptionCurrentPeriodEnd: nextMonthDate,\n                subscriptionId: razorpay_order_id,\n                stripeCustomerId: razorpay_payment_id\n            }\n        }, {\n            new: true,\n            upsert: true\n        });\n        if (!user) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: 'Failed to update user subscription'\n            }, {\n                status: 500\n            });\n        }\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: true,\n            message: 'Payment verified and subscription updated successfully',\n            subscription: {\n                status: user.subscriptionStatus,\n                plan: user.subscriptionPlan,\n                currentPeriodEnd: user.subscriptionCurrentPeriodEnd\n            }\n        });\n    } catch (error) {\n        console.error('Error verifying payment:', error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: 'Internal server error'\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3Jhem9ycGF5L3ZlcmlmeS1wYXltZW50L3JvdXRlLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQXdEO0FBQ1g7QUFDSjtBQUNlO0FBQ25CO0FBQ0o7QUFFMUIsZUFBZU0sS0FBS0MsR0FBZ0I7SUFDekMsSUFBSTtRQUNGLE1BQU1DLFVBQVUsTUFBTVAsMkRBQWdCQSxDQUFDQyxrREFBV0E7UUFFbEQsSUFBSSxDQUFDTSxXQUFXLENBQUNBLFFBQVFDLElBQUksSUFBSSxDQUFDRCxRQUFRQyxJQUFJLENBQUNDLEtBQUssRUFBRTtZQUNwRCxPQUFPVixxREFBWUEsQ0FBQ1csSUFBSSxDQUFDO2dCQUFFQyxPQUFPO1lBQWUsR0FBRztnQkFBRUMsUUFBUTtZQUFJO1FBQ3BFO1FBRUEsTUFBTUMsT0FBTyxNQUFNUCxJQUFJSSxJQUFJO1FBQzNCLE1BQU0sRUFDSkksaUJBQWlCLEVBQ2pCQyxtQkFBbUIsRUFDbkJDLGtCQUFrQixFQUNsQkMsTUFBTSxFQUNQLEdBQUdKO1FBRUosSUFBSSxDQUFDQyxxQkFBcUIsQ0FBQ0MsdUJBQXVCLENBQUNDLHNCQUFzQixDQUFDQyxRQUFRO1lBQ2hGLE9BQU9sQixxREFBWUEsQ0FBQ1csSUFBSSxDQUFDO2dCQUFFQyxPQUFPO1lBQTBCLEdBQUc7Z0JBQUVDLFFBQVE7WUFBSTtRQUMvRTtRQUVBLDJCQUEyQjtRQUMzQixNQUFNTSxVQUFVaEIscUVBQXNCQSxDQUNwQ1ksbUJBQ0FDLHFCQUNBQztRQUdGLElBQUksQ0FBQ0UsU0FBUztZQUNaLE9BQU9uQixxREFBWUEsQ0FBQ1csSUFBSSxDQUN0QjtnQkFBRUMsT0FBTztZQUE0QixHQUNyQztnQkFBRUMsUUFBUTtZQUFJO1FBRWxCO1FBRUEsdUNBQXVDO1FBQ3ZDLE1BQU1ULGtEQUFTQTtRQUVmLE1BQU1nQixjQUFjLElBQUlDO1FBQ3hCLE1BQU1DLGdCQUFnQixJQUFJRDtRQUMxQkMsY0FBY0MsUUFBUSxDQUFDSCxZQUFZSSxRQUFRLEtBQUs7UUFFaEQsTUFBTWYsT0FBTyxNQUFNSixvREFBSUEsQ0FBQ29CLGdCQUFnQixDQUN0QztZQUFFZixPQUFPRixRQUFRQyxJQUFJLENBQUNDLEtBQUs7UUFBQyxHQUM1QjtZQUNFZ0IsTUFBTTtnQkFDSkMsb0JBQW9CO2dCQUNwQkMsa0JBQWtCVjtnQkFDbEJXLDhCQUE4QlA7Z0JBQzlCUSxnQkFBZ0JmO2dCQUNoQmdCLGtCQUFrQmY7WUFDcEI7UUFDRixHQUNBO1lBQUVnQixLQUFLO1lBQU1DLFFBQVE7UUFBSztRQUc1QixJQUFJLENBQUN4QixNQUFNO1lBQ1QsT0FBT1QscURBQVlBLENBQUNXLElBQUksQ0FDdEI7Z0JBQUVDLE9BQU87WUFBcUMsR0FDOUM7Z0JBQUVDLFFBQVE7WUFBSTtRQUVsQjtRQUVBLE9BQU9iLHFEQUFZQSxDQUFDVyxJQUFJLENBQUM7WUFDdkJ1QixTQUFTO1lBQ1RDLFNBQVM7WUFDVEMsY0FBYztnQkFDWnZCLFFBQVFKLEtBQUtrQixrQkFBa0I7Z0JBQy9CVSxNQUFNNUIsS0FBS21CLGdCQUFnQjtnQkFDM0JVLGtCQUFrQjdCLEtBQUtvQiw0QkFBNEI7WUFDckQ7UUFDRjtJQUVGLEVBQUUsT0FBT2pCLE9BQU87UUFDZDJCLFFBQVEzQixLQUFLLENBQUMsNEJBQTRCQTtRQUMxQyxPQUFPWixxREFBWUEsQ0FBQ1csSUFBSSxDQUN0QjtZQUFFQyxPQUFPO1FBQXdCLEdBQ2pDO1lBQUVDLFFBQVE7UUFBSTtJQUVsQjtBQUNGIiwic291cmNlcyI6WyIvaG9tZS9zYWNoaW4vRGVza3RvcC9Gb3JtYXRGdXNpb24tbWFpbi9Gb3JtYXRGdXNpb24tbWFpbi9hcHAvYXBpL3Jhem9ycGF5L3ZlcmlmeS1wYXltZW50L3JvdXRlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXF1ZXN0LCBOZXh0UmVzcG9uc2UgfSBmcm9tICduZXh0L3NlcnZlcic7XG5pbXBvcnQgeyBnZXRTZXJ2ZXJTZXNzaW9uIH0gZnJvbSAnbmV4dC1hdXRoJztcbmltcG9ydCB7IGF1dGhPcHRpb25zIH0gZnJvbSAnQC9saWIvYXV0aCc7XG5pbXBvcnQgeyB2ZXJpZnlQYXltZW50U2lnbmF0dXJlIH0gZnJvbSAnQC9saWIvcmF6b3JwYXknO1xuaW1wb3J0IHsgZGJjb25uZWN0IH0gZnJvbSAnQC9saWIvZGInO1xuaW1wb3J0IFVzZXIgZnJvbSAnQC9tb2RlbHMvVXNlcic7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQT1NUKHJlcTogTmV4dFJlcXVlc3QpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgZ2V0U2VydmVyU2Vzc2lvbihhdXRoT3B0aW9ucyk7XG5cbiAgICBpZiAoIXNlc3Npb24gfHwgIXNlc3Npb24udXNlciB8fCAhc2Vzc2lvbi51c2VyLmVtYWlsKSB7XG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogJ1VuYXV0aG9yaXplZCcgfSwgeyBzdGF0dXM6IDQwMSB9KTtcbiAgICB9XG5cbiAgICBjb25zdCBib2R5ID0gYXdhaXQgcmVxLmpzb24oKTtcbiAgICBjb25zdCB7IFxuICAgICAgcmF6b3JwYXlfb3JkZXJfaWQsIFxuICAgICAgcmF6b3JwYXlfcGF5bWVudF9pZCwgXG4gICAgICByYXpvcnBheV9zaWduYXR1cmUsIFxuICAgICAgcGxhbklkIFxuICAgIH0gPSBib2R5O1xuXG4gICAgaWYgKCFyYXpvcnBheV9vcmRlcl9pZCB8fCAhcmF6b3JwYXlfcGF5bWVudF9pZCB8fCAhcmF6b3JwYXlfc2lnbmF0dXJlIHx8ICFwbGFuSWQpIHtcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiAnTWlzc2luZyByZXF1aXJlZCBmaWVsZHMnIH0sIHsgc3RhdHVzOiA0MDAgfSk7XG4gICAgfVxuXG4gICAgLy8gVmVyaWZ5IHBheW1lbnQgc2lnbmF0dXJlXG4gICAgY29uc3QgaXNWYWxpZCA9IHZlcmlmeVBheW1lbnRTaWduYXR1cmUoXG4gICAgICByYXpvcnBheV9vcmRlcl9pZCxcbiAgICAgIHJhem9ycGF5X3BheW1lbnRfaWQsXG4gICAgICByYXpvcnBheV9zaWduYXR1cmVcbiAgICApO1xuXG4gICAgaWYgKCFpc1ZhbGlkKSB7XG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXG4gICAgICAgIHsgZXJyb3I6ICdJbnZhbGlkIHBheW1lbnQgc2lnbmF0dXJlJyB9LFxuICAgICAgICB7IHN0YXR1czogNDAwIH1cbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gVXBkYXRlIHVzZXIgc3Vic2NyaXB0aW9uIGluIGRhdGFiYXNlXG4gICAgYXdhaXQgZGJjb25uZWN0KCk7XG5cbiAgICBjb25zdCBjdXJyZW50RGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgY29uc3QgbmV4dE1vbnRoRGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgbmV4dE1vbnRoRGF0ZS5zZXRNb250aChjdXJyZW50RGF0ZS5nZXRNb250aCgpICsgMSk7XG5cbiAgICBjb25zdCB1c2VyID0gYXdhaXQgVXNlci5maW5kT25lQW5kVXBkYXRlKFxuICAgICAgeyBlbWFpbDogc2Vzc2lvbi51c2VyLmVtYWlsIH0sXG4gICAgICB7XG4gICAgICAgICRzZXQ6IHtcbiAgICAgICAgICBzdWJzY3JpcHRpb25TdGF0dXM6ICdhY3RpdmUnLFxuICAgICAgICAgIHN1YnNjcmlwdGlvblBsYW46IHBsYW5JZCxcbiAgICAgICAgICBzdWJzY3JpcHRpb25DdXJyZW50UGVyaW9kRW5kOiBuZXh0TW9udGhEYXRlLFxuICAgICAgICAgIHN1YnNjcmlwdGlvbklkOiByYXpvcnBheV9vcmRlcl9pZCxcbiAgICAgICAgICBzdHJpcGVDdXN0b21lcklkOiByYXpvcnBheV9wYXltZW50X2lkLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHsgbmV3OiB0cnVlLCB1cHNlcnQ6IHRydWUgfVxuICAgICk7XG5cbiAgICBpZiAoIXVzZXIpIHtcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcbiAgICAgICAgeyBlcnJvcjogJ0ZhaWxlZCB0byB1cGRhdGUgdXNlciBzdWJzY3JpcHRpb24nIH0sXG4gICAgICAgIHsgc3RhdHVzOiA1MDAgfVxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oe1xuICAgICAgc3VjY2VzczogdHJ1ZSxcbiAgICAgIG1lc3NhZ2U6ICdQYXltZW50IHZlcmlmaWVkIGFuZCBzdWJzY3JpcHRpb24gdXBkYXRlZCBzdWNjZXNzZnVsbHknLFxuICAgICAgc3Vic2NyaXB0aW9uOiB7XG4gICAgICAgIHN0YXR1czogdXNlci5zdWJzY3JpcHRpb25TdGF0dXMsXG4gICAgICAgIHBsYW46IHVzZXIuc3Vic2NyaXB0aW9uUGxhbixcbiAgICAgICAgY3VycmVudFBlcmlvZEVuZDogdXNlci5zdWJzY3JpcHRpb25DdXJyZW50UGVyaW9kRW5kLFxuICAgICAgfSxcbiAgICB9KTtcblxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIHZlcmlmeWluZyBwYXltZW50OicsIGVycm9yKTtcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXG4gICAgICB7IGVycm9yOiAnSW50ZXJuYWwgc2VydmVyIGVycm9yJyB9LFxuICAgICAgeyBzdGF0dXM6IDUwMCB9XG4gICAgKTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsImdldFNlcnZlclNlc3Npb24iLCJhdXRoT3B0aW9ucyIsInZlcmlmeVBheW1lbnRTaWduYXR1cmUiLCJkYmNvbm5lY3QiLCJVc2VyIiwiUE9TVCIsInJlcSIsInNlc3Npb24iLCJ1c2VyIiwiZW1haWwiLCJqc29uIiwiZXJyb3IiLCJzdGF0dXMiLCJib2R5IiwicmF6b3JwYXlfb3JkZXJfaWQiLCJyYXpvcnBheV9wYXltZW50X2lkIiwicmF6b3JwYXlfc2lnbmF0dXJlIiwicGxhbklkIiwiaXNWYWxpZCIsImN1cnJlbnREYXRlIiwiRGF0ZSIsIm5leHRNb250aERhdGUiLCJzZXRNb250aCIsImdldE1vbnRoIiwiZmluZE9uZUFuZFVwZGF0ZSIsIiRzZXQiLCJzdWJzY3JpcHRpb25TdGF0dXMiLCJzdWJzY3JpcHRpb25QbGFuIiwic3Vic2NyaXB0aW9uQ3VycmVudFBlcmlvZEVuZCIsInN1YnNjcmlwdGlvbklkIiwic3RyaXBlQ3VzdG9tZXJJZCIsIm5ldyIsInVwc2VydCIsInN1Y2Nlc3MiLCJtZXNzYWdlIiwic3Vic2NyaXB0aW9uIiwicGxhbiIsImN1cnJlbnRQZXJpb2RFbmQiLCJjb25zb2xlIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/razorpay/verify-payment/route.ts\n");

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

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Frazorpay%2Fverify-payment%2Froute&page=%2Fapi%2Frazorpay%2Fverify-payment%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Frazorpay%2Fverify-payment%2Froute.ts&appDir=%2Fhome%2Fsachin%2FDesktop%2FFormatFusion-main%2FFormatFusion-main%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fsachin%2FDesktop%2FFormatFusion-main%2FFormatFusion-main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Frazorpay%2Fverify-payment%2Froute&page=%2Fapi%2Frazorpay%2Fverify-payment%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Frazorpay%2Fverify-payment%2Froute.ts&appDir=%2Fhome%2Fsachin%2FDesktop%2FFormatFusion-main%2FFormatFusion-main%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fsachin%2FDesktop%2FFormatFusion-main%2FFormatFusion-main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _home_sachin_Desktop_FormatFusion_main_FormatFusion_main_app_api_razorpay_verify_payment_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/razorpay/verify-payment/route.ts */ \"(rsc)/./app/api/razorpay/verify-payment/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/razorpay/verify-payment/route\",\n        pathname: \"/api/razorpay/verify-payment\",\n        filename: \"route\",\n        bundlePath: \"app/api/razorpay/verify-payment/route\"\n    },\n    resolvedPagePath: \"/home/sachin/Desktop/FormatFusion-main/FormatFusion-main/app/api/razorpay/verify-payment/route.ts\",\n    nextConfigOutput,\n    userland: _home_sachin_Desktop_FormatFusion_main_FormatFusion_main_app_api_razorpay_verify_payment_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZyYXpvcnBheSUyRnZlcmlmeS1wYXltZW50JTJGcm91dGUmcGFnZT0lMkZhcGklMkZyYXpvcnBheSUyRnZlcmlmeS1wYXltZW50JTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGcmF6b3JwYXklMkZ2ZXJpZnktcGF5bWVudCUyRnJvdXRlLnRzJmFwcERpcj0lMkZob21lJTJGc2FjaGluJTJGRGVza3RvcCUyRkZvcm1hdEZ1c2lvbi1tYWluJTJGRm9ybWF0RnVzaW9uLW1haW4lMkZhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPSUyRmhvbWUlMkZzYWNoaW4lMkZEZXNrdG9wJTJGRm9ybWF0RnVzaW9uLW1haW4lMkZGb3JtYXRGdXNpb24tbWFpbiZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBK0Y7QUFDdkM7QUFDcUI7QUFDaUQ7QUFDOUg7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlHQUFtQjtBQUMzQztBQUNBLGNBQWMsa0VBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzREFBc0Q7QUFDOUQ7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDMEY7O0FBRTFGIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIi9ob21lL3NhY2hpbi9EZXNrdG9wL0Zvcm1hdEZ1c2lvbi1tYWluL0Zvcm1hdEZ1c2lvbi1tYWluL2FwcC9hcGkvcmF6b3JwYXkvdmVyaWZ5LXBheW1lbnQvcm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL3Jhem9ycGF5L3ZlcmlmeS1wYXltZW50L3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvcmF6b3JwYXkvdmVyaWZ5LXBheW1lbnRcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL3Jhem9ycGF5L3ZlcmlmeS1wYXltZW50L3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiL2hvbWUvc2FjaGluL0Rlc2t0b3AvRm9ybWF0RnVzaW9uLW1haW4vRm9ybWF0RnVzaW9uLW1haW4vYXBwL2FwaS9yYXpvcnBheS92ZXJpZnktcGF5bWVudC9yb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHdvcmtBc3luY1N0b3JhZ2UsXG4gICAgICAgIHdvcmtVbml0QXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Frazorpay%2Fverify-payment%2Froute&page=%2Fapi%2Frazorpay%2Fverify-payment%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Frazorpay%2Fverify-payment%2Froute.ts&appDir=%2Fhome%2Fsachin%2FDesktop%2FFormatFusion-main%2FFormatFusion-main%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fsachin%2FDesktop%2FFormatFusion-main%2FFormatFusion-main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/jose","vendor-chunks/openid-client","vendor-chunks/bcryptjs","vendor-chunks/oauth","vendor-chunks/lru-cache","vendor-chunks/object-hash","vendor-chunks/preact","vendor-chunks/uuid","vendor-chunks/preact-render-to-string","vendor-chunks/cookie","vendor-chunks/oidc-token-hash","vendor-chunks/@panva","vendor-chunks/razorpay","vendor-chunks/asynckit","vendor-chunks/math-intrinsics","vendor-chunks/es-errors","vendor-chunks/call-bind-apply-helpers","vendor-chunks/debug","vendor-chunks/get-proto","vendor-chunks/axios","vendor-chunks/mime-db","vendor-chunks/has-symbols","vendor-chunks/gopd","vendor-chunks/function-bind","vendor-chunks/follow-redirects","vendor-chunks/supports-color","vendor-chunks/proxy-from-env","vendor-chunks/ms","vendor-chunks/mime-types","vendor-chunks/hasown","vendor-chunks/has-tostringtag","vendor-chunks/has-flag","vendor-chunks/get-intrinsic","vendor-chunks/es-set-tostringtag","vendor-chunks/es-object-atoms","vendor-chunks/es-define-property","vendor-chunks/dunder-proto","vendor-chunks/delayed-stream","vendor-chunks/combined-stream"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Frazorpay%2Fverify-payment%2Froute&page=%2Fapi%2Frazorpay%2Fverify-payment%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Frazorpay%2Fverify-payment%2Froute.ts&appDir=%2Fhome%2Fsachin%2FDesktop%2FFormatFusion-main%2FFormatFusion-main%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fsachin%2FDesktop%2FFormatFusion-main%2FFormatFusion-main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();