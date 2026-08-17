<template>
  <div class="wrap">
    <div class="logo">
      <h1>404</h1>
      <div class="text">
        <p>对不起，你要找的这个页面突然不见了。</p>
        <p>不过，放心，一切都在我的掌控之中，不会跑多远！</p>
      </div>
      <div class="sub">
        <p><a href="/">Go Home</a></p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrap {
  box-sizing: border-box;
  height: 100%;
  margin: 0 auto;
  width: 100%;
  background: #f3f3e1;
  font-family: "Courgette", cursive;
  position: relative;
}

.logo {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.logo h1 {
  font-size: 150px;
  color: #8f8e8c;
  text-align: center;
  text-shadow: 1px 1px 6px #fff;
}

.logo .text {
  margin: 8px 0;
}
.logo p {
  color: rgb(228, 146, 162);
  font-size: 20px;
  text-align: center;
}
.logo p span {
  color: lightgreen;
}

.sub a {
  color: white;
  background: #8f8e8c;
  text-decoration: none;
  padding: 7px 120px;
  font-size: 13px;
  font-family: arial, serif;
  font-weight: bold;
  border-radius: 0.1em;
}
</style>