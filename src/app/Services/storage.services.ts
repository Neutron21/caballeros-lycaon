import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { DataServices } from './dataServices';

@Injectable()
export class StorageService {

    constructor(private dataServices: DataServices) { }

    imgProfile(filePath, file){
    let pathPicture;
    let  storageRef = firebase.storage().ref(filePath);
    let uploadTask = storageRef.put(file);

     

    return new Promise((resolve, reject) => {
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
     (snapshot) => {
         // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
         var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
         console.log('Upload is ' + progress + '% done');
     }, (error) => {

         reject({ error: error});

     }, () => {
         
         uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
             console.log('File available at', downloadURL);
             resolve( downloadURL);
         });
     });
   
    })
 
    }
}