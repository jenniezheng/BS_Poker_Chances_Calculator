if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) {
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };
}

function test(){
  let c= new Card(0,1)

  return c.draw()
}

function hi(){
  let c = new Card_Set();
  c.add(new Card(0,2))
  c.add(new Card(1,2))
  c.add(new Card(2,2))
  c.add(new Card(3,2))

  return c.getCards(2).toString() +c.getCards(2).toString()+c.getCards(2).toString()+c.getCards(2).toString()+c.getCards(2).toString()
}


class Card {
   constructor(card_num,suit_num, deck=0) {
      if(card_num>=13 || card_num<0){
        throw 'Error invalid card number '+card_num;
      }
     if(suit_num>=4 || suit_num<0){
        throw 'Error invalid suit number '+suit_num;
      }
      this.card = card_num;
      this.suit = suit_num;
      this.deck = deck;
   }

  get suit_str(){
   switch (this.suit) {
     case 0: return 'Spades'
     case 1: return 'Clubs'
     case 2: return 'Diamonds'
     case 3: return 'Hearts'
    }
  }

  get card_str(){
   switch (this.card) {
     case 9: return 'Jack'
     case 10: return 'Queen'
     case 11: return 'King'
     case 12: return 'Ace'
     default: return (this.card+2).toString()
    }
  }

  toString(){
    return "{0} of {1}, Set {2}".format(this.card_str, this.suit_str, this.deck)
  }

  valueOf() {
    return this.card*100+this.suit*10+this.deck
  }

    draw() {
      switch(this.suit){
        case 0: return <CardIcon suit='&spades;' card={this.card_str}/>
         case 1: return <CardIcon suit='&clubs;' card={this.card_str}/>
         case 2: return <CardIcon suit='&diams;' card={this.card_str}/>
         case 3: return <CardIcon suit='&hearts;' card={this.card_str}/>
    }
  }
}


class Card_Set {
  constructor(cards=[]) {
      this.cards=cards
      this.shuffleCards()
      this.pointer=0
   }

  decks(num_decks){
    this.cards=[]
    for(let deck=0;deck<num_decks;deck++){
      for(let card_num=0;card_num<13;card_num++){
        for(let suit_num=0;suit_num<4;suit_num++){
          this.add(new Card(card_num,suit_num,deck))
        }
      }
    }
    this.shuffleCards()
  }

  add(card){
    if(card instanceof Card)
      this.cards.push(card)
    else
      throw 'Error card not instanceof Card'
  }

  shuffleCards() {
    for (let i = this.cards.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  indexOfCard(card){
    if(card instanceof Card){
      for (let i=0;i<this.cards.length;i++){
        if(this.cards[i].valueOf()==card.valueOf())
          return i
        }
      return -1
    }
    else
      throw 'Error card not instanceof Card'
  }

  remove(card){
    let index= this.indexOfCard(card)
    if(index!=-1)
      this.cards.splice( index, 1 );
  }

  toString(){
    let myString=''
    for (let card of this.cards){
        myString+=card.toString()+'; '
    }
    return myString
  }

  getCards(num){
    if(num>this.cards.length)
      throw 'Error tried to get '+num+' cards when only '+this.cards.length+' cards in set'

    if(this.pointer+num>this.cards.length){
      this.shuffleCards()
      this.pointer=0
    }

    let result= new Card_Set(this.cards.slice(this.pointer,num))
    this.pointer+=num
    return result
  }
}

class Test extends React.Component {
  render() {
    return <div>
      <h1>Test</h1>
      <p>{hi()} </p>
      {test()}
    </div>;
  }
}

class CardIcon extends React.Component {
  render() {
    console.log(this.props.suit)
    return <div className="card">
      <p>{this.props.suit} </p>
      <p>{this.props.card} </p>
    </div>;
  }
}

class Header extends React.Component {
  render() {
    return <div className="head">
      <h1>BS Poker Calculator</h1>
    </div>;
  }
}

class Rules extends React.Component {
  render() {
    return <div>
      <h1>Rules</h1>
      <p>BS poker is a card game with rules as follows. A set number of cards is dealt to each player. The players go around a circle calling out higher and higher poker hands, trying to guess which poker hands can be adequately formed using the cards pooled together by all the players. Then when one player calls BS, all cards are revealed. If the last claim was true, the player who called BS loses. If it was false, the player who was convicted of BS loses.
<br/>
Special Notes: 2's are wild cards which can represent any suit and any number/royal. Poker hands are a minimum of 5 cards but can be longer.</p>
    </div>;
  }
}


class Statistics extends React.Component {
  render() {
    return <div>
      <h1>Stats</h1>
      <p>Chances of... </p>
    </div>;
  }
}

class Calculator extends React.Component {
  render() {
    return <div>
      <h1>Calculator</h1>
      <p></p>
    </div>;
  }
}

class Application extends React.Component {
  render() {
    return <div>
      <Test/>
      <Header/>
      <Rules/>
      <Statistics/>
      <Calculator/>
    </div>;
  }
}


ReactDOM.render(<Application />, document.getElementById('app'));