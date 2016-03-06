import React from 'react';
import _ from 'lodash';
import { Sparklines, SparklinesLine, SparklinesReferenceLine } from 'react-sparklines';

const UNICODE_MINUS = '\u2212';

function formatNumber(number) {
  return String(Math.round(number)).replace(/^\-/, UNICODE_MINUS);
}

function average(data) {
  return formatNumber(_.round(_.sum(data) / data.length));
}

export default function Chart(props) {
  return (
    <div>
      <Sparklines height={120} width={180} data={props.data}>
        <SparklinesLine color={props.color} />
        <SparklinesReferenceLine type="avg" />
      </Sparklines>
      <div>{average(props.data)}{props.unit}</div>
    </div>
  );
}
