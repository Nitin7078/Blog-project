import conf from '../conf/conf.js';

import { Client, Account, ID } from "appwrite";

export class Authservive {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.projectId);

        this.account = new Account(this.client);
    }

   async createAccount(email, password, name) {
    try {
        const userId = ID.unique();

        console.log("Generated ID:", userId);
        console.log("EMAIL:", email);
        console.log("NAME:", name);

        const response = await this.account.create({
            userId,
            email,
            password,
            name,
        });

        if (response) {
            return await this.login(email, password);
        }
       

        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

    

    async Getcurrentuser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("No active session:");
            return null;
        }
    }


    async login(email, password) {
    try {
        const response = await this.account.createEmailPasswordSession({
            email,
            password,
        });

        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
}


    async logout() {
        try {
            const response = await this.account.deleteSession('current');
            return response;

        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

const authservive = new Authservive();

export default authservive;