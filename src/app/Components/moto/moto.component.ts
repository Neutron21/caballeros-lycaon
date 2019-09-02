import { Component, OnInit, Input } from '@angular/core';
import { Vehicle } from 'src/app/Models/vehicle.model';

@Component({
  selector: 'app-moto',
  templateUrl: './moto.component.html',
  styleUrls: ['./moto.component.css']
})
export class MotoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input()
  moto: Vehicle;
}
