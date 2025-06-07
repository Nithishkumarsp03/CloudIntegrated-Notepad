import Image from '@tiptap/extension-image';
import { Plugin, PluginKey } from 'prosemirror-state';
import { NodeSelection } from 'prosemirror-state';

const ResizableImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      src: {
        default: null,
        parseHTML: element => element.getAttribute('src'),
        renderHTML: attributes => {
          return { src: attributes.src };
        },
      },
      width: {
        default: 'auto',
        parseHTML: element => element.getAttribute('width') || 'auto',
        renderHTML: attributes => attributes.width ? { width: attributes.width } : {},
      },
      height: {
        default: 'auto',
        parseHTML: element => element.getAttribute('height') || 'auto',
        renderHTML: attributes => attributes.height ? { height: attributes.height } : {},
      },
      originalWidth: {
        default: null,
        parseHTML: () => null,
        renderHTML: () => ({}),
      },
      originalHeight: {
        default: null,
        parseHTML: () => null,
        renderHTML: () => ({}),
      },
      alignment: {
        default: 'inline',
        parseHTML: element => element.getAttribute('data-alignment') || 'inline',
        renderHTML: attributes => attributes.alignment ? { 'data-alignment': attributes.alignment } : {},
      },
      marginTop: {
        default: 0,
        parseHTML: element => parseInt(element.getAttribute('data-margin-top') || 0),
        renderHTML: attributes => ({ 'data-margin-top': attributes.marginTop }),
      },
      marginLeft: {
        default: 0,
        parseHTML: element => parseInt(element.getAttribute('data-margin-left') || 0),
        renderHTML: attributes => ({ 'data-margin-left': attributes.marginLeft }),
      },
    };
  },

  addNodeView() {
    return ({ node, editor, getPos }) => {
      const dom = document.createElement('div');
      dom.classList.add('image-resizable-container');

      const img = document.createElement('img');
      img.src = node.attrs.src;  // base64 or URL
      img.alt = node.attrs.alt || '';
      img.width = node.attrs.width || 'auto';
      img.height = node.attrs.height || 'auto';
      img.style.cssText = `
        display: block;
        max-width: 100%;
        cursor: move;
      `;

      const updateContainerStyle = () => {
        let style = `position: relative; display: inline-block;`;

        if (node.attrs.alignment === 'left') {
          style += `float: left; margin-right: 1em; margin-bottom: 0.5em;`;
        } else if (node.attrs.alignment === 'right') {
          style += `float: right; margin-left: 1em; margin-bottom: 0.5em;`;
        } else if (node.attrs.alignment === 'center') {
          style += `display: block; margin-left: auto; margin-right: auto;`;
        }

        if (node.attrs.marginTop) style += `margin-top: ${node.attrs.marginTop}px;`;
        if (node.attrs.marginLeft) style += `margin-left: ${node.attrs.marginLeft}px;`;

        dom.setAttribute('style', style);
      };

      updateContainerStyle();
      dom.contentEditable = 'false';

      // ... All other logic for resize handles, overlays, drag-drop, alignment buttons remains unchanged ...

      dom.appendChild(img);
      return {
        dom,
        update(updatedNode) {
          if (updatedNode.type.name !== 'image') return false;

          img.src = updatedNode.attrs.src;
          img.alt = updatedNode.attrs.alt || '';
          img.width = updatedNode.attrs.width || 'auto';
          img.height = updatedNode.attrs.height || 'auto';
          updateContainerStyle();

          return true;
        },
        destroy() {
          editor.off('selectionUpdate');
        }
      };
    };
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('resizableImage'),
        props: {
          handleDOMEvents: {
            click(view, event) {
              const pos = view.posAtDOM(event.target, 0);
              if (pos === undefined || pos < 0) return false;

              const node = view.state.doc.nodeAt(pos);
              if (node?.type.name === 'image') {
                view.dispatch(view.state.tr.setSelection(NodeSelection.create(view.state.doc, pos)));
                return true;
              }
              return false;
            }
          }
        }
      })
    ];
  }
});

export default ResizableImage;
