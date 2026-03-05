import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-contact-p',
  standalone:true,
  imports: [RouterLink, RouterModule],
  templateUrl: './contact-p.html',
  styleUrl: './contact-p.css',
})
export class ContactPComponent {

  copyToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      alert('Copied to clipboard: ' + text);
    }).catch(err => {
      console.error('Could not copy text: ', err);
    });
  }
}
