<script>
   import "../app.css";
   import ComingSoon from '$lib/components/ComingSoon.svelte';
   import Eyes from '$lib/components/Eyes.svelte';
//    let font='mokoto'
   let fontFamilys = ["mokoto", "glovae", "arcade", "brandy","glitch","jaturat", "ffnl"];
</script>

<div class="">
    
    {#each fontFamilys as font}
    <ComingSoon {font} />
    {/each}
   
</div>