import { AddHrefSelector, ListenableEvents, ListenerConfig, SelectorListenerConfig, ListenableEventToListeners, GetListeners } from "./listenerConfig";
import Queue from "../queue";
import { PageEvent } from "./type";

export class PageListener{
    config: ListenerConfig;
    q: Queue<PageEvent>;

    constructor(config: ListenerConfig, queue: Queue<PageEvent>) {
        this.config = config
        this.q = queue

        if (config.spyOnLinks) {
            AddHrefSelector(this.config)
        }

        console.log(this.config)
    }

    /**
     * Initialise listeners on the document, once it is loaded.
     *      - Aggregates elements based on selectors
     *      - Maps ListenableEvents to 
     * 
     * @param document DOM page.
     */
    init(document: Document) {
        // keys are ListenableEvents
        let eventToElement: {[x: string]: Element[]} = this.getEventsToElementsFromSelectors(this.config.selectors)

        Object.keys(eventToElement).forEach((listenableEvent: string) => {
            this.addEventListenersToElements(
                eventToElement[listenableEvent], 
                GetListeners(listenableEvent as unknown as ListenableEvents)
            );
        });
      console.log("Setting up all these listeners.")
    }

    /**
     * Converts the selectors from a ListenerConfig to a mapping of ListenableEvents (as strings) to document elements.
     * 
     * @param selectors 
     * @returns 
     */
    private getEventsToElementsFromSelectors(selectors: {[s: string]: SelectorListenerConfig}): {[x: string]: Element[]} {
        let eventToElement: {[x: string]: Element[]} = {} // keys are ListenableEvents

        Object.keys(selectors).forEach((selector: string) => {
            let elements: Element[] = Array.from(document.querySelectorAll(selector));

            selectors[selector].events.forEach((e: ListenableEvents) => {
                eventToElement[e] = eventToElement[e] ? eventToElement[e].concat(elements) : elements
            });
        });

        return eventToElement
    }

    /**
     * Add all the event listeners, given their callback names (e.g. "click", "onLoad"), to each element.
     *   
     * @param elements Page elements
     * @param callbacks Web DOM events. See https://developer.mozilla.org/en-US/docs/Web/Events
     */
     private addEventListenersToElements(elements: Element[], callbacks: string[]): void {
        // To avoid an element, selected under two selectors, to have two listeners attached, find unique elements.
        new Set(elements).forEach((e: Element) => {

            // Attach event listener to each unique element 
            callbacks.forEach((callback: string) => {
                console.log("Adding event listeners: ", callback, )
                e.addEventListener(callback, (event: Event) => {
                        this.q.publish("ALL", {
                            event: event,
                            element: e
                        })    
                    }
                )
            })
        })
    }
}

