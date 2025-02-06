import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
    selector: 'app-rules',
    imports: [CommonModule, MatDialogModule],
    templateUrl: './rules.component.html',
    styleUrl: './rules.component.sass'
})
export class RulesComponent {

    constructor(
        public dialogRef: MatDialogRef<RulesComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { message: string }
    ) { }

    closeDialog() {
        this.dialogRef.close();
    }
}
