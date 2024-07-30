<template>
    <div>
          <slot name="header" />
      <main>
        <slot name="main">Default Main Content</slot>
      </main>
      <footer>
        <slot name="footer">Default Footer Content</slot>
      </footer>
    </div>
  </template>

  <script setup>

  </script>
  
  <style scoped>
  main{
    padding: 35px 0 35px;
    background-color: #f6f6f6;

  max-width: 1000px;
    width: 90%;
    
    margin-left: auto;
    margin-right: auto;

  }

  </style>
  