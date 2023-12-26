import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { AndroidVibrationCouscousViewProps } from './AndroidVibrationCouscous.types';

const NativeView: React.ComponentType<AndroidVibrationCouscousViewProps> =
  requireNativeViewManager('AndroidVibrationCouscous');

export default function AndroidVibrationCouscousView(props: AndroidVibrationCouscousViewProps) {
  return <NativeView {...props} />;
}
