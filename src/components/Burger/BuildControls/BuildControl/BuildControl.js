import React from 'react';

import {
  BuildControl,
  Label,
  Less,
  More
} from './styles';

const buildControl = (props) => (
  <BuildControl>
    <Label>{props.label}</Label>
    <Less onClick={props.removed} disabled={props.disabled}>Less</Less>
    <More onClick={props.added}>More</More>
  </BuildControl>
);

export default buildControl;