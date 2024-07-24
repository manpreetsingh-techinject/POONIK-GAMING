<script lang="ts">
    import VanillaTilt from 'vanilla-tilt';
    import { beforeUpdate, onMount } from 'svelte';
    
    export let font;
    let c=1;
    beforeUpdate(() =>{
        while(c<4){
          c+=1;
         setTimeout(()=>{
        }, 5000)
        }
     })
 </script>
 <div class="flex justify-center items-center h-full w-full absolute">
     <div class=" w-full h-full flex justify-center items-center">
         <video autoplay loop muted class="h-full w-full object-cover right-0 top-0 absolute">
             <source src="video.mp4" type="video/mp4" />
            </video>
            <div class="flex flex-row justify-center items-center mt-[-10%]">
                <div data-tilt class=" w-[clamp(250px,20vw,400px)] p-[0px] z-10 absolute">
                    <img src="POONIK f-02.png" alt="logo">
                  </div>

                <h1 style=" color: rgba(255,255,255,0.1);  width: 100%; text-align: center; font-family:{font};" class=" text-[clamp(50px,7vw,120px)] absolute sm95:mt-[30%] md:mt-[38%] sm:mt-[42%] sm54:mt-[50%] sm48:mt-[55%] mt-[62%]">COMING SOON</h1>

                <h1 style="font-family:{font};  color: #ffff; width: 100%; text-align: center; text-shadow: 3px 3px 5px #000;" class=" text-[clamp(50px,7vw,120px)] absolute sm95:mt-[30%] mix-blend-soft-light md:mt-[38%] sm:mt-[42%] sm54:mt-[50%] sm48:mt-[55%] mt-[62%]">COMING SOON</h1>
            </div>
        </div>
        
        <!-- <div class="flex mt-[7%] items-center flex-col z-10"> -->
         <!-- <div class="w-[100%] flex justify-between text-[clamp(8px,2vw,18px)] mt-[20px]">
             <button class="w-[16%] h-[3vw] bg-[white]">Previous</button>
             
             <button class="w-[16%] h-[3vw] bg-[white]">Next</button>
         </div> -->
     <!-- </div> -->
 </div>
 <div class="h-[750px]"></div>

 <style>
    @font-face{
        font-family: 'mokoto';
        src: url('font/Mokoto Demo.ttf')
    }
    @font-face{
        font-family: 'glovae';
        src: url('font/GlovaeModernDemoVersionRegular-8O4RM.otf')
    }
    @font-face{
        font-family: 'arcade';
        src: url('font/ARCADE.TTF')
    }
    @font-face{
        font-family: 'brandy';
        src: url('font/Brandy.ttf')
    }
    @font-face{
        font-family: 'glitch';
        src: url('font/GlitchDemoRegular-2Oave.ttf')
    }
    @font-face{
        font-family: 'jaturat';
        src: url('font/JaturatDemoExtraboldItalic-p7EMK.otf')
    }
    @font-face{
        font-family: 'ffnl';
        src: url('font/FontsFree-Net-Lastica.ttf')
    }
 </style>