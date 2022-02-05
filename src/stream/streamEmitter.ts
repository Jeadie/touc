import { StreamEvent } from "./streamEvent";

export class StreamEmitter {
    /**
     * Responsible for emitting stream events to an endpoint. 
     */

    emit(e: StreamEvent, onSuccess?: (e: StreamEvent) => void, onFailure?: (e: StreamEvent) => void): void {
        console.log("I am emitting...", e)
    }

}