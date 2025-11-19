<template>
  <div class="container">
    <BaseHeader />
    <main class="main">
      <slot />
    </main>
    <BaseFooter />
    <BaseAlert />
    <CartSidebar />
  </div>
</template>

<style>
  .container {
    display: flex;
    flex-direction: column;
    min-height: 100%;
  }

  .main {
    position: relative;
    flex: 1 1 auto;
  }
</style>
