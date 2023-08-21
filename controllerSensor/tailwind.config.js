/** @type {import('tailwindcss').Config} */
export default {
  //este archivo de configuracion ha sido cambiado manualmente . por defecto esta aplicando los estulos a la pagina que se carga primero que es index.html que se puede ver dentro de la carpeta donde creamos el proyecto , 2.- la segunda linea que le sigue es para que revise la carpeta src y que ponga tambien los estilos de tailwind 
  content: ["./index.html" , "./src/**/*.{js,jsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}

