<template>
  <div>
    <h4>Bienvenue {{ this.userdata.prenom }}</h4>
    <q-separator style="margin-bottom:10px;margin-left:30px" color="black" />

    <div>
      <q-btn
        glossy
        rounded
        dense
        class="shadowbutton"
        style="margin-left:30px;margin-top:20px"
        icon="change_circle"
        icon-right="send"
        @click="EditUser()"
        v-close-popup
        label="Modifier le profil"
        color="blue-10"
      ></q-btn>
    </div>
    <!-- xxxxxxxxxxx -->
    <q-item>
      <q-item-section>
        <q-card class="imagecard">
          <q-img
            @click="EditUser()"
            v-if="!this.userdata.imageUrl"
            class="image"
            src="https://i.skyrock.net/7045/53217045/pics/2749180896_small_1.png"
          />

          <q-img
            v-if="this.userdata.imageUrl"
            class="image"
            :src="this.userdata.imageUrl"
          />
        </q-card>
      </q-item-section>
      <q-item-section class="move">
        <q-card class="profilcard">
          <q-item>
            <q-item-section>
              <label class="title"> Nom et Prénom :</label>
            </q-item-section>
            <q-item-section>
              <q-input
                outlined
                readonly
                dense
                style="width:160px;margin-left:-10px"
                color="secondary"
                v-model="userdata.nom"
                label="Nom"
                lazy-rules
                :rules="[val => (val && val.length > 0) || 'Champ vide !!']"
              >
                <template v-slot:prepend>
                  <div class="row items-center all-pointer-events">
                    <q-icon
                      class="q-mr-xs"
                      color="blue-8"
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
                readonly
                dense
                color="secondary"
                style="width:160px;"
                v-model="userdata.prenom"
                label="Prénom"
                lazy-rules
                :rules="[val => (val && val.length > 0) || 'Champ vide !!']"
              >
                <template v-slot:prepend>
                  <div class="row items-center all-pointer-events">
                    <q-icon
                      class="q-mr-xs"
                      color="blue-8"
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
              <q-input
                readonly
                outlined
                dense
                style="margin-left:-105px;width:360px"
                color="secondary"
                v-model="userdata.date_naissance"
                type="date"
                lazy-rules
                :rules="[val => (val && val.length > 0) || 'Champ vide !!']"
              >
                <template v-slot:prepend>
                  <div class="row items-center all-pointer-events">
                    <q-icon
                      class="q-mr-xs"
                      color="blue-8"
                      size="20px"
                      name="today"
                    />
                  </div>
                </template>
              </q-input>
            </q-item-section>
          </q-item>
          <!-- date -->
          <q-item>
            <q-item-section>
              <label class="title"> Sexe :</label>
            </q-item-section>
            <q-item-section>
              <q-input
                readonly
                dense
                style="margin-left:-105px;width:360px;"
                outlined
                color="secondary"
                v-model="userdata.genre"
                lazy-rules
                :rules="[val => (val && val.length > 0) || 'Champ vide !!']"
              >
                <template v-slot:prepend>
                  <div class="row items-center all-pointer-events">
                    <q-icon
                      class="q-mr-xs"
                      color="blue-8"
                      size="20px"
                      name="wc"
                    />
                  </div>
                </template>
              </q-input>
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
                readonly
                dense
                style="margin-left:-105px;width:360px"
                color="secondary"
                type="email"
                lazy-rules
                :rules="[val => (val && val.length > 0) || 'Champ vide !!']"
                v-model="userdata.email"
              >
                <template v-slot:prepend>
                  <div class="row items-center all-pointer-events">
                    <q-icon
                      class="q-mr-xs"
                      color="blue-8"
                      size="20px"
                      name="mail"
                    />
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
                readonly
                dense
                color="secondary"
                style="width:160px;margin-left:-10px"
                v-model="userdata.rue"
                label="Rue"
                lazy-rules
                :rules="[val => (val && val.length > 0) || 'Champ vide !!']"
              >
                <template v-slot:prepend>
                  <div class="row items-center all-pointer-events">
                    <q-icon
                      class="q-mr-xs"
                      color="blue-8"
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
                readonly
                color="secondary"
                style="width:160px"
                dense
                v-model="userdata.code_postal"
                label="Code postal"
                lazy-rules
                :rules="[val => (val && val.length > 0) || 'Champ vide !!']"
              >
                <template v-slot:prepend>
                  <div class="row items-center all-pointer-events">
                    <q-icon
                      class="q-mr-xs"
                      color="blue-8"
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
            style="margin-left:195px;width:360px"
            color="secondary"
            v-model="userdata.ville"
            dense
            label="Ville"
            lazy-rules
            readonly
            :rules="[val => (val && val.length > 0) || 'Champ vide !!']"
          >
            <template v-slot:prepend>
              <div class="row items-center all-pointer-events">
                <q-icon
                  class="q-mr-xs"
                  color="blue-8"
                  size="20px"
                  name="home"
                />
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
                readonly
                dense
                unmasked-value
                style="margin-left:-105px;width:360px"
                v-model="userdata.telephone"
                lazy-rules
                :rules="[val => (val && val.length === 8) || 'Champ vide !!']"
              >
                <template v-slot:prepend>
                  <div class="row items-center all-pointer-events">
                    <q-icon
                      class="q-mr-xs"
                      color="blue-8"
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
                dense
                readonly
                outlined
                style="margin-left:-105px;width:360px"
                color="secondary"
                v-model="userdata.etat"
                lazy-rules
                :rules="[
                  val => (val && val.length > 0) || 'Valeur incorrect !!'
                ]"
              >
                <template v-slot:prepend>
                  <div class="row items-center all-pointer-events">
                    <q-icon
                      class="q-mr-xs"
                      color="blue-8"
                      size="20px"
                      name="published_with_changes"
                    />
                  </div>
                </template>
              </q-input>
            </q-item-section>
          </q-item> -->
        </q-card>
      </q-item-section>
    </q-item>
    <q-dialog v-model="editDialog" v-if="editDialog">
      <profil-form
        :userdata="userdata"
        @updated="getUserData"
        @closeDialog="editDialog = false"
      />
    </q-dialog>
  </div>
