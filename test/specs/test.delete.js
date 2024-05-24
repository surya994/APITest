import { expect } from '@wdio/globals'
import axios from 'axios';
import dataDelete from "../data/dataDelete.js";

const baseUrl = browser.options.baseUrl;
const header = { headers: { Authorization: process.env.token } };

describe('API DELETE', () => {
    it('Positive - Delete User', async () => {
        const response = await axios.delete(baseUrl + dataDelete.id, header);
        expect(response.status).toEqual(200)
        expect(response.data.code).toEqual(204)
    });
    it('Negative - Delete User Not Found', async () => {
        const response = await axios.delete(baseUrl + dataDelete.idNotFound, header);
        expect(response.status).toEqual(200)
        expect(response.data.code).toEqual(404)
        expect(response.data.data.message).toEqual('Resource not found')
    });
});
