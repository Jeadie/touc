

export interface SelectorListenerConfig {
    events: ListenableEvents[]
}

export interface ListenerConfig {
    selectors: {[s: string]: SelectorListenerConfig};
    spyOnLinks: Boolean;
}

export const AddHrefSelector = (l: ListenerConfig) => {
    l.selectors['a[href^="http:"]'] = {
        events: allListenableEvents
    } 
}

export enum ListenableEvents {
    onSurfaced,
    onDisappear,
    onClick,
    onNegative
}
const allListenableEvents = [ListenableEvents.onSurfaced, ListenableEvents.onDisappear, ListenableEvents.onClick, ListenableEvents.onNegative]


export const ListenableEventToListeners: Map<ListenableEvents, string[]> = new Map([
    [ListenableEvents.onClick, [""]],
    [ListenableEvents.onSurfaced, [""]],
    [ListenableEvents.onNegative, [""]],
    [ListenableEvents.onDisappear, [""]]
])

export const GetListeners = (l: ListenableEvents): string[] => {
    let listeners = ListenableEventToListeners.get(l as unknown as ListenableEvents)
    if (listeners == undefined) {
        return []
    } else {
        return listeners
    }
}

export const defaultListenerConfig: ListenerConfig = {
    selectors: {
        ".touc": {
            events: allListenableEvents
        }
    },
    spyOnLinks: true,
}