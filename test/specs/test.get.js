import { expect } from '@wdio/globals'
import axios from 'axios';
import dataGet from "../data/dataGet.js";

const baseUrl = browser.options.baseUrl;
const header = { headers: { Authorization: process.env.token } };


describe('API GET', () => {
    it('Positive - Get All User', async () => {
        const response = await axios.get(baseUrl, header);
        expect(response.status).toEqual(200)
        expect(response.data.code).toEqual(200)
    });
    it('Positive - Get User By ID', async () => {
        const response = await axios.get(baseUrl + dataGet.id, header);
        expect(response.status).toEqual(200)
        expect(response.data.code).toEqual(200)
        expect(response.data.data.id).toEqual(dataGet.id)
    });
    it('Negative - Get User Not Found', async () => {
        const response = await axios.get(baseUrl + dataGet.idNotFound, header);
        expect(response.status).toEqual(200)
        expect(response.data.code).toEqual(404)
        expect(response.data.data.message).toEqual('Resource not found')
    });

});
