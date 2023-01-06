<template>
  <q-page padding>
    <div>
      <l-map
        v-if="ready"
        style="height: 270px"
        :zoom="zoom"
        :center="center"
        :minZoom="3"
        :maxZoom="18"
        :options="{zoomControl: false}"
      >
        <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
        <l-marker :lat-lng="markerLatLng"></l-marker>
      </l-map>
    </div>

    <div class="q-pa-md q-gutter-md">
      <div class="row justify-around">
        <q-btn
          @click="captureImage"
          align="left"
          class="btn-fixed-width"
          color="blue"
          label="Tomar Foto"
          icon="camera"
        ></q-btn>
        <q-btn-dropdown
          align="right"
          class="btn-fixed-width"
          color="blue"
          label="Estados"
          icon="edit_location"
        >
          <q-list>
            <q-item
              clickable
              v-close-popup
              v-for="item in menuItems"
              :key="item.value"
              :value="item.value"
              :label="item.label"
            >
              <q-item-section>
                <q-item-label @click="selectState($event)">{{ item.label }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </div>
    </div>
    <!-- <div class="q-pa-sm q-gutter-sm"> -->
    <div class="row justify-around">
      <div class="pContainer">
        <label style="font-weight: bold; margin-right: 5px;">Foto:</label>
        <p v-if="this.imageSrc" style="color: green;">Img guardada</p>
        <p v-else style="color: gray;">No hay Img</p>
      </div>
      <div class="pContainer2">
        <label style="font-weight: bold; margin-right: 5px;">Estado:</label>
        <p v-if="this.state" style="color: green;">{{ this.state }}</p>
        <p v-else style="color: gray;">No hay Estado</p>
      </div>
    </div>
    <div class="coordsContainer">
      <label style="font-weight: bold; margin-right: 5px;">Coords:</label>
      <p v-if="this.markerLatLng" style="color: green;">{{ this.markerLatLng }}</p>
      <p v-else style="color: gray;">No hay Ubicación</p>
    </div>
    <div class="coordsContainer">
      <label style="font-weight: bold; margin-right: 5px;">Fecha:</label>
      <p v-if="this.date" style="color: green;">{{ this.date }}</p>
      <p v-else style="color: gray;">No hay Fecha</p>
    </div>
    <div
      class="q-pa-xs"
      style="    
        max-width: 100vh;
        width: 90%;
        justify-content: center;
        display: flex;
        flex-direction: column;
        padding-left: 7%;"
    >
      <label style="font-weight: bold;color: gray;">Comentarios</label>
      <q-input v-model="text" filled autogrow max-length="5" />
    </div>
    <div class="q-pa-md q-gutter-md">
      <div class="row justify-center">
        <q-btn
          id="myBtn"
          color="green"
          label="Enviar"
          icon="send"
          @click="postData"
          :disabled="!isDisabled"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";
import { Geolocation } from "@capacitor/geolocation";
import { ref } from "vue";
import { Camera, CameraResultType } from "@capacitor/camera";
import { date } from 'quasar'

export default {
  name: "IndexPage",

  components: {
    LMap,
    LTileLayer,
    LMarker,
  },

  computed: {
    isDisabled() {
      return (
        this.imageSrc != "" &&
        this.state != "" &&
        this.text != "" &&
        this.markerLatLng != ""
      );
    },
  },

  data() {
    return {
      latitude: "",
      longitude: "",
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 14,
      center: [],
      markerLatLng: [],
      ready: false,
      imageSrc: ref(""),
      menuItems: [
        {
          label: "Llegada",
          value: "llegada",
        },
        {
          label: "Colación",
          value: "colacion",
        },
        {
          label: "Entrega",
          value: "entrega",
        },
        {
          label: "Devolucion",
          value: "devolucion",
        },
        {
          label: "Salida",
          value: "salida",
        },
      ],
      state: "",
      textField: "",
      text: ref(""),
      timeStamp: "",
      date: ""
    };
  },
  mounted() {
    this.getCurrentPosition();
  },
  methods: {
    selectState: function (e) {
      console.log("ESTADOS!!");
      const data = e.srcElement.innerText;
      this.state = data;
      console.log(this.state);
    },

    postData() {
      const data = {
        state: this.state,
        imgUrl: this.imageSrc,
        coords: this.markerLatLng.toLocaleString(),
        coments: this.text,
        timeStamp: this.timeStamp
      };
      console.log(data);

      this.$axios.post("http://localhost:3003/api/sendData", data).then((response) => {
        console.log(response);
        alert("Datos guardados")
      }).catch((err) => {
        console.log(err)
        console.log("Error al guardar datos!")
      })
    },

    async captureImage() {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri,
        preserveAspectRatio: true,
      });
      this.imageSrc = image.webPath;
      if (this.imageSrc) {
        alert("Foto guardada!!");
      } else {
        alert("Error al guardar photo");
      }
    },

    async getCurrentPosition() {
      const coordinates = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 1000,
      });

      const timeStamp = Date.now()
      const dateDb = date.formatDate(timeStamp, 'YYYY-MM-DDTHH:mm:ss.SSSZ')
      const formattedString = date.formatDate(timeStamp, 'DD-MM-YYYY')

      this.center = [coordinates.coords.latitude, coordinates.coords.longitude];
      this.markerLatLng = [
        coordinates.coords.latitude,
        coordinates.coords.longitude,
      ];
      this.ready = true;
      this.timeStamp = dateDb
      this.date = formattedString
    },
  },

  sendData() {
    console.log(data);
  },
};
</script>
