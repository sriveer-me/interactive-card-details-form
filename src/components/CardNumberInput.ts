import Input from "./Input";

class CardNumberInput extends Input {
    
    /**
     * The card number input requires only one field, creating said field
     */
    protected handleCreationOfInputFields(): HTMLInputElement[] {
        const cardNumberInput: HTMLInputElement = document.createElement('input') as HTMLInputElement;
        cardNumberInput.placeholder = "1234 5678 9123 0000";
        
        cardNumberInput.addEventListener("input",function (event: Event){
            // @ts-ignore ignoring as replaceAll requires me to change some stuff up in probably tsConfig 
            let str: string = cardNumberInput.value.replaceAll(" ","").slice(0,16); //todo: remove the ts-ignore above
            if(str.length > 0){
                const lastChar: string = str[str.length-1];
                if(/\d/.test(lastChar) == false) { 
                    //delete the character since it is not a number
                    str = str.slice(0,str.length-1);
                }
            }
            
            let formattedStr: string = "";
            for(let i = 0; i< str.length; i++){
                if(i !== 0 && i % 4 === 0){
                    formattedStr += " ";
                }
                formattedStr += str[i];
            }
            cardNumberInput.value = formattedStr;
        });
        return [cardNumberInput];
    }

    /**
     * Override to get this fields name
     */
    protected getLabelName(): string {
        return 'card number';
    }
}

customElements.define("app-card-number-input",CardNumberInput);