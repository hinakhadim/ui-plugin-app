

const footerLinksPlugin = {
  id: 'footer-container',
  getUiSlotChanges() {
    return {
      footer: [
        {
          op: 'insert',
          widget: {
            id: 'footer-links',
            priority: 2,
            content: <div>Link 1</div>,
          },
        },
      ],
    };
  },
};

export default footerLinksPlugin;
