<template>
  <div class="full_bg" :style="{ backgroundImage: 'url(' + url + ')' }">
    <slot />
  </div>
</template>

<script setup lang="ts">
  import { STYLE } from "../config/config";
  import { defineProps, defineEmits, computed } from "vue";
  import { useHead } from "#imports";

  interface FullBgProps {
    url: string;
    themeColor: string;
  }

  const props = withDefaults(defineProps<FullBgProps>(), {
    url: STYLE.defaultImg,
    themeColor: STYLE.defaultThemeColor,
    height: "100vh",
  });
  useHead({
    style: [
      {
        children: `.full_bg:after {content: "";display: block;position: absolute;bottom: 0;width: 100%;height: 85%;background-image: linear-gradient(0deg, ${props.themeColor} 55.5%, #fff0 100%);}`,
      },
    ],
  });
  /*
  const { data } = await useAsyncData('routeMeta', () => {
    return {
      backgroundImage: route.meta?.backgroundImage || STYLE.defaultImg,
      themeColor: route.meta?.themeColor || STYLE.defaultThemeColor
    }
  })
  
  backgroundImage.value = data.value.backgroundImage
  themeColor.value = data.value.themeColor
  
  useHead({
    style: [
      {
        children: `
          .full_bg:after {
            content: "";
            display: block;
            position: absolute;
            bottom: 0;
            width: 100%;
            height: 85%;
            background-image: linear-gradient(0deg, ${themeColor.value} 55.5%, #fff0 100%);
          }
        `
      }
    ]
  })
    */
</script>

<style scoped>
  .full_bg {
    z-index: -1;
    height: 100vh;
    background-position: 50%;
    background-size: cover;
    background-repeat: no-repeat;
    width: 100%;
    position: fixed;
    top: 0;
    min-height: 300px;
    left: 0;
  }
</style>
