import React from 'react';

import {
	Container,
	Input,
	Label,
  TextArea,
  Select
} from './styles';


const input = (props) => {
  let inputElement = null;

  const invalid = (props.invalid && props.shouldValidate && props.touched);
	
	switch (props.elementType) {
		case ('input'):
      inputElement = <Input
        {...props.elementConfig}
        value={props.value}
        invalid={invalid}
        onChange={props.changed} />
			break;
		case ('textarea'):
      inputElement = <TextArea
        {...props.elementConfig}
        value={props.value}
        invalid={invalid}
        onChange={props.changed} />
      break;
    case ('select'):
      inputElement = (
        <Select
          value={props.value}
          invalid={invalid}
          onChange={props.changed}>
          {props.elementConfig.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
          
        </Select>
      )
      break;
		default:
      inputElement = <Input
        {...props.elementConfig}
        value={props.value}
        invalid={invalid}
        onChange={props.changed} />
			break;
	}

	return (
		<Container>
      <Label>{props.label}</Label>
      {inputElement}
		</Container>
	)
}

export default input;