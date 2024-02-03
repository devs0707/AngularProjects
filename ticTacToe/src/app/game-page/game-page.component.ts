import { Component } from '@angular/core';
import { range } from 'rxjs';

export class User {
  constructor(
    public userName: any,
    public score: any
  ) { }
}
export enum State {
  None = 0,
  X = 1,
  O = 2
}
export interface ICell {
  row: number;
  col: number;
  state: State;
  winningCell: boolean;
}

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css']
})
export class GamePageComponent {
  userOne = "";
  userTwo = "";
  isUserNameAvail: boolean = false;
  u1Score: number = 0;
  u2Score: number = 0;
  users: User[] = [];
  btn: ICell[][] = new Array(3).fill(null)
  tempRows: number[] = [0, 1, 2]
  turnTo: State = State.X;
  matrix: number[] = new Array(9).fill(0)
  message: string = 'Your Turn';
  disableGame = false

  constructor() {
    for (let i = 0; i < 3; i++) {
      this.btn[i] = new Array(3);
      for (let j = 0; j < 3; j++) {
        this.btn[i][j] = {
          row: i,
          col: j,
          state: State.None,
          winningCell: false
        };
      }
    }
  }

  submitUserName() {
    console.log(this.userOne);
    console.log(this.userOne);
    this.isUserNameAvail = true;
    this.users.push(new User(this.userOne, this.u1Score));
    this.users.push(new User(this.userTwo, this.u2Score));
    this.message = 'Your Turn ' + this.userOne;
  }
  updateScore(selectedUser: User) {
    console.log(this.users.filter(u => {
      if (u === selectedUser)
        u.score += 1;
    }))
    // this.users[index].score += 1;
  }
  resetGame() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        this.btn[i][j].state = State.None
      }
    }
    this.disableGame = false;
    this.matrix.fill(0);
    this.turnTo = State.X;
    this.message = 'Your Turn ' + this.userOne;
  }
  changeValue(clickedButton: ICell) {
    console.log(clickedButton)
    clickedButton.state = this.turnTo
    this.matrix[(clickedButton.row * 3) + clickedButton.col] = this.turnTo
    this.winnerCheck();
    if (!this.disableGame) {
      if (this.turnTo === State.O) {
        this.turnTo = State.X;
        this.message = 'Your Turn ' + this.userOne;
      } else {
        this.turnTo = State.O;
        this.message = 'Your Turn ' + this.userTwo;
      }
    }
  }

  winnerCheck() {
    console.log(this.matrix)
    if (!this.matrix.includes(0)) {
      console.log("It Workd")
    }
    if ((
      (this.matrix[0] != 0 && this.matrix[0] == this.matrix[1] && this.matrix[1] == this.matrix[2]) ||
      (this.matrix[3] != 0 && this.matrix[3] == this.matrix[4] && this.matrix[4] == this.matrix[5]) ||
      (this.matrix[6] != 0 && this.matrix[6] == this.matrix[7] && this.matrix[7] == this.matrix[8]) ||
      // For Rows
      (this.matrix[0] != 0 && this.matrix[0] == this.matrix[3] && this.matrix[3] == this.matrix[6]) ||
      (this.matrix[1] != 0 && this.matrix[1] == this.matrix[4] && this.matrix[4] == this.matrix[7]) ||
      (this.matrix[2] != 0 && this.matrix[2] == this.matrix[5] && this.matrix[5] == this.matrix[8]) ||
      // For Diagonals
      (this.matrix[0] != 0 && this.matrix[0] == this.matrix[4] && this.matrix[4] == this.matrix[8]) ||
      (this.matrix[2] != 0 && this.matrix[2] == this.matrix[4] && this.matrix[4] == this.matrix[6]))) {
      this.disableGame = true;
      if (State.X == this.turnTo) {
        this.message = "Congratulation !!! " + this.userOne + " You Won !!!";
        this.users[0].score += 1;
      } else {
        this.message = "Congratulation !!! " + this.userTwo + " You Won !!!"
        this.users[1].score += 1;
      }
    } else if (!this.matrix.includes(0)) {
      alert("This match is Draw!!")
    }
  }
}
