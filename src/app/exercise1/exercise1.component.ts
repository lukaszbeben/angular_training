import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-exercise1',
  templateUrl: './exercise1.component.html',
  styleUrls: ['./exercise1.component.css']
})

export class Exercise1Component implements OnInit {
  result:number = 0;
  resultArray:number[] = []; 
  
  constructor() {}

  ngOnInit() {}
  onSubmit(form) {
    let a:number = parseFloat(form.value.number1),
        b:number = parseFloat(form.value.number2),
        i:number = 0,
        arr:number[] = [];
    this.result = a + a * a - b + b * b;

    for (i; i < this.result; i++) arr.push(i);
    this.resultArray = arr;
  }
}
