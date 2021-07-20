"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.backup = exports.backupFromDoc = exports.getAllCollections = void 0;
var admin = __importStar(require("firebase-admin"));
var helper_1 = require("./helper");
/**
 * Get data from all collections
 * Suggestion from jcummings2 and leningsv
 * @param {Array<string>} collectionNameArray
 */
var getAllCollections = function (collectionNameArray, options) { return __awaiter(void 0, void 0, void 0, function () {
    var db, snap, paths, promises, value, all;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                db = admin.firestore();
                return [4 /*yield*/, db.listCollections()];
            case 1:
                snap = _a.sent();
                paths = collectionNameArray;
                if (paths.length === 0) {
                    // get all collections
                    snap.forEach(function (collection) { return paths.push(collection.path); });
                }
                promises = [];
                paths.forEach(function (segment) {
                    var result = exports.backup(segment, options);
                    promises.push(result);
                });
                return [4 /*yield*/, Promise.all(promises)];
            case 2:
                value = _a.sent();
                all = Object.assign.apply(Object, __spreadArray([{}], value));
                return [2 /*return*/, all];
        }
    });
}); };
exports.getAllCollections = getAllCollections;
/**
 * Backup data from a specific firestore document specified by db.collection(collectionName).doc(documentName)
 *
 * @param {string} collectionName
 * @param {string} documentName
 * @returns {Promise<any>}
 */
var backupFromDoc = function (collectionName, documentName, options) { return __awaiter(void 0, void 0, void 0, function () {
    function addElement(ElementList, element) {
        var newList = Object.assign(ElementList, element);
        return newList;
    }
    var db, data, documentRef, document, docs, _i, docs_1, doc, subCollections, _a, _b, refKey, _c, _d, val, _e, subCollections_1, subCol, subColData, error_1;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                _f.trys.push([0, 9, , 10]);
                db = admin.firestore();
                data = {};
                data[collectionName] = {};
                documentRef = db.collection(collectionName).doc(documentName);
                return [4 /*yield*/, documentRef.get()];
            case 1:
                document = _f.sent();
                docs = [document];
                _i = 0, docs_1 = docs;
                _f.label = 2;
            case 2:
                if (!(_i < docs_1.length)) return [3 /*break*/, 8];
                doc = docs_1[_i];
                return [4 /*yield*/, doc.ref.listCollections()];
            case 3:
                subCollections = _f.sent();
                data[collectionName][doc.id] = doc.data();
                if (options === null || options === void 0 ? void 0 : options.refs) {
                    for (_a = 0, _b = options === null || options === void 0 ? void 0 : options.refs; _a < _b.length; _a++) {
                        refKey = _b[_a];
                        if (refKey.indexOf('.') > -1) {
                            helper_1.traverseObjects(data, function (value) {
                                var _a;
                                if (((_a = value.constructor) === null || _a === void 0 ? void 0 : _a.name) !== 'DocumentReference') {
                                    return null;
                                }
                                return helper_1.getPath(value);
                            });
                        }
                        else {
                            if (data[collectionName][doc.id][refKey]) {
                                if (Array.isArray(data[collectionName][doc.id][refKey])) {
                                    for (_c = 0, _d = data[collectionName][doc.id][refKey]; _c < _d.length; _c++) {
                                        val = _d[_c];
                                        data[collectionName][doc.id][refKey] = helper_1.getPath(val);
                                    }
                                }
                                else if (typeof data[collectionName][doc.id][refKey].path === 'string') {
                                    data[collectionName][doc.id][refKey] =
                                        data[collectionName][doc.id][refKey].path;
                                }
                            }
                        }
                    }
                }
                data[collectionName][doc.id]['subCollection'] = {};
                _e = 0, subCollections_1 = subCollections;
                _f.label = 4;
            case 4:
                if (!(_e < subCollections_1.length)) return [3 /*break*/, 7];
                subCol = subCollections_1[_e];
                return [4 /*yield*/, exports.backup(collectionName + "/" + documentName + "/" + subCol.id, options)];
            case 5:
                subColData = _f.sent();
                data[collectionName][doc.id]['subCollection'] = addElement(data[collectionName][doc.id]['subCollection'], subColData);
                _f.label = 6;
            case 6:
                _e++;
                return [3 /*break*/, 4];
            case 7:
                _i++;
                return [3 /*break*/, 2];
            case 8: return [2 /*return*/, data];
            case 9:
                error_1 = _f.sent();
                console.error(error_1);
                throw new Error(error_1);
            case 10: return [2 /*return*/];
        }
    });
}); };
exports.backupFromDoc = backupFromDoc;
/**
 * Backup data from firestore
 *
 * @param {string} collectionName
 * @returns {Promise<any>}
 */
