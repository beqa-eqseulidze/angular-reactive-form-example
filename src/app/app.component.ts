import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupName, FormArray, FormBuilder } from '@angular/forms';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {
  title = 'reaqtiv-form';

  constructor(
    public fb: FormBuilder
  ) { }

  public form: FormGroup = this.fb.group({

    // ფორმ კონტროლი სახელისთვის
    firstName: new FormControl("", [
      Validators.required,
      Validators.pattern(/^[a-zA-Zა-ჰ]+$/) // მხოლოდ ქართული და ლათინური ასობით(ციფრები და სხვა სიმბოლოები არ მიიღება);
    ]),

    // ფორმ კონტროლი გვარისთვის
    lastName: new FormControl("", [
      Validators.required,
      Validators.pattern(/^[a-zA-Zა-ჰ]+$/) // მხოლოდ ქართული და ლათინური ასობით(ციფრები და სხვა სიმბოლოები არ მიიღება);
    ]),

    //ფორმ კონტროლი დაბადების წლისათვის 
    dataOfBirth: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d+$/),  //ვალიდაცია მხოლოდ ციფრებისთვის;
      Validators.min(1900),  // მინ რიცხვი რაც ვალიდურია იქნება 1900 ;
      Validators.max(new Date().getFullYear()) // მაქსიმალური რიცხვი რაც ვალიდურია იქნება მიმდინარე წელი;  
    ]),

    //ფორმ კონტროლი განათლების შესახებ 
    education: new FormArray([]),

    //ფორმ კონტროლი გამოცდილების შესახებ 
    experience: new FormArray([]),

    //ფორმ კონტროლი გამოცდილების შესახებ 
    contactInfo: new FormGroup({
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d+$/),
        Validators.minLength(9)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i),
      ])
    })
  });

  get educations(): FormArray {
    return this.form.get('education') as FormArray;
  };

  get experience(): FormArray {
    return this.form.get('experience') as FormArray;
  };

  addEducation() {
    let education = new FormGroup({
      universityName: new FormControl('', [Validators.required]),
      qualification: new FormControl('', [Validators.required]),
      educationStart: new FormControl('', [Validators.required]),
      educationEnd: new FormControl('', [Validators.required])
    });
    (this.form.controls['education'] as FormArray).push(education);
  };

  addExperience(): void {
    let experience = new FormGroup({
      companyName: new FormControl('', [Validators.required]),
      position: new FormControl('', [Validators.required]),
      workingStart: new FormControl('', [Validators.required]),
      workingEnd: new FormControl('', [Validators.required])
    });
    (this.form.controls['experience'] as FormArray).push(experience);
  };

  removeEducation(index: number): void {
    (this.form.controls['education'] as FormArray).removeAt(index);
  };

  removeExperience(index: number): void {
    (this.form.controls['experience'] as FormArray).removeAt(index);
  };

  clearEducation(): void {
    (this.form.controls['education'] as FormArray).clear();
  };

  clearExperience(): void {
    (this.form.controls['experience'] as FormArray).clear();
  };

  submit() {
    if (this.form.valid) {
      console.log(this.form.value);

      this.form.reset();
      this.clearEducation();
      this.clearExperience();
    }
  };

}
