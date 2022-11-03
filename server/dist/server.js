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
const axios_1 = require("axios");
const app_1 = require("./app");
const port = process.env.PORT || 4000;
const endpoint = process.env.API_URL || '';
app_1.default.post('/api/getProducts', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!endpoint) {
            throw new Error('Api Not Found');
        }
        const response = yield axios_1.default.post(endpoint + '/getProduct', req.body);
        if (response.status === 200 && response.data) {
            const productList = response.data.quotationProductList;
            return res.status(200).send({
                success: true,
                data: productList
            });
        }
        else {
            throw new Error('No response');
        }
    }
    catch (error) {
        return res.status(400).send({
            success: false,
            error: error.message
        });
    }
}));
app_1.default.listen(port, () => console.log(`Port Listening on ${port}`));
