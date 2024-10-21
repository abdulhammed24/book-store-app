export const toggleBodyScroll = (isLocked) => {
  if (typeof document !== "undefined") {
    document.body.style.overflow = isLocked ? "hidden" : "";
  }
};
