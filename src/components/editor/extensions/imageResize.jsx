// ResizableImageExtension.js
import Image from '@tiptap/extension-image';
import { Plugin, PluginKey } from 'prosemirror-state';
import { NodeSelection } from 'prosemirror-state';

// Custom Image extension that supports resizing and dragging
const ResizableImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: 'auto',
        parseHTML: element => element.getAttribute('width') || 'auto',
        renderHTML: attributes => {
          if (!attributes.width) {
            return {};
          }
          return { width: attributes.width };
        },
      },
      height: {
        default: 'auto',
        parseHTML: element => element.getAttribute('height') || 'auto',
        renderHTML: attributes => {
          if (!attributes.height) {
            return {};
          }
          return { height: attributes.height };
        },
      },
      // Keep track of the original dimensions
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
      // Add alignment attributes for positioning
      alignment: {
        default: 'inline', // can be 'inline', 'left', 'center', 'right'
        parseHTML: element => element.getAttribute('data-alignment') || 'inline',
        renderHTML: attributes => {
          if (!attributes.alignment) {
            return {};
          }
          return { 'data-alignment': attributes.alignment };
        },
      },
      // Add margin attributes for fine-tuning position
      marginTop: {
        default: 0,
        parseHTML: element => element.getAttribute('data-margin-top') || 0,
        renderHTML: attributes => {
          if (!attributes.marginTop) {
            return {};
          }
          return { 'data-margin-top': attributes.marginTop };
        },
      },
      marginLeft: {
        default: 0,
        parseHTML: element => element.getAttribute('data-margin-left') || 0,
        renderHTML: attributes => {
          if (!attributes.marginLeft) {
            return {};
          }
          return { 'data-margin-left': attributes.marginLeft };
        },
      },
    };
  },

  addNodeView() {
    return ({ node, editor, getPos }) => {
      // Create container for the image and resize handles
      const dom = document.createElement('div');
      dom.classList.add('image-resizable-container');

      // Set style based on alignment
      updateContainerStyle();

      function updateContainerStyle() {
        let containerStyle = `
          position: relative;
          display: inline-block;
        `;

        // Apply alignment styles
        if (node.attrs.alignment === 'left') {
          containerStyle += `
            float: left;
            margin-right: 1em;
            margin-bottom: 0.5em;
          `;
        } else if (node.attrs.alignment === 'right') {
          containerStyle += `
            float: right;
            margin-left: 1em;
            margin-bottom: 0.5em;
          `;
        } else if (node.attrs.alignment === 'center') {
          containerStyle += `
            display: block;
            margin-left: auto;
            margin-right: auto;
          `;
        }

        // Apply custom margins if set
        if (node.attrs.marginTop) {
          containerStyle += `margin-top: ${node.attrs.marginTop}px;`;
        }
        if (node.attrs.marginLeft) {
          containerStyle += `margin-left: ${node.attrs.marginLeft}px;`;
        }

        dom.setAttribute('style', containerStyle);
      }

      dom.contentEditable = 'false';

      // Create the image element
      const img = document.createElement('img');
      img.src = node.attrs.src;
      img.alt = node.attrs.alt || '';
      img.width = node.attrs.width || 'auto';
      img.height = node.attrs.height || 'auto';
      img.setAttribute('style', `
        display: block;
        max-width: 100%;
        cursor: move;
      `);

      // Add CSS styles for selected node
      const addSelectedStyles = () => {
        let selectedStyle = dom.getAttribute('style');
        selectedStyle += `outline: 2px solid #4285f4;`;
        dom.setAttribute('style', selectedStyle);
      };

      // Remove selected styles
      const removeSelectedStyles = () => {
        updateContainerStyle();
      };

      // Create alignment controls
      const alignmentControls = document.createElement('div');
      alignmentControls.classList.add('image-alignment-controls');
      alignmentControls.setAttribute('style', `
        position: absolute;
        top: -30px;
        left: 0;
        display: none;
        background-color: #f2f2f2;
        border-radius: 4px;
        box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        padding: 3px;
        z-index: 20;
      `);

      const createAlignButton = (alignment, icon) => {
        const button = document.createElement('button');
        button.setAttribute('style', `
          background-color: ${node.attrs.alignment === alignment ? '#4285f4' : 'transparent'};
          color: ${node.attrs.alignment === alignment ? 'white' : '#444'};
          border: none;
          border-radius: 3px;
          padding: 2px 6px;
          margin: 0 2px;
          cursor: pointer;
          font-size: 12px;
        `);
        button.textContent = icon;
        button.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          editor.commands.updateAttributes('image', { alignment });
        });
        return button;
      };

      const leftAlignBtn = createAlignButton('left', '⬅️');
      const centerAlignBtn = createAlignButton('center', '⬆️');
      const rightAlignBtn = createAlignButton('right', '➡️');
      const inlineAlignBtn = createAlignButton('inline', '↔️');

      alignmentControls.appendChild(leftAlignBtn);
      alignmentControls.appendChild(centerAlignBtn);
      alignmentControls.appendChild(rightAlignBtn);
      alignmentControls.appendChild(inlineAlignBtn);

      // Add resize overlay for preview
      const resizeOverlay = document.createElement('div');
      resizeOverlay.classList.add('resize-overlay');
      resizeOverlay.setAttribute('style', `
        position: absolute;
        top: 0;
        left: 0;
        width: ${img.width}px;
        height: ${img.height}px;
        border: 1px dashed #4285f4;
        background-color: rgba(66, 133, 244, 0.1);
        pointer-events: none;
        display: none;
        z-index: 5;
      `);

      // Add handles for resizing
      const resizeHandles = ['nw', 'ne', 'sw', 'se'].map(direction => {
        const handle = document.createElement('div');
        handle.classList.add('resize-handle', `resize-handle-${direction}`);

        // Base styles for all handles
        let handleStyles = `
          position: absolute;
          width: 12px;
          height: 12px;
          background-color: #4285f4;
          border: 1px solid white;
          border-radius: 50%;
          z-index: 10;
          cursor: ${direction}-resize;
          display: none;
        `;

        // Position the handles
        switch (direction) {
          case 'nw':
            handleStyles += 'top: -6px; left: -6px;';
            break;
          case 'ne':
            handleStyles += 'top: -6px; right: -6px;';
            break;
          case 'sw':
            handleStyles += 'bottom: -6px; left: -6px;';
            break;
          case 'se':
            handleStyles += 'bottom: -6px; right: -6px;';
            break;
        }

        handle.setAttribute('style', handleStyles);

        // Store original image dimensions on load
        img.onload = () => {
          if (!node.attrs.originalWidth) {
            editor.commands.updateAttributes('image', {
              originalWidth: img.naturalWidth,
              originalHeight: img.naturalHeight
            });
          }

          // Make sure overlay matches image size
          resizeOverlay.style.width = `${img.offsetWidth}px`;
          resizeOverlay.style.height = `${img.offsetHeight}px`;
        };

        let startX, startY, startWidth, startHeight;
        let isResizing = false;

        // Add resize event handlers using requestAnimationFrame for smoother performance
        handle.addEventListener('mousedown', (e) => {
          e.preventDefault();
          e.stopPropagation();

          // Select the node
          const pos = getPos();
          const { state, dispatch } = editor.view;
          dispatch(state.tr.setSelection(NodeSelection.create(state.doc, pos)));

          // Store initial values
          startX = e.clientX;
          startY = e.clientY;
          startWidth = img.offsetWidth;
          startHeight = img.offsetHeight;

          // Show resize overlay
          isResizing = true;
          resizeOverlay.style.display = 'block';
          resizeOverlay.style.width = `${startWidth}px`;
          resizeOverlay.style.height = `${startHeight}px`;

          // Temporarily hide other handles during resize
          resizeHandles.forEach(h => {
            if (h !== handle) {
              h.style.opacity = '0.3';
            }
          });

          let rafId = null;
          let newWidth = startWidth;
          let newHeight = startHeight;

          const handleMouseMove = (e) => {
            if (!isResizing) return;
            e.preventDefault();

            const dx = e.clientX - startX;
            const dy = e.clientY - startY;

            // Calculate new dimensions based on direction
            switch (direction) {
              case 'nw':
                newWidth = startWidth - dx;
                newHeight = startHeight - dy;
                break;
              case 'ne':
                newWidth = startWidth + dx;
                newHeight = startHeight - dy;
                break;
              case 'sw':
                newWidth = startWidth - dx;
                newHeight = startHeight + dy;
                break;
              case 'se':
                newWidth = startWidth + dx;
                newHeight = startHeight + dy;
                break;
            }

            // Ensure minimum dimensions
            newWidth = Math.max(20, newWidth);
            newHeight = Math.max(20, newHeight);

            // Update resize overlay immediately for visual feedback
            if (rafId) cancelAnimationFrame(rafId);

            rafId = requestAnimationFrame(() => {
              // Update the preview overlay
              resizeOverlay.style.width = `${newWidth}px`;
              resizeOverlay.style.height = `${newHeight}px`;

              // Also update the actual image for immediate feedback
              img.style.width = `${newWidth}px`;
              img.style.height = `${newHeight}px`;
            });
          };

          // Handle mouse up after resize
          const handleMouseUp = () => {
            if (!isResizing) return;

            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);

            // Hide resize overlay
            isResizing = false;
            resizeOverlay.style.display = 'none';

            // Restore handle opacity
            resizeHandles.forEach(h => {
              h.style.opacity = '1';
            });

            // Update actual image size in the editor
            editor.commands.updateAttributes('image', {
              width: newWidth,
              height: newHeight
            });
          };

          // Add mousemove and mouseup listeners to document
          document.addEventListener('mousemove', handleMouseMove);
          document.addEventListener('mouseup', handleMouseUp);
        });

        return handle;
      });

      // Add drag functionality
      let isDragging = false;
      let dragStartX, dragStartY;
      let originalMarginTop, originalMarginLeft;
      let dragTimeout;

      // Start drag
      img.addEventListener('mousedown', (e) => {
        // Ignore if clicking on a resize handle or button
        if (e.target.classList.contains('resize-handle') ||
          e.target.tagName === 'BUTTON') {
          return;
        }

        e.preventDefault();

        // Select the node
        const pos = getPos();
        const { state, dispatch } = editor.view;
        dispatch(state.tr.setSelection(NodeSelection.create(state.doc, pos)));

        isDragging = true;
        dragStartX = e.clientX;
        dragStartY = e.clientY;
        originalMarginTop = parseInt(node.attrs.marginTop) || 0;
        originalMarginLeft = parseInt(node.attrs.marginLeft) || 0;

        // Show drag ghost
        img.style.cursor = 'grabbing';

        document.addEventListener('mousemove', handleDragMove);
        document.addEventListener('mouseup', handleDragEnd);
      });

      // Move during drag with debouncing for smoother UX
      const handleDragMove = (e) => {
        if (!isDragging) return;

        e.preventDefault();

        // Calculate movement
        const dx = e.clientX - dragStartX;
        const dy = e.clientY - dragStartY;

        // Apply movement visually immediately
        dom.style.transition = 'none';
        dom.style.marginTop = `${originalMarginTop + dy}px`;
        dom.style.marginLeft = `${originalMarginLeft + dx}px`;

        // Debounce the actual update to reduce editor lag
        clearTimeout(dragTimeout);
        dragTimeout = setTimeout(() => {
          // This won't execute until dragging stops or slows significantly
        }, 100);
      };

      // End drag
      const handleDragEnd = (e) => {
        if (!isDragging) return;

        isDragging = false;
        document.removeEventListener('mousemove', handleDragMove);
        document.removeEventListener('mouseup', handleDragEnd);

        // Reset cursor
        img.style.cursor = 'move';

        // Calculate final movement
        const dx = e.clientX - dragStartX;
        const dy = e.clientY - dragStartY;

        // Update the actual node attributes
        editor.commands.updateAttributes('image', {
          marginTop: originalMarginTop + dy,
          marginLeft: originalMarginLeft + dx
        });
      };

      // Add selection listener
      const hideControls = () => {
        resizeHandles.forEach(handle => {
          handle.style.display = 'none';
        });
        alignmentControls.style.display = 'none';
        resizeOverlay.style.display = 'none';
        removeSelectedStyles();
      };

      const showControls = () => {
        resizeHandles.forEach(handle => {
          handle.style.display = 'block';
        });
        alignmentControls.style.display = 'flex';
        addSelectedStyles();
      };

      // Initially hide handles
      hideControls();

      // Add selection listener
      editor.on('selectionUpdate', ({ editor }) => {
        const { selection } = editor.state;
        const isSelected = selection.node?.type.name === 'image' &&
          selection.node.attrs.src === node.attrs.src;

        if (isSelected) {
          showControls();
        } else {
          hideControls();
        }
      });

      // Double click to reset size to original
      img.addEventListener('dblclick', () => {
        if (node.attrs.originalWidth && node.attrs.originalHeight) {
          editor.commands.updateAttributes('image', {
            width: node.attrs.originalWidth,
            height: node.attrs.originalHeight
          });
        }
      });

      // Append elements
      dom.appendChild(img);
      dom.appendChild(resizeOverlay);  // Add resize overlay
      dom.appendChild(alignmentControls);
      resizeHandles.forEach(handle => dom.appendChild(handle));

      return {
        dom,
        update: (updatedNode) => {
          if (updatedNode.type.name !== 'image') return false;

          // Update attributes if they changed
          if (updatedNode.attrs.src !== node.attrs.src) {
            img.src = updatedNode.attrs.src;
          }

          if (updatedNode.attrs.alt !== node.attrs.alt) {
            img.alt = updatedNode.attrs.alt || '';
          }

          if (updatedNode.attrs.width !== node.attrs.width) {
            img.width = updatedNode.attrs.width || 'auto';
            // Update overlay to match
            resizeOverlay.style.width = `${img.offsetWidth}px`;
          }

          if (updatedNode.attrs.height !== node.attrs.height) {
            img.height = updatedNode.attrs.height || 'auto';
            // Update overlay to match
            resizeOverlay.style.height = `${img.offsetHeight}px`;
          }

          if (updatedNode.attrs.alignment !== node.attrs.alignment ||
            updatedNode.attrs.marginTop !== node.attrs.marginTop ||
            updatedNode.attrs.marginLeft !== node.attrs.marginLeft) {
            node.attrs = updatedNode.attrs;
            updateContainerStyle();
          }

          return true;
        },
        destroy: () => {
          // Clean up event listeners when node is removed
          editor.off('selectionUpdate');
          img.onload = null;
          document.removeEventListener('mousemove', handleDragMove);
          document.removeEventListener('mouseup', handleDragEnd);
        }
      };
    };
  },

  // Add plugin to track selection changes and handle clicks
  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('resizableImage'),
        props: {
          handleDOMEvents: {
            click(view, event) {
              const { state, dispatch } = view;

              // Find position at click
              const pos = view.posAtDOM(event.target, 0);
              if (pos === undefined || pos < 0) return false;

              // Check if clicking on an image node
              const node = pos >= 0 ? state.doc.nodeAt(pos) : null;

              if (node && node.type.name === 'image') {
                dispatch(state.tr.setSelection(NodeSelection.create(state.doc, pos)));
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