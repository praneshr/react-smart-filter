import * as React from 'react'
import getStyles from './styles'

export interface IReactSmartFilterProps {
  styles?: {
    [key: string]: any;
  };
  styleVariables?: {
    [key: string]: string;
  };
  placeholder?: string;
  options: any;
}

export interface IReactSmartFilterState {
  isFocused?: boolean;
  isBlured?: boolean;
  isOpen?: boolean;
  value?: string;
  focusedIndex?: number;
}


export default class ReactSmartFilter extends React.Component<IReactSmartFilterProps, IReactSmartFilterState> {

  static defaultProps = {
    placeholder: 'Search...'
  }

  constructor(props: IReactSmartFilterProps) {
    super(props)
    this.state = {
      isFocused: false,
      isBlured: true,
      isOpen: false,
      focusedIndex: -1,
      value: '',
    }
  }

  toggelSuggestion = (open = true) => {
    if (this.state.isOpen !== open) {
      this.setState({
        isOpen: open,
      })
    }
  }

  toggelSuggestionProxy = () => this.toggelSuggestion(false)

  toggleFocusAndBlur = () => this.setState((preState: IReactSmartFilterState) => ({
    isBlured: !preState.isBlured,
    isFocused: !preState.isFocused,
  }), this.toggelSuggestion)

  onChange = (e: any) => {
    this.setState({
      value: e.target.value,
      focusedIndex: -1,
    })
  }

  extractLatestModiferAndValue = () => {
    var filterModifier = '', filterValue = '', isFilterModifierCompleted = false
    if (this.state.value) {
      const modifierAndValues = this.state.value.split(/ /ig)
      const latestModiferAndValue = modifierAndValues.slice(-1)[0]
      const latestModiferAndValueArray = latestModiferAndValue.split(':')
      isFilterModifierCompleted = latestModiferAndValueArray.length === 2;
      ([filterModifier, filterValue] = latestModiferAndValueArray)
    }
    return {
      filterModifier,
      isFilterModifierCompleted,
      filterValue,
    }
  }

  filterModifierRenderer = (modifier: string) => {
    const modifiers = Object.keys(this.props.options)
    return modifiers
      .filter((key) => key.includes(modifier))
      .map((key) => {
        const modifierDetails = this.props.options[key]
        return <div className={this.getStylesHelper('option')} key={key}>
          <span>{modifierDetails.label}: </span>
          <span>{modifierDetails.description}</span>
        </div>
      })
  }

  filterValueRenderer = (modifier: string, value: string) => {
    if (this.props.options[modifier]) {
      const modifierOptions = this.props.options[modifier].options
      return modifierOptions
        .filter(({ value: objValue, label }: any) => objValue.includes(value) || label.includes(value))
        .map(({ label, value }: any) => {
          return <div className={this.getStylesHelper('option')} key={value}>
            <span>{label}</span>
          </div>
        })
    }
    return []
  }

  filterOptionsRenderer = () => {
    let content
    const { filterModifier, filterValue, isFilterModifierCompleted } = this.extractLatestModiferAndValue()
    if (!isFilterModifierCompleted) {
      content = this.filterModifierRenderer(filterModifier)
    } else {
      content = this.filterValueRenderer(filterModifier, filterValue)
    }
    return <div className={this.getStylesHelper('suggestions')}>
      <div className={this.getStylesHelper('option')}>
        <span>{this.state.value}</span>
      </div>
      {content}
    </div>
  }

  getStylesHelper = (key: string) => getStyles(key, this.props.styles, this.props.styleVariables, this.state)

  render = () => {
    const {
      placeholder,
    } = this.props

    const openSuggestions = this.state.isOpen

    return <div
      className={this.getStylesHelper('reactSmartFilter')}>
      <input
        value={this.state.value}
        onChange={this.onChange}
        placeholder={placeholder}
        onFocus={this.toggleFocusAndBlur}
        onBlur={this.toggleFocusAndBlur}
        className={this.getStylesHelper('inputBox')}
        type="text"
      />
      {
        openSuggestions
        && <>
          <div
            onClick={this.toggelSuggestionProxy}
            className={this.getStylesHelper('blanket')}
          />
          {this.filterOptionsRenderer()}
        </>
      }
    </div>
  }
}
