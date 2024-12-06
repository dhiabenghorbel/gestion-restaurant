<template>
  <q-card class="mydialog">
    <br />
    <div align="center">
      <label class="title2"> Le feedback du client </label>
    </div>
    <q-separator style="width:550px;" color="black" />
    <br />

    <div align="center">
      <q-input
        filled
        type="textarea"
        outlined
        color="grey-8"
        :value="feedback"
        style="width:500px"
        readonly
      />
      <br/>
      <q-btn
        glossy
        dense
        label="Fermer"
        style="width:100px"
        no-caps
        rounded
        color="red"
        @click="closeDialog()"
      />
    </div>
    
  </q-card>
</template>
<script>
export default {
  props: ["feedback"],
  data() {
    return {
      thumbStyle: {
        right: "4px",
        borderRadius: "5px",
        backgroundColor: "#027be3",
        width: "5px",
        opacity: 0.75
      },

      barStyle: {
        right: "2px",
        borderRadius: "9px",
        backgroundColor: "#027be3",
        width: "9px",
        opacity: 0.2
      },
      
    };
  },
  
  methods: {
    
    closeDialog() {
      this.$emit("closeDialog");
    }
  },
  async mounted() {}
};
</script>

<style scoped>
.mydialog {
  min-width: 600px;
  padding: 20px;
  height: 300px;
  background: white;
}
.mydiv {
  margin-left: 150px;
  width: 300px;
}
.mylist {
  width: 210px;
  margin-left: -10px;
  margin-top: 17px;
}
.myscroll {
  height: 390px;
  width: 800px;
  border: 5px;
  box-shadow: 0 0px 8px rgb(105, 105, 105);
  padding: 0.5rem;
  background-color: #ffffff;
}
.myscroll2 {
  height: 160px;
  width: 120px;
  border: 5px;
  padding: 0.5rem;
  background-color: #ffffff;
}

.closebtn:hover {
  transform: translateY(4px);
}

.title2 {
  font-weight: bold;
  font-size: larger;
  font-family: "Arial Narrow Bold", sans-serif;
}
</style>
