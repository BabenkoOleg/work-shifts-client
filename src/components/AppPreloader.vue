<template>
  <div class="app-preloader">
    <h3 class="title">Work Shifts</h3>
    <div class="app-preloader-loader">
      <div class="app-preloader-inner app-preloader-one"></div>
      <div class="app-preloader-inner app-preloader-two"></div>
      <div class="app-preloader-inner app-preloader-three"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-preloader {
  width: 300px;

  .title {
    color: #fff;
    font-size: 35px;
    margin-bottom: 20px;
    text-align: center;
  }

  .app-preloader-loader {
    margin: 0 auto;
    width: 62px;
    height: 62px;
    border-radius: 50%;
      -o-border-radius: 50%;
      -ms-border-radius: 50%;
      -webkit-border-radius: 50%;
      -moz-border-radius: 50%;
    perspective: 780px;
  }

  .app-preloader-inner {
    position: absolute;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
      -o-box-sizing: border-box;
      -ms-box-sizing: border-box;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
    border-radius: 50%;
      -o-border-radius: 50%;
      -ms-border-radius: 50%;
      -webkit-border-radius: 50%;
      -moz-border-radius: 50%;
  }

  .app-preloader-inner.app-preloader-one {
    left: 0%;
    top: 0%;
    animation: app-preloader-rotate-one 1.15s linear infinite;
      -o-animation: app-preloader-rotate-one 1.15s linear infinite;
      -ms-animation: app-preloader-rotate-one 1.15s linear infinite;
      -webkit-animation: app-preloader-rotate-one 1.15s linear infinite;
      -moz-animation: app-preloader-rotate-one 1.15s linear infinite;
    border-bottom: 3px solid #fff;
  }

  .app-preloader-inner.app-preloader-two {
    right: 0%;
    top: 0%;
    animation: app-preloader-rotate-two 1.15s linear infinite;
      -o-animation: app-preloader-rotate-two 1.15s linear infinite;
      -ms-animation: app-preloader-rotate-two 1.15s linear infinite;
      -webkit-animation: app-preloader-rotate-two 1.15s linear infinite;
      -moz-animation: app-preloader-rotate-two 1.15s linear infinite;
    border-right: 3px solid #fff;
  }

  .app-preloader-inner.app-preloader-three {
    right: 0%;
    bottom: 0%;
    animation: app-preloader-rotate-three 1.15s linear infinite;
      -o-animation: app-preloader-rotate-three 1.15s linear infinite;
      -ms-animation: app-preloader-rotate-three 1.15s linear infinite;
      -webkit-animation: app-preloader-rotate-three 1.15s linear infinite;
      -moz-animation: app-preloader-rotate-three 1.15s linear infinite;
    border-top: 3px solid #fff;
  }

  @keyframes app-preloader-rotate-one {
    0% {
      transform: rotateX(35deg) rotateY(-45deg) rotateZ(0deg);
    }
    100% {
      transform: rotateX(35deg) rotateY(-45deg) rotateZ(360deg);
    }
  }

  @-o-keyframes app-preloader-rotate-one {
    0% {
      -o-transform: rotateX(35deg) rotateY(-45deg) rotateZ(0deg);
    }
    100% {
      -o-transform: rotateX(35deg) rotateY(-45deg) rotateZ(360deg);
    }
  }

  @-ms-keyframes app-preloader-rotate-one {
    0% {
      -ms-transform: rotateX(35deg) rotateY(-45deg) rotateZ(0deg);
    }
    100% {
      -ms-transform: rotateX(35deg) rotateY(-45deg) rotateZ(360deg);
    }
  }

  @-webkit-keyframes app-preloader-rotate-one {
    0% {
      -webkit-transform: rotateX(35deg) rotateY(-45deg) rotateZ(0deg);
    }
    100% {
      -webkit-transform: rotateX(35deg) rotateY(-45deg) rotateZ(360deg);
    }
  }

  @-moz-keyframes app-preloader-rotate-one {
    0% {
      -moz-transform: rotateX(35deg) rotateY(-45deg) rotateZ(0deg);
    }
    100% {
      -moz-transform: rotateX(35deg) rotateY(-45deg) rotateZ(360deg);
    }
  }

  @keyframes app-preloader-rotate-two {
    0% {
      transform: rotateX(50deg) rotateY(10deg) rotateZ(0deg);
    }
    100% {
      transform: rotateX(50deg) rotateY(10deg) rotateZ(360deg);
    }
  }

  @-o-keyframes app-preloader-rotate-two {
    0% {
      -o-transform: rotateX(50deg) rotateY(10deg) rotateZ(0deg);
    }
    100% {
      -o-transform: rotateX(50deg) rotateY(10deg) rotateZ(360deg);
    }
  }

  @-ms-keyframes app-preloader-rotate-two {
    0% {
      -ms-transform: rotateX(50deg) rotateY(10deg) rotateZ(0deg);
    }
    100% {
      -ms-transform: rotateX(50deg) rotateY(10deg) rotateZ(360deg);
    }
  }

  @-webkit-keyframes app-preloader-rotate-two {
    0% {
      -webkit-transform: rotateX(50deg) rotateY(10deg) rotateZ(0deg);
    }
    100% {
      -webkit-transform: rotateX(50deg) rotateY(10deg) rotateZ(360deg);
    }
  }

  @-moz-keyframes app-preloader-rotate-two {
    0% {
      -moz-transform: rotateX(50deg) rotateY(10deg) rotateZ(0deg);
    }
    100% {
      -moz-transform: rotateX(50deg) rotateY(10deg) rotateZ(360deg);
    }
  }

  @keyframes app-preloader-rotate-three {
    0% {
      transform: rotateX(35deg) rotateY(55deg) rotateZ(0deg);
    }
    100% {
      transform: rotateX(35deg) rotateY(55deg) rotateZ(360deg);
    }
  }

  @-o-keyframes app-preloader-rotate-three {
    0% {
      -o-transform: rotateX(35deg) rotateY(55deg) rotateZ(0deg);
    }
    100% {
      -o-transform: rotateX(35deg) rotateY(55deg) rotateZ(360deg);
    }
  }

  @-ms-keyframes app-preloader-rotate-three {
    0% {
      -ms-transform: rotateX(35deg) rotateY(55deg) rotateZ(0deg);
    }
    100% {
      -ms-transform: rotateX(35deg) rotateY(55deg) rotateZ(360deg);
    }
  }

  @-webkit-keyframes app-preloader-rotate-three {
    0% {
      -webkit-transform: rotateX(35deg) rotateY(55deg) rotateZ(0deg);
    }
    100% {
      -webkit-transform: rotateX(35deg) rotateY(55deg) rotateZ(360deg);
    }
  }

  @-moz-keyframes app-preloader-rotate-three {
    0% {
      -moz-transform: rotateX(35deg) rotateY(55deg) rotateZ(0deg);
    }
    100% {
      -moz-transform: rotateX(35deg) rotateY(55deg) rotateZ(360deg);
    }
  }
}
</style>
