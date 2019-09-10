import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { DataServices } from './dataServices';

@Injectable()
export class StorageService {

    constructor(private dataServices: DataServices) { }

    imgProfile(filePath, file){
    let pathPicture;
    let  storageRef = firebase.storage().ref(filePath);
     storageRef.put(file);
    //  this.pathPicture = storageRef.fullPath;
    //  this.pathPicture = storageRef.fullPath;
    return new Promise((resolve, reject) => {
        storageRef.getDownloadURL().then(url => {
            // Insert url into an <img> tag to "download"
            pathPicture = url;
            console.log(pathPicture);
            
            resolve(pathPicture);
    
          }).catch(function(error) {
    
            console.log(error);
          
          });
    })
 
    }
}