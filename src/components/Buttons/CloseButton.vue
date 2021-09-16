<template>
  <div id="header">
    <svg
      onClick="{props.onClick}"
      id="closeButton"
      className="icons"
      width="16"
      height="16"
      viewBox="0 0 16 4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M16 4H0V0H16" fill="black" />
    </svg>
  </div>
</template>

<script>
export default {}
</script>

<style css>
@import './Buttons.css';
</style>
