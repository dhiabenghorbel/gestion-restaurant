<template>
  <q-card class="mydialog">
    <q-form class="q-pa-md bg-white text-black" ref="myForm">
      <br />
      <label class="title2">
        Modifier le profil
      </label>
      <q-separator style="width:550px;" color="black" />

      <br />
      <br />

      <q-item>
        <q-item-section>
          <label class="title"> Email :</label>
        </q-item-section>
        <q-item-section>
          <br />
          <q-input
            outlined
            readonly
            dense
            style="margin-left:-105px;width:360px"
            color="secondary"
            type="email"
            hint="Vous ne pouvez pas changer votre email"
            v-model="userdataCopy.email"
          >
            <template v-slot:prepend>
              <div class="row items-center all-pointer-events">
                <q-icon class="q-mr-xs" color="gray" size="20px" name="mail" />
              </div>
            </template>
          </q-input>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <label class="title"> Image Url :</label>
        </q-item-section>
        <q-item-section>
          <q-input
            dense
            style="margin-left:-105px;width:360px;"
            outlined
            color="secondary"
            type="url"
            v-model="userdataCopy.imageUrl"
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
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <label class="title"> Nom et Prénom :</label>
        </q-item-section>
        <q-item-section>
          <q-input
            outlined
            dense
            style="width:160px;margin-left:-17px"
            color="secondary"
            v-model="userdataCopy.nom"
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
            style="width:169px;"
            v-model="userdataCopy.prenom"
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
            style="margin-left:-105px;width:360px"
            color="secondary"
            v-model="userdataCopy.date_naissance"
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
                v-model="userdataCopy.date_naissance"
              >
                <template v-slot:prepend>
                  <q-icon color="secondary" name="event" class="cursor-pointer">
                    <q-popup-proxy
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date
                        v-model="userdataCopy.date_naissance"
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
            style="margin-left:-105px;width:360px"
            label="Genre"
            outlined
            dense
            color="secondary"
            v-model="userdataCopy.genre"
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
          <label class="title"> Adresse :</label>
        </q-item-section>
        <q-item-section>
          <q-input
            outlined
            dense
            color="secondary"
            style="width:160px;margin-left:-17px"
            v-model="userdataCopy.rue"
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
            style="width:169px;"
            dense
            v-model="userdataCopy.code_postal"
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
        style="margin-left:172px;width:360px"
        color="secondary"
        v-model="userdataCopy.ville"
        dense
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
            color="secondary"
            mask="## ### ###"
            dense
            unmasked-value
            style="margin-left:-105px;width:360px"
            v-model="userdataCopy.telephone"
            lazy-rules
            :rules="[val => (val && val.length === 8) || 'Champ incorrect !!']"
          >
            <template v-slot:prepend>
              <div class="row items-center all-pointer-events">
                <q-icon
                  class="q-mr-xs"
                  color="secondary"
                  size="20px"
                  name="phone"
                />
              </div>
            </template>
          </q-input>
        </q-item-section>
      </q-item>
      <!-- <q-item>
        <q-item-section>
          <label class="title">Etat : </label>
        </q-item-section>
        <q-item-section>
          <q-input
            style="margin-left:-105px;width:360px"
            label="Etat"
            outlined
            dense
            readonly
            color="secondary"
            v-model="userdataCopy.etat"
            hint="Vous ne pouvez pas changer votre état"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Champ vide !!']"
          >
            <template v-slot:prepend>
              <div class="row items-center all-pointer-events">
                <q-icon
                  class="q-mr-xs"
                  color="gray"
                  size="20px"
                  name="published_with_changes"
                />
              </div>
            </template>
          </q-input>
        </q-item-section>
      </q-item> -->
      <br />
      <br />
      <div align="center">
        <q-btn
          label="Modifier"
          glossy
          icon-right="assignment_turned_in"
          type="submit"
          @click="onEdit()"
          color="secondary"
        />

        <q-btn
          label="Annuler"
          style="margin-left:20px"
          glossy
          @click="onCancel()"
          rounded
          v-close-popup
          color="red"
        />
      </div>
    </q-form>
  </q-card>
</template>
<script>
export default {
  props: ["userdata"],
  data() {
    return {
      genreOptions: ["Homme", "Femme"],
      etatOptions: ["Actif", "Inactif"],

      userdataCopy: {}
    };
  },

  methods: {
    dateOption(date) {
      return date >= "1920/01/01" && date <= "2010/01/01";
    },
    async onEdit() {
      this.$refs.myForm.validate().then(async success => {
        if (success) {
          this.userdataCopy.email = this.userdataCopy.email.toLowerCase();

          let res = await this.$axios.patch(
            `/utilisateur/update/${this.userdata._id}`,
            {
              ...this.userdataCopy
            }
          );
          this.$emit("updated"), await this.getAll(), await this.onCancel();
        }
      });
    },
    onCancel() {
      this.$emit("closeDialog");
    }
  },
  mounted() {
    this.userdataCopy = { ...this.userdata };
  }
};
</script>
<style scoped>
/* .mydialog {
  width: 700px;
  padding: 25px;
  height: 600px;
  background: rgb(32, 29, 29);
} */

.mydialog {
  max-width: 40rem;
  height: 41rem;
  padding: 1.5rem;
  background-color: white;
}

.image {
  width: 350px;
  height: 350px;
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
