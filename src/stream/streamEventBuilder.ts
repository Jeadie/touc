import { PageEvent } from "../page/type";
import { StreamEvent } from "./streamEvent";


export default class StreamEventBuilder {
    constructor() {

    }

    build(pageEvent: PageEvent): StreamEvent {
        console.log("Converting pageEvent...", pageEvent)
        return new StreamEvent()
    }
}