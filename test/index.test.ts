import touc from "../src"

describe("Initial Test", () => {
  it("works if true is truthy", () => {
    expect(true).toBeTruthy()
  })

  it("Touc is instantiable", () => {
    expect(touc).toBeTruthy()
  })
})
