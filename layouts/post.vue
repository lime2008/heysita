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
  
  <style>
  main{
    padding: 35px 0 30px;
    background-color: #f6f6f6;
  }
  </style>
  