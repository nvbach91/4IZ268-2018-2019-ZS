<template>
  <div>
    <nav class="nav">
      <input
        v-model="searchQuery"
        class="input input--search"
        type="search"
        placeholder="Najdi umělce"
      >
      <a
        :href="`https://accounts.spotify.com/authorize?client_id=f254e3e7f8a74a1b9c5e3a683063f0dd&redirect_uri=${url}/&scope=user-read-playback-state%20user-modify-playback-state%20user-top-read&response_type=token`"
        class="button"
      >PŘIHLÁSIT SE</a>
    </nav>

    <main class="main">
      <div
        v-if="status && Object.keys(artistsResults).length === 0 && Object.keys(tracks).length === 0"
        class="status"
      >{{ status }}</div>

      <div v-if="tracks.length" class="tracks">
        <h2>TOP 10 písniček seřazených podle danceability</h2>
        <div v-for="track in tracks" :key="track.id" class="track">
          <i
            class="track__play material-icons"
            @click="playTrack(track.id, track.name)"
          >{{ track.id !== currentlyPlaying ? 'play_circle_outline' : 'play_arrow' }}</i>
          <img
            v-for="(value, key) in track.album.images[0]"
            v-if="key === 'url'"
            :key="key"
            :src="value"
            class="img track__img"
          >
          <div class="track__info">
            <div class="track__name">{{ track.name }}</div>
            <div class="track__authors">
              <div v-for="(artist, key) in track.artists" :key="key" class="track__authorName">
                {{ artist.name }}
                <span v-if="key !== (track.artists.length-1)">,&thinsp;</span>
              </div>
            </div>
          </div>
          <div class="track__danceability">
            <div class="track__danceabilityName">Danceability</div>
            <h3 class="track__danceabilityNumber">{{ Number(track.danceability*100).toFixed(0) }}%</h3>
          </div>
        </div>
      </div>

      <div class="results">
        <a
          v-for="result in (Object.keys(artistsResults).length !== 0 ? artistsResults : Object.keys(tracks).length === 0 ? usersFavorites : '')"
          :key="result.id"
          class="result"
          @click="getTopTracks(result.id)"
        >
          <div v-if="result.images[0]" class="result__imgContainer">
            <img
              v-for="(value, key) in result.images[0]"
              v-if="(key === 'url')"
              :key="key"
              :src="value"
              class="img result__img"
            >
          </div>
          <div v-else class="result__imgContainer">
            <img src="artist.png" class="img result__img">
          </div>
          <div class="result__name">{{ result.name }}</div>
        </a>
      </div>
    </main>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'

import { objectToString } from '@/assets/js/objectToString'
import { debounce } from '@/assets/js/debounce'

export default {
  components: {
    Logo
  },

  data() {
    return {
      artistsResults: {},
      currentlyPlaying: '',
      searchQuery: '',
      status: '',
      tracks: {},
      url: '',
      usersFavorites: {}
    }
  },

  mounted() {
    this.url = window.location.origin

    this.status =
      'Chceš seřadit nejlepší písničky daného interpreta podle danceability? Stačí být přihlášen, zadat nějakého umělce do vyhledávání a pak ho vybrat.'

    if (this.$route.hash || localStorage.getItem('user_token')) {
      if (this.$route.hash) {
        var pieces = this.$route.hash.replace('#', '').split('&')
        var data = {}
        var parts

        for (var i = 0; i < pieces.length; i++) {
          parts = pieces[i].split('=')
          if (parts.length < 2) {
            parts.push('')
          }
          data[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1])
        }
        localStorage.setItem(
          'user_token',
          data.token_type + ' ' + data.access_token
        )

        this.$toast.success('Přihlášení bylo úspěšné, vyhledej nějakého umělce')
      }

      this.getUsersFavorites()
    }
  },

  watch: {
    searchQuery: debounce(function(newVal) {
      this.getSearch()
    }, 500)
  },

  methods: {
    async getUsersFavorites() {
      try {
        this.usersFavorites = await this.$axios.get(
          `https://api.spotify.com/v1/me/top/artists`,
          {
            headers: {
              Authorization: localStorage.getItem('user_token')
            }
          }
        )

        this.usersFavorites = this.usersFavorites.data.items
      } catch (error) {
        this.$toast.error('Nastala chyba, zkus se, prosím, znovu přihlásit')
      }
    },

    async getSearch() {
      if (!localStorage.getItem('user_token')) {
        this.$toast.show('Nejprve se, prosím, přihlaš')
        return
      }

      this.tracks = {}

      if (this.searchQuery !== '') {
        try {
          this.artistsResults = await this.$axios.get(
            `https://api.spotify.com/v1/search?q=
              ${this.searchQuery}&type=artist`,
            {
              headers: {
                Authorization: localStorage.getItem('user_token')
              }
            }
          )

          this.artistsResults = this.artistsResults.data.artists.items
        } catch (error) {
          this.$toast.error('Nastala chyba, zkus se, prosím, znovu přihlásit')
        }
      } else {
        this.artistsResults = {}
        this.status = 'Vyhledej nějakýho umělce, nebo vyber oblíbeného'
      }
    },

    async getTopTracks(id) {
      this.artistsResults = {}

      var topTracksData = await this.$axios.get(
        `https://api.spotify.com/v1/artists/${id}/top-tracks?country=US`,
        {
          headers: {
            Authorization: localStorage.getItem('user_token')
          }
        }
      )

      topTracksData = topTracksData.data.tracks

      const tracksIdString = objectToString(topTracksData)

      const tracksFeaturesData = await this.$axios.get(
        `https://api.spotify.com/v1/audio-features?ids=${tracksIdString}`,
        {
          headers: {
            Authorization: localStorage.getItem('user_token')
          }
        }
      )

      for (var i = 0; i < topTracksData.length; i++) {
        topTracksData[i] = {
          ...topTracksData[i],
          ...tracksFeaturesData.data.audio_features[i]
        }
      }

      this.tracks = topTracksData

      topTracksData.sort(function(a, b) {
        return b['danceability'] - a['danceability']
      })

      this.getCurrentlyPlaying()
    },

    async getCurrentlyPlaying() {
      const currentlyPlayingData = await this.$axios.get(
        `https://api.spotify.com/v1/me/player/currently-playing`,
        {
          headers: {
            Authorization: localStorage.getItem('user_token')
          }
        }
      )
      this.currentlyPlaying = currentlyPlayingData.data.item.id
        ? currentlyPlayingData.data.item.id
        : ''
    },

    async playTrack(trackId, name) {
      try {
        const device = await this.$axios.get(
          `https://api.spotify.com/v1/me/player/devices`,
          {
            headers: {
              Authorization: localStorage.getItem('user_token')
            }
          }
        )

        if (device.data.devices.length !== 0) {
          const deviceId = device.data.devices[0].id

          await this.$axios.put(
            `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
            {
              uris: ['spotify:track:' + trackId]
            },
            {
              headers: {
                Authorization: localStorage.getItem('user_token')
              }
            }
          )

          this.currentlyPlaying = trackId

          this.$toast.success(`${name}`, {
            icon: 'play_arrow'
          })
        } else {
          this.$toast.error('Otevři si nějaký zařízení')
        }
      } catch (error) {
        this.$toast.error('Nastala chyba, zkus se, prosím, znovu přihlásit')
      }
    }
  }
}
</script>

<style lang="scss">
/**
 * zde bych mohl psát (S)CSS, protože se nejedná o HTML soubor, ale o single file component,
 * ale raději jsem do dal do assets/main.scss
 * https://vuejs.org/v2/guide/single-file-components.html
*/
</style>
