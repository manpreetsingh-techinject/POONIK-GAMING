<script lang="ts">
        import { initializeApp } from "firebase/app";
  import {
    getFirestore,
    doc,
    setDoc,
    collection,
    addDoc,
    getDocs,
    orderBy,
    limit,
    query,
    where, 
    getDoc,
    updateDoc
  } from "firebase/firestore";
  import CountDown from '$lib/components/CountDown.svelte';

  const firebaseConfig = {
    apiKey: "AIzaSyALsab2faFMzuyZCDyCA7cEw3b-bZ3zCrE",
    authDomain: "database-5eb2a.firebaseapp.com",
    projectId: "database-5eb2a",
    storageBucket: "database-5eb2a.appspot.com",
    messagingSenderId: "560373521724",
    appId: "1:560373521724:web:6b46e9aef1503c7dde5239",
    measurementId: "G-NF38Y18QP4",
  };

  const app1 = initializeApp(firebaseConfig);
  const db = getFirestore(app1);

  let gameContainer: HTMLElement;
  let egg: HTMLElement;
  let po: HTMLElement;
  let snake = [{ x: 0, y: 0 }];
  let eggX =  Math.floor(Math.random() * ((300 - 10) / 20)) * 20;
  let eggY =  Math.floor(Math.random() * ((500 - 10) / 20)) * 20;
  let direction = "right";
  let score = 0;
  let display = false;
  let gameOver = false;
  let namedata: string;
  let snakeLength:number;

  function updateEggPosition() {
    if (!gameContainer) return;
    eggX =
      Math.floor(Math.random() * ((gameContainer.clientWidth - 10) / 20)) * 20;

    eggY =
      Math.floor(Math.random() * ((gameContainer.clientHeight - 10) / 20)) * 20;

    egg.style.top = eggY + "px";
    egg.style.left = eggX + "px";
  }

  function moveSnake() {
    
    if (!gameContainer) return;
    let newHead = { x: snake[0].x, y: snake[0].y };
    
    if (direction == "right") {
      newHead.x += 20;
    } else if (direction == "left") {
      newHead.x -= 20;
    } else if (direction == "up") {
      newHead.y -= 20;
    } else if (direction == "down") {
      newHead.y += 20;
    }

    //check if the snake eats the egg
    if (newHead.x == eggX && newHead.y == eggY) {
      updateEggPosition();
      snake.push({ x: 0, y: 0 });
      let snakeSegment = document.createElement("div");
      snakeSegment.className = "snake1";
      snakeSegment.style.backgroundColor = "rgb(17, 253, 63)";
      snakeSegment.style.border = "0.3mm solid black";
      gameContainer.insertAdjacentElement("beforeend", snakeSegment);
      score += 1;
    }

    for (let i = snake.length - 1; i > 0; i--) {
      snake[i] = { ...snake[i - 1] };
    }

    //set the newHead to old positions
    snake[0] = { ...newHead };

    //check if the snake hits the border
    let snakeSegments = document.querySelectorAll(".snake1");
    if (
      newHead.x < 0 ||
      newHead.y < 0 ||
      newHead.x >= gameContainer.clientWidth - 10 ||
      newHead.y >= gameContainer.clientHeight - 10
    ) {      
      endGame();
      snakeLength = snakeSegments.length;
      return;
    }
    
    //check if the snake bites itself
    for (let i = 1; i < snake.length; i++) {
      if (newHead.x == snake[i].x && newHead.y == snake[i].y) {
        endGame();
        snakeLength = snakeSegments.length;
        console.log(snakeLength);
        return;
      }
    }
      document.querySelector('.snake').style.left = snake[0].x + "px";
      document.querySelector('.snake').style.top = snake[0].y + "px";
    //Update the positions of the snake
    
    snakeSegments.forEach((segment, index) => {
      segment.style.left = snake[index+1].x + "px";
      segment.style.top = snake[index+1].y + "px";

    });

  }

  //Update Snake Directions
  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key == "ArrowRight" && direction != "left") {
      direction = "right";
    } else if (event.key == "ArrowLeft" && direction != "right") {
      direction = "left";
    } else if (event.key == "ArrowUp" && direction != "down") {
      direction = "up";
    } else if (event.key == "ArrowDown" && direction != "up") {
      direction = "down";
    }
  };

  updateEggPosition();
  let name:()=>Promise<any>;
  let countdown = 1;
  let gameInterval: NodeJS.Timeout;
  
  let counter = setInterval(() => {
    countdown += 1;
  }, 1000);

  let array: number[] = [];
  setTimeout(() => {
    clearInterval(counter);
    gameInterval = setInterval(moveSnake, 200);
    display = true;
    
    name = async function() {
      const docRef = query(
        collection(db, "scores"),
        orderBy("points", "desc"),
        limit(10),
       );
      
       const points = await getDocs(docRef);
       
       points.forEach((doc) => {
         if (!gameContainer) return;
         array.push(doc.data().points);
         array = array;
        let newpoint = document.createElement("div");
        newpoint.textContent = doc.data().name + " " + doc.data().points;
        po.appendChild(newpoint);
      });
       
      for (let i = array.length - 1; i < 9; i++) {
        if (!gameContainer) return;
        array.push(0);
        let newpoint = document.createElement("div");
        newpoint.textContent = "0";
        po.appendChild(newpoint);
      }
    }
    name();
    
  }, 3000);

  let loading: boolean;
  async function endGame() {
    clearInterval(gameInterval);
    display = false;
    gameOver = true;
  }

  async function enterData() {
    if (score > 0 && score > array[array.length - 1]) {
      loading = true;
        await addDoc(collection(db, "scores"), { name: namedata, points: score });
      loading = false;
      score = 0;
    }
  }
