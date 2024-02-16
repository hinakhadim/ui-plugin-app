/* eslint-disable no-restricted-syntax */
import React, { createContext, useContext, useMemo } from 'react';
import PropTypes from 'prop-types';

const UiChangeOperation = {
  INSERT: 'insert',
  HIDE: 'hide',
  MODIFY: 'modify',
  WRAP: 'wrap',
};

export const UiPluginsContext = createContext([]);

export const UISlot = (props) => {
  const enabledPlugins = useContext(UiPluginsContext);

  const allContents = useMemo(() => {
    const contents = [...(props.defaultContents ?? [])];

    for (const p of enabledPlugins) {
      const changes = p.getUiSlotChanges();
      for (const change of changes[props.slotId] ?? []) {
        if (change.op === UiChangeOperation.INSERT) {
          contents.push(change.widget);
        } else if (change.op === UiChangeOperation.HIDE) {
          const widget = contents.find((w) => w.id === change.widgetId);
          if (widget) {
            widget.hidden = true;
          }
        } else if (change.op === UiChangeOperation.MODIFY) {
          const widgetIdx = contents.findIndex((w) => w.id === change.widgetId);
          if (widgetIdx >= 0) {
            const widget = { ...contents[widgetIdx] };
            contents[widgetIdx] = change.fn(widget);
          }
        } else if (change.op === UiChangeOperation.WRAP) {
          const widgetIdx = contents.findIndex((w) => w.id === change.widgetId);
          if (widgetIdx >= 0) {
            const newWidget = { wrappers: [], ...contents[widgetIdx] };
            newWidget.wrappers.push(change.wrapper);
            contents[widgetIdx] = newWidget;
          }
        } else {
          throw new Error(`unknown plugin UI change operation: ${change.op}`);
        }
      }
    }
    // Sort first by priority, then by ID
    contents.sort(
      (a, b) => (a.priority - b.priority) * 10_000 + a.id.localeCompare(b.id),
    );
    return contents;
  }, [props.defaultContents, enabledPlugins, props.slotId]);

  return (
    <>
      {allContents.map((c) => {
        if (c.hidden) { return null; }

        return (
          c.wrappers
            ? c.wrappers.reduce(
              (widget, wrapper) => React.createElement(wrapper, { widget, key: c.id }),
              props.renderWidget(c),
            )
            : props.renderWidget(c));
      })}
    </>
  );
};

UISlot.propTypes = {
  slotId: PropTypes.string.isRequired,
  defaultContents: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    priority: PropTypes.number,
    content: PropTypes.node,
  })),
  renderWidget: PropTypes.element.isRequired,
};

UISlot.defaultProps = {
  defaultContents: [],
};
