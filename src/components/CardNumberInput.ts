import Input,{IValue} from "./Input";

interface ICardNumberValue extends IValue {
    cardNumber?: string
}

/**
 * Component that can receive and validate a card number on its input
 */
class CardNumberInput extends Input {
    
    private _cardNumberInput: HTMLInputElement | undefined;

    /**
     * The card number input requires only one field, creating said field
     */
    protected handleCreationOfInputFields(): HTMLInputElement[] {
        const cardNumberInput: HTMLInputElement = document.createElement('input') as HTMLInputElement;
        cardNumberInput.placeholder = "1234 5678 9123 0000";
        
        this._cardNumberInput = cardNumberInput;

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

    /**
     * override to try and get the value on this input field
     * @returns ICardNumberValue
     */
    public override tryGetValue(): ICardNumberValue {
        let value: string | undefined = this._cardNumberInput?.value;
        this.setError(null);

        // return early if value is undefined
        if(value === undefined){
            return { success: false }
        }
        
        // Step 1: check if the string length matches
        value = value.split("").map((ch: string) => {
            if(ch === " ")
                return "";
            else return ch;
        }).toString();

        if(value.length !== 16){
            this.setError("Invalid Card Number");
            return {success: false}
        }
        
        return {
            success: true,
            cardNumber: value //the value here no longer has spaces
        }
    }
}

customElements.define("app-card-number-input",CardNumberInput);