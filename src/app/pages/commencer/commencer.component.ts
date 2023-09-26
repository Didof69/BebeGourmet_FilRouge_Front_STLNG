import { Component } from '@angular/core';

@Component({
  selector: 'app-commencer',
  templateUrl: './commencer.component.html',
  styleUrls: ['./commencer.component.css']
})
export class CommencerComponent {
ngOnInit(){
localStorage.clear()
}
}
