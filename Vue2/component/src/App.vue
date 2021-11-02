<template>
  <div id="app">
    <router-link to="/">Go to form</router-link>
    &nbsp; &nbsp;
    <router-link to="/display">Go to Display</router-link>
    &nbsp; &nbsp;
    <router-link to="/table">Go to table render</router-link>
    &nbsp; &nbsp;
    <router-link to="/table-slot">Go to table-slot render</router-link>
    &nbsp; &nbsp;
    <router-link to="/tree">Go to Tree</router-link>
    <hr />
    <router-view />
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>
