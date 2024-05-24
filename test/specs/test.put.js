import { expect } from '@wdio/globals'
import axios from 'axios';
import dataPut from "../data/dataPut.js";

const baseUrl = browser.options.baseUrl;
const header = { headers: { Authorization: process.env.token } };


describe('API PUT', () => {
    it('Positive - Update All', async () => {
        const userData = {
            name: dataPut[0].name,
            email: dataPut[0].email,
            gender: dataPut[0].gender,
            status: dataPut[0].status
        };
        const response = await axios.put(baseUrl + dataPut[0].id, userData, header);
        expect(response.status).toEqual(200)
        expect(response.data.code).toEqual(200)
        expect(response.data.data.name).toEqual(userData.name);
        expect(response.data.data.email).toEqual(userData.email);
        expect(response.data.data.gender).toEqual(userData.gender);
        expect(response.data.data.status).toEqual(userData.status);
    });
    it('Positive - Update Name', async () => {
        const userData = { name: dataPut[1].name };
        const response = await axios.put(baseUrl + dataPut[1].id, userData, header);
        expect(response.status).toEqual(200)
        expect(response.data.code).toEqual(200)
        expect(response.data.data.name).toEqual(userData.name);
    });
    it('Positive - Update Email', async () => {
        const userData = { email: dataPut[1].email };
        const response = await axios.put(baseUrl + dataPut[1].id, userData, header);
        expect(response.status).toEqual(200)
        expect(response.data.code).toEqual(200)
        expect(response.data.data.email).toEqual(userData.email);
    });
    it('Positive - Update Gender', async () => {
        const userData = { gender: dataPut[1].gender };
        const response = await axios.put(baseUrl + dataPut[1].id, userData, header);
        expect(response.status).toEqual(200)
        expect(response.data.code).toEqual(200)
        expect(response.data.data.gender).toEqual(userData.gender);
    });
    it('Positive - Update Status', async () => {
        const userData = { status: dataPut[1].status };
        const response = await axios.put(baseUrl + dataPut[1].id, userData, header);
        expect(response.status).toEqual(200)
        expect(response.data.code).toEqual(200)
        expect(response.data.data.status).toEqual(userData.status);
    });
    it('Negative - Update Name Blank', async () => {
        const userData = {name: ''};
        const response = await axios.put(baseUrl + dataPut[0].id, userData, header);
        expect(response.status).toEqual(200)
        expect(response.data.code).toEqual(422)
        expect(response.data.data[0].field).toEqual("name");
        expect(response.data.data[0].message).toEqual("can't be blank");
    });
    it('Negative - Update Email Blank', async () => {
        const userData = {email: ''};
        const response = await axios.put(baseUrl + dataPut[0].id, userData, header);
        expect(response.status).toEqual(200)
        expect(response.data.code).toEqual(422)
        expect(response.data.data[0].field).toEqual("email");
        expect(response.data.data[0].message).toEqual("can't be blank");
    });
    it('Negative - Update Email Invalid', async () => {
        const userData = {email: 'testapitest'};
        const response = await axios.put(baseUrl + dataPut[0].id, userData, header);
        expect(response.status).toEqual(200)
        expect(response.data.code).toEqual(422)
        expect(response.data.data[0].field).toEqual("email");
        expect(response.data.data[0].message).toEqual("is invalid");
    });
    it('Negative - Update Email Already Use', async () => {
        const userData = {email: 'testing@test.com'};
        const response = await axios.put(baseUrl + dataPut[0].id, userData, header);
        expect(response.status).toEqual(200)
        expect(response.data.code).toEqual(422)
        expect(response.data.data[0].field).toEqual("email");
        expect(response.data.data[0].message).toEqual("has already been taken");
    });
    it('Negative - Update Gender Blank', async () => {
        const userData = {gender: ''};
        const response = await axios.put(baseUrl + dataPut[0].id, userData, header);
        expect(response.status).toEqual(200)
        expect(response.data.code).toEqual(422)
        expect(response.data.data[0].field).toEqual("gender");
        expect(response.data.data[0].message).toEqual("can't be blank, can be male of female");
    });
    it('Negative - Update Gender Invalid', async () => {
        const userData = {gender: 'test'};
        const response = await axios.put(baseUrl + dataPut[0].id, userData, header);
        expect(response.status).toEqual(200)
        expect(response.data.code).toEqual(422)
        expect(response.data.data[0].field).toEqual("gender");
        expect(response.data.data[0].message).toEqual("can't be blank, can be male of female");
    });
    it('Negative - Update Status Blank', async () => {
        const userData = {status: ''};
        const response = await axios.put(baseUrl + dataPut[0].id, userData, header);
        expect(response.status).toEqual(200)
        expect(response.data.code).toEqual(422)
        expect(response.data.data[0].field).toEqual("status");
        expect(response.data.data[0].message).toEqual("can't be blank");
    });
    it('Negative - Update User Not Found', async () => {
        const userData = {
            name: dataPut[0].name,
            email: dataPut[0].email,
            gender: dataPut[0].gender,
            status: dataPut[0].status
        };
        const response = await axios.put(baseUrl + 1111111, userData, header);
        expect(response.status).toEqual(200)
        expect(response.data.code).toEqual(404)
        expect(response.data.data.message).toEqual('Resource not found')
    });
});
