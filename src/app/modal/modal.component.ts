import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, OnInit, Output, ViewChild, WritableSignal, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalComponent {

  @Input() dialogTitle!: string
  @Input() isOpen: WritableSignal<boolean> = signal(false)

  @ViewChild('appDialog', { static: true }) dialog!: ElementRef<HTMLDialogElement>;
  cdr = inject(ChangeDetectorRef);

  constructor() {
    effect(() => {
      if (this.isOpen() === true) {
        this.dialog.nativeElement.showModal()
      }
    })
  }

  closeModal() {
    this.dialog.nativeElement.close()
    this.markClosed()
  }

  markClosed() {
    console.log('closing feedback')
    this.isOpen.set(false)
  }
  
}
