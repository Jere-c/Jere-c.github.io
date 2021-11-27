import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FaqService, IdQuestion, question } from 'src/app/services/faq.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

  user!: any;

  questions!: IdQuestion[];

  question!: IdQuestion[];

  idQuestion!: string;

  formQuestion: FormGroup;

  editQuestion: FormGroup;

  submitted = false;

  loading = false;


  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private $questionService: FaqService,
    private auth: AuthService) {
    this.auth.logState().subscribe(resp => {
      this.user = resp;})
      this.formQuestion = this.fb.group({
        title: ['', Validators.required],
        description: ['', Validators.required],
      })
      this.editQuestion = this.fb.group({
        title: ['', Validators.required],
        description: ['', Validators.required],
      })
      this.$questionService.getQuestions().subscribe(data => {
        this.questions = data;
      })
    }


  //editar preguntas
  openQuestionEdit(id: string) {
      this.idQuestion = id;
      this.$questionService.getQuestion(id).subscribe(data => {
        this.editQuestion.patchValue({
          title: data.title,
          description: data.description
        })
      })
    }

//actualiza los valores de fst
  update(){
      const question: question = {
        title: this.editQuestion.value.title,
        description: this.editQuestion.value.description
      } 
      this.$questionService.updateQuestion(this.idQuestion, question)
    }

  //borrar preguntas
  delete (id: string){
      this.$questionService.deleteQuestion(id);
    }

    ngOnInit(): void {
      document.querySelector('.dou')?.classList.add('dount')
    }

    //agregar preguntas
    addQuestion() {
      const question: question = {
        title: this.formQuestion.value.title,
        description: this.formQuestion.value.description,
      }
      this.loading = true;
      this.$questionService.createQuestion(question).then(() => {
        this.toastr.success("¡Pregunta agregada exitosamente!")
        this.loading = false;
      }).catch(error => {
        console.log(error);
        this.loading = false;
      })
    }
  }
