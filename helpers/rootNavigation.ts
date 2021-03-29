import * as React from "react";

export const navigationRef: any = React.createRef();

export function navigate(name: string, params?: any) {
  navigationRef.current?.navigate(name, params);
}

export function goBack() {
  navigationRef.current?.goBack();
}

export function reset({ ...args }: any) {
  navigationRef.current?.reset(...args);
}