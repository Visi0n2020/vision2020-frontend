import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import {ThemePalette} from '@angular/material/core';

import { PostsService } from "./posts.service";
import { AuthService } from "../auth/auth.service";
import { List } from "./list.model";
import { Post } from "./post.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  isLoading = false;
  userIsAuthenticated = false;
  userId: string;
  private postsSub: Subscription;
  private authStatusSub: Subscription;

  lists: List[]=[];
  posts: Post[]=[];
  selectedListId: string;
  selectedPostId: string;
  activeLink: string;

  constructor(
    public postsService: PostsService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}


  ngOnInit() {

    this.isLoading = true;
    this.userId = this.authService.getUserId();
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
      });

    this.route.params.subscribe(
      (params: Params) => {
        if (params.listId) {
          this.selectedListId = params.listId;
          this.postsService.getPosts(this.selectedListId).subscribe((posts: Post[]) => {
            this.posts = posts;
            if (this.posts.length!=0)
              this.selectedPostId = this.posts[0]._id;

          })
            if (params.postId) {
                this.selectedPostId = params.postId;
            }
        }
      }
    )

    this.postsService.getLists().subscribe((listsRes: List[]) => {
      this.lists = listsRes;
    })
    this.isLoading = false;
  }

  onDeletePost(postId: string) {
    this.isLoading = true;
    this.postsService.deletePost(this.selectedListId ,postId).subscribe(() => {
      this.isLoading = true;
      this.postsService.getPosts(this.selectedListId).subscribe((posts: Post[]) => {
        this.isLoading = true;
        this.posts = posts;
        this.isLoading = false;
        if (this.posts.length!=0) {
          this.selectedPostId = this.posts[0]._id;
          }
        this.router.navigate([ '/lists', this.selectedListId]);
      })
      // this.posts = this.posts.filter(val => val._id !== this.selectedPostId);
      // this.isLoading = false;
    });
    this.isLoading = false;
    this.router.navigate([ '/lists', this.selectedListId]);
  }

  onDeleteList(postId: string) {
    this.isLoading = true;
    this.postsService.deleteList(this.selectedListId).subscribe(() => {
      this.lists = this.lists.filter(val => val._id !== this.selectedListId);
    }, () => {
    });
    this.isLoading = false;
  }

  onLogout() {
    this.authService.logout();
  }

  onPostSelect(postNum: number) {
    this.selectedPostId=this.posts[postNum]._id;
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
