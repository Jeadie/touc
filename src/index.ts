class Touc {
  public construct() {
    alert("Constructing Touc...");
  }
  public add(s: string): void {
    let element = document.getElementById("main");
    if (element != null) {
      element.innerText += "+ " + s;
    }
  }
}
var touc = new Touc();
touc.add("Hello World");

export default touc;
