import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Router } from "@angular/router";

import { List } from "./list.model";
import { Post } from "./post.model";

import { environment } from "../../environments/environment";

const BACKEND_URL = environment.apiUrl;


interface PostData {
  title: string,
  content: string,
  price: string,
  imageLink: String
}

@Injectable({ providedIn: "root" })
export class PostsService {
  //private lists: List[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  getLists() {
    return this.http.get(BACKEND_URL + "/lists/");
  }

  getPost(selectedListId: string, postId: string) {
    return this.http.get<{ post: Post }>(BACKEND_URL + "/lists/" + selectedListId + "/" + postId);
  }

  getPosts(selectedListId: string) {
    return this.http.get(BACKEND_URL + "/lists/" + selectedListId);
  }

  addPost(title: string, content: string, price: string, imageLink: String, selectedListId: string) {
    const postData: PostData = {title: title, content: content, price: price, imageLink: imageLink }
    console.log(postData, selectedListId);
    return this.http.post(BACKEND_URL + "/lists/" + selectedListId, postData)}

  updatePost(selectedListId: string, postId: string, title: string, content: string, price: string, imageLink: String) {
    const postData: PostData = {title: title, content: content, price: price, imageLink: imageLink }
    console.log(postData, selectedListId);
    return this.http.put(BACKEND_URL + "/lists/" + selectedListId + "/" + postId, postData)
  }



  deletePost(selectedListId: string, postId: string) {
    return this.http.delete(BACKEND_URL + "/lists/" + selectedListId + "/" + postId);
  }

  createList(postTitle: string) {
    const data = {title: postTitle}
    //console.log(title);
    return this.http.post<{ message: string; list: List }>(BACKEND_URL + "/lists/newlist", data)
  }

  deleteList(selectedListId: string) {
    return this.http.delete(BACKEND_URL + "/lists/" + selectedListId);
  }
}
