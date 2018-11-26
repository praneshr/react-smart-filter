import { css, Interpolation } from 'emotion'


export interface IDefaultStyles {
  [key: string]: Interpolation;
}

const variables = {
  borderColor: '#ccc',
}

export const defaultStyles: (v: any) => IDefaultStyles = (variables) => ({
  reactSmartFilter: {
    position: 'relative',
  },
  blanket: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
    label: 'blanket',
  },
  inputBox: {
    padding: '5px 10px',
    borderRadius: 4,
    width: '100%',
    border: `1px solid ${variables.borderColor}`,
    outline: 'none',
    label: 'input-box',
  },
  suggestions: {
    position: 'absolute',
    padding: '10px',
    width: '100%',
    border: `1px solid ${variables.borderColor}`,
    borderRadius: 4,
    marginTop: 10,
    label: 'suggestions',
  },
  option: {
    padding: '5px 10px',
    margin: '0 -10px',
    cursor: 'pointer',
    label: 'option',
  },
})

export default (key: keyof IDefaultStyles, stylesOverride: any, variablesOverride: any, state: any) => {
  const defaultStylesResolves: any = defaultStyles({ ...variables, ...variablesOverride })
  if (stylesOverride && stylesOverride[key]) {
    const override = stylesOverride[key]
    const newValue = typeof override === 'function'
      ? override(state)
      : override
    return css({ ...defaultStylesResolves[key], ...newValue})
  }
  return css(defaultStylesResolves[key])
}
