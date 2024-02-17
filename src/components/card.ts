import './card.scss';

class Card extends HTMLElement {
    constructor(){
        super();
    }
    connectedCallback(): void{
        this.classList.add('card');
    }
}

export class CardFront extends Card {

    private placeholderName: string = "Jane Appleseed";

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
        //? it is assumed that only one of this component exists, that is why card-front is also set as an id
        this.id = 'card-front';
        this.classList.add('card-front');

        //Set placeholders
        const nameSpan = this.querySelector('.name') as HTMLSpanElement;
        nameSpan.textContent = this.placeholderName;
    }

    /**
     * Api to set the displayed name
     * @param name string to set as the name, passing in anything that can be coerced to false means placeholder is set
     */
    setNameToDisplay(name:string){
        const nameSpan = this.querySelector('.name') as HTMLSpanElement;
        nameSpan.textContent = name || this.placeholderName;
    }

    /**
     * Api to set the displayed card number
     * Only formatting will be done here, NO VALIDATION checks
     * @param cardNumber card number with spaces in between
     */
    setCardNumberToDisplay(cardNumber: string){
        const cardNumberFields: Array<HTMLSpanElement> = [
            this.querySelector('.card-number-set-1') as HTMLSpanElement,
            this.querySelector('.card-number-set-2') as HTMLSpanElement,
            this.querySelector('.card-number-set-3') as HTMLSpanElement,
            this.querySelector('.card-number-set-4') as HTMLSpanElement        
        ];
        const cardNumberGroups = cardNumber.split(" ")
        for(let i=0;i<4;i++){
            const numbers = cardNumberGroups[i] || "0000";
            cardNumberFields[i].textContent = numbers.padEnd(4,'0');
        }
    }

    /**
     * Api to set the displayed expiry date
     * Only formatting will be done here NO VALIDATION checks on wether the date is valid
     * @param month mm,m are both okay
     * @param year yy,y are both okay
     */
    setExpiryDateToDisplay(month: Number, year: Number){
        const expiryDate = this.querySelector('.expiry-date') as HTMLSpanElement;
        expiryDate.textContent = `${month.toString().padStart(2,'0')}/${year.toString().padStart(2,'0')}`;
    }
}

export class CardBack extends Card {
    constructor(){
        super();
    }

    connectedCallback(): void {

        //initialize things specific to all cards
        super.connectedCallback();

        //initialize the object with template card back
        const template = document.getElementById('card-back-template') as HTMLTemplateElement;
        this.append(template.content.cloneNode(true));

        //this card is of type card-back.
        //? it is assumed that only one of this component exists, that is why card-back is also set as an id
        this.id = 'card-back';
        this.classList.add('card-back');
    }

    /**
     * Api to set the displayed CVC field 
     * only formatting, NO VALIDATION will be performed here.
     * @param cvc: Pass in a string to display
     */
    setCVCToDisplay(cvc: string){
        const cvcField = this.querySelector('.cvc') as HTMLSpanElement;
        cvcField.textContent = cvc.padEnd(3,'0');
    }
}