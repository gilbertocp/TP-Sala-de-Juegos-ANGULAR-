import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-memotest',
  templateUrl: './memotest.component.html',
  styleUrls: ['./memotest.component.css']
})
export class MemotestComponent implements OnInit {

  cardArray = [
    {
      name: 'fritas',
      img: 'assets/imagenes/fritas.png'
    },
    {
      name: 'hamburguesa',
      img: 'assets/imagenes/hamburguesa.png'
    },
    {
      name: 'helado',
      img: 'assets/imagenes/helado.png'
    },
    {
      name: 'pizza',
      img: 'assets/imagenes/pizza.png'
    },
    {
      name: 'batido',
      img: 'assets/imagenes/batido.png'
    },
    {
      name: 'pancho',
      img: 'assets/imagenes/pancho.png'
    },
    {
      name: 'papas',
      img: 'assets/imagenes/papas.png'
    },
    {
      name: 'hamburguesa',
      img: 'assets/imagenes/hamburguesa.png'
    },
    {
      name: 'helado',
      img: 'assets/imagenes/helado.png'
    },
    {
      name: 'pizza',
      img: 'assets/imagenes/pizza.png'
    },
    {
      name: 'batido',
      img: 'assets/imagenes/batido.png'
    },
    {
      name: 'pancho',
      img: 'assets/imagenes/pancho.png'
    }
  ];

  grid;
  resultDisplay ;
  cardsChosen = []
  cardsChosenId = []
  cardsWon = []


  constructor() { 
    this.cardArray.sort(() => 0.5 - Math.random())
  }

  ngOnInit(): void {
    this.grid = document.querySelector('.grid')
    this.resultDisplay = document.querySelector('#result')
    this.createBoard();
  }


  createBoard() {
    for (let i = 0; i < this.cardArray.length; i++) {
      var card = document.createElement('img')
      card.setAttribute('src', '/assets/imagenes/blank.png')
      card.setAttribute('data-id', i.toString())
      card.addEventListener('click', this.flipCard)
      this.grid.appendChild(card)
    }
  }

   //check for matches
  checkForMatch() {
    var cards = document.querySelectorAll('img')
    const optionOneId = this.cardsChosenId[0]
    const optionTwoId = this.cardsChosenId[1]
    
    if(optionOneId == optionTwoId) {
      cards[optionOneId].setAttribute('src', '/assets/imagenes/blank.png')
      cards[optionTwoId].setAttribute('src', '/assets/imagenes/blank.png')
    }
    else if (this.cardsChosen[0] === this.cardsChosen[1]) {
      alert('Encontraste una pareja')
      cards[optionOneId].setAttribute('src', '/assets/imagenes/white.png')
      cards[optionTwoId].setAttribute('src', '/assets/imagenes/white.png')
      cards[optionOneId].removeEventListener('click', this.flipCard)
      cards[optionTwoId].removeEventListener('click', this.flipCard)
      this.cardsWon.push(this.cardsChosen)
    } else {
      cards[optionOneId].setAttribute('src', '/assets/imagenes/blank.png')
      cards[optionTwoId].setAttribute('src', '/assets/imagenes/blank.png')
      alert('Intentelo De nuevo')
    }
    this.cardsChosen = []
    this.cardsChosenId = []
    this.resultDisplay.textContent = this.cardsWon.length.toString();
    if  (this.cardsWon.length === this.cardArray.length/2) {
      this.resultDisplay.textContent = 'Ganaste'
    }
  }

  flipCard(e) {
    var cardId = e.target.getAttribute('data-id')
    this.cardsChosen.push(this.cardArray[cardId].name)
    this.cardsChosenId.push(cardId)
    e.target.setAttribute('src', this.cardArray[cardId].img)
    if (this.cardsChosen.length ===2) {
      setTimeout(this.checkForMatch, 500)
    }    
  }
}
