import './card.scss';

class Card extends HTMLElement {
    constructor(){
        super();
    }
    connectedCallback(): void{
        this.classList.add('card');
    }
}

class CardFront extends Card {
    constructor(){
        super();
    }
    connectedCallback(): void {

        //Initialize things specific to all cards
        super.connectedCallback();

        //initialize the object with template card front
        const template = document.getElementById('card-front-template') as HTMLTemplateElement;
        this.append(template.content.cloneNode(true));

        //this card is of type card-front
        this.classList.add('card-front');
    }
}

class CardBack extends Card {
    constructor(){
        super();
    }
    connectedCallback(): void {

        //initialize things specific to all cards
        super.connectedCallback();

        //initialize the object with template card back
        const template = document.getElementById('card-back-template') as HTMLTemplateElement;
        this.append(template.content.cloneNode(true));

        //this card is of type card-front
        this.classList.add('card-back');
    }

    /**
     * This function provides a clean api to set the cvv on display in the card for the user 
     * @param cvv: pass in a string to display on the card, must be 3 integers
     * @throws Error if cvv invalid
     */
    setCVV(cvv: string) {
        const cvvField = this.querySelector('.cvv') as HTMLSpanElement;
        if(cvv.match(/^[0-9]{3}$/)) {
            cvvField.textContent = '000';
            throw new Error(`cvv: ${cvv} is invalid!`);
        }
        else {
            cvvField.textContent = cvv;
        }
    }
}

customElements.define("app-card-front",CardFront);
customElements.define("app-card-back",CardBack);