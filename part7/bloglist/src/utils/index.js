export const attributesForInput = (input) => ({
  type: input.type,
  name: input.name,
  placeholder: input.placeholder,
  value: input.value,
  onChange: input.onChange,
})

export const capitalize = (text) =>
  `${text.charAt(0).toUpperCase()}${text.substr(1, text.length)}`
