import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-raiz',
  templateUrl: './raiz.component.html',
  styleUrls: ['./raiz.component.css']
})
export class RaizComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    (function(){
      var addEvent = function(object, type, callback) {
          if (object == null || typeof(object) == 'undefined') return;
          if (object.addEventListener) {
              object.addEventListener(type, callback, false);
          } else if (object.attachEvent) {
              object.attachEvent("on" + type, callback);
          } else {
              object["on"+type] = callback;
          }
      };
      function detectMouseMove() {
        // Initial container width
        var containerWidth = $('.container-estilo').outerWidth();
        document.addEventListener('mousemove', function(e) {
          $('.hover').css({
             left:  e.pageX - 25
          });
          $('.left-side').css({
            left: e.pageX + 50
          });
          var rightSideLeft = containerWidth - e.pageX;
          $('.right-side').css({
            right: rightSideLeft + 30
          });
    
        })
      }
      detectMouseMove();
      
      function detectTouch() {
        // Initial container width
        var containerWidth = $('.container-estilo').outerWidth();
        document.addEventListener('mousemove', function(e) {
          $('.hover').css({
             left:  e.pageX - 25
          });
          $('.left-side').css({
            left: e.pageX + 50
          });
          var rightSideLeft = containerWidth - e.pageX;
          $('.right-side').css({
            right: rightSideLeft
          });
        })
      }
      detectMouseMove();
      
      function touchMove(){
        // Initial container width
        var containerWidth = $('.container-estilo').outerWidth();
        
        document.addEventListener('touchmove', function(e) {
          $('.hover').css({
             left:  e.pageX
          });
          $('.left-side').css({
            left: e.pageX + 75
          });
          var rightSideLeft = containerWidth - e.pageX;
          $('.right-side').css({
            right: rightSideLeft
          });
    
        })
      }
      
      touchMove();
      
      function detectInput(inputType){
        // Detect container width after resizing
        addEvent(window, "resize", function(event) {
          var containerWidth = $('.container-estilo').outerWidth();
          $(document).bind(inputType, function(e){
            $('.hover').css({
               left:  e.pageX
            });
            $('.left-side').css({
              left: e.pageX + 75
            });
            var rightSideLeft = containerWidth - e.pageX;
            $('.right-side').css({
              right: rightSideLeft
            });
          });
        });
      }
      
      detectInput('mousemove');
      detectInput('touchmove');
      
    })();

  }

}
