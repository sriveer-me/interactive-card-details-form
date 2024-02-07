// web components import
import './components/Input.ts';
// import DateInput from './components/DateInput.ts';
import './components/DateInput.ts';
import './components/card';

import './components/NameInput.ts';
import './components/CardNumberInput.ts';
import './components/CvcInput.ts';

import './components/PageViewer.ts';

// setup handlers to compute gradient show and form show widths on demand
import './ComputeGradientShowAndFormShowWidths.ts';

// function OnHandleClickSuccess(){
//     const pageViewer = getPageViewer();
//     pageViewer.navigateTo('success-page'); 
// }

// window['OnHandleClickSuccess'] = OnHandleClickSuccess;

// const submitHomeButton = document.querySelector('.home-submit') as HTMLButtonElement;
// submitHomeButton.addEventListener('click',(event: MouseEvent) => {
//     event.preventDefault();

//     const dateInput = document.querySelector('.date-input') as DateInput;
//     const obj = dateInput.getDateOnField();

//     if(obj.success === true){
//         console.log(`mm/yy : ${obj.month}/${obj.year}`);
//     }
// });