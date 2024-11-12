<template>
  <q-card class="mydialog">
    <q-form
      class="q-pa-md bg-white text-black"
      @submit="livreur ? onEdit() : creerLivreur()"
      ref="myForm"
    >
      <br />
      <label class="title2">
        Formulaire livreur
      </label>
      <q-separator style="width:550px;" color="black" />

      <div v-if="!this.livreur">
        <label class="title">
          Veuillez remplir le formulaire avec les coordonnées du livreur,<br />
          veuillez vous assurer que les informations sont exactes.
        </label>
      </div>
      <div v-if="this.livreur">
        <label class="title">
          Veuillez modifier les données du livreur suivant
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
            v-model.trim="livreurCopy.nom"
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
            dense
            color="secondary"
            style="width:160px;margin-left:-40px"
            v-model.trim="livreurCopy.prenom"
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
            v-model.trim="livreurCopy.date_naissance"
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
                v-model="livreurCopy.date_naissance"
              >
                <template v-slot:prepend>
                  <q-icon color="secondary" name="event" class="cursor-pointer">
                    <q-popup-proxy
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date
                        v-model="livreurCopy.date_naissance"
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
            v-model.trim="livreurCopy.genre"
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
            dense
            style="margin-left:-105px;width:330px"
            color="secondary"
            type="email"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Champ vide !!']"
            v-model.trim="livreurCopy.email"
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
      <div v-if="!livreur">
        <q-item>
          <q-item-section>
            <label class="title"> Mot de passe :</label>
          </q-item-section>
          <q-item-section>
            <q-input
              outlined
              dense
              style="margin-left:-105px;width:330px"
              color="secondary"
              :type="isPwd ? 'password' : 'text'"
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'Champ vide !!']"
              v-model.trim="livreurCopy.password"
              label="****************************"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
              <template v-slot:prepend>
                <div class="row items-center all-pointer-events">
                  <q-icon
                    class="q-mr-xs"
                    color="secondary"
                    size="20px"
                    name="edit"
                  />
                </div>
              </template>
            </q-input>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <label class="title"> Confirmer mot de passe :</label>
          </q-item-section>
          <q-item-section>
            <br />
            <q-input
              outlined
              dense
              style="margin-left:-105px;width:330px"
              color="secondary"
              :type="isPwd ? 'password' : 'text'"
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'Champ vide !!']"
              v-model.trim="confirmPassword"
              label="****************************"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
              <template v-slot:prepend>
                <div class="row items-center all-pointer-events">
                  <q-icon
                    class="q-mr-xs"
                    color="secondary"
                    size="20px"
                    name="edit"
                  />
                </div>
              </template>
            </q-input>
          </q-item-section>
        </q-item>
      </div>
      <q-item>
        <q-item-section>
          <label class="title"> Adresse :</label>
        </q-item-section>
        <q-item-section>
          <q-input
            outlined
            dense
            color="secondary"
            style="width:160px"
            v-model.trim="livreurCopy.rue"
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
            dense
            color="secondary"
            style="width:160px;margin-left:-40px"
            v-model.trim="livreurCopy.code_postal"
            label="Code postal"
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
        dense
        style="margin-left:225px;width:330px"
        color="secondary"
        v-model.trim="livreurCopy.ville"
        label="Ville"
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
            dense
            color="secondary"
            mask="## ### ###"
            unmasked-value
            style="margin-left:-105px;width:330px"
            v-model.trim="livreurCopy.telephone"
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
          <label class="title">Etat livreur : </label>
        </q-item-section>
        <q-item-section>
          <q-select
            label="Etat"
            dense
            outlined
            style="margin-left:-105px;width:330px"
            color="secondary"
            v-model="livreurCopy.etat"
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
          v-if="!this.livreur"
          label="Ajouter"
          type="submit"
          icon-right="person_add"
          style="margin-right: 15px"
          glossy
          color="blue-10"
        />

        <q-btn
          v-if="this.livreur"
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
  props: ["livreur"],
  data() {
    return {
      genreOptions: ["Homme", "Femme"],
      etatOptions: ["Actif", "Inactif"],
      livreurCopy: {},
      isPwd: true,
      confirmPassword: null,
      selectedCopy: {},
      livreurs: []
    };
  },

  methods: {
    async getAll() {
      let res = await this.$axios.get("/livreur");
      this.livreurs = res.data;
    },
    dateOption(date) {
      return date >= "1910/01/01" && date <= "2010/01/01";
    },
    async creerLivreur() {
      this.livreurCopy.email = this.livreurCopy.email.toLowerCase();

      this.$refs.myForm.validate().then(async success => {
        if (success) {
          if (this.livreurCopy.password != this.confirmPassword) {
            return this.$q.notify({
              color: "red",
              message: "Confirmez le mot de passe"
            });
          } else if (this.livreurCopy.password === this.confirmPassword) {
            try {
              let response = await this.$axios.post(
                "/livreur/register",
                this.livreurCopy
              );
              console.log(response);

              return (
                this.$q.notify({
                  color: "green",
                  message: "succes, livreur créer"
                }),
                // this.$emit("updated"),
                // await this.getAll(),
                // await this.onCancel()
                window.location.reload(true)
              );
            } catch {
              return this.$q.notify({
                color: "red",
                message: "Email deja utilisé"
              });
            }
          }
        }
      });
    },
    async onEdit() {
      this.livreurCopy.email = this.livreurCopy.email.toLowerCase();

      let test = 0;
      this.$refs.myForm.validate().then(async success => {
        if (success) {
          // try {
          this.livreurs.forEach(el => {
            if (
              el._id != this.livreurCopy._id &&
              el.email === this.livreurCopy.email
            ) {
              test = test + 1;
            }
          });
          //  console.log(test);
          if (test === 0) {
            let res = await this.$axios.patch(
              `/livreur/update/${this.livreur._id}`,
              {
                ...this.livreurCopy
              }
            );

            // return (
            //   this.$q.notify({
            //     color: "green",
            //     message: "Modification avec succées"
            //   }),
            // this.$emit("updated"),
            window.location.reload(true);

            //  await this.getAll(),
            //  this.onCancel()
            // );
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
    this.livreurCopy = { ...this.livreur };
    await this.getAll();
  }
};
</script>
<style scoped>
.mydialog {
  min-width: 740px;
  padding: 20px;
  height: 910px;
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
