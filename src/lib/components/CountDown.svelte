<script lang="ts">
    export let score;
    export let loading;
    export let value: string;
    export let onSubmit;
    export let gameOver;
    export let countdown;
    export let onclick;
</script>

<div class="sbody" style="{gameOver==true?"background-color: rgba(255,255,255,0.3);":''}">
    {#if !gameOver}
        <div class="cont">
            <div class=" spinner"></div>
            <h1 class=" number">{countdown}</h1>
        </div>
    {:else}
        <div class="end">
            <h1 id="game-id">Game over</h1>

            {#if score > 0}
                <div class="name">
                    <p id="pname">Enter your name</p>
                    <form on:submit={onSubmit}>
                    <div class="subname">
                            <input
                                id="input"
                                placeholder="name"
                                required
                                bind:value
                            />
                          </div>
                          <button id="submit">submit</button>
                        </form>
                </div>
            {/if}
            
            <div class="retry" >
               <button on:click={onclick}>
                <i class="fa fa-rotate-right"></i>
               </button> 
            </div>

            {#if loading}
                <div class="spin-box">
                    <div class="spinner2"></div>
                </div>
            {/if}
        </div>
    {/if}
</div>

<style>
.retry button{
  height: 40px;
  width: 80px;
  font-size: 70px;
  color: rgb(0, 70, 128);
  margin-top: -50px;
  background-color: rgba(0, 0, 0, 0);
  border: solid rgba(0, 0, 0, 0);
}
.sbody {
      position: absolute;
      z-index: 5;
      color: white;
      height: 100vh;
      width: 100%;
      font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

      background-image: linear-gradient(
          black,
          transparent 10%,
          transparent calc(50% - 1px),
          #aaa calc(50% - 1px),
          #aaa calc(50% + 1px),
          transparent calc(50% + 1px),
          transparent 90%,
          black
        ),
        linear-gradient(
          90deg,
          black,
          transparent 10%,
          transparent calc(50% - 1px),
          #aaa calc(50% - 1px),
          #aaa calc(50% + 1px),
          transparent calc(50% + 1px),
          transparent 90%,
          black
        );
    }
    .end {
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      height: 100%;
      width: 100%;
      font-size: 50px;
    }
    .cont {
      width: 250px;
      height: 250px;
      position: fixed;
      text-align: center;
      font-weight: bold;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border: 2px solid #aaa;
      border-radius: 50%;
      overflow: hidden;
      color: rgb(255, 255, 255);

      &::after {
        content: "";
        width: 200px;
        height: 200px;
        position: absolute;
        top: 23px;
        left: 23px;
        border: 1px solid #aaa;
        border-radius: 50%;
         /* background: #777; 
        background-image: linear-gradient(
            transparent calc(50% - 1px),
            #aaa calc(50% - 1px),
            #aaa calc(50% + 1px),
            transparent calc(50% + 1px)
          ),
          linear-gradient(
            90deg,
            transparent calc(50% - 1px),
            #aaa calc(50% - 1px),
            #aaa calc(50% + 1px),
            transparent calc(50% + 1px)
          ); */
      }
    }

    .number {
      font-size: 100px;
      position: absolute;
      top: 50%;
      left: 50%;
      z-index: 2;
      transform: translate(-50%, -50%);
      width: 250px;
      height: 250px;
      margin-top: 40px;

      &::after {
        content: "";
        width: 250px;
        height: 250px;
        position: absolute;
        top: 0;
        left: 0;
        font-size: 150px;
        line-height: 250px;
        animation: count 10s infinite steps(10, start);
         @keyframes count {
          0%,
          100% {
            content: "0";
          }
          10% {
            content: "9";
          }
          20% {
            content: "8";
          }
          30% {
            content: "7";
          }
          40% {
            content: "6";
          }
          50% {
            content: "5";
          }
          60% {
            content: "4";
          }
          70% {
            content: "3";
          }
          80% {
            content: "2";
          }
          90% {
            content: "1";
          }
        }
      }
    }

    .spinner {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 125px;
      height: 100px;
      transform-origin: 0 0;
      background-image: linear-gradient(black, transparent);
      animation: spin 2s linear infinite;
    }
    @keyframes spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
    
    .spin-box {
      height: 100%;
      width: 100%;
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 2;
      background-color: rgba(0, 0, 0, 0.6);
    }
    .spinner2 {
      position: absolute;
      border: 16px solid #f3f3f3;
      border-top: 16px solid #3498db;
      border-radius: 50%;
      width: 120px;
      height: 120px;
      animation: spin 2s linear infinite;
    }
    
    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
    #game-id{
        font-size:clamp(65px,8vw,100px);
      }
      .name {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        height: 220px;
        width: 350px;
        background-color: rgb(33, 33, 33);
        margin-bottom: 150px;
        margin-bottom: 30px;
        border-radius: 25px;
        padding: 5px;
      }
    .subname {
      display: flex;
        justify-content: center;
        /* flex-direction: column; */
        align-items: center;
        height: 20px;
        width: 270px;
        margin-top: 25px;
        /* margin-left: 50px; */
    }
    #pname {
      height: 70px;
        font-size: 30px;
    }
    #input {
        width: 80%;
        height: 30px;
        padding: 5px;
        padding-left: 10px;
        font-size: 20px;
        color: white;
        border: solid rgb(135, 135, 135) 1px;
        border-radius: 10px;
        background-color: rgb(67, 67, 67);
    }
    #submit {
      height: 30px;
      width: 80px;
      color: white;
        background-color: rgb(68, 68, 68);
        /* border: solid rgb(255, 255, 255); */
        margin-left: 90px;
        font-size: 18px;
        border: solid rgb(135, 135, 135) 1px;
        border-radius: 5px;
    }
</style>
