import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ExaminationService } from '../../../services/examination_service/examination.service';
import { pagedResponse } from '../../../models/interfaces/pagedResponse';
import { ExaminationResponseModel } from '../../../models/classes/examination';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BatchResultService } from '../../../services/batch-result_service/batch-result.service';

@Component({
  selector: 'app-upload-result',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './upload-result.component.html',
  styleUrl: './upload-result.component.css'
})
export class UploadResultComponent {

  batchResultService = inject(BatchResultService)
  examService = inject(ExaminationService)
  uploadForm: FormGroup;
  selectedFileName: string = 'Choose File';
  examinations: ExaminationResponseModel[] = [];
  router = inject(Router)

  constructor(private formBuilder: FormBuilder) {
    this.uploadForm = this.formBuilder.group({
      uploadFile: [null],
      selectedExam: [null] 
    });

    
    this.getExaminations();
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFileName = file.name;
      this.uploadForm.patchValue({
        uploadFile: file
      });
    } else {
      this.selectedFileName = 'Choose File';
    }
  }

  onSubmit(): void {
    if (this.uploadForm.get('uploadFile')?.value) {
      const formData = new FormData();
      const fileInput = (document.getElementById('uploadFile') as HTMLInputElement).files;
      if (fileInput && fileInput.length > 0) {
        const file = fileInput[0];
        const selectedExam = this.uploadForm.get('selectedExam')?.value;

        formData.append('file', file);
        this.batchResultService.uploadResult(formData, selectedExam).subscribe({
          next: (response) => {
            alert('File uploaded successfully:');
            console.log('Result uploaded successfully:', response);
            this.router.navigate(['/batchResults']);
          },
          error: (error) => {
            console.error('File upload failed:', error);
          }
        });
      } else {
        alert('Please select a file to upload.');
      }
    } else {
      alert('Please select a file to upload.');
    }
  }

  getExaminations() {
    const params = { pageSize: 0, pageNumber: 0 };
    this.examService.getExaminations(params).subscribe((response: pagedResponse) => {
      if (response.isSuccessful) {
        this.examinations = response.data;
        alert(response.message)
        console.log('examinations', this.examinations)
      } else {
        alert(response.message);
      }
    });
  }
}
