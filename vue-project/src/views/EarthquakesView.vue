<script>
import axios from 'axios';

export default {
    name: 'EarthquakesView',
    data() {
        return {
            chosenType: null,
            chosenMag: null,
            chosenLocation: null,
            chosenDateRange: null,
            chosenSortOption: null,
            documents: null,
        };
    },
    computed: {
        isSearchDisabled() {
            return !this.chosenType || !this.chosenMag || !this.chosenLocation || !this.chosenDateRange || !this.chosenSortOption;
        },
    },
    methods: {
        sendSearchRequest() {
            const results = {
                method: 'GET',
                url: 'http://localhost:3001/earthquakes/all',
                params: {
                    type: this.chosenType,
                    mag: this.chosenMag,
                    location: this.chosenLocation,
                    dateRange: this.chosenDateRange,
                    sortOption: this.chosenSortOption,
                },
            };
            axios.request(results)
                .then((response) => {
                    console.log(response.data);
                    this.documents = response.data;
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        sendRefreshRequest() {
            const results = {
                method: 'GET',
                url: 'http://localhost:3001/refresh/earthquakes',
            };
            axios.request(results)
                .then((response) => {
                    console.log(response.data);
                })
                .catch((error) => {
                    console.error(error);
                });
        },
    },
};
</script>

<template>
    <div class="app">


        <p class="directions">Search for earthquakes using the following criteria:</p>
        <div class="main">
            <div class="type-selector">
                <ul>
                    <li>
                        <select v-model="chosenType">
                            <option disabled value="null">Select a Type</option>
                            <option value="earthquake">Earthquake</option>
                            <option value="quarry blast">Quarry Blast</option>
                            <option value="ice quake">Ice Quake</option>
                            <option value="explosion">Explosion</option>
                        </select>
                    </li>
                    <li>
                        <select v-model="chosenMag">
                            <option disabled value="null">Select magnitude level</option>
                            <option value="2.5">2.5+</option>
                            <option value="5.5">5.5+</option>
                            <option value="6.1">6.1+</option>
                            <option value="7">7+</option>
                            <option value="8">8+</option>
                        </select>
                    </li>
                    <li>
                        <label>
                            <input class="form" type="text" placeholder="Enter city, state, country"
                                v-model="chosenLocation" />
                        </label>
                    </li>
                    <li>
                        <select v-model="chosenDateRange">
                            <option disabled value="null">Select date range</option>
                            <option value="7">Past 7 Days</option>
                            <option value="14">Past 14 Days</option>
                            <option value="21">Past 21 Days</option>
                            <option value="30">Past 30 Days</option>
                        </select>
                    </li>
                    <li>
                        <select v-model="chosenSortOption">
                            <option disabled value="null">Sort by</option>
                            <option value="desc">Largest Magnitude First</option>
                            <option value="asc">Smallest Magnitude First</option>
                        </select>
                    </li>
                    <li>
                        <button @click="sendSearchRequest" :disabled="isSearchDisabled">Search</button>
                        <button @click="sendRefreshRequest">Refresh</button>
                    </li>
                </ul>
            </div>
            <div class="search-results" v-if="documents">
                <p v-if="documents.length > 0">Number of hits: {{ documents.length }}</p>
                <p v-else>No results found. Try broadening your search criteria.</p>
                <div v-for="document in documents" :key="document._id" class="results-card">
                    <div class="results-text">
                        <p>Type: {{ document._source.type }}</p>
                        <p>Time: {{ document._source['@timestamp'] }}</p>
                        <p>Location: {{ document._source.place }}</p>
                        <p>Latitude: {{ document._source.coordinates.lat }}</p>
                        <p>Longitude: {{ document._source.coordinates.lon }}</p>
                        <p>Magnitude: {{ document._source.mag }}</p>
                        <p>Depth: {{ document._source.depth }}</p>
                        <p>Significance: {{ document._source.sig }}</p>
                        <p>Event URL: {{ document._source.url }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>



<style>
.results-text {
    border-radius: 25px;
    background-color: rgb(104, 209, 104);
    margin: 1rem;
    padding: 1rem;
}
</style>