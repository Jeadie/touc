import { ListenerConfig, defaultListenerConfig } from "./page/listenerConfig";
import { PageEvent } from "./page/type";
import { PageListener } from "./page/pageListener";
import Queue from "./queue";
import StreamEventBuilder from "./stream/streamEventBuilder";
import { StreamEmitter } from "./stream/streamEmitter";

class Touc {
  pageListener: PageListener;
  q: Queue<PageEvent>;
  streamEventBuilder: StreamEventBuilder;
  streamEmitter: StreamEmitter;

  constructor(listenerConfig: ListenerConfig) {
    alert("Constructing Touc...");
    this.q = new Queue<PageEvent>();
    this.pageListener = new PageListener(listenerConfig, this.q);
    this.streamEventBuilder = new StreamEventBuilder();
    this.streamEmitter = new StreamEmitter();

    if (document != null) {
      // Setup page listeners
      document.onreadystatechange = (_e: Event) => {
        if (document.readyState == "complete") {
          this.pageListener.init(document);
        }
      };

      // Setup page events => stream event => Emit stream
      this.q.subscribe(this.q.allTopic, (x: PageEvent) => {
        console.log("PageEvent", x);

        this.streamEmitter.emit(this.streamEventBuilder.build(x));
      });
    }
  }
}

var touc = new Touc(defaultListenerConfig);

export default touc;
