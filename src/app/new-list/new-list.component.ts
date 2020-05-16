import { PostsService } from './../home/posts.service';
import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { ActivatedRoute, Params,  ParamMap, Router } from '@angular/router';
import { Post } from "../home/post.model";
import { AuthService } from "../auth/auth.service";

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.css']
})
export class NewListComponent implements OnInit {
  enteredTitle = "";
  isLoading = false;
  form: FormGroup;
  private authStatusSub: Subscription;


  constructor(
    public route: ActivatedRoute,
    private authService: AuthService,
    public router: Router,
    public postsService: PostsService
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
    });
  }

  onNewList() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
      this.postsService.createList(
        this.form.value.title)
        .subscribe(res => {
          this.isLoading = false;
          this.router.navigate([ '/lists', res.list._id ]);
        })
  }
}
