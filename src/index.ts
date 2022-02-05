import { ListenerConfig, defaultListenerConfig } from "./page/listenerConfig";
import { PageEvent } from "./page/type";
import { PageListener } from "./page/pageListener";
import Queue from "./queue";

class Touc {
  pageListener: PageListener;
  q: Queue<PageEvent>;

  constructor(listenerConfig: ListenerConfig) {
    alert("Constructing Touc...");
    this.q = new Queue<PageEvent>();
    this.pageListener = new PageListener(listenerConfig, this.q);

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
      });
    }
  }
}
var touc = new Touc(defaultListenerConfig);

export default touc;
