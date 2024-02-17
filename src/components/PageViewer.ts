import gsap from "gsap";

/**
 * PageViewer class is designed to help the user view different pages while also helping the developer easily transition between them.
 * A pageTemplate is a html template element with an Id
 * Atleast one pageTemplate must be marked with the attribute data-default-pageTemplate when using the PageViewer
 * A Page is a section created internally by the PageViewer, this is what the user sees, all the contents of the template are wrapped up in a section
 */
export class PageViewer extends HTMLElement {

    /**
     * Control on how long should it take for each step of the transition to take in seconds
     * Ex- navigate to new page is two steps, [remove first page, append new page] so it will take 1.2s on default value of .6s
     */
    pageTransitionStepDuration: number = .6;

    /**
     * Constructor does nothing special
     */
    constructor(){
        super();
    }

    /**
     * Starts displaying the default page, 
     * Default page is created from a template marked with the attribute data-default-pageTemplate="true"
     * @throws Error if a page viewer already exists
     * @throws Error if a default page was not marked
     * todo: Check if the attribute data-default-pageTemplate is used more than once, maybe throw an error
     * todo: Ensure the element with the attribute data-default-pageTemplate is a pageTemplate, i.e - a template with an Id 
     */
    connectedCallback(): void{

        if(document.getElementById('page-viewer') !== null){
            throw new Error(`A page viewer element already exists, attempting to create another one`);
        }
        else{
            this.id = "page-viewer";
        }

        const defaultPageTemplate = document.querySelector('[data-default-pageTemplate]') as HTMLTemplateElement | null;
        if(defaultPageTemplate == null){
            throw new Error('A default page must be setup if using PageViewer, add the data-default-pageTemplate tag to one of the setup pageTemplates');
        }
        else {
            const defaultPage = this.createPage(defaultPageTemplate.id); //todo: I am nowhere checking if the id is valid
            this.append(defaultPage);
        }
    }

    /**
     * Use this method to create new pages from templates
     * @param pageTemplateId creates a page by taking in as input the id of a page template
     * @returns created HTMLElement, this element is not attached to the DOM when returned
     * @throws Error if pageTemplateId is not valid
     */
    createPage(pageTemplateId: string): HTMLElement{

        const pageTemplate = document.getElementById(pageTemplateId) as HTMLTemplateElement || null;
        if(pageTemplate === null){
            throw new Error(`${pageTemplateId}! invalid, could not find a template with this id`);
        }

        const sectionElement = document.createElement('section');
        sectionElement.classList.add('inner-page');
        sectionElement.classList.add(pageTemplateId);
        sectionElement.append(pageTemplate.content.cloneNode(true))

        return sectionElement;
    }

    /**
     * Remove the current page from display
     */
    removeCurrentPage(): void{
        this.innerHTML = '';
    }

    /**
     * Use this method to navigate from one page to another, calling this method updates the DOM with another page using setup transition. 
     * @param templatePageId Id of the pageTemplate element
     */
    async navigateTo(templatePageId: string) {

        //step one, remove the current page
        const innerPage = this.querySelector('.inner-page') as HTMLElement;
        await gsap.to(innerPage,{
            opacity: 0,
            duration: this.pageTransitionStepDuration
        })
        this.removeCurrentPage();
        
        //step two, create the new page and append it to the page viewer
        const newPage = this.createPage(templatePageId);
        this.append(newPage);

        //step three, animate the new page into view..
        gsap.fromTo(newPage,{opacity: 0},{opacity: 1,duration: this.pageTransitionStepDuration});

        //todo - CHECK IF THERE IS ANY LATENCY, I am first appending the page then which is fully visible, then using gsap to fake a fade in animation. if there is some latency in hiding the page by gsap then this will look ugly.
    }
}

//register the app-page-viewer custom element as the PageViewer
customElements.define("app-page-viewer",PageViewer);

/**
 * A handy helper method to return the PageViewer Element found on the current page, Use this instead of document.getElementById as there is some error checking for if something is not yet setup
 * @returns The page viewer element on current document
 * @throws Error if a page viewer element does not exist on the document for any reason
 */
export default function getPageViewer(): PageViewer{
    const pageViewer = document.getElementById('page-viewer') as PageViewer || null;
    if(pageViewer === null){
        throw new Error('A page viewer element does not exist on the page');
    }
    return pageViewer;
}