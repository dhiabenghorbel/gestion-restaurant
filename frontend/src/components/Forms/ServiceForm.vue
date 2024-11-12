<template>
  <q-card class="mydialog">
    <q-form
      class="q-pa-md bg-white text-black"
      @submit="service ? onEdit() : onAdd()"
      ref="myForm"
    >
      <br />
      <label class="title2">
        Formulaire service
      </label>
      <q-separator style="width:550px;" color="black" />

      <div v-if="!this.service">
        <label class="title">
          Veuillez remplir le formulaire avec les données du service,<br />
          veuillez vous assurer que les informations sont exactes.
        </label>
      </div>
      <div v-if="this.service">
        <label class="title">
          Veuillez modifier les données du service suivant
        </label>
      </div>

      <br />
      <br />
      <q-item>
        <label class="title"> Image URL du service :</label>
      </q-item>
      <q-item>
        <q-input
          outlined
          type="url"
          style="width:500px"
          color="secondary"
          dense
          v-model.trim="serviceCopy.imageUrl"
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
            style="margin-left:-105px;width:330px"
            color="secondary"
            label="Code"
            dense
            v-model.trim="serviceCopy.code"
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
      <q-item>
        <q-item-section>
          <label class="title"> Nom :</label>
        </q-item-section>
        <q-item-section>
          <q-input
            outlined
            style="margin-left:-105px;width:330px"
            color="secondary"
            label="Nom "
            dense
            v-model.trim="serviceCopy.nom"
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
            v-model="serviceCopy.etat"
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
      <q-item>
        <q-item-section>
          <label class="title"> Prix :</label>
        </q-item-section>
        <q-item-section>
          <q-input
            outlined
            style="margin-left:-105px;width:330px"
            color="secondary"
            label="Prix ( TND )"
            type="number"
            dense
            v-model.trim="serviceCopy.prix"
            lazy-rules
            :rules="[val => (val && val > 0) || 'Champ vide !!']"
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
      <br />
      <br />

      <div align="center">
        <q-btn
          v-if="!this.service"
          label="Ajouter"
          type="submit"
          icon-right="add_task"
          style="margin-right: 15px"
          glossy
          color="blue-10"
        />

        <q-btn
          v-if="this.service"
          style="margin-right: 15px"
          label="confirmer la modification"
          icon-right="assignment_turned_in"
          glossy
          type="submit"
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
  props: ["service"],
  data() {
    return {
      // genreOptions: ["Homme", "Femme"],
      etatOptions: ["Actif", "Inactif"],
      services: {},
      serviceCopy: {},
      servicesCode: []
    };
  },

  methods: {
    async onAdd() {
      this.$refs.myForm.validate().then(async success => {
        if (success) {
          try {
            let res = await this.$axios.post(`/service/`, {
              ...this.serviceCopy
            });
            //  window.location.reload(true);
            return (
              this.$q.notify({
                color: "green",
                message: "Service ajouté avec succées"
              }),
              this.$emit("updated"),
              await this.getAll(),
              await this.onCancel()
            );
          } catch {
            return this.$q.notify({
              color: "red",
              message: "Code deja utilisé"
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
          this.services.forEach(el => {
            if (
              el._id != this.serviceCopy._id &&
              el.code === this.serviceCopy.code
            ) {
              test = test + 1;
            }
          });
          // console.log(test);
          if (test === 0) {
            let res = await this.$axios.put(
              `/service/update/${this.service._id}`,
              {
                ...this.serviceCopy
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
    async getAll() {
      let res = await this.$axios.get("/service");
      this.services = res.data;
    },

    onCancel() {
      this.$emit("closeDialog");
    }
  },
  mounted() {
    this.serviceCopy = { ...this.service };
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
