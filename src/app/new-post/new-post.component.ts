import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { ActivatedRoute, Params,  ParamMap, Router } from '@angular/router';
import { PostsService } from "../home/posts.service";
import { Post } from "../home/post.model";
import { AuthService } from "../auth/auth.service";

@Component({
  selector: "app-new-post",
  templateUrl: "./new-post.component.html",
  styleUrls: ["./new-post.component.css"]
})
export class NewPostComponent implements OnInit, OnDestroy {
  enteredTitle = "";
  enteredContent = "";
  post: Post;
  isLoading = false;
  form: FormGroup;
  private authStatusSub: Subscription;
  selectedListId: string;
  private postId: string;
  private mode = "create";

  constructor(
    public postsService: PostsService,
    public route: ActivatedRoute,
    private authService: AuthService,
    public router: Router
  ) {}

  ngOnInit() {
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(authStatus => {
      });
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(1)]
      }),
      content: new FormControl(null, { validators: [Validators.required] }),
      price: new FormControl(null, {
        validators: [Validators.required],
      }),
      imageLink: new FormControl(null, { }),
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.isLoading = true;
      if (paramMap.has("postId")) {
        this.mode = "edit";
        this.postId = paramMap.get("postId");
        this.selectedListId = paramMap.get("listId");
        this.postsService.getPost(this.selectedListId ,this.postId).subscribe((postData : any) => {
          this.post = {
            _id: postData._id,
            listId: this.selectedListId,
            title: postData.title,
            content: postData.content,
            price: postData.price,
            imageLink: postData.imageLink
          };
          this.form.setValue({
            title: this.post.title,
            content: this.post.content,
            price: this.post.price,
            imageLink: this.post.imageLink
          });
        this.isLoading = false;
        });
      } else {
        this.mode = "create";
        this.postId = null;
      }
      this.isLoading = false;
    });
  }


  onSavePost() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    this.route.params.subscribe(
      (params: Params) => {
        if (params.listId) {
          this.selectedListId = params.listId;
        }
      })
      if (this.mode === "create") {
      this.postsService.addPost(
        this.form.value.title,
        this.form.value.content,
        this.form.value.price,
        this.form.value.imageLink,
        this.selectedListId)
        .subscribe(res => {
          this.isLoading = false;
          this.router.navigate([ '/lists', this.selectedListId ]);
        })
      }
      else {
        this.postsService.updatePost(
          this.selectedListId,
          this.postId,
          this.form.value.title,
          this.form.value.content,
          this.form.value.price,
          this.form.value.imageLink,
        ).subscribe(res => {
          this.isLoading = false;
          this.router.navigate([ '/lists', this.selectedListId ]);
        });
        this.isLoading = false;
        this.router.navigate([ '/lists', this.selectedListId ]);
      }
      this.isLoading = false;
    //this.form.reset();
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
