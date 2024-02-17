import BaseInput, { IBaseInputValue } from "./Input/BaseInput";

export interface IDateInputValue extends IBaseInputValue {
    month?: Number,
    year?: Number
}

export default class DateInput extends BaseInput {
    
    private _monthInput: HTMLInputElement | undefined;
    private _yearInput: HTMLInputElement | undefined;

    /**
     * Override must be provided to customize name of the input field
     * @returns name of the input field
     */
    protected override getLabelName(): string {
        return "exp. date (mm/yy)";
    }

    private readonly MONTH_BLANK_ERROR: string = "Month can't be blank";
    private readonly YEAR_BLANK_ERROR: string = "Year can't be blank";
    private readonly INVALID_MONTH_ERROR: string = "Invalid month";
    private readonly DATE_EXPIRED_ERROR: string = "Can't be expired";
    private readonly INVALID_DATE_ERROR: string = "Invalid date";

    /**
     * Override provided to create input fields inside this element
     * @returns the month and year input fields as required in the date element
     */
    protected override handleCreationOfInputFields(): HTMLInputElement[] {
        const monthInput: HTMLInputElement = document.createElement("input");
        monthInput.classList.add('month-input');
        monthInput.placeholder = "MM";
        monthInput.maxLength = 2;
        monthInput.addEventListener('input',function(e) {
            e.stopImmediatePropagation();
            return this.handleInput(e.target as HTMLInputElement)
        }.bind(this));
        this._monthInput = monthInput;

        const yearInput: HTMLInputElement = document.createElement("input");
        yearInput.classList.add('year-input');
        yearInput.placeholder = "YY";
        yearInput.maxLength = 2;
        yearInput.addEventListener('input',function(e) {
            e.stopImmediatePropagation();
            return this.handleInput(e.target as HTMLInputElement)
        }.bind(this));
        this._yearInput = yearInput;

        return [monthInput,yearInput];
    }
    
    public override getValue(): IDateInputValue {
        
        const [inError,errorMessage] = this.inError();
        const month = parseInt(this._monthInput?.value as string);
        const year = parseInt(this._yearInput?.value as string);

        return {
            inError,
            errorMessage,
            month,
            year
        }
    }
    
    protected override setError(errorText: string | null): void {
        if(errorText){
            switch(errorText){
                case this.MONTH_BLANK_ERROR:
                case this.INVALID_MONTH_ERROR: 
                    this._monthInput?.classList.add('error');
                    this._yearInput?.classList.remove('error');
                    break;
                case this.YEAR_BLANK_ERROR:
                    this._monthInput?.classList.remove('error');
                    this._yearInput?.classList.add('error');
                    break;
                case this.DATE_EXPIRED_ERROR:
                case this.INVALID_DATE_ERROR:
                    this._monthInput?.classList.add('error');
                    this._yearInput?.classList.add('error');
                    break;
                default:
                    throw new Error(`Date input is not designed to setError of text : ${errorText}`);
            }
        }
        else{
            this._monthInput?.classList.remove('error');
            this._yearInput?.classList.remove('error');
        }
        this.setErrorText(errorText);
    }

    public override inError(): [boolean, string | null] {
        let errorStrings: string[] = [];
        let errorString: string | null = null;
        
        const monthInput: string = this._monthInput?.value as string;
        const monthNumber = parseInt(monthInput);

        const yearInput: string = this._yearInput?.value as string;
        const yearNumber: number = parseInt(`20${yearInput}`);

        // check if there are any errors on the month input
        if(monthInput === ""){
            errorStrings.push(this.MONTH_BLANK_ERROR);
        }
        else if(monthNumber < 1 || monthNumber > 12){
            errorStrings.push(this.INVALID_MONTH_ERROR);
        }

        // check if there are any errors on the year input
        if(yearInput === ""){
            errorStrings.push(this.YEAR_BLANK_ERROR);
        }
        
        // try checking for expiry error only if the date is valid
        if(errorStrings.length === 0){
            const inputDate = new Date(yearNumber,monthNumber-1);
            const now = new Date();

            if(inputDate < now){
                errorStrings.push(this.DATE_EXPIRED_ERROR);
            }
        }

        // compile and send out the final error string
        if(errorStrings.length > 0){
            if(errorStrings.length > 1) {
                errorString = this.INVALID_DATE_ERROR;
            }
            else {
                errorString = errorStrings[0];
            }
        }
        return [errorString !== null, errorString];
    }

    /**
     * private helper method to handle the 'input' event on both month and year inputs, will not characters or special characters to be on the input 
     * @param inputField the input field on which to handle input
     */
    private handleInput(inputField: HTMLInputElement) {
        if(inputField.value.length > 0) {
            const lastCharacter = inputField.value[inputField.value.length -1];
            if(/\d/.test(lastCharacter) === false){
                inputField.value = inputField.value.slice(0,inputField.value.length -1);
            }
        }
        this.dispatchEvent(new CustomEvent('input',{detail: this.getValue()}));
    }
}