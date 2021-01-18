import { Component, OnInit } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-edit-userprofile',
  templateUrl: './edit-userprofile.component.html',
  styleUrls: ['./edit-userprofile.component.css']
})
export class EditUserprofileComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $('.btn-toggle').click(function () {
      $(this).find('.btn').toggleClass('active');

      if ($(this).find('.btn-dark').length > 0) {
        $(this).find('.btn').toggleClass('btn-default');
      }


      $(this).find('.btn').toggleClass('btn-dark ');

    });
  
  }

}
