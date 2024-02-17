import './BaseInput.scss';

/**
 * Interface useful when trying to get the value on any given input component
 *? No component will be designed to return an object that only supports this interface, it must also support one of its children. 
 */
export interface IBaseInputValue {
    inError: boolean,
    errorMessage: string | null
}

/**
 * Base class for all inputs
 */
export default abstract class BaseInput extends HTMLElement {
    
    protected tryClearErrorFlag = false;

    /**
     * Constructor does nothing special
     */
    constructor(){
        super();
    }

    /**
     * ConnectedCallback is called by the browser once the DOM is available to be used
     */
    protected connectedCallback(){

        //This skeleton is common to all input elements on this app
        this.innerHTML = `
        <label>
            <span class="name-text"></span>
            <span class="input-rack"></span>
            <span class="error-text">placeholder error</span>
        </label>
        `;

        //Setup the name of label if any
        this.setLabel(this.getLabelName());

        //Add in the required inputs onto the rack
        const inputsToSetup = this.handleCreationOfInputFields();
        const inputRack = this.querySelector('.input-rack') as HTMLSpanElement;
        inputsToSetup.forEach((inp: HTMLInputElement) => inputRack.append(inp));

        //Clear errors when they no longer exist
        this.addEventListener('input',function(){
            if(this.tryClearErrorFlag === true ) {
                const inError = this.inError();
                if(inError[0] === false){
                    this.tryClearErrorFlag = false;
                }
                this.setError(inError[1])                
            }
        }.bind(this));
    }

    /**
     * This method is called once when the DOM is available to the element, the base class cannot know how many input elements to create or what its customization (eg - placeholder text) is.. the child can create these inputs and return them from this function
     * @returns array of HTMLInputElements
     */
    protected abstract handleCreationOfInputFields(): Array<HTMLInputElement>;

    /**
     * Only child is responsible for giving the value out to into world
     */
    public abstract getValue(): IBaseInputValue;

    /**
     * This is the base version of getLabelName
     * The function tries to get the label name from the attribute data-label-name; if no such attribute exists then it will return the string 'null' as its return
     */
    protected getLabelName(): string {
        return this.getAttribute("data-label-name") || "null";
    }
    /**
     * Use this function to set the label of an input field
     * @param labelName this is the string that will become the label
     */
    public setLabel(labelString: string): void {
        const nameSpan = this.querySelector('.name-text') as HTMLSpanElement;
        nameSpan.textContent = labelString;
    }
    
    /**
     * Use this method to set the input in error and show an error message to the user
     * The base class does no know how many input elements exists or what they do, it is upto the specific child class to color said input element's border and stuff like that.  
     * @param text set the input into error and the text of this input shown to user. null means not in error
     */
    protected setErrorText(text: string|null): void{
        const labelNode = this.querySelector('label') as HTMLLabelElement;
        const errorTextNode = this.querySelector('.error-text') as HTMLSpanElement;

        if(text === null){
            labelNode.classList.remove('error');
            errorTextNode.textContent = "should not be visible";
        }
        else {
            labelNode.classList.add('error');
            errorTextNode.textContent = text;
        }
    }
    /**
     * Use this method to set the error completely, 
     * Abstract here as the BaseInput does not know how many input fields exist
     * todo: every child now must handle null which is clearing of all errors and also a call to setErrorText(); is this really necessary? a redirect to do these two things would be something to look at.
     */
    protected abstract setError(errorText: string | null): void;
    /**
     * Use this method to see if the field is in error
     * @returns [boolean,string] : inError flag and the error message, if flag is false, message will be null
     */
    public abstract inError(): [boolean, string | null];
    /**
     * Use this method to display errors to the user if any
     */
    public displayErrorIfAny(): void {
        const [inError,errorMsg] = this.inError();
        this.setError(errorMsg);
        this.tryClearErrorFlag = true;
    }
}