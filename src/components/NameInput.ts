import Input,{IValue} from './Input';

/**
 * Specialization on IValue interface, specific to this type
 */
interface INameValue extends IValue{
    name?: string
}

/**
 * This class is responsible for creating the component app-name-input useful for creating the name
 */
export default class InputField extends Input {
    
    private _nameField: HTMLInputElement | null = null

    /**
     * Name component requires one field; override to specify that
     * @returns input fields associated with this component
     */
    protected override handleCreationOfInputFields(): HTMLInputElement[] {
        const nameInputField = document.createElement('input');
        nameInputField.placeholder = "e.g Jane Appleseed";
        this._nameField = nameInputField; 
        return [nameInputField];
    }

    /**
     * override to set the name of this input
     * @returns labelName
     */
    protected override getLabelName(): string {
        return 'cardholder name';
    }

    /**
     * Get the value entered in as name
     * @returns value on the input, null if in error, will internally handle error setting
     */
    public tryGetNameOnField(): string | null {
        return this._nameField?.value || null;
    }

    /**
     * Use this method to get the 
     * @returns the name entered if possible
     */
    public override tryGetValue(): INameValue {
        const name: string = this._nameField?.value || "";
        let success: boolean = false;
        if(name === ""){
            this.setError("Can't be blank");
        }
        else{
            this.setError(null);
            success = true;
        }
        return {success, name}
    }
}

//Register the custom component in question
customElements.define('app-name-input',InputField);