<template>
  <q-card class="mydialog">
    <q-form
      class="q-pa-md bg-white text-black"
      @submit="produit ? onEdit() : onAdd()"
      ref="myForm"
    >
      <br />
      <label class="title2">
        Formulaire produit
      </label>
      <q-separator style="width:550px;" color="black" />

      <div v-if="!this.produit">
        <label class="title">
          Veuillez remplir le formulaire avec les données du produit,<br />
          veuillez vous assurer que les informations sont exactes.
        </label>
      </div>
      <div v-if="this.produit">
        <label class="title">
          Veuillez modifier les données du produit suivant
        </label>
      </div>

      <br />
      <br />
      <q-item>
        <label class="title"> Image URL du produit :</label>
      </q-item>
      <q-item>
        <q-input
          style="width:500px"
          outlined
          dense
          type="url"
          color="secondary"
          v-model.trim="produitCopy.imageUrl"
          label="Image URL"
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
            style="margin-left:-105px;width:330px"
            outlined
            dense
            color="secondary"
            v-model.trim="produitCopy.code"
            label="Code"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Please type something']"
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
            dense
            color="secondary"
            style="margin-left:-105px;width:330px"
            v-model.trim="produitCopy.nom"
            label="Nom"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Please type something']"
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

      <br />

      <q-item>
        <q-item-section>
          <label class="title"> Catégorie :</label>
        </q-item-section>
        <q-item-section>
          <select v-model="produitCopy.categorie">
            <option
              v-for="categ in categories"
              :key="categ._id"
              :value="categ._id"
            >
              <span v-if="categ.etat === 'Actif'">{{ categ.nom }}</span>
            </option>
          </select>
        </q-item-section>
      </q-item>
      <br />
      <!-- <q-item>
        <q-item-section>
          <label class="title"> Catégorie :</label>
        </q-item-section>
        <q-item-section>
          <span v-for="item in categories" :key="item._id">
            <input
              v-if="item.etat === 'Actif'"
              type="radio"
              :value="item._id"
              v-model="produitCopy.categories"
            />
            <span v-if="item.etat === 'Actif'"> {{ item.nom }} </span>
          </span>
        </q-item-section>
      </q-item> -->
      <br />
      <q-item v-if="!this.produit">
        <q-item-section>
          <label class="title"> Service(s) :</label>
        </q-item-section>
        <q-item-section>
          <span v-for="item in services" :key="item._id">
            <input
              v-if="item.etat === 'Actif'"
              type="checkbox"
              :value="item._id"
              v-model="checkedServices"
            />
            <span v-if="item.etat === 'Actif'"> {{ item.nom }} </span>
            <span>
              <q-input
                dense
                min="0"
                step="0.5"
                style="width:100px;"
                v-model="checking[item._id]"
                type="number"
                outlined
                label="Prix "
              />
            </span>
          </span>
        </q-item-section>
      </q-item>
      <!------------------------------------->
      <q-item v-if="this.produit">
        <div>
          <label class="title">
            cochez si vous voulez rechoisir <br />
            le(s) service(s) de ce produit :
          </label>
          <q-checkbox v-model="serv_checked" />
        </div>
        <br />
        <div v-if="serv_checked">
          <!-- <q-item-section>
            <label class="title"> choisir le(s) Service(s) :</label>
          </q-item-section> -->
          <q-item-section>
            <span v-for="item in services" :key="item._id">
              <input
                v-if="item.etat === 'Actif'"
                type="checkbox"
                :value="item._id"
                v-model="checkedServices"
              />
              <span v-if="item.etat === 'Actif'"> {{ item.nom }} </span>
              <span>
                <q-input
                  dense
                  min="0"
                  step="0.5"
                  style="width:100px;"
                  v-model="checking[item._id]"
                  type="number"
                  outlined
                  label="Prix "
                />
              </span>
            </span>
          </q-item-section>
        </div>
      </q-item>
      <!---------------------------->
      <br />

      <q-item>
        <q-item-section>
          <label class="title">Etat : </label>
        </q-item-section>
        <q-item-section>
          <q-select
            label="Etat"
            outlined
            dense
            color="secondary"
            style="margin-left:-105px;width:330px"
            v-model="produitCopy.etat"
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
          v-if="!this.produit"
          label="Ajouter"
          type="submit"
          icon-right="add_task"
          style="margin-right: 15px"
          glossy
          color="blue-10"
        />

        <q-btn
          v-if="this.produit"
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
  props: ["produit"],
  data() {
    return {
      // genreOptions: ["Homme", "Femme"],
      etatOptions: ["Actif", "Inactif"],
      categories: [],
      services: [],
      produitCopy: {},
      checkedServices: [],
      checking: [],
      ServProd: [],
      serv_checked: false
      // tableServices: []
    };
  },

  methods: {
    async getAllCategories() {
      let res = await this.$axios.get("/categorie");
      let categories = {};
      res.data.forEach(el => {
        categories[el._id] = el.nom;
      });
      this.categories = { ...categories };
      // console.log(this.categories);
    },
    async getAllServices() {
      let res = await this.$axios.get("/service");
      let services = {};
      res.data.forEach(el => {
        services[el._id] = el.nom;
      });
      this.services = { ...services };
      // console.log(this.services);
    },
    async onAdd() {
      let com = {};
      let servprod = [];
      for (let i in this.checking) {
        com.service = i;
        com.prix = this.checking[i];
        servprod.push(com);
        com = {};
      }
      // console.log("servprod :", servprod);
      this.produitCopy.services = servprod;
      if (this.produitCopy.categorie && this.produitCopy.services.length > 0) {
        //  this.produitCopy.service = this.checkedServices;
        this.$refs.myForm.validate().then(async success => {
          if (success) {
            try {
              let res = await this.$axios.post(`/produit/`, {
                ...this.produitCopy
              });
              //window.location.reload(true);

              this.$emit("updated"), await this.getAll(), await this.onCancel();
            } catch {
              return this.$q.notify({
                color: "red",
                message: "Code deja utilisé"
              });
            }
          }
        });
      } else {
        return this.$q.notify({
          color: "red",
          message: "Veuillez remplir tous les champs obligatoires "
        });
      }
    },
    async getCat() {
      let res = await this.$axios.get(`/categorie`);
      this.categories = res.data;
      //console.log(this.categories);
    },
    async getServ() {
      let res = await this.$axios.get("/service");
      this.services = res.data;
      // console.log(this.services);
    },
    async getAll() {
      let res = await this.$axios.get("/produit");
      this.produits = res.data;
      //console.log(this.produits);
    },
    async onEdit() {
      if (this.serv_checked) {
        let com = {};
        let servprod = [];
        for (let i in this.checking) {
          com.service = i;
          com.prix = this.checking[i];
          servprod.push(com);
          com = {};
        }
        // console.log("servprod :", servprod);
        this.produitCopy.services = servprod;
      }
      let test = 0;

      this.$refs.myForm.validate().then(async success => {
        if (success) {
          //try {
          this.produits.forEach(el => {
            if (
              el._id != this.produitCopy._id &&
              el.code === this.produitCopy.code
            ) {
              test = test + 1;
            }
          });
          if (test === 0) {
            let res = await this.$axios.patch(
              `/produit/update/${this.produit._id}`,
              {
                ...this.produitCopy
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
    checked() {
      checkedServices.forEach(el => {
        chck[el._id] = "";
      });
      this.checking = { ...chck };
    },
    onCancel() {
      this.$emit("closeDialog");
    }
  },
  async computed() {
    await this.checked;
  },
  async mounted() {
    this.produitCopy = { ...this.produit };
    await this.getCat();
    await this.getServ();
    await this.getAll();
    // if (this.produit) {
    //   this.produitCopy.forEach(element => {
    //     element.services.array.forEach(el => {
    //       this.tableServices[el.service] = el.prix;
    //     });
    //   });
    //   return this.tableServices;
    // }
  },
  created() {
    // if (this.produit) {
    // }
  }
};
</script>
<style scoped>
label {
  color: rgb(202, 201, 201);
}
.mydialog {
  min-width: 620px;
  padding: 20px;
  height: 870px;
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
select {
  height: 35px;
  color: rgb(0, 0, 0);
  width: 330px;
  margin-left: -105px;
  border: 1px solid rgb(192, 191, 191);
  /* border-radius: 5.25em; */
  padding: 0.25em 0.5em;
  font-size: 0.9rem;
  cursor: pointer;
  line-height: 1.1;
  background-color: rgb(255, 255, 255);
}
</style>
