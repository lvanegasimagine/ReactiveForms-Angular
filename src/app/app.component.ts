import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  dataForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.inializarFormulario();
  }

  createHijos(): FormGroup{
    return this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: ['', Validators.required]
    })
  }

  inializarFormulario(){
    this.dataForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      hijos: this.fb.array([this.createHijos()])
    })
  }

  get hijos(){
    return this.dataForm.get('hijos') as FormArray;
  }

  agregarHijos(){
    this.hijos.push(this.createHijos());
  }

  borrarHijos(i: number){
    this.hijos.removeAt(i);
  }

  guardar(){
    console.log(this.dataForm.value);
  }
}
