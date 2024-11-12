import Vue from "vue";
import axios from "axios";
const api = axios.create({ baseURL: "http://localhost:5000/api" });

Vue.prototype.$axios = api;
