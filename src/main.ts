// this script automatically registers all web components required by this app
import './RegisterWebComponents.ts';

// import the page viewer component
import './components/PageViewer.ts';

// setup handlers to compute gradient show and form show widths on demand
import './ComputeGradientShowAndFormShowWidths.ts';

import NameInput from './components/NameInput.ts';
import CardNumberInput from './components/CardNumberInput.ts';
import DateInput from './components/DateInput.ts';
import CVCInput from './components/CVCInput.ts';

const nameInput = document.getElementById('name-input') as NameInput;
const cardNumberInput = document.getElementById('card-number-input') as CardNumberInput;
const dateInput = document.getElementById('date-input') as DateInput;
const cvcInput = document.getElementById('cvc-input') as CVCInput;

const submit = document.getElementById('submit-details-button') as HTMLButtonElement;

submit.addEventListener('click',function(e){
    e.preventDefault();

    nameInput.displayErrorIfAny();
    cardNumberInput.displayErrorIfAny();
    dateInput.displayErrorIfAny();
    cvcInput.displayErrorIfAny();
})