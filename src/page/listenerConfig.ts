

export interface ListenerConfig {
    classNames: string[];
    spyOnLinks: Boolean;
    events: listenableEvents[]
}

enum listenableEvents {
    onSurfaced,
    onDisappear,
    onClick,
    onNegative
}
const allListenableEvents = [listenableEvents.onSurfaced, listenableEvents.onDisappear, listenableEvents.onClick, listenableEvents.onNegative]

export const defaultListenerConfig: ListenerConfig = {
    classNames: [".touc"],
    spyOnLinks: true,
    events: allListenableEvents
}