var backup = function (collectionName, options) { return __awaiter(void 0, void 0, void 0, function () {
    function addElement(ElementList, element) {
        var newList = Object.assign(ElementList, element);
        return newList;
    }
    var db, data, collectionRef, documents, _a, docs, _i, docs_2, doc, subCollections, _b, _c, refKey, _d, _e, val, _f, subCollections_2, subCol, subColData, error_2;
    return __generator(this, function (_g) {
        switch (_g.label) {
            case 0:
                _g.trys.push([0, 12, , 13]);
                db = admin.firestore();
                data = {};
                data[collectionName] = {};
                collectionRef = db.collection(collectionName);
                if (!((options === null || options === void 0 ? void 0 : options.queryCollection) != null)) return [3 /*break*/, 2];
                return [4 /*yield*/, options.queryCollection(collectionRef)];
            case 1:
                _a = _g.sent();
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, collectionRef.get()];
            case 3:
                _a = _g.sent();
                _g.label = 4;
            case 4:
                documents = _a;
                docs = (options === null || options === void 0 ? void 0 : options.docsFromEachCollection) > 0
                    ? documents.docs.slice(0, options === null || options === void 0 ? void 0 : options.docsFromEachCollection)
                    : documents.docs;
                _i = 0, docs_2 = docs;
                _g.label = 5;
            case 5:
                if (!(_i < docs_2.length)) return [3 /*break*/, 11];
                doc = docs_2[_i];
                return [4 /*yield*/, doc.ref.listCollections()];
            case 6:
                subCollections = _g.sent();
                data[collectionName][doc.id] = doc.data();
                if (options === null || options === void 0 ? void 0 : options.refs) {
                    for (_b = 0, _c = options === null || options === void 0 ? void 0 : options.refs; _b < _c.length; _b++) {
                        refKey = _c[_b];
                        if (refKey.indexOf('.') > -1) {
                            helper_1.traverseObjects(data, function (value) {
                                var _a;
                                if (((_a = value.constructor) === null || _a === void 0 ? void 0 : _a.name) !== 'DocumentReference') {
                                    return null;
                                }
                                return helper_1.getPath(value);
                            });
                        }
                        else {
                            if (data[collectionName][doc.id][refKey]) {
                                if (Array.isArray(data[collectionName][doc.id][refKey])) {
                                    for (_d = 0, _e = data[collectionName][doc.id][refKey]; _d < _e.length; _d++) {
                                        val = _e[_d];
                                        data[collectionName][doc.id][refKey] = helper_1.getPath(val);
                                    }
                                }
                                else if (typeof data[collectionName][doc.id][refKey].path === 'string') {
                                    data[collectionName][doc.id][refKey] =
                                        data[collectionName][doc.id][refKey].path;
                                }
                            }
                        }
                    }
                }
                data[collectionName][doc.id]['subCollection'] = {};
                _f = 0, subCollections_2 = subCollections;
                _g.label = 7;
            case 7:
                if (!(_f < subCollections_2.length)) return [3 /*break*/, 10];
                subCol = subCollections_2[_f];
                return [4 /*yield*/, exports.backup(collectionName + "/" + doc.id + "/" + subCol.id, options)];
            case 8:
                subColData = _g.sent();
                data[collectionName][doc.id]['subCollection'] = addElement(data[collectionName][doc.id]['subCollection'], subColData);
                _g.label = 9;
            case 9:
                _f++;
                return [3 /*break*/, 7];
            case 10:
                _i++;
                return [3 /*break*/, 5];
            case 11: return [2 /*return*/, data];
            case 12:
                error_2 = _g.sent();
                console.error(error_2);
                throw new Error(error_2);
            case 13: return [2 /*return*/];
        }
    });
}); };
exports.backup = backup;
//# sourceMappingURL=export.js.map