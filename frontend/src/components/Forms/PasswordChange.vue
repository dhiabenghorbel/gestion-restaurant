<template>
  <q-card class="mydialog">
    <q-form class="q-pa-md bg-white text-black" ref="myForm">
      <br />
      <label class="title2">
        Changer mot de passe
      </label>
      <q-separator style="width:550px;" color="black" />

      <div v-if="this.user">
        <label class="title">
          Votre gérant à oublier son mot de passe ?<br />
          Changer le ici !
        </label>
      </div>
      <div v-if="this.livreur">
        <label class="title">
          Votre livreur à oublier son mot de passe ?<br />
          Changer le ici !
        </label>
      </div>

      <br />
      <br />
      <br />
      <q-item>
        <q-item-section>
          <label class="title"> Nouveau mot de passe :</label>
        </q-item-section>
        <q-item-section>
          <q-input
            outlined
            style="margin-left:-105px;width:330px"
            color="secondary"
            :type="isPwd ? 'password' : 'text'"
            lazy-rules
            dense
            :rules="[val => (val && val.length > 0) || 'Champ vide !!']"
            v-model.trim="password"
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
            style="margin-left:-105px;width:330px"
            color="secondary"
            :type="isPwd ? 'password' : 'text'"
            lazy-rules
            dense
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
      <br />
      <br />

      <div align="center">
        <q-btn
          v-if="this.user"
          style="margin-right: 15px"
          label="confirmer la modification"
          icon-right="assignment_turned_in"
          glossy
          @click="onEditGerant()"
          color="secondary"
        />
        <q-btn
          v-if="this.livreur"
          style="margin-right: 15px"
          label="confirmer la modification ll"
          icon-right="assignment_turned_in"
          glossy
          @click="onEditLivreur()"
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
import bcrypt from "bcryptjs";

export default {
  props: ["user", "livreur"],
  data() {
    return {
      isPwd: true,
      userCopy: {},
      password: "",
      confirmPassword: null
    };
  },

  methods: {
    encryptPassword(password) {
      const salt = bcrypt.genSaltSync(8);
      return bcrypt.hashSync(password, salt);
    },
    addUser() {
      // console.log(this.encryptPassword(this.password));
      this.userCopy.password = this.encryptPassword(this.password);
    },
    addLivreur() {
      // console.log(this.encryptPassword(this.password));
      this.livreurCopy.password = this.encryptPassword(this.password);
    },
    async onEditGerant() {
      if (this.password != this.confirmPassword) {
        return this.$q.notify({
          color: "red",
          message: "Confirmer votre mot de passe"
        });
      } else {
        this.addUser();

        this.$refs.myForm.validate().then(async success => {
          if (success) {
            let res = await this.$axios.patch(
              `/utilisateur/update-password/${this.user._id}`,
              {
                ...this.userCopy
              }
            );
            return (
              this.$q.notify({
                color: "positive",
                message: "Changement de Mot de passe avec succées"
              }),
              // this.$emit("updated"),
              // await this.getAll(),
              // await this.onCancel()
              window.location.reload(true)
            );
          }
        });
      }
    },

    async onEditLivreur() {
      if (this.password != this.confirmPassword) {
        return this.$q.notify({
          color: "red",
          message: "Confirmer votre mot de passe"
        });
      } else {
        this.addLivreur();

        this.$refs.myForm.validate().then(async success => {
          if (success) {
            let res = await this.$axios.patch(
              `/livreur/update-password/${this.livreur._id}`,
              {
                ...this.livreurCopy
              }
            );
            return (
              this.$q.notify({
                color: "positive",
                message: "Changement de Mot de passe avec succées"
              }),
              window.location.reload(true)
            );
          }
        });
      }
    },

    onCancel() {
      this.$emit("closeDialog");
    }
  },
  mounted() {
    this.userCopy = { ...this.user };
    this.livreurCopy = { ...this.livreur };
  }
};
</script>
<style scoped>
.mydialog {
  min-width: 700px;
  padding: 20px;
  height: 520px;
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
