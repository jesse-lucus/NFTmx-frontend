<script setup>
import HeadButton from "./components/HeadButton.vue";
</script>

<template>
  <div
    class="relative z-10 bg-no-repeat bg-cover bg-right font-press sm:leading-relaxed xl:leading-relaxed text-white px-5.5 sm:px-10 md:px-16 lg:px-22 h-landing"
  >
    <div
      class="h-full w-full absolute left-0 -z-10 overflow-hidden"
      :style="{
        background: `url('/images/landing/hero-image-bg-1920.png')`,
        backgroundPosition: 'center',
        backgroundRepeat: 'repeat',
        backgroundColor: 'black',
      }"
    >
      <div
        class="w-full h-full absolute -right-80 overflow-hidden flex items-center"
      >
        <div class="h-1/2 w-full animation absolute"></div>
        <div class="h-1/2 w-full animation1 absolute"></div>
        <div class="h-1/2 w-full panel absolute"></div>
      </div>
    </div>
    <div class="max-w-screen-3xl mx-auto h-full flex items-center">
      <div class="relative w-full md:w-landing-md xl:w-landing-lg pb-18">
        <p class="text-home-sm md:text-home-md xl:text-home-lg">
          BUY NFTS WITH 100% DOWNSIDE PROTECTION
        </p>
        <div class="flex flex-wrap mt-6 lg:mt-12 gap-5.25 xl:gap-11">
          <head-button to="home" color="secondary" label="EXPLORE" />
          <head-button color="primary" label="LIST" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.h-landing {
  height: calc(100vh - 70px);
}
.perspective {
  perspective: 100px;
}
.panel {
  transform: perspective(20px) rotateY(-3deg);
  background: linear-gradient(
    to right,
    rgba(44, 50, 51, 0.2),
    rgba(255, 255, 255, 0)
  );
}
.animation {
  transform: perspective(20px) rotateY(-3deg);
  background: url("/images/landing/hero-nfts.png");
  background-repeat: repeat;
  animation: animatedBackground 500s linear infinite;
  background-size: 100% 100%;
}
@keyframes animatedBackground {
  from {
    background-position: 0 0;
  }
  /*use negative width if you want it to flow right to left else and positive for left to right*/
  to {
    background-position: -10000px 0;
  }
}
.animation1 {
  transform: perspective(20px) rotateY(-3deg);
  background: url("/images/landing/hero-nfts.png");
  background-repeat: repeat;
  animation: animatedBackground1 500s linear infinite;
  background-size: 100% 100%;
}
@keyframes animatedBackground1 {
  from {
    background-position: -1000px 0;
  }
  /*use negative width if you want it to flow right to left else and positive for left to right*/
  to {
    background-position: -11000px 0;
  }
}
</style>
