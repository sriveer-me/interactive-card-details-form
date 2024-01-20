import { largeBreakpoint } from "./AbstractConstants";

const mainElement = document.querySelector('main') as HTMLElement;

// Setting width of gradient-show and form-show to constants 33.33% and 66.66% means at large screen sizes(ultrawides), there is a probability that the website will skew to the left.
// This function will dynamically set the percentages (33.33 and 66.66 at size largeBreakpoint) depending on the screen size.
// Center largeBreakpoint amount of px will always be divided 33.33 : 66.66, the rest will be divided 50 : 50 
function computeGradientShowAndFormShowWidths() {
    
    const mainClientWidth = mainElement.clientWidth;

    //constant 33.3% and 66.6% values are good for smaller screen sizes, only compute if we are atleast large
    if(mainClientWidth >= largeBreakpoint){
        const excessWidth = mainClientWidth - largeBreakpoint; //excess width to divide 50 50

        const gradientShowElement = document.querySelector('.gradient-show') as HTMLDivElement;
        const gradientWidth = (0.3333 * largeBreakpoint) + (excessWidth / 2); // 33.33/100 => 0.3333
        const gradientWidthPercentage = (gradientWidth * 100) / mainClientWidth;
        gradientShowElement.style.flex = `1 1 ${gradientWidthPercentage}%`; //percentage of width to be occupied by the gradient-show div 

        const formShowElement = document.querySelector('.form-show') as HTMLDivElement;
        const formWidth = (0.6666 * largeBreakpoint) + (excessWidth / 2); // 66.66/100 => 0.6666
        const formWidthPercentage = (formWidth * 100) / mainClientWidth;
        formShowElement.style.flex = `1 1 ${formWidthPercentage}%`; //percentage of width to be occupied by the form-show div
    }
    else{
        const gradientShowElement = document.querySelector('.gradient-show') as HTMLDivElement;
        const formShowElement = document.querySelector('.form-show') as HTMLDivElement;
        gradientShowElement.style.flex = `1 1 33.3%`; //percentage of width to be occupied by the gradient-show div 
        formShowElement.style.flex = `1 1 66.6%`; //percentage of width to be occupied by the form-show div
    }
}

window.addEventListener('DOMContentLoaded',computeGradientShowAndFormShowWidths); // Always resize the elements gradient-show and form-show on start up.
window.addEventListener('resize',computeGradientShowAndFormShowWidths); // Try to resize widths of the elements gradient-show and form-show whenever the window is resized.