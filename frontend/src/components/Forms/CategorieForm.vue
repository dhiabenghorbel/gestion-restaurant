<template>
  <q-card class="mydialog">
    <q-form
      class="q-pa-md bg-white text-black"
      @submit="categorie ? onEdit() : onAdd()"
      ref="myForm"
    >
      <br />
      <label class="title2">
        Formulaire catégorie
      </label>
      <q-separator style="width:550px;" color="black" />

      <div v-if="!this.categorie">
        <label class="title">
          Veuillez remplir le formulaire avec les données du catégorie,<br />
          veuillez vous assurer que les informations sont exactes.
        </label>
      </div>
      <div v-if="this.categorie">
        <label class="title">
          Veuillez modifier les données du catégorie suivant
        </label>
      </div>

      <br />
      <br />
      <q-item>
        <label class="title"> Image URL du catégorie :</label>
      </q-item>
      <q-item>
        <q-input
          dense
          outlined
          type="url"
          style="width:500px"
          color="secondary"
          v-model.trim="categorieCopy.imageUrl"
          label="Image Url"
        >
          <template v-slot:prepend>
            <div class="row items-center all-pointer-events">
              <q-icon
                class="q-mr-xs"
                color="secondary"
                size="20px"
                name="image"
              />
            </div>
          </template>
        </q-input>
      </q-item>
      <q-item>
        <q-item-section>
          <label class="title"> Code :</label>
        </q-item-section>
        <q-item-section>
          <q-input
            outlined
            dense
            style="margin-left:-105px;width:330px"
            color="secondary"
            label="Code"
            v-model.trim="categorieCopy.code"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Champ vide !!']"
          >
            <template v-slot:prepend>
              <div class="row items-center all-pointer-events">
                <q-icon
                  class="q-mr-xs"
                  color="secondary"
                  size="20px"
                  name="code"
                />
              </div>
            </template>
          </q-input>
        </q-item-section>
      </q-item>
      <!-- date -->
      <q-item>
        <q-item-section>
          <label class="title"> Nom :</label>
        </q-item-section>
        <q-item-section>
          <q-input
            outlined
            dense
            style="margin-left:-105px;width:330px"
            color="secondary"
            label="Nom "
            v-model.trim="categorieCopy.nom"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Champ vide !!']"
          >
            <template v-slot:prepend>
              <div class="row items-center all-pointer-events">
                <q-icon
                  class="q-mr-xs"
                  color="secondary"
                  size="20px"
                  name="drive_file_rename_outline"
                />
              </div>
            </template>
          </q-input>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <label class="title">Etat : </label>
        </q-item-section>
        <q-item-section>
          <q-select
            label="Etat"
            outlined
            dense
            style="margin-left:-105px;width:330px"
            color="secondary"
            v-model="categorieCopy.etat"
            :options="etatOptions"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Champ vide !!']"
          >
            <template v-slot:prepend>
              <div class="row items-center all-pointer-events">
                <q-icon
                  class="q-mr-xs"
                  color="secondary"
                  size="20px"
                  name="published_with_changes"
                />
              </div>
            </template>
          </q-select>
        </q-item-section>
      </q-item>

      <br />
      <br />

      <div align="center">
        <q-btn
          v-if="!this.categorie"
          label="Ajouter"
          type="submit"
          icon-right="add_task"
          style="margin-right: 15px"
          glossy
          color="blue-10"
        />

        <q-btn
          v-if="this.categorie"
          type="submit"
          style="margin-right: 15px"
          label="confirmer la modification"
          icon-right="assignment_turned_in"
          glossy
          color="secondary"
        />

        <q-btn
          @click="onCancel()"
          label="Annuler"
          style="margin-right: 15px"
          rounded
          icon-right="cancel_presentation"
          glossy
          v-close-popup
          color="red"
        />
      </div>
    </q-form>
  </q-card>
</template>
<script>
export default {
  props: ["categorie"],
  data() {
    return {
      // genreOptions: ["Homme", "Femme"],
      etatOptions: ["Actif", "Inactif"],

      categorieCopy: {},
      categories: {}
    };
  },

  methods: {
    async getAll() {
      let res = await this.$axios.get("/categorie");
      this.categories = res.data;
    },
    async onAdd() {
      this.$refs.myForm.validate().then(async success => {
        if (success) {
          try {
            let res = await this.$axios.post(`/categorie/`, {
              ...this.categorieCopy
            });
            this.$emit("updated"), await this.getAll(), await this.onCancel();
          } catch {
            return this.$q.notify({
              color: "red",
              message: "code deja utilisé"
            });
          }
        }
      });
    },
    async onEdit() {
      let test = 0;
      this.$refs.myForm.validate().then(async success => {
        if (success) {
          // try {
          this.categories.forEach(el => {
            if (
              el._id != this.categorieCopy._id &&
              el.code === this.categorieCopy.code
            ) {
              test = test + 1;
            }
          });
          //  console.log(test);
          if (test === 0) {
            let res = await this.$axios.patch(
              `/categorie/update/${this.categorie._id}`,
              {
                ...this.categorieCopy
              }
            );
            this.$emit("updated");
            //window.location.reload(true);

            await this.getAll();
            this.onCancel();
          } else {
            return this.$q.notify({
              color: "red",
              message: "Code deja utilisé"
            });
          }
        }
      });
    },
    onCancel() {
      this.$emit("closeDialog");
    }
  },
  mounted() {
    this.categorieCopy = { ...this.categorie };
    this.getAll();
  }
};
</script>
<style scoped>
.mydialog {
  min-width: 600px;
  padding: 20px;
  height: 670px;
  background: white;
}
.title2 {
  color: rgb(0, 0, 0);
  font-weight: bold;
  font-size: 18px;

  font-family: monospace;
}
.title {
  color: rgb(0, 0, 0);
  font-family: monospace;
}
</style>
