import * as React from 'react';

type ClassNameValue =
  | string
  | number
  | boolean
  | undefined
  | null
  | Record<string, boolean | null | undefined>
  | ClassNameValue[];

type WithCustomClassName<P> = Omit<P, 'className'> & {
  className?: ClassNameValue;
};

declare global {
  namespace JSX {
    type IntrinsicElements = {
      [K in keyof React.JSX.IntrinsicElements]: WithCustomClassName<React.JSX.IntrinsicElements[K]>;
    };

    interface IntrinsicAttributes extends React.Attributes {
      className?: ClassNameValue;
    }
  }
}
