import { Component, OnInit } from '@angular/core';
import { PartidasService } from '../../servicios/partidas/partidas.service';

@Component({
  selector: 'app-elahorcado',
  templateUrl: './elahorcado.component.html',
  styleUrls: ['./elahorcado.component.css'],
})
export class ElahorcadoComponent implements OnInit {
  palabra: string;
  correctLetters = [];
  wrongLetters = [];
  playable = true;

  constructor(private partidasSvc: PartidasService) {
    this.palabra = this.obtenerPalabra();
  }

  ngOnInit(): void {
    const playAgainBtn = document.getElementById('play-button');
    const popup = document.getElementById('popup-container');

    // Restart game and play again
    playAgainBtn.addEventListener('click', () => {
      this.playable = true;

      //  Empty arrays
      this.correctLetters.splice(0);
      this.wrongLetters.splice(0);
      this.palabra = this.obtenerPalabra();

      this.displayWord();

      this.updateWrongLettersEl();

      popup.style.display = 'none';
    });
    // Keydown letter press
    window.addEventListener('keydown', (e) => {
      if (this.playable) {
        if (e.keyCode >= 65 && e.keyCode <= 90) {
          const letter = e.key.toLowerCase();

          if (this.palabra.includes(letter)) {
            if (!this.correctLetters.includes(letter)) {
              this.correctLetters.push(letter);

              this.displayWord();
            } else {
              this.showNotification();
            }
          } else {
            if (!this.wrongLetters.includes(letter)) {
              this.wrongLetters.push(letter);

              this.updateWrongLettersEl();
            } else {
              this.showNotification();
            }
          }
        }
      }
    });

    this.displayWord();
  }

  obtenerPalabra(): string {
    const palabras = ['programacion', 'computadora', 'redes', 'aplicacion'];

    return palabras[Math.floor(Math.random() * palabras.length)];
  }

  displayWord() {
    const popup = document.getElementById('popup-container');
    const wordEl = document.getElementById('word');
    const finalMessage = document.getElementById('final-message');

    wordEl.innerHTML = `
      ${this.palabra
        .split('')
        .map(
          (letter) => `
            <span class="letter">
              ${this.correctLetters.includes(letter) ? letter : ''}
            </span>
          `
        )
        .join('')}
    `;

    const innerWord = wordEl.innerText.replace(/[ \n]/g, '');

    if (innerWord === this.palabra) {
      
      finalMessage.innerText = 'Ganaste 😃';
      popup.style.display = 'flex';
    }
  }

  updateWrongLettersEl() {
    // Display wrong letters
    const figureParts = document.querySelectorAll('.figure-part');
    const wrongLettersEl = document.getElementById('wrong-letters');
    const finalMessage = document.getElementById('final-message');
    const finalMessageRevealWord = document.getElementById(
      'final-message-reveal-word'
    );
    const popup = document.getElementById('popup-container');

    wrongLettersEl.innerHTML = `
      ${this.wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
      ${this.wrongLetters.map((letter) => `<span>${letter}</span>`)}
    `;

    // Display parts
    figureParts.forEach((part: any, index) => {
      const errors = this.wrongLetters.length;

      if (index < errors) {
        part.style.display = 'block';
      } else {
        part.style.display = 'none';
      }
    });

    // Check if lost
    if (this.wrongLetters.length === figureParts.length) {
      finalMessage.innerText = 'Perdiste. 😕';
      finalMessageRevealWord.innerText = `La palabra era: ${this.palabra}`;
      popup.style.display = 'flex';

      this.playable = false;
    }
  }

  // Show notification
  showNotification() {
    const notification = document.getElementById('notification-container');

    notification.classList.add('show');

    setTimeout(() => {
      notification.classList.remove('show');
    }, 2000);
  }
}
