import './Input.scss';

/**
 * Base class for all inputs
 */
export default class Input extends HTMLElement {
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
            <span class="error-text">Error on input field!</span>
        </label>
        `;

        //Setup the name of label if any
        this.setLabel(this.getLabelName());

        //Add in the required inputs onto the rack
        const inputsToSetup = this.handleCreationOfInputFields();
        const inputRack = this.querySelector('.input-rack') as HTMLSpanElement;
        inputsToSetup.forEach((inp: HTMLInputElement) => inputRack.append(inp));
    }

    /**
     * This method is called once when the DOM is available to the element, the base class cannot know how many input elements to create or what its customization (eg - placeholder text) is.. the child can create these inputs and return them from this function
     * @returns empty array
     */
    protected handleCreationOfInputFields(): Array<HTMLInputElement> {
        console.log('base version of handleCreationOfInputFields does not do anything..');
        return new Array<HTMLInputElement>();
    }

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
    public setError(text: string|null): void{
        const labelNode = this.querySelector('label') as HTMLLabelElement;
        const errorTextNode = this.querySelector('.error-text') as HTMLSpanElement;

        if(text === null){
            labelNode.classList.remove('error');
            errorTextNode.textContent = "this should not be visible";
        }
        else {
            labelNode.classList.add('error');
            errorTextNode.textContent = text;
        }
    }
}