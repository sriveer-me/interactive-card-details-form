class Input extends HTMLElement{
    constructor(){
        super();
    }
    connectedCallback(){
        const inputTemplate = document.getElementById('input-template') as HTMLTemplateElement;
        this.append(inputTemplate.content.cloneNode(true));
    }

    InError(): boolean{
        return this.classList.contains('error');
    }
    setInError(inError: boolean): void{
        if(inError == true){
            this.classList.add('error');
        }
        else{
            this.classList.remove('error');
        }
    }
    setErrorText(text: string): void{
        const errorTextNode = this.querySelector('.error-text') as HTMLSpanElement;
        errorTextNode.textContent = text;
    }
}

customElements.define("app-input",Input);