import Input from './Input.ts';

/**
 * Date input containing two fields, a month and year.. 
 * Will raise the event date-change with a date param when a new date is set
 */
export default class DateInput extends Input {
    
    /**
     * Constructor does nothing special
     */
    constructor(){
        super();
    }

    /**
     * ConnectedCallback is called by the browser when the DOM is available
     */
    connectedCallback(): void {
        // Step 1: ensure the base framework is in place
        super.connectedCallback();

        // Step 2: create the two fields required
        const monthInput: HTMLInputElement = document.createElement("input");
        monthInput.classList.add('month-input');
        monthInput.placeholder = "MM";
        monthInput["inParsingError"] = function(): boolean{
            return !(/^(0?[1-9]|1[012])$/.test(this.value));
        }

        const yearInput: HTMLInputElement = document.createElement("input");
        yearInput.classList.add('year-input');
        yearInput.placeholder = "YY";
        yearInput["inParsingError"] = function(): boolean{
            try{
                this.tryConvertYearToDigits(yearInput.value) as number;
                return false;
            }
            catch(error){
                return true;
            }
        }.bind(this);
        
        const inputRack = this.querySelector('.input-rack') as HTMLSpanElement;
        [monthInput,yearInput].forEach((inp) => {
            inp.addEventListener('click',(e) => e.stopPropagation()) //do not allow the label focus setter to toggle
            inputRack.append(inp); //adding these inputs to the rack means they are visible to the user
        });

        // Step 3: setup what to focus when label is clicked
        const labelElement = this.querySelector('label') as HTMLLabelElement;
        labelElement.addEventListener("click",(e: MouseEvent) => {
            e.preventDefault(); //do not select the first input by default
            const monthInput = this.querySelector('.month-input') as HTMLInputElement;
            const yearInput = this.querySelector('.year-input') as HTMLInputElement;

            if(monthInput.classList.contains('error')){
                // Case 1 : error on month input so focus month input
                monthInput.focus();
            }
            else if(yearInput.classList.contains('error')){
                // Case 2 : error on year input so focus on year input
                yearInput.focus();
            }
            else{
                //Case 3 : no error on either input so default focus the month input
                monthInput.focus();
            }
        });
    }

    /**
     * Get name of the date field
     */
    protected override getLabelName(): string {
        return 'exp. date (mm/yy)';
    }

    /**
     * Helper method to convert the year string into a number, the year string can be either 2 or 4 digit
     * @param year the year as a 4 or 2 digit string, ex-'24','2024'
     * @return the year as a two digit number if possible
     * @throws Error if conversion of this string into an appropriate number not possible
     */
    private tryConvertYearToDigits(year: string): number{
        let substringStartLocation = 0; //0 is the correct number if the string is 2 characters
        
        if(year.length === 4 && year.startsWith('20',0)){
           substringStartLocation = 2;
        }
        else if(year.length !== 2){
            throw Error(`Invalid year string : ${year} passed into the function tryConvertYearToDigits`);
        }
        
        let twoDigitYear = parseInt(year.substring(substringStartLocation));
        if(!isNaN(twoDigitYear)) {
            return twoDigitYear;
        }

        throw Error(`Invalid year string : ${year} passed into the function tryConvertYearToDigits`);
    }

    /**
     * Use this function to query date selected by the user
     * @returns an object with atleast a field called success, if success is true.. then I can expect to find both month and year
     */
    public getDateOnField(): {success: boolean, month?: number, year?: number} {
        
        let numYear: number | undefined;
        let errorMessages: Array<string> = [];
        this.setError(null); //remove errors found previously 
        
        // Step 1: get the inputs and clear errors on them if any
        const monthInput = this.querySelector('.month-input') as HTMLInputElement;
        monthInput.classList.remove('error');

        const yearInput = this.querySelector('.year-input') as HTMLInputElement;
        yearInput.classList.remove('error');

        // Step 2: Compute blank and parsing errors month
        if(monthInput.value === ""){
            errorMessages.push("Month Can't Be Blank");
            monthInput.classList.add('error');
        }
        else if(!/^(0?[1-9]|1[012])$/.test(monthInput.value))
        {
            errorMessages.push('Invalid Month');
            monthInput.classList.add('error');
        }

        // Step 3: Compute blank and parsing errors year
        if(yearInput.value === ""){
            errorMessages.push("Year can't be blank");
            yearInput.classList.add('error');
        }
        else{
            try{
                numYear = this.tryConvertYearToDigits(yearInput.value) as number;
            }
            catch(error){
                errorMessages.push('Invalid Year');
                yearInput.classList.add('error');
            }
        }
        
        // Step 4: Try computing expiry error
        if(errorMessages.length === 0){
            
            const currentYear: number = this.tryConvertYearToDigits((new Date()).getFullYear().toString());
            const currentMonth: number = (new Date()).getMonth() + 1;
            
            if((numYear as number) < currentYear || 
                numYear === currentYear && parseInt(monthInput.value) < currentMonth)
            {
                errorMessages.push('Card Expired');
            }
        }

        // Step 5: Set input wide error message if required
        const success = errorMessages.length === 0;
        if(success === true){
            //Can successfully retrieve a date, must return this to the callee
            return{
                success,
                month: parseInt(monthInput.value),
                year: numYear
            }
        }
        else{
            // Cannot successfully retrieve a date             
            
            // Step 1: Set a input wide error message
            if(errorMessages.length === 1){
                this.setError(errorMessages[0]);
            }
            else {
                this.setError('Invalid Date');
            }

            // Step 2: Let the callee know of failure
            return {
                success: false
            }
        }
    }
}

// Register the custom element and export the type to be used elsewhere
customElements.define("app-date-input",DateInput);