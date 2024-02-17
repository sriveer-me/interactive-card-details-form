import Input from "./Input/Input";

export default class CardNumberInput extends Input {
    /**
     * Override to get name of the label
     */
    protected override getLabelName(): string {
        return 'card number';
    }
    protected placeholderText: string = "1234 5678 9123 0000";
    protected inputMaxLength: number = 19;

    /**
     * Concrete implementation of inError method, will now know if in error.
     * @returns an array containing an inError boolean flag and a message, this message will be null if flag is false
     */
    public override inError(): [boolean, string | null] {
        let value: string = this.getRawInputValue();
        let inError = false;
        let errorMessage: string | null = null;

        if(value === ""){
            inError = true;
            errorMessage = "can't be blank";
        }
        else {
            value = value
                        .split("")
                        .map((ch: string) => ch===" "?"":ch)
                        .join("");
            if(value.length !== 16){
                inError = true;
                errorMessage = "invalid card number";
            }
        }

        return [inError,errorMessage]
    }

    /**
     * The value string has changed, see if you want to do some processing.
     * @param newStringValue : this is the value currently on input, use this to do processing in child 
     * @returns: this return value will be the new value on the input, useful for formatting if nothing else (ex- credit card number).
     */
    protected handleValueStringChanged(newStringValue: string): string {
        const notDigitRegEx = /\D/gi;
        // @ts-ignore ignoring as replaceAll requires me to change some stuff up in probably tsConfig
        newStringValue = newStringValue.replaceAll(notDigitRegEx,"").slice(0,16); //todo: remove the ts-ignore above
        if(newStringValue.length > 0){
            const lastChar: string = newStringValue[newStringValue.length-1];
            if(/\d/.test(lastChar) == false) { 
                //delete the character since it is not a number
                newStringValue = newStringValue.slice(0,newStringValue.length-1);
            }
        }

        newStringValue = newStringValue
                            .split("")
                            .map((ch: string,index: number) => (index !== 0 && index % 4 === 0)? ` ${ch}`:ch)                 
                            .join("");
        
        return newStringValue;
    };
}