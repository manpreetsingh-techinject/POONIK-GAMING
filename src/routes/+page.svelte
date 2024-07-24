<script>
   import "../app.css";
   import ComingSoon from '$lib/components/ComingSoon.svelte';
   import Eyes from '$lib/components/Eyes.svelte';
    import { goto } from "$app/navigation";
//    let font='mokoto'
   let fontFamilys = ["mokoto", "glovae", "arcade", "brandy","glitch","jaturat", "ffnl"];

   function navigatek(){
    goto('/game');
   }
</script>

<div class="">
    
    {#each fontFamilys as font}
    <div class="absolute h-[100%] w-[100%] flex justify-center items-center">
       <div class="absolute text-white-400 bg-orange-500 z-20 md:mt-[40%] sm:mt-[50%] sm54:mt-[60%] mt-[70%] h-[3vw] sm:w-[10%] w-[13%] flex justify-center items-center ">
          <button class="text-[clamp(9px,1.5vw,18px)]" on:click={navigatek}>Snake Game</button>
         </div>
      </div>
      <ComingSoon {font} />
    {/each}
   
</div>