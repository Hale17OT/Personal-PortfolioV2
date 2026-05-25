<script setup lang="ts">
const props = defineProps<{
  name: string;
  location: string;
}>();

const firstName = props.name.split(' ')[0];
</script>

<template>
  <section class="section" id="about">
    <div class="container">
      <div class="section-head reveal">
        <span class="section-num">— 01 / About</span>
        <h2 class="section-title">A developer who <em>ships</em>, an engineer who <em>sweats the details</em>.</h2>
      </div>
      <div class="about-grid">
        <div class="about-text reveal">
          <p>
            I'm {{ firstName }}, an <span class="h">independent developer &amp; consultant</span> based in {{ location }}. I work <span class="green">both ways</span> — <span class="purple">full-stack development</span> in .NET, TypeScript, and Flutter when an engagement needs custom code, and the <span class="red">Microsoft Power Platform</span> when low-code is the faster, fitter answer.
          </p>
          <p>
            BSc Software Engineering from Addis Ababa Science &amp; Technology University. Engagements include a production internal app for Ethiopian Airlines, ongoing consulting for Eaglepoint AI, enterprise Power Platform delivery with Vision Vertex, and independent client work across both disciplines.
          </p>
          <p>
            I take on contracts — discovery, build, ship — for teams that want real, working software instead of slide decks pretending to be products.
          </p>
        </div>
        <div class="about-side">
          <div class="stat-card reveal" :style="{ '--swatch': 'var(--yellow)' }" data-hot>
            <div class="num">4<span class="num-unit">yr</span></div>
            <div class="label">Building software in industry</div>
          </div>
          <div class="stat-card reveal" :style="{ '--swatch': 'var(--green)' }" data-hot>
            <div class="num">4</div>
            <div class="label">Clients &amp; companies shipped to</div>
          </div>
          <div class="stat-card reveal" :style="{ '--swatch': 'var(--purple)' }" data-hot>
            <div class="num">3</div>
            <div class="label">Languages spoken · EN, AM, AR</div>
          </div>
          <div class="stat-card reveal" :style="{ '--swatch': 'var(--red)' }" data-hot>
            <div class="num">; { }</div>
            <div class="label">Semicolons survived</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.num-unit {
  color: inherit;
  opacity: 0.4;
  font-weight: 700;
}
</style>
