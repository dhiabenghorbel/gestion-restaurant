<template>
  <div>
    <!-- <q-img src="~assets/logopressing.png" class="center" style="width: 350px" /> -->
    <q-form @submit="Login" @reset="onReset">
      <q-item>
        <q-item-section>
          <q-img
            src="~assets/loginimg2.jpg"
            style="margin-top:-7px;height:606px;width:428px;margin-left:-15px"
          />
        </q-item-section>
        <q-item-section style="margin-left:-100px;">
          <q-img src="~assets/tel.png" style="width: 35px;margin-top:-50px" />
          <br />
          <div class="align">
            <q-img src="~assets/logopressing.png" style="width: 270px" />
          </div>
          <br />
          <div class="titre">
            SE CONNECTER
          </div>
          <br />
          <br />

          <div class="form-control">
            <q-input
              outlined
              color="blue"
              type="email"
              v-model="login.email"
              label="Email"
              hint="Entrer votre email"
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'Champ incorrect !']"
            >
              <template v-slot:label>
                <q-icon name="email" color="blue-10" size="23px" /> </template
            ></q-input>
          </div>
          <div class="form-control">
            <q-input
              color="blue"
              outlined
              :type="isPwd ? 'password' : 'text'"
              v-model="login.password"
              hint="Entrer votre mot de passe"
              label="Mot de passe"
              lazy-rules
              :rules="[
                val => (val !== null && val !== '') || 'Champ incorrect !'
              ]"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
              <template v-slot:label>
                <q-icon name="password" color="blue-10" size="23px" />
              </template>
            </q-input>
          </div>
          <!-- <q-toggle
        v-model="accept"
        color="primary"
        keep-color
        label="se souvenir de moi ?"
        class="text-overline"
      /> -->
          <br />
          <br />
          <div class="align">
            <div class="form-control">
              <q-btn
                label="Connecter"
                type="submit"
                icon-right="login"
                glossy
                class="butcol"
              />
              <q-btn
                label="Réinitialiser"
                type="reset"
                icon-right="cancel"
                color="red"
                flat
                class="q-ml-sm"
              />
            </div>
          </div>
        </q-item-section>
      </q-item>
    </q-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isPwd: true,
      login: {
        email: null,
        password: null
      },
      panier: []

      // accept: false
    };
  },

  methods: {
    async Login() {
      try {
        this.login.email = this.login.email.toLowerCase();

        let res = await this.$axios.post(`/utilisateur/login`, this.login);
        let token = res.data.token;
        localStorage.setItem("token", token);

        if (token) {
          // console.log("acces, token: ", token);
          return (
            this.$q.notify({
              color: "green",
              message: "Connexion avec succés"
            }),
            this.$router.push("/Profile")
          );
        }
      } catch (err) {
        console.log("failed", err.res);
        return this.$q.notify({
          color: "red",
          message: "Vérifiez vos données"
        });
      }
      // if (res) {
      //   console.log("acces");
      //   this.$router.push("/");
      // } else {
      //   console.log("failed");
      // }
      // if (this.accept !== true) {
      //   this.$q.notify({
      //     color: "red-5",
      //     textColor: "white",
      //     icon: "warning",
      //     message: "You need to accept the license and terms first"
      //   });
      // } else {
      //   this.$q.notify({
      //     color: "green-4",
      //     textColor: "white",
      //     icon: "cloud_done",
      //     message: "Submitted"
      //   });
      // }
    },

    onReset() {
      this.login.email = null;
      this.login.password = null;
      // this.accept = false;
    }
  },
  created() {
    localStorage.removeItem("token");
  }
};
</script>

<style scoped>
form {
  margin: 5rem auto;
  max-width: 62rem;
  margin-top: 150px;
  height: 609px;
  border-radius: 7.5px;
  box-shadow: 0 0 5px 2px rgb(184, 183, 183);
  background-color: #ffffff;
}
.form-control {
  margin: 0.5rem 0;
}

.butcol {
  color: gainsboro;
  background-color: #1a037e;
}
.align {
  display: flex;
  align-items: center;
  justify-content: center;
}
.titre {
  color: rgb(0, 0, 0);

  /* background: repeating-linear-gradient(to right, #4d65d0, #fab9f8);
   background-clip: text;
  -webkit-text-fill-color: transparent; */
  font-weight: bold;
  font-style: italic;
  display: flex;
  justify-content: center;
  font-size: 17px;
  font-family: "Lucida Grande", "Lucida Sans Unicode", Geneva, Verdana,
    sans-serif;
}
</style>
