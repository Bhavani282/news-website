import { TextEncoder, TextDecoder } from 'util';
import 'whatwg-fetch';
import '@testing-library/jest-dom';
import React from 'react';
process.env.NEXT_PUBLIC_NEWS_API_KEY = 'testkey';

global.TextEncoder = TextEncoder as typeof global.TextEncoder;
global.TextDecoder = TextDecoder as typeof global.TextDecoder;
jest.mock('next/image', () => ({
  __esModule: true,
  default: 'img',
}));


if (typeof TransformStream === 'undefined') {
  const { TransformStream: PolyfillTransformStream } = require('web-streams-polyfill/dist/ponyfill.js');
  global.TransformStream = PolyfillTransformStream;
}

if (!globalThis.BroadcastChannel) {
  class MockBroadcastChannel {
    name: string;
    onmessage: ((this: BroadcastChannel, ev: MessageEvent) => any) | null = null;
    onmessageerror: ((this: BroadcastChannel, ev: MessageEvent) => any) | null = null;

    constructor(name: string) {
      this.name = name;
    }
    postMessage = (message: any) => {};
    close = () => {};
    addEventListener = () => {};
    removeEventListener = () => {};
    dispatchEvent = (event: Event) => true;
  }

  globalThis.BroadcastChannel = MockBroadcastChannel as unknown as typeof BroadcastChannel;
}

