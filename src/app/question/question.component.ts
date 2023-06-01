import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../service/question.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  name: string = "";
  questionList : any = [];
  currentQuestion : number = 0;
  points: number = 0;
  counter: number = 60; 
  numCorrectAns: number = 0;
  numIncorrectAns: number = 0;
  interval$:any;
  progress: string ="0";

  constructor(private questionService : QuestionService) { }

  ngOnInit(): void {
    this.name = localStorage.getItem('name')!;
    this.getAllQuestions();
    this.StartCounter();
  }

  getAllQuestions(){
    this.questionService.getQuestionJSON().subscribe(res => this.questionList = res.questions);
  }

  NextQuestion(){
    this.currentQuestion++;
    this.ResetCounter();
  }

  PrevQuestion(){
    if(this.currentQuestion > 0)
      this.currentQuestion--;
  }

  CheckAnswer(questionNumber:number, option:any){
    if(option.correct){
      this.points += 10;
      this.numCorrectAns++;
    } else{
      this.points-=10;
      this.numIncorrectAns++;
    }
    setTimeout(()=>{
      this.currentQuestion++;
      this.ResetCounter();
      this.getProgress();
    }, 1000);
  }

  StartCounter(){
    this.interval$ = interval(1000).subscribe((val) =>{
      this.counter--;
      if(this.counter === 0){
        this.currentQuestion++;
        this.counter = 60;
        this.points -= 10;
      }
    });

    // Stop counter after 10 mins
    setTimeout(()=>{
      this.interval$.unsubscribe();
    }, 600000)
  }

  StopCounter(){
    this.interval$.unsubscribe();
    this.counter = 0;
  }

  ResetCounter(){
    this.StopCounter();
    this.counter = 60;
    this.StartCounter();
  }

  ResetQuiz(){
    this.ResetCounter();
    this.getAllQuestions();
    this.points=0;
    this.currentQuestion=0;
    this.getProgress();
  }

  getProgress(){
    this.progress = ((this.currentQuestion/this.questionList.length)*100).toString();
    return this.progress;
  }

}
