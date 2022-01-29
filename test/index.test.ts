import Touc from "../src"

describe("Initial Test", () => {
  it("works if true is truthy", () => {
    expect(true).toBeTruthy()
  })

  it("Touc is instantiable", () => {
    expect(new Touc()).toBeInstanceOf(Touc)
  })
})
