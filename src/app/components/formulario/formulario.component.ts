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
  },
  {
    "nombre": "nice",
    "apellido": "to me",
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

  constructor(private fb: FormBuilder) {}

  ngOnInit(){
    this.inicializar();
    this.editarForm();
  }
  
  inicializar(){
    this.dataForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      hijos: this.fb.array([this.createHijos()])
    })
  }

  editarForm(){
    this.dataForm.patchValue({
      email: ELEMENT_DATA.email,
      password: ELEMENT_DATA.password
    });
    this.dataForm.setControl('hijos', this.setExistingHijos(ELEMENT_DATA.hijos));
  }

  setExistingHijos(hijosData: any): FormArray{
    const formArray = new FormArray([]);
    hijosData.forEach(s => {
      formArray.push(this.fb.group({
        nombre: s.nombre,
        apellido: s.apellido,
        edad: s.edad,
      }));
    });
  return formArray;
  }

  createHijos(): FormGroup{
    return this.fb.group({
      nombre: [ELEMENT_DATA.hijos['nombre'], Validators.required],
      apellido: [ELEMENT_DATA.hijos['apellido'], Validators.required],
      edad: [ELEMENT_DATA.hijos['edad'], Validators.required]
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
