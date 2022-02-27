/** Navigates via keydown actions to the next slide, page, or action
 *
 * After some use I'm not sure that this actually helps
 *  with readability or reducing code lol
 */
function nextAction(
  event: KeyboardEvent,
  onNext: Function,
  onBack: Function,
  exceptions?: Function
) {
  if (exceptions && exceptions()) {
    return
  }
  const { code } = event
  if (
    ["ArrowRight", "ArrowDown", "Space", "PageDown"].includes(code)
  ) {
    return onNext()
  } else if (["ArrowLeft", "ArrowUp", "PageUp"].includes(code)) {
    return onBack()
  }
}

export default nextAction
