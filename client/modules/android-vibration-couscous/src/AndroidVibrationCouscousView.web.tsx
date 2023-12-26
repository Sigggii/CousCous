import * as React from 'react';

import { AndroidVibrationCouscousViewProps } from './AndroidVibrationCouscous.types';

export default function AndroidVibrationCouscousView(props: AndroidVibrationCouscousViewProps) {
  return (
    <div>
      <span>{props.name}</span>
    </div>
  );
}