</script>

<svelte:head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Snake Game</title>
  <style>
    .body {
      width: 100%;
      height: 100vh;
      margin: 0;
      padding: 0;
      background: black;
    }
    video {
      position: absolute;
      height: 100%;
      object-fit: cover;
      width: 100%;
    }
 
    .game-container {
      position: relative;
      width: 60%;
      height: calc(100vh - 20px);
      margin: auto;
      border: 5px dashed rgba(255, 255, 255, 0.5);
      box-sizing: border-box;
    }
    .snake, .snake1 {
      position: absolute;
      background-color: rgba(0, 0, 0, 0);
      background: rgb(17, 253, 63);
      width: 20px;
      height: 20px;
      border: 0.3mm solid black;
    }
    .snake:nth-child(1)::before,
    .snake:nth-child(1)::after {
      position: absolute;
      content: "";
      width: 5px;
      height: 5px;
      background: black;
      top: 3px;
      left: 3px;
      border-radius: 50%;
    }
    .snake:nth-child(1)::after {
      left: auto;
      right: 3px;
    }
    .egg {
      position: absolute;
      background: white;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      animation: blink 0.5s infinite;
    }
    @keyframes blink {
      from {
        transform: scale(1);
      }
      to {
        transform: scale(0.9);
      }
    }
    .score {
      /* display: none; */
      position: absolute;
      top: 10px;
      left: 30px;
      font-size: 18px;
      font-family: "segoe UI";
      color: white;
      display: flex;
      align-items: center;
      flex-direction: column;
    }
    .score span {
      display: block;
      font-size: 24px;
    }
   
  </style>
</svelte:head>
<svelte:window on:keydown={handleKeyPress} />

<video autoplay loop muted >
  <source src="video.mp4" type="video/mp4" />
</video>

{#if !display}
     <CountDown {gameOver} {countdown} {score} {loading} bind:value={namedata} onSubmit={enterData} onclick={()=>{
      gameInterval = setInterval(moveSnake, 200);
      direction = "right";
      score=0;
      snake = [{ x: 0, y: 0 }];
      display=!display;
      while(snakeLength!=0){
      document.querySelector(".snake1").remove();  
      snakeLength=snakeLength-1; 
      }
      array=[];
      document.querySelector('.points').innerHTML='';
       name();
       }}/>
{/if}

  <body>
    <div class="center">
      <div class=" game-container" bind:this={gameContainer} >
        <div class=" snake" >
        </div>
        <div class="egg" style="top:{eggY}px; left:{eggX}px" bind:this={egg} ></div>
      </div>
       <div class=" score">SCORE
        <span>{score}</span>
      </div>
      <div 
        class="points"
        bind:this={po}
        style=" position: absolute; color:white; left:40px; top:100px; font-size:25px; font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;"
      ></div>
    </div>
  </body>
