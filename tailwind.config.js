/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {    
    extend: {
      backgroundImage: {
        // 'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        // 'gradient-conic':
        //   'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'bg': "url('/background.png')",
      },
      width: {
        '1166': '72.875rem',
        '1089': '68.0625rem',
        '692': '43.25rem',
        '463': '28.9375rem',
        '376': '23.5rem',
        '271': '16.938rem',
        '173': '10.813rem',
        '148': '9.25rem',
        '99': '6.1875rem',
      },
      height: {
        '680': '42.5rem',
        '104': '6.5rem',
        '71': '4.438rem',
        '52' : '3.25rem',
        '50': '3.125rem',
        '43' : '2.6875rem',
        '46' : '2.875rem',
        '41.18': '2.574rem',
      },
      padding: {
        '43': '2.6875rem',
        '42': '2.625rem',
        '23': '1.4375rem',
        '162' : '10.125rem',
        '88': '5.5rem',
      },
      margin: {
        '162px': '162px',
        '30px': '30px',
      },
      colors: {
        'orange1': '#FD6625',
        'tablecolor1': '#FAFAFA',
        'navbarcolor1': '#FCCDA3',
        'searchbordercolor':'#DEDEDE',        
      },
      fontFamily: {
        'Poppins': 'Poppins',
        'Poppins500': 'Poppins',
      },
   
      borderRadius: {
        '5px': '5px',
        '100px': '100px',
      },
    },
  },
  plugins: [],
}
