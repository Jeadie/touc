export enum StreamEventType {
    /** */
    Surfaced, 
    Clicked,
    Cleared
}

export type EntityId = {
    id: string
}

export class StreamEvent {
    entityId: EntityId
    type: StreamEventType;
    sessionId: string;
    customerId?: string;
}