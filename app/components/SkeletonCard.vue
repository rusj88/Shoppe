<template>
  <article class="card skeleton">
    <div class="image-container" />
    <span class="line title"></span>
    <span class="line price"></span>
  </article>
</template>

<style scoped lang="scss">
  .card {
    display: flex;
    flex-direction: column;
    gap: 6px;
    width: 136px;
    font-family: $font-dm-sans;
    font-size: 14px;

    @media (min-width: $bp-lg) {
      width: 380px;
      font-size: 20px;
    }
  }

  .image-container {
    width: 100%;
    height: 136px;
    background: linear-gradient(90deg, #eee 25%, #f5f5f5 37%, #eee 63%);
    background-size: 400% 100%;
    border-radius: 4px;
    animation: shimmer 1.4s ease infinite;

    @media (min-width: $bp-lg) {
      height: 380px;
    }
  }

  .line {
    display: block;
    background: linear-gradient(90deg, #eee 25%, #f5f5f5 37%, #eee 63%);
    background-size: 400% 100%;
    border-radius: 4px;
    animation: shimmer 1.4s ease infinite;
  }

  .title {
    width: 80%;
    height: 16px;

    @media (min-width: $bp-lg) {
      height: 24px;
    }
  }

  .price {
    width: 40%;
    height: 12px;

    @media (min-width: $bp-lg) {
      height: 18px;
    }
  }

  @keyframes shimmer {
    0% {
      background-position: -400% 0;
    }

    100% {
      background-position: 400% 0;
    }
  }
</style>
