export default class Queue<T> {
  /**
   * An arbitrary publish-subscribe based Queue with generics.
   */

  callbackFns: { [topic: string]: ((x: T) => any)[] } = {};
  allTopic: string = "ALL"; // Listen to all topics.

  publish = (topic: string, ...args: T[]) => {
    let callbacks =
      this.callbackFns[topic] || this.callbackFns[this.allTopic]
        ? this.callbackFns[topic].concat(this.callbackFns[this.allTopic])
        : [];

    // For each subscription, call fn with each argument from args.
    callbacks.forEach(fn => {
      args.map(x => {
        fn(x);
      });
    });
  };

  subscribe = (topic: string, fn: (x: T) => any) => {
    !this.callbackFns[topic]
      ? (this.callbackFns[topic] = [fn])
      : this.callbackFns[topic].push(fn);
  };
}