</template>
<script>
import VueJwtDecode from "vue-jwt-decode";

import ProfilForm from "src/components/Forms/ProfilForm.vue";
export default {
  components: { ProfilForm },
  data() {
    return {
      user: [],
      userdata: [],
      editDialog: false
    };
  },
  created() {
    this.getUser();
    this.getUserData();
  },
  methods: {
    EditUser() {
      this.editDialog = true;
    },
    async getUserData() {
      let res = await this.$axios.get(`/utilisateur/${this.userId}`);
      this.userdata = res.data;
      //console.log(this.userdata);
    },
    logUserOut() {
      localStorage.removeItem("token");
      this.$router.push("/login");
    },
    // getUserDetails() {
    //   let token = localStorage.getItem("token");
    //   let user = VueJwtDecode.decode(token);
    //   if (user) {
    //     console.log(user);
    //   } else {
    //     console.log("introuvable");
    //   }
    // },
    async getUser() {
      let token = localStorage.getItem("token");
      let decoded = VueJwtDecode.decode(token);
      this.user = decoded;
      //console.log(this.user);
      this.userId = this.user._id;
      // console.log(this.userId);
    }
  }
};
</script>
<style scoped>
.move {
  margin-right: 150px;
}
.profilcard {
  max-width: 40rem;
  height: 41rem;
  padding: 1.5rem;
  background-color: white;
}
.imagecard {
  max-width: 23rem;
  height: 23rem;
  padding: 0.7rem;
  background-color: white;
  margin-left: 200px;
  margin-bottom: 120px;
}
.image {
  width: 350px;
  height: 350px;
}
h4 {
  font-family: monospace;
  font-size: 2em;
  margin-top: 1.5em;
  margin-bottom: 0.15em;
  margin-left: 2rem;
  margin-right: 0;
  color: rgb(88, 87, 87);
  font-weight: bold;
}

.title {
  color: rgb(0, 0, 0);
  font-family: monospace;
  font-weight: bold;
}
.shadowbutton {
  box-shadow: 0 9px #999;
}
.shadowbutton:active {
  background-color: #3e8e41;
  box-shadow: 0 5px #666;
  transform: translateY(4px);
}
</style>
