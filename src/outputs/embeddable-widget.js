import React from 'react';
import ReactDOM from 'react-dom';
import Widget from '../components/widget';
import '../../vendor/cleanslate.css';

export default class EmbeddableWidget {
  static el;

  static mount({
    parentElement = null, headerText, bodyText, footerText,
  } = {}) {
    const component = (
      <Widget headerText={headerText} bodyText={bodyText} footerText={footerText} />
    );

    function doRender() {
      if (EmbeddableWidget.el) {
        throw new Error('EmbeddableWidget is already mounted, unmount first');
      }
      const el = document.createElement('div');
      el.setAttribute('class', 'cleanslate');

      if (parentElement) {
        document.querySelector(parentElement).appendChild(el);
      } else {
        const container = document.body;
        container.insertBefore(el, container.firstChild);
      }
      ReactDOM.render(
        component,
        el,
      );
      EmbeddableWidget.el = el;
    }
    if (document.readyState === 'complete') {
      doRender();
    } else {
      window.addEventListener('load', () => {
        doRender();
      });
    }
  }

  static unmount() {
    if (!EmbeddableWidget.el) {
      throw new Error('EmbeddableWidget is not mounted, mount first');
    }
    ReactDOM.unmountComponentAtNode(EmbeddableWidget.el);
    EmbeddableWidget.el.parentNode.removeChild(EmbeddableWidget.el);
    EmbeddableWidget.el = null;
  }
}
