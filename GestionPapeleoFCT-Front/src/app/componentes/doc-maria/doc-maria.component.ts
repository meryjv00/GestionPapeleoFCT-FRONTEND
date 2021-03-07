import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-doc-maria',
  templateUrl: './doc-maria.component.html',
  styleUrls: ['./doc-maria.component.scss']
})
export class DocMariaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  activar(value: any) {
    for (var i = 1; i <= 7; i++) {
      if (i == value) {
        document.getElementById(`apart${i}-tab`)?.classList.add('bg-white', 'border2');
      } else {
        document.getElementById(`apart${i}-tab`)?.classList.remove('bg-white', 'border2');
      }
    }
  }
}
