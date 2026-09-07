import conf from '../conf/conf.js';

import { Client, ID , Databases,Storage,Query } from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.projectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title, slug, content, featuredImage, status , user_id}) {
        try {
            return await this.databases.createDocument(
                conf.databaseId,
                conf.collectionId,
                ID.unique(),
                {
                    title: title,
                        slug: slug,
                        content: content,
                        img_id: featuredImage,
                        // featuredImage: featuredImage,
                        status : status,
                        user_id: user_id
                    }
                );
            }
            catch (error) {
                console.error(error);
                throw error;
            }
    }

    async updatePost(postId, { title, slug, content, img_id, status }) {
  try {
    return await this.databases.updateDocument(
      conf.databaseId,
      conf.collectionId,
      postId,
      {
        title,
        slug,
        content,
        img_id,
        status
      }
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
}

    async deletePost(slug) {
        try {
            return await this.databases.deleteDocument(
                conf.databaseId,
                conf.collectionId,
                slug
            );
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.databaseId,
                conf.collectionId,
                slug
            );
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }

    async  getPosts(queries  = [Query.equal("status","active")]) {
        try {
            return await this.databases.listDocuments(
                conf.databaseId,
                conf.collectionId,
                queries
            );
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(    
            conf.bucketId,
            ID.unique(),
            file
            );
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
    
    async deleteFile(fileId) {
        try {
            return await this.bucket.deleteFile(
                conf.bucketId,
                fileId
            );
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }

    getFileView(fileId) {
    try {
        return this.bucket.getFileView(
            conf.bucketId,
            fileId
        );
    } catch (error) {
        console.error(error);
        throw error;
    }
}
                                 
}


const service = new Service();
export default service;