<template>
  <router-view />
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
/* Reset style dasar */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Arial", sans-serif;
}

/* Styling untuk body */
body {
  background-color: #f5f5f5;
  color: #333;
  line-height: 1.6;
}

/* Styling container utama */
.container {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

/* Heading */
h1,
h2 {
  color: #42b983;
  margin-bottom: 10px;
}

/* Form Elements */
form input,
form select,
form button {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

/* Button */
button {
  background-color: #42b983;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #369f71;
}

/* Error message */
.alert {
  color: red;
  font-weight: bold;
}
</style>
