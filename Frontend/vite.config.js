import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // Add this if you're using React
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(), // Add this if you're using React
    tailwindcss(),
  ],
});