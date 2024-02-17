import Input from "./Input/Input";

export default class CVCInput extends Input {
    /**
     * Override to get name of the label
     */
    protected override getLabelName(): string {
        return 'cvc'
    }
    protected readonly placeholderText: string = "e.g. 123";
    protected inputMaxLength: number = 3;
    
    /**
     * Concrete implementation of inError method, will now know if in error.
     * @returns an array containing an inError boolean flag and a message, this message will be null if flag is false
     */
    public override inError(): [boolean, string | null] {
        
        let inError = false;
        let errorMessage: string | null = null;
        
        const value = this.getRawInputValue();
        const numValue: number = parseInt(value);
        
        if(value === "") {
            inError = true;
            errorMessage = "can't be blank";
        }
        else if(!(Number.isInteger(value) && numValue >= 100 && numValue < 1000)){
            inError= true;
            errorMessage = "Invalid CVC";
        }
        return [inError,errorMessage];
    }

    /**
     * The value string has changed, see if you want to do some processing.
     * @param newStringValue : this is the value currently on input, use this to do processing in child 
     * @returns: this return value will be the new value on the input, useful for formatting if nothing else (ex- credit card number).
     */
    protected handleValueStringChanged(newStringValue: string): string {
        let str: string = newStringValue.slice(0,3);
        if(str.length > 0){
            const lastChar = str[str.length -1];
            if(/\d/.test(lastChar) === false){
                str = str.slice(0,str.length-1);
            }
        }
        return str;
    };
}