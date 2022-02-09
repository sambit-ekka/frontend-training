class Utils {
  isNull = (value) => {
    // write logic to find whether value is null
    return value === null
  }

  isUndefined = (value) => {
    // write logic to find whether value is undefined
    return value === undefined
  }

  isNumber = (value) => {
    // write logic to find whether value is number
    return typeof value == "number"
  }

  isString = (value) => {
    // write logic to find whether value is string
    return typeof value == "string"
  }

  isBoolean = (value) => {
    // write logic to find whether value is boolean value
    return typeof value == "boolean"
  }

  isObject = (value) => {
    // write logic to find whether value is an object
    return typeof value == "object" && !this.isArray(value) && value !== null
  }

  isArray = (value) => {
    // write logic to find whether value is an Array
    return Array.isArray(value)
  }

  isTruthy = (value) => {
    // Write logic to find whether value is truthy
    return !this.isFalsy(value)
  }

  isFalsy = (value) => {
    // Write logic to find whether value is falsy
    const falsyValues = ["", 0, -0, null, NaN, false, undefined]
    return falsyValues.includes(value)
  }

  isFunction = (value) => {
    return typeof value === "function"
  }

  keys = (value) => {
    /**
     * Write logic to only extract keys from an object and create an array of keys
     * value: {'animal': 'lion', 'age': 6}
     * output: ['animal', 'age']
     */
    return Object.keys(value)
  }

  values = (value) => {
    /**
     * Write logic to only extract values from an object and create an array of values
     * value: {'animal': 'lion', 'age': 6}
     * output: ['lion', 6]
     */
    return Object.values(value)
  }

  size = (value) => {
    /**
     * Find the size of value
     * value: array
     */

    return value.length
  }

  filter = (collection, predicate) => {
    /**
     * collection: array
     * predicate: function
     * usage: filter([1,2,3,4], (item) => { return item !== 2})
     */

    if (!this.isArray(collection)) {
      return []
    }

    if (!this.isFunction(predicate)) {
      return collection
    }

    const result = []
    for (const item of collection) {
      const truthy = predicate(item)

      if (truthy) {
        result.push(item)
      }
    }
    return result
  }
}

async function fetchDefinition() {
  /**
   * Write code to make an api call to get json
   * URL: https://raw.githubusercontent.com/karthik-hr/js-utils/master/definition.json;
   */
  const response = await fetch(
    `https://raw.githubusercontent.com/karthik-hr/js-utils/master/definition.json`
  )

  const { data } = await response.json()

  return data
}

function findStats(definition) {
  const instance = new Utils()

  const stats = {
    numberOfItems: 0,
    null: 0,
    undefined: 0,
    numbers: 0,
    strings: 0,
    boolean: 0,
    objects: 0,
    array: 0,
    truthy: 0,
    falsy: 0,
  }

  /**
   * Write loop here to update stats
   *
   *
   */
  for (item of definition) {
    const values = instance.values(item)
    stats.numberOfItems += values.length
    for (value of values) {
      if (instance.isNull(value)) stats.null++
      if (instance.isUndefined(value)) stats.undefined++
      if (instance.isNumber(value)) stats.numbers++
      if (instance.isString(value)) stats.strings++
      if (instance.isBoolean(value)) stats.boolean++
      if (instance.isObject(value)) stats.objects++
      if (instance.isArray(value)) stats.array++
      if (instance.isTruthy(value)) stats.truthy++
      if (instance.isFalsy(value)) stats.falsy++
    }
  }

  return stats
}

function render(stats) {
  const items = Object.keys(stats)
  const ul = document.createElement("ul")
  for (const item of items) {
    const li = document.createElement("li")
    li.innerHTML = `${item}: ${stats[item]}`
    ul.appendChild(li)
  }
  const root = document.getElementById("stats")
  if (root) {
    root.innerHTML = ""
    root.append(ul)
  }
}

async function main() {
  const definition = await fetchDefinition()

  const stats = findStats(definition)
  render(stats)
}

main()
