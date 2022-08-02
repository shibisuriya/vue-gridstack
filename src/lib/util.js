export const findIndicesUsingId = (id, layout) => {
  // The way this function is used needs to be rewritten to improve dashboard's performance...
  let parentIndex = -1;
  let childIndex = -1;
  let widget = null;
  if (!layout || !id) {
    return {
      index: -1,
      childIndex: -1,
      widget: null,
    };
  } else {
    if (layout && layout.length > 0) {
      outerloop: for (let i = 0; i < layout.length; i++) {
        const w = layout[i];
        if (w.id == id) {
          parentIndex = i;
          childIndex = -1;
          widget = layout[parentIndex];
          break outerloop; // Break out of the outer loop.
        } else if (w.children) {
          const children = layout[i].children;
          for (let ci = 0; ci < children.length; ci++) {
            const cw = children[ci];
            if (cw.id == id) {
              parentIndex = i;
              childIndex = ci;
              widget = layout[parentIndex].children[childIndex];
              break outerloop; // Break out of the outer loop.
            }
          }
        }
      }
    }
    return {
      idx: parentIndex,
      cidx: childIndex,
      w: widget,
    };
  }
};
