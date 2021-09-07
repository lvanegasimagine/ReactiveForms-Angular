import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';


const ELEMENT_DATA = {
  "email": "nice",
  "password": "nice@nice.com",
  "hijos": [{
    "nombre": "vanegas",
    "apellido": "morales",
    "edad": "15",
  },
  {
    "nombre": "morales",
    "apellido": "vanegas",
    "edad": "15",
  }]
}
@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  dataForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.inializarFormulario();
    this.dataForm.setValue({
       email: ELEMENT_DATA.email,
       password: ELEMENT_DATA.password,
      //  hijos: this.fb.array([
      //   "nombre": ELEMENT_DATA.nombre,
      //   "apellido": ELEMENT_DATA.apellido,
      //   "edad": ELEMENT_DATA.edad
      //  ])
    })
  }

  createHijos(): FormGroup{
    return this.fb.group({
      nombre: [ELEMENT_DATA.hijos['nombre'], Validators.required],
      apellido: [ELEMENT_DATA.hijos['apellido'], Validators.required],
      edad: [ELEMENT_DATA.hijos['edad'], Validators.required]
    })
  }

  inializarFormulario(){
    this.dataForm = this.fb.group({
      email: [ELEMENT_DATA.email, Validators.required],
      password: [ELEMENT_DATA.password, Validators.required],
      // hijos: this.fb.array([this.createHijos()])
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
  
  ngOnInit(): void {
    // console.log(ELEMENT_DATA);
    // console.log(this.dataForm.value);
    // this.dataForm.setValue(["AA", "BB", "CC"]);
    // console.log(this.dataForm.value);
  }

}
