import { ListenerConfig } from "./listenerConfig";
import Queue from "../queue";
import { PageEvent } from "./type";

export class PageListener{
    config: ListenerConfig;
    q: Queue<PageEvent>;

    constructor(config: ListenerConfig, queue: Queue<PageEvent>) {
        this.config = config
        this.q = queue
        console.log(this.config)
    }

    /**
     * Initialise listeners on the document, once it is loaded.
     * @param document DOM page.
     */
    init(document: Document) {
        console.log("Setting up all these listeners.")
    }

}