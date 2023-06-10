import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { eventsToDispatch } from './events';
import { Provider } from 'react-redux';
import { store } from './store';
export interface MicrofrontendOptions {
  basePath: string;
  host: string;
  history: any;
  data: any;
}

export const render = (containerId: string, options: MicrofrontendOptions) => {
  const container = document.getElementById(containerId);
  const root = createRoot(container!);
  if (!container) return;
  console.log(options.basePath);
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter basename={options.basePath}>
          <App basePath={options.basePath} host={options.host} {...options.data} />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  );
  console.log(`Micro-frontend ${containerId} mounted`);
};

export const unMount = (containerId: string) => {
  const container = document.getElementById(containerId);
  const root = createRoot(container!);
  if (!container) return;
  root.unmount();
  console.log(`Micro-frontend ${containerId} unmounted`);
};

export const subscribe = (
  eventName: string,
  eventHandler: (this: Window, ev: any) => any
) => {
  if (!eventsToDispatch[eventName]) {
    console.warn(`This micro frontend does not support the ${eventName} event!`);
    return;
  }
  window.addEventListener(eventName, eventHandler);
};

export const unSubscribe = (
  eventName: string,
  eventHandler: (this: Window, ev: any) => any
) => {
  if (!eventsToDispatch[eventName]) {
    console.warn(`This micro frontend does not support the ${eventName} event!`);
    return;
  }
  window.removeEventListener(eventName, eventHandler, false);
};

export const customEvents = eventsToDispatch;
