"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const logger = require("morgan");
const _1 = require(".");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));
app.use(cors());
app.get("/v1/top", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let data = yield _1.fetchData();
        return res.status(200).json(data);
    });
});
app.get('*', function (req, res, next) {
    setImmediate(function () {
        return next(new Error('Route does not exist! Use /v1/top to receive top articles from Techzim.'));
    });
});
app.use(function (error, req, res, next) {
    res.status(404).json({
        message: error.message,
        status: 404
    });
    next();
});
app.listen(process.env.PORT || 8000, function () {
    console.log('API is up and running');
});
