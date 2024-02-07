import Input,{IValue} from "./Input";


interface ICvcValue extends IValue {
    cvcValue?: string
}

/**
 * Component class to get and validate cvc input from the user
 */
class CvcInput extends Input {

    private _cvcInput: HTMLInputElement | undefined;

    /**
     * Override to get name of the label
     */
    protected override getLabelName(): string {
        return 'cvc'
    }

    /**
     * Cvc input requires one field that accepts three numbers only
     */
    protected handleCreationOfInputFields(): HTMLInputElement[] {
        const inputField: HTMLInputElement = document.createElement('input') as HTMLInputElement;
        inputField.placeholder = "e.g. 123";

        this._cvcInput = inputField;

        inputField.addEventListener('input',function(){
            let str: string = inputField.value.slice(0,3);
            if(str.length > 0){
                const lastChar = str[str.length -1];
                if(/\d/.test(lastChar) === false){
                    str = str.slice(0,str.length-1);
                }
            }
            inputField.value = str;
        });

        return [inputField];
    }

    public override tryGetValue(): ICvcValue {
        const value:number = parseInt(this._cvcInput?.value || "");
        if(Number.isInteger(value) && value >= 100 && value < 1000){
            return {
                success: true,
                cvcValue: value.toString()
            }
        }
        else return {success: false}
    }
}

customElements.define('app-cvc-input',CvcInput);