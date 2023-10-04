import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreatePostComponent } from 'src/app/tools/create-post/create-post.component';
import { FirebaseTSFirestore, Limit, OrderBy, Where } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
@Component({
  selector: 'app-postfeed',
  templateUrl: './postfeed.component.html',
  styleUrls: ['./postfeed.component.css']
})
export class PostfeedComponent implements OnInit {
  constructor(private dialog:MatDialog){}
  firestore=new FirebaseTSFirestore();
  posts:PostData[]=[];
  ngOnInit(): void {
    this.getPosts();
    
  }
  onCreatePostClick(){
    this.dialog.open(CreatePostComponent);
  }
  getPosts(){
    this.firestore.getCollection({
      path:["Posts"],
      where:[
        
        new OrderBy("timestamp","desc"),
        new Limit(10)
      ],
      onComplete:(result)=>{
        result.docs.forEach(
          doc=>{
            let post=<PostData>doc.data();
            post.postId = doc.id;
            
            this.posts.push(post);
          }
        )

      },
      onFail:err=>{

      }
    });
  }
  

}
export interface PostData{
  comment:string;
  creatorId:string;
  imageUrl:string;
  postId: string;
}
