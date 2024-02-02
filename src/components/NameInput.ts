import Input from './Input';

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
    public getNameOnField(): string | null {
        return this._nameField?.value || null;
    }
}

//Register the custom component in question
customElements.define('app-name-input',InputField);