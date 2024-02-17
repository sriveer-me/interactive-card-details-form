import BaseInput,{IBaseInputValue} from "./BaseInput";

/**
 * This interface is the return type for getValue() of any IInputValue
 */
export interface IInputValue extends IBaseInputValue {
    value: string
}

/**
 * The Input class is envisioned as the base class for all components having only one input field 
 */
export default abstract class Input extends BaseInput {
    private _inputField: HTMLInputElement | undefined;
    private _previousHandledString: string = "";

    protected readonly placeholderText: string = "placeholder text";
    protected readonly inputMaxLength: number = 20;
    protected readonly BLANK_ERROR_MSG = "Can't be blank";

    /**
     * Creates one input field 
     * @returns one input field
     */
    protected override handleCreationOfInputFields(): HTMLInputElement[] {
        const inputField: HTMLInputElement = document.createElement('input') as HTMLInputElement;
        inputField.placeholder = this.placeholderText;
        inputField.maxLength = this.inputMaxLength;

        inputField.addEventListener('input',function(e){
            e.stopImmediatePropagation(); //stop the propagation immediately, will use custom event from now on
                       
            const handledString = this.handleValueStringChanged(inputField.value); //ask the child if it wants to process the text
            if(handledString !== inputField.value){
                const newSelections = this.handleSelectionStartAndSelectionEnd(handledString);
                inputField.value = handledString;

                inputField.selectionStart = newSelections.newSelectionStart;
                inputField.selectionEnd = newSelections.newSelectionEnd;
            }

            if(this._inputFieldValue !== inputField.value) {
                this._inputFieldValue = inputField.value;
                this.dispatchEvent(new CustomEvent('input',{detail: this.getValue()}));
            }
        }.bind(this))

        this._inputField = inputField;
        return [this._inputField];
    }

    /**
     * One input field means set error text and set the input field to be in error
     * @param errorText: string if an error is to be set, anything coerced to false to clear said error
     */
    public override setError(errorText: string | null): void {
        if(errorText){
            this.setErrorText(errorText);
            if(this._inputField){
                //there is no scenario I can think of where this._inputField is undefined, the check is literally just to keep typescript happy
                this._inputField.classList.add('error'); 
            }
        }
        else{
            this.setErrorText(null);
            if(this._inputField){
                //there is no scenario I can think of where this._inputField is undefined, the check is literally just to keep typescript happy
                this._inputField.classList.remove('error'); 
            }
        }
    }

    /**
     * The value string has changed, see if you want to do some processing.
     * @param newStringValue : this is the value currently on input, use this to do processing in child 
     * @returns: this return value will be the new value on the input, useful for formatting if nothing else (ex- credit card number).
     */
    protected handleValueStringChanged(newStringValue: string): string { return newStringValue };

    /**
     * HandleValueStringChanged has already been called, use this method to adjust cursor position when input.value is updated 
     * @param handledString this string will be set as the input.value shortly, see if I wish to change the selection start and selection end    
     * @returns an object containing the newSelectionStart and newSelectionEnd keys
     */
    private handleSelectionStartAndSelectionEnd(handledString: string): {newSelectionStart: number, newSelectionEnd: number} {
        let newSelectionStart: number = this._inputField?.selectionStart as number;
        let newSelectionEnd: number = this._inputField?.selectionEnd as number;
        const isSelectionStartAtEnd = (newSelectionStart === this._inputField?.value.length);

        if(isSelectionStartAtEnd) {
            newSelectionStart = handledString.length;
            newSelectionEnd = handledString.length;
        }
        else if(handledString.length < (this._inputField?.value.length as number)){
            newSelectionStart -= 1;
            newSelectionEnd -= 1;
        }
        return { newSelectionStart,newSelectionEnd }
    }

    /**
     * Helper method to set placeholder text (watermark) on this component
     * @param placeholderText 
     */
    public setPlaceholderText(placeholderText: string): void {
        if(this._inputField) {
            //I don't see a scenario where this._inputField is undefined, this check is here to appease typescript 
            this._inputField.placeholder = placeholderText;
        }
    }

    /**
     * Override for getValue supported by all BaseInput components
     * @returns IInputValue which has the value on this input field
     */
    public override getValue(): IInputValue {
        const [inError,errorMessage] = this.inError();
        const value = this._inputField?.value;

        return {
            inError,
            errorMessage,
            value: value || ""
        }
    }

    /**
     * Helper method to access the value field on this input  
     * @returns this._inputField.value
     */
    protected getRawInputValue(): string {
        return this._inputField?.value || "";
    }
}
