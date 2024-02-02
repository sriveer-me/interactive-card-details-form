import Input from "./Input";

class CvcInput extends Input {

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
}

customElements.define('app-cvc-input',CvcInput);