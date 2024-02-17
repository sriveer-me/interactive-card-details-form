// this script automatically registers all web components required by this app
import './RegisterWebComponents.ts';

// import the page viewer component
import './components/PageViewer.ts';

// setup handlers to compute gradient show and form show widths on demand
import './ComputeGradientShowAndFormShowWidths.ts';

import NameInput from './components/NameInput.ts';
import CardNumberInput from './components/CardNumberInput.ts';
import DateInput, { IDateInputValue } from './components/DateInput.ts';
import CVCInput from './components/CVCInput.ts';
import { CardBack, CardFront } from './components/card.ts';
import BaseInput from './components/Input/BaseInput.ts';
import getPageViewer,{PageViewer} from './components/PageViewer.ts';


getPageViewer().pageSetupDictionary.set('home-page',setupHomePage);
getPageViewer().pageSetupDictionary.set('success-page',setupSuccessPage);

function setupHomePage(){
    //Get all the inputs on form
    const nameInput = document.getElementById('name-input') as NameInput;
    const cardNumberInput = document.getElementById('card-number-input') as CardNumberInput;
    const dateInput = document.getElementById('date-input') as DateInput;
    const cvcInput = document.getElementById('cvc-input') as CVCInput;
    const submit = document.getElementById('submit-details-button') as HTMLButtonElement;

    // Update CardFront displays
    const CardFrontComponent = document.getElementById('card-front') as CardFront; 
    nameInput.addEventListener('input',(e: any) => CardFrontComponent.setNameToDisplay(e.detail.value))
    cardNumberInput.addEventListener('input',(e: any) => CardFrontComponent.setCardNumberToDisplay(e.detail.value))
    dateInput.addEventListener('input',(e: any) => CardFrontComponent.setExpiryDateToDisplay(e.detail.month || 0, e.detail.year || 0))

    // Update CardBack displays
    const CardBackComponent = document.getElementById('card-back') as CardBack;
    cvcInput.addEventListener('input',(e: any) => CardBackComponent.setCVCToDisplay(e.detail.value as string))

    // Listen to the form submit event
    submit.addEventListener('click',function(e){
        e.preventDefault();
        const allInputs: Array<BaseInput> = [
            nameInput,
            cardNumberInput,
            dateInput,
            cvcInput
        ];

        let allClear = true;
        allInputs.forEach((input: BaseInput) => allClear = allClear && !(input.inError()[0]));
        if(allClear === true){
            //Move to and show success page
            const pageViewer: PageViewer = getPageViewer();
            pageViewer.navigateTo('success-page');
        } 
        else {
            allInputs.forEach((input: BaseInput) => input.displayErrorIfAny());
        }
    })
}

function setupSuccessPage(){
    const continueButton = document.querySelector('.continue') as HTMLButtonElement;
    continueButton.addEventListener('click',function(e){
        e.preventDefault();
        const pageViewer = getPageViewer();
        pageViewer.navigateTo('home-page');
    }) 
}

setupHomePage();