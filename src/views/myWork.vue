<template>
  <div class="threadWrap">
    <h1>开启一个线程运算用$worker.run方法</h1>
    <br />
    <el-button
      @click="openOneThread"
      type="success"
      plain
      size="small"
      style="margin-bottom: 16px"
      >计算斐波那契数列值和用时，以及渲染页面两个任务</el-button
    >
    <div>
      斐波那契值为：<span class="bold">{{ fibRes }}</span>
      <i v-show="btnLoading" class="el-icon-loading"></i>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 执行用时：
      <i v-show="btnLoading" class="el-icon-loading"></i>
      <span class="bold">{{ fibTime }}</span>
      毫秒
    </div>
    <br />
    <div class="UI">
      <span>不阻塞后续的代码执行：</span>
      <h2 ref="renderH2"></h2>
    </div>
    <br />
    <br />
    <h1>开启多个线程使用$worker.create、postAll方法</h1>
    <br />
    <el-button
      @click="noParamsFn"
      type="success"
      plain
      size="small"
      style="margin-bottom: 12px"
      :loading="loadingOne"
      >不传参都执行一次</el-button
    >
    <el-button
      @click="byMessageNameStrFn"
      type="success"
      plain
      size="small"
      style="margin-bottom: 12px"
      :loading="loadingTwo"
      >根据message的名字指定谁执行(字符串形式)</el-button
    >
    <el-button
      @click="byMessageNameObjParamsFn"
      type="success"
      plain
      size="small"
      style="margin-bottom: 12px"
      :loading="loadingThree"
      >根据message的名字指定谁执行(对象形式可传参)</el-button
    >
    <div class="info">F12请打开控制台查看--></div>
    <br />
    <h1>不使用多线程，使用Promise.all太耗时啦！</h1>
    <br />
    <el-button
      @click="usePromiseFn"
      type="success"
      plain
      size="small"
      style="margin-bottom: 12px"
      >Promise执行多个任务</el-button
    >
    <div class="info">F12请打开控制台查看--></div>
  </div>
</template>

<script>
export default {
  name: "myWorkName",
  data() {
    return {
      worker: null,
      btnLoading: false,
      fibNum: 44,
      fibRes: null,
      fibTime: null,
      /****/
      loadingOne: false,
      loadingTwo: false,
      loadingThree: false,
      worker2: null,
    };
  },
  methods: {
    
    openOneThread() {
      
      this.btnLoading = true;
      this.worker = this.$worker 
        .run(
          (n) => {
            function fib(n) {
              if ((n == 1) | (n == 2)) {
                return 1;
              } else {
                return fib(n - 1) + fib(n - 2);
              }
            }
            let start = Date.now(); 
            let res = fib(n);
            let end = Date.now();
            return [res, end - start]; 
          },
          [this.fibNum] 
        )
        .then((res) => {
          console.log("then", res); 
          this.fibRes = res[0];
          this.fibTime = res[1];
          this.btnLoading = false;
        })
        .catch((err) => {
          console.log("err", err);
          this.btnLoading = false;
        });
      let h2Dom = this.$refs.renderH2;
      let n = 0;
      let timer = setInterval(() => {
        if (n >= 60) {
          clearInterval(timer);
        } else {
          n++;
          h2Dom.innerHTML = n;
        }
      }, 100);
    },
    noParamsFn() {
      this.loadingOne = true;
      console.time("多个线程计算用时1");
      this.worker2
        .postAll()
        .then((res) => {
          console.timeEnd("多个线程计算用时1");
          console.log("res", res); 
          this.loadingOne = false;
        })
        .catch((err) => {
          console.timeEnd("多个线程计算用时1");
          console.log("err", err);
          this.loadingOne = false;
        });
    },
    byMessageNameStrFn() {
      this.loadingTwo = true;
      console.time("多个线程计算用时2");
      this.worker2
        .postAll(["fn1", "fn3"]) 
        .then((res) => {
          console.timeEnd("多个线程计算用时2");
          console.log("res", res);
          this.loadingTwo = false;
        })
        .catch((err) => {
          console.timeEnd("多个线程计算用时2");
          console.log("err", err);
          this.loadingTwo = false;
        });
    },
    byMessageNameObjParamsFn() {
      this.loadingThree = true;
      console.time("多个线程计算用时3");
      this.worker2
        .postAll([{ message: "fn1", args: ["代码修仙路漫漫", "加油干"] }]) 
        .then((res) => {
          console.timeEnd("多个线程计算用时3");
          console.log("res", res); 
          this.loadingThree = false;
        })
        .catch((err) => {
          console.timeEnd("多个线程计算用时3");
          console.log("err", err);
          this.loadingThree = false;
        });
    },
    async usePromiseFn() {
      function asyncOne() {
        let async1 = new Promise(async (resolve, reject) => {
          function fib(n) {
            if ((n === 1) | (n === 2)) {
              return 1;
            } else {
              return fib(n - 1) + fib(n - 1);
            }
          }
          resolve(fib(30));
        });
        return async1;
      }

      function asyncTwo() {
        let async2 = new Promise(async (resolve, reject) => {
          function fib(n) {
            if ((n === 1) | (n === 2)) {
              return 1;
            } else {
              return fib(n - 1) + fib(n - 1);
            }
          }
          resolve(fib(30));
        });
        return async2;
      }

      function asyncThree() {
        let async3 = new Promise(async (resolve, reject) => {
          function fib(n) {
            if ((n === 1) | (n === 2)) {
              return 1;
            } else {
              return fib(n - 1) + fib(n - 1);
            }
          }
          resolve(fib(30));
        });
        return async3;
      }

      console.time("使用Promise搭配aysnc和await");

      let paramsArr = [asyncOne(), asyncTwo(), asyncThree()]; 

      let res = await Promise.all(paramsArr);
      console.timeEnd("使用Promise搭配aysnc和await");
      console.log("结果", res);
    },
  },
  created() {
    const actions = [
      {
        message: "fn1", 
        func: (params1, params2) => {
          console.log("params参数-->", params1, params2);
          function fib(n) {
            if ((n == 1) | (n == 2)) {
              return 1;
            } else {
              return fib(n - 1) + fib(n - 2);
            }
          }
          return fib(30);
        },
      },
      {
        message: "fn2",
        func: () => {
          function fib(n) {
            if ((n == 1) | (n == 2)) {
              return 1;
            } else {
              return fib(n - 1) + fib(n - 2);
            }
          }
          return fib(30);
        },
      },
      {
        message: "fn3",
        func: () => {
          function fib(n) {
            if ((n == 1) | (n == 2)) {
              return 1;
            } else {
              return fib(n - 1) + fib(n - 2);
            }
          }
          return fib(30);
        },
      },
    ];
    this.worker2 = this.$worker.create(actions);
  },
  beforeDestroy() {
    this.worker = null;
  },
};
</script>

<style lang='less' scoped>
.bold {
  font-weight: 700;
  font-size: 24px;
}
.info {
  color: #999;
  font-size: 13px;
}
.UI {
  display: flex;
  align-items: center;
}
</style>