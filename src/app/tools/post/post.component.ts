import { Component, Input, OnInit } from '@angular/core';
import { PostData } from 'src/app/pages/postfeed/postfeed.component';
import { FirebaseTSFirestore} from 'firebasets/firebasetsFirestore/firebaseTSFirestore';

import { MatDialog } from '@angular/material/dialog';
import { ReplyComponent } from '../reply/reply.component';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit{
  
  @Input() postData:PostData|any;
  firestore=new FirebaseTSFirestore();
  creatorName: string | undefined;
  creatorDescription: string | undefined;
  constructor(private dialog:MatDialog){
    
  }
  ngOnInit(): void {
    this.getCreatorInfo();
    
  }
  onReplyClick(){
    this.dialog.open(ReplyComponent,{data:this.postData.postId});
  }

  getCreatorInfo(){
    this.firestore.getDocument(
      {
        path: ["Users", this.postData.creatorId],
        onComplete: result => {
          if (result.exists) {
            // Document exists, populate properties
            let userDocument = result.data();
    
            // Check if userDocument is defined before accessing properties
            if (userDocument) {
              this.creatorName = userDocument['publicName'];
              this.creatorDescription = userDocument['description'];
            } else {
              console.error("userDocument is undefined");
              // Handle the case where userDocument is undefined
            }
          } else {
            // Document doesn't exist or there was an error
            console.error("Document not found or error occurred");
          }
          
        }
      }
    );
  }

}
