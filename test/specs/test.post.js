import { expect } from '@wdio/globals'
import axios from 'axios';
import dataPost from "../data/dataPost.js";

const baseUrl = browser.options.baseUrl;
const header = { headers: { Authorization: process.env.token } };


describe('API POST', () => {
    it('Positive - Register', async () => {
        const userData = {
            name: dataPost.name,
            email: dataPost.email,
            gender: dataPost.gender,
            status: dataPost.status
        };
        const response = await axios.post(baseUrl, userData, header);
        expect(response.status).toEqual(200)
        expect(response.data.code).toEqual(201)
        expect(response.data.data.name).toEqual(userData.name);
        expect(response.data.data.email).toEqual(userData.email);
        expect(response.data.data.gender).toEqual(userData.gender);
        expect(response.data.data.status).toEqual(userData.status);
    });
    it('Negative - Register Name Blank', async () => {
        const userData = {
            name: '',
            email: dataPost.email,
            gender: dataPost.gender,
            status: dataPost.status,
        };
        const response = await axios.post(baseUrl, userData, header);
        expect(response.status).toEqual(200)
        expect(response.data.code).toEqual(422)
        expect(response.data.data[0].field).toEqual("name");
        expect(response.data.data[0].message).toEqual("can't be blank");
    });
    it('Negative - Register Email Blank', async () => {
        const userData = {
            name: dataPost.name,
            email: '',
            gender: dataPost.gender,
            status: dataPost.status,
        };
        const response = await axios.post(baseUrl, userData, header);
        expect(response.status).toEqual(200)
        expect(response.data.code).toEqual(422)
        expect(response.data.data[0].field).toEqual("email");
        expect(response.data.data[0].message).toEqual("can't be blank");
    });
    it('Negative - Register Email Invalid', async () => {
        const userData = {
            name: dataPost.name,
            email: 'testapitest',
            gender: dataPost.gender,
            status: dataPost.status,
        };
        const response = await axios.post(baseUrl, userData, header);
        expect(response.status).toEqual(200)
        expect(response.data.code).toEqual(422)
        expect(response.data.data[0].field).toEqual("email");
        expect(response.data.data[0].message).toEqual("is invalid");
    });
    it('Negative - Register Email Already Use', async () => {
        const userData = {
            name: dataPost.name,
            email: dataPost.email,
            gender: dataPost.gender,
            status: dataPost.status,
        };
        const response = await axios.post(baseUrl, userData, header);
        expect(response.status).toEqual(200)
        expect(response.data.code).toEqual(422)
        expect(response.data.data[0].field).toEqual("email");
        expect(response.data.data[0].message).toEqual("has already been taken");
    });
    it('Negative - Register Gender Blank', async () => {
        const userData = {
            name: dataPost.name,
            email: dataPost.email,
            gender: '',
            status: dataPost.status,
        };
        const response = await axios.post(baseUrl, userData, header);
        expect(response.status).toEqual(200)
        expect(response.data.code).toEqual(422)
        expect(response.data.data[0].field).toEqual("gender");
        expect(response.data.data[0].message).toEqual("can't be blank, can be male of female");
    });
    it('Negative - Register Gender Invalid', async () => {
        const userData = {
            name: dataPost.name,
            email: dataPost.email,
            gender: 'test',
            status: dataPost.status,
        };
        const response = await axios.post(baseUrl, userData, header);
        expect(response.status).toEqual(200)
        expect(response.data.code).toEqual(422)
        expect(response.data.data[0].field).toEqual("gender");
        expect(response.data.data[0].message).toEqual("can't be blank, can be male of female");
    });
    it('Negative - Register Status Blank', async () => {
        const userData = {
            name: dataPost.name,
            email: dataPost.email,
            gender: dataPost.gender,
            status: '',
        };
        const response = await axios.post(baseUrl, userData, header);
        expect(response.status).toEqual(200)
        expect(response.data.code).toEqual(422)
        expect(response.data.data[0].field).toEqual("status");
        expect(response.data.data[0].message).toEqual("can't be blank");
    });
});
