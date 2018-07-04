import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs/Rx'

class Question {
  question:string;
  image:string;
  difficulty:string;
  answers:string[];
  rightAnswer:number;

  constructor(question, image, difficulty, answers, rightAnswer){
      this.question = question;
      this.image = image;
      this.difficulty = difficulty;
      this.answers = answers;
      this.rightAnswer = rightAnswer;
  }
}

@Component({
  selector: 'app-exercise2',
  templateUrl: './exercise2.component.html',
  styleUrls: ['./exercise2.component.css']
})

export class Exercise2Component implements OnInit {
  questions:object[] = [];
  random:number;
  userAnswer:number;
  timeout:boolean = false;
  loader:boolean = true;
  success:boolean = false;
  showStatus:boolean = false;

  constructor(public dialog: MatDialog) {}

  openDialog(question): void {
    let dialogRef = this.dialog.open(DialogOverview, {
      width: '350px',
      data: { question: question, newAnswer: undefined, rightAnswer: undefined}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result && result.rightAnswer) result.question.rightAnswer = result.rightAnswer
    });
  }

  returnRandom(min:number, max:number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  changeQuestion(currentQuestion) {
      let random:number,
          timer = Observable.timer(1500);
      this.showStatus = true;
      timer.subscribe(() => {
        this.showStatus = false;
        if (currentQuestion.rightAnswer === this.userAnswer) {
          if (this.random < 3) {
            random = this.returnRandom(3, 5);
          } else if (this.random < 6) {
            random = this.returnRandom(6, 8);
          } else {
            this.success = true;
            return false;
          }
        } else {
          if (this.random < 3) {
            random = this.returnRandom(0, 2);
          } else if (this.random < 6) {
            random = this.returnRandom(3, 5);
          } else {
            random = this.returnRandom(6, 8);
          }
        }
        if (this.random !== random) {
            this.loader = true;
            this.random = random;
            this.userAnswer = undefined;
            this.timeout = false;
        } else {
            this.changeQuestion(currentQuestion);
        }
      });
  }

  resetQuestions():void {
    this.random = this.returnRandom(0, 2);
    this.userAnswer = undefined;
    this.timeout = false;
    this.loader = true;
    this.success = false;
  }

  hideImage(): void {
    this.loader = false;
    let timer = Observable.timer(3000);
        timer.subscribe(() => this.timeout = true);
  }

  ngOnInit() {
    this.questions.push(
      new Question('Z jakiego filmu pochodzi scena?', 'https://media.giphy.com/media/ctThrZ834Ic3m/giphy.gif', 'łatwy', ['Titanic 3', 'Powrót do przyszłości 2', 'Las Vegas Parano'], 1),
      new Question('Jak miał na imię tytułowy bohater filmu?', 'https://media.giphy.com/media/gHcPh3ehbRGik/giphy.gif', 'łatwy', ['Drapichrust', 'K-PAX', 'ET'], 2),
      new Question('Co to za superbohater?', 'https://media.giphy.com/media/b0VK26c9Ne0ak/giphy.gif', 'łatwy', ['AS', 'Spiderman', 'Batman'], 2),
      new Question('Z jakiego filmu pochodzi scena?', 'https://media.giphy.com/media/l0HUldzuCa0S16SkM/giphy.gif', 'średni', ['The Room', 'Disaster Artist', 'Przeminęło z wiatrem'], 0),
      new Question('Kto wcielił się w postać Holly w filmie „Śniadanie u Tiffany’ego”?', 'https://media.giphy.com/media/8087BPwFoZY0o/giphy.gif', 'średni', ['Sophia Loren', 'Audrey Hepburn', 'Tina Turner'], 1),
      new Question('Za jaki film Leonardo Dicaprio otrzymał Oskara?', 'https://media.giphy.com/media/LFqxF9yF8sRry/giphy.gif', 'średni', ['Gangi Nowego Jorku', 'Aviator', 'Zjawa'], 2),
      new Question('Jak miał na imię smok z filmu "Niekończąca się opowieść"?', 'https://media.giphy.com/media/11nqZwfoLGKPPa/giphy.gif', 'trudny', ['Falkor', 'Mocarz', 'Fion'], 0),
      new Question('Kto jest reżyserem filmu „Kochankowie z Księżyca”', 'https://media.giphy.com/media/9RsqYphkRclz2/giphy.gif', 'trudny', ['Francis Ford Coppola', 'Roman Polański', 'Wes Anderson'], 2),
      new Question('Z jakiego filmu pochodzi scena?', 'https://media.giphy.com/media/3oz8xzIL77ybFvYvAs/giphy.gif', 'trudny', ['Skazani na Shawshank', 'Grand Budapest Hotel', 'Symetria'], 1),
    );
    this.random = this.returnRandom(0, 2);
  }
}

@Component({
  selector: 'dialog-overview',
  templateUrl: 'dialog.component.html',
  styleUrls: ['./exercise2.component.css']  
})

export class DialogOverview {
  constructor(
    public dialogRef: MatDialogRef<DialogOverview>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  addNewAnswer(answers, newAnswer): void {
    if (newAnswer) answers.push(newAnswer);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

