/**
 * Checks if an element is visible inside a given container.
 * Source: {@link https://stackoverflow.com/a/37285344}
 * @param container
 * @param element
 * @param partial
 * @param offset
 * @returns {boolean}
 */
export const isInView = (element, { partial = false, offset = 0 } = {}) => {
  const container = element.offsetParent;
  if (!container) {
    return true;
  }

  const cTop = container.scrollTop;
  const cBottom = cTop + container.clientHeight;

  const eTop = element.offsetTop - (offset || 0);
  const eBottom = eTop + element.clientHeight;

  // Check if in view
  const isTotal = eTop >= cTop && eBottom <= cBottom;
  const isPartial =
    partial &&
    ((eTop < cTop && eBottom > cTop) || (eBottom > cBottom && eTop < cBottom));

  return isTotal || isPartial;
};

/**
 * Adjusts the height of the content of a modal.
 * @param modal
 */
export const adjustModalHeight = (modal: HTMLIonModalElement) => {
  const container = modal.querySelector('ion-content') as HTMLElement;
  const content = container?.shadowRoot?.querySelector(
    '.inner-scroll',
  ) as HTMLElement;

  const page: HTMLElement | null = modal.querySelector('.ion-page');
  if (!content || !page) {
    return;
  }

  let height: number;
  if (modal.classList.contains('modal-sheet')) {
    height = window.innerHeight - page.getBoundingClientRect().top - 56;
  } else {
    height = page.clientHeight - 56;
  }

  content.style.height = `${height}px`;
};

export const adjustPopover = (popover: HTMLIonPopoverElement) => {
  const container = popover.querySelector('ion-content') as HTMLElement;
  const content = container?.shadowRoot?.querySelector(
    '.inner-scroll',
  ) as HTMLElement;
  if (!content) {
    return;
  }

  let bottom: number;
  if (content.clientHeight === 0) {
    bottom = content.lastElementChild!.getBoundingClientRect().bottom;
  } else {
    bottom = content.getBoundingClientRect().bottom;
  }

  if (bottom > window.innerHeight) {
    const height = window.innerHeight - content.getBoundingClientRect().top;
    content.style.height = `${height}px`;
  }
};
