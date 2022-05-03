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
        background: `url('/images/landing/hero-image-background-1920.png')`,
        backgroundSize: 'cover',
        backgroundColor: 'black',
      }"
    >
      <div
        class="w-full h-full absolute -right-80 overflow-hidden flex items-center"
      >
        <div class="h-1/2 w-full animation anim1 absolute"></div>
        <div class="h-1/2 w-full animation anim2 absolute"></div>
        <div class="h-1/2 w-full animation anim3 absolute"></div>
        <div class="h-1/2 w-full animation anim4 absolute"></div>
        <div class="h-1/2 w-full animation anim5 absolute"></div>
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
  transform: perspective(22px) rotateY(-3deg);
  background: linear-gradient(
    to right,
    rgb(0, 0, 0, 0.8),
    rgba(36, 36, 36, 0.1) 50%,
    rgba(255, 255, 255, 0)
  );
}
.animation {
  background: url("/images/landing/hero-nfts.png");
  background-repeat: repeat;
  background-size: 100% 100%;
}
.anim1 {
  transform: perspective(15px) rotateY(-3deg) translate3d(0px, -100px, -1px);
  animation: animatedBackground1 300s linear infinite;
}
@keyframes animatedBackground1 {
  from {
    background-position: 0 0;
  }
  /*use negative width if you want it to flow right to left else and positive for left to right*/
  to {
    background-position: -10000px 0;
  }
}
.anim2 {
  transform: perspective(17px) rotateY(-3deg) translate3d(0px, 80px, -2px);
  animation: animatedBackground2 300s linear infinite;
}
@keyframes animatedBackground2 {
  from {
    background-position: -300px 0px;
  }
  to {
    background-position: -10300px 0px;
  }
}
.anim3 {
  transform: perspective(19px) rotateY(-3deg) translate3d(0px, -70px, -3px);
  animation: animatedBackground3 300s linear infinite;
}
@keyframes animatedBackground3 {
  from {
    background-position: -700px 0px;
  }
  to {
    background-position: -10700px 0px;
  }
}
.anim4 {
  transform: perspective(21px) rotateY(-3deg) translate3d(0px, 40px, -4px);
  animation: animatedBackground4 300s linear infinite;
}
@keyframes animatedBackground4 {
  from {
    background-position: -1200px 0px;
  }
  to {
    background-position: -11200px 0px;
  }
}
.anim5 {
  transform: perspective(22px) rotateY(-3deg);
  animation: animatedBackground5 300s linear infinite;
}
@keyframes animatedBackground5 {
  from {
    background-position: -1500px 0px;
  }
  to {
    background-position: -11500px 0px;
  }
}
</style>
