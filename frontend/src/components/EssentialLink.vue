<template>
  <div>
    <q-item
      class="qtem"
      clickable
      v-for="(el, i) in links"
      :key="i"
      @click="$router.push(el.link)"
    >
      <q-item-section v-if="el.icon" avatar>
        <q-icon :name="el.icon" />
      </q-item-section>

      <q-item-section class="ss">
        <q-item-label>{{ el.title }}</q-item-label>
        <q-item-label caption>
          {{ el.caption }}
        </q-item-label>
      </q-item-section>
    </q-item>
  </div>
</template>

<script>
export default {
  name: "EssentialLink",
  props: {
    links: {
      type: Array,
      default: () => []
    }
  }
};
</script>
<style scoped>
.qtem {
  font-size: 12.5px;
  color: rgb(255, 255, 255);
  font-family: monospace;
  background-color: rgba(17, 24, 39, 1);
  line-height: 1.5em;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  border-radius: 0 42px 42px 0;
}
.qtem::before {
  content: "";
  position: absolute;
  width: 2.5em;
  height: 2.5em;
  background: linear-gradient(
    to right,
    #0000ff,
    #09095f,
    #083b6e,
    rgba(17, 24, 39, 1),
    rgba(17, 24, 39, 1)
  );
  left: -2.75em;
  transition: 0.5s ease-out;
}
.qtem:hover::before {
  transform: scale(22);
}

.ss {
  color: rgb(248, 242, 242);
  mix-blend-mode: lighten;
}
</style>
