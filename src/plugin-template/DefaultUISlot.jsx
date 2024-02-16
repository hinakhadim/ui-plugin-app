import React from 'react';
import PropTypes from 'prop-types';
import { UISlot } from './UISlot';

export const defaultRender = (widget) => (
  <React.Fragment key={widget.id}>{widget.content}</React.Fragment>
);

export const DefaultUISlot = (props) => (
  <UISlot
    slotId={props.slotId}
    renderWidget={defaultRender}
    defaultContents={
        props.children
          ? [{ id: 'content', priority: 1, content: props.children }]
          : []
      }
  />
);

DefaultUISlot.propTypes = {
  slotId: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};
