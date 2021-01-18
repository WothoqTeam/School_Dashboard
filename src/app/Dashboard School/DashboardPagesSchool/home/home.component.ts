import { Component, OnInit, ViewChild} from '@angular/core';
import { HeaderComponent } from 'src/app/Shared/header/header.component';
import { SideComponent } from 'src/app/Shared/side/side.component';

declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild(SideComponent) side: SideComponent;
  @ViewChild(HeaderComponent) head: HeaderComponent;

  constructor() { }

  ngOnInit(): void {
    $('.btn-toggle').click(function () {
      $(this).find('.btn').toggleClass('active');

      if ($(this).find('.btn-dark').length > 0) {
        $(this).find('.btn').toggleClass('btn-default');
      }


      $(this).find('.btn').toggleClass('btn-dark ');

    });
    $('form').submit(function () {
      const radioValue = $('input[name=\'options\']:checked').val();
      if (radioValue) {
        alert(' You selected - ' + radioValue);
      }
      return false;
    });
  }
}
