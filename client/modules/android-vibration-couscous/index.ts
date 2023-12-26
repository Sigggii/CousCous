import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to AndroidVibrationCouscous.web.ts
// and on native platforms to AndroidVibrationCouscous.ts
import AndroidVibrationCouscousModule from './src/AndroidVibrationCouscousModule';
import AndroidVibrationCouscousView from './src/AndroidVibrationCouscousView';
import { ChangeEventPayload, AndroidVibrationCouscousViewProps } from './src/AndroidVibrationCouscous.types';

// Get the native constant value.
export const PI = AndroidVibrationCouscousModule.PI;

export function hello(): string {
  return AndroidVibrationCouscousModule.hello();
}

export async function setValueAsync(value: string) {
  return await AndroidVibrationCouscousModule.setValueAsync(value);
}

const emitter = new EventEmitter(AndroidVibrationCouscousModule ?? NativeModulesProxy.AndroidVibrationCouscous);

export function addChangeListener(listener: (event: ChangeEventPayload) => void): Subscription {
  return emitter.addListener<ChangeEventPayload>('onChange', listener);
}

export { AndroidVibrationCouscousView, AndroidVibrationCouscousViewProps, ChangeEventPayload };
