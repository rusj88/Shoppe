<template>
  <div class="overlay">
    <div class="overlay-text">
      <span>Gold big hoops</span>
      <span class="price-tag">$ 68,00</span>
    </div>
    <button class="view-btn">View Product</button>
  </div>
</template>

<style scoped lang="scss">
  .overlay {
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-family: $font-dm-sans;
    font-size: 20px;
    font-weight: 500;
    color: $color-white;

    @media (min-width: $bp-lg) {
      gap: 48px;
      font-size: 33px;
    }
  }

  .overlay-text {
    display: flex;
    flex-direction: column;
    gap: 8px;

    @media (min-width: $bp-lg) {
      gap: 16px;
    }
  }

  .price-tag {
    font-size: 14px;
    font-weight: 400;

    @media (min-width: $bp-lg) {
      font-size: 26px;
    }
  }

  .view-btn {
    width: 92px;
    height: 32px;
    font-size: 12px;
    color: $color-white;
    border: 1px solid $color-white;
    border-radius: 4px;

    @media (min-width: $bp-lg) {
      width: 193px;
      height: 62px;
      font-size: 20px;
      font-weight: bold;
    }
  }
</style>
