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
            const response = await this.account.create(
                ID.unique(),
                email,
                password,
                name
            );

            if (response) {
                // Automatically login after creating account
                return await this.login(email, password);
            }

            return response;

        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async login(email, password) {
        try {
            const response = await this.account.createSession(
                email,
                password
            );

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
            console.log("No active session:", error);
            return null;
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