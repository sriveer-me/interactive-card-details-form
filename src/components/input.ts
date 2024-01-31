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
    connectedCallback(){
        //This skeleton is common to all input elements on this app
        this.innerHTML = `
        <label>
            <span class="name-text">Default Name</span>
            <span class="input-rack"></span>
            <span class="error-text">Error on input field!</span>
        </label>
        `;
    }

    /**
     * Calling this method will set the main label name for this input
     */
    setupLabelName(){
        const labelName = this.getAttribute("data-label-name");
        const nameSpan = this.querySelector('.name-text') as HTMLSpanElement;
        if(labelName !== null){
            nameSpan.textContent = labelName;
        }
        else{
            nameSpan.textContent = "No label name specified";
        }
    }

    /**
     * Use this method to set the input in error and show an error message to the user
     * The base class does no know how many input elements exists or what they do, it is upto the specific child class to color said input element's border and stuff like that.  
     * @param text set the input into error and the text of this input shown to user. null means not in error
     */
    setError(text: string|null): void{
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