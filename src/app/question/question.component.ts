import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../service/question.service';

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

  constructor(private questionService : QuestionService) { }

  ngOnInit(): void {
    this.name = localStorage.getItem('name')!;
    this.getAllQuestions();
  }

  getAllQuestions(){
    this.questionService.getQuestionJSON().subscribe(res => this.questionList = res.questions);
  }

  NextQuestion(){
    this.currentQuestion++;
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
    this.currentQuestion++;
  }

}
