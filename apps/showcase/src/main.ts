import { createApp } from 'vue';
import '@brustack/theme-transitions-core/style.css';
import './style.css';
import App from './App.vue';
import { installDebugOverlay } from './debugOverlay';

installDebugOverlay();
createApp(App).mount('#app');
