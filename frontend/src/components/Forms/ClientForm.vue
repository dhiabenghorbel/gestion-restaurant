<template>
  <q-card class="mydialog">
    <q-form
      class="q-pa-md bg-white text-black"
      @submit="client ? onEdit() : onAdd()"
      ref="myForm"
    >
      <br />
      <label class="title2">
        Formulaire client
      </label>
      <q-separator style="width:550px;" color="black" />
      <div v-if="!this.client">
        <label class="title">
          Veuillez remplir le formulaire avec les coordonnées du client,<br />
          veuillez vous assurer que les informations sont exactes.
        </label>
      </div>
      <div v-if="this.client">
        <label class="title">
          Veuillez modifier les données du client suivant
        </label>
      </div>

      <br />
      <br />
      <q-item>
        <q-item-section>
          <label class="title"> Nom et Prénom :</label>
        </q-item-section>
        <q-item-section>
          <q-input
            outlined
            dense
            style="width:160px"
            color="secondary"
            v-model.trim="clientCopy.nom"
            label="Nom"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Champ vide !!']"
          >
            <template v-slot:prepend>
              <div class="row items-center all-pointer-events">
                <q-icon
                  class="q-mr-xs"
                  color="secondary"
                  size="20px"
                  name="person"
                />
              </div>
            </template>
          </q-input>
        </q-item-section>
        <q-item-section>
          <q-input
            outlined
            color="secondary"
            dense
            style="width:160px;margin-left:-40px"
            v-model.trim="clientCopy.prenom"
            label="Prénom"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Champ vide !!']"
          >
            <template v-slot:prepend>
              <div class="row items-center all-pointer-events">
                <q-icon
                  class="q-mr-xs"
                  color="secondary"
                  size="20px"
                  name="person"
                />
              </div>
            </template>
          </q-input>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <label class="title"> Date de naissance :</label>
        </q-item-section>
        <q-item-section>
          <!-- <q-date v-model="clientCopy.date_naissance" :options="optionsFn" /> -->
          <template>
            <div class="q-pa-md" style="max-width: 360px;margin-left:-120px">
              <q-input
                dense
                label="AAAA-MM-JJ"
                outlined
                color="secondary"
                v-model="clientCopy.date_naissance"
              >
                <template v-slot:prepend>
                  <q-icon color="secondary" name="event" class="cursor-pointer">
                    <q-popup-proxy
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date
                        v-model="clientCopy.date_naissance"
                        bordered
                        color="deep-orange"
                        mask="YYYY-MM-DD"
                        :options="dateOption"
                      >
                        <div class="row items-center justify-end">
                          <q-btn
                            v-close-popup
                            label="Close"
                            color="deep-orange"
                            flat
                          />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
          </template>
        </q-item-section>
      </q-item>
      <!-- <q-item>
        <q-item-section>
          <label class="title"> Date de naissance :</label>
        </q-item-section>
        <q-item-section>
          <q-input
            outlined
            dense
            style="margin-left:-105px;width:330px"
            color="secondary"
            v-model="clientCopy.date_naissance"
            type="date"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Champ vide !!']"
          >
            <template v-slot:prepend>
              <div class="row items-center all-pointer-events">
                <q-icon
                  class="q-mr-xs"
                  color="secondary"
                  size="20px"
                  name="today"
                />
              </div>
            </template>
          </q-input>
        </q-item-section>
      </q-item> -->
      <!-- date -->
      <q-item>
        <q-item-section>
          <label class="title"> Sexe :</label>
        </q-item-section>
        <q-item-section>
          <q-select
            style="margin-left:-105px;width:330px"
            label="Genre"
            dense
            outlined
            color="secondary"
            v-model="clientCopy.genre"
            :options="genreOptions"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Champ vide !!']"
          >
            <template v-slot:prepend>
              <div class="row items-center all-pointer-events">
                <q-icon
                  class="q-mr-xs"
                  color="secondary"
                  size="20px"
                  name="wc"
                />
              </div>
            </template>
          </q-select>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <label class="title"> Email :</label>
        </q-item-section>
        <q-item-section>
          <br />
          <q-input
            outlined
            style="margin-left:-105px;width:330px"
            color="secondary"
            dense
            type="email"
            lazy-rules
            :rules="[val => !!val || 'Champ vide !!']"
            v-model.trim="clientCopy.email"
            label=""
          >
            <template v-slot:label>
              <div class="row items-center all-pointer-events">
                <q-icon
                  class="q-mr-xs"
                  color="secondary"
                  size="20px"
                  name="mail"
                />
                Email
              </div>
            </template>
          </q-input>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <label class="title"> Adresse :</label>
        </q-item-section>
        <q-item-section>
          <q-input
            outlined
            color="secondary"
            style="width:160px"
            dense
            v-model.trim="clientCopy.rue"
            label="Rue"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Champ vide !!']"
          >
            <template v-slot:prepend>
              <div class="row items-center all-pointer-events">
                <q-icon
                  class="q-mr-xs"
                  color="secondary"
                  size="20px"
                  name="home"
                />
              </div>
            </template>
          </q-input>
        </q-item-section>
        <q-item-section>
          <q-input
            outlined
            color="secondary"
            style="width:160px;margin-left:-40px"
            v-model.trim="clientCopy.code_postal"
            label="Code postal"
            dense
            mask="####"
            lazy-rules
            :rules="[val => (val && val.length === 4) || 'Champ incorrect !!']"
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
      <q-input
        outlined
        style="margin-left:225px;width:330px"
        color="secondary"
        v-model.trim="clientCopy.ville"
        label="Ville"
        dense
        lazy-rules
        :rules="[val => (val && val.length > 0) || 'Champ vide !!']"
      >
        <template v-slot:prepend>
          <div class="row items-center all-pointer-events">
            <q-icon class="q-mr-xs" color="secondary" size="20px" name="home" />
          </div>
        </template>
      </q-input>
      <q-item>
        <q-item-section>
          <label class="title"> Numéro téléphone :</label>
        </q-item-section>
        <q-item-section>
          <q-input
            outlined
            color="secondary"
            mask="## ### ###"
            unmasked-value
            dense
            style="margin-left:-105px;width:330px"
            v-model="clientCopy.telephone"
            label=""
            lazy-rules
            :rules="[val => (val && val.length === 8) || 'Champ incorrect !!']"
          >
            <template v-slot:label>
              <div class="row items-center all-pointer-events">
                <q-icon
                  class="q-mr-xs"
                  color="secondary"
                  size="20px"
                  name="phone"
                />
                ## ### ###
              </div>
            </template>
          </q-input>
        </q-item-section>
      </q-item>
      <!-- <q-item>
        <q-item-section>
          <label class="title">Etat client : </label>
        </q-item-section>
        <q-item-section>
          <q-select
            label="Etat"
            outlined
            style="margin-left:-105px;width:330px"
            color="secondary"
            v-model="clientCopy.etat"
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
      </q-item> -->
      <br />
      <br />
      <div align="center">
        <q-btn
          v-if="!this.client"
          label="Ajouter"
          type="submit"
          icon-right="person_add"
          style="margin-right: 15px"
          glossy
          color="blue-10"
        />

        <q-btn
          v-if="this.client"
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
  props: ["client"],
  data() {
    return {
      genreOptions: ["Homme", "Femme"],
      etatOptions: ["Actif", "Inactif"],
      clientCopy: {},
      clients: [],
      selectedCopy: {}
    };
  },

  methods: {
    dateOption(date) {
      return date >= "1920/01/01" && date <= "2010/01/01";
    },
    async onAdd() {
      this.$refs.myForm.validate().then(async success => {
        if (success) {
          try {
            this.clientCopy.email = this.clientCopy.email.toLowerCase();

            let res = await this.$axios.post(`/utilisateur/`, {
              ...this.clientCopy
            });
            //  window.location.reload(true);
            return (
              this.$q.notify({
                color: "green",
                message: "Client ajouté avec succées"
              }),
              this.$emit("updated"),
              await this.getAll(),
              await this.onCancel()
            );
          } catch {
            return this.$q.notify({
              color: "red",
              message: "Email deja utilisé"
            });
          }
        }
      });
    },
    async getAll() {
      let res = await this.$axios.get("/utilisateur");
      this.clients = res.data;
    },
    async onEdit() {
      this.clientCopy.email = this.clientCopy.email.toLowerCase();

      let test = 0;
      this.$refs.myForm.validate().then(async success => {
        if (success) {
          // try {
          this.clients.forEach(el => {
            if (
              el._id != this.clientCopy._id &&
              el.email === this.clientCopy.email
            ) {
              test = test + 1;
            }
          });
          if (test === 0) {
            let res = await this.$axios.patch(
              `/utilisateur/update/${this.client._id}`,
              {
                ...this.clientCopy
              }
            );
            return (
              this.$q.notify({
                color: "green",
                message: "Modification avec succées"
              }),
              this.$emit("updated"),
              //window.location.reload(true);

              await this.getAll(),
              this.onCancel()
            );
          } else {
            return this.$q.notify({
              color: "red",
              message: "Email deja utilisé"
            });
          }
        }
      });
    },
    onCancel() {
      this.$emit("closeDialog");
    }
  },
  async mounted() {
    this.clientCopy = { ...this.client };
    await this.getAll();
  }
};
</script>
<style scoped>
.mydialog {
  min-width: 740px;
  padding: 20px;
  height: 780px;
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
