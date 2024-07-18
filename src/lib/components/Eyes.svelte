<!-- <script lang="ts">



	let mouseX: number = 0;
	let mouseY: number = 0;
	let leftEye: HTMLDivElement;
	let rightEye: HTMLDivElement;
	let leftPupil: HTMLDivElement;
	let rightPupil: HTMLDivElement;
  
	function handleMouseMove(event: MouseEvent) {
	  mouseX = event.clientX;
	  mouseY = event.clientY;
	}
  
	function calculatePupilPosition(eye: HTMLDivElement, pupil: HTMLDivElement) {
	  const eyeRect = eye.getBoundingClientRect();
	  const pupilRect = pupil.getBoundingClientRect();
	  const eyeCenterX = eyeRect.left + eyeRect.width / 2;
	  const eyeCenterY = eyeRect.top + eyeRect.height / 2;
  
	  const deltaX = mouseX - eyeCenterX;
	  const deltaY = mouseY - eyeCenterY;
	  const angle = Math.atan2(deltaY, deltaX);
  
	  const distance = Math.min(eyeRect.width / 4, eyeRect.height / 4);
	  const pupilX = eyeCenterX + distance * Math.cos(angle) - pupilRect.width / 2;
	  const pupilY = eyeCenterY + distance * Math.sin(angle) - pupilRect.height / 2;
  
	  return `top: ${pupilY}px; left: ${pupilX}px;`;
	}
  </script>
  
  
  <div class="eyes" on:mousemove={handleMouseMove}>
	<div class="eye" bind:this={leftEye}>
	  <div class="pupil" style={calculatePupilPosition(leftEye, leftPupil)} bind:this={leftPupil}></div>
	</div>
	<div class="eye" bind:this={rightEye}>
	  <div class="pupil" style={calculatePupilPosition(rightEye, rightPupil)} bind:this={rightPupil}></div>
	</div>
  </div>
  
  <style>
	.eyes {
	  display: flex;
	  justify-content: space-around;
	  width: 200px;
	  margin: 50px auto;
	}
	.eye {
	  position: relative;
	  width: 50px;
	  height: 50px;
	  background: white;
	  border-radius: 50%;
	  border: 2px solid black;
	}
	.pupil {
	  position: absolute;
	  width: 20px;
	  height: 20px;
	  background: black;
	  border-radius: 50%;
	}
  </style>
  
   -->

<script>
	// document.querySelector(".b1").addEventListener("mousemove", eyeball);

	function eyeball(event) {
		const eye = document.querySelectorAll(".eyes");
		eye.forEach(function (eye) {
			let x = eye.getBoundingClientRect().left + eye.clientWidth / 2;
			let y = eye.getBoundingClientRect().top + eye.clientHeight / 2;

			let radian = Math.atan2(event.pageX - x, event.pageY - y);
			let rotate = radian * (180 / Math.PI) * -1 + 270;
			eye.style.transform = "rotate(" + rotate + "deg)";
		});
	}
</script>

<div class="main" on:mousemove={eyeball}>
	<div class="container">
		<div class="eyes"></div>
		<div class="eyes"></div>
	</div>
</div><br>

<style>

	.main {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 100vh;
		font-family: "Bebas Neue", cursive;
		background-color: aquamarine;
	}

	.container {
		display: flex;
	}

	.container .eyes {
		position: relative;
		width: 100px;
		height: 100px;
		display: block;
		background-color: #fff;
		margin: 0 20px;
		border-radius: 50%;
		box-shadow:
			0 5px 45px rgba(0, 0, 0, 0.2),
			inset 0 0 15px #f5af19,
			inset 0 0 25px #f5af19;
	}
	.container .eyes::before {
		content: "";
		top: 50%;
		left: 35px;
		transform: translate(-50%, -50%);
		width: 50px;
		height: 50px;
		border-radius: 50%;
		background: #000;
		position: absolute;
		border: 10px solid skyblue;
		box-sizing: border-box;
	}
</style>
