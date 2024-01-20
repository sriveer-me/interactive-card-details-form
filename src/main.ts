// web components import
import './components/input';
import './components/card';
import getPageViewer from './components/PageViewer.ts';

// setup handlers to compute gradient show and form show widths on demand
import './ComputeGradientShowAndFormShowWidths.ts';

function OnHandleClickSuccess(){
    const pageViewer = getPageViewer();
    pageViewer.navigateTo('success-page'); 
}

window['OnHandleClickSuccess'] = OnHandleClickSuccess;