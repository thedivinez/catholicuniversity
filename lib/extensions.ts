Number.prototype.padZero = function (this: number | string) {
  const value = this.toString()
  return this.toString().length < 2 ? "0" + value : value
}

Number.prototype.toMoney = function (this: number) {
  return this.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
}

String.prototype.isNumeric = function (this: number | string) {
  if (typeof this === "number") return Number.isFinite(this)
  if (typeof this === "string") {
    return this.trim() !== "" && Number.isFinite(Number(this))
  }
  return false
}

String.prototype.capitalize = function (this: string) {
  return this.charAt(0).toUpperCase() + this.slice(1)
}

Array.prototype.isEmpty = function () {
  return this.length === 0
}

Array.prototype.isNotEmpty = function () {
  return this.length > 0
}

Array.prototype.unique = function () {
  return Array.from(new Set(this))
}

EventTarget.prototype.toJson = function () {
  return Array.prototype.slice
    .call(this)
    .filter((el) => el.name)
    .reduce(
      (form, el) => ({
        ...form,
        [el.name]: el.type === "checkbox" ? el.checked : el.value,
      }),
      {},
    )
}
