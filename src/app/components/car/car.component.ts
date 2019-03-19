import {Component, Input, OnInit} from '@angular/core';
import {Car} from '../../interfaces/Car';
import {NgModel} from '@angular/forms';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent {

  public car: Car =  {
    name: 'Mitsubishi Eclipse',
    mileage: 35000,
    fuelMax: 64,
    fuelCurrent: 10,
    characteristics: ['Двигатель 2 литра', 'Максимальная скорость 220км/ч', 'Тип кузова Купе', 'расход 15л на 100км']
  };

  plusFuel: number = 0;
  way: number = 0;
  exccess_fuel: number;
  literPerHundredKm: number = 0.15;

  constructor() { }
  // Метод езды
  public drive(kilometers: number):  void | boolean {
    for (let i: number = 0; i < kilometers; i++) {
      setTimeout(() => {
      if (this.car.fuelCurrent > 0.15) {
          this.car.mileage += 1;
          this.car.fuelCurrent -= this.literPerHundredKm;
          if (this.exccess_fuel && this.exccess_fuel > 0.2 && this.car.fuelCurrent < 15) {
            this.refuel(this.exccess_fuel);
            // Хотел очень спать, поэтому упрощенный функционал здесь
            this.exccess_fuel = 0;
          }
      } else {
        return false;
      }
       }, 20 * (i + 1));
    }
  }

  // Метод заправки

  public refuel(fuel: number): void {
    if ((this.car.fuelCurrent + fuel) > this.car.fuelMax) {
      this.exccess_fuel = (this.car.fuelCurrent + fuel) - this.car.fuelMax;
      this.car.fuelCurrent = this.car.fuelMax;
    } else {
    this.car.fuelCurrent += fuel;
    }
  }

}